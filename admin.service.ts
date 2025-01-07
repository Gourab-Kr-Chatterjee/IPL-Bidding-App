import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { Team } from 'src/models/team.model';
import { UrlConfig } from "./service.config";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseTeamUrl="";
  basePlayerUrl="";
  constructor(private http:HttpClient) { 
    this.baseTeamUrl = UrlConfig.BASEURL + `/api/team`;
    this.basePlayerUrl = UrlConfig.BASEURL + `/api/player`;
  }

  getTeams():Observable<Team[]>{
      return this.http.get<Team[]>(`${this.baseTeamUrl}`);
  }

  createTeam(team:Team):Observable<Team>{
      console.log("admin service : sending request to create team..",team);
      return this.http.post<Team>(`${this.baseTeamUrl}`, team);
  }

  updateTeam(teamId:number , team:Team):Observable<Team>
  {
    console.log("admin service asking to update team " + teamId , team);
    return this.http.put<Team>(`${this.baseTeamUrl}/${teamId}`, team);
  }

  deleteTeam(teamId:number):Observable<void>
  {
    return this.http.delete<void>(`${this.baseTeamUrl}/${teamId}`);
  }

  getPlayers():Observable<Player[]>
  {
    return this.http.get<Team[]>(`${this.basePlayerUrl}`);
  }

  getPlayer(playerId:number):Observable<Player[]>
  {
    return this.http.get<Team[]>(`${this.basePlayerUrl}/${playerId}`);
  }

  createPlayer(player:Player):Observable<Player>
  {
     return this.http.post<Player>(`${this.basePlayerUrl}`, player);
  }

  updatePlayer(playerId:number , player:Player):Observable<Player>
  {
    return this.http.put<Player>(`${this.basePlayerUrl}/${playerId}`, player);
  }

  deletePlayer(playerId:number):Observable<void>
  {
    return this.http.delete<void>(`${this.basePlayerUrl}/${playerId}`);
  }

}
