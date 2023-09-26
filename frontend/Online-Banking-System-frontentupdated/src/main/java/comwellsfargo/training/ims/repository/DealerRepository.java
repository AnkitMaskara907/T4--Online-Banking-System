package comwellsfargo.training.ims.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import comwellsfargo.training.ims.model.Dealer;

public interface DealerRepository extends JpaRepository<Dealer, Long> {
	// Custom method to fetch record/object based on a non-primary key field
	// Optional- Java 8 class used to deal null pointer exception
	public Optional<Dealer> findByEmail(String email);
}
