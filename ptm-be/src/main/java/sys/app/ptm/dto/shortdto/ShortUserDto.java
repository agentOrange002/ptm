package sys.app.ptm.dto.shortdto;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter @Setter
public class ShortUserDto implements Serializable{	

	/**
	 * 
	 */
	private static final long serialVersionUID = -5077940133139027888L;
	private long id;	
	private String userId;	
	private String firstName;
	private String middleName;	
	private String lastName;	
	private String suffixName;
	private String fullName;
	private String email;
	private String password;
	private String encryptedPassword;
	private String emailVerificationToken;	
	private Boolean emailVerificationStatus;	
}
