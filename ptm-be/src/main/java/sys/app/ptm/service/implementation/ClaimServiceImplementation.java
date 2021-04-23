package sys.app.ptm.service.implementation;

import java.time.LocalDate;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ClaimDto;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.ClaimEntity;
import sys.app.ptm.model.request.ClaimModelRequest;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.repository.ClaimRepository;
import sys.app.ptm.service.ClaimService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class ClaimServiceImplementation implements ClaimService {
	
	private BoardRepository boardRepository;
	private ClaimRepository claimRepository;
	private Utility utility;

	@Override
	public ClaimDto saveRecruitment(String boardId, ClaimModelRequest request) {
		BoardEntity board = boardRepository.findByBoardId(boardId);
		ClaimEntity claim = new ClaimEntity();
		claim.setClaimId(utility.generateClaimId(10));
		claim.setClaimedDate(LocalDate.now());
		claim.setMode(request.getMode());
		claim.setDetails(request.getDetails());
		claim.setRemark(request.getRemark());
		claim.setBoardClaimDetails(board);
		ClaimEntity updatedClaim = claimRepository.save(claim);
		return new ModelMapper().map(updatedClaim, ClaimDto.class);
	}

}
