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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import sys.app.ptm.dto.UserImageDto;
import sys.app.ptm.entity.UserImageEntity;
import sys.app.ptm.model.request.UserImageModelRequest;
import sys.app.ptm.model.response.UserImageModelResponse;
import sys.app.ptm.service.UserImageService;

@Tag(name = "UserImages", description = "UserImages REST API Service")
@AllArgsConstructor
@RestController
@RequestMapping("/api/userimages")
public class UserImageController {
	
	private UserImageService userImageService;
	
	@Operation(summary = "All UserImages", description = "Get List of All UserImage", tags = "UserImages")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserImageEntity.class)))) })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<UserImageModelResponse> allUserImage(){
		ModelMapper mapper = new ModelMapper();
		List<UserImageModelResponse> listResponse = new ArrayList<UserImageModelResponse>();
		List<UserImageDto> listDto = userImageService.allUserImage();
		for(UserImageDto dto : listDto) {
			listResponse.add(mapper.map(dto, UserImageModelResponse.class));
		}
		return listResponse;
	}
	
	@Operation(summary = "Get UserImage by UserId", description = "Get UserImage of Specific User", tags = "UserImages")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserImageEntity.class)))) })
	@GetMapping(path="/{imageId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public UserImageModelResponse getUserImageByImageId(@PathVariable String imageId){
		UserImageDto dto = userImageService.getUserImageByImageId(imageId);		
		return new ModelMapper().map(dto, UserImageModelResponse.class);
	}
	
	@Operation(summary = "Post UserImage by UserId", description = "Save UserImage on a Specific User", tags = "UserImages")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserImageEntity.class)))) })
	@PostMapping(path="/{userId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public UserImageModelResponse postUserImage(@PathVariable String userId,@RequestBody UserImageModelRequest requestModel) {
		String[] file = requestModel.getImage();
		String newFile = file[0];
		String base64Image = newFile.split(",")[1];
		//String base64Image = newFile.split(",")[0]; 
		byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
		UserImageDto transferDto = new UserImageDto();
		transferDto.setImage(imageBytes);
		UserImageDto dto = userImageService.postUserImage(userId,transferDto);
		return new ModelMapper().map(dto, UserImageModelResponse.class);
	}
	
	@Operation(summary = "Put UserImage by UserId", description = "Update UserImage of Specific User", tags = "UserImages")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Successfull Operation", content = @Content(array = @ArraySchema(schema = @Schema(implementation = UserImageEntity.class)))) })
	@PutMapping(path = "/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public UserImageModelResponse updateUserImage(@PathVariable String userId,
			@RequestBody UserImageModelRequest requestbody) {
		String[] file = requestbody.getImage();
		String newFile = file[0];
		String base64Image = newFile.split(",")[1];
		byte[] imageBytes = javax.xml.bind.DatatypeConverter.parseBase64Binary(base64Image);
		UserImageDto transferDto = new UserImageDto();
		transferDto.setImage(imageBytes);
		UserImageDto dto = userImageService.updateUserImage(transferDto, userId);		
		return new ModelMapper().map(dto, UserImageModelResponse.class);
	}
	
}