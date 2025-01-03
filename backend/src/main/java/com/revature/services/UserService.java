package com.revature.services;

import com.revature.daos.UserDAO;
import com.revature.exceptions.user.InvalidCredentialsException;
import com.revature.exceptions.user.InvalidUserException;
import com.revature.exceptions.user.UserExistsException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final UserShopService userShopService;

    @Autowired
    public UserService(UserDAO userDAO, @Lazy UserShopService userShopService){
        this.userDAO = userDAO;
        this.userShopService = userShopService;
    }

    @Transactional
    public User registerUser(User user) throws UserExistsException, InvalidUserException, UserNotFoundException {
        Optional<User> optionalUser = userDAO.findByUsername(user.getUsername());
        if(optionalUser.isPresent()){
            throw new UserExistsException();
        }

        String password = user.getPassword();
        String regex = "^(?=.*\\d)(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>]).+$";
        if(password.length() < 8 || !password.matches(regex)){
            throw new InvalidUserException();
        }

        userShopService.addUserShop(user.getUserId());
        return userDAO.save(user);
    }

    public User loginUser(String username, String password) throws InvalidCredentialsException {
        Optional<User> optionalUser = userDAO.findByCredentials(username, password);
        if(optionalUser.isEmpty()){
            throw new InvalidCredentialsException();
        }
        return optionalUser.get();
    }

    public User editUser(User user) throws UserNotFoundException {
        User exists = getUserById(user.getUserId());
        return userDAO.save(user);
    }

    public void deleteUser(int id){
        userDAO.deleteById(id);
    }

    public User getUserByUsername(String username) throws UserNotFoundException {
        Optional<User> optionalUser = userDAO.findByUsername(username);
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException();
        }
        return optionalUser.get();
    }

    public User getUserById(int id) throws UserNotFoundException {
        Optional<User> optionalUser = userDAO.findById(id);
        if(optionalUser.isEmpty()){
            throw new UserNotFoundException();
        }
        return optionalUser.get();
    }

    public List<User> findAllUsers(){
        return userDAO.findAll();
    }
}
