package sys.app.ptm.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class RecruitmentCommissionDto implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4558526697711990855L;
	private Long id;
	private String rcId;	
	private BigDecimal claimedAmount;
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	private String details;
	private RecruitmentDto recruitmentCommissionDetails;
}
