package sys.app.ptm.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sys.app.ptm.dto.shortdto.ShortBoardDto;

@ToString
@Getter @Setter
public class ClaimDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -791890326272177063L;
	private Long id;	
	private String claimId;	
	private String modeOfClaim;
	private String details;
	private LocalDate claimedDate;
	private BigDecimal claimedAmount;
	private String remark;
	private ShortBoardDto boardClaimDetails;

}
