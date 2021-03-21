package sys.app.ptm.dto.shortdto;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortCategoryDto implements Serializable {		
	/**
	 * 
	 */
	private static final long serialVersionUID = 1793870261211501452L;
	private String id;
	private String categoryId;		
	private String categoryName;			
	private String categoryDescription;		
	private String categoryType;		
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date registeredDate;		
}
