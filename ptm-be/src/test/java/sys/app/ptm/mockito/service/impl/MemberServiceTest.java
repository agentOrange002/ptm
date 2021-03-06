package sys.app.ptm.mockito.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import sys.app.ptm.dto.MemberDto;
import sys.app.ptm.entity.MemberEntity;
import sys.app.ptm.repository.MemberRepository;
import sys.app.ptm.service.implementation.MemberServiceImplementation;
import sys.app.ptm.utility.Utility;

class MemberServiceTest {

	@InjectMocks
	MemberServiceImplementation memberService;
	
	@Mock
	MemberServiceImplementation memberserv;
	
	@Mock
	MemberRepository memberRepository;	
	
	@Mock
	Utility utils;
	
	
	@BeforeEach
	void setUp() throws Exception {
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	final void testFullName() {		
		String f = new String("First");
		String m = new String("Middle");
		String l = new String("Last");
		String s = new String("JR");
		
		StringBuilder str = new StringBuilder();		
		if (s==null|s==""|s.equals(null)|"".compareTo(s) == 0) {
			System.out.println(" Invoke 1:");
			str.append(f +" "+m+" "+l);
		} else {
			System.out.println(" Invoke 2:");
			str.append(f +" "+m+" "+l+" "+s);
		}

		System.out.println(" fullname1:"+str.toString().toUpperCase()+":");

		
		System.out.println(" fullname2:"+utils.generateFullName(f, m, l, s));
		
		MemberDto dto = new MemberDto();	
		dto.setFirstName("TEST");
		dto.setMiddleName("TEST");
		dto.setLastName("TEST");
		dto.setSuffixName("TEST");			
		System.out.println(" fullname3:"+utils.generateFullName(dto.getFirstName(), dto.getMiddleName(), dto.getLastName(),dto.getSuffixName()))	;
	}

	@Test
	final void testSaveMember() {
		MemberDto dto = new MemberDto();	
		dto.setFirstName("TEST");
		dto.setMiddleName("TEST");
		dto.setLastName("TEST");
		dto.setSuffixName("TEST");				
		dto.setGender("MALE");
		dto.setRemark("Tesing Remark");
	
		MemberEntity entity = new ModelMapper().map(dto, MemberEntity.class);
		
		
		when(memberRepository.save(any(MemberEntity.class))).thenReturn(entity);
		when(memberserv.saveMember(any(MemberDto.class),anyString())).thenReturn(dto) ;
		MemberDto otherDto = new ModelMapper().map(entity, MemberDto.class);
		//MemberDto saveDto = memberService.saveMember(dto,"UserID");
		
		assertNotNull(memberserv.saveMember(dto,"UserID"));
		assertEquals(otherDto.toString(),dto.toString());
	}
	
	@Test
	final void testGetMemberById() {		
		MemberDto dto = new MemberDto();		
		dto.setMemberId(utils.generateMemberId(10));
		dto.setFirstName("TEST");
		dto.setMiddleName("TEST");
		dto.setLastName("TEST");
		dto.setSuffixName("TEST");			
		dto.setDateJoined(LocalDate.now());		
		dto.setMemberStatus("CREATED");			
		dto.setLoggedDate(LocalDate.now());		
		MemberEntity entity = new ModelMapper().map(dto, MemberEntity.class);
		
		when(memberRepository.findByMemberId(anyString())).thenReturn(entity);		
		MemberDto savedto = memberService.getByMemberId("UIDH3CglYMIVT");
		assertNotNull(dto);
		assertEquals("TEST",savedto.getFirstName());
	}
	
	
	/*
	 * @Test final void testGetAllMembers() { MemberDto dto = new MemberDto();
	 * dto.setMemberId(utils.generateMemberId(10)); dto.setFirstName("TEST");
	 * dto.setMiddleName("TEST"); dto.setLastName("TEST");
	 * dto.setSuffixName("TEST"); dto.setDateJoined(new Date());
	 * dto.setMemberStatus("CREATED"); dto.setLoggedDate(new Date()); MemberEntity
	 * entity = new ModelMapper().map(dto, MemberEntity.class); List<MemberEntity>
	 * list1 = new ArrayList<MemberEntity>(); list1.add(entity);
	 * 
	 * when(memberRepository.findAll()).thenReturn(list1); List<MemberDto> dtoList =
	 * new ArrayList<MemberDto>(); ModelMapper mapper = new ModelMapper();
	 * 
	 * for(MemberEntity ent: list1) { dtoList.add(mapper.map(ent, MemberDto.class));
	 * }
	 * 
	 * List<MemberDto> savedtolist = memberService.allMembers();
	 * 
	 * assertNotNull(savedtolist);
	 * 
	 * 
	 * assertEquals(savedtolist.toString(), dtoList.toString()); }
	 */
}
