package sys.app.ptm.service;

import sys.app.ptm.dto.ChartDto;
import sys.app.ptm.dto.DashboardDto;

public interface DashboardService {
	
	DashboardDto getDashboard();

	ChartDto getChart();

}
