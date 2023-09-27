package com.wellsfargo.training.obs.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.repository.UserRepository;
import com.wellsfargo.training.obs.service.UserService;

/*Spring RestController annotation is used to create RESTful web services using Spring MVC. 
 * Spring RestController takes care of mapping request data to the defined request handler method. 
 * Once response body is generated from the handler method, it converts it to JSON or XML response. 
 * 
 * @RequestMapping - maps HTTP request with a path to a controller 
 * */

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value = "/api")
public class UserController {

	// Open - http://localhost:8085/obs/api/welcome1

	@GetMapping("/welcome1")
	public String demo() {
		return "Welcome to OBS";
	}

	// Open PostMan, make a POST Request - http://localhost:8085/obs/api/users
	// Select body -> raw -> JSON
	// Insert JSON product object.
	@Autowired
	private UserService uservice;
	
	@PostMapping("/users")
	public User saveUser(@Validated @RequestBody User user) {
		try {
			User u = uservice.saveUser(user);
			return u;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable(value = "id") Long uId) throws ResourceNotFoundException{
		User u = uservice.getSingleUser(uId).orElseThrow(()-> new
				ResourceNotFoundException("Product Not Found for this ID: "+uId));
		return ResponseEntity.ok().body(u);
	}
	
//	@GetMapping("/users/email/{email}")
//	public ResponseEntity<Integer> getUserIdByEmail(@PathVariable(value = "email") String email_id){
//		User user = (uservice.loginUser(email_id)).orElse(new User());
//		return ResponseEntity.ok().body(user.getUser_id());
//	}

	@GetMapping("/users/email/{email}")
	public ResponseEntity<User> getUserByEmail(@PathVariable(value="email") String email){
		User user=(uservice.loginUser(email)).orElse(new User());
		return ResponseEntity.ok().body(user);
	}
	
	// Open PostMan, make a GET Request - http://localhost:8085/obs/api/users
	@GetMapping("/users")
	public List<User> getAllUsers() {
		try {
			return uservice.listAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// Open PostMan --> Post Request with email & password -
	// http://localhost:8085/obs/api/loginUser

@PostMapping("/loginUser")
public Boolean loginUser(@Validated @RequestBody User user) throws ResourceNotFoundException {
	Boolean isLoggedIn=false;
	String email=user.getEmail();
	String password=user.getPassword();
	
	User u=uservice.loginUser(email).orElseThrow(() ->
	new ResourceNotFoundException("User Not Found for this ID ::"));
	
	if(email.equals(u.getEmail()) && password.equals(u.getPassword())) {
		isLoggedIn=true;
	}
	return isLoggedIn;
	}

@PostMapping("/users/{id}/changePassword")
public ResponseEntity<String> changePassword(
        @PathVariable("id") String userId,
        @RequestBody Map<String, String> passwords) throws ResourceNotFoundException {
	Long userIdLong = Long.parseLong(userId);
	   String oldPassword = passwords.get("oldPassword");
	   String newPassword = passwords.get("newPassword");
	   
    boolean passwordChanged = uservice.changePassword(userIdLong, oldPassword, newPassword);
    if (passwordChanged) {
        return ResponseEntity.ok().body("Password changed successfully.");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password. Please check your old password.");
    }
}


}

