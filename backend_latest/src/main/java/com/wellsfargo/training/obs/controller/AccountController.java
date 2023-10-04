package com.wellsfargo.training.obs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.Account;
import com.wellsfargo.training.obs.model.Address;
import com.wellsfargo.training.obs.service.AccountService;

@CrossOrigin(origins ="https://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class AccountController {
	@Autowired
	private AccountService aservice;
	
	//Open PostMan, make a POST Request - http://localhost:8085/obs/api/register
    //Select body -> raw -> JSON 
    //Insert JSON Dealer object with nested Address Object.
	
	/* ResponseEntity represents an HTTP response, including headers, body, and status. */
	@PostMapping("/register")
	public ResponseEntity<String> createAccount(@Validated @RequestBody Account account){
		try {
			Address address = account.getAddress();
			address.setAccount(account);
			account.setAddress(address);
			
			Account registeredAccount = aservice.registerAccount(account);
			if(registeredAccount!=null)
			{
				return ResponseEntity.ok("Registration Successful");
			}
			else
				return ResponseEntity.badRequest().body("Registration Failed");
		}
		catch(Exception e)
		{
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured: "+e.getMessage());
		}
	}
	
	// Open PostMan --> Post Request with email & password -
	// http://localhost:8085/obs/api/loginAccount
	@PostMapping("/loginAccount")
	public Boolean loginAccount(@Validated @RequestBody Account account) throws ResourceNotFoundException
	{
		Boolean isLoggedIn = false;
		String email = account.getEmail();
		String password = account.getPassword();
		
		Account a = aservice.loginAccount(email).orElseThrow(()->
		new ResourceNotFoundException("Account not found for this ID :: "));
		if(email.equals(a.getEmail()) && password.equals(a.getPassword()))
		{
			isLoggedIn = true;
		}
		return isLoggedIn;
	}
}
