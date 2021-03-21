package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserAddressModelRequest {
	private String city;	
	private String country;	
	private String streetName;	
	private String postalCode;	
	private String type;	
}
