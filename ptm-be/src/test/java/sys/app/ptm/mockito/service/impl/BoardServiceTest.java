package sys.app.ptm.mockito.service.impl;

import java.util.List;

//import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.service.implementation.BoardServiceImplementation;
import sys.app.ptm.tool.ThisLocalizedWeek;
import sys.app.ptm.utility.Utility;

class BoardServiceTest {

	@InjectMocks
	BoardServiceImplementation boardService;
	
	@Mock
	BoardRepository boardRepository;
	
	@Mock
	ThisLocalizedWeek thisLocalizeWeek;
	
	@Mock
	Utility utils;	
	
	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	final void testBoard() {
		
		List<BoardEntity> list = boardRepository.findByBoardMembers_MemberIsNotNullAndBoardMembers_Status("APPLIED SUCCESS");
	
		System.out.println(" LIST BOARD: "+ list);
	}

}
