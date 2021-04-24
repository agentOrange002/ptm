package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.RecruitmentDto;
import sys.app.ptm.model.request.RecruitmentMemberListModelRequest;

public interface RecruitmentService {
		RecruitmentDto saveRecruitment(String memberId,RecruitmentMemberListModelRequest request);
		List<RecruitmentDto> allRecruitments();
		RecruitmentDto getByRecruitmentId(String recruimentId);
}
