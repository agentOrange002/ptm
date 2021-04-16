package sys.app.ptm.service;

import java.util.List;
import org.springframework.security.core.userdetails.UserDetailsService;
import sys.app.ptm.dto.UserDto;
import sys.app.ptm.dto.shortdto.ShortUserDto;

public interface UserService extends UserDetailsService {
	List<ShortUserDto> allUsers();
	UserDto getUserById(String userId);
	UserDto postUser(UserDto dto);
	
	UserDto getUser(String userName);
	
	ShortUserDto getShortUser(String userName);
	
	UserDto createUser(UserDto user);
	UserDto getEmail(String email);
	UserDto getUserByUserId(String userId);
	UserDto updateUser(String userId, UserDto user);
	void deleteUser(String userId);
	boolean verifyEmailToken(String token);
	boolean requestPasswordReset(String email);
	boolean resetPassword(String token, String password);	
	boolean authResetPassword(String id, String password);	
	List<UserDto> getAllUsers();
	List<UserDto> getAllUsersByRole(String roleName);
	UserDto applyUserRole(String userId, String roleName);
}
