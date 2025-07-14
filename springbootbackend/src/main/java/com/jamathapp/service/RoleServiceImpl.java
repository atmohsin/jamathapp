package com.jamathapp.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.jamathapp.dto.RoleDTO;
import com.jamathapp.model.Role;
import com.jamathapp.repository.RoleRepository;

@Service
public class RoleServiceImpl implements RoleService {
	
	private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


    public List<RoleDTO> getAllRoles() {
        return roleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    //Convert Role Entity to RoleDTO
    private RoleDTO convertToDTO(Role role) {
        return new RoleDTO(role.getId(), role.getRoleName());
    }

    //Convert RoleDTO to Role Entity
    private Role convertToEntity(RoleDTO roleDTO) {
        Role role = new Role();
        role.setRoleName(roleDTO.roleName());
        return role;
    }

}
