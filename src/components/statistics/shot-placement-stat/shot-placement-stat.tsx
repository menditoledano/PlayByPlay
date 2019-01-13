import { Component, Prop } from '@stencil/core';
// import { Button } from 'reactstrap';



@Component({
  tag: 'pbp-shot-placement-stat',
  styleUrl: 'shot-placement-stat.css'
})
export class shotPlacementStat {
  @Prop() open: boolean;

  // not final
  @Prop() position: {
    top: number 
    left: number
  };

  componentWillLoad() {    
  }

  render() {
    return (
    <div>  
      <span class="stat-title-shot-placement text-center">Match Shot Placement</span>
      <img class="img-fluid shot-placement-stat-field-home" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414316/match-shot-field-stat.png"></img>
      <img class="img-fluid small-line home" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414345/small-line-stat.png"></img>
      <img class="img-fluid long-line home" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414351/long-line-stat.png"></img>
      <span class="percentage start home">10%</span>
      <span class="percentage middle home">20%</span>
      <span class="percentage net home">30%</span>

      <img class="img-fluid shot-placement-stat-field-away" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414316/match-shot-field-stat.png"></img>
      <img class="img-fluid small-line away" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414345/small-line-stat.png"></img>
      <img class="img-fluid long-line away" src="https://res.cloudinary.com/dezalma3v/image/upload/v1547414351/long-line-stat.png"></img>
      <span class="percentage start away">10%</span>
      <span class="percentage middle away">20%</span>
      <span class="percentage net away">30%</span>
    </div>
    );
  }
}
