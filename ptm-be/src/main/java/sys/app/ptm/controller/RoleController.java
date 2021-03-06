package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import sys.app.ptm.model.request.RemoveUserRoleModelRequest;
import sys.app.ptm.model.request.RoleAuthoritiesModelRequest;
import sys.app.ptm.model.request.RoleModelRequest;
import sys.app.ptm.model.response.RoleModelResponse;
import sys.app.ptm.dto.RoleDto;
import sys.app.ptm.service.RoleService;

@Tag(name = "Roles", description = "Roles REST API Service")
@AllArgsConstructor
@RestController
@RequestMapping({"/api/roles"})
public class RoleController {
	private RoleService roleService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RoleModelResponse postRole(@RequestBody RoleModelRequest requestModel) {		
		RoleDto roleDto = new ModelMapper().map(requestModel, RoleDto.class);
		RoleDto saveroleDto =  roleService.saveRole(roleDto);	
		return new ModelMapper().map(saveroleDto, RoleModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE )
	public List<RoleModelResponse> getRoles() {
		List<RoleDto> listDto = roleService.getAllRole();
		List<RoleModelResponse> responseList = new ArrayList<RoleModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(RoleDto dto: listDto) {
			responseList.add(mapper.map(dto, RoleModelResponse.class));
		}
		return responseList;
	}	
	
	@PutMapping(path="/applyauthorities/{name}",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public RoleModelResponse applyAuthorities(@PathVariable String name,@RequestBody RoleAuthoritiesModelRequest requestModel) {	
		RoleDto saveroleDto =  roleService.applyAuthorities(name, requestModel.getAuthorities());	
		return new ModelMapper().map(saveroleDto, RoleModelResponse.class);
	}
	
	@GetMapping(path="/user/{userId}",produces = MediaType.APPLICATION_JSON_VALUE )
	public List<RoleModelResponse> getRolesByUserId(@PathVariable String userId) {
		List<RoleDto> listDto = roleService.getRolesByUserId(userId);
		List<RoleModelResponse> responseList = new ArrayList<RoleModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(RoleDto dto: listDto) {
			responseList.add(mapper.map(dto, RoleModelResponse.class));
		}
		return responseList;
	}
	
	@PostMapping(path="/remove/userrole",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<RoleModelResponse> removeUserRole(@RequestBody RemoveUserRoleModelRequest model) {
		List<RoleDto> listDto = roleService.removeUserRole(model.getUserId(), model.getRoleName());
		List<RoleModelResponse> responseList = new ArrayList<RoleModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(RoleDto dto: listDto) {
			responseList.add(mapper.map(dto, RoleModelResponse.class));
		}
		return responseList;
	}
}
