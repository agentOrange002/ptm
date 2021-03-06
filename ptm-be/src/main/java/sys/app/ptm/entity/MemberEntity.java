package sys.app.ptm.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.generator.IDGenerator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "members")
public class MemberEntity implements Serializable {
	
	private static final long serialVersionUID = -4896251209460601495L;
	
	@Id
	@SequenceGenerator(name="member_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq")
    @GenericGenerator(
        name = "member_seq", 
        strategy = "sys.app.ptm.generator.IDGenerator", 
        parameters = {
            @Parameter(name = IDGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = IDGenerator.VALUE_PREFIX_PARAMETER, value = "MID"),
            @Parameter(name = IDGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
    private String id;
	
	@Column(name="member_id",nullable=false)
	private String memberId;	
	
	@Column(name="first_name",nullable=false)
	private String firstName;
	
	@Column(name="middle_name",nullable=false)
	private String middleName;
	
	@Column(name="last_name",nullable=false)
	private String lastName;
	
	@Column(name="suffix_name",nullable=true)
	private String suffixName;	
	
	@Column(name="full_name",nullable=false)
	private String fullName;		
	
	@Column(name="gender",nullable=false)
	private String gender;		

	@Column(name="date_joined",nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate dateJoined;
	
	@Column(name="date_out")
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate dateOut;
	
	@Column(name="remark",nullable=true)
	private String remark;	
	
	@Column(name="member_status",nullable=false)
	private String memberStatus;		
	
	@Column(name="logged_date",nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDate loggedDate;	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	private List<BoardMemberEntity> boardMember;	
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity userDetails_Member;	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "memberAddressDetails", cascade = CascadeType.ALL)
	private List<MemberAddressEntity> memberAddresses;	
	
	@JsonManagedReference
	@OneToMany(mappedBy = "memberContactDetails", cascade = CascadeType.ALL)
	private List<MemberContactEntity> memberContacts;		
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="recruitment_id")
	private RecruitmentEntity recruitmentDetails;	
	
	@OneToOne(mappedBy = "memberRecruitmentDetails", cascade = CascadeType.ALL)
	private RecruitmentEntity recruitment;	
}
