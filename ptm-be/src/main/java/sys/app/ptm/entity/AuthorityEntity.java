package sys.app.ptm.entity;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.entity.AuthorityEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="authorities")
public class AuthorityEntity implements Serializable {

	private static final long serialVersionUID = 3867263553135368664L;

	@Id
	@SequenceGenerator(name="authority_seq", allocationSize=1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "authority_seq")
	private Long id;
	
	@Column(name="name",nullable=false, length=150)
	private String name;
	
	@JsonBackReference
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToMany(mappedBy="authorities")
	private Collection<RoleEntity> roles;
	
}