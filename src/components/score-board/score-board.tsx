import { Component, Prop, State } from '@stencil/core';
import {score} from './interfaces'

// const mockScore: score[] = [{
   
//     label: 'Covered distance',
//     homeValue: 55,
//     awayValue: 32,
//   },{
   
//     label: 'Covered distance',
//     homeValue: 11,
//     awayValue: 32,
//   },{
   
//     label: 'Covered distance',
//     homeValue: 55,
//     awayValue: 232,
//   },{
  
//     label: 'Covered distance',
//     homeValue: 88,
//     awayValue: 32,
//   }];

@Component({
    tag: 'pbp-score-board',
    styleUrl: 'score-board.css'
  })



  export class ScoreBoard {
     @Prop() open: boolean
     @Prop() jsonOpen: boolean;
     @State() scores: score[]
    
    componentWillLoad() {
      // this.scores = mockScore;
      //  console.log("!!!!!"+this.statistics +'MENDI!!!!!');
      
    }
  
    render() {
      return (
      
            <div class={`scoreboard-outer ${this.jsonOpen && 'open'} sticky-top`}>
                <span class="team-name one">HOME</span>
                <div class="score-panel">
                <span class="score team1">30</span>
                <span class="score team2">20</span>
                </div>
                <span class="team-name two">OUT</span>
            </div>
    
      );
    }
  }
