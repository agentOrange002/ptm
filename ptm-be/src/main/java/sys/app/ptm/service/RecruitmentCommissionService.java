package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.RecruitmentCommissionDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentCommissionDto;

public interface RecruitmentCommissionService {
	RecruitmentCommissionDto saveRecruitmentCommission(String recruitmentId, RecruitmentCommissionDto dto);
	RecruitmentCommissionDto getByRcid(String rcId);
	List<ShortRecruitmentCommissionDto> getAllRecruitmentCommission();
}
