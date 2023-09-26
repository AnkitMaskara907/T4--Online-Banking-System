package com.wellsfargo.training.obs.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.wellsfargo.training.obs.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long>{
	public Optional<Account> findByEmail (String email);
}
