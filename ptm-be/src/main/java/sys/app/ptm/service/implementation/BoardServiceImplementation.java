package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.BoardDto;
import sys.app.ptm.dto.shortdto.ShortBoardDto;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.CategoryEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.repository.CategoryRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.BoardService;
import sys.app.ptm.tool.JimboyHelper;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class BoardServiceImplementation implements BoardService {
	
	private BoardRepository boardRepository;
	private UserRepository userRepository;
	private CategoryRepository categoryRepository;
	private Utility utility;
	private JimboyHelper helper;

	@Override
	public BoardDto saveBoard(String categoryId,BoardDto dto) {
		if (boardRepository.findByBoardName(dto.getBoardName()) != null)
			throw new ApplicationServiceException(ErrorMessages.BOARD_NAME_ALREADY_EXISTS.getErrorMessage());
		
		if (userRepository.findByUserId(dto.getLoggedBy()) == null) throw new ApplicationServiceException(ErrorMessages.USER_NOT_FOUND.getErrorMessage());
		
		CategoryEntity category = categoryRepository.findByCategoryId(categoryId);
		UserEntity user = userRepository.findByUserId(dto.getLoggedBy());
		BoardEntity entity = new ModelMapper().map(dto, BoardEntity.class);
		entity.setBoardId(utility.generateBoardId(10));
		entity.setLoggedDate(LocalDate.now());
		entity.setBoardStatus("CREATED");
		entity.setUserDetails_Board(user);
		entity.setBoardCategoryDetails(category);
		BoardEntity saveEntity = boardRepository.save(entity);		
		return new ModelMapper().map(saveEntity, BoardDto.class);
	}

	@Override
	public BoardDto getBoardByBoardId(String boardId) {
		BoardEntity entity = boardRepository.findByBoardId(boardId);
		BoardDto dto = new BoardDto();
		dto = new ModelMapper().map(entity, BoardDto.class);
		
		
		//log.info("BoardEntity: "+entity.toString());
		return dto;
	}

	@Override
	public List<ShortBoardDto> allBoards() {
		List<BoardEntity> list = boardRepository.findAll();
		List<ShortBoardDto> result = new ArrayList<ShortBoardDto>();
		ModelMapper mapper = new ModelMapper();
		for(BoardEntity entity: list) {
			result.add(mapper.map(entity, ShortBoardDto.class));
		}
		return result;
	}

	@Override
	public BoardDto payoutBoard(String boardId) {
		if (helper.checkBoardComplete(boardId))
			throw new ApplicationServiceException(ErrorMessages.BOARD_NOT_COMPLETE.getErrorMessage());
			
		if (helper.checkBoardPayoutComplete(boardId))
			throw new ApplicationServiceException(ErrorMessages.BOARD_PAYOUT_COMPLETE.getErrorMessage());
		
		BoardEntity entity = boardRepository.findByBoardId(boardId);
		entity.setBoardStatus("PAYOUT");
		entity.setPayoutDate(LocalDate.now());
		BoardEntity updateEntity = boardRepository.save(entity);
		return new ModelMapper().map(updateEntity, BoardDto.class);
	}

	@Override
	public List<ShortBoardDto> boardsTable() {
		List<BoardEntity> list = boardRepository.findBoards();
		List<ShortBoardDto> result = new ArrayList<ShortBoardDto>();
		ModelMapper mapper = new ModelMapper();
		for (BoardEntity entity : list) {
			result.add(mapper.map(entity, ShortBoardDto.class));
		}
		return result;
	}
	
	
	/*
	@Override
	public BoardDto saveBoardWeekly(BoardDto dto) {
		if (boardRepository.findByBoardName(dto.getBoardName()) != null)
			throw new ApplicationServiceException(ErrorMessages.BOARD_NAME_ALREADY_EXISTS.getErrorMessage());		
		
		UserEntity user = userRepository.findByUserId(dto.getLoggedBy());
		BoardEntity entity = new ModelMapper().map(dto, BoardEntity.class);
		entity.setBoardId(utility.generateBoardId(10));
		entity.setLoggedDate(new Date());
		entity.setBoardStatus("CREATED");
		entity.setUserDetails_Board(user);
		BoardEntity saveEntity = boardRepository.save(entity);		
		return new ModelMapper().map(saveEntity, BoardDto.class);
	}

	@Override
	public BoardDto payoutBoardWeekly(String boardId) {
		if (helper.checkBoardComplete(boardId))
			throw new ApplicationServiceException(ErrorMessages.BOARD_NOT_COMPLETE.getErrorMessage());
		if (helper.checkBoardPayoutComplete(boardId))
			throw new ApplicationServiceException(ErrorMessages.BOARD_PAYOUT_COMPLETE.getErrorMessage());
		BoardEntity entity = boardRepository.findByBoardId(boardId);
		entity.setBoardStatus("PAYOUT");
		entity.setPayoutDate(new Date());
		BoardEntity updateEntity = boardRepository.save(entity);
		return new ModelMapper().map(updateEntity, BoardDto.class);
	}
	*/
}
