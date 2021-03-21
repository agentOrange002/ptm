package sys.app.ptm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.MemberContactEntity;
import sys.app.ptm.entity.MemberEntity;

@Repository
@Transactional
public interface MemberContactRepository extends JpaRepository<MemberContactEntity, Long> {

	MemberContactEntity findByContactId(String contactId);

	List<MemberContactEntity> findByMemberContactDetails(MemberEntity member);

}
