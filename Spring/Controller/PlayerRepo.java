package com.examly.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.examly.springapp.entity.Player;
import com.examly.springapp.entity.Team;

import jakarta.transaction.Transactional;

@Repository
public interface PlayerRepo extends JpaRepository<Player,Long>{

    public List<Player> findBySold(boolean value);

    @Transactional
    @Modifying
    @Query("Update #{#entityName} p set p.name = :name , p.age = :age , p.category = :category , p.biddingPrice = :biddingPrice , p.sold = :sold where p.id = :id")
    public int updatePlayerById(long id , String name , int age , String category , double biddingPrice , boolean sold);

    @Transactional
    @Modifying
    @Query("DELETE FROM #{#entityName} p WHERE p.id = ?1 ")
    public int deleteById(long id);

    @Transactional
    @Modifying
    @Query("update Player p set p.team = ?1 where id = ?2")
    public int updateTeamById(Team team , long id);

    @Transactional
    @Modifying
    @Query("Update Player p set p.sold = :status where id = :id")
    public int updateSoldStatusById(boolean status , long id);

}
