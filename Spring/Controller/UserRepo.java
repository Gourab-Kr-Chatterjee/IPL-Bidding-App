package com.examly.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User,Long> {

    @Query("SELECT u from User u where u.username=:username and u.password=:password and u.role=:role")
    public List<User> findUserByUsernamePasswordRole(String username, String password , String role);
}
