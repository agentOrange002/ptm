package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.RoleDto;
import sys.app.ptm.model.response.AuthorityModelResponse;

public interface RoleService {
	RoleDto saveRole(RoleDto roleDto);

	/*
	 * RoleEntity createRole(String name, Collection<AuthorityEntity> authorities);
	 */
	
	List<RoleDto> getAllRole();
	RoleDto applyAuthorities(String name, List<AuthorityModelResponse> authorities);

	List<RoleDto> getRolesByUserId(String userId);
	
	List<RoleDto> removeUserRole(String userId, String roleName);
}
