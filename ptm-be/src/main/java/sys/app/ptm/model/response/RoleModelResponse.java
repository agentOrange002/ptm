package sys.app.ptm.model.response;

import java.util.Collection;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.entity.AuthorityEntity;

@Getter @Setter
public class RoleModelResponse {
	private Long id;
	private String name;
	private Collection<AuthorityEntity> authorities;
}
