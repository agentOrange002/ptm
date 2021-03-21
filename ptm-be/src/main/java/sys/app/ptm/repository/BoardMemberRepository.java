package sys.app.ptm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.BoardMemberEntity;
import sys.app.ptm.entity.MemberEntity;

@Repository
@Transactional
public interface BoardMemberRepository extends JpaRepository<BoardMemberEntity, Long> {

	BoardMemberEntity findByBoardMemberId(String boardMemberId);

	List<BoardMemberEntity> findByBoard(BoardEntity board);

	BoardMemberEntity findByBoardMemberIdAndMemberNumber(String boardMemberId,int memberNumber);

	BoardMemberEntity findByBoardMemberIdAndMemberNotNull(String boardMemberId);
	BoardMemberEntity findByBoardAndMember(BoardEntity board, MemberEntity member);
	BoardMemberEntity findByMemberAndStatusNot(MemberEntity member, String status);

	List<BoardMemberEntity> findByBoardOrderByMemberNumberAsc(BoardEntity board);

	Long countByStatus(String status);

}