package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sys.app.ptm.entity.PasswordResetTokenEntity;

@Repository
@Transactional
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetTokenEntity, Long>  {
	PasswordResetTokenEntity findByToken(String token);
}
