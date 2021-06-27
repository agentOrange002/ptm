package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.RecruitmentCommissionEntity;

@Repository
@Transactional
public interface RecruitmentCommissionRepository extends JpaRepository<RecruitmentCommissionEntity, Long> {

	RecruitmentCommissionEntity findByRcId(String rcId);

}
