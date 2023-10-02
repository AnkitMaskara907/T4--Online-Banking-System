package com.wellsfargo.training.obs;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wellsfargo.training.obs.controller.UserController;
import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.service.UserService;

@SpringBootTest
class UserControllerTest {
	
	@Autowired
	private UserController ucontroller; // Instance of a class to be tested
	
	User user;
	//JUNit - Testing framework to test Java classes without any dependent Object
	// Mockito - Test framework to perform unit Testing with dependencies
	
	@MockBean
	private UserService uservice; // Create Mock/duplicate Object of Product Service

	@BeforeEach
	void setUp() throws Exception {
		user = new User();
	}

	@AfterEach
	void tearDown() throws Exception {
		user =null;
	}

	@Test
	void testSaveUser() throws ParseException {
		user.setEmail("rod@spring.com");
		Base64.Encoder encoder = Base64.getEncoder();
		String password = "hello123";
		String normalString = password ;
		String encodedString = encoder.encodeToString( // encrypt password in database field
				normalString.getBytes(StandardCharsets.UTF_8));
		user.setPassword("hello123");
		
		
		// mockito
		// It enables stubbing of methods of service class
		when(uservice.saveUser(any(User.class))).thenReturn(user);
		
		//junit
		User re= ucontroller.saveUser(user);
		
		//assertEquals(HttpStatus.CREATED, re.getStatusCode());
		assertEquals("rod@spring.com", re.getEmail());
		assertEquals(encodedString, re.getPassword());
		
		//mocikito
		// Validates the service methods are called or not
		verify(uservice,times(1)).saveUser(any(User.class));
		
	}

	@Test
	void getUserById() throws ParseException, ResourceNotFoundException {
		
		User mockUser = new User(1000,"Rod","rod@spring.com","hello123");
		
		when(uservice.getSingleUser(1000L)).thenReturn(Optional.of(mockUser));
		
		ResponseEntity<User> re=ucontroller.getUserById(1000L);
		
		// Test Fails/error
		//ResponseEntity<Product> re=pcontroller.getProductById(1L);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("rod@spring.com", re.getBody().getEmail());
		assertEquals("hello123", re.getBody().getPassword());
		
		verify(uservice,times(1)).getSingleUser(1000L);
		
	}
	

	@Test
	void testGetAllUsers() {
		List<User> mockUser=new ArrayList<>();
		mockUser.add(new User(1000,"Rod","rod@spring.com","hello123"));
		mockUser.add(new User(2000,"Henry","henry@spring.com","Hello122"));
		
		when(uservice.listAll()).thenReturn(mockUser);
		
		List<User> responseProducts = ucontroller.getAllUsers();
		
		assertEquals(2,responseProducts.size());
		assertEquals("rod@spring.com",responseProducts.get(0).getEmail());
		assertEquals("henry@spring.com",responseProducts.get(1).getEmail());
		
		verify(uservice,times(1)).listAll();	
	}
	
	@Test
	void testLoginUser() throws ResourceNotFoundException {
		user.setUser_name("Rod");
		user.setEmail("rod@spring.com");
		user.setPassword("Password123");
		
		when(uservice.loginUser("rod@spring.com")).thenReturn(Optional.of(user));
		
		User x = uservice.loginUser("rod@spring.com").get();
		assertEquals(x.getEmail(), user.getEmail());
		assertEquals(x.getPassword(), user.getPassword());
		
		Boolean result =ucontroller.loginUser(user);
		
		assertTrue(result);
		
		verify(uservice, times(2)).loginUser("rod@spring.com");
	}
	
//	@Test
//	void testChangePassword() throws ResourceNotFoundException {
//		user.setUser_name("Rod");
//		user.setEmail("rod@spring.com");
//		user.setPassword("Password123");
//		String oldPassword = "Password123";
//		String newPassword = "Password12";
//		
//		when(uservice.changePassword(1000L, "Password123", "Password12")).thenReturn(true);
//		
//		Map<String, String> map = new HashMap<String, String>();
//		map.put(oldPassword, newPassword);
//		
//		ResponseEntity<String> re= ucontroller.changePassword(1000L, map);
//		assertEquals(newPassword, re.getBody());
//		
//		verify(uservice,times(1)).changePassword(1000L, "Password123", "Password12");
//	}
}
