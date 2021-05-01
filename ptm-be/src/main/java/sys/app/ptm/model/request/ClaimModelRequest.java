package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClaimModelRequest {
	private String modeOfClaim;
	private String details;
	private String remark;
}
