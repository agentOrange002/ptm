package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateMemberModelRequest {
	private String firstName;
	private String middleName;
	private String lastName;
	private String suffixName;	
}