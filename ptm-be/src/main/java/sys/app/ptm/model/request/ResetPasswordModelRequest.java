package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResetPasswordModelRequest {
	public String password;
	public String confirmedPassword;
}
