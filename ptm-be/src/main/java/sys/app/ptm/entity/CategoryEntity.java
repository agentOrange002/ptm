package sys.app.ptm.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.enums.CategoryType;
import sys.app.ptm.generator.IDGenerator;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class CategoryEntity implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -7940063309482170267L;

	@Id
	@SequenceGenerator(name="category_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "category_seq")
    @GenericGenerator(
        name = "category_seq", 
        strategy = "sys.app.ptm.generator.IDGenerator", 
        parameters = {
            @Parameter(name = IDGenerator.INCREMENT_PARAM, value = "1"),
            @Parameter(name = IDGenerator.VALUE_PREFIX_PARAMETER, value = "CATID"),
            @Parameter(name = IDGenerator.NUMBER_FORMAT_PARAMETER, value = "%05d") })
    private String id;
	
	@Column(name="category_id",nullable=false)
	private String categoryId;	
	
	@Column(name="category_name",nullable=false)
	private String categoryName;		
	
	@Column(name="category_description",nullable=false)
	private String categoryDescription;			
	
	@Column(name="category_type")	  
	@Enumerated(EnumType.STRING) 
	private CategoryType categoryType;	
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@Column(name="date_registered",nullable=true)	
	private Date registeredDate;
	
	@JsonManagedReference	  
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "boardCategoryDetails", cascade = CascadeType.ALL)
	@Fetch(value=FetchMode.SELECT)
	private List<BoardEntity> boards;
	 

}
