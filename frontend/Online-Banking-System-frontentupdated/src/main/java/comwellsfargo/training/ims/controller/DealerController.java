package comwellsfargo.training.ims.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import comwellsfargo.training.ims.exception.ResourceNotFoundException;
import comwellsfargo.training.ims.model.Address;
import comwellsfargo.training.ims.model.Dealer;
import comwellsfargo.training.ims.service.DealerService;

@RestController
@RequestMapping(value="/api")
public class DealerController {
	
	 //Open PostMan, make a POST Request - http://localhost:8085/ims/api/register
    //Select body -> raw -> JSON 
    //Insert JSON Dealer object with nested Address Object.
	@Autowired
	private DealerService dservice;
	
	@PostMapping("/register")
	public ResponseEntity<String> createDealer(@Validated @RequestBody Dealer dealer ){
	/* ResponseEntity represents an HTTP response, including headers, body, and status. */
		try {
				Address address=dealer.getAddress();
				
				// Establish bidirectional 1-1 Mapping
				address.setDealer(dealer);
				dealer.setAddress(address);
				
				Dealer registeredDealer=dservice.registerDealer(dealer);
				if(registeredDealer!=null) {
					return ResponseEntity.ok("Registration Successfull");
				}
				else
					return ResponseEntity.badRequest().body("Registration Failed");
			}
			catch(Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("An Error Ocurred :"+e.getMessage());
			}
	}
	// Open PostMan --> Post Request with email & password -
	// http://localhost:8085/ims/api/loginDealer
	@PostMapping("/loginDealer")
	public Boolean loginDealer(@Validated @RequestBody Dealer dealer) throws ResourceNotFoundException{
		Boolean isLoggedIn=false;
		String email=dealer.getEmail();
		String password=dealer.getPassword();
		Dealer d=dservice.loginDealer(email).orElseThrow(()->
			new ResourceNotFoundException("Dealer not Found for this ID::"));
		if(email.equals(d.getEmail()) && password.equals(d.getPassword())){
			isLoggedIn=true;
			
		}
		return isLoggedIn;
	}
}

/*
 public ResponseEntity<String> createDealer(@Validated @RequestBody Dealer dealer){
			try {
				Address address=dealer.getAddress();
				
				// Establish bidirectional 1-1 Mapping
				address.setDealer(dealer);
				dealer.setAddress(address);
				
				Dealer registeredDealer=dservice.registerDealer(dealer);
				if(registeredDealer!=null) {
					return ResponseEntity.ok("Registration Successfull");
				}
				else
					return ResponseEntity.badRequest().body("Registration Failed");
			}
			catch(Exception e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("An Error Ocurred :"+e.getMessage());
			}
	}

*/
