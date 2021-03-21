package sys.app.ptm.controller;

import org.springframework.http.HttpHeaders;
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
	
	@GetMapping(path="/member/{id}")
	public ResponseEntity<byte[]> generateMemberInfo(@PathVariable String id) {	
		byte[] bytes = reportService.generateMemberInfo(id);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=MemberInfoReport.pdf");
		//headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=IssueReport.pdf");
		return ResponseEntity.ok().headers(headers).header("Content-Type", "application/pdf; charset=UTF-8")
				.body(bytes);
	}
	
	
	@GetMapping(path = "/board/{id}")
	public ResponseEntity<byte[]> generateBoardInfo(@PathVariable String id) {
		byte[] bytes = reportService.generateBoardInfo(id);
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=TeamInfoReport.pdf");
		return ResponseEntity.ok().headers(headers).header("Content-Type", "application/pdf; charset=UTF-8")
				.body(bytes);
	}
	
}
