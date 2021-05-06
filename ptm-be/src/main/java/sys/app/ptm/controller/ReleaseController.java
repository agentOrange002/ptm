package sys.app.ptm.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.ReleaseDto;
import sys.app.ptm.model.request.ReleaseModelRequest;
import sys.app.ptm.model.response.ReleaseModelResponse;
import sys.app.ptm.model.shortresponse.ShortReleaseModelResponse;
import sys.app.ptm.service.ReleaseService;

@AllArgsConstructor
@RestController
@RequestMapping({ "/api/releases" })
public class ReleaseController {
	
	private ReleaseService releaseService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	public ReleaseModelResponse saveRelease(@RequestBody ReleaseModelRequest request) {
		ReleaseDto dto = releaseService.saveRelease(request);
		return  new ModelMapper().map(dto, ReleaseModelResponse.class);
	}
	
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ShortReleaseModelResponse> getAll() {
		List<ReleaseDto> dtoList = releaseService.getAll();
		List<ShortReleaseModelResponse> responseList = new ArrayList<ShortReleaseModelResponse>();
		ModelMapper mapper = new ModelMapper();
		for(ReleaseDto dto: dtoList) {
			responseList.add(mapper.map(dto, ShortReleaseModelResponse.class));
		}
		return responseList;
	}
	
	@GetMapping(path="/{releaseId}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ReleaseModelResponse getByReleaseId(@PathVariable String releaseId) {
		ReleaseDto dto = releaseService.getByReleaseId(releaseId);
		return new ModelMapper().map(dto, ReleaseModelResponse.class);
	}

}
