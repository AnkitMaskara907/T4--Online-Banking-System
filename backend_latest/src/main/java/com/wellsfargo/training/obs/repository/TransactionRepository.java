package com.wellsfargo.training.obs.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wellsfargo.training.obs.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{
	
	@Query("SELECT t FROM Transaction t WHERE t.toAc = :accountId OR t.fromAc = :accountId ORDER BY t.date DESC")
	List<Transaction> findLast10TransactionsByAccount(@Param("accountId") Long accountId, Pageable pageable);

	@Query("SELECT t FROM Transaction t WHERE (t.toAc = :accountId OR t.fromAc = :accountId)" +
			"AND t.date BETWEEN :startDate AND :endDate ORDER BY t.date")
	List<Transaction> findTransactionBetweenDates(@Param("accountId") Long accountId, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

	@Query("SELECT t FROM Transaction t WHERE t.toAc = :accountId OR t.fromAc = :accountId ORDER BY t.date DESC")
	List<Transaction> findAllTransactions(@Param("accountId") Long accountId);
}