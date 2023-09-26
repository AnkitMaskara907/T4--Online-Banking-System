package com.wellsfargo.training.ims;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wellsfargo.training.ims.controller.ProductController;
import com.wellsfargo.training.ims.exception.ResourceNotFoundException;
import com.wellsfargo.training.ims.model.Product;
import com.wellsfargo.training.ims.service.ProductService;

@SpringBootTest
class ProductControllerTest {
	
	@Autowired
	private ProductController pcontroller; // Instance of a class to be tested
	
	Product product;
	//JUNit - Testing framework to test Java classes without any dependent Object
	// Mockito - Test framework to perform unit Testing with dependencies
	
	@MockBean
	private ProductService pservice; // Create Mock/duplicate Object of Product Service

	@BeforeEach
	void setUp() throws Exception {
		product = new Product();
	}

	@AfterEach
	void tearDown() throws Exception {
		product =null;
	}

	@Test
	void testSaveProduct() {
		product.setName("Optical Mouse");
		product.setBrand("Logitech");
		product.setMadein("Finland");
		product.setPrice(500.00f);
		
		// mockito
		// It enables stubbing of methods of service class
		when(pservice.saveProduct(any(Product.class))).thenReturn(product);
		
		//junit
		ResponseEntity<Product> re= pcontroller.saveProduct(product);
		
		assertEquals(HttpStatus.CREATED, re.getStatusCode());
		assertEquals("Optical Mouse", re.getBody().getName());
		assertEquals("Logitech", re.getBody().getBrand());
		assertEquals("Finland", re.getBody().getMadein());
		assertEquals(500.00f, re.getBody().getPrice());
		
		//mocikito
		// Validates the service methods are called or not
		verify(pservice,times(1)).saveProduct(any(Product.class));
		
	}

	@Test
	void testGetAllProducts() {
		List<Product> mockProducts=new ArrayList<>();
		mockProducts.add(new Product(1L,"Pen","Reynolds","India",20.00f));
		mockProducts.add(new Product(2L,"HDD","Seagate","India",5000.00f));
		
		when(pservice.listAll()).thenReturn(mockProducts);
		
		ResponseEntity<List<Product>> responseProducts = pcontroller.getAllProducts();
		
		assertEquals(2,responseProducts.getBody().size());
		assertEquals("Pen",responseProducts.getBody().get(0).getName());
		assertEquals("HDD",responseProducts.getBody().get(1).getName());
		
		verify(pservice,times(1)).listAll();
		
	}

	@Test
	void testGetProductById() throws ResourceNotFoundException {
		Product mockProduct = new Product(2L,"HDD","Seagate","India",5000.00f);
		
		when(pservice.getSingleProduct(2L)).thenReturn(Optional.of(mockProduct));
		
		ResponseEntity<Product> re=pcontroller.getProductById(2L);
		
		// Test Fails/error
		//ResponseEntity<Product> re=pcontroller.getProductById(1L);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("HDD", re.getBody().getName());
		assertEquals("Seagate", re.getBody().getBrand());
		assertEquals("India", re.getBody().getMadein());
		assertEquals(5000.00f, re.getBody().getPrice());
		
		verify(pservice,times(1)).getSingleProduct(2L);
		
	}

	@Test
	void testUpdateProduct() throws ResourceNotFoundException {
		Product existingProduct = new Product(2L,"HDD","Seagate","India",5000.00f);
		Product updatedProduct = new Product(2L,"HDD","Seagate","USA",6000.00f);
		
		when(pservice.getSingleProduct(2L)).thenReturn(Optional.of(existingProduct));
		when(pservice.saveProduct(any(Product.class))).thenReturn(updatedProduct);
		
		ResponseEntity<Product> re= pcontroller.updateProductById(2L, updatedProduct);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("HDD", re.getBody().getName());
		assertEquals("Seagate", re.getBody().getBrand());
		assertEquals("USA", re.getBody().getMadein());
		assertEquals(6000.00f, re.getBody().getPrice());
		
		verify(pservice,times(1)).getSingleProduct(2L);
		verify(pservice,times(1)).saveProduct(any(Product.class));
		
	}

	@Test
	void testDeleteProduct() throws ResourceNotFoundException {
		Product existingProduct = new Product(2L,"HDD","Seagate","India",5000.00f);
		
		when(pservice.getSingleProduct(2L)).thenReturn(Optional.of(existingProduct));
		doNothing().when(pservice).deleteProduct(2L);
		
		ResponseEntity<Map<String,Boolean>> response=pcontroller.deleteProduct(2L);
		
		assertTrue(response.getBody().containsKey("Deleted"));
		assertTrue(response.getBody().get("Deleted"));
		
		verify(pservice,times(1)).getSingleProduct(2L);
		verify(pservice,times(1)).deleteProduct(2L);
	}

	@Test
	void testSearchProductsByName_Success() {
		String name="Pen";
		List<Product> mockProducts=new ArrayList<>();
		mockProducts.add(new Product(1L,"Pen","Reynolds","India",20.00f));
		
		when(pservice.searchProductsByName(name)).thenReturn(mockProducts);
		
		ResponseEntity<?> re=pcontroller.searchProductsByName(name);
		
		assertNotNull(re);
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals(mockProducts, re.getBody());
	}
	
	@Test
	void testSearchProductsByName_NoProductsFound() {
		String name="Pencil";
		List<Product> mockProducts=new ArrayList<>();
				
		when(pservice.searchProductsByName(name)).thenReturn(mockProducts);
		
		ResponseEntity<?> re=pcontroller.searchProductsByName(name);
		
		assertNotNull(re);
		assertEquals(HttpStatus.NOT_FOUND,re.getStatusCode());
		assertEquals("No Products Found with given Name.", re.getBody());
	}

}

