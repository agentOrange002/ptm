package sys.app.ptm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import sys.app.ptm.entity.MemberAddressEntity;
import sys.app.ptm.entity.MemberEntity;

@Repository
@Transactional
public interface MemberAddressRepository extends JpaRepository<MemberAddressEntity, Long> {

	MemberAddressEntity findByAddressId(String addressId);

	List<MemberAddressEntity> findByMemberAddressDetails(MemberEntity member);

}
