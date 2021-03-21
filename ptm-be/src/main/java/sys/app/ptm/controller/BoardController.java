package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.BoardDto;
import sys.app.ptm.dto.shortdto.ShortBoardDto;
import sys.app.ptm.model.request.BoardModelRequest;
import sys.app.ptm.model.request.PayoutModelRequest;
import sys.app.ptm.model.response.BoardModelResponse;
import sys.app.ptm.model.shortresponse.ShortBoardModelResponse;
import sys.app.ptm.service.BoardService;

@AllArgsConstructor
@RestController
@RequestMapping({"/api/boards"})
public class BoardController {
	
	private BoardService boardService;	
	
	@PostMapping(consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardModelResponse createBoard(@RequestBody BoardModelRequest request) {
		BoardDto dto = new ModelMapper().map(request, BoardDto.class);
		BoardDto saveDto = boardService.saveBoard(request.getCategoryId(),dto);
		return new ModelMapper().map(saveDto, BoardModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortBoardModelResponse> allBoards(){
		List<ShortBoardDto> dtoList = boardService.allBoards();
		List<ShortBoardModelResponse> result = new ArrayList<ShortBoardModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(ShortBoardDto dto: dtoList) {
			result.add(mapper.map(dto, ShortBoardModelResponse.class));
		}
		return result;
	}
	
	@GetMapping(path="/{boardId}", produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardModelResponse getBoardByBoardId(@PathVariable String boardId) {	
		BoardDto saveDto = boardService.getBoardByBoardId(boardId);
		return new ModelMapper().map(saveDto, BoardModelResponse.class);
	}
	
	@PostMapping(path="/payout",consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardModelResponse payoutBoard(@RequestBody PayoutModelRequest body)  {
		BoardDto saveDto = boardService.payoutBoard(body.getBoardId());
		return new ModelMapper().map(saveDto, BoardModelResponse.class);
	}
	
	@GetMapping(path = "/table", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortBoardModelResponse> getAllBoardTable() {
		List<ShortBoardDto> dtoList = boardService.boardsTable();
		List<ShortBoardModelResponse> result = new ArrayList<ShortBoardModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for (ShortBoardDto dto : dtoList) {
			result.add(mapper.map(dto, ShortBoardModelResponse.class));
		}
		return result;
	}
	
	/*
	@PostMapping(path="/2ndcreate",consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardModelResponse secondcreateBoard(@RequestBody BoardModelRequest request) {
		BoardDto dto = new ModelMapper().map(request, BoardDto.class);
		BoardDto saveDto = boardService.saveBoardWeekly(dto);
		return new ModelMapper().map(saveDto, BoardModelResponse.class);
	}
	
	@PostMapping(path="/2ndpayout",consumes=MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardModelResponse secondpayoutBoard(@RequestBody PayoutModelRequest body)  {
		BoardDto saveDto = boardService.payoutBoardWeekly(body.getBoardId());
		return new ModelMapper().map(saveDto, BoardModelResponse.class);
	}
	*/
}
