package sys.app.ptm;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import sys.app.ptm.entity.AuthorityEntity;
import sys.app.ptm.entity.RoleEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.enums.Roles;
import sys.app.ptm.repository.AuthorityRepository;
import sys.app.ptm.repository.RoleRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.utility.Utility;

@AllArgsConstructor
@Component
@Transactional
public class InitialSetup {
	
	private UserRepository userRepository;
	private AuthorityRepository authorityRepository;
	private RoleRepository roleRepository;
	private Utility utility;
	private BCryptPasswordEncoder encoder;

	@EventListener 
	@Transactional 
	public void onApplicationEvent(ApplicationReadyEvent event) { 		
		
		AuthorityEntity a1 = createAuthority("DASHBOARD"); 
		AuthorityEntity a2 = createAuthority("REPORTS"); 
		AuthorityEntity a3 = createAuthority("MEMBER_REGISTER"); 
		AuthorityEntity a4 = createAuthority("BOARD_REGISTER"); 
		AuthorityEntity a5 = createAuthority("CATEGORY_REGISTER"); 
		AuthorityEntity a6 = createAuthority("MEMBER_MAINTENANCE"); 
		AuthorityEntity a7 = createAuthority("BOARD_MAINTENANCE"); 
		AuthorityEntity a8 = createAuthority("CATEGORY_MAINTENANCE");
		AuthorityEntity a9 = createAuthority("ADMINISTRATION");
		AuthorityEntity a10 = createAuthority("DASHBOARD_CHART");
		AuthorityEntity a11 = createAuthority("REPORT_BOARD");
		AuthorityEntity a12 = createAuthority("REPORT_MEMBER");	
		AuthorityEntity a13 = createAuthority("CATEGORY_GETBY_CATEGORYID");
		AuthorityEntity a14 = createAuthority("CATEGORY_ALL");	
		AuthorityEntity a15 = createAuthority("CATEGORY_SAVE");
		AuthorityEntity a16 = createAuthority("MEMBER_ALL");
		AuthorityEntity a17 = createAuthority("MEMBER_SAVE");
		AuthorityEntity a18 = createAuthority("MEMBER_GETBY_MEMBERID");
		AuthorityEntity a19 = createAuthority("MEMBER_UPDATE");
		AuthorityEntity a20 = createAuthority("MEMBERADDRESS_GETBY_ADDRESSID");
		AuthorityEntity a21 = createAuthority("MEMBERADDRESS_GETBY_MEMBER");
		AuthorityEntity a22 = createAuthority("MEMBERADDRESS_ALL");
		AuthorityEntity a23 = createAuthority("MEMBERADDRESS_SAVE");
		AuthorityEntity a24 = createAuthority("MEMBERCONTACT_SAVE");
		AuthorityEntity a25 = createAuthority("MEMBERCONTACT_GETBY_CONTACTID");
		AuthorityEntity a26 = createAuthority("MEMBERCONTACT_ALL");
		AuthorityEntity a27 = createAuthority("MEMBERCONTACT_GETBY_MEMBER");
		AuthorityEntity a28 = createAuthority("BOARD_GETBY_BOARDID");
		AuthorityEntity a29 = createAuthority("BOARD_ALL");
		AuthorityEntity a30 = createAuthority("BOARD_SAVE");
		AuthorityEntity a31 = createAuthority("BOARD_TABLE");
		AuthorityEntity a32 = createAuthority("BOARD_PAYOUT");
		AuthorityEntity a33 = createAuthority("BOARDMEMBER_GETBY_BOARDMEMBERID");
		AuthorityEntity a34 = createAuthority("BOARDMEMBER_UPDATE");
		AuthorityEntity a35 = createAuthority("BOARDMEMBER_ALL");
		AuthorityEntity a36 = createAuthority("BOARDMEMBER_SAVE");
		AuthorityEntity a37 = createAuthority("BOARDMEMBER_GETBY_BOARD");
		AuthorityEntity a38 = createAuthority("AUTHORITY_ALL");
		AuthorityEntity a39 = createAuthority("AUTHORITY_SAVE");
		AuthorityEntity a40 = createAuthority("AUTHORITY_GETBY_USER");
		AuthorityEntity a41 = createAuthority("AUTHORITY_GETROLES_USER");
		AuthorityEntity a42 = createAuthority("ROLE_APPLY_AUTHORITIES");
		AuthorityEntity a43 = createAuthority("ROLE_ALL");
		AuthorityEntity a44 = createAuthority("ROLE_SAVE");
		AuthorityEntity a45 = createAuthority("USER_GETBY_ROLE");
		AuthorityEntity a46 = createAuthority("USER_SAVE");
		AuthorityEntity a47 = createAuthority("USER_RESET_PASSWORD");
		AuthorityEntity a48 = createAuthority("USER_ALL");
		AuthorityEntity a49 = createAuthority("USER_UPDATE");
		AuthorityEntity a50 = createAuthority("USER_DELETE");
		AuthorityEntity a51 = createAuthority("USER_GETBY_USERID");
		AuthorityEntity a52 = createAuthority("USERADDRESS_GETBY_ADDRESSID");
		AuthorityEntity a53 = createAuthority("USERADDRESS_SAVE");
		AuthorityEntity a54 = createAuthority("USERADDRESS_ALL");	
		AuthorityEntity a55 = createAuthority("USERIMAGE_UPDATE");
		AuthorityEntity a56 = createAuthority("USERIMAGE_SAVE");
		AuthorityEntity a57 = createAuthority("USERIMAGE_GETBY_IMAGEID");
		AuthorityEntity a58 = createAuthority("USERIMAGE_ALL");
		
		AuthorityEntity a59 = createAuthority("ROLE_ALL_BY_USER");
		AuthorityEntity a60 = createAuthority("AUTHORITY_ALL_BY_ROLE");
		AuthorityEntity a61 = createAuthority("USER_APPLY_ROLE");
		
		AuthorityEntity a62 = createAuthority("PROCESSES");
		AuthorityEntity a63 = createAuthority("RECRUITMENT_PROCESS");
		AuthorityEntity a64 = createAuthority("RELEASE_PROCESS");
		AuthorityEntity a65 = createAuthority("CLAIM_PROCESS");
		
		AuthorityEntity a66 = createAuthority("REPORT_RELEASE");
 
		RoleEntity roleAdmin = createRole(Roles.ROLE_ADMIN.name(),
				Arrays.asList( a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,
						 a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,
						 a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,
						 a31,a32,a33,a34,a35,a36,a37,a38,a39,a40,
						 a41,a42,a43,a44,a45,a46,a47,a48,a49,a50,
						 a51,a52,a53,a54,a55,a56,a57,a58,a59,a60,
						 a61,a62,a63,a64,a65,a66
						));
 
		if (roleAdmin == null) return;
 
		
		if(userRepository.findByEmail("nehemiasbelong@gmail.com") == null) {
		UserEntity adminUser = new UserEntity(); 
		adminUser.setFirstName("Nehemias");
		adminUser.setMiddleName("Cajurao"); 
		adminUser.setLastName("Belong");
		adminUser.setSuffixName("Jr");
		adminUser.setFullName(utility.generateFullName("Nehemias", "Cajurao", "Belong", "Jr"));
		adminUser.setEmail("nehemiasbelong@gmail.com");
		adminUser.setEmailVerificationStatus(true);
		adminUser.setUserId(utility.generateUserId(10));
		adminUser.setEncryptedPassword(encoder.encode("password123"));
		adminUser.setRoles(Arrays.asList(roleAdmin)); userRepository.save(adminUser);
		}
	}

	@Transactional 
	private AuthorityEntity createAuthority(String name) {
		AuthorityEntity authority = authorityRepository.findByName(name);
		if(authority == null) { 
			authority = new AuthorityEntity();
			authority.setName(name); 
			authorityRepository.save(authority); 
		} 
		return authority; 
	}

	@SuppressWarnings("null") 
	@Transactional 
	private RoleEntity createRole(String name, Collection<AuthorityEntity> authorities) { 
		RoleEntity resultEntity = new RoleEntity();
		RoleEntity role = roleRepository.findByName(name); 
		if (role == null) { 
			role = new RoleEntity(); 
			role.setName(name);
			role.setAuthorities(authorities); 
			resultEntity = roleRepository.save(role); 
		}
		else { 
			for (AuthorityEntity auth : authorities) { 
				if(!role.getAuthorities().contains(auth)) { 
					role.getAuthorities().add(auth); 
				}
			} 
			resultEntity = roleRepository.save(role);
		}
		return resultEntity; 
	}
 
 } 
