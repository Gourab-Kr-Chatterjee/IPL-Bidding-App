package com.examly.springapp.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("api/team")
public class TeamController {

    @Autowired
    TeamService teamService;

    @PostMapping
    public ResponseEntity<Team> addTeam(@RequestBody Team team)
    {
        team = teamService.addTeam(team);
        if(team != null)
        return new ResponseEntity<>(team,HttpStatus.OK);
        else
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/{teamId}")
    public ResponseEntity<Team> updateTeam (@RequestBody Team team , @PathVariable int teamId)
    {
        team = teamService.updateTeam(teamId , team);
        if(team != null)
        return new ResponseEntity<>(team,HttpStatus.OK);
        else
        return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeam()
    {
        return new ResponseEntity<>(teamService.getTeamList(),HttpStatus.OK);
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<Team> getTeam(@PathVariable int teamId)
    {
        return new ResponseEntity<Team>(teamService.getTeam(teamId),HttpStatus.OK);
    }
    
    @DeleteMapping("/{teamId}")
    public ResponseEntity<Boolean> deleteTeam(@PathVariable int teamId)
    {
        return new ResponseEntity<Boolean>(teamService.deleteTeam(teamId),HttpStatus.OK);
    }

    
}


