package comwellsfargo.training.ims.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import comwellsfargo.training.ims.model.Dealer;
import comwellsfargo.training.ims.repository.DealerRepository;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class DealerService {
	@Autowired
	private DealerRepository drepo;
	
	public Dealer registerDealer(Dealer d) {
		return drepo.save(d);
	}
	public Optional<Dealer> loginDealer(String email){
		return drepo.findByEmail(email);// Invoke custom method
	}
	
}
