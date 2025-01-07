package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Response;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    UserRepo userRepo;

    public User addUser(User user) throws Exception
    {
         return userRepo.save(user);
    }

    public User getUser(long id) throws Exception
    {
        if(!userRepo.existsById(id)) throw new Exception();
        return userRepo.findById(id).get();

    }

    public Response loginUser(User user) throws Exception
    {
        if(userRepo.findUserByUsernamePasswordRole(user.getUsername(), user.getPassword(), user.getRole()).size()==0) throw new Exception();
        return new Response("123.asd.123",user.getRole());
    }

    public List<User> getUsers() throws Exception
    {
        if(userRepo.count()==0) throw new Exception();
        return userRepo.findAll();
    }


}
