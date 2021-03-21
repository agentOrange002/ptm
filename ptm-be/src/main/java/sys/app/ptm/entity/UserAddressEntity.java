package sys.app.ptm.entity;

import java.io.Serializable;
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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sys.app.ptm.entity.UserAddressEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_addresses")
public class UserAddressEntity implements Serializable {

	private static final long serialVersionUID = 5153413411927477754L;

	@Id
	@SequenceGenerator(name = "address_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_seq")
	private Long id;
	
	@Column(name="address_id",length=150, nullable=false)
	private String addressId;	
	
	@Column(name="city",length=150, nullable=false)
	private String city;
	
	@Column(name="country",length=150, nullable=false)
	private String country;
	
	@Column(name="street_name",length=100, nullable=false)
	private String streetName;
	
	@Column(name="postal_code",length=100, nullable=false)
	private String postalCode;
	
	@Column(name="type",length=10, nullable=false)
	private String type;	
	
	@JsonBackReference
	@ManyToOne
	@JoinColumn(name="users_id")
	private UserEntity userDetails;

}