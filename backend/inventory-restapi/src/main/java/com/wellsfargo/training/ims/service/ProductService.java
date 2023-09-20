package com.wellsfargo.training.ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.wellsfargo.training.ims.repository.ProductRepository;
import com.wellsfargo.training.ims.model.Product;
import jakarta.transaction.Transactional;

/*
 * A service layer is an additional layer in an MVC application that 
 * mediates communication between a controller and repository layer. 
 * The service layer contains business logic. 
 * In particular, it contains validation logic. */

/* @Service annotation allows developers to add business functionalities.
 *  @Transactional annotation allows to manage Database transactions efficiently */

@Service
@Transactional
public class ProductService {

	@Autowired //Dependency Injection
	private ProductRepository prepo;
	
	//CREATE and UPDATE
	public Product saveProduct(Product p) {
		return prepo.save(p); //Invokes predefined save method of JPA repo
	}
	
	public List<Product> listAll()
	{
		return prepo.findAll();
	}
	
	//READ
	public Optional<Product> getSingleProduct(long id){
		return prepo.findById(id); //Invokes predefined method in JPA repo
	}
	
	//DELETE
	public void deleteProduct(long id) {
		prepo.deleteById(id);
	}
	
	public List<Product> searchProductsByName(String name){
		return prepo.findProductsByNameContaingIgnoreCase(name);
	}
}
