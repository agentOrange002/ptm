package sys.app.ptm.dto;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sys.app.ptm.dto.shortdto.ShortMemberDto;

@ToString
@Getter @Setter
public class RecruitmentDto  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3418288834013182333L;
	private Long id;
	private String recruitmentId;	
	private List<ShortMemberDto> membersRecruited;
}
