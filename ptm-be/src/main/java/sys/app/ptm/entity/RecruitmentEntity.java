package sys.app.ptm.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recruitments")
public class RecruitmentEntity implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -815977876162258997L;
	
	@Id
	@SequenceGenerator(name="recruitment_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recruitment_seq")
	private Long id;
	
	@Column(name="recruitment_id",nullable=false)
	private String recruitmentId;		
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "member_id", unique = true)
	private MemberEntity memberRecruitmentDetails;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "recruitmentDetails", cascade = CascadeType.ALL)
	private List<MemberEntity> membersRecruited;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "recruitmentCommissionDetails", cascade = CascadeType.ALL)
	private List<RecruitmentCommissionEntity> recruitmentCommissions;
	
	@JsonProperty
	public String getMemberId() {
		return memberRecruitmentDetails.getId();
	}

}
