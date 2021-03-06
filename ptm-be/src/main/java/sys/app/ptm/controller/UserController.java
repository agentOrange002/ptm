package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import sys.app.ptm.dto.UserDto;
import sys.app.ptm.dto.shortdto.ShortUserDto;
import sys.app.ptm.enums.RequestOperationName;
import sys.app.ptm.enums.RequestOperationStatus;
import sys.app.ptm.model.request.ApplyUserRoleModelRequest;
import sys.app.ptm.model.request.ResetPasswordModelRequest;
import sys.app.ptm.model.request.UserModelRequest;
import sys.app.ptm.model.response.OperationStatusModel;
import sys.app.ptm.model.response.UserModelResponse;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;
import sys.app.ptm.service.UserService;

@Tag(name = "Users", description = "Users REST API Service")
@AllArgsConstructor
@RestController
@RequestMapping({"/api/users"})
public class UserController {
	
	private UserService userService;
	
	@GetMapping(path="/all",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortUserModelResponse> allUser(){
		ModelMapper mapper = new ModelMapper();
		List<ShortUserModelResponse> response = new ArrayList<ShortUserModelResponse>();
		List<ShortUserDto> listDto = userService.allUsers();
		for(ShortUserDto dto : listDto) {
			response.add(mapper.map(dto, ShortUserModelResponse.class));
		}
		return response;
	}	
	
	@GetMapping(path="/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public UserModelResponse getUserByUserId(@PathVariable String userId) {
		UserDto dto = userService.getUserById(userId);
		return new ModelMapper().map(dto, UserModelResponse.class);
	}
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortUserModelResponse postUser(@RequestBody UserModelRequest model) {
		UserDto dto = userService.postUser(new ModelMapper().map(model, UserDto.class));
		return new ModelMapper().map(dto, ShortUserModelResponse.class);
	}
	
	@PutMapping(path = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserModelResponse updateUser(@PathVariable String id, @RequestBody UserModelRequest userDetails) {
		UserDto userDto = new ModelMapper().map(userDetails, UserDto.class);
		UserDto updatedUser = userService.updateUser(id, userDto);		
		return new ModelMapper().map(updatedUser, UserModelResponse.class);
	}

	@DeleteMapping(path = "/{id}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public OperationStatusModel deleteUser(@PathVariable String id) {
		OperationStatusModel returnValue = new OperationStatusModel();
		returnValue.setOperationName(RequestOperationName.DELETED.name());
		userService.deleteUser(id);
		returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
		return returnValue;
	}

	@PostMapping(path = "/resetpassword/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE )
	public OperationStatusModel resetPassword(@PathVariable String id, @RequestBody ResetPasswordModelRequest resetPassModel){
		String password = resetPassModel.getConfirmedPassword();		
		OperationStatusModel returnValue = new OperationStatusModel();
		boolean result = userService.authResetPassword(id, password);
		returnValue.setOperationName(RequestOperationName.PASSWORD_RESET.name());
		returnValue.setOperationResult(RequestOperationStatus.ERROR.name());
		if (result) {
			returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
		}
		return returnValue;
	}	
	
	@GetMapping(path = "/role/{roleName}", produces = MediaType.APPLICATION_JSON_VALUE )
	public List<ShortUserModelResponse> getAllUsersByRole(@PathVariable String roleName) {
		List<ShortUserModelResponse> returnList = new ArrayList<ShortUserModelResponse>();
		List<UserDto> dtoList = userService.getAllUsersByRole(roleName);
		ModelMapper mapper = new ModelMapper();
		for (UserDto dto : dtoList) {
			ShortUserModelResponse responseModel = mapper.map(dto, ShortUserModelResponse.class);
			returnList.add(responseModel);
		}
		return returnList;
	}
	
	@PutMapping(path = "/applyrole/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE )
	public UserModelResponse applyUserRole(@PathVariable String userId, @RequestBody ApplyUserRoleModelRequest detail) {		
		UserDto updatedUser = userService.applyUserRole(userId, detail.getName());		
		return new ModelMapper().map(updatedUser, UserModelResponse.class);
	}
	
}