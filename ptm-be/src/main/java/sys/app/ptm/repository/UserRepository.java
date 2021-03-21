package sys.app.ptm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.RoleEntity;
import sys.app.ptm.entity.UserEntity;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<UserEntity, Long> {
	UserEntity findByUserId(String userId);
	UserEntity findByEmail(String email);
	UserEntity findUserByEmailVerificationToken(String token);
	UserEntity deleteByUserId(String userId);
	UserEntity findById(String id);
	List<UserEntity> findByRoles(RoleEntity roleEntity);
	UserEntity findByFullName(String fullName);
}
