package com.jamathapp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jamathapp.dto.UserDTO;
import com.jamathapp.model.Role;
import com.jamathapp.model.User;
import com.jamathapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	  	private final UserRepository userRepository;

	    public UserServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }

	    @Override
	    public List<UserDTO> getAllUsers() {
	        return userRepository.findAll().stream()
	                .map(this::convertToDTO)
	                .collect(Collectors.toList());
	    }

	    @Override
	    public Optional<UserDTO> getUserById(Long id) {
	        return userRepository.findById(id).map(this::convertToDTO);
	    }

	    @Override
	    public UserDTO saveUser(UserDTO userDTO) {
	        User user = convertToEntity(userDTO);
	        User savedUser = userRepository.save(user);
	        return convertToDTO(savedUser);
	    }

	    @Override
	    public UserDTO updateUser(Long id, UserDTO userDTO) {
	        User user = userRepository.findById(id).orElseThrow();
	        
	        user.setFirstName(userDTO.firstName());
	        user.setLastName(userDTO.lastName());
	        user.setEmail(userDTO.email());
	        user.setMobileno(userDTO.mobileno());
	        user.setPassword(userDTO.password());
	        Role role = new Role();
	        role.setId(userDTO.roleid());
	        user.setRole(role);
	        User updatedUser = userRepository.save(user);
	        return convertToDTO(updatedUser);
	    }

	    @Override
	    public void deleteUser(Long id) {
	    	userRepository.deleteById(id);
	    }

	    // Convert Product Entity to ProductDTO
	    private UserDTO convertToDTO(User user) {
	        return new UserDTO(user.getId(), user.getFirstName(),user.getLastName(),user.getEmail(), user.getMobileno(),user.getPassword(),user.getRole().getId());
	    }

	    // Convert ProductDTO to Product Entity
	    private User convertToEntity(UserDTO userDTO) {
	        User user = new User();
	        user.setFirstName(userDTO.firstName());
	        user.setLastName(userDTO.lastName());
	        user.setEmail(userDTO.email());
	        user.setMobileno(userDTO.mobileno());
	        user.setPassword(userDTO.password());
	        Role role = new Role();
	        role.setId(userDTO.roleid());
	        user.setRole(role);
	        return user;
	    }

}
