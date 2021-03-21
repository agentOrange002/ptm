package sys.app.ptm.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "member_contacts")
public class MemberContactEntity implements Serializable  {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3615833384072752747L;

	@Id
	@SequenceGenerator(name = "membercontact_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "membercontact_seq")
	private Long id;
	
	@Column(name="contact_id",length=150, nullable=false)
	private String contactId;	
	
	@Column(name="type",length=150, nullable=false)
	private String type;
	
	@Column(name="service_name",length=150, nullable=false)
	private String serviceName;
	
	@Column(name="detail",length=100, nullable=false)
	private String detail;	
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="members_id")
	private MemberEntity memberContactDetails;	
	
}
