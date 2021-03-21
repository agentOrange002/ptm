package sys.app.ptm.model.shortresponse;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortUserImageModelResponse {
	private Long id;
	private String imageId;
	private byte[] image;	
}
