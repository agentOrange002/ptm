package sys.app.ptm.tool;

import java.util.Collection;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import sys.app.ptm.entity.AuthorityEntity;
import sys.app.ptm.entity.RoleEntity;
import sys.app.ptm.repository.AuthorityRepository;
import sys.app.ptm.repository.RoleRepository;

@AllArgsConstructor
@Component
public class JimboyTransaction {
	
	private AuthorityRepository authorityRepository;
	private RoleRepository roleRepository;

	@Transactional 
	public AuthorityEntity createAuthority(String name) {
		AuthorityEntity authority = authorityRepository.findByName(name);
		if(authority == null) { 
			authority = new AuthorityEntity();
			authority.setName(name); 
			authorityRepository.save(authority); 
		} 
		return authority; 
	}
	
	@Transactional 
	public RoleEntity createRole(String name, Collection<AuthorityEntity> authorities) { 
		RoleEntity resultEntity = new RoleEntity();
		RoleEntity role = roleRepository.findByName(name); 
		if (role == null) { 
			role = new RoleEntity(); 
			role.setName("ROLE_"+name);
			role.setAuthorities(authorities); 
			resultEntity = roleRepository.save(role); 
		}
		else { 
			role.getAuthorities().removeAll(role.getAuthorities());
			for (AuthorityEntity auth : authorities) { 
				
				if(!role.getAuthorities().contains(auth)) { 
					role.getAuthorities().add(auth); 
				}
				
				/*
				 * else { role.getAuthorities().remove(auth); }
				 */
			} 
			resultEntity = roleRepository.save(role);
		}
		return resultEntity; 
	}
	
	@Transactional
	public RoleEntity applyRoleAuth(String name, Collection<AuthorityEntity> authorities) {
		RoleEntity resultEntity = new RoleEntity();
		RoleEntity role = roleRepository.findByName(name);
		role.getAuthorities().removeAll(role.getAuthorities());
		for (AuthorityEntity auth : authorities) {
			if (!role.getAuthorities().contains(auth)) {
				role.getAuthorities().add(auth);			}

		}
		resultEntity = roleRepository.save(role);

		return resultEntity;
	}
}
