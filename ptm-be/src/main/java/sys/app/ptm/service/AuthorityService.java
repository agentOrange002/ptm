package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.AuthorityDto;
import sys.app.ptm.dto.RoleDto;

public interface AuthorityService {
	AuthorityDto createAuthority(String name);	
	List<RoleDto> getRolesByUser(String userId);
	List<AuthorityDto> getAuthoritiesByUser(String userId);
	List<AuthorityDto> getALL();
	List<AuthorityDto> getAuthoritiesByRole(String roleName);
}
