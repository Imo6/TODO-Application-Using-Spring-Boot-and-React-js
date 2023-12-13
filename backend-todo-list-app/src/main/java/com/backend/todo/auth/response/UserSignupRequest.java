package com.backend.todo.auth.response;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class UserSignupRequest {
	
	@NotEmpty(message = "Name is required")
	private String name;
	
	@NotEmpty(message = "Username is required")
    private String username;
    
    @NotEmpty(message = "Password is required")
    @Size(min=6, message = "Password length should be 6 characters or more")
    private String password;
    
    private String confirmPassword;
    
    protected UserSignupRequest() {
    	
    }

	public UserSignupRequest(String name, String username, String password, String confirmPassword) {
		super();
		this.name = name;
		this.username = username;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}
	
	public String getName() {
		return name;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}
	
	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
    
    
}

