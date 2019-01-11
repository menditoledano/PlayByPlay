import { Component, State, Prop } from '@stencil/core';
import { statistic } from './interfaces';

const mockStatistics: statistic[] = [{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 55,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 11,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 55,
  awayValue: 232,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 88,
  awayValue: 32,
},{
  type: 'progress',
  label: 'Covered distance',
  homeValue: 1,
  awayValue: 32,
}]

@Component({
  tag: 'pbp-statistics',
  styleUrl: 'statistics.css'
})
export class Statistics {
  @Prop() open: boolean
  @State() statistics: statistic[]

  componentWillLoad() {
    this.statistics = mockStatistics;
    //  console.log("!!!!!"+this.statistics +'MENDI!!!!!');
    
  }

  render() {
    return (
      <div>
     <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"class="img-fluid stat-background"></img>
     <span class="playersName text-center">R. Federer  -vs-  N. Djokovic</span>
     <span class="stat-title text-center">Last point players tracking</span>
     <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547204069/statField.png"class="img-fluid stat-field"></img>
   
     </div>
    );
  }
}
