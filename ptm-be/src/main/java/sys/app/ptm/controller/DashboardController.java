package sys.app.ptm.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ChartDto;
import sys.app.ptm.dto.DashboardDto;
import sys.app.ptm.service.DashboardService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/dashboard" })
public class DashboardController {
	
	private DashboardService dashboardService;
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)	
	public DashboardDto getDashboard() {
		return dashboardService.getDashboard();
	}
	
	@GetMapping(path="/chart",produces = MediaType.APPLICATION_JSON_VALUE)	
	public ChartDto getChart() {
		return dashboardService.getChart();
	}

}
