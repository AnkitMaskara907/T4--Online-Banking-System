package com.wellsfargo.training.obs;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
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

import com.wellsfargo.training.obs.controller.AccountDetailsController;
import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.service.AccountDetailsService;

@SpringBootTest
class AccountDetailsControllerTest {
	
	@Autowired
	private AccountDetailsController adcontroller; // Instance of a class to be tested
	
	AccountDetails accountDetails;
	//JUNit - Testing framework to test Java classes without any dependent Object
	// Mockito - Test framework to perform unit Testing with dependencies
	
	@MockBean
	private AccountDetailsService adservice; // Create Mock/duplicate Object of Product Service

	@BeforeEach
	void setUp() throws Exception {
		accountDetails = new AccountDetails();
	}

	@AfterEach
	void tearDown() throws Exception {
		accountDetails =null;
	}

	@Test
	void testSaveDetails() throws ParseException {
		accountDetails.setName("Rod Johnson");
		accountDetails.setNumber("1234567890");
		accountDetails.setEmail("rod@spring.com");
		accountDetails.setAddress("California");
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		accountDetails.setDob(dob);
		
		accountDetails.setAadhaar("1234567891L");
		accountDetails.setPan("FOMPM4987L");
		
		
		// mockito
		// It enables stubbing of methods of service class
		when(adservice.getDetails(any(AccountDetails.class))).thenReturn(accountDetails);
		
		//junit
		AccountDetails re= adcontroller.saveDetails(accountDetails);
		
		//assertEquals(HttpStatus.CREATED, re.getStatusCode());
		assertEquals("Rod Johnson", re.getName());
		assertEquals("1234567890", re.getNumber());
		assertEquals("rod@spring.com", re.getEmail());
		assertEquals("California", re.getAddress());
 		assertEquals(dob, re.getDob());
		assertEquals("1234567891L", re.getAadhaar());
		assertEquals("FOMPM4987L", re.getPan());
		
		
		//mocikito
		// Validates the service methods are called or not
		verify(adservice,times(1)).getDetails(any(AccountDetails.class));
		
	}

	@Test
	void testGetAllUsers() throws ParseException {
		List<AccountDetails> mockAccountDetails=new ArrayList<>();
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		
		mockAccountDetails.add(new AccountDetails(1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L",1000.0));
		mockAccountDetails.add(new AccountDetails(1001L, "Stephen King", "1234567899", "king@spring.com","Sillicon Valley", dob, "123456780L", "FOMPM4988L", 1000d));
		
		when(adservice.listAll()).thenReturn(mockAccountDetails);
		
		List<AccountDetails> responseAccountDetails = adcontroller.getAllUsers();
		
		assertEquals(2,responseAccountDetails.size());
		assertEquals("Rod Johnson",responseAccountDetails.get(0).getName());
		assertEquals("Stephen King",responseAccountDetails.get(1).getName());
		
		verify(adservice,times(1)).listAll();
		
	}

	@Test
	void testGetUserById() throws ResourceNotFoundException, ParseException {
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		
		AccountDetails mockAccountDetails = new AccountDetails(1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L",1000.0);
		when(adservice.getSingleUser(1001L)).thenReturn(Optional.of(mockAccountDetails));
		
		ResponseEntity<AccountDetails> re=adcontroller.getUserById(1001L);
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("Rod Johnson", re.getBody().getName());
		assertEquals("1234567890", re.getBody().getNumber());
		assertEquals("rod@spring.com", re.getBody().getEmail());
		assertEquals("California", re.getBody().getAddress());
 		assertEquals(dob, re.getBody().getDob());
		assertEquals("123456789L", re.getBody().getAadhaar());
		assertEquals("FOMPM4987L", re.getBody().getPan());
		
		verify(adservice,times(1)).getSingleUser(1001L);
		
	}
	@Test
	void testGetAccountByEmail() throws ResourceNotFoundException, ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		
		AccountDetails mockAccountDetails = new AccountDetails(1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L",1000.0);
		when(adservice.loginAccount("rod@spring.com")).thenReturn(Optional.of(mockAccountDetails));
		
		ResponseEntity<AccountDetails> re=adcontroller.getAccountByEmail("rod@spring.com");
		
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals("Rod Johnson", re.getBody().getName());
		assertEquals("1234567890", re.getBody().getNumber());
		assertEquals("rod@spring.com", re.getBody().getEmail());
		assertEquals("California", re.getBody().getAddress());
 		assertEquals(dob, re.getBody().getDob());
		assertEquals("123456789L", re.getBody().getAadhaar());
		assertEquals("FOMPM4987L", re.getBody().getPan());
		
		verify(adservice,times(1)).loginAccount("rod@spring.com");
		
	}
	
//	@Test
//	void testApproveUser() throws ResourceNotFoundException, ParseException{
//		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
//		Date dob = new Date(df.parse("2000-09-25").getTime());
//		
//		AccountDetails mockAccountDetails = new AccountDetails(1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L",1000.0);
//		mockAccountDetails.setStatus(true);	
//		when(adservice.getSingleUser(2L)).thenReturn(Optional.of(mockAccountDetails));
//		
//		ResponseEntity<AccountDetails> re=adcontroller.approveUser(2L);
//		assertEquals(HttpStatus.OK,re.getStatusCode());
//		assertTrue(re.getBody().getStatus());
//		
//	}

	@Test
	void testDeleteUser() throws ResourceNotFoundException, ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		
		AccountDetails existingAccountDetails = new AccountDetails (1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L",1000.0);
		
		when(adservice.getSingleUser(2L)).thenReturn(Optional.of(existingAccountDetails));
		doNothing().when(adservice).deleteUser(2L);
		
		ResponseEntity<Map<String,Boolean>> response=adcontroller.deleteUser(2L);
		
		assertTrue(response.getBody().containsKey("Deleted"));
		assertTrue(response.getBody().get("Deleted"));
		
		verify(adservice,times(1)).getSingleUser(2L);
		verify(adservice,times(1)).deleteUser(2L);
	}

	@Test
	void testSearchUsersByName_Success() throws ParseException {
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		
		String name="Rod Johnson";
		List<AccountDetails> mockAccounntDetails=new ArrayList<>();
		mockAccounntDetails.add(new AccountDetails (1001L, "Rod Johnson", "1234567890", "rod@spring.com","California", dob, "123456789L", "FOMPM4987L", 1000.0));
		
		when(adservice.searchUsersByName(name)).thenReturn(mockAccounntDetails);
		
		ResponseEntity<?> re=adcontroller.searchUsersByName(name);
		
		assertNotNull(re);
		assertEquals(HttpStatus.OK,re.getStatusCode());
		assertEquals(mockAccounntDetails, re.getBody());
	}
	
	@Test
	void testSearchUsersByName_NoUsersFound() {
		String name="Anubhab";
		List<AccountDetails> mockAccounntDetails=new ArrayList<>();
				
		when(adservice.searchUsersByName(name)).thenReturn(mockAccounntDetails);
		
		ResponseEntity<?> re=adcontroller.searchUsersByName(name);
		
		assertNotNull(re);
		assertEquals(HttpStatus.NOT_FOUND,re.getStatusCode());
		assertEquals("No Users Found with given Name.", re.getBody());
	}

}
