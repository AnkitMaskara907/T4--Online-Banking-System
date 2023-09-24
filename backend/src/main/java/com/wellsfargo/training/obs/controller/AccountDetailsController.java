package com.wellsfargo.training.obs.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.AccountDetails;
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
	
	//Open PostMan, make a GET Request - http://localhost:8085/obs/api/accountDetails
		@GetMapping("/accountDetails")
		public ResponseEntity<List<AccountDetails>> getAllAccountDetails(){
			try {
				List<AccountDetails> ad = adService.listAll();
				return ResponseEntity.ok(ad);
			}
			catch(Exception e)
			{
				e.printStackTrace();
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
			}
		}
		
		
		@GetMapping("/accountDetails/{id}")
		public ResponseEntity<AccountDetails> getProductById(@PathVariable(value = "id") Long uid) throws ResourceNotFoundException{
			AccountDetails p = adService.getSingleUser(uid).orElseThrow(()-> new
					ResourceNotFoundException("User Not Found for this ID: "+uid));
			return ResponseEntity.ok().body(p);
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
		
//		public Boolean loginUser(@Validated @RequestBody AccountDetails user) throws ResourceNotFoundException {
//			String email =user.getEmail();
//			Boolean status =user.getStatus();
//			
//			AccountDetails u=adService.approveUser(email).orElseThrow(() ->
//			new ResourceNotFoundException("User Not Found for this ID ::"));
//			
//			if(email.equals(u.getEmail())) {
//				user.setStatus(!status);
//			}
//			return status;
//			}
}
