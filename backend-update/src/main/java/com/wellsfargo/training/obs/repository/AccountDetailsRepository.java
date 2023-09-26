package com.wellsfargo.training.obs.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wellsfargo.training.obs.model.AccountDetails;


public interface AccountDetailsRepository extends JpaRepository<AccountDetails, Long>{

}
