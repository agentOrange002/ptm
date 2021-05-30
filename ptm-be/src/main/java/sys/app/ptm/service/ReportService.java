package sys.app.ptm.service;

public interface ReportService {
	byte[] generateMemberInfo(String memberId);
	byte[] generateBoardInfo(String boardId);
	byte[] generateReleaseInfo(String releaseId);
	byte[] generateClaimForm(String claimId);
 }
