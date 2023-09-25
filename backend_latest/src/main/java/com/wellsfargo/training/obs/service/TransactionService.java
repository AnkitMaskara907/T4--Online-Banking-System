package com.wellsfargo.training.obs.service;

import java.sql.Date;
import java.util.List;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wellsfargo.training.obs.repository.AccountDetailsRepository;
import com.wellsfargo.training.obs.repository.AccountRepository;
//import com.welllsfargo.training.obs.exception.InsufficientFundsException;
import com.wellsfargo.training.obs.model.Account;
import com.wellsfargo.training.obs.model.AccountDetails;
import com.wellsfargo.training.obs.model.Transaction;
//import com.welllsfargo.training.obs.model.Transaction;
//import com.welllsfargo.training.obs.repository.AccountRepository;
import com.wellsfargo.training.obs.repository.TransactionRepository;

import jakarta.persistence.EntityNotFoundException;


@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository trepo;
	
	@Autowired
	private AccountDetailsRepository adRepo;
	
	@Transactional
	public void executeTransaction(Transaction t) /*throws InsufficientFundsException*/ {
		AccountDetails sourceAcc = adRepo.findById(t.getFromAc()).
				orElseThrow(() -> new EntityNotFoundException("Source not found exception"));
		AccountDetails destAcc = adRepo.findById(t.getToAc()).
				orElseThrow(() -> new EntityNotFoundException("Destination notfound exception"));
		if((sourceAcc.getBalance()-(t.getAmount())) < 0) {
//			throw new InsufficientFundsException("Insufficient balance !");
		}
		double amount = (double) t.getAmount();
		sourceAcc.setBalance(sourceAcc.getBalance()- amount);
		destAcc.setBalance(destAcc.getBalance() + amount);
		
		adRepo.save(sourceAcc);
		adRepo.save(destAcc);
		
		trepo.save(t);
	}
	
	public List<Transaction> getLast10Transactions(Long accountId) {
		Pageable pageable = PageRequest.of(0, 10,Sort.by("date").descending());
		List<Transaction> transactions = trepo.findLast10TransactionsByAccount(accountId, pageable);
		return transactions;
	}

	public List<Transaction> getTransactionBetweenDates(Long accounId, Date startDate, Date endDate) {
		return trepo.findTransactionBetweenDates(accounId, startDate, endDate);
	}

	public List<Transaction> getAllTransactions(Long accountId) {
		// Pageable pageable = PageRequest.of(0, 10,Sort.by("date").descending());
		List<Transaction> transactions = trepo.findAllTransactions(accountId);
		return transactions;
	}
}