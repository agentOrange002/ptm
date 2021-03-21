package sys.app.ptm.entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class RoleEntity implements Serializable {

	private static final long serialVersionUID = 4785019801499992979L;

	@Id
	@SequenceGenerator(name="role_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_seq")	
	private Long id;
	
	@Column(nullable=false, length=150, unique=true)
	private String name;	
	
	@JsonManagedReference
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToMany(cascade= CascadeType.PERSIST , fetch = FetchType.LAZY )
	@JoinTable(name="roles_authorities", 
			joinColumns=@JoinColumn(name="roles_id",referencedColumnName="id"), 
			inverseJoinColumns=@JoinColumn(name="authorities_id",referencedColumnName="id"))
	private Collection<AuthorityEntity> authorities;
	
	@JsonBackReference
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToMany(mappedBy="roles")
	private Collection<UserEntity> users;
	
}
