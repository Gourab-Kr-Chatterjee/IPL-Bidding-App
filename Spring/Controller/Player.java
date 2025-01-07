package com.examly.springapp.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    String name;
    int age;
    String category;
    double biddingPrice;
    boolean sold;

    @ManyToOne
    @JoinColumn(name="team_id")
    Team team;
    
    
    public Player(int id, String name, int age, String category , boolean sold) {
            this.id = id;
            this.name = name;
            this.age = age;
            this.category = category;
            this.sold = sold;
            }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

   public Player() {
    }

    public long getId() {
        return id;
    }

    public void setSold(boolean sold)
    {
        this.sold = sold;
    }

    public boolean isSold()
    {
        return sold;
    }

    public void setId(long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public double getBiddingPrice() {
        return biddingPrice;
    }
    public void setBiddingPrice(double biddingPrice) {
        this.biddingPrice = biddingPrice;
    }
}
