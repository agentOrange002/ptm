package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.CategoryDto;
import sys.app.ptm.dto.shortdto.ShortCategoryDto;

public interface CategoryService {
	CategoryDto saveCategory(CategoryDto dto);
	List<ShortCategoryDto> allCategories();
	CategoryDto getCategoryByCategoryId(String categoryId);
}
