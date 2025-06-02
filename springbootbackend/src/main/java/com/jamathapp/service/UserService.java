package com.jamathapp.service;

import java.util.List;
import java.util.Optional;

import com.jamathapp.model.UserDTO;

public interface UserService {
	
	List<UserDTO> getAllUsers();
    Optional<UserDTO> getUserById(Long id);
    UserDTO saveUser(UserDTO userDTO);
    UserDTO updateUser(Long id, UserDTO userDTO);
    void deleteUser(Long id);

}
