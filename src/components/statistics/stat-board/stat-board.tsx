import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-stat-board',
  styleUrl: 'stat-board.css'
})
export class lastPointsStat {
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
      
       <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547314994/rectangle.png"class=" graph-stat-rectangle "></img>
      <span class="stat-title title-lps text-center">Longest point Streak</span>
      <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548622737/graph-stat.png"class=" graph-stat "></img>
      <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle ace"></img>
      <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle doubleFault"></img>
      <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle breakPoint"></img>
      {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle distanceCovered"></img> */}
     
     
    
    </div>
    );
  }
}
