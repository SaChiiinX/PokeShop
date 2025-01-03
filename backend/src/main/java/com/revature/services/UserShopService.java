package com.revature.services;

import com.revature.daos.UserShopDAO;
import com.revature.exceptions.user.UserExistsException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.Pokemon;
import com.revature.models.User;
import com.revature.models.UserShop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserShopService {
    private final UserShopDAO userShopDAO;
    private final UserService userService;
    private final PokemonService pokemonService;

    @Autowired
    public UserShopService(UserShopDAO userShopDAO, UserService userService, PokemonService pokemonService) {
        this.userShopDAO = userShopDAO;
        this.userService = userService;
        this.pokemonService = pokemonService;
    }

    public UserShop addUserShop(int userId) throws UserExistsException, UserNotFoundException {
        Optional<UserShop> optionalUserShop = userShopDAO.findByUserId(userId);
        if(optionalUserShop.isPresent()){
            throw new UserExistsException();
        }
        UserShop userShop = new UserShop();
        User user = userService.getUserById(userId);
        userShop.setUser(user);
        return updateUserShop(userId);
    }

    public UserShop getUserShop(int userId) throws UserNotFoundException {
        Optional<UserShop> optionalUserShop = userShopDAO.findByUserId(userId);
        if(optionalUserShop.isEmpty()){
            throw new UserNotFoundException();
        }
        return optionalUserShop.get();
    }

    public Set<Pokemon> getUserShopPokemons(int userId) throws UserNotFoundException {
        return getUserShop(userId).getPokemons();
    }

    public UserShop updateUserShop(int userId) throws UserNotFoundException {
        UserShop userShop = getUserShop(userId);
        Set<Pokemon> pokemons = pokemonService.getFiveRandom();
        userShop.setPokemons(pokemons);
        userShopDAO.save(userShop);
        return userShop;
    }
}
