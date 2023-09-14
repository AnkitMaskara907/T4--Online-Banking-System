package comwellsfargo.training.ims.model;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

//  Model class for Registration of a User with 1-1 mapping to Address

@Entity
@Table(name="dealers")
public class Dealer {
	
	@Id // primary key constraint
	@GeneratedValue(strategy=GenerationType.IDENTITY) // auto numbering from 1
	@Column(name="did")
	private Long id;
	
	@Column(unique=true) // unique constraints
	private String email;
	
	@Column(name="first_name")
	private String fname;
	
	@Column(name="last_name")
	private String lname;
	
	private String password;
	
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date dob;
	
	@Column(name="phone",unique=true)
	private String phoneNo;
	
	@OneToOne(mappedBy="dealer", cascade=CascadeType.ALL)
	private Address address;
	
	
	
	public Dealer() {
		
	}

	public Dealer(Long id, String email, String fname, String lname, String password, Date dob, String phoneNo) {
		this.id = id;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.dob = dob;
		this.phoneNo = phoneNo;
	}

	public Dealer(Long id, String email, String fname, String lname, String password, Date dob, String phoneNo,
			Address address) {
		this.id = id;
		this.email = email;
		this.fname = fname;
		this.lname = lname;
		this.password = password;
		this.dob = dob;
		this.phoneNo = phoneNo;
		this.address = address;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.toLowerCase();
	}

	public String getFname() {
		return fname;
	}

	public void setFname(String fname) {
		this.fname = fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String lname) {
		this.lname = lname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		Base64.Encoder encoder = Base64.getEncoder();  
        String normalString = password;
        String encodedString = encoder.encodeToString(   // encrypt password in database field
        normalString.getBytes(StandardCharsets.UTF_8) );
        this.password = encodedString;
		
	}

	public Date getDob() {
		return dob;
	}

	public void setDob(Date dob) {
		this.dob = dob;
	}

	public String getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}
	
	
	
}
