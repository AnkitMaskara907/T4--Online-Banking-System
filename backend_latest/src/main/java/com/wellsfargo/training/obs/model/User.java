package com.wellsfargo.training.obs.model;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

//Model class for managing users

@Entity
public class User {
	@SequenceGenerator(name = "user_seq", initialValue = 1000, allocationSize = 1)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "user_seq")
	private int user_id;
	
	@Column(nullable = false)
	private String user_name;
	
	@Column(nullable = false, unique = true)
	private String email;

	@Column(nullable = false)
	private String password;

	public int getUser_id() {
	public int getUser_id() {
		return user_id;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User() {
		// TODO Auto-generated constructor stub
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
	Base64.Encoder encoder = Base64.getEncoder();
	String normalString = password;
	String encodedString = encoder.encodeToString( // encrypt password in database field
			normalString.getBytes(StandardCharsets.UTF_8));
	this.password = encodedString;
}
	Base64.Encoder encoder = Base64.getEncoder();
	String normalString = password;
	String encodedString = encoder.encodeToString( // encrypt password in database field
			normalString.getBytes(StandardCharsets.UTF_8));
	this.password = encodedString;
}

	public User(int user_id, String user_name, String email, String password) {
	public User(int user_id, String user_name, String email, String password) {
		this.user_id = user_id;
		this.user_name = user_name;
		this.user_name = user_name;
		this.email = email;
		this.password = password;
	}

//	public int getUser_id() {
//		return user_id;
//	}
//
//	public void setUser_id(int user_id) {
//		this.user_id = user_id;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//
//	public User() {
//		// TODO Auto-generated constructor stub
//	}
//
//	public User(int user_id, String email, String password) {
//		this.user_id = user_id;
//		this.email = email;
//		this.password = password;
//	}
//	public int getUser_id() {
//		return user_id;
//	}
//
//	public void setUser_id(int user_id) {
//		this.user_id = user_id;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//
//	public User() {
//		// TODO Auto-generated constructor stub
//	}
//
//	public User(int user_id, String email, String password) {
//		this.user_id = user_id;
//		this.email = email;
//		this.password = password;
//	}
}