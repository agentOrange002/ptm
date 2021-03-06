package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class BoardMemberDto implements Serializable {

	private static final long serialVersionUID = 5384049217650343702L;
	private String id;
	private String boardMemberId;	
	private int memberNumber;
	private String registeredBy;	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate registeredDate;
	private String status;
	private MemberDto member;
	private BoardDto board;
	private UserDto userDetails_BoardMember;
}
