package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.entity.Player;
import com.examly.springapp.service.PlayerService;

@RestController
@RequestMapping("api/player")
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody Player player) throws Exception
    {
        try{
            return ResponseEntity.status(200).body(playerService.addPlayer(player));
        }
        catch(Exception e)
        {   
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<Player> updatePlayer(@RequestBody Player player , @PathVariable long playerId)
    {
        try{
            return ResponseEntity.status(200).body(playerService.updatePlayerInfo(playerId , player));
        }
        catch(Exception e)
        {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{playerId}")
    public ResponseEntity<Player> getPlayerById (@PathVariable long playerId)
    {
        try{
            return ResponseEntity.status(200).body(playerService.getPlayer(playerId));
        }
        catch(Exception e)
        {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/{playerId}")
    public ResponseEntity<Boolean> deletePlayerById (@PathVariable long playerId)
    {
        try{
            playerService.deletePlayer(playerId);
            return ResponseEntity.status(200).body(true);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(404).body(false);
        }
    }

    @GetMapping
    public ResponseEntity<List<Player>> getPlayers ()
    {
        try{
            return ResponseEntity.status(200).body(playerService.getPlayers());
        }
        catch(Exception e)
        {
            return ResponseEntity.status(404).body(null);
        }
    }
}
