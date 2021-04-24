package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.RecruitmentDto;
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
		
		
		RecruitmentEntity entity = new RecruitmentEntity();		
		entity.setRecruitmentId(utility.generateRecruitmentId(10));
		entity.setMemberRecruitmentDetails(mement);	
		RecruitmentEntity savedEntity = recruitmentRepository.save(entity)	;
		
		
		for(String id: request.getMembers()) {
			MemberEntity member = memberRepository.findByMemberId(id);
			if(recruitmentRepository.findByMembersRecruited(member)!=null) throw new ApplicationServiceException(ErrorMessages.MEMBER_HAS_ALREADY_RECRUITED.getErrorMessage());
		}		
		
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
	public List<RecruitmentDto> allRecruitments() {
		List<RecruitmentDto> list = new ArrayList<RecruitmentDto>();
		ModelMapper mapper = new ModelMapper();
		List<RecruitmentEntity> allRecruitments = recruitmentRepository.findAll();
		for(RecruitmentEntity entity: allRecruitments) {
			list.add(mapper.map(entity, RecruitmentDto.class));
		}
		return list;
	}

	@Override
	public RecruitmentDto getByRecruitmentId(String recruimentId) {
		RecruitmentEntity entity = recruitmentRepository.findByRecruitmentId(recruimentId);	
		return new ModelMapper().map(entity,RecruitmentDto.class);
	}

}
