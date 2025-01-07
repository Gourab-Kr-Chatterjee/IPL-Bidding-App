import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/models/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() teams:Team[];
  @Input() selectedTeam;
  newTeam:Team;

  constructor() {
    this.teams = [];
    this.selectedTeam = null;
    this.newTeam = this.getResetedTeam();
   }

  /* Output Events */
  @Output() editTeamEvent = new EventEmitter<Team>();
  @Output() saveEditedTeamEvent = new EventEmitter<Team>();
  @Output() cancelEditTeamEvent = new EventEmitter<any>();
  @Output() deleteTeamEvent = new EventEmitter<number>();
  @Output() createTeamEvent = new EventEmitter<Team>();

  /* Operations */
  createTeam()
  {
    console.log("team component : sending request to create team..",this.newTeam);
    this.createTeamEvent.emit(this.newTeam);
    this.newTeam = this.getResetedTeam();
  }

  onEditTeam(team:Team)
  {
    this.editTeamEvent.emit(team);
  }

  onSaveEditedTeam(team:Team)
  {
      if(this.selectedTeam==null) return;
      team = {...team, id:this.selectedTeam.id};
      console.log("team component asking to update team " + this.selectedTeam.id , team);
      this.saveEditedTeamEvent.emit(team);
  }

  onDeleteTeam(id:number)
  {
    this.deleteTeamEvent.emit(id);
  }

  onCancelEdit()
  {
    this.cancelEditTeamEvent.emit(null);
  }

  ngOnInit(): void {
  }

  /*Utils*/
  getResetedTeam()
  {
    return {
      name : "",
      maximumBudget : 0
    }
  }

  /*properties*/
  get maximumBidStatus()
  {
    return this.newTeam.maximumBudget;
  }

}
