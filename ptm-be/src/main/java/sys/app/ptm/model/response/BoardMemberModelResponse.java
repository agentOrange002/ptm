package sys.app.ptm.model.response;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class BoardMemberModelResponse {
	private String id;
	private String boardMemberId;
	private int memberNumber;	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate registeredDate;
	private String boardStatus;
	private MemberModelResponse member;
	private BoardModelResponse board;
	private ShortUserModelResponse userDetails_TeamMember;
}
