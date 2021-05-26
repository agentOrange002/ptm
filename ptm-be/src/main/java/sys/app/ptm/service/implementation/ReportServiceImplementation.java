package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.entity.ReleaseEntity;
import sys.app.ptm.entity.BoardEntity;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.repository.ReleaseRepository;
import sys.app.ptm.repository.BoardRepository;
import sys.app.ptm.service.ReportService;

@Service
public class ReportServiceImplementation implements ReportService {
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	BoardRepository boardRepository;
	
	@Autowired
	ReleaseRepository releaseRepository;
	
	@Autowired
	ResourceLoader resourceLoader;	
	
	@Value("classpath:reports/MemberInfo.jrxml")
	Resource loadMemberInfoReport;
	
	@Value("classpath:reports/BoardInfo.jrxml")
	Resource loadBoardInfoReport;
	
	@Value("classpath:reports/ReleaseInfo.jrxml")
	Resource loadReleaseInfoReport;
	
	
	@Override
	public byte[] generateMemberInfo(String memberId) {
		byte[] bytes = null;		
		MemberEntity entity = memberRepository.findByMemberId(memberId);
		List<MemberEntity> collection = new ArrayList<MemberEntity>();
		collection.add(entity);				
		try {					
			JRBeanCollectionDataSource data = new JRBeanCollectionDataSource(collection);
			JasperDesign jdReport = JRXmlLoader.load(loadMemberInfoReport.getInputStream());
			JasperReport jrReport = JasperCompileManager.compileReport(jdReport);			
			JasperPrint jpReport = JasperFillManager.fillReport(jrReport, null, data);
			bytes = JasperExportManager.exportReportToPdf(jpReport);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bytes;
	}

	@Override
	public byte[] generateBoardInfo(String boardId) {
		byte[] bytes = null;		
		BoardEntity entity = boardRepository.findByBoardId(boardId);
		List<BoardEntity> collection = new ArrayList<BoardEntity>();
		collection.add(entity);				
		try {	
			JRBeanCollectionDataSource data = new JRBeanCollectionDataSource(collection);
			JasperDesign jdReport = JRXmlLoader.load(loadBoardInfoReport.getInputStream());
			JasperReport jrReport = JasperCompileManager.compileReport(jdReport);			
			JasperPrint jpReport = JasperFillManager.fillReport(jrReport, null, data);
			bytes = JasperExportManager.exportReportToPdf(jpReport);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bytes;
	}

	@Override
	public byte[] generateReleaseInfo(String releaseId) {
		byte[] bytes = null;		
		ReleaseEntity entity = releaseRepository.findByReleaseId(releaseId);
		List<ReleaseEntity> collection = new ArrayList<ReleaseEntity>();
		collection.add(entity);				
		try {	
			JRBeanCollectionDataSource data = new JRBeanCollectionDataSource(collection);
			JasperDesign jdReport = JRXmlLoader.load(loadReleaseInfoReport.getInputStream());
			JasperReport jrReport = JasperCompileManager.compileReport(jdReport);			
			JasperPrint jpReport = JasperFillManager.fillReport(jrReport, null, data);
			bytes = JasperExportManager.exportReportToPdf(jpReport);			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bytes;
	}

}
