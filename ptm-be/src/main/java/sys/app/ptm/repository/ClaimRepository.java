package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.ClaimEntity;

@Repository
@Transactional
public interface ClaimRepository extends JpaRepository<ClaimEntity, Long>{

}
