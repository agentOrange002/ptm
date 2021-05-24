package sys.app.ptm.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import sys.app.ptm.dto.shortdto.ShortBoardDto;
import sys.app.ptm.dto.shortdto.ShortUserDto;

@ToString
@Getter @Setter
public class ReleaseDto implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6737836987619261127L;
	private Long id;	
	private String releaseId;	
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate loggedDate;
	private float totalAmount;
	private ShortUserDto userDetails_Release;
	private List<ShortBoardDto> boards;
}
