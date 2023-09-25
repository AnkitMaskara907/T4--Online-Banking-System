package com.wellsfargo.training.obs.model;

import org.springframework.web.bind.annotation.CrossOrigin;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

//Model class for managing users

@Entity
@CrossOrigin(origins="*")
public class User {
	@SequenceGenerator(name="user_seq", initialValue = 1000, allocationSize = 1)
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="user_seq")
	private long Aadhar_id;
	
	@Column(nullable=false)
	private String Name;
	
	@Column(nullable=false)
	private String Fathers_name;
	
	@Column(nullable=false)
	private String Country;
	
	@Column(nullable=false)
	private long Mobile_no;
	
	@Column(nullable=false)
	private long Pan_no;

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(long Aadhar_id, String Name, String Fathers_name, String Country, long Mobile_no, long Pan_no) {
		this.Aadhar_id = Aadhar_id;
		this.Name = Name;
		this.Fathers_name = Fathers_name;
		this.Country = Country;
		this.Mobile_no = Mobile_no;
		this.Pan_no = Pan_no;
	}

	public long getAadhar_id() {
		return Aadhar_id;
	}

	public void setUid(long Aadhar_id) {
		this.Aadhar_id = Aadhar_id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getFathers_name() {
		return Fathers_name;
	}

	public void setFathers_name(String Fathers_name) {
		this.Fathers_name = Fathers_name;
	}

	public String getCountry() {
		return Country;
	}

	public void setCountry(String Country) {
		this.Country = Country;
	}

	public long getMobile_no() {
		return Mobile_no;
	}

	public void setMob(long Mobile_no) {
		this.Mobile_no = Mobile_no;
	}
	
	public void setPan_no(long Pan_no) {
		this.Pan_no = Pan_no;
	}
}
