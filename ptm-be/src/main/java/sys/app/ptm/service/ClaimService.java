package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.ClaimDto;

public interface ClaimService {

	ClaimDto saveRecruitment(String boardId, ClaimDto dto);
	ClaimDto getById(String claimId);
	List<ClaimDto> getAllClaim();
}
