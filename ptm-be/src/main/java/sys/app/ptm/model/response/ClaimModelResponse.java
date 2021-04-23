package sys.app.ptm.model.response;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortBoardModelResponse;

@Getter @Setter
public class ClaimModelResponse {
	private Long id;	
	private String claimId;	
	private String mode;
	private String details;
	private LocalDate claimedDate;
	private String remark;
	private ShortBoardModelResponse boardClaimDetails;
}
