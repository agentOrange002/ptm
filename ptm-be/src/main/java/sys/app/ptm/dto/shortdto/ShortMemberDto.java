package sys.app.ptm.dto.shortdto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortMemberDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3693656775074563877L;
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
}
