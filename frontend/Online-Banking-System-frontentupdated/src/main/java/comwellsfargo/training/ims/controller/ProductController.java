package comwellsfargo.training.ims.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import comwellsfargo.training.ims.model.Product;
import comwellsfargo.training.ims.service.ProductService;

/*Spring RestController annotation is used to create RESTful web services using Spring MVC. 
 * Spring RestController takes care of mapping request data to the defined request handler method. 
 * Once response body is generated from the handler method, it converts it to JSON or XML response. 
 * 
 * @RequestMapping - maps HTTP request with a path to a controller 
 * */

@RestController
@RequestMapping(value="/api")
public class ProductController {
	
	@Autowired
	private ProductService pservice;
	//Open Browser : http://localhost:8085/ims/api/welcome
	@GetMapping("/welcome")
	public String Demo() {
		return "Welcome to Inventory Management System";
	}
	// POSTMAN- rest api testing tool
	//Open PostMan, make a POST Request - http://localhost:8085/ims/api/products/
    //Select body -> raw -> JSON 
    //Insert JSON product object.
	// Controller->Service->Product
	@PostMapping("/products")
	public Product saveProduct(@Validated @RequestBody Product product) {
		/*
		 * The @Validated annotation is a class-level annotation that we can use to tell 
		Spring to validate parameters that are passed into a method of the annotated class.

		@RequestBody annotation automatically deserializes the JSON into a Java type
		 * */
		try {
			Product p=pservice.saveProduct(product);
			return p;
		}
		catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	// Open Postman and make a GET request to this URL : http://localhost:8085/ims/api/products
	@GetMapping("/products")
	public List<Product> getAllProducts(){
		try {
			return pservice.listAll();// Invokes user defined List method
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
