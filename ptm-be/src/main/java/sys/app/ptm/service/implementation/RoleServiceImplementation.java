package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.RoleDto;
import sys.app.ptm.entity.AuthorityEntity;
import sys.app.ptm.entity.RoleEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.model.response.AuthorityModelResponse;
import sys.app.ptm.repository.RoleRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.RoleService;
import sys.app.ptm.tool.JimboyTransaction;

@AllArgsConstructor
@Service
public class RoleServiceImplementation implements RoleService {
	
	private RoleRepository roleRepository;
	private UserRepository userRepository;
	private JimboyTransaction jt;

	@Override
	public RoleDto saveRole(RoleDto roleDto) {	
		if(roleRepository.findByName("ROLE_"+roleDto.getName().toUpperCase())!=null) throw new ApplicationServiceException(ErrorMessages.ROLE_NAME_HAS_ALREADY_EXIST.getErrorMessage());
		RoleEntity roleEntity = new RoleEntity();
		roleEntity.setName("ROLE_"+roleDto.getName().toUpperCase());
		RoleEntity saveroleEntity = roleRepository.save(roleEntity);	
		return new ModelMapper().map(saveroleEntity, RoleDto.class);
	}
	
	/*
	 * @Override public RoleEntity createRole(String name,
	 * Collection<AuthorityEntity> authorities) { RoleEntity role =
	 * roleRepository.findByName(name); if (role == null) { role = new RoleEntity();
	 * role.setName(name); role.setAuthorities(authorities);
	 * roleRepository.save(role); } return role; }
	 */
	
	@Override
	public RoleDto applyAuthorities(String name, List<AuthorityModelResponse> authorities) {		
		List<AuthorityEntity> listAuthority = new ArrayList<AuthorityEntity>();
		for(AuthorityModelResponse authority: authorities) {
			listAuthority.add(jt.createAuthority(authority.getName()));
		}	
		RoleEntity saveRole = jt.applyRoleAuth(name, listAuthority);
		return new ModelMapper().map(saveRole, RoleDto.class);
	}
	
	

	@Override
	public List<RoleDto> getAllRole() {
		List<RoleEntity> listEntity = roleRepository.findAll();
		List<RoleDto> resultList = new ArrayList<RoleDto>();
		ModelMapper mapper = new ModelMapper();
		for(RoleEntity entity: listEntity) {
			resultList.add(mapper.map(entity, RoleDto.class));
		}	
		return resultList;
	}

	@Override
	public List<RoleDto> getRolesByUserId(String userId) {
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
	public List<RoleDto> removeUserRole(String userId, String roleName) {
		UserEntity user = userRepository.findByUserId(userId);
		RoleEntity role = roleRepository.findByName(roleName);		
		user.getRoles().remove(role);		
		UserEntity updateduser = userRepository.save(user);
		List<RoleEntity> listRole = new ArrayList<RoleEntity>(updateduser.getRoles());
		List<RoleDto> resultList = new ArrayList<RoleDto>();
		ModelMapper mapper = new ModelMapper();
		for(RoleEntity entity: listRole) {
			resultList.add(mapper.map(entity, RoleDto.class));
		}	
		return resultList;
	}	

}
