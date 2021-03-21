package sys.app.ptm.entity;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import sys.app.ptm.entity.UserImageEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_images")
public class UserImageEntity implements Serializable {

	private static final long serialVersionUID = 8072443992514854341L;

	@Id
	@SequenceGenerator(name = "userimage_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userimage_seq")
	private Long id;

	@Column(name = "image_id", nullable = false, length = 50)
	private String imageId;

	@Lob
	@Basic(fetch = FetchType.EAGER)
	@Column(name = "image", length = 1000000000)
	private byte[] image;

	@JsonIgnore
	@OneToOne
	@JoinColumn(name = "user_id", unique = false)
	private UserEntity userImageDetails;

	@JsonProperty
	public Long getUserId() {
		return userImageDetails.getId();
	}
}