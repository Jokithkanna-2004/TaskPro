package com.example.Mtask.demo.controller;

import com.example.Mtask.demo.dto.AuthResponse;
import com.example.Mtask.demo.dto.LoginRequest;
import com.example.Mtask.demo.dto.SignupRequest;
import com.example.Mtask.demo.service.AuthService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ SIGNUP
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return "User registered successfully";
    }

    // ✅ LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // 🔥 FORGOT PASSWORD (FINAL FIX - GET)
    @GetMapping("/forgot-password")
    public String forgotPassword(@RequestParam String email) {

        System.out.println("🔥 EMAIL RECEIVED: " + email);

        authService.forgotPassword(email);

        return "Reset link sent";
    }

    // 🔥 RESET PASSWORD
    @PostMapping("/reset-password/{token}")
    public String resetPassword(@PathVariable String token,
                                @RequestParam String password) {

        authService.resetPassword(token, password);

        return "Password updated successfully";
    }
}





/*
package com.example.Mtask.demo.controller;

import com.example.Mtask.demo.dto.AuthResponse;
import com.example.Mtask.demo.dto.LoginRequest;
import com.example.Mtask.demo.dto.SignupRequest;
import com.example.Mtask.demo.entity.User;
import com.example.Mtask.demo.service.AuthService;
import com.example.Mtask.demo.service.UserService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        authService.signup(request);
        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    // 🔥 PROFILE API (IMPORTANT)
    @GetMapping("/me")
    public User getProfile(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email);
    }
}









 */
