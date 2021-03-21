package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.entity.UserImageEntity;

@Repository
@Transactional
public interface UserImageRepository extends JpaRepository<UserImageEntity, Long> {
	UserImageEntity findByImageId(String imageId);
	UserImageEntity findByUserImageDetails(UserEntity userEntity);
}
