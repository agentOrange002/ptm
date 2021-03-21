package sys.app.ptm.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AuthorityDto implements Serializable {
	private static final long serialVersionUID = 2709791782423105928L;
	private Long id;	
	private String name;
}
