package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.MemberDto;
import sys.app.ptm.dto.shortdto.ShortMemberDto;

public interface MemberService {
	MemberDto saveMember(MemberDto dto,String userId);
	MemberDto getByMemberId(String memberId);
	List<ShortMemberDto> allMembers();
	MemberDto updateMember(String memberId, MemberDto dto);
}
