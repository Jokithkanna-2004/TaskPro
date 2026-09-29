package com.example.Mtask.demo.controller;

import com.example.Mtask.demo.entity.Task;
import com.example.Mtask.demo.repository.TaskRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // 🔥 GET TASKS → SAFE
    @GetMapping
    public Object getTasks(Authentication authentication) {

        if (authentication == null) {
            System.out.println("❌ USER NOT LOGGED IN");
            return "User not logged in";
        }

        String email = authentication.getName();
        return taskRepository.findByUserEmail(email);
    }

    // 🔥 CREATE TASK → SAFE
    @PostMapping
    public Object createTask(
            @RequestBody Task task,
            Authentication authentication
    ) {

        if (authentication == null) {
            return "User not logged in";
        }

        task.setUserEmail(authentication.getName());

        if (task.getStatus() == null) {
            task.setStatus("todo");
        }

        return taskRepository.save(task);
    }

    // 🔥 UPDATE TASK → SAFE
    @PutMapping("/{id}")
    public Object updateTask(
            @PathVariable Long id,
            @RequestBody Task updatedTask,
            Authentication authentication
    ) {

        if (authentication == null) {
            return "User not logged in";
        }

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUserEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        if (updatedTask.getTitle() != null) {
            task.setTitle(updatedTask.getTitle());
        }

        if (updatedTask.getDescription() != null) {
            task.setDescription(updatedTask.getDescription());
        }

        if (updatedTask.getStatus() != null) {
            task.setStatus(updatedTask.getStatus());
        }

        if (updatedTask.getPriority() != null) {
            task.setPriority(updatedTask.getPriority());
        }

        if (updatedTask.getSeverity() != null) {
            task.setSeverity(updatedTask.getSeverity());
        }

        if (updatedTask.getDueDate() != null) {
            task.setDueDate(updatedTask.getDueDate());
        }

        if (updatedTask.getStartDate() != null) {
            task.setStartDate(updatedTask.getStartDate());
        }

        return taskRepository.save(task);
    }

    // 🔥 DELETE TASK → SAFE
    @DeleteMapping("/{id}")
    public Object deleteTask(
            @PathVariable Long id,
            Authentication authentication
    ) {

        if (authentication == null) {
            return "User not logged in";
        }

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUserEmail().equals(authentication.getName())) {
            throw new RuntimeException("Unauthorized");
        }

        taskRepository.delete(task);

        return "Deleted successfully";
    }
}











/*

 */
