import { Component, Prop, State } from '@stencil/core';
import {score} from './interfaces'

const mockScore: score[] = [{
   
    label: 'Covered distance',
    homeValue: 6,
    awayValue: 2,
  },{
   
    label: 'Covered distance',
    homeValue: 0,
    awayValue: 0,
  },{
   
    label: 'Covered distance',
    homeValue: 0,
    awayValue: 0,
  },{
  
    label: 'Covered distance',
    homeValue: 0,
    awayValue: 0,
  }];

@Component({
    tag: 'pbp-score-board',
    styleUrl: 'score-board.css'
  })



  export class ScoreBoard {
     @Prop() playerA: string = "R. Federe";
     @Prop() playerB: string = "N. Djokovic";
     @Prop() score: string = '0';
     @Prop() open: boolean
     @Prop() jsonOpen: boolean;
     @State() scores: score[]
    
    componentWillLoad() {
       this.scores = mockScore;
      //  console.log("!!!!!"+this.statistics +'MENDI!!!!!');
      
    }
  
    render() {
      return (
      <div class="container">
          <div class="row">
            <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1546962118/scoreBoardBg.png"class="scoreBoardBG img img-responsive">
            </img>
              <span class="playerText">Player</span>
                <span class="playerName A">{this.playerA}</span>
                <span class="playerName B">{this.playerB}</span>
           </div>

          
                <span class="previusSets">Previus Sets</span>

                {this.scores.map((score,i) => {
            return <div class="row">
            <span class={`setScore set${i+1} A text-center`}  >{score.homeValue > 0 ? score.homeValue : '-'}</span>
            <span class={`setScore set${i+1} B text-center`}>{score.awayValue > 0 ? score.awayValue : '-'}</span>
            </div>;
          })}           
       
     </div>

    
      );
    }
  }
