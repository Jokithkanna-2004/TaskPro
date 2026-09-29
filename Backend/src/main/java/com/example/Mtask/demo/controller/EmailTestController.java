package com.example.Mtask.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailTestController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/test-mail")
    public String testMail() {

        System.out.println("🔥 TEST MAIL TRIGGERED");

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("jokithkanna@gmail.com");
            message.setSubject("TEST MAIL");
            message.setText("Hello macha, mail working 🔥");

            mailSender.send(message);

            System.out.println("✅ MAIL SENT");
            return "MAIL SENT";

        } catch (Exception e) {
            e.printStackTrace();
            return "MAIL FAILED: " + e.getMessage();
        }
    }
}