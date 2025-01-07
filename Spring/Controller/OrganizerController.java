package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Player;
import com.examly.springapp.exception.PlayerAlreadyAssignedException;
import com.examly.springapp.service.OrganizerService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("api/organizer/")
public class OrganizerController {
    @Autowired
    OrganizerService organizerService;

    @PostMapping("assign-player")
    public ResponseEntity<Boolean> addPlayer(@RequestParam long playerId , @RequestParam long teamId)
    {
        try{
            
            return ResponseEntity.status(200).body(organizerService.assignPlayerToTeam(playerId, teamId));
        }
        catch(EntityNotFoundException e)
        {
            return ResponseEntity.status(404).body(null);
        }
        catch(PlayerAlreadyAssignedException e)
        {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("unsold-players")
    public ResponseEntity<List<Player>> getUnsoldPlayers()
    {
        try{
            return ResponseEntity.status(200).body(organizerService.getUnsoldPlayers());
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("sold-players")
    public ResponseEntity<List<Player>> getSoldPlayers()
    {
        try{
            return ResponseEntity.status(200).body(organizerService.getSoldPlayers());
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("player-list/{teamId}")
    public ResponseEntity<List<Player>> getTeamPlayers(@PathVariable long teamId)
    {
        try{
            return ResponseEntity.status(200).body(organizerService.getPlayerListByTeamId(teamId));
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("release-player/{playerId}")
    public ResponseEntity<Boolean> releasePlayer(@PathVariable long playerId)
    {
        try{
            organizerService.releasePlayerFromTeam(playerId);
            return ResponseEntity.status(200).body(true);
        }
        catch(EntityNotFoundException e)
        {
            return ResponseEntity.status(500).body(false);
        }
    }
}
