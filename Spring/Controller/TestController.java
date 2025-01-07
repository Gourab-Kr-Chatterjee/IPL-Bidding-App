package com.examly.springapp.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Team;
import com.examly.springapp.service.TeamService;

@RestController
@RequestMapping("api/test/")
public class TestController {

    @Autowired
    TeamService teamService;

    @GetMapping("welcome")
    public String welcome()
    {
        return "Welcome to Spring Boot Project";
    }

    @GetMapping("team")
    public ResponseEntity<List<Team>> getAllTeam()
    {
        return new ResponseEntity<>(teamService.getTeamList(),HttpStatus.OK);
    }
    
}


