package sys.app.ptm.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sys.app.ptm.dto.UserAddressDto;
import sys.app.ptm.dto.UserDto;
import sys.app.ptm.entity.UserAddressEntity;
import sys.app.ptm.entity.UserEntity;
import sys.app.ptm.repository.UserAddressRepository;
import sys.app.ptm.repository.UserRepository;
import sys.app.ptm.service.UserAddressService;
import sys.app.ptm.utility.Utility;

@Service
@AllArgsConstructor
public class UserAddressServiceImplementation implements UserAddressService {
	
	private UserAddressRepository addressRepository;
	private UserRepository userRepository;
	private Utility utility;
	
	@Override
	public List<UserAddressDto> allAddress() {
		ModelMapper mapper = new ModelMapper();
		List<UserAddressDto> listDto = new ArrayList<UserAddressDto>();
		List<UserAddressEntity> listEntity = addressRepository.findAll();
		for(UserAddressEntity entity: listEntity) {
			listDto.add(mapper.map(entity, UserAddressDto.class));
		}
		return listDto;
	}
	
	@Override
	public UserAddressDto getAddressById(String addressId) {
		UserAddressEntity entity = addressRepository.findByAddressId(addressId);
		return new ModelMapper().map(entity, UserAddressDto.class);
	}

	@Override
	public UserAddressDto saveAddress(String userId, UserAddressDto dto) {
		UserEntity userEntity = userRepository.findByUserId(userId);
		UserAddressEntity addressEntity = new ModelMapper().map(dto, UserAddressEntity.class);
		addressEntity.setAddressId(utility.generateAddressId(10));
		addressEntity.setUserDetails(userEntity);
		UserAddressEntity saveAddressEntity = addressRepository.save(addressEntity);
		UserEntity saveUserEntity = saveAddressEntity.getUserDetails();
		UserDto userDto = new ModelMapper().map(saveUserEntity, UserDto.class);
		UserAddressDto returnDto = new ModelMapper().map(saveAddressEntity, UserAddressDto.class);
		returnDto.setUserDetails(userDto);
		return returnDto;
	}

	@Override
	public UserAddressDto updateAddress(UserAddressDto addressDto, String addressId) {
		String city = addressDto.getCity();
		String country = addressDto.getCountry();
		String streetName = addressDto.getStreetName();
		String postalCode = addressDto.getPostalCode();
		String type = addressDto.getType().toUpperCase();
		UserAddressEntity entity = addressRepository.findByAddressId(addressId);
		entity.setCity(city);		
		entity.setCountry(country);
		entity.setStreetName(streetName);
		entity.setPostalCode(postalCode);
		entity.setType(type);
		UserAddressEntity updatedentity = addressRepository.save(entity);		
		return new ModelMapper().map(updatedentity, UserAddressDto.class);
	}
}
