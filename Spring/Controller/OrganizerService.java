package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Player;
import com.examly.springapp.exception.PlayerAlreadyAssignedException;

import jakarta.persistence.EntityNotFoundException;

public interface OrganizerService {
    List<Player> getUnsoldPlayers();
    List<Player> getSoldPlayers();
    boolean assignPlayerToTeam(long playerId , long teamId) throws PlayerAlreadyAssignedException , EntityNotFoundException;
    void releasePlayerFromTeam(long playerId) throws EntityNotFoundException;
    List<Player> getPlayerListByTeamId(long teamId);
    
}
