package com.wellsfargo.training.obs.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.obs.model.AccountDetails;



public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Long>{
	@Query("SELECT ad FROM AccountDetails ad WHERE LOWER(REPLACE(ad.name,' ','')) LIKE "
			+ "LOWER(CONCAT(REPLACE(:name,' ',''),'%'))")
	List<AccountDetails> findUsersByNameContainingIgnoreCase(@Param("name") String name);
	
	public Optional<AccountDetails> findByEmail(String email);
}

