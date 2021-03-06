package sys.app.ptm.tool;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.Function;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.entity.BoardMemberEntity;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.enums.CategoryType;
import sys.app.ptm.repository.BoardMemberRepository;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.utility.Utility;

@Log4j2
@AllArgsConstructor
@Component
public class JimboyHelper {
	
	private BoardMemberRepository boardMemberRepository;	
	private BoardRepository boardRepository;
	private Utility utility;
	
	
	@Transactional
	public void generateBoardMembersByBoard(String boardId) {	
		
		Consumer<String> generate = id -> {	
			
			BoardEntity b = boardRepository.findByBoardId(id);
			int number = 0;
			/*if(b.getBoardCategoryDetails().getCategoryType().equals("MONTHLY")) { */
			if(b.getBoardCategoryDetails().getCategoryType().name().equals(CategoryType.MONTHLY.name())) {
				number = 15;
			}
			else {
				number = 7;
			}
				
			
			int count = 1;
			while (number >= count) {	
				BoardEntity board = boardRepository.findByBoardId(id);
				BoardMemberEntity entity = new BoardMemberEntity();
				log.info(" Log Save BoardMember....... "+id+" :"+count);
				entity.setBoardMemberId(utility.generateBoardMemberId(10));
				entity.setStatus("CREATED");
				entity.setBoard(board);
				entity.setMemberNumber(count);
				boardMemberRepository.save(entity);
				count++;
			}
		};	
		generate.accept(boardId);		
	}	
	
	@Transactional
	public Boolean checkBoardComplete(String boardId) {			
		Function<String,Boolean> check = id -> {
			BoardEntity board = boardRepository.findByBoardId(id);
			List<BoardMemberEntity> list = boardMemberRepository.findByBoard(board);
			Boolean result = false;
			for(BoardMemberEntity entity: list) {
				if(entity.getMember()==null) {
					 result = true;
					 break;
				}
			}		
			return result;
		};		
		return check.apply(boardId);																																																																																																																																																																	
	}
	
	@Transactional
	public Boolean checkBoardPayoutComplete(String boardId) {
		Function<String, Boolean> check = id -> {
			BoardEntity board = boardRepository.findByBoardId(id);
			Boolean result = false;
			if (board.getBoardStatus().equals("PAYOUT")) {
				result = true;
			}
			System.out.println("status "+board.getBoardStatus() +"----result------"+result);
			return result;			
		};
		return check.apply(boardId);
	}

	@SuppressWarnings("unlikely-arg-type")
	@Transactional
	public void processPayout(String boardId) {
		BoardEntity board = boardRepository.findByBoardId(boardId);
		UserEntity user = board.getUserDetails_Board();
		List<BoardMemberEntity> list = boardMemberRepository.findByBoard(board);		
		List<BoardMemberEntity> listODD = new ArrayList<BoardMemberEntity>();
		List<BoardMemberEntity> listEVEN = new ArrayList<BoardMemberEntity>();
		int number = 0;	
		
		if(board.getBoardCategoryDetails().getCategoryType().equals(CategoryType.MONTHLY.name())) {
			number = 15;
		}
		else {
			number = 7;
		}

		int count = 0;
		while (list.size() > count) {
			if ((count + 1) % 2 == 0) {				
				listEVEN.add(list.get(count));
			}
			else {
				listODD.add(list.get(count));
			}
			count++;
		}		
		
		boardEven(listEVEN,user,number,board);
		boardOdd(listODD,user,number,board);
		
		for(BoardMemberEntity entity: list) {
			entity.setStatus("PAYOUT");
			boardMemberRepository.save(entity);
		}
	}
	
