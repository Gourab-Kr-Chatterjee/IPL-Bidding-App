package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import javax.swing.text.html.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.entity.Player;
import com.examly.springapp.repository.PlayerRepo;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    PlayerRepo playerRepo;

    public Player addPlayer(Player player)
    {
        return playerRepo.save(player);
    }

    public Player updatePlayerInfo(long id , Player playerInfo) throws Exception
    {
        if(! playerRepo.existsById(id))
        {
            throw new Exception();
        }

        int rows = playerRepo.updatePlayerById(id, playerInfo.getName(), playerInfo.getAge()    , playerInfo.getCategory(), playerInfo.getBiddingPrice() ,playerInfo.isSold());
        if(rows > 0)
        {
            Optional<Player> playerOptional  = playerRepo.findById(id);
            return playerOptional.get();
        }

        throw new  Exception();
    }

    public List<Player> getPlayers() throws Exception
    {
        if(playerRepo.count() == 0) throw new Exception();
        return playerRepo.findAll();

    }

    public Player getPlayer(long id) throws Exception {
        if(!playerRepo.existsById(id)) throw new Exception();
        Optional<Player> op = playerRepo.findById(id);
        return op.isPresent()?op.get():null;
    }

    public boolean deletePlayer(long id) throws Exception{
        if(!playerRepo.existsById(id)) throw new Exception();

        int rows = playerRepo.deleteById(id);
        if(rows>0)return true;
        return false;
    }
    
}
