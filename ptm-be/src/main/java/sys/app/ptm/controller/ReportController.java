package sys.app.ptm.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.service.ReportService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/reports" })
public class ReportController {

	private ReportService reportService;

	@GetMapping(path = "/member/{memberId}")
	public ResponseEntity<byte[]> generateMemberInfo(@PathVariable String memberId) {
		byte[] bytes = reportService.generateMemberInfo(memberId);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=MemberInfoReport.pdf");
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok().headers(headers).body(bytes);
	}

	@GetMapping(path = "/board/{boardId}")
	public ResponseEntity<byte[]> generateBoardInfo(@PathVariable String boardId) {
		byte[] bytes = reportService.generateBoardInfo(boardId);		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=BoardInfoReport.pdf");
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok().headers(headers).body(bytes);
	}
	
	@GetMapping(path = "/release/{releaseId}")
	public ResponseEntity<byte[]> generateReleaseInfo(@PathVariable String releaseId) {
		byte[] bytes = reportService.generateReleaseInfo(releaseId);		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=ReleaseInfoReport.pdf");
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok().headers(headers).body(bytes);
	}
	
	@GetMapping(path = "/claim/form/{claimId}")
	public ResponseEntity<byte[]> generateClaimForm(@PathVariable String claimId) {
		byte[] bytes = reportService.generateClaimForm(claimId);		
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "inline; filename=ClaimForm.pdf");
		headers.setContentType(MediaType.APPLICATION_PDF);
		return ResponseEntity.ok().headers(headers).body(bytes);
	}
	

}
