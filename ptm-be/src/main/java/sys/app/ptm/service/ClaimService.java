package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.ClaimDto;
import sys.app.ptm.model.request.ClaimModelRequest;

public interface ClaimService {

	ClaimDto saveRecruitment(String boardId, ClaimModelRequest request);
	ClaimDto getById(String claimId);
	List<ClaimDto> getAllClaim();
}
