package com.wellsfargo.training.ims.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.wellsfargo.training.ims.model.Dealer;
import com.wellsfargo.training.ims.model.DealerAndAddressProjection;

/*
* @Query Annotation is used for defining custom queries in Spring Data JPA. 
* When you are unable to use the query methods to execute database operations 
* then you can use @Query to write a more flexible query to fetch data. 
*  
	@Query Annotation supports both JPQL and native SQL queries.
	It also supports SpEL expressions.
	@Param in method arguments to bind query parameter.
*/

public interface DealerRepository extends JpaRepository<Dealer, Long> {
	public Optional<Dealer> findByEmail (String email);
	
	//Custom Queries using JPQL
	@Query("SELECT new wells.fargo.training.ims.model.DealerAndAddressProjections"
			+"(d.id, d.fname, d.lname, d.phone, d.email,"
			+"a.street, a.city, a.pincode)"
			+"FROM DEALER d JOIN d.address a")
	List<DealerAndAddressProjection> findSelectefFieldsFromDealerAndAddress();
}
