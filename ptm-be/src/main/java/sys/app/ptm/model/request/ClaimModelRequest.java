package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClaimModelRequest {
	private String mode;
	private String details;
	private String remark;
}
