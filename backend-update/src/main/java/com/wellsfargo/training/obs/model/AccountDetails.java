package com.wellsfargo.training.obs.model;

import java.sql.Date;

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
	private String name;
	private String number;
	private String email;
	private String address;
	private Date dob;
	private Long aadhaar;
	private String pan;
	private String status;
	
	public AccountDetails() {
		// TODO Auto-generated constructor stub
	}

	public AccountDetails(Long uid, String name, String number, String email, String address, Date dob,
			Long aadhaar, String pan, String status) {
		this.uid = uid;
		this.name = name;
		this.number = number;
		this.email = email;
		this.address = address;
		this.dob = dob;
		this.aadhaar = aadhaar;
		this.pan = pan;
		this.status = status;
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

	public Long getAadhaar() {
		return aadhaar;
	}

	public void setAadhaar(Long aadhaar) {
		this.aadhaar = aadhaar;
	}

	public String getPan() {
		return pan;
	}

	public void setPan(String pan) {
		this.pan = pan;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
	

}
