package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.MemberContactDto;
import sys.app.ptm.entity.MemberContactEntity;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.repository.MemberContactRepository;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.service.MemberContactService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class MemberContactServiceImplementation implements MemberContactService {

	private MemberContactRepository memberContactRepository;
	private MemberRepository memberRepository;
	private Utility utility;
	
	@Override
	public MemberContactDto saveMemberContact(String memberId,MemberContactDto dto) {
		MemberEntity member = memberRepository.findByMemberId(memberId);
		MemberContactEntity entity = new ModelMapper().map(dto,MemberContactEntity.class);
		entity.setContactId(utility.generateMemberContactId(10));
		entity.setMemberContactDetails(member);
		MemberContactEntity saveEntity = memberContactRepository.save(entity);
		return new ModelMapper().map(saveEntity, MemberContactDto.class);
	}

	@Override
	public List<MemberContactDto> allMemberContacts() {
		List<MemberContactEntity> listEnity = memberContactRepository.findAll();
		List<MemberContactDto> listDto = new ArrayList<MemberContactDto>();
		ModelMapper mapper = new ModelMapper();
		for(MemberContactEntity entity: listEnity) {
			listDto.add(mapper.map(entity, MemberContactDto.class));
		}
		return listDto;
	}

	@Override
	public MemberContactDto getMemberContactByContactId(String contactId) {
		MemberContactEntity entity = memberContactRepository.findByContactId(contactId);
		return new ModelMapper().map(entity, MemberContactDto.class);
	}

	@Override
	public List<MemberContactDto> allMemberContactByMemberId(String memberId) {
		MemberEntity member = memberRepository.findByMemberId(memberId);
		List<MemberContactEntity> listEnity = memberContactRepository.findByMemberContactDetails(member);
		List<MemberContactDto> listDto = new ArrayList<MemberContactDto>();
		ModelMapper mapper = new ModelMapper();
		for(MemberContactEntity entity: listEnity) {
			listDto.add(mapper.map(entity, MemberContactDto.class));
		}
		return listDto;
	}

}
