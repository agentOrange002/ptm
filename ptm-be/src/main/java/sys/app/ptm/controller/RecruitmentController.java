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
import sys.app.ptm.dto.RecruitmentDto;
import sys.app.ptm.dto.shortdto.ShortMemberDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentDto;
import sys.app.ptm.model.request.RecruitmentMemberListModelRequest;
import sys.app.ptm.model.response.RecruitmentModelResponse;
import sys.app.ptm.model.shortresponse.ShortMemberModelResponse;
import sys.app.ptm.model.shortresponse.ShortRecruitmentModelResponse;
import sys.app.ptm.service.RecruitmentService;

@Tag(name = "Recruitment", description = "Recruitment REST API Services")
@AllArgsConstructor
@RestController
@RequestMapping({ "/api/recruitments" })
public class RecruitmentController {

		private RecruitmentService recruitmentService;
		
		@PostMapping(path="/save/{memberId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)	
		public RecruitmentModelResponse saveRecruitment(@PathVariable String memberId,@RequestBody RecruitmentMemberListModelRequest request) {
			RecruitmentDto dto = recruitmentService.saveRecruitment(memberId,request);
			return new ModelMapper().map(dto, RecruitmentModelResponse.class);
		}
		
		@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)	
		public List<ShortRecruitmentModelResponse> allRecruitments(){
			 List<ShortRecruitmentModelResponse> list = new ArrayList<ShortRecruitmentModelResponse>();
			 ModelMapper mapper = new ModelMapper();
			 List<ShortRecruitmentDto> dtos = recruitmentService.allRecruitments();
			 for(ShortRecruitmentDto dto: dtos) {
				 list.add(mapper.map(dto, ShortRecruitmentModelResponse.class));
			 }			 
			 return list;
		}
		
		@GetMapping(path="/{recruitmentId}",produces = MediaType.APPLICATION_JSON_VALUE)
		public RecruitmentModelResponse getByRecruitmentId(@PathVariable String recruitmentId) {
			RecruitmentDto dto = recruitmentService.getByRecruitmentId(recruitmentId);
			RecruitmentModelResponse response = new ModelMapper().map(dto, RecruitmentModelResponse.class);
			ModelMapper mapper = new ModelMapper();
			List<ShortMemberModelResponse> listResponse = new ArrayList<ShortMemberModelResponse>();
			for(ShortMemberDto dito: dto.getMembersRecruited()){
				listResponse.add(mapper.map(dito, ShortMemberModelResponse.class));		
			}
			response.setMembersRecruited(listResponse);
			return response;
		}
		
		@PutMapping(path="/applymembers/{recruitmentId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
		public RecruitmentModelResponse applyRecruitedMembers(@PathVariable String recruitmentId, @RequestBody RecruitmentMemberListModelRequest request) {
			RecruitmentDto dto = recruitmentService.applyRecruitedMembers(recruitmentId,request);
			return new ModelMapper().map(dto, RecruitmentModelResponse.class);
		}
}
