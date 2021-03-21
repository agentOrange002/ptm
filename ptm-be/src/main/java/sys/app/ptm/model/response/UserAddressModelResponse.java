package sys.app.ptm.model.response;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class UserAddressModelResponse {
	private Long id;	
	private String addressId;		
	private String city;	
	private String country;	
	private String streetName;	
	private String postalCode;	
	private String type;	
	private ShortUserModelResponse userDetails;
}
