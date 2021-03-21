package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserLoginModelRequest {
	private String email;
	private String password;
}
