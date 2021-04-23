package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class BoardDto implements Serializable {
	private static final long serialVersionUID = 3955917705352345312L;
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
	private Set<BoardMemberDto> boardMembers;	
	private UserDto userDetails_Board;	
	private CategoryDto boardCategoryDetails;
    private RecruitmentDto recruitment;		
	private ClaimDto claim;	
}
