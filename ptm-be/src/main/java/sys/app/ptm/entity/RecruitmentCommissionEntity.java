package sys.app.ptm.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recruitment_commissions")
public class RecruitmentCommissionEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -7109247186515736717L;

	@Id
	@SequenceGenerator(name="recruitment_commission_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "recruitment_commission_seq")
	private Long id;
	
	@Column(name="recruitment_commission_id",nullable=false)
	private String rcId;	
	
	@Column(name="claimed_amount",precision=8, scale=2,nullable=false)
	private BigDecimal claimedAmount;
	
	@Column(name="date_claimed",nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate claimedDate;
	
	@Column(name="details",nullable=false)
	private String details;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="recruitment_id")
	private RecruitmentEntity recruitmentCommissionDetails;
	
}
