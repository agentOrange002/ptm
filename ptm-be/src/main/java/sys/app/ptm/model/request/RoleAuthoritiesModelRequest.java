package sys.app.ptm.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.response.AuthorityModelResponse;

@Getter @Setter
public class RoleAuthoritiesModelRequest {	
	private List<AuthorityModelResponse> authorities;
}
