package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.ReleaseDto;

public interface ReleaseService {

	ReleaseDto saveRelease(List<String> boards);
	List<ReleaseDto> getAll();
	ReleaseDto getByReleaseId(String releaseId);

}
