import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Player } from 'src/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {


  @Input() players : Player[];
  @Input() selectedPlayer:Player
  newPlayer : Player;     //holds new or edited player data
  PLAYER_CATEGORIES = ['Batsmen' , 'All Rounder' , 'Bowler' , 'WicketKeeper']

  constructor() {
    this.players=[];
    this.selectedPlayer=null;
    this.newPlayer = this.getResetedPlayer();
  }

  /*Event Emitters*/

  // ask parent to set given player to be edited
  @Output() editPlayerEvent :EventEmitter<Player> = new EventEmitter<Player>();

  //if some player is selected for editing , this event will be emitted on save.
  @Output() saveEditedPlayerEvent:EventEmitter<Player> = new EventEmitter<Player>();

  // if no player is selected for editing , this event will be emiited.
  //it creates new player
  @Output() createPlayerEvent : EventEmitter<Player> = new EventEmitter<Player>();
  
  //emitted when cancel edit is called
  @Output() cancelEditPlayerEvent : EventEmitter<any> = new EventEmitter<any>();

  //emites event when player is to be delted
  @Output() deletePlayerEvent:EventEmitter<number> = new EventEmitter<number>();


  /*Operations*/

  createPlayer()
  {
      this.createPlayerEvent.emit(this.newPlayer);
      //we are resetting newPlayer reseting is not affected with what creation process goes on in parent
      this.newPlayer = this.getResetedPlayer();
  }

  onDeletePlayer(id:number)
  {
    this.deletePlayerEvent.emit(id);
  }

  onEditPlayer(player:Player)
  {
    console.log(`Player component asking data to edit player(id : ${player.id})`,player);
    this.editPlayerEvent.emit(player);
  }

  onSaveEditedPlayer()
  {
    this.newPlayer.id = this.selectedPlayer.id;
    this.saveEditedPlayerEvent.emit(this.newPlayer);
  }

  onCancelEdit()
  {
    this.cancelEditPlayerEvent.emit(null);
  }

  // i want to change new playe when selected player changes
  // I did not set newplayer simply in edit player method becuse
  //after child has informed parent of setting the seletedplayer, it is possible parent does it in async way
  //so child cant set new player to selected player unless selected player is updated in player.
  ngOnChanges(changes:SimpleChanges)
  {
    if(changes.selectedPlayer)
    {
      console.log("selected player changed to :" , this.selectedPlayer);
      if(this.selectedPlayer)
      {
        this.newPlayer = {...this.selectedPlayer};
      }
      else{
        this.newPlayer = this.getResetedPlayer();
      }
    }
  }


  /* Util Operations */ 

  //resets the form data.
  getResetedPlayer()
  {
    return {
      name : '',
      age : 0,
      category : '',
      biddingPrice : 0
    }
  }

  /*properties*/
  get biddingPriceStatus()
  {
    return this.newPlayer.biddingPrice?this.newPlayer.biddingPrice:0;
  }


  ngOnInit(): void {

  }

}
