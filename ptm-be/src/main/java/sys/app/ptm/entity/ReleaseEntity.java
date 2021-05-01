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
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "releases")
public class ReleaseEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3708625121890355580L;
	
	@Id
	@SequenceGenerator(name="release_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "release_seq")
	private Long id;
	
	@Column(name="release_id",nullable=false)
	private String releaseId;
	
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate loggedDate;
	
	@Column(name="total_amount",precision=8, scale=2,nullable=false)
	private float totalAmount;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity userDetails_Release;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "boardReleaseDetails", cascade = CascadeType.ALL)
	private List<BoardEntity> boards;
	
	

}
