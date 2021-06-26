package sys.app.ptm.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortMemberModelResponse;
import sys.app.ptm.model.shortresponse.ShortRecruitmentCommissionModelResponse;

@Getter @Setter
public class RecruitmentModelResponse {
	private Long id;
	private String recruitmentId;	
	private ShortMemberModelResponse memberRecruitmentDetails;
	private List<ShortMemberModelResponse> membersRecruited;
	private List<ShortRecruitmentCommissionModelResponse> recruitmentCommissions;
}
