package sys.app.ptm.dto.shortdto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortRecruitmentCommissionDto {
	private Long id;
	private String rcId;	
	private BigDecimal claimedAmount;
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	private String details;
}
