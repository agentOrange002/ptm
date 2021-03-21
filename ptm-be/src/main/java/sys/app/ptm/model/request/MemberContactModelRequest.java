package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberContactModelRequest {
	private String type;
	private String serviceName;
	private String detail;	
}
