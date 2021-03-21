package sys.app.ptm.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DashboardDto {
	
	private Long totalMembers;
	private Long totalBoards;
	private Long totalMembers_Payout;
	private Long totalBoards_Payout;
	private Long totalMembers_Created_Today;
	private Long totalBoards_Created_Today;	
	private Long totalBoards_Payout_Today;
	private Long unassigned_Members;
	
}
