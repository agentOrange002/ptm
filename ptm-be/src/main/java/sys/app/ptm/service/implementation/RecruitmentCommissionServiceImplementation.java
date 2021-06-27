package sys.app.ptm.service.implementation;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.RecruitmentCommissionDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentCommissionDto;
import sys.app.ptm.entity.RecruitmentCommissionEntity;
import sys.app.ptm.entity.RecruitmentEntity;
import sys.app.ptm.repository.RecruitmentCommissionRepository;
import sys.app.ptm.repository.RecruitmentRepository;
import sys.app.ptm.service.RecruitmentCommissionService;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Service
public class RecruitmentCommissionServiceImplementation implements RecruitmentCommissionService {
	
	private RecruitmentCommissionRepository rcRepository;
	private RecruitmentRepository recruitmentRepository;
	private Utility utility;

	@Override
	public RecruitmentCommissionDto saveRecruitmentCommission(String recruitmentId, RecruitmentCommissionDto dto) {
		RecruitmentEntity recruitment = recruitmentRepository.findByRecruitmentId(recruitmentId);		
		RecruitmentCommissionEntity entity = new ModelMapper().map(dto, RecruitmentCommissionEntity.class);
		entity.setRcId(utility.generateRecruitmentCommissionId(10));
		entity.setRecruitmentCommissionDetails(recruitment);
		entity.setClaimedDate(LocalDate.now());
		RecruitmentCommissionEntity savedEntity = rcRepository.save(entity);
		return new ModelMapper().map(savedEntity, RecruitmentCommissionDto.class);
	}

	@Override
	public RecruitmentCommissionDto getByRcid(String rcId) {
		RecruitmentCommissionEntity entity = rcRepository.findByRcId(rcId);
		return new ModelMapper().map(entity, RecruitmentCommissionDto.class);
	}

	@Override
	public List<ShortRecruitmentCommissionDto> getAllRecruitmentCommission() {
		List<ShortRecruitmentCommissionDto> dtoList = new ArrayList<ShortRecruitmentCommissionDto>();
		ModelMapper mapper = new ModelMapper();
		List<RecruitmentCommissionEntity> entityList = rcRepository.findAll();
		for(RecruitmentCommissionEntity entity: entityList) {
			dtoList.add(mapper.map(entity, ShortRecruitmentCommissionDto.class));
		}
		return dtoList;
	}

}
