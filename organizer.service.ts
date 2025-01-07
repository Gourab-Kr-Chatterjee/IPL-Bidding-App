import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from 'src/models/player.model';
import { UrlConfig } from './service.config';
import { Team } from 'src/models/team.model';
import { AssignPlayer } from 'src/models/AssignPlayer.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  baseOrganizerUrl:string="";
  baseTeamUrl:string="";
  constructor(private http : HttpClient ) {
      this.baseOrganizerUrl=UrlConfig.BASEURL+'/api/organizer';
      this.baseTeamUrl=UrlConfig.BASEURL+'/api/team';
   }

  getUnsoldPlayers():Observable<Player[]>{
    return this.http.get<Player[]>(this.baseOrganizerUrl+'/unsold-players')
  }

  getTeams():Observable<Team[]>
  {
    return this.http.get<Team[]>(this.baseTeamUrl);
  }

  assignPlayerToTeam(assign : AssignPlayer):Observable<any>
  {
    //take playerid and team id from assign and put it in path variable;
    let params = {
      'playerId' : ''+assign.playerId,
      'teamId' : ''+assign.teamId
    }
    return this.http.post<any>(this.baseOrganizerUrl+'/assign-player' , {} , {params});
  }

  releasePlayerFromTeam(playerId : number):Observable<any>
  {
    return this.http.put<any>(this.baseOrganizerUrl+'/release-player/'+playerId , {});
  }

  getPlayerListInTeam(teamId : number):Observable<Player[]>
  {
    return this.http.get<Player[]>(this.baseOrganizerUrl+'/player-list/'+teamId);
  }

}
