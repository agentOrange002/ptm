package sys.app.ptm.model.response;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortMemberAddressModelResponse;
import sys.app.ptm.model.shortresponse.ShortMemberContactModelResponse;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class MemberModelResponse {
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
	//private String loggedBy;		
	@JsonFormat(pattern="yyyy-MM-dd")
	private LocalDate loggedDate;
	private ShortUserModelResponse userDetails_Member;
	private List<ShortMemberAddressModelResponse> memberAddresses;		
	private List<ShortMemberContactModelResponse> memberContacts;
	private RecruitmentModelResponse recruitmentDetails;
}
