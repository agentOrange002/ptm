package sys.app.ptm.dto.shortdto;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShortReleaseDto implements Serializable  {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3186794281236059497L;
	private Long id;	
	private String releaseId;	
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate loggedDate;
	private float totalAmount;
	private ShortUserDto userDetails_Release;	
}
