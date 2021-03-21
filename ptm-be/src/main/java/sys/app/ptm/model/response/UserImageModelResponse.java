package sys.app.ptm.model.response;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class UserImageModelResponse {
	private Long id;
	private String imageId;
	private byte[] image;
	private ShortUserModelResponse userImageDetails;
}
