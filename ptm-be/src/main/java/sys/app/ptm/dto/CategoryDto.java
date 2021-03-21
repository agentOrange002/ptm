package sys.app.ptm.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class CategoryDto implements Serializable {	
	private static final long serialVersionUID = 6310058156978543089L;
	private String id;
	private String categoryId;		
	private String categoryName;			
	private String categoryDescription;		
	private String categoryType;		
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date registeredDate;	
	private List<BoardDto> boards;
}
