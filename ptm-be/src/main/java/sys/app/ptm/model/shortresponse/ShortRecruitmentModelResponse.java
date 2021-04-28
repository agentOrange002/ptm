package sys.app.ptm.model.shortresponse;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortRecruitmentModelResponse {
	private Long id;	
	private String recruitmentId;		
	//private ShortMemberModelResponse memberRecruitmentDetails;
	private List<ShortMemberModelResponse> membersRecruited;
}
