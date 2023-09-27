//package com.wellsfargo.training.obs.service;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.wellsfargo.training.obs.model.User;
//import com.wellsfargo.training.obs.repository.UserRepository;
//import jakarta.transaction.Transactional;
//
///*
// * A service layer is an additional layer in an MVC application that 
// * mediates communication between a controller and repository layer. 
// * The service layer contains business logic. 
// * In particular, it contains validation logic. */
//
///* @Service annotation allows developers to add business functionalities.
// *  @Transactional annotation allows to manage Database transactions efficiently */
//
//@Service
//@Transactional
//public class UserService {
//
//	@Autowired
//	private UserRepository urepo;
//
//	public User saveUser(User u) {
//		return urepo.save(u);
//	}
//
//	public List<User> listAll() {
//		return urepo.findAll();
//	}
//
//	public Optional<User> loginUser(String email) {
//		return urepo.findByEmail(email);
//	}
//}
package com.wellsfargo.training.obs.service;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.obs.exception.ResourceNotFoundException;
import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.repository.UserRepository;
import jakarta.transaction.Transactional;

/*
 * A service layer is an additional layer in an MVC application that 
 * mediates communication between a controller and repository layer. 
 * The service layer contains business logic. 
 * In particular, it contains validation logic. */

/* @Service annotation allows developers to add business functionalities.
 *  @Transactional annotation allows to manage Database transactions efficiently */

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository urepo;

	public User saveUser(User u) {
		return urepo.save(u);
	}

	public List<User> listAll() {
		return urepo.findAll();
	}

	public Optional<User> getSingleUser(Long id){
		return urepo.findById(id);
	}
	public Optional<User> loginUser(String email) {
		return urepo.findByEmail(email);
	}

    public boolean changePassword(Long userId, String oldPassword, String newPassword) throws ResourceNotFoundException {
        Optional<User> optionalUser = getSingleUser(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // Decode the stored password
            Base64.Decoder decoder = Base64.getDecoder();
            String decodedPassword = new String(decoder.decode(user.getPassword()), StandardCharsets.UTF_8);

            // Check if the old password matches
            if (decodedPassword.equals(oldPassword)) {
                // Encode and set the new password
                Base64.Encoder encoder = Base64.getEncoder();
                String encodedNewPassword = encoder.encodeToString(newPassword.getBytes(StandardCharsets.UTF_8));
                user.setPassword(encodedNewPassword);
                saveUser(user);
                return true;  // Password changed successfully
            } else {
                return false;  // Old password is incorrect
            }
        } else {
            throw new ResourceNotFoundException("User Not Found for this ID: " + userId);
        }
    }
}

