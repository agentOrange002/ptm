package sys.app.ptm.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BoardModelRequest {
	private String categoryId;
	private String boardName;
	private String remark;
	private String loggedBy;
}
