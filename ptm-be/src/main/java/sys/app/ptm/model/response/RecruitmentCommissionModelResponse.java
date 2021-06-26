package sys.app.ptm.model.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortRecruitmentModelResponse;

@Getter @Setter
public class RecruitmentCommissionModelResponse {
	private Long id;
	private String rcId;	
	private BigDecimal claimedAmount;
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	private String details;
	private ShortRecruitmentModelResponse recruitmentCommissionDetails;
}
