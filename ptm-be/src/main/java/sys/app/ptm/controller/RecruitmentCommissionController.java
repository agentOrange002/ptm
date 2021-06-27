package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.RecruitmentCommissionDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentCommissionDto;
import sys.app.ptm.model.response.RecruitmentCommissionModelResponse;
import sys.app.ptm.model.shortresponse.ShortRecruitmentCommissionModelResponse;
import sys.app.ptm.service.RecruitmentCommissionService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/recruitmentcommissions" })
public class RecruitmentCommissionController {
	
	private RecruitmentCommissionService service;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortRecruitmentCommissionModelResponse> getAll() {
		List<ShortRecruitmentCommissionDto> dtoList = service.getAllRecruitmentCommission();
		List<ShortRecruitmentCommissionModelResponse> responseList = new ArrayList<ShortRecruitmentCommissionModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(ShortRecruitmentCommissionDto dto: dtoList ) {
			responseList.add(mapper.map(dto, ShortRecruitmentCommissionModelResponse.class));
		}
		return responseList;	
	}
	
	@GetMapping(path="/{rcId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public RecruitmentCommissionModelResponse getByID(@PathVariable String rcId) {
		RecruitmentCommissionDto dto = service.getByRcid(rcId);
		return new ModelMapper().map(dto, RecruitmentCommissionModelResponse.class);
	}
} 
