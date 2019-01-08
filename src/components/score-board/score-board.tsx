import { Component, Prop, State } from '@stencil/core';
import {score,points} from './interfaces'

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

const mockPoints: points[] = [{

    label:'home',
    sets:3,
    game:5,
    point:40 },{

     label:'out',
     sets:2,
     game:4,
     point:15 
   }]

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
    //  @Prop() message: boolean;
     @State() scores: score[]
     @State() points: points[]
     @Prop() message: {
      date: Date
      text: string
      type?: 'ERROR' | 'INFO'
    }
    
    componentWillLoad() {
       this.scores = mockScore;
       this.points = mockPoints;
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
           <span class="title sets">Sets</span>
           <span class="title game">Game</span>
           <span class="title point">Point</span>

           {this.points.map((point) => {
            return <div class="row">
            <span class={`setScore sets ${point.label ==='home' ? 'A' : 'B'} text-center`}  >{point.sets > 0 ? point.sets : '-'}</span>
            <span class={`setScore game  ${point.label ==='home' ? 'A' : 'B'} text-center`}>{point.game > 0 ? point.game : '-'}</span>
            <span class={`setScore point  ${point.label ==='home' ? 'A' : 'B'} text-center`}>{point.point > 0 ? point.point : '-'}</span>
            </div>;
          })}    
            <div class="line">
             <svg xmlns="http://www.w3.org/2000/svg" width="1" height="60">
                <path fill="#19455D" fill-rule="evenodd" d="M0 0h1v60H0V0z" opacity=".502"/>
              </svg>
            </div>    
            <pbp-message  message={this.message} class="textStyle "/> 
     </div>
 
      );
    }
  }
