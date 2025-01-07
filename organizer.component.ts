import { Component, OnInit } from '@angular/core';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';
import { OrganizerService } from '../services/organizer.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  teams:Team[];     //contains all teams
  unsoldPlayers:Player[];   //contains list of unsold players

  CATEGORIES = ["All" , "Batsman" , "Bowler" , "Wicketkeeper"];
  selectedCategory:string;    //holds selected category from CATEGORIES
  showList:Player[];      //holds list of unsold players by selected category

  selectedTeamId:number;  //holds id of team whose player list is to be displayed
  players:Player[];   //list of players in team whose id is in selectedTeamId variable.

  constructor(private organizerService:OrganizerService) {
    this.teams=[];
    this.players=[];
    this.selectedCategory = "All";
    this.selectedTeamId = undefined;

   }

  ngOnInit(): void {
    this.loadUnsoldPlayers();
    this.loadTeams();
  }

  filterByCategory(selectedCategory?:string)
  {
    this.selectedCategory=selectedCategory?selectedCategory:'All';
    console.log(this.selectedCategory);
    this.showList = this.selectedCategory=='All'?this.unsoldPlayers
                    :this.unsoldPlayers.filter(p=>p.category==this.selectedCategory);
  }

  loadUnsoldPlayers()
  {
    // use organiser service to load unsold players in unsoldPlayers variable
    this.organizerService.getUnsoldPlayers().subscribe(
      {
      next : res=>{
        this.unsoldPlayers=res;
        console.log("got unsold players",res);
        this.filterByCategory();
      },
      error : err=>{
          console.log("cant fetch unsold players! ==> response_status:",err.status)
      }
    }
    )
  }

  loadPlayersOfSelectedTeam()
  {
    //load players in players array 
    this.organizerService.getPlayerListInTeam(this.selectedTeamId).subscribe(
      {
      next : res=>{
        this.players=res;
        console.log("getting players in team ",this.selectedTeamId," ",res);
      },
      error : err=>{
        console.log("cant fetch players !==>response_status:",err.status)
      }
    }
    )
  }

  loadTeams()
  {
    //load teams using orgainser service
    this.organizerService.getTeams().subscribe(
      {
      next: res=>{
        console.log("getting teams...",res);
        this.teams=res;
      },
      error : err=>{
        console.log("cant fetch teams! ==>response_status:",err.status)
      }
    }
    )
  }

  //assign player to team
  assign(playerId:number,teamId:number)
  {
    //use Organiser service to assign player to team
    this.organizerService.assignPlayerToTeam({playerId,teamId}).subscribe(
      res=>{
        console.log(`assigned player(id: ${playerId}) to team(id : ${teamId})`);
        // reload unsold players
        this.loadUnsoldPlayers();
        // reload players of selected team
        this.loadPlayersOfSelectedTeam();
      }
    )
  }

  toggleSelectedTeam(teamId:number)
  {
    //toggle the selection of team 
    if(this.selectedTeamId == teamId)
    {
      this.selectedTeamId = undefined;
      this.players = [];
    }
    else{
      this.selectedTeamId = teamId;
      //load players of selected team
      this.loadPlayersOfSelectedTeam();
    }
  }

  releasePlayer(playerId:number)
  {
    // use organiser service to release player
    this.organizerService.releasePlayerFromTeam(playerId).subscribe(
      res=>{
        console.log(`released player(id:${playerId}) from team(id:${this.selectedTeamId})`);
        // reload players of selcted team
        this.loadPlayersOfSelectedTeam();
        // reload unsold players
        this.loadUnsoldPlayers();
      }
    )
  }


  

}
