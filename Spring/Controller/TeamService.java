package com.examly.springapp.service;

import java.util.*;
import com.examly.springapp.entity.*;
import com.examly.springapp.repository.TeamRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamService {
    
    @Autowired
    TeamRepo teamRepo;

    public List<Team> getTeamList(){
        return teamRepo.findAll();
    }

    public Team addTeam(Team team)
    {
        team = teamRepo.save(team);
        return team;
    }

    public Team updateTeam(long id , Team teamUpdateData)
    {
        Team team = teamRepo.findById(id).orElse(null);
        if(team == null ) return null;
        teamUpdateData.setId(id);
        team = teamRepo.save(teamUpdateData);
        return team;

    }

    
    public Team getTeam(long teamId)
    {
        return teamRepo.findById(teamId).orElse(null);
    }

    public boolean deleteTeam(long teamId)
    {
        Optional<Team> opTeam = teamRepo.findById(teamId);
        if(opTeam.isPresent())
        {
            teamRepo.delete(opTeam.get());
            return true;
        }
        return false;
    }
}
