package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.CategoryDto;
import sys.app.ptm.dto.shortdto.ShortCategoryDto;
import sys.app.ptm.model.request.CategoryModelRequest;
import sys.app.ptm.model.shortresponse.ShortCategoryModelResponse;
import sys.app.ptm.service.CategoryService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/categories" })
public class CategoryController {

	private CategoryService categoryService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortCategoryModelResponse saveCategory(@RequestBody CategoryModelRequest requestBody) {
		CategoryDto dto = new ModelMapper().map(requestBody, CategoryDto.class);
		CategoryDto saveDto = categoryService.saveCategory(dto);
		return new ModelMapper().map(saveDto, ShortCategoryModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortCategoryModelResponse> allCategories() {		
		 List<ShortCategoryDto> listDto = categoryService.allCategories();
		 List<ShortCategoryModelResponse> listResponse = new ArrayList<ShortCategoryModelResponse>(); 
		 ModelMapper mapper = new ModelMapper(); 
		 for(ShortCategoryDto dto: listDto) {
			 listResponse.add(mapper.map(dto,ShortCategoryModelResponse.class)); 
		 }		 
		return listResponse;
	}
	
	@GetMapping(path="/{categoryId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortCategoryModelResponse getCategoryByCategoryId(@PathVariable String categoryId) {
		CategoryDto dto = categoryService.getCategoryByCategoryId(categoryId);
		return new ModelMapper().map(dto, ShortCategoryModelResponse.class);
	}
	
	
}
