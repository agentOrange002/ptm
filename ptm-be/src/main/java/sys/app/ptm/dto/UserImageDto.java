package sys.app.ptm.dto;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserImageDto implements Serializable {
	private static final long serialVersionUID = 2302196586074849811L;
	private Long id;
	private String imageId;
	private byte[] image;
	private UserDto userImageDetails;
}
