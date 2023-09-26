package comwellsfargo.training.ims.model;


//import io.micrometer.common.lang.NonNull;
/**
 * Lombok is an open-source library (basically a standalone jar) capable of doing magic
 *  in automating the boilerplate code generation for any java class. 
 *  So if Lombok is in the classpath, it can quickly get rid of all the getters & setters 
 *  methods, class constructors, hashcode and equals methods and many more by adding a 
 *  couple of annotations to the class.
 */
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@Entity
public class Address {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long addressId;
	
	private @NonNull String street;
	
	private @NonNull String city;
	
	private int pincode;
	
	@OneToOne
	@JoinColumn(name="dealer_id")
	private Dealer dealer;

	public Address(@NonNull String street,@NonNull String city, int pincode) {
		this.street = street;
		this.city = city;
		this.pincode = pincode;
	}

	public void setDealer(Dealer dealer) {
		// TODO Auto-generated method stub
		this.dealer=dealer;
	}
	
	
}

/*
 * 
 * @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long addressId;
	
	private @NonNull String street;
	private @NonNull String city;
	private int pincode;
	
	/*
     * Modeling with foreign key relationship in JPA.
     * Place @OneToOne on the primary class entity field Dealer.
     * Place @JoinColumn to configure foreign key column dealer_id in the Address class 
     * that maps to the primary key column of Dealer class. 
     
	
	@OneToOne
	@JoinColumn(name="dealer_id")
	private Dealer dealer;
	
	public Address(@NonNull String street, @NonNull String city, int pincode) {
		this.street = street;
		this.city = city;
		this.pincode = pincode;
	}
 * 
 * 
 * 
 * */


