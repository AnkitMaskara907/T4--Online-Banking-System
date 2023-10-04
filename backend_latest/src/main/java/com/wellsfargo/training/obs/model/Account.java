package com.wellsfargo.training.obs.model;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

//Model Class for registration of a user with one to one mapping to the address

@Entity
@Table(name = "account")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "accountId")
	private long accountId;
	
	@Column(unique = true)
	private String email;
	
	@Column(name = "first_name")
	private String fname;
	
	@Column(name = "last_name")
	private String lname;
	
	@Column(name="balance")
	private double balance;
	
	private String password;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date dob;
	
	@Column(name = "phone", unique = true)
	private String phone;
	
	@OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
	private Address address;

	public Account() {
		// TODO Auto-generated constructor stub
	}

	public Account(long id, String email, String fname, String lname, String password, Date dob, String phone) {
		this.accountId = id;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.dob = dob;
		this.phone = phone;
	}

	public Account(long id, String email, String fname, String lname, String password, Date dob, String phone,
			Address address,double balance) {
		this.accountId = id;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.dob = dob;
		this.phone = phone;
		this.address = address;
		this.balance=balance;
	}

	public long getAccountId() {
		return accountId;
	}

	public void setAccountId(long id) {
		this.accountId = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		Base64.Encoder encoder = Base64.getEncoder();
		String normalString = password;
		String encodedString = encoder.encodeToString(
		normalString.getBytes(StandardCharsets.UTF_8));
		this.password = encodedString;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance=balance;
	}
}
