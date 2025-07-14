package com.jamathapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jamathapp.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

}
