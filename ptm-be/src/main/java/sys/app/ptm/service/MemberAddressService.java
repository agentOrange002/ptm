package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.MemberAddressDto;

public interface MemberAddressService {
	MemberAddressDto saveMemberAddress(String memberId,MemberAddressDto dto);
	List<MemberAddressDto> allMemberAddresses();
	MemberAddressDto getMemberAddressByAddressId(String addressId);
	List<MemberAddressDto> allMemberAddressByMemberId(String memberId);
}
