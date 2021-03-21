package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.MemberAddressDto;
import sys.app.ptm.entity.MemberAddressEntity;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.repository.MemberAddressRepository;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.service.MemberAddressService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class MemberAddressServiceImplementation implements MemberAddressService {
	
	private MemberAddressRepository memberAddressRepository;
	private MemberRepository memberRepository;
	private Utility utility;

	@Override
	public MemberAddressDto saveMemberAddress(String memberId,MemberAddressDto dto) {
		MemberEntity member = memberRepository.findByMemberId(memberId);
		MemberAddressEntity entity = new ModelMapper().map(dto,MemberAddressEntity.class);
		entity.setAddressId(utility.generateMemberAddressId(10));
		entity.setMemberAddressDetails(member);
		MemberAddressEntity saveEntity = memberAddressRepository.save(entity);
		return new ModelMapper().map(saveEntity,MemberAddressDto.class);
	}

	@Override
	public List<MemberAddressDto> allMemberAddresses() {
		List<MemberAddressEntity> listEntity = memberAddressRepository.findAll();
		List<MemberAddressDto> listDto = new ArrayList<MemberAddressDto>();
		ModelMapper mapper = new ModelMapper();
		for(MemberAddressEntity entity: listEntity) {
			listDto.add(mapper.map(entity, MemberAddressDto.class));
		}
		return listDto;
	}

	@Override
	public MemberAddressDto getMemberAddressByAddressId(String addressId) {
		MemberAddressEntity entity = memberAddressRepository.findByAddressId(addressId);
		return new ModelMapper().map(entity, MemberAddressDto.class);
	}

	@Override
	public List<MemberAddressDto> allMemberAddressByMemberId(String memberId) {
		MemberEntity member = memberRepository.findByMemberId(memberId);
		List<MemberAddressEntity> listEntity = memberAddressRepository.findByMemberAddressDetails(member);
		List<MemberAddressDto> listDto = new ArrayList<MemberAddressDto>();
		ModelMapper mapper = new ModelMapper();
		for(MemberAddressEntity entity: listEntity) {
			listDto.add(mapper.map(entity, MemberAddressDto.class));
		}
		return listDto;
	}

}
