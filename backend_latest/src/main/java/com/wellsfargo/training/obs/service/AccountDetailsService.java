package com.wellsfargo.training.obs.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.model.User;
import com.wellsfargo.training.obs.repository.AccountDetailsRepository;

@Service
@Transactional
public class AccountDetailsService {
	@Autowired private AccountDetailsRepository adRepo;

	  public AccountDetails getDetails(AccountDetails p) {
		  return adRepo.save(p); //invokes predefined save method of JPA repo
	  }
	  
	  public List<AccountDetails> listAll() {
			return adRepo.findAll();
		}

}