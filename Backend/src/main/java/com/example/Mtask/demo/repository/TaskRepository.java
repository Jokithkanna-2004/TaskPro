package com.example.Mtask.demo.repository;

import com.example.Mtask.demo.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    // 🔥 USER-WISE TASKS
    List<Task> findByUserEmail(String userEmail);
}
