package sys.app.ptm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.CategoryEntity;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

	CategoryEntity findByCategoryId(String categoryId);

	CategoryEntity findByCategoryName(String categoryName);

}
