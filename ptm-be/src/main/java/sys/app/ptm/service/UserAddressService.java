package sys.app.ptm.service;

import java.util.List;
import sys.app.ptm.dto.UserAddressDto;

public interface UserAddressService {
	List<UserAddressDto> allAddress();
	UserAddressDto getAddressById(String addressId);
	UserAddressDto saveAddress(String userId, UserAddressDto dto);	
	UserAddressDto updateAddress(UserAddressDto addressDto , String addressId);
}
