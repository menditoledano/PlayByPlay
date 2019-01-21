import { Component, State, Prop } from '@stencil/core';
import { statistic } from './interfaces';

@Component({
  tag: 'pbp-statistics',
  styleUrl: 'statistics.css'
})
export class Statistics {
  @Prop() open: boolean;

  // not final
  @Prop() position: {
    top: number 
    left: number
  };
  @State() statistics: statistic[]

  componentWillLoad() {
 
  }

  render() {
    return (
        <div>  
         <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"class=" stat-background"></img>
         <span class="playersName text-center">R. Federer  -vs-  N. Djokovic</span>
         <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547314994/rectangle.png"class=" stat-rectangle "></img>
         <span class="stat-homeName text-center">R. Federer </span>
         <span class="stat-awayName text-center">N. Djokovic</span>
          <pbp-last-points-stat></pbp-last-points-stat>
          {/* <pbp-shot-placement-stat></pbp-shot-placement-stat> */}
        </div>   
    );
  }
}
