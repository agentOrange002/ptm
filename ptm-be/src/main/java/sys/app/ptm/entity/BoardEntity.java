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
@Table(name = "boards")
public class BoardEntity implements Serializable {

	private static final long serialVersionUID = 8600544080220091560L;

	@Id
	@SequenceGenerator(name="board_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "board_seq")
    @GenericGenerator(
        name = "board_seq", 
        strategy = "sys.app.ptm.generator.IDGenerator", 
        parameters = {
            @Parameter(name = IDGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = IDGenerator.VALUE_PREFIX_PARAMETER, value = "BID"),
            @Parameter(name = IDGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
    private String id;
	
	@Column(name="board_id",nullable=false)
	private String boardId;	
	
	@Column(name="board_name",nullable=false,unique=true)
	private String boardName;	
	
	@Column(name="remark",nullable=true)
	private String remark;
	
	@Column(name="board_status",nullable=false)
	private String boardStatus;		
	
	@Column(name="logged_date",nullable=false)
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate loggedDate;
	
	@Column(name="payout_date",nullable=true)
	@JsonFormat(pattern="yyyy-MM-dd")	
	private LocalDate payoutDate;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
	private List<BoardMemberEntity> boardMembers;	
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="user_id")
	private UserEntity userDetails_Board;
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="categoryid")
	private CategoryEntity boardCategoryDetails;
}