	@Transactional
	public void boardEven(List<BoardMemberEntity> list, UserEntity user, int number, BoardEntity board) {		
		
		BoardEntity tent = new BoardEntity();
		MemberEntity member = list.get(0).getMember();
		String boardname = member.getFirstName()+" "+member.getLastName()+" Group";
		tent.setBoardName(boardname);
		tent.setRemark("Auto Generated based from payout"+" "+LocalDate.now()+" and derived from "+board.getBoardName());
		tent.setBoardId(utility.generateBoardId(10));
		tent.setLoggedDate(LocalDate.now());
		tent.setBoardStatus("CREATED");
		tent.setUserDetails_Board(user);
		tent.setBoardCategoryDetails(board.getBoardCategoryDetails());
		BoardEntity saveBoard = boardRepository.save(tent);
		
		
		//int arrSize = 15 - list.size();		
		int arrSize = number - list.size();
	
		for (int counter = 0;counter < list.size(); counter++) { 	
			BoardMemberEntity ent = list.get(counter);
			
			BoardMemberEntity entity = new BoardMemberEntity();			
			entity.setMemberNumber(counter+1);
			entity.setRegisteredDate(LocalDate.now());
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("APPLIED SUCCESS");
			entity.setMember(ent.getMember());
			entity.setBoard(saveBoard);			
			boardMemberRepository.save(entity);
				        
	    }   	
		
		for (int counter = 0;counter < arrSize; counter++) { 	
			BoardMemberEntity entity = new BoardMemberEntity();
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setBoard(saveBoard);
			entity.setMemberNumber(counter+arrSize);
			boardMemberRepository.save(entity);			
		}
	
	}	
	
	@Transactional
	public void boardOdd(List<BoardMemberEntity> list, UserEntity user, int number, BoardEntity board) {	
		list.remove(0);		
		
		BoardEntity tent = new BoardEntity();
		MemberEntity member = list.get(0).getMember();
		String boardname = member.getFirstName()+" "+member.getLastName()+" Group";
		tent.setBoardName(boardname);
		tent.setRemark("Auto Generated based from payout"+" "+LocalDate.now()+" and derived from "+board.getBoardName());
		tent.setBoardId(utility.generateBoardId(10));
		tent.setLoggedDate(LocalDate.now());
		tent.setBoardStatus("CREATED");
		tent.setUserDetails_Board(user);
		tent.setBoardCategoryDetails(board.getBoardCategoryDetails());
		BoardEntity saveBoard = boardRepository.save(tent);
		
		//int arrSize = 15 - list.size();		
		int arrSize = number - list.size();
		
		for (int counter = 0;counter < list.size(); counter++) { 	
			BoardMemberEntity ent = list.get(counter);		
			BoardMemberEntity entity = new BoardMemberEntity();			
			entity.setMemberNumber(counter+1);
			entity.setRegisteredDate(LocalDate.now());
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("APPLIED SUCCESS");
			entity.setMember(ent.getMember());
			entity.setBoard(saveBoard);			
			boardMemberRepository.save(entity);			    
	    }   		
		
		for (int counter = 0;counter < arrSize; counter++) { 	
			BoardMemberEntity entity = new BoardMemberEntity();
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setBoard(saveBoard);
			entity.setMemberNumber(counter+arrSize);
			boardMemberRepository.save(entity);			
		}		
	}
	
