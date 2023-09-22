package com.wellsfargo.training.ims.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wellsfargo.training.ims.model.Dealer;
import com.wellsfargo.training.ims.model.DealerAndAddressProjection;
import com.wellsfargo.training.ims.repository.DealerRepository;

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
		return drepo.findByEmail(email);
	}
	public List<DealerAndAddressProjection> getDealerInfo(){
		return drepo.findSelectedFieldsFromDealerAndAddress();
	}
}






//---------------------------------------------------------------------------

//package com.wellsfargo.training.ims.service;
//
//import java.util.List;
//import java.util.Optional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import com.wellsfargo.training.ims.model.Dealer;
//import com.wellsfargo.training.ims.model.DealerAndAddressProjection;
//import com.wellsfargo.training.ims.repository.DealerRepository;
//import jakarta.transaction.Transactional;
//
//@Service
//@Transactional
//public class DealerService {
//	@Autowired
//	private DealerRepository drepo;
//	
//	public Dealer registerDealer(Dealer d) {
//		return drepo.save(d);
//	}
//	
//	public Optional<Dealer> loginDealer(String email){
//		return drepo.findByEmail(email);
//	}
//	
//	public List<DealerAndAddressProjection> getDealerInfo(){
//		return drepo.findSelectedFieldsFromDealerAndAddress(); //invoking custom query method
//	}
//}
