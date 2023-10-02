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

import com.wellsfargo.training.obs.controller.TransactionController;
import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.model.Transaction;
import com.wellsfargo.training.obs.service.AccountDetailsService;
import com.wellsfargo.training.obs.service.TransactionService;

@SpringBootTest
class TransactionControllerTest {
	
	@Autowired
	private TransactionController tcontroller; // Instance of a class to be tested
	
	Transaction transaction;
	//JUNit - Testing framework to test Java classes without any dependent Object
	// Mockito - Test framework to perform unit Testing with dependencies
	
	@MockBean
	private TransactionService tservice; // Create Mock/duplicate Object of Product Service

	@BeforeEach
	void setUp() throws Exception {
		transaction = new Transaction();
	}

	@AfterEach
	void tearDown() throws Exception {
		transaction =null;
	}
	
	@Test
	void testTransferFunds() {
		ResponseEntity<Object> tfunds=tcontroller.transferFunds(transaction);
		verify(tservice,times(1)).executeTransaction(any(Transaction.class));
	}
	
	@Test
	void testGetRecentTransactions() throws ParseException{
		List<Transaction> mockTransactionDetails = getTransactionDetails();
        when(tservice.getLast10Transactions(1000L)).thenReturn(mockTransactionDetails);
		
		ResponseEntity<List<Transaction>> responseTransactionDetails = tcontroller.getRecentTransactions(1000L);
		assertEquals(2,responseTransactionDetails.getBody().size());
		assertEquals("test1",responseTransactionDetails.getBody().get(0).getRemarks());
		assertEquals("test2",responseTransactionDetails.getBody().get(1).getRemarks());
		
	}
	
	@Test
	void testGetAllTransactions() throws ParseException{
		List<Transaction> mockTransactionDetails = getTransactionDetails();
        when(tservice.getAllTransactions(1000L)).thenReturn(mockTransactionDetails);
		
		ResponseEntity<List<Transaction>> responseTransactionDetails = tcontroller.getAllTransactions(1000L);
		assertEquals(2,responseTransactionDetails.getBody().size());
		assertEquals("neft",responseTransactionDetails.getBody().get(0).getTransactionTypeId());
		assertEquals("imps",responseTransactionDetails.getBody().get(1).getTransactionTypeId());
		
	}
	public List<Transaction> getTransactionDetails() throws ParseException {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date(df.parse("2000-09-25").getTime());
		List<Transaction> mockDetails=new ArrayList<>();
		Transaction t1= new Transaction();
		t1.setAmount(1000);
		t1.setDate(date);
		t1.setFromAc(1000L);
		t1.setToAc(1001L);
		t1.setTransactionId(1);
		t1.setRemarks("test1");
		t1.setTransactionTypeId("neft");
		
		Transaction t2= new Transaction();
		t2.setAmount(2000);
		t2.setDate(date);
		t2.setFromAc(1000L);
		t2.setToAc(2001L);
		t2.setTransactionId(2);
		t2.setRemarks("test2");
		t2.setTransactionTypeId("imps");
		
		mockDetails.add(t1);
		mockDetails.add(t2);
		
		return mockDetails;
	}
}
