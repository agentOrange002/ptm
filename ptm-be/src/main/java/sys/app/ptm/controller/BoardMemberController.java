package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.BoardMemberDto;
import sys.app.ptm.dto.shortdto.ShortBoardMemberDto;
import sys.app.ptm.model.request.BoardMemberModelRequest;
import sys.app.ptm.model.request.BoardMemberPutRequest;
import sys.app.ptm.model.response.BoardMemberModelResponse;
import sys.app.ptm.model.shortresponse.ShortBoardMemberModelResponse;
import sys.app.ptm.service.BoardMemberService;

@AllArgsConstructor
@RestController
@RequestMapping({"/api/boardmembers"})
public class BoardMemberController {
	
	private BoardMemberService boardMemberService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public BoardMemberModelResponse saveBoardMember(@RequestBody BoardMemberModelRequest request) {
		BoardMemberDto dto = new ModelMapper().map(request, BoardMemberDto.class);
		BoardMemberDto saveDto = boardMemberService.saveBoardMember(dto,request.getBoardId(),request.getMemberId());
		return new ModelMapper().map(saveDto, BoardMemberModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BoardMemberModelResponse> allBoardMembers(){
		List<BoardMemberDto> dtoList = boardMemberService.allBoardMembers();
		ModelMapper mapper = new ModelMapper();
		List<BoardMemberModelResponse> result = new ArrayList<BoardMemberModelResponse>();
		for(BoardMemberDto dto: dtoList) {
			result.add(mapper.map(dto, BoardMemberModelResponse.class));
		}
		return result;
	}
	
	@GetMapping(path="/{boardMemberId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortBoardMemberModelResponse getBoardMemberByBoardMemberId(@PathVariable String boardMemberId){
		BoardMemberDto dto = boardMemberService.getBoardMemberByBoardMemberId(boardMemberId);			
		return new ModelMapper().map(dto, ShortBoardMemberModelResponse.class);	
	}
	
	@GetMapping(path="/board/{boardId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortBoardMemberModelResponse> getBoardMembersByBoard(@PathVariable String boardId){
		List<ShortBoardMemberDto> dtoList = boardMemberService.getBoardMemberByBoard(boardId);
		ModelMapper mapper = new ModelMapper();
		List<ShortBoardMemberModelResponse> result = new ArrayList<ShortBoardMemberModelResponse>();
		for(ShortBoardMemberDto dto: dtoList) {
			result.add(mapper.map(dto, ShortBoardMemberModelResponse.class));
		}
		return result;
	} 
	
	@PutMapping(path="/save1put/{boardMemberId}/{userId}",consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ShortBoardMemberModelResponse putsave1(@PathVariable String boardMemberId,@PathVariable String userId,@RequestBody BoardMemberPutRequest requestDetails) {
		String mid = requestDetails.getMemberId();	
		BoardMemberDto dto = boardMemberService.save1(boardMemberId,mid,userId);
		return new ModelMapper().map(dto, ShortBoardMemberModelResponse.class);
	}	
}
