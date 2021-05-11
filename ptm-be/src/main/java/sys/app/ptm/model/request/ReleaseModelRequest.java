package sys.app.ptm.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReleaseModelRequest {	
	private String userId;
	private float totalAmount;
	private List<String> boards;
}