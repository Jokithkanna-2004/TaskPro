package com.example.Mtask.demo.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/secure")
@CrossOrigin
public class TestController {

    @GetMapping("/test")
    public String test(Authentication authentication) {
        return "JWT Working Fine 🔥 User: " + authentication.getName();
    }
}
