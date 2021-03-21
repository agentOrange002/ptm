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
import sys.app.ptm.dto.MemberAddressDto;
import sys.app.ptm.model.request.MemberAddressModelRequest;
import sys.app.ptm.model.shortresponse.ShortMemberAddressModelResponse;
import sys.app.ptm.service.MemberAddressService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/memberaddresses" })
public class MemberAddressController {
	
	private MemberAddressService memberAddressService;

	@PostMapping(path="/{memberId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberAddressModelResponse saveMemberAddress(@PathVariable String memberId,@RequestBody MemberAddressModelRequest requestBody) {
		MemberAddressDto dto = new ModelMapper().map(requestBody, MemberAddressDto.class);
		MemberAddressDto saveDto = memberAddressService.saveMemberAddress(memberId,dto);
		return new ModelMapper().map(saveDto, ShortMemberAddressModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortMemberAddressModelResponse> allMemberAddresses() {
		List<MemberAddressDto> listDto = memberAddressService.allMemberAddresses();
		List<ShortMemberAddressModelResponse> listResponse = new ArrayList<ShortMemberAddressModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(MemberAddressDto dto: listDto) {
			listResponse.add(mapper.map(dto,ShortMemberAddressModelResponse.class));
		}		
		return listResponse;
	}
	
	@GetMapping(path="/{addressId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortMemberAddressModelResponse getMemberAddressByAddressId(@PathVariable String addressId) {
		MemberAddressDto dto = memberAddressService.getMemberAddressByAddressId(addressId);
		return new ModelMapper().map(dto, ShortMemberAddressModelResponse.class);
	}
	
	@GetMapping(path="/member/{memberId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortMemberAddressModelResponse> allMemberAddresses(@PathVariable String memberId) {
		List<MemberAddressDto> listDto = memberAddressService.allMemberAddressByMemberId(memberId);
		List<ShortMemberAddressModelResponse> listResponse = new ArrayList<ShortMemberAddressModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(MemberAddressDto dto: listDto) {
			listResponse.add(mapper.map(dto,ShortMemberAddressModelResponse.class));
		}		
		return listResponse;
	}
}
