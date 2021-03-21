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

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.MemberDto;
import sys.app.ptm.dto.shortdto.ShortMemberDto;
import sys.app.ptm.model.request.MemberModelRequest;
import sys.app.ptm.model.request.UpdateMemberModelRequest;
import sys.app.ptm.model.response.MemberModelResponse;
import sys.app.ptm.model.shortresponse.ShortMemberModelResponse;
import sys.app.ptm.service.MemberService;

@AllArgsConstructor
@RestController
@RequestMapping({"/api/members"})
public class MemberController {
	
	private MemberService memberService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberModelResponse saveMember(@RequestBody MemberModelRequest request) {
		MemberDto dto = new ModelMapper().map(request, MemberDto.class);
		MemberDto saveDto = memberService.saveMember(dto,request.getLoggedBy());
		return new ModelMapper().map(saveDto, ShortMemberModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortMemberModelResponse> allMembers() {
		List<ShortMemberDto> dtoList = memberService.allMembers();
		List<ShortMemberModelResponse> resList = new ArrayList<ShortMemberModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(ShortMemberDto dto: dtoList) {
			resList.add(mapper.map(dto, ShortMemberModelResponse.class));
		}
		return resList;
	}
	
	@GetMapping(path="/{memberId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public MemberModelResponse getMemberByMemberId(@PathVariable String memberId) {
		MemberDto dto = memberService.getByMemberId(memberId);		
		return new ModelMapper().map(dto,MemberModelResponse.class); 
	}
	
	@PutMapping(path="/{memberId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberModelResponse updateMember(@PathVariable String memberId,@RequestBody UpdateMemberModelRequest request) {
		MemberDto dto = new ModelMapper().map(request, MemberDto.class);
		MemberDto updatedDto = memberService.updateMember(memberId,dto);
		return new ModelMapper().map(updatedDto, ShortMemberModelResponse.class);
	}
}
