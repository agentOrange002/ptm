package sys.app.ptm.service;

import sys.app.ptm.dto.ClaimDto;
import sys.app.ptm.model.request.ClaimModelRequest;

public interface ClaimService {

	ClaimDto saveRecruitment(String boardId, ClaimModelRequest request);

}
