package sys.app.ptm.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class MemberAddressDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2810815102428537726L;
	private Long id;
	private String addressId;	
	private String city;	
	private String country;	
	private String streetName;	
	private String postalCode;	
	private String type;		
	private MemberDto memberAddressDetails;
}
