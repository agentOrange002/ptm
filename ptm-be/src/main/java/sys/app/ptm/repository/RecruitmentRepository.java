package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.RecruitmentEntity;

@Repository
@Transactional
public interface RecruitmentRepository extends JpaRepository<RecruitmentEntity, Long>{
	RecruitmentEntity findByRecruitmentId(String recruitmentId);
	RecruitmentEntity findByMemberRecruitmentDetails(MemberEntity memberRecruitmentDetails);
	RecruitmentEntity findByMembersRecruited(MemberEntity member);
}