	/*-----------------------Second Process-------------------------*/
	/*
	@Transactional
	public void generateBoardMembersByBoardWeekly(String boardId) {
		Consumer<String> generate = id -> {	
			int count = 1;
			while (7 >= count) {	
				BoardEntity board = boardRepository.findByBoardId(id);
				BoardMemberEntity entity = new BoardMemberEntity();
				log.info(" Log Save BoardMember....... "+id+" :"+count);
				entity.setBoardMemberId(utility.generateBoardMemberId(10));
				entity.setStatus("CREATED");
				entity.setBoard(board);
				entity.setMemberNumber(count);
				boardMemberRepository.save(entity);
				count++;
			}
		};	
		generate.accept(boardId);			
	}

	@Transactional
	public void processPayoutWeekly(String boardId) {
		BoardEntity board = boardRepository.findByBoardId(boardId);
		UserEntity user = board.getUserDetails_Board();
		List<BoardMemberEntity> list = boardMemberRepository.findByBoard(board);
		
		List<BoardMemberEntity> listODD = new ArrayList<BoardMemberEntity>();
		List<BoardMemberEntity> listEVEN = new ArrayList<BoardMemberEntity>();

		int count = 0;
		while (list.size() > count) {
			if ((count + 1) % 2 == 0) {				
				listEVEN.add(list.get(count));
			}
			else {
				listODD.add(list.get(count));
			}
			count++;
		}		
		
		secondboardEven(listEVEN,user);
		secondboardOdd(listODD,user);
		
		for(BoardMemberEntity entity: list) {
			entity.setStatus("PAYOUT");
			boardMemberRepository.save(entity);
		}
		
	}	
	
	@Transactional
	public void secondboardEven(List<BoardMemberEntity> list,UserEntity user) {		
		
		BoardEntity tent = new BoardEntity();
		MemberEntity member = list.get(0).getMember();
		String boardname = member.getFirstName()+" "+member.getLastName()+" "+new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		tent.setBoardName(boardname);
		tent.setRemark("Auto Generated based from payout");
		tent.setBoardId(utility.generateBoardId(10));
		tent.setLoggedDate(new Date());
		tent.setBoardStatus("CREATED");
		tent.setUserDetails_Board(user);
		BoardEntity saveBoard = boardRepository.save(tent);
		
		
		int arrSize = 7 - list.size();		
	
		for (int counter = 0;counter < list.size(); counter++) { 	
			BoardMemberEntity ent = list.get(counter);
			
			BoardMemberEntity entity = new BoardMemberEntity();			
			entity.setMemberNumber(counter+1);
			entity.setRegisteredDate(new Date());
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setMember(ent.getMember());
			entity.setBoard(saveBoard);			
			boardMemberRepository.save(entity);
				        
	    }   	
		
		for (int counter = 0;counter < arrSize; counter++) { 	
			BoardMemberEntity entity = new BoardMemberEntity();
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setBoard(saveBoard);
			entity.setMemberNumber(counter+arrSize);
			boardMemberRepository.save(entity);			
		}
	
	}	
	
	@Transactional
	public void secondboardOdd(List<BoardMemberEntity> list,UserEntity user) {	
		list.remove(0);		
		
		BoardEntity tent = new BoardEntity();
		MemberEntity member = list.get(0).getMember();
		String boardname = member.getFirstName()+" "+member.getLastName()+" "+new SimpleDateFormat("yyyy-MM-dd").format(new Date());
		tent.setBoardName(boardname);
		tent.setRemark("Auto Generated based from payout");
		tent.setBoardId(utility.generateBoardId(10));
		tent.setLoggedDate(new Date());
		tent.setBoardStatus("CREATED");
		tent.setUserDetails_Board(user);
		BoardEntity saveBoard = boardRepository.save(tent);
		
		int arrSize = 7 - list.size();		
		
		for (int counter = 0;counter < list.size(); counter++) { 	
			BoardMemberEntity ent = list.get(counter);		
			BoardMemberEntity entity = new BoardMemberEntity();			
			entity.setMemberNumber(counter+1);
			entity.setRegisteredDate(new Date());
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setMember(ent.getMember());
			entity.setBoard(saveBoard);			
			boardMemberRepository.save(entity);			    
	    }   		
		
		for (int counter = 0;counter < arrSize; counter++) { 	
			BoardMemberEntity entity = new BoardMemberEntity();
			entity.setBoardMemberId(utility.generateBoardMemberId(10));
			entity.setStatus("CREATED");
			entity.setBoard(saveBoard);
			entity.setMemberNumber(counter+arrSize);
			boardMemberRepository.save(entity);			
		}		
	} */
}
