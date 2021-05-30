package sys.app.ptm.model.request;

import java.math.BigDecimal;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReleaseModelRequest {	
	private String userId;
	private BigDecimal totalAmount;
	private List<String> boards;
}
