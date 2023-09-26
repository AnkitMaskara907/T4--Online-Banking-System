package com.wellsfargo.training.obs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.service.AccountDetailsService;

@RestController
@RequestMapping(value="/api")
public class AccountDetailsController {
	
	@Autowired
	private AccountDetailsService adService;
	@GetMapping("/welcome")
	public String demo() {
		return "Welcome to Online Banking System";
	}
	
	@PostMapping("/accountDetails")
	public AccountDetails saveDetails(@Validated @RequestBody AccountDetails details) {
		try {
			AccountDetails ad=adService.getDetails(details);
			return ad;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	

}
