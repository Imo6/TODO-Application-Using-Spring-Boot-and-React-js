package com.backend.todo.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.todo.auth.model.User;

public interface UserRepository extends JpaRepository<User, Long>  {
	User findByUsername(String username);

}
