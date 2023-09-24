package com.wellsfargo.training.obs.repository;

import java.util.Optional;

/**
 * 
 * @author rajgs
 * JPA Repository is mainly used for managing the data in a Spring Boot Application. 
 * JpaRepository is particularly a JPA specific extension for Repository.
 * Jpa Repository contains the APIs for basic CRUD operations, the APIS for 
 * pagination, and the APIs for sorting.
 * This Layer interacts with Database
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.obs.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	//Long is data type of id field of Product class
			/*
		     * This interface has save(),findAll(),findById(),deleteById(),count()
		       etc.. inbuilt methods of jpa repository for various database operations.
		       This interface will be implemented by class automatically
		    */
	public Optional<User> findByEmail(String email);
	
	@Query("SELECT p.user_id FROM User p WHERE LOWER(p.email) LIKE LOWER(:email)")
	int findIdByEmail(@Param("email")String email);
}
