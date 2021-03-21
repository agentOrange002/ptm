package sys.app.ptm.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChartDto {
	public List<Long> created;
	public List<Long> payout;
}
