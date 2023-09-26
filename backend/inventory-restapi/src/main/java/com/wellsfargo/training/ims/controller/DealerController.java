package com.wellsfargo.training.ims.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.ims.exception.ResourceNotFoundException;
import com.wellsfargo.training.ims.model.Address;
import com.wellsfargo.training.ims.model.Dealer;
import com.wellsfargo.training.ims.model.DealerAndAddressProjection;
import com.wellsfargo.training.ims.service.DealerService;

//Controller for registration and Login process

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api")
public class DealerController {
	@Autowired //used for dependency injection
	private DealerService dservice;
	
	/* ResponseEntity represents an HTTP response, including headers, body, and status. */
	 //Open PostMan, make a POST Request - http://localhost:8085/ims/api/register
    //Select body -> raw -> JSON 
    //Insert JSON Dealer object with nested Address Object.
	
	@PostMapping("/register")
	public ResponseEntity<String> createDealer(@Validated @RequestBody Dealer dealer){
		try {
			Address address=dealer.getAddress();
			
			address.setDealer(dealer);
			dealer.setAddress(address);
			
			Dealer registeredDealer=dservice.registerDealer(dealer);
			if(registeredDealer != null) {
				return ResponseEntity.ok("Registration Successful");
			}
			else {
				return ResponseEntity.badRequest().body("Registration failed");
			}}
			catch(Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An Error Ocurred :"+e.getMessage());
			
		}
	}
	// Open PostMan --> Post Request with email & password -
		// http://localhost:8085/ims/api/loginDealer
	
	@PostMapping("/loginDealer")
	public ResponseEntity<Boolean> loginDealer(@Validated @RequestBody Dealer dealer) throws ResourceNotFoundException {
		Boolean isLoggedIn=false;
		String email=dealer.getEmail();
		String password=dealer.getPassword();
		
		Dealer d=dservice.loginDealer(email).orElseThrow(() ->
		new ResourceNotFoundException("Dealer Not Found for this ID ::"));
		
		if(email.equals(d.getEmail()) && password.equals(d.getPassword())) {
			isLoggedIn=true;
		}
		return ResponseEntity.ok(isLoggedIn);
		}
	//Open postman and make a get request http://localhost:8085/ims/api/dealers
	@GetMapping("/dealers")
	public ResponseEntity<List<DealerAndAddressProjection>> getDealerInfo(){
		try {
			List<DealerAndAddressProjection> selectedFields=dservice.getDealerInfo();
			return ResponseEntity.ok(selectedFields);
		}
		catch(Exception ex) {
			ex.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}
}








//------------------------------------------------------------------------------------------------



//package com.wellsfargo.training.ims.controller;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.wellsfargo.training.ims.exception.ResourceNotFoundException;
//import com.wellsfargo.training.ims.model.Address;
//import com.wellsfargo.training.ims.model.Dealer;
//import com.wellsfargo.training.ims.model.DealerAndAddressProjection;
//import com.wellsfargo.training.ims.service.DealerService;
//
///*
//
//Spring MVC provides @CrossOrigin annotation that marks the annotated method or type as permitting cross-origin requests.
//The CORS (Cross-Origin Resource Sharing) allows a webpage to request additional resources into the browser from other domains
//such as API data using AJAX, font files, style sheets etc. 
//
//*/
//
//@CrossOrigin(origins ="http://localhost:3000")
//@RestController
//@RequestMapping(value = "/api")
//
//public class DealerController {
//	
//	@Autowired
//	private DealerService dservice;
//	
//	 //Open PostMan, make a POST Request - http://localhost:8085/ims/api/register
//    //Select body -> raw -> JSON 
//    //Insert JSON Dealer object with nested Address Object.
//	
//	/* ResponseEntity represents an HTTP response, including headers, body, and status. */
//	@PostMapping("/register")
//	public ResponseEntity<String> createDealer(@Validated @RequestBody Dealer dealer){
//		try {
//			Address address = dealer.getAddress();
//			address.setDealer(dealer);
//			dealer.setAddress(address);
//			
//			Dealer registeredDealer = dservice.registerDealer(dealer);
//			if(registeredDealer!=null)
//			{
//				return ResponseEntity.ok("Resgistration Successful");			
//			}
//			else
//			{
//				return ResponseEntity.badRequest().body("Registration Failed");
//			}
//		}
//		catch(Exception e)
//		{
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: "+ e.getMessage());
//		}
//	}
//	
//	// Open PostMan --> Post Request with email & password -
//	// http://localhost:8085/ims/api/loginDealer
//	@PostMapping("/loginDealer")
//	public Boolean loginDealer(@Validated @RequestBody Dealer dealer) throws ResourceNotFoundException
//	{
//		Boolean isLoggedIn = false;
//		String email = dealer.getEmail();
//		String password= dealer.getPassword(); 
//		
//		Dealer d = dservice.loginDealer(email).orElseThrow(() ->
//		new ResourceNotFoundException("Dealer Not Found for this ID :: "));
//		if(email.equals(d.getEmail()) && password.equals(d.getPassword()))
//		{
//			isLoggedIn = true;
//		}
//		return isLoggedIn;
//	}
//	
//	//Open Postman and make a request to  http://localhost:8085/ims/api/dealers
//	@GetMapping("/dealers")
//	public ResponseEntity<List<DealerAndAddressProjection>> getDealerInfo(){
//		try {
//			List<DealerAndAddressProjection> selectedFields = dservice.getDealerInfo();
//			return ResponseEntity.ok(selectedFields);
//		}
//		catch (Exception ex){
//			ex.printStackTrace();
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//		}
//	}
//}
