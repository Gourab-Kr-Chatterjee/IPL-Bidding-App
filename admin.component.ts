import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  teams:Team[];
  players:Player[];
  selectedPlayer:Player;
  selectedTeam:Team;
  constructor(private adminService:AdminService) {
    this.teams=[];
    this.players=[];
   }

  ngOnInit(): void {
    this.loadTeams();
    this.loadPlayers();
  }

  
  loadTeams()
  {
    this.adminService.getTeams().subscribe(
      res=>{
        console.log("teams retrived by admin component,",res);
        this.teams=res;
      }
      )
    }
    
  loadPlayers()
  {
    this.adminService.getPlayers().subscribe(
      {
      next : res=>{
        console.log("players retrived by admin component,",res);
        this.players=res;
      },
      error : error=>{
        if(error.status==404)
        {
          console.log("No Players Found by admin Component!");
          this.players=[];
        }
        else{
          console.log("Unexpected Error!");
        }
      }
    }
      )

    }

  onCreateTeam(team:Team)
  {
    console.log("admin component : sending request to create team..",team);
    this.adminService.createTeam(team).subscribe(
      res=>{
        console.log("team created!,",res);
        this.loadTeams();
      }
    )
  }
      
  onEditTeam(team:Team)
  {
    this.selectedTeam = team;
  }

  onCancelEditTeam()
  {
    this.selectedTeam=null;
  }

  onSaveEditedTeam(team:Team)
  {
    console.log("admin component asking to update team " + this.selectedTeam.id , team);
    this.adminService.updateTeam(team.id , team).subscribe(
      res=>{
        console.log(`updated the team(id : ${res.id})`);
        this.selectedTeam=null;
        this.loadTeams();
      }
    )
  }

  onDeleteTeam(id:number)
  {
    this.adminService.deleteTeam(id).subscribe(
      res=>{
        console.log("Team deleted successfully!!");
        this.loadTeams();
      }
    )
  }

  //players operations

  onCreatePlayer(player:Player)
  {
    this.adminService.createPlayer(player).subscribe(
      res=>{
        console.log("player created!,",res);
        this.loadPlayers();
      }
    )
  }

  onEditPlayer(player:Player)
    {
      this.selectedPlayer = player;
      console.log(`Admin component setting selected player to be edited(id : ${this.selectedPlayer.id})`,this.selectedPlayer);
    }
  
  onCancelEditPlayer()
  {
    this.selectedPlayer=null;
  }

  onSaveEditedPlayer(player:Player)
  {
    this.adminService.updatePlayer(player.id , player).subscribe(
      res=>{
        console.log(`updated the player(id : ${res.id})`);
        this.selectedPlayer=null;
        this.loadPlayers();
      }
    )
  }

  onDeletePlayer(id:number)
  {
    this.adminService.deletePlayer(id).subscribe(
      res=>{
        //if deleted player is seleced for editing set selected player as null
        if(this.selectedPlayer?.id==id)
        {
          this.selectedPlayer=null;
        }
        console.log("Player deleted successfully!!");
        this.loadPlayers();
      }
    )
  }


  
}
