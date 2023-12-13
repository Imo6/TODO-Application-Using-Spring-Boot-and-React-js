package com.backend.todo.exception;

public class InvalidPageException extends RuntimeException {
	private static final long serialVersionUID = 1L;

    public InvalidPageException(String message) {
        super(message);
    }
}