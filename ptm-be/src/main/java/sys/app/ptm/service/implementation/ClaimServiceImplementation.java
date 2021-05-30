package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ClaimDto;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.ClaimEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
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
	public ClaimDto saveRecruitment(String boardId, ClaimDto dto) {
		
		if(boardRepository.findByBoardIdAndBoardStatusIn(boardId,Arrays.asList("CREATED","PAYOUT"))==null) throw new ApplicationServiceException(ErrorMessages.BOARD_NOT_READY_FOR_CLAIM.getErrorMessage());
		if(boardRepository.findByBoardIdAndBoardStatus(boardId,"CLAIMED")!=null) throw new ApplicationServiceException(ErrorMessages.BOARD_HAS_ALREADY_CLAIMED.getErrorMessage());
		
		BoardEntity board = boardRepository.findByBoardId(boardId);
		ClaimEntity claim = new ModelMapper().map(dto, ClaimEntity.class);
		claim.setClaimId(utility.generateClaimId(10));
		claim.setClaimedDate(LocalDate.now());
		claim.setBoardClaimDetails(board);		
		ClaimEntity saveClaim = claimRepository.save(claim);
		saveClaim.getBoardClaimDetails().setBoardStatus("CLAIMED");
		ClaimEntity updatedClaim = claimRepository.save(claim);
		return new ModelMapper().map(updatedClaim, ClaimDto.class);
	}

	@Override
	public ClaimDto getById(String claimId) {
		ClaimEntity entity = claimRepository.findByClaimId(claimId);
		return new ModelMapper().map(entity, ClaimDto.class);
	}

	@Override
	public List<ClaimDto> getAllClaim() {
		List<ClaimEntity> list = claimRepository.findAll();
		List<ClaimDto> dtolist = new ArrayList<ClaimDto>();
		ModelMapper mapper = new ModelMapper();
		for(ClaimEntity claim: list) {
			dtolist.add(mapper.map(claim, ClaimDto.class));
		}
		return dtolist;
	}	

}
