package sys.app.ptm.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortUserAddressModelResponse;
import sys.app.ptm.model.shortresponse.ShortUserImageModelResponse;

@Getter @Setter
public class UserModelResponse {
	private long id;	
	private String userId;	
	private String firstName;
	private String middleName;	
	private String lastName;	
	private String suffixName;
	private String fullName;
	private String email;
	private List<ShortUserAddressModelResponse> addresses;
	private ShortUserImageModelResponse userImage;
}
