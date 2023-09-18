package com.wellsfargo.training.obs.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.service.UserService;

/*Spring RestController annotation is used to create RESTful web services using Spring MVC. 
 * Spring RestController takes care of mapping request data to the defined request handler method. 
 * Once response body is generated from the handler method, it converts it to JSON or XML response. 
 * 
 * @RequestMapping - maps HTTP request with a path to a controller 
 * */

@RestController
@RequestMapping(value = "/api")
public class UserController {
	
	//Open - http://localhost:8085/obs/api/welcome
	
	@GetMapping("/welcome")
	public String demo()
	{
		return "Welcome to OBS";
	}
	
	//Open PostMan, make a POST Request - http://localhost:8085/obs/api/users
    //Select body -> raw -> JSON 
    //Insert JSON product object.
	@Autowired
	private UserService uservice;

	@PostMapping("/users")
	public User saveUser(@Validated @RequestBody User user) {
		try {
			User u=uservice.saveUser(user);
			return u;
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//Open PostMan, make a GET Request - http://localhost:8085/obs/api/users
	@GetMapping("/users")
	public List<User> getAllUsers(){
		try {
			return uservice.listAll();
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}
	
}
