import { Component, Prop } from '@stencil/core';
@Component({
  tag: 'pbp-last-points-stat',
  styleUrl: 'last-points-stat.css'
})
export class lastPointsStat {
  @Prop() open: boolean;

  render() {
    return (
    <div>  
      <span class="stat-homeName text-center"> Home </span>
        <span class="stat-awayName text-center"> Away </span>
       <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547314994/rectangle.png"class=" stat-rectangle "></img>
      <span class="stat-title text-center">Last point players tracking</span>
     <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547204069/statField.png"class="img-fluid stat-field"></img> 
     <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547375535/group.png"class="img-fluid stat-pathBall"></img>
    </div>
    );
  }
}
