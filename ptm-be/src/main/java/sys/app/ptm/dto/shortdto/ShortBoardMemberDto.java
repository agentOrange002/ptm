package sys.app.ptm.dto.shortdto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortBoardMemberDto implements Serializable {

	private static final long serialVersionUID = 5384049217650343702L;
	private String id;
	private String boardMemberId;	
	private int memberNumber;
	private String registeredBy;	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate registeredDate;
	private String status;
	private ShortMemberDto member;	
}
