package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

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
	private String remark;
	private BoardDto boardClaimDetails;

}
