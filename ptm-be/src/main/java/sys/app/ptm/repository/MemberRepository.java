package sys.app.ptm.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.MemberEntity;

@Repository
@Transactional
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
	
	MemberEntity findByMemberId(String memberId);

	MemberEntity findByFullName(String fullName);

	Long countByDateJoined(LocalDate dateJoined);

	Long countByBoardMemberNull();	
}
