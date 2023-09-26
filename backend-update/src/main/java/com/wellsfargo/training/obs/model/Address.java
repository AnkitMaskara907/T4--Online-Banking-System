package com.wellsfargo.training.obs.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
public class Address {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	private @NonNull String street;
	private @NonNull String city;
	private int pincode;
	
	@OneToOne
	@JoinColumn(name = "account_id")
	private Account account;
	
	public Address(@NonNull String street, @NonNull String city, int pincode)
	{
		this.street = street;
		this.city = city;
		this.pincode = pincode;
	}

	public void setAccount(Account account) {
		// TODO Auto-generated method stub
		
	}
}
