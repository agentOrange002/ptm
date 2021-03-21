package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class MemberDto implements Serializable {
	private static final long serialVersionUID = -2981310082482081101L;
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
	private UserDto userDetails_Member;	
	private List<MemberAddressDto> memberAddresses;		
	private List<MemberContactDto> memberContacts;	
}
