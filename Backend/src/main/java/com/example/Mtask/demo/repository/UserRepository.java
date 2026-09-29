package com.example.Mtask.demo.repository;

import com.example.Mtask.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // 🔥 NEW (for reset password)
    Optional<User> findByResetToken(String resetToken);
}

/*
package com.example.Mtask.demo.repository;

import com.example.Mtask.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}



 */