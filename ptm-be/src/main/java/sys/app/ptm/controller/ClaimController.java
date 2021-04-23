package sys.app.ptm.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ClaimDto;
import sys.app.ptm.model.request.ClaimModelRequest;
import sys.app.ptm.model.response.ClaimModelResponse;
import sys.app.ptm.service.ClaimService;

@Tag(name = "Claim", description = "Claim REST API Services")
@AllArgsConstructor
@RestController
@RequestMapping({ "/api/claims" })
public class ClaimController {
	
	private ClaimService claimService;
	
	@PostMapping(path="/{boardId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)	
	public ClaimModelResponse saveRecruitment(@PathVariable String boardId,@RequestBody ClaimModelRequest request) {
		ClaimDto dto =claimService.saveRecruitment(boardId,request);
		return new ModelMapper().map(dto, ClaimModelResponse.class);
	}
}
