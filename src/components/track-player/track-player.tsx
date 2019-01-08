import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'pbp-track-player',
  styleUrl: 'track-player.css'
})
export class TrackPlayer {
  @Prop() position: {
    top: number
    left: number
  };
  @Prop() opacity: number;

  @Prop() view: 'bird' | 'camera' | 'side';
  render() {
    const transform = 'trackPlayer ' + (this.view === 'camera' ? ' rotate' : '');
    return (
      <div class={transform} style={{ top: `${this.position.top*100}%`, left: `${this.position.left*100}%`, opacity: this.opacity ? `${this.opacity}` : '1'  }}>
      <h1 class="display-1 align-middle ">.</h1>{/* <div class="trackPlayer " style={{ left: `${this.position.left*100}%`, top: `${this.position.top*100}%`, opacity: this.opacity ? `${this.opacity}` : '1' }} > */}
      </div>
    );
  }
}
