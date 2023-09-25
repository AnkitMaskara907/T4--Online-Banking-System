package com.wellsfargo.training.obs.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
public class AccountDetails {

	@SequenceGenerator(name="UID_seq",initialValue=1000,allocationSize=1)
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY,generator="UID_seq")
	private Long uid;
	@Column
	private String name;
	@Column(nullable=false,unique=true)
	private String number;
	@Column(nullable=false,unique=true)
	private String email;
	private String address;
	private Date dob;
	
	@Column(nullable=false,unique=true)
	private String aadhaar;
	
	@Column(nullable=false,unique=true)
	private String pan;
	
	private Double balance;
	private Boolean status=false;

	public AccountDetails() {
		// TODO Auto-generated constructor stub
	}

	public AccountDetails(Long uid, String name, String number, String email, String address, Date dob,
			String aadhaar, String pan, Double balance) {
		this.uid = uid;
		this.name = name;
		this.number = number;
		this.email = email;
		this.address = address;
		this.dob = dob;
		this.aadhaar = aadhaar;
		this.pan = pan;
		this.balance=balance;
		this.status = false;
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getAadhaar() {
		return aadhaar;
	}

	public void setAadhaar(String aadhaar) {
		this.aadhaar = aadhaar;
	}

	public String getPan() {
		return pan;
	}

	public void setPan(String pan) {
		this.pan = pan;
	}
	
	public Double getBalance() {
		return balance;
	}
	public void setBalance(Double balance) {
		this.balance=balance;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}




}