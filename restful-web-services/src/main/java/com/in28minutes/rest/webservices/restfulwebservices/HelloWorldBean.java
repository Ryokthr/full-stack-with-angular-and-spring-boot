package com.in28minutes.rest.webservices.restfulwebservices;

public class HelloWorldBean {

	private String message;

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public HelloWorldBean(String message) {
		this.message = message;
	}
}
