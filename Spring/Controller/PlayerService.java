package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.entity.Player;

public interface PlayerService {
    public Player addPlayer(Player player)throws Exception;
    public Player updatePlayerInfo(long id , Player playerInfo)throws Exception;
    public List<Player> getPlayers()throws Exception;
    public Player getPlayer(long id)throws Exception;
    public boolean deletePlayer(long id)throws Exception;
}
