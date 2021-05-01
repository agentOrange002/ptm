package sys.app.ptm.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReleaseBoardListModelRequest {
	private List<String> boards;
}
