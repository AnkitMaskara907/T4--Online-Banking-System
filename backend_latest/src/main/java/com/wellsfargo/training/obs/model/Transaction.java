package com.wellsfargo.training.obs.model;

import java.sql.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="Transactions")
public class Transaction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long transactionId;
	
	private long fromAc;
	private long toAc;
	private Date date;
	private double amount;
	private String transactionTypeId;
	private String remarks;
}