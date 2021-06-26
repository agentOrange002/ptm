package sys.app.ptm.model.shortresponse;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortRecruitmentCommissionModelResponse {
	private Long id;
	private String rcId;	
	private BigDecimal claimedAmount;
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	private String details;
}
