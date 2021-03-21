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

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.MemberContactDto;
import sys.app.ptm.model.request.MemberContactModelRequest;
import sys.app.ptm.model.shortresponse.ShortMemberContactModelResponse;
import sys.app.ptm.service.MemberContactService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/membercontacts" })
public class MemberContactController {

	private MemberContactService memberContactService;
	
	@PostMapping(path="/{memberId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberContactModelResponse saveMemberContact(@PathVariable String memberId,@RequestBody MemberContactModelRequest requestBody) {
		MemberContactDto dto = new ModelMapper().map(requestBody, MemberContactDto.class);
		MemberContactDto saveDto = memberContactService.saveMemberContact(memberId,dto);
		return new ModelMapper().map(saveDto, ShortMemberContactModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortMemberContactModelResponse> allMemberContacts() {
		List<MemberContactDto> listDto = memberContactService.allMemberContacts();
		List<ShortMemberContactModelResponse> listResponse = new ArrayList<ShortMemberContactModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(MemberContactDto dto: listDto) {
			listResponse.add(mapper.map(dto,ShortMemberContactModelResponse.class));
		}		
		return listResponse;
	}	
	
	@GetMapping(path="/member/{memberId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortMemberContactModelResponse> allMemberContactByMemberId(@PathVariable String memberId) {
		List<MemberContactDto> listDto = memberContactService.allMemberContactByMemberId(memberId);
		List<ShortMemberContactModelResponse> listResponse = new ArrayList<ShortMemberContactModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(MemberContactDto dto: listDto) {
			listResponse.add(mapper.map(dto,ShortMemberContactModelResponse.class));
		}		
		return listResponse;
	}
	
	@GetMapping(path="/{contactId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberContactModelResponse getMemberContactByContactId(@PathVariable String contactId) {
		MemberContactDto dto = memberContactService.getMemberContactByContactId(contactId);
		return new ModelMapper().map(dto, ShortMemberContactModelResponse.class);
	}
	
}
