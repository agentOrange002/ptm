package sys.app.ptm.model.request;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RecruitmentCommissionModelRequest {
	private String details;
	private BigDecimal claimedAmount;
}
