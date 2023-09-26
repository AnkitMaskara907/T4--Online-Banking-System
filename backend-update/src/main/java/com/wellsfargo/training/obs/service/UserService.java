package com.wellsfargo.training.obs.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
	@Autowired
	private PasswordEncoder passwordEncoder;

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
	public int getIdByEmail(String email) {
		return urepo.findIdByEmail(email);
	}
	public boolean updatePassword(Long uid, String oldPassword, String newPassword) {
        User user = urepo.findById(uid).orElse(null);
        if (user == null) {
            return false; // User not found
        }

        // Check if the old password matches the current password
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return false; // Invalid old password
        }

        // Update the password with the new one
        user.setPassword(passwordEncoder.encode(newPassword));
        urepo.save(user);
        return true;
    }

}
