package sys.app.ptm.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserAddressDto implements Serializable {
	private static final long serialVersionUID = -2177973112239155953L;
	private Long id;	
	private String addressId;		
	private String city;	
	private String country;	
	private String streetName;	
	private String postalCode;	
	private String type;	
	private UserDto userDetails;
}
