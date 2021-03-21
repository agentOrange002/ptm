package sys.app.ptm.model.shortresponse;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortUserModelResponse {
	private long id;	
	private String userId;	
	private String firstName;
	private String middleName;	
	private String lastName;	
	private String suffixName;
	private String fullName;
	private String email;	
}
