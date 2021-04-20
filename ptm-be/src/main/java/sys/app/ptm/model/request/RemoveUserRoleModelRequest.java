package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RemoveUserRoleModelRequest {
	private String userId;
	private String roleName;
}
