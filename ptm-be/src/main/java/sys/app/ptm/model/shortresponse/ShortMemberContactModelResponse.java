package sys.app.ptm.model.shortresponse;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortMemberContactModelResponse {
	private Long id;
	private String contactId;	
	private String type;
	private String serviceName;
	private String detail;	
}
