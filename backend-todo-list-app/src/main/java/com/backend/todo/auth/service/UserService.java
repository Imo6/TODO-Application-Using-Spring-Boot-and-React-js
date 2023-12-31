package com.backend.todo.auth.service;


import org.springframework.security.core.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.todo.auth.jwt.JwtTokenGenerator;
import com.backend.todo.auth.model.User;
import com.backend.todo.auth.repository.UserRepository;
import com.backend.todo.auth.response.UserSigninRequest;
import com.backend.todo.auth.response.UserSigninResponse;
import com.backend.todo.auth.response.UserSignupRequest;
import com.backend.todo.auth.response.UserSignupResponse;

@Service
public class UserService {
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
    PasswordEncoder passwordEncoder;
    
	@Autowired
    JwtTokenGenerator jwtTokenGenerator;
	
	public UserSignupResponse signup(UserSignupRequest userSignupRequest) {
		try {
			String name= userSignupRequest.getName();
			String username = userSignupRequest.getUsername();
	        String password = userSignupRequest.getPassword();
	        
	        User user =  userRepository.findByUsername(username);
	        if(user != null) {
	        	throw new BadRequestException("Username is already exist");
	        }
	        
	        User _user = new User(name,username, passwordEncoder.encode(password));
	        _user = userRepository.save(_user);
	        
	        String token = jwtTokenGenerator.createToken(_user.getUsername(), _user.getRoleAsList());
	        
			return new UserSignupResponse(name, username, token);
		} catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
	}
	
	public UserSigninResponse signin(UserSigninRequest userSigninRequest) {
		try {
			String username = userSigninRequest.getUsername();
	        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, userSigninRequest.getPassword()));
	        String token = jwtTokenGenerator.createToken(username, this.userRepository.findByUsername(username).getRoleAsList());
	        
			return new UserSigninResponse(username, token);
		} catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid username/password");
        }
	}
}

