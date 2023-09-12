package com.wellsfargo.training.obs.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api")
public class ProductController {
	@GetMapping("/welcome")
	public String demo() {
		return "Welcome to Online Banking System";
	}

}
