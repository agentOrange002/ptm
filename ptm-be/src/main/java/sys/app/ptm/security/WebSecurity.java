package sys.app.ptm.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import sys.app.ptm.exception.FilterChainExceptionHandler;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.UserService;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {	
	
	@Autowired
	private FilterChainExceptionHandler filterChainExceptionHandler;

	private final UserService userDetailsService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepository;

	public WebSecurity(UserService userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder,
			UserRepository userRepository) {
		this.userDetailsService = userDetailsService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.userRepository = userRepository;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http.cors().and().csrf().disable().authorizeRequests()				
				//.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_RELEASE).permitAll()
				//.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_MEMBER).permitAll()
				//.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_BOARD).permitAll()
				//.antMatchers(HttpMethod.DELETE, SecurityConstants.DELETE_USER).hasRole("ADMIN")
		
				.antMatchers(HttpMethod.GET, SecurityConstants.DASHBOARD).hasAuthority("DASHBOARD")
				.antMatchers(HttpMethod.GET, SecurityConstants.DASHBOARD_CHART).hasAuthority("DASHBOARD_CHART")
				.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_MEMBER).hasAuthority("REPORT_MEMBER")
				.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_BOARD).hasAuthority("REPORT_BOARD")
				.antMatchers(HttpMethod.GET, SecurityConstants.REPORT_RELEASE).hasAuthority("REPORT_RELEASE")
				.antMatchers(HttpMethod.GET, SecurityConstants.CATEGORY_GETBY_CATEGORYID).hasAuthority("CATEGORY_GETBY_CATEGORYID")
				.antMatchers(HttpMethod.GET, SecurityConstants.CATEGORY_ALL).hasAuthority("CATEGORY_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.CATEGORY_SAVE).hasAuthority("CATEGORY_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBER_ALL).hasAuthority("MEMBER_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.MEMBER_SAVE).hasAuthority("MEMBER_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBER_GETBY_MEMBERID).hasAuthority("MEMBER_GETBY_MEMBERID")
				.antMatchers(HttpMethod.PUT, SecurityConstants.MEMBER_UPDATE).hasAuthority("MEMBER_UPDATE")				
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERADDRESS_GETBY_ADDRESSID).hasAuthority("MEMBERADDRESS_GETBY_ADDRESSID")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERADDRESS_GETBY_MEMBER).hasAuthority("MEMBERADDRESS_GETBY_MEMBER")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERADDRESS_ALL).hasAuthority("MEMBERADDRESS_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.MEMBERADDRESS_SAVE).hasAuthority("MEMBERADDRESS_SAVE")				
				.antMatchers(HttpMethod.POST, SecurityConstants.MEMBERCONTACT_SAVE).hasAuthority("MEMBERCONTACT_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERCONTACT_GETBY_CONTACTID).hasAuthority("MEMBERCONTACT_GETBY_CONTACTID")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERCONTACT_ALL).hasAuthority("MEMBERCONTACT_ALL")
				.antMatchers(HttpMethod.GET, SecurityConstants.MEMBERCONTACT_GETBY_MEMBER).hasAuthority("MEMBERCONTACT_GETBY_MEMBER")				
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARD_GETBY_BOARDID).hasAuthority("BOARD_GETBY_BOARDID")
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARD_ALL).hasAuthority("BOARD_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.BOARD_SAVE).hasAuthority("BOARD_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARD_TABLE).hasAuthority("BOARD_TABLE")
				.antMatchers(HttpMethod.POST, SecurityConstants.BOARD_PAYOUT).hasAuthority("BOARD_PAYOUT")				
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARDMEMBER_GETBY_BOARDMEMBERID).hasAuthority("BOARDMEMBER_GETBY_BOARDMEMBERID")
				.antMatchers(HttpMethod.PUT, SecurityConstants.BOARDMEMBER_UPDATE).hasAuthority("BOARDMEMBER_UPDATE")
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARDMEMBER_ALL).hasAuthority("BOARDMEMBER_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.BOARDMEMBER_SAVE).hasAuthority("BOARDMEMBER_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.BOARDMEMBER_GETBY_BOARD).hasAuthority("BOARDMEMBER_GETBY_BOARD")				
				.antMatchers(HttpMethod.GET, SecurityConstants.AUTHORITY_ALL).hasAuthority("AUTHORITY_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.AUTHORITY_SAVE).hasAuthority("AUTHORITY_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.AUTHORITY_GETBY_USER).hasAuthority("AUTHORITY_GETBY_USER")
				.antMatchers(HttpMethod.GET, SecurityConstants.AUTHORITY_GETROLES_USER).hasAuthority("AUTHORITY_GETROLES_USER")				
				.antMatchers(HttpMethod.PUT, SecurityConstants.ROLE_APPLY_AUTHORITIES).hasAuthority("ROLE_APPLY_AUTHORITIES")
				.antMatchers(HttpMethod.GET, SecurityConstants.ROLE_ALL).hasAuthority("ROLE_ALL")
				.antMatchers(HttpMethod.POST, SecurityConstants.ROLE_SAVE).hasAuthority("ROLE_SAVE")				
				.antMatchers(HttpMethod.GET, SecurityConstants.USER_GETBY_ROLE).hasAuthority("USER_GETBY_ROLE")
				.antMatchers(HttpMethod.POST, SecurityConstants.USER_SAVE).hasAuthority("USER_SAVE")
				.antMatchers(HttpMethod.POST, SecurityConstants.USER_RESET_PASSWORD).hasAuthority("USER_RESET_PASSWORD")
				.antMatchers(HttpMethod.GET, SecurityConstants.USER_ALL).hasAuthority("USER_ALL")
				.antMatchers(HttpMethod.PUT, SecurityConstants.USER_UPDATE).hasAuthority("USER_UPDATE")
				.antMatchers(HttpMethod.DELETE, SecurityConstants.USER_DELETE).hasAuthority("USER_DELETE")
				.antMatchers(HttpMethod.GET, SecurityConstants.USER_GETBY_USERID).hasAuthority("USER_GETBY_USERID")				
				.antMatchers(HttpMethod.GET, SecurityConstants.USERADDRESS_GETBY_ADDRESSID).hasAuthority("USERADDRESS_GETBY_ADDRESSID")
				.antMatchers(HttpMethod.POST, SecurityConstants.USERADDRESS_SAVE).hasAuthority("USERADDRESS_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.USERADDRESS_ALL).hasAuthority("USERADDRESS_ALL")	
				.antMatchers(HttpMethod.PUT, SecurityConstants.USERIMAGE_UPDATE).hasAuthority("USERIMAGE_UPDATE")
				.antMatchers(HttpMethod.POST, SecurityConstants.USERIMAGE_SAVE).hasAuthority("USERIMAGE_SAVE")
				.antMatchers(HttpMethod.GET, SecurityConstants.USERIMAGE_GETBY_IMAGEID).hasAuthority("USERIMAGE_GETBY_IMAGEID")
				.antMatchers(HttpMethod.GET, SecurityConstants.USERIMAGE_ALL).hasAuthority("USERIMAGE_ALL")
				
				.antMatchers(HttpMethod.GET, SecurityConstants.ROLE_ALL_BY_USER).hasAuthority("ROLE_ALL_BY_USER")
				.antMatchers(HttpMethod.GET, SecurityConstants.AUTHORITY_ALL_BY_ROLE).hasAuthority("AUTHORITY_ALL_BY_ROLE")
				.antMatchers(HttpMethod.PUT, SecurityConstants.USER_APPLY_ROLE).hasAuthority("USER_APPLY_ROLE")
				
				.antMatchers("/api/**").authenticated()
				.antMatchers("/**", "/systeminfo/**", "/configuration/**", "/swagger*/**", "/webjars/**","/swagger-ui/**").permitAll().anyRequest().authenticated().and()	
				.addFilter(getAuthenticationFilter())
				.addFilter(new AuthorizationFilter(authenticationManager(), userRepository))
				.addFilterBefore(filterChainExceptionHandler,AuthenticationFilter.class)				
				.sessionManagement()				
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}

	protected AuthenticationFilter getAuthenticationFilter() throws Exception {
		final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
		filter.setFilterProcessesUrl("/login");
		return filter;
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
//"http://127.0.0.1:3000","http://127.0.0.1:80","http://127.0.0.1","http://192.168.254.101:3000","http://localhost:3000","http://localhost:80","http://localhost","http://192.168.254.101","http://192.168.254.101:80",
		configuration.setAllowedOrigins(Arrays.asList(
		"**",
		"http://0.0.0.0:80",
		"http://127.0.0.1:3000",
		"http://127.0.0.1:80",
		"http://127.0.0.1:8080",
		"http://127.0.0.1",
		"http://192.168.254.101:3000",
		"http://localhost:3000",
		"http://localhost:80",
		"http://localhost:8080",
		"http://localhost",
		"http://192.168.254.101",
		"http://192.168.254.101:80",
		"http://192.168.254.101:8080",
		"http://192.168.254.102",
		"http://192.168.254.102:80",
		"http://192.168.254.102:8080",
		"http://192.168.254.115",
		"http://192.168.254.115:80",
		"http://192.168.254.115:8080"));
	
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
		configuration.setAllowCredentials(true);
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setExposedHeaders(Arrays.asList("Authorization","UserID"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}	 

}
