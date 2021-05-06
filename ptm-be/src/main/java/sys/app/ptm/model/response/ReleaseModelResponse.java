package sys.app.ptm.model.response;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import sys.app.ptm.model.shortresponse.ShortBoardModelResponse;
import sys.app.ptm.model.shortresponse.ShortUserModelResponse;

@Getter @Setter
public class ReleaseModelResponse {
	private Long id;	
	private String releaseId;	
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate loggedDate;
	private float totalAmount;
	private ShortUserModelResponse userDetails_Release;
	private List<ShortBoardModelResponse> boards;
}
