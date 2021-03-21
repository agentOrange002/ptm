package sys.app.ptm.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.entity.PasswordResetTokenEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="password_reset_tokens")
public class PasswordResetTokenEntity implements Serializable {
	private static final long serialVersionUID = 1990579978997686416L;
	
	@Id
	@SequenceGenerator(name="passwordreset_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "passwordreset_seq")
	private Long id;
	
	@Column(name="token")
	private String token;

	@OneToOne
	@JoinColumn(name = "users_id")
	private UserEntity userDetails;

}
