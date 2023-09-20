package com.wellsfargo.training.ims.model;
/*
 * Model Class for managing products
 */

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

/* The @Entity annotation specifies that the class is an entity and is mapped to a database table.*/

@Entity
public class Product {
	
	/*The @Id annotation specifies the primary key of an entity.
	 * @GeneratedValue provides for the specification of generation strategies for the values of primary keys. */
	@SequenceGenerator(name="product_seq", initialValue=1000, allocationSize = 1)
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator="product_seq")
	private long pid;
	
	@Column(nullable = false)
	private float price;
	
	@Column(nullable = false)
	private String madein;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String brand;
	
	public Product() {
		// TODO Auto-generated constructor stub
	}

	public Product(long pid, float price, String madein, String name, String brand) {
		this.pid = pid;
		this.price = price;
		this.madein = madein;
		this.name = name;
		this.brand = brand;
	}

	public long getPid() {
		return pid;
	}

	public void setPid(long pid) {
		this.pid = pid;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getMadein() {
		return madein;
	}

	public void setMadein(String madein) {
		this.madein = madein;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}
	
}
