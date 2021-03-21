package sys.app.ptm.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.generator.IDGenerator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "boardmembers")
public class BoardMemberEntity implements Serializable {
	
	private static final long serialVersionUID = 4418802881539216988L;
	
	@Id
	@SequenceGenerator(name="boardmember_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "boardmember_seq")
    @GenericGenerator(
        name = "boardmember_seq", 
        strategy = "sys.app.ptm.generator.IDGenerator", 
        parameters = {
            @Parameter(name = IDGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = IDGenerator.VALUE_PREFIX_PARAMETER, value = "BMID"),
            @Parameter(name = IDGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
    private String id;
	
	@Column(name="board_member_id",nullable=false)
	private String boardMemberId;	
	
	@Column(name="member_number",nullable=false)
	private int memberNumber;		
	
	@Column(name="date_registered",nullable=true)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDate registeredDate;
	
	@Column(name="status",nullable=false)
	private String status;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name = "member_id")
	private MemberEntity member;	
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="board_id")
	private BoardEntity board;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity userDetails_BoardMember;
}
