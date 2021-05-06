package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ReleaseDto;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.ReleaseEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.model.request.ReleaseModelRequest;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.repository.ReleaseRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.ReleaseService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class ReleaseServiceImplementation implements ReleaseService {

	private ReleaseRepository releaseRepository;
	private UserRepository userRepository;
	private BoardRepository boardRepository;
	private Utility utility;

	@Override
	@Transactional
	public ReleaseDto saveRelease(ReleaseModelRequest request) {

		for (String id : request.getBoards()) {
			BoardEntity board = boardRepository.findByBoardId(id);
			if (releaseRepository.findByBoards(board) != null)
				throw new ApplicationServiceException(
						ErrorMessages.BOARD_HAS_ALREADY_EXIST_IN_OTHER_RELEASING.getErrorMessage());

			if (boardRepository.findByBoardIdAndBoardStatus(id, "CLAIMED") != null)
				throw new ApplicationServiceException(ErrorMessages.BOARD_HAS_ALREADY_CLAIMED.getErrorMessage());

			if (boardRepository.findByBoardIdAndBoardStatus(id, "PAYOUT") == null)
				throw new ApplicationServiceException(ErrorMessages.BOARD_NOT_PAYOUT.getErrorMessage());

		}

		List<BoardEntity> boards = new ArrayList<BoardEntity>();
		for (String id : request.getBoards()) {
			BoardEntity board = boardRepository.findByBoardId(id);
			boards.add(board);
		}

		UserEntity user = userRepository.findByUserId(request.getUserId());
		ReleaseEntity release = new ReleaseEntity();
		release.setReleaseId(utility.generateReleaseId(10));
		release.setLoggedDate(LocalDate.now());
		release.setTotalAmount(request.getTotalAmount());
		release.setUserDetails_Release(user);
		release.setBoards(boards);
		ReleaseEntity saveEntity = releaseRepository.save(release);

		for (BoardEntity board : saveEntity.getBoards()) {
			BoardEntity entity = board;
			entity.setBoardReleaseDetails(saveEntity);
			entity.setBoardStatus("RELEASE");
			boardRepository.save(entity);
		}

		return new ModelMapper().map(saveEntity, ReleaseDto.class);
	}

	@Override
	public List<ReleaseDto> getAll() {
		List<ReleaseEntity> list = releaseRepository.findAll();
		List<ReleaseDto> listDto = new ArrayList<ReleaseDto>();
		ModelMapper mapper = new ModelMapper();
		for (ReleaseEntity entity : list) {
			listDto.add(mapper.map(entity, ReleaseDto.class));
		}
		return listDto;
	}

	@Override
	public ReleaseDto getByReleaseId(String releaseId) {
		ReleaseEntity entity = releaseRepository.findByReleaseId(releaseId);
		return new ModelMapper().map(entity, ReleaseDto.class);
	}

}
