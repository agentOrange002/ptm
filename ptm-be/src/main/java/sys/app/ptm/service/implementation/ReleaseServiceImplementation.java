package sys.app.ptm.service.implementation;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ReleaseDto;
import sys.app.ptm.service.ReleaseService;

@AllArgsConstructor
@Service
public class ReleaseServiceImplementation implements ReleaseService {
	
	@Override
	public ReleaseDto saveRelease(List<String> boards) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ReleaseDto> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ReleaseDto getByReleaseId(String releaseId) {
		// TODO Auto-generated method stub
		return null;
	}

}
