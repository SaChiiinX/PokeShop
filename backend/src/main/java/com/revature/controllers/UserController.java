package com.revature.controllers;

import com.revature.exceptions.user.InvalidCredentialsException;
import com.revature.exceptions.user.InvalidUserException;
import com.revature.exceptions.user.UserExistsException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.User;
import com.revature.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerHandler(@RequestBody User user) throws UserNotFoundException, UserExistsException, InvalidUserException {
        User newUser = userService.registerUser(user);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserInfoHandler(HttpSession session, @PathVariable int userId) throws UserNotFoundException {
        if (session.isNew() || session.getAttribute("userId") == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        User userToBeReturned = userService.getUserById(sessionUserId);
        return ResponseEntity.ok(userToBeReturned);
    }

    @GetMapping()
    public ResponseEntity<?> getUsers(HttpSession session, @RequestParam(value = "username", required = false) String username) throws UserNotFoundException {
        if (username != null) {
            if (session.isNew() || session.getAttribute("username") == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String sessionUsername = (String) session.getAttribute("username");
            if (!sessionUsername.equals(username)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            User userToBeReturned = userService.getUserByUsername(username);
            return ResponseEntity.ok(userToBeReturned);
        }

        List<User> allUsers = userService.findAllUsers();
        return ResponseEntity.ok(allUsers);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginHandler(@RequestBody User user, HttpSession session) throws InvalidCredentialsException {
        User returningUser = userService.loginUser(user.getUsername(), user.getPassword());
        session.setAttribute("username", returningUser.getUsername());
        session.setAttribute("userId", returningUser.getUserId());
        session.setAttribute("role", returningUser.getRole());
        return ResponseEntity.ok(returningUser);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutHandler(HttpSession session){
        session.invalidate();
        return ResponseEntity.noContent().build();
    }


    @DeleteMapping("/{userid}")
    public ResponseEntity<User> deleteUserById(@PathVariable int userid, HttpSession session) {
        if (session.isNew() || session.getAttribute("userId") == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userid) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.deleteUser(userid);
        return ResponseEntity.ok(null);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> editUser(HttpSession session, @PathVariable int userId, @RequestBody User user) throws UserNotFoundException {
        if (session.isNew() || session.getAttribute("userId") == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        User returnedUser = userService.editUser(user);
        return ResponseEntity.status(200).body(returnedUser);
    }
}
