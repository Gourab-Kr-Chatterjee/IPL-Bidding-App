package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Response;
import com.examly.springapp.entity.User;

public interface UserService {
    public User addUser(User user) throws Exception;
    public User getUser(long id) throws Exception;
    public List<User> getUsers() throws Exception;
    public Response loginUser(User user) throws Exception;
}
