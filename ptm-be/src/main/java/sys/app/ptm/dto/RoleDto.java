package sys.app.ptm.dto;

import java.io.Serializable;
import java.util.Collection;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RoleDto implements Serializable {	
	private static final long serialVersionUID = 5672196125405888848L;
	private Long id;	
	private String name;	
	/* private Collection<UserEntity> users; */
	/* private Collection<AuthorityEntity> authorities; */
	private Collection<UserDto> users;
	private Collection<AuthorityDto> authorities;
}
