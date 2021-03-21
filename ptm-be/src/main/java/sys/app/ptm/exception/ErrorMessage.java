package sys.app.ptm.exception;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class ErrorMessage {
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date timestamp;	
	private String message;		
}
