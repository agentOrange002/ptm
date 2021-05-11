package sys.app.ptm.dto.shortdto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortRecruitmentDto  implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3116093773729128655L;

	private Long id;	
	private String recruitmentId;		
	private ShortMemberDto memberRecruitmentDetails;
	//private List<ShortMemberDto> membersRecruited;
	
}
