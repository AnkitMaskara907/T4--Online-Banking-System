package com.wellsfargo.training.obs.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.obs.model.AccountDetails;


public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Long>{
	public Optional<AccountDetails> findByEmail(String email);
	public Optional<AccountDetails> findById(long uid);
}