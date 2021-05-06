package sys.app.ptm.service;

import java.util.List;

import sys.app.ptm.dto.ReleaseDto;
import sys.app.ptm.model.request.ReleaseModelRequest;

public interface ReleaseService {

	ReleaseDto saveRelease(ReleaseModelRequest request);
	List<ReleaseDto> getAll();
	ReleaseDto getByReleaseId(String releaseId);

}
