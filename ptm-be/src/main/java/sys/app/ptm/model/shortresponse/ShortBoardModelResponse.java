package sys.app.ptm.model.shortresponse;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortBoardModelResponse {
	private String id;
	private String boardId;
	private String boardName;
	private String remark;
	private String boardStatus;	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate loggedDate;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate payoutDate;	
	//private List<ShortBoardMemberModelResponse> boardMembers;	
	//private ShortUserModelResponse userDetails_Board;
	//private ShortCategoryModelResponse boardCategoryDetails;
}
