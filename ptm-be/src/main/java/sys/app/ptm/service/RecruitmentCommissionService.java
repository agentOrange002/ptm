package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.RecruitmentCommissionDto;

public interface RecruitmentCommissionService {
	RecruitmentCommissionDto saveRecruitmentCommission(String recruitmentId, RecruitmentCommissionDto dto);
	RecruitmentCommissionDto getByRcid(String rcId);
	List<RecruitmentCommissionDto> getAllRecruitmentCommission();
}
