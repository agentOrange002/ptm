package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.RecruitmentDto;
import sys.app.ptm.dto.shortdto.ShortRecruitmentDto;
import sys.app.ptm.model.request.RecruitmentMemberListModelRequest;

public interface RecruitmentService {
		RecruitmentDto saveRecruitment(String memberId, RecruitmentMemberListModelRequest request);
		List<ShortRecruitmentDto> allRecruitments();
		RecruitmentDto getByRecruitmentId(String recruimentId);
		RecruitmentDto applyRecruitedMembers(String recruitmentId, RecruitmentMemberListModelRequest request);
}
