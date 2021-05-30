package sys.app.ptm.dto.shortdto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortClaimDto {
	private Long id;	
	private String claimId;	
	private String modeOfClaim;
	private String details;
	private LocalDate claimedDate;
	private BigDecimal claimedAmount;
	private String remark;
	private ShortBoardDto boardClaimDetails;
}
