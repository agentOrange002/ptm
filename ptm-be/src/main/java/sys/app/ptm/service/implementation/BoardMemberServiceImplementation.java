package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.BoardMemberDto;
import sys.app.ptm.dto.shortdto.ShortBoardMemberDto;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.BoardMemberEntity;
import sys.app.ptm.entity.CategoryEntity;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.repository.BoardMemberRepository;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.BoardMemberService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class BoardMemberServiceImplementation implements BoardMemberService {
	
	private BoardMemberRepository boardMemberRepository;
	private BoardRepository boardRepository;
	private MemberRepository memberRepository;
	private UserRepository userRepository;
	private Utility utility;

	@Override
	public BoardMemberDto saveBoardMember(BoardMemberDto dto, String boardId, String memberId) {
		UserEntity user = userRepository.findByUserId(dto.getRegisteredBy());
		BoardEntity boardEntity = boardRepository.findByBoardId(boardId);
		MemberEntity memberEntity = memberRepository.findByMemberId(memberId);
		BoardMemberEntity entity = new ModelMapper().map(dto,BoardMemberEntity.class);
		entity.setBoardMemberId(utility.generateBoardMemberId(10));
		entity.setBoard(boardEntity);
		entity.setMember(memberEntity);
		entity.setUserDetails_BoardMember(user);
		BoardMemberEntity saveEntity = boardMemberRepository.save(entity);
		return new ModelMapper().map(saveEntity, BoardMemberDto.class);
	}

	@Override
	public List<BoardMemberDto> allBoardMembers() {
		List<BoardMemberEntity> list = boardMemberRepository.findAll();
		ModelMapper mapper = new ModelMapper();
		List<BoardMemberDto> listDto = new ArrayList<BoardMemberDto>();
		for(BoardMemberEntity entity: list) {
			listDto.add(mapper.map(entity, BoardMemberDto.class));
		}	
		return listDto;
	}

	@Override
	public BoardMemberDto getBoardMemberByBoardMemberId(String boardMemberId) {
		BoardMemberEntity entity = boardMemberRepository.findByBoardMemberId(boardMemberId);
		return new ModelMapper().map(entity, BoardMemberDto.class);
	}

	@Override
	public List<ShortBoardMemberDto> getBoardMemberByBoard(String boardId) {
		BoardEntity board = boardRepository.findByBoardId(boardId);
		List<BoardMemberEntity> list = boardMemberRepository.findByBoardOrderByMemberNumberAsc(board);
		ModelMapper mapper = new ModelMapper();
		List<ShortBoardMemberDto> listDto = new ArrayList<ShortBoardMemberDto>();
		for(BoardMemberEntity entity: list) {
			listDto.add(mapper.map(entity, ShortBoardMemberDto.class));
		}	
		return listDto;
	}

	@Override
	public BoardMemberDto save1(String boardMemberId,String memberId,String userId) {
		BoardMemberEntity tm = boardMemberRepository.findByBoardMemberId(boardMemberId);
		MemberEntity member = memberRepository.findByMemberId(memberId);
		CategoryEntity category = tm.getBoard().getBoardCategoryDetails();
		if (boardMemberRepository.findByBoardMemberIdAndMemberNotNull(boardMemberId)!=null)
			throw new ApplicationServiceException(ErrorMessages.BOARD_MEMBER_HAS_ALREADY_ASSIGNED.getErrorMessage());
		
		if (boardMemberRepository.findByBoardAndMember(tm.getBoard(),member)!=null)
			throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_EXIST_IN_THIS_BOARD.getErrorMessage());
//		
//		if (boardMemberRepository.findByMemberAndStatusNot(member,"PAYOUT")!=null)
//			throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_EXIST_IN_OTHER_BOARD.getErrorMessage());
//		
		if (boardMemberRepository.findByMemberAndStatusNotAndBoard_BoardCategoryDetails(member,"PAYOUT",category)!=null)
			throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_EXIST_IN_OTHER_BOARD.getErrorMessage());
		
		
		UserEntity user = userRepository.findByUserId(userId);
		
		tm.setMember(member);
		tm.setRegisteredDate(LocalDate.now());
		tm.setStatus("APPLIED SUCCESS");
		tm.setUserDetails_BoardMember(user);
		BoardMemberEntity saveTM = boardMemberRepository.save(tm);
		return new ModelMapper().map(saveTM,BoardMemberDto.class);
	}

}
