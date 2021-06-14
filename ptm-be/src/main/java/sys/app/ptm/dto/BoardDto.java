package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sys.app.ptm.dto.shortdto.ShortBoardMemberDto;
import sys.app.ptm.dto.shortdto.ShortCategoryDto;
import sys.app.ptm.dto.shortdto.ShortClaimDto;
import sys.app.ptm.dto.shortdto.ShortReleaseDto;
import sys.app.ptm.dto.shortdto.ShortUserDto;

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
	private List<ShortBoardMemberDto> boardMembers;	
	private ShortUserDto userDetails_Board;	
	private ShortCategoryDto boardCategoryDetails;
    private ShortReleaseDto boardReleaseDetails;		
	private ShortClaimDto claim;	
}
