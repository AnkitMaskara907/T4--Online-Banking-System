package com.wellsfargo.training.obs.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.obs.model.Account;
import com.wellsfargo.training.obs.repository.AccountRepository;
import jakarta.transaction.Transactional;


@Service
@Transactional
public class AccountService {
	@Autowired
	private AccountRepository arepo;
	
	public Account registerAccount(Account a){
		return arepo.save(a);
	}
	
	public Optional<Account> loginAccount(String email){
		return arepo.findByEmail(email);
	}
}
