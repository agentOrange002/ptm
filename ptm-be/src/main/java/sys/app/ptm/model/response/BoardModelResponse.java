package sys.app.ptm.model.response;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.dto.shortdto.ShortClaimDto;
import sys.app.ptm.model.shortresponse.ShortBoardMemberModelResponse;
import sys.app.ptm.model.shortresponse.ShortCategoryModelResponse;
import sys.app.ptm.model.shortresponse.ShortReleaseModelResponse;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class BoardModelResponse {
	/*
	 * private String id; private String boardId; private String boardName; private
	 * String remark; private String boardStatus;
	 * 
	 * @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate loggedDate;
	 * 
	 * @JsonFormat(pattern = "yyyy-MM-dd") private LocalDate payoutDate; private
	 * List<ShortBoardMemberModelResponse> boardMembers; private
	 * ShortUserModelResponse userDetails_Board; private ShortCategoryModelResponse
	 * boardCategoryDetails; private ClaimModelResponse claim;
	 */
	
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
	private List<ShortBoardMemberModelResponse> boardMembers;	
	private ShortUserModelResponse userDetails_Board;	
	private ShortCategoryModelResponse boardCategoryDetails;
    private ShortReleaseModelResponse boardReleaseDetails;		
	private ShortClaimDto claim;	
}
