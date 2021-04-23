package sys.app.ptm.entity;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "claims")
public class ClaimEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -906469303596575990L;
	
	@Id
	@SequenceGenerator(name="claim_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "claim_seq")
	private Long id;
	
	@Column(name="claim_id",nullable=false)
	private String claimId;	
	
	@Column(name="mode_of_claim",nullable=false)
	private String mode;
	
	@Column(name="mode_details",nullable=false)
	private String details;
	
	@Column(name="date_claimed",nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	
	@Column(name="remark",nullable=true)
	private String remark;
	
	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "board_id", unique = false)
	private BoardEntity boardClaimDetails;
	
	@JsonProperty
	public String getBoardId() {
		return boardClaimDetails.getId();
	}

}
