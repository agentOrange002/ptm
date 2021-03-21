package sys.app.ptm.model.shortresponse;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortMemberModelResponse {
	private String id;
	private String memberId;
	private String firstName;
	private String middleName;
	private String lastName;
	private String suffixName;	
	private String fullName;	
	private String gender;
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate dateJoined;
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate dateOut;
	private String remark;
	private String memberStatus;		
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate loggedDate;
	//private ShortUserModelResponse userDetails_Member;
}
