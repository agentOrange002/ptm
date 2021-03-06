package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.function.Supplier;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ChartDto;
import sys.app.ptm.dto.DashboardDto;
import sys.app.ptm.repository.BoardMemberRepository;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.service.DashboardService;
import sys.app.ptm.tool.ThisLocalizedWeek;

//@Log4j2
@AllArgsConstructor
@Service
public class DashboardServiceImplementation implements DashboardService {
	
	private MemberRepository memberRepository;
	private BoardRepository boardRepository;
	private BoardMemberRepository bmRepository;	
	private ThisLocalizedWeek thisWeek;	

	
	/*
	private Long totalMembers;
	private Long totalBoards;
	private Long totalMembers_Payout;
	private Long totalBoards_Payout;
	private Long totalMembers_Created_Today;
	private Long totalBoards_Created_Today;
	private Long totalBoards_Payout_Today;	
	private Long unassigned_Members;	
    */

	@Override
	public DashboardDto getDashboard() {	
		
		Supplier<DashboardDto> dd = () -> {
			DashboardDto dto = new DashboardDto();		
			dto.setTotalMembers(memberRepository.count());
			dto.setTotalBoards(boardRepository.count());
			dto.setTotalMembers_Payout(bmRepository.countByStatus("PAYOUT"));
			dto.setTotalBoards_Payout(boardRepository.countByBoardStatus("PAYOUT"));
			dto.setTotalMembers_Created_Today(memberRepository.countByDateJoined(LocalDate.now()));
			dto.setTotalBoards_Created_Today(boardRepository.countByLoggedDate(LocalDate.now()));
			dto.setTotalBoards_Payout_Today(boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",LocalDate.now()));
			dto.setUnassigned_Members(memberRepository.countByBoardMemberNull());
			return dto;
		};
		
		return dd.get();
	}

	@Override
	public ChartDto getChart() {
		Supplier<ChartDto> cd = () -> {
		//ZoneId TZ = ZoneId.of("Asia/Manila");
			
		LocalDate sunday = thisWeek.getFirstDay();
		LocalDate monday = thisWeek.getSecondDay();
		LocalDate tuesday = thisWeek.getThirdDay();
		LocalDate wednesday =thisWeek.getFourthDay();
		LocalDate thursday = thisWeek.getFifthDay();
		LocalDate friday = thisWeek.getSixthDay();
		LocalDate saturday = thisWeek.getLastDay();		
		
		
			/*
			 * log.info("Sunday:"+sunday); log.info("Monday:"+monday);
			 * log.info("Tuesday:"+tuesday); log.info("Wednesday:"+wednesday);
			 * log.info("Thursday:"+thursday); log.info("Friday:"+friday);
			 * log.info("Saturday:"+saturday);
			 */
		
		
		Long c1 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",sunday);
		Long c2 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",monday);
		Long c3 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",tuesday);
		Long c4 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",wednesday);
		Long c5 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",thursday);
		Long c6 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",friday);
		Long c7 = boardRepository.countByBoardStatusAndLoggedDate("CREATED",saturday);
		
		Long p1 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",sunday);
		Long p2 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",monday);
		Long p3 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",tuesday);
		Long p4 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",wednesday);
		Long p5 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",thursday);
		Long p6 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",friday);
		Long p7 = boardRepository.countByBoardStatusAndLoggedDate("PAYOUT",saturday);
		
		List<Long> CreatedList = Arrays.asList(c1,c2,c3,c4,c5,c6,c7) ;
		List<Long> PayoutList = Arrays.asList(p1,p2,p3,p4,p5,p6,p7) ;
		
		ChartDto dto = new ChartDto();
		dto.setCreated(CreatedList);
		dto.setPayout(PayoutList);
		return dto;
		};
		
		return cd.get();
	}

}
