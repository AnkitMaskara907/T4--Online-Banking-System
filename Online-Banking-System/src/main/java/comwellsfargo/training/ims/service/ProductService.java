package comwellsfargo.training.ims.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import comwellsfargo.training.ims.model.Product;
import comwellsfargo.training.ims.repository.ProductRepository;
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
	
	@Autowired // Dependency Injection
	private ProductRepository prepo;
	
	public Product saveProduct(Product p) {
		return prepo.save(p); // Invokes predefined save() method of JPA repo
	}
	
	public List<Product> listAll(){
		return prepo.findAll();
	}
}
