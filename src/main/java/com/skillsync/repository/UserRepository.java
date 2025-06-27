package com.skillsync.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillsync.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}