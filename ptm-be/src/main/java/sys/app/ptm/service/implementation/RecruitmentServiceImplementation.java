package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.RecruitmentDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentDto;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.RecruitmentEntity;
import sys.app.ptm.exception.ApplicationServiceException;
import sys.app.ptm.exception.ErrorMessages;
import sys.app.ptm.model.request.RecruitmentMemberListModelRequest;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.repository.RecruitmentRepository;
import sys.app.ptm.service.RecruitmentService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class RecruitmentServiceImplementation implements RecruitmentService{
	
	private RecruitmentRepository recruitmentRepository;
	private MemberRepository memberRepository;
	private Utility utility;
	
	@Override
	public RecruitmentDto saveRecruitment(String memberId,RecruitmentMemberListModelRequest request) {		
		MemberEntity mement = memberRepository.findByMemberId(memberId);
		if(recruitmentRepository.findByMemberRecruitmentDetails(mement)!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_AN_EXISTING_RECRUITMENTINFO.getErrorMessage());
		
		for(String id: request.getMembers()) {
			MemberEntity member = memberRepository.findByMemberId(id);
			if(recruitmentRepository.findByMembersRecruited(member)!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_RECRUITED.getErrorMessage());
		}		
		
		RecruitmentEntity entity = new RecruitmentEntity();		
		entity.setRecruitmentId(utility.generateRecruitmentId(10));
		entity.setMemberRecruitmentDetails(mement);	
		RecruitmentEntity savedEntity = recruitmentRepository.save(entity)	;		
		
		List<MemberEntity> newlist = new ArrayList<MemberEntity>();
		for(String id: request.getMembers()) {
			MemberEntity member = memberRepository.findByMemberId(id);
			member.setRecruitmentDetails(savedEntity);
			MemberEntity savedMember = memberRepository.save(member);
			newlist.add(savedMember);
		}		
		
		
		savedEntity.setMembersRecruited(newlist);		
		RecruitmentEntity updatedEntity = recruitmentRepository.save(savedEntity);	
		return new ModelMapper().map(updatedEntity,RecruitmentDto.class);
	}

	@Override
	public List<ShortRecruitmentDto> allRecruitments() {
		List<ShortRecruitmentDto> list = new ArrayList<ShortRecruitmentDto>();
		ModelMapper mapper = new ModelMapper();
		List<RecruitmentEntity> allRecruitments = recruitmentRepository.findAll();
		for(RecruitmentEntity entity: allRecruitments) {
			list.add(mapper.map(entity, ShortRecruitmentDto.class));
		}
		return list;
	}

	@Override
	public RecruitmentDto getByRecruitmentId(String recruimentId) {
		RecruitmentEntity entity = recruitmentRepository.findByRecruitmentId(recruimentId);	
		return new ModelMapper().map(entity,RecruitmentDto.class);
	}

	@Override
	public RecruitmentDto applyRecruitedMembers(String recruitmentId, RecruitmentMemberListModelRequest request) {
		for(String id: request.getMembers()) {
			MemberEntity member = memberRepository.findByMemberId(id);
			if(recruitmentRepository.findByMembersRecruited(member)!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_RECRUITED.getErrorMessage());
		}	
		
		RecruitmentEntity recruitment = recruitmentRepository.findByRecruitmentId(recruitmentId);		
		
		//List<MemberEntity> newlist = new ArrayList<MemberEntity>();
		List<MemberEntity> newlist = recruitment.getMembersRecruited();
		for(String id: request.getMembers()) {
			MemberEntity member = memberRepository.findByMemberId(id);
			member.setRecruitmentDetails(recruitment);
			MemberEntity savedMember = memberRepository.save(member);
			newlist.add(savedMember);
		}			
		
		recruitment.setMembersRecruited(newlist);
		RecruitmentEntity updatedEntity = recruitmentRepository.save(recruitment);	
		return new ModelMapper().map(updatedEntity,RecruitmentDto.class);
	}

}
