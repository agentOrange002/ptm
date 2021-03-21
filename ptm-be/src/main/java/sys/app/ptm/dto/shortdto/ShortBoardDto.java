package sys.app.ptm.dto.shortdto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortBoardDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4477333464982878351L;
	private String id;
	private String boardId;
	private String boardName;
	private String remark;
	private String boardStatus;	
	private String loggedBy;		
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate loggedDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate payoutDate;	
	//private List<BoardMemberDto> boardMembers;	
	//private UserDto userDetails_Board;
	//private CategoryDto boardCategoryDetails;
}
