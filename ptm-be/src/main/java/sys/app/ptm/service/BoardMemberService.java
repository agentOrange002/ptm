package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.BoardMemberDto;
import sys.app.ptm.dto.shortdto.ShortBoardMemberDto;

public interface BoardMemberService {
	BoardMemberDto saveBoardMember(BoardMemberDto dto,String boardId, String memberId);
	List<BoardMemberDto> allBoardMembers();
	BoardMemberDto getBoardMemberByBoardMemberId(String boardMemberId);
	List<ShortBoardMemberDto> getBoardMemberByBoard(String boardId);
	BoardMemberDto save1(String boardMemberId,String memberId, String userId);
}
