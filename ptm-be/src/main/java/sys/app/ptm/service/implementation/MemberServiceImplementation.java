package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.MemberDto;
import sys.app.ptm.dto.shortdto.ShortMemberDto;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.MemberService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class MemberServiceImplementation implements MemberService {
	
	private MemberRepository memberRepository;
	private UserRepository userRepository;
	private Utility utility;

	@Override
	public MemberDto saveMember(MemberDto dto,String userId) {
		if(memberRepository.findByFullName(utility.generateFullName(dto.getFirstName(), dto.getMiddleName(), dto.getLastName(), dto.getSuffixName()))!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_FULLNAME_ALREADY_REGISTER.getErrorMessage());
		
		UserEntity user = userRepository.findByUserId(userId);
		MemberEntity entity = new ModelMapper().map(dto, MemberEntity.class);
		entity.setMemberId(utility.generateMemberId(10));
		entity.setFullName(utility.generateFullName(dto.getFirstName(), dto.getMiddleName(), dto.getLastName(), dto.getSuffixName()));
		entity.setDateJoined(LocalDate.now());
		entity.setLoggedDate(LocalDate.now());
		entity.setMemberStatus("CREATED");
		entity.setUserDetails_Member(user);	
		entity.setFirstName(dto.getFirstName().toUpperCase());
		entity.setMiddleName(dto.getMiddleName().toUpperCase());
		entity.setLastName(dto.getLastName().toUpperCase());
		MemberEntity saveEntity = memberRepository.save(entity);		
		return new ModelMapper().map(saveEntity, MemberDto.class);
	}

	@Override
	public MemberDto getByMemberId(String memberId) {
		MemberEntity entity = memberRepository.findByMemberId(memberId);
		return new ModelMapper().map(entity, MemberDto.class);
	}

	@Override
	public List<ShortMemberDto> allMembers() {
		List<MemberEntity> list = memberRepository.findAll();
		List<ShortMemberDto> dtoList = new ArrayList<ShortMemberDto>();
		ModelMapper mapper = new ModelMapper();
		for(MemberEntity entity: list) {
			dtoList.add(mapper.map(entity, ShortMemberDto.class));
		}
		return dtoList;
	}

	@Override
	public MemberDto updateMember(String memberId, MemberDto dto) {
		if(memberRepository.findByFullName(utility.generateFullName(dto.getFirstName(), dto.getMiddleName(), dto.getLastName(), dto.getSuffixName()))!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_FULLNAME_ALREADY_REGISTER.getErrorMessage());
		MemberEntity entity = memberRepository.findByMemberId(memberId);
		entity.setFirstName(dto.getFirstName());
		entity.setMiddleName(dto.getMiddleName());
		entity.setLastName(dto.getLastName());
		entity.setSuffixName(dto.getSuffixName());
		entity.setFullName(utility.generateFullName(dto.getFirstName(), dto.getMiddleName(), dto.getLastName(), dto.getSuffixName()));
		MemberEntity updatedEntity = memberRepository.save(entity);
		return new ModelMapper().map(updatedEntity, MemberDto.class);
	}

}
