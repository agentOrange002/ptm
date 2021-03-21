package sys.app.ptm.model.shortresponse;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.response.MemberModelResponse;

@Getter
@Setter
public class ShortBoardMemberModelResponse {
	private String id;
	private String boardMemberId;	
	private int memberNumber;	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate registeredDate;
	private String status;
	private MemberModelResponse member;
}
