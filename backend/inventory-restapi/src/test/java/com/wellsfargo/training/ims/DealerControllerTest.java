package com.wellsfargo.training.ims;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.wellsfargo.training.ims.controller.DealerController;
import com.wellsfargo.training.ims.exception.ResourceNotFoundException;
import com.wellsfargo.training.ims.model.Address;
import com.wellsfargo.training.ims.model.Dealer;
import com.wellsfargo.training.ims.model.DealerAndAddressProjection;
import com.wellsfargo.training.ims.service.DealerService;

@SpringBootTest
@DisplayName("Testing Dealer Authentication")
class DealerControllerTest {
	
	@Autowired
	private DealerController dcontroller; //instance of class to be tested
	
	@MockBean
	private DealerService dservice; //mock
	
	Dealer dealer;
	Address address;
	DealerAndAddressProjection dealerInfo1;
	DealerAndAddressProjection dealerInfo2;
	@BeforeEach
	void setUp() throws Exception {
		dealer = new Dealer();
		address = new Address();
		dealerInfo1 = new DealerAndAddressProjection();
		dealerInfo2 = new DealerAndAddressProjection();
	}

	@AfterEach
	void tearDown() throws Exception {
		dealer = null;
		address =null;
		dealerInfo1 = null;
		dealerInfo2 = null;
	}

	@Test
	void test() throws ParseException {
		dealer.setEmail("rod@spring.com");
		dealer.setFname("Rod");
		dealer.setLname("Johnson");
		dealer.setPassword("Password123");
		
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date dob = new Date(df.parse("2000-09-25").getTime());
		dealer.setDob(dob);
		dealer.setPhoneNo("1234567890");
		
		address.setStreet("456 Sillicon Valley");
		address.setCity("California");
		address.setPincode(760010);
		
		dealer.setAddress(address);
		
		/*
		 * Matchers are like regex or wildcards where instead of a specific input (and or output), 
		 * you specify a range/type of input/output based on which stubs/spies can be rest and calls to stubs can be verified.
		 * Matchers are a powerful tool, which enables a shorthand way of setting up stubs as well as verifying invocations on 
		 * the stubs by mentioning argument inputs as generic types to specific values depending on the use-case or scenario.
		 * 
		 * any(java language class) –

		Example: any(ClassUnderTest.class) – This is a more specific variant of any() 
		and will accept only objects of the class type that’s mentioned as the template parameter.
		 * */
		
		when(dservice.registerDealer(any(Dealer.class))).thenReturn(dealer);
		ResponseEntity<String>re =dcontroller.createDealer(dealer);
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals("Registration Successful", re.getBody());
		
		verify(dservice,times(1)).registerDealer(any(Dealer.class));
	}
	
	@Test
	void testLoginDealer() throws ResourceNotFoundException {
		dealer.setEmail("rod@spring.com");
		dealer.setPassword("Password123");
		
		when(dservice.loginDealer("rod@spring.com")).thenReturn(Optional.of(dealer));
		
		Dealer x = dservice.loginDealer("rod@spring.com").get();
		assertEquals(x.getEmail(), dealer.getEmail());
		assertEquals(x.getPassword(), dealer.getPassword());
		
		ResponseEntity<Boolean> result =dcontroller.loginDealer(dealer);
		
		assertTrue(result.getBody());
		
		verify(dservice, times(2)).loginDealer("rod@spring.com");
	}
	
	@Test 
	void getDealerInfo() {
		dealerInfo1.setEmail("rod@spring.com");
		dealerInfo1.setFname("Rod");
		dealerInfo1.setLname("Johnson");
		dealerInfo1.setPhoneNo("1234567890");
		dealerInfo1.setStreet("456 Sillicon Valley");
		dealerInfo1.setCity("California");
		dealerInfo1.setPincode(760010);
		
		dealerInfo2.setEmail("king@spring.com");
		dealerInfo2.setFname("Gavin");
		dealerInfo2.setLname("King");
		dealerInfo2.setPhoneNo("1234567890");
		dealerInfo2.setStreet("256 Sillicon Valley");
		dealerInfo2.setCity("Pheonix");
		dealerInfo2.setPincode(760010);
		
		List<DealerAndAddressProjection> mockDealerInfo = new ArrayList<>();
		mockDealerInfo.add(dealerInfo1);
		mockDealerInfo.add(dealerInfo2);
		
		when(dservice.getDealerInfo()).thenReturn(mockDealerInfo);
		
		ResponseEntity<List<DealerAndAddressProjection>> re=dcontroller.getDealerInfo();
		
		assertEquals(HttpStatus.OK, re.getStatusCode());
		assertEquals(mockDealerInfo, re.getBody());
		
		verify(dservice,times(1)).getDealerInfo();
	}

}
