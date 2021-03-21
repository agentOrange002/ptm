package sys.app.ptm.mockito.service.impl;

//import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
	
	@SuppressWarnings("deprecation")
	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	final void test() {
		/*
		 * final ThisLocalizedWeek usWeek = new ThisLocalizedWeek(Locale.US);
		 * System.out.println(usWeek);
		 * System.out.println("Sunday:"+usWeek.getFirstDay());
		 * System.out.println("Monday:"+usWeek.getSecondDay());
		 * System.out.println("Tuesday:"+usWeek.getThirdDay());
		 * System.out.println("Wednesday:"+usWeek.getFourthDay());
		 * System.out.println("Thursday:"+usWeek.getFifthDay());
		 * System.out.println("Friday:"+usWeek.getSixthDay());
		 * System.out.println("Saturday:"+usWeek.getLastDay());
		 */
		/* assertNotNull(usWeek); */
	}

}
