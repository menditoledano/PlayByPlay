import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-last-points-stat',
  styleUrl: 'last-points-stat.css'
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
     <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547204069/statField.png"class="img-fluid stat-field"></img>
     <div class="stat-ball" style= {{ left: `110`, top: `400`}}></div>
    </div>
    );
  }
}
