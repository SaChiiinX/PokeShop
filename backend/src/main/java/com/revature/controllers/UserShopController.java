package com.revature.controllers;

import com.revature.exceptions.user.UserExistsException;
import com.revature.exceptions.user.UserNotFoundException;
import com.revature.models.UserShop;
import com.revature.services.UserShopService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users/{userId}/shop")
@CrossOrigin(origins = "http://localhost:5174", allowCredentials = "true")
public class UserShopController {
    private final UserShopService userShopService;

    @Autowired
    public UserShopController(UserShopService userShopService) {
        this.userShopService = userShopService;
    }

    @PostMapping
    public ResponseEntity<UserShop> addUserShop(HttpSession session, @PathVariable int userId) throws UserNotFoundException, UserExistsException {
        if(session.isNew() || session.getAttribute("userId") == null) {
            return ResponseEntity.badRequest().build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userId) {
            return ResponseEntity.status(403).build(); // Forbidden if userId in path doesn't match session userId
        }

        UserShop userShop = userShopService.addUserShop(userId);
        return ResponseEntity.ok(userShop);
    }

    @GetMapping
    public ResponseEntity<UserShop> getUserShop(HttpSession session, @PathVariable int userId) throws UserNotFoundException {
        if(session.isNew() || session.getAttribute("userId") == null) {
            return ResponseEntity.badRequest().build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userId) {
            return ResponseEntity.status(403).build(); // Forbidden if userId in path doesn't match session userId
        }

        UserShop userShop = userShopService.getUserShop(userId);
        return ResponseEntity.ok(userShop);
    }

    @PutMapping
    public ResponseEntity<UserShop> updateUserShop(HttpSession session, @PathVariable int userId) throws UserNotFoundException {
        if(session.isNew() || session.getAttribute("userId") == null) {
            return ResponseEntity.badRequest().build();
        }

        int sessionUserId = (int) session.getAttribute("userId");
        if (sessionUserId != userId) {
            return ResponseEntity.status(403).build(); // Forbidden if userId in path doesn't match session userId
        }

        UserShop userShop = userShopService.updateUserShop(userId);
        return ResponseEntity.ok(userShop);
    }
}
