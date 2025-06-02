package com.jamathapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jamathapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
