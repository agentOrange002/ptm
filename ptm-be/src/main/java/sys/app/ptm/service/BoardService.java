package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.BoardDto;
import sys.app.ptm.dto.shortdto.ShortBoardDto;

public interface BoardService {
	
	BoardDto saveBoard(String categoryId,BoardDto dto);
	BoardDto getBoardByBoardId(String BoardId);
	List<ShortBoardDto> allBoards();
	BoardDto payoutBoard(String BoardId);	
	//BoardDto saveBoardWeekly(BoardDto dto);
	//BoardDto payoutBoardWeekly(String boardId);
	List<ShortBoardDto> boardsTable();
}


