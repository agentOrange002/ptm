package sys.app.ptm.model.request;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardMemberModelRequest {	
	private int memberNumber;
	private String registeredBy;	
	private Date registeredDate;
	private String status;
	private String memberId;
	private String boardId;
}
