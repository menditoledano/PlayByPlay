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
    </div>
    );
  }
}
