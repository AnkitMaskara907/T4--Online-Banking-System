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
	@SequenceGenerator(name="user_seq", initialValue = 1000, allocationSize = 1)
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="user_seq")
	private int user_id;
	
//
//	@Column(nullable=false)
//	private long Aadhar_id;
//	
//	@Column(nullable=false)
//	private String Name;
//	
//	@Column(nullable=false)
//	private String Fathers_name;
//	
//	@Column(nullable=false)
//	private String Country;
//	
//	@Column(nullable=false, unique = true)
//	private long Mobile_no;
//	
//	@Column(nullable=false, unique = true)
//	private String Pan_no;
//	
	@Column(nullable=false, unique = true)
	private String email;
	
	@Column(nullable=false, unique = true)
	private String password;
	
	
	public int getUser_id() {
		return user_id;
	}


	public void setUser_id(int user_id) {
		this.user_id = user_id;
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
//		this.password = password;
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
	}


	public User() {
		// TODO Auto-generated constructor stub
	}


	public User(int user_id, String email, String password) {
		this.user_id = user_id;
		this.email = email;
		this.password = password;
	}




		
	
	
	
//	public User(long Aadhar_id, String Name, String Fathers_name, String Country, long Mobile_no, String Pan_no) {
//		this.Aadhar_id = Aadhar_id;
//		this.Name = Name;
//		this.Fathers_name = Fathers_name;
//		this.Country = Country;
//		this.Mobile_no = Mobile_no;
//		this.Pan_no = Pan_no;
//	}
//
//	public long getAadhar_id() {
//		return Aadhar_id;
//	}
//
//	public void setAadhar_id(long aadhar_id) {
//		Aadhar_id = aadhar_id;
//	}
//
//	public String getName() {
//		return Name;
//	}
//
//	public void setName(String name) {
//		Name = name;
//	}
//
//	public String getFathers_name() {
//		return Fathers_name;
//	}
//
//	public void setFathers_name(String fathers_name) {
//		Fathers_name = fathers_name;
//	}
//
//	public String getCountry() {
//		return Country;
//	}
//
//	public void setCountry(String country) {
//		Country = country;
//	}
//
//	public long getMobile_no() {
//		return Mobile_no;
//	}
//
//	public void setMobile_no(long mobile_no) {
//		Mobile_no = mobile_no;
//	}
//
//	public String getPan_no() {
//		return Pan_no;
//	}
//
//	public void setPan_no(String pan_no) {
//		Pan_no = pan_no;
//	}
}
