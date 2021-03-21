package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.MemberContactDto;

public interface MemberContactService {
	MemberContactDto saveMemberContact(String memberId,MemberContactDto dto);
	List<MemberContactDto> allMemberContacts();
	MemberContactDto getMemberContactByContactId(String contactId);
	List<MemberContactDto> allMemberContactByMemberId(String memberId);
}
