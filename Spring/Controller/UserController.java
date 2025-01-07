package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Response;
import com.examly.springapp.entity.User;
import com.examly.springapp.service.UserService;


@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    UserService userService;
    
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user)
    {
        try {
            return ResponseEntity.status(201).body(userService.addUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // @PostMapping("/login")
    // public ResponseEntity<User> loginUser(@RequestParam long userId )
    // {
    //     try {
    //         return ResponseEntity.status(200).body(userService.getUser(userId));
    //     } catch (Exception e) {
    //         return ResponseEntity.status(404).body(null);
    //     }
    // }
    @PostMapping("/login")
    public ResponseEntity<Response> loginUser(@RequestBody User user )
    {
        try {
            return ResponseEntity.status(200).body(userService.loginUser(user));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    
    @GetMapping
    public ResponseEntity<List<User>> getUsers()
    {
        try {
            return ResponseEntity.status(200).body(userService.getUsers());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }


}
