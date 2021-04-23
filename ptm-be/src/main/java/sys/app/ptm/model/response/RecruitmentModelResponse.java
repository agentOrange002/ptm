package sys.app.ptm.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortMemberModelResponse;

@Getter @Setter
public class RecruitmentModelResponse {
	private Long id;
	private String recruitmentId;	
	private List<ShortMemberModelResponse> membersRecruited;
}
