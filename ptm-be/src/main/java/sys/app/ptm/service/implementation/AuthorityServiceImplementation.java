package sys.app.ptm.service.implementation;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import sys.app.ptm.dto.AuthorityDto;
import sys.app.ptm.dto.RoleDto;
import sys.app.ptm.entity.AuthorityEntity;
import sys.app.ptm.entity.RoleEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.repository.AuthorityRepository;
import sys.app.ptm.repository.RoleRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.AuthorityService;

@AllArgsConstructor
@Service
public class AuthorityServiceImplementation implements AuthorityService {
	
	private AuthorityRepository authorityRepository;	
	private RoleRepository roleRepository;	
	private UserRepository userRepository;

	@Override
	public AuthorityDto createAuthority(String name) {
		AuthorityEntity authority = authorityRepository.findByName(name);
		if(authority == null) { 	
			authority = new AuthorityEntity();
			authority.setName(name);
			authorityRepository.save(authority); 
		}
		return new ModelMapper().map(authority, AuthorityDto.class);
	}

	@Override
	public List<RoleDto> getRolesByUser(String userId) {
		UserEntity user = userRepository.findByUserId(userId);
		List<RoleEntity> listEntity = roleRepository.findAllByUsers(user);
		List<RoleDto> resultList = new ArrayList<RoleDto>();
		ModelMapper mapper = new ModelMapper();
		for(RoleEntity entity: listEntity) {
			resultList.add(mapper.map(entity, RoleDto.class));
		}	
		return resultList;
	}

	@Override
	public List<AuthorityDto> getAuthoritiesByUser(String userid) {		
		List<AuthorityEntity> list = authorityRepository.findAuthorizationsByUserId(userid);
		List<AuthorityDto> authorityDto = new ArrayList<AuthorityDto>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityEntity entity: list) {
			authorityDto.add(mapper.map(entity, AuthorityDto.class));
		}		
		return authorityDto;
	}

	@Override
	public List<AuthorityDto> getALL() {
		List<AuthorityEntity> list = authorityRepository.findAll();
		List<AuthorityDto> authorityDto = new ArrayList<AuthorityDto>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityEntity entity: list) {
			authorityDto.add(mapper.map(entity, AuthorityDto.class));
		}		
		return authorityDto;
	}

	@Override
	public List<AuthorityDto> getAuthoritiesByRole(String roleName) {
		RoleEntity role = roleRepository.findByName(roleName);
		List<AuthorityEntity> list = authorityRepository.findAllByRoles(role);
		List<AuthorityDto> authorityDto = new ArrayList<AuthorityDto>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityEntity entity: list) {
			authorityDto.add(mapper.map(entity, AuthorityDto.class));
		}		
		return authorityDto;
	}

}
