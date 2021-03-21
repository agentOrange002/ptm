package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.CategoryDto;
import sys.app.ptm.dto.shortdto.ShortCategoryDto;
import sys.app.ptm.entity.CategoryEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.repository.CategoryRepository;
import sys.app.ptm.service.CategoryService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class CategoryServiceImplementation implements CategoryService {
	
	private CategoryRepository categoryRepository;
	private Utility utility;

	@Override
	public CategoryDto saveCategory(CategoryDto dto) {		
		if (categoryRepository.findByCategoryName(dto.getCategoryName()) != null)
			throw new ApplicationServiceException(ErrorMessages.CATEGORY_NAME_ALREADY_EXISTS.getErrorMessage());
		
		dto.setCategoryType(dto.getCategoryType().toUpperCase());
		CategoryEntity entity = new ModelMapper().map(dto, CategoryEntity.class);		
		entity.setCategoryId(utility.generateCategoryId(10));
		entity.setRegisteredDate(new Date());
		CategoryEntity saveEntity = categoryRepository.save(entity);
		return new ModelMapper().map(saveEntity, CategoryDto.class);
	}

	@Override
	public List<ShortCategoryDto> allCategories() {
		List<CategoryEntity> listEntity = categoryRepository.findAll();
		List<ShortCategoryDto> listDto = new ArrayList<ShortCategoryDto>();
		ModelMapper mapper = new ModelMapper();
		for(CategoryEntity entity: listEntity) {
			listDto.add(mapper.map(entity, ShortCategoryDto.class));
		}
		return listDto;
	}

	@Override
	public CategoryDto getCategoryByCategoryId(String categoryId) {
		CategoryEntity entity = categoryRepository.findByCategoryId(categoryId);
		return new ModelMapper().map(entity, CategoryDto.class);
	}

}
