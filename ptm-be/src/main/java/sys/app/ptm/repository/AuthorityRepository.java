package sys.app.ptm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sys.app.ptm.entity.AuthorityEntity;
import sys.app.ptm.entity.RoleEntity;

@Repository
@Transactional
public interface AuthorityRepository extends JpaRepository<AuthorityEntity, Long> {
	AuthorityEntity findByName(String name);
	@Query(value = "SELECT * FROM show_authorizations_by_user_id(:userId);", nativeQuery = true)
	List<AuthorityEntity> findAuthorizationsByUserId(@Param("userId") String userId);
	List<AuthorityEntity> findAllByRoles(RoleEntity entity);
}
