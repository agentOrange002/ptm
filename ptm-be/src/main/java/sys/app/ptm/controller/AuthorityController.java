package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import sys.app.ptm.model.request.AuthorityModelRequest;
import sys.app.ptm.model.response.AuthorityModelResponse;
import sys.app.ptm.model.response.RoleModelResponse;
import sys.app.ptm.dto.AuthorityDto;
import sys.app.ptm.dto.RoleDto;
import sys.app.ptm.service.AuthorityService;

@Tag(name = "Authorities", description = "Authorities REST API Service")
@AllArgsConstructor
@RestController
@RequestMapping({ "/api/authorities" })
public class AuthorityController {
	
	private AuthorityService authorityService;	

	@Operation(summary = "All Authorities By Roles UserId", description = "Get list of all Authorities By Roles UserId", tags = "Authorities")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AuthorityModelResponse.class)))) })
	@GetMapping(path="/roles/{userid}", produces = {MediaType.APPLICATION_JSON_VALUE})
	public List<RoleModelResponse> getRolesAuthoritiesByUser(@PathVariable String userid) {	
		List<RoleDto> listDto = authorityService.getRolesByUser(userid);
		List<RoleModelResponse> responseList = new ArrayList<RoleModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(RoleDto dto: listDto) {
			responseList.add(mapper.map(dto, RoleModelResponse.class));
		}
		return responseList;		
	}
	
	@Operation(summary = "All Authorities By UserId", description = "Get list of all Authorities By UserId", tags = "Authorities")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = AuthorityModelResponse.class)))) })
	@GetMapping(path="/{userid}", produces = MediaType.APPLICATION_JSON_VALUE)	
	public List<AuthorityModelResponse> getAuthoritiesByUser(@PathVariable String userid) {	
		List<AuthorityDto> listDto = authorityService.getAuthoritiesByUser(userid);
		List<AuthorityModelResponse> responseList = new ArrayList<AuthorityModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityDto dto: listDto) {
			responseList.add(mapper.map(dto, AuthorityModelResponse.class));
		}
		return responseList;		
	}
	
	
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)	
	public AuthorityModelResponse saveAuthority(@RequestBody AuthorityModelRequest request) {
		AuthorityDto dto = authorityService.createAuthority(request.getName());
		return new ModelMapper().map(dto, AuthorityModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)	
	public List<AuthorityModelResponse> getALL() {	
		List<AuthorityDto> listDto = authorityService.getALL();
		List<AuthorityModelResponse> responseList = new ArrayList<AuthorityModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityDto dto: listDto) {
			responseList.add(mapper.map(dto, AuthorityModelResponse.class));
		}
		return responseList;		
	}
	
	@GetMapping(path="/byrole/{roleName}",produces = MediaType.APPLICATION_JSON_VALUE)	
	public List<AuthorityModelResponse> getAuthoritiesByRole(@PathVariable String roleName) {	
		List<AuthorityDto> listDto = authorityService.getAuthoritiesByRole(roleName);
		List<AuthorityModelResponse> responseList = new ArrayList<AuthorityModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(AuthorityDto dto: listDto) {
			responseList.add(mapper.map(dto, AuthorityModelResponse.class));
		}
		return responseList;		
	}
	
}