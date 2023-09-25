package com.wellsfargo.training.obs.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name="/api")
@CrossOrigin(origins="*")
public class UserController {
	
	//Open - http://localhost:8085/obs/api/welcome
	
	@GetMapping("/welcome")
	public String demo()
	{
		return "Welcome to OBS";
	}
	
}
