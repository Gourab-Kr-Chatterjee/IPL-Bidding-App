package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Player;
import com.examly.springapp.entity.Team;
import com.examly.springapp.exception.PlayerAlreadyAssignedException;
import com.examly.springapp.repository.PlayerRepo;
import com.examly.springapp.repository.TeamRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;


@Service
public class OrganizerServiceImpl implements OrganizerService{
    @Autowired
    PlayerRepo playerRepo;
    @Autowired
    TeamRepo teamRepo;

    public List<Player> getUnsoldPlayers()
    {
        return playerRepo.findBySold(false);
    }

    public List<Player> getSoldPlayers()
    {
        return playerRepo.findBySold(true);
    }

    public boolean assignPlayerToTeam(long playerId , long teamId) throws PlayerAlreadyAssignedException , EntityNotFoundException
    {
        Player player = playerRepo.findById(playerId).orElse(null);
        Team team = teamRepo.findById(teamId).orElse(null);

        if(player == null ) throw new EntityNotFoundException("Player not found");
        if(team == null ) throw new EntityNotFoundException("team not found");
        if(player.isSold()) throw new PlayerAlreadyAssignedException();
        
        player.setTeam(team);
        player.setSold(true);
        playerRepo.save(player);

        return true;
        
    }

    @Transactional
    private Player playerReleaseTransaction(long playerId)
    {
        playerRepo.updateTeamById(null, playerId);
        playerRepo.updateSoldStatusById(false, playerId);
        return playerRepo.findById(playerId).orElse(null);
    }

    public void releasePlayerFromTeam(long playerId) throws EntityNotFoundException
    {
        if(! playerRepo.existsById(playerId)) throw new EntityNotFoundException();
        // release player from team
        Player player =  this.playerReleaseTransaction(playerId);

    }

    public List<Player> getPlayerListByTeamId(long teamId)
    {
        Optional<Team> optionalTeam = teamRepo.findById(teamId);
        if (optionalTeam.isPresent())
        {
            return optionalTeam.get().getPlayers();
        }
        return null;
    }
}
