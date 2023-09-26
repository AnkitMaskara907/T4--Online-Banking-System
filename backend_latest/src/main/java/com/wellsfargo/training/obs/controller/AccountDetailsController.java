package com.wellsfargo.training.obs.controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.service.AccountDetailsService;

@CrossOrigin
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
	@GetMapping("/accountDetails")
	public List<AccountDetails> getAllUsers() {
		try {
			return adService.listAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@GetMapping("/AccountDetails/{email}")
	public ResponseEntity<AccountDetails> getAccountByEmail(@PathVariable(value="email") String email){
		AccountDetails account=(adService.loginAccount(email)).orElse(new AccountDetails());
		return ResponseEntity.ok().body(account);
	}
	@GetMapping("/accountDetails/search")
		public ResponseEntity<?> searchUsersByName(@RequestParam("name") String name){
			try {
				List<AccountDetails> users=adService.searchUsersByName(name);
				
				if(users.isEmpty()) {
					return new ResponseEntity<>("No Users Found with given Name.",
							HttpStatus.NOT_FOUND);
				}
				return new ResponseEntity<>(users,HttpStatus.OK);
			} catch(Exception e) {
				e.printStackTrace();
				
				return new ResponseEntity<>("Database Error",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		
		@DeleteMapping("/accountDetails/{uid}")
		public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable(value = "uid") Long uid) throws ResourceNotFoundException{
			adService.getSingleUser(uid).orElseThrow(()-> new
					ResourceNotFoundException("User Not Found for this ID: "+uid));;
					
			adService.deleteUser(uid);
			
			Map<String, Boolean> response = new HashMap<String, Boolean>();
			response.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok().body(response);
		}
	
		@PutMapping("/toggleUser/{uid}")
		public ResponseEntity<AccountDetails> approveUser(@PathVariable(value = "uid") Long uid) throws ResourceNotFoundException{
			AccountDetails user = adService.getSingleUser(uid).orElseThrow(()-> new
					ResourceNotFoundException("User Not Found for this ID: "+uid));
			//update the user with new values
			user.setStatus(!user.getStatus());
			final AccountDetails approvedUser = adService.getDetails(user);
			return ResponseEntity.ok().body(approvedUser);
		}
		@GetMapping("/accountDetails/ID/{id}")
		public ResponseEntity<AccountDetails> getUserById(@PathVariable(value = "id") Long uid) throws ResourceNotFoundException{
			AccountDetails p = adService.getSingleUser(uid).orElseThrow(()-> new
					ResourceNotFoundException("User Not Found for this ID: "+uid));
			return ResponseEntity.ok().body(p);
		}

}