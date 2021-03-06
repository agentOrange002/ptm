package sys.app.ptm.repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.BoardEntity;


@Repository
@Transactional
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

	BoardEntity findByBoardId(String boardId);
	BoardEntity findByBoardName(String boardName);
	BoardEntity findByBoardIdAndBoardStatus(String boardId,String boardStatus);
	
	@Query(value = "SELECT * FROM boards;", nativeQuery = true)
	List<BoardEntity> findBoards();
	Long countByBoardStatus(String boardStatus);
	Long countByLoggedDate(LocalDate loggedDate);
	Long countByBoardStatusAndLoggedDate(String boardStatus, LocalDate loggedDate);
	
	/*
	 * //look for board that ready for payout
	 */	
	List<BoardEntity> findByBoardMembers_MemberIsNotNullAndBoardMembers_Status(String status);
	
	List<BoardEntity> findByBoardIdAndBoardStatusIn(String boardId, Collection<String> collection);

}
