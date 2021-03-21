package sys.app.ptm.dto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class MemberContactDto implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -3294728230748081042L;
	private Long id;
	private String contactId;	
	private String type;
	private String serviceName;
	private String detail;	
	private MemberDto memberContactDetails;	
}
