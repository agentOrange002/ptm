package sys.app.ptm.model.shortresponse;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortCategoryModelResponse {
	private String id;
	private String categoryId;		
	private String categoryName;			
	private String categoryDescription;		
	private String categoryType;		
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date registeredDate;		
}


	

