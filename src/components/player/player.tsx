import { Component, Prop, Element } from "@stencil/core";
import KalmanFilter from 'kalmanjs';
@Component({
  tag: "pbp-player",
  styleUrl: "player.css"
})
export class Player {
  @Element() private playerElement: HTMLElement;
   kf = new KalmanFilter();

  @Prop() position: {
    prevTop: number;
    prevLeft: number;
    currTop: number;
    currLeft: number;
  };
  @Prop() view: "bird" | "camera" | "side";
  
  ComponentWillLoad(){
   
    
  }
  render() {
    this.playerElement.style.setProperty('--prevX', ''+this.position.prevTop * 100+'%');
    this.playerElement.style.setProperty('--prevY', ''+this.position.prevLeft * 100+'%');
    this.playerElement.style.setProperty('--currX', ''+this.position.currTop * 100+'%');
    this.playerElement.style.setProperty('--currY', ''+this.position.currLeft * 100+'%');
    const transform = "player" + (this.view === "camera" ? " rotate" : "");

    return (
      <div
      id = "player"
        class={transform}
        style= {{
          // transform: `translate(${this.position.top * 100}%,${this.position.left * 100}%)`
          top: `${this.position.currTop * 100}%`,
          left: `${this.position.currLeft * 100}%`

          // top: `${this.kf.filter(this.position.currTop) * 100}%`,
          // left: `${this.kf.filter(this.position.currLeft) * 100}%`
          
          // transform: rotate3d(`${this.position.top * 100}%`,`${this.position.left * 100}%`)
        }}
      >
        <img
          src=" https://res.cloudinary.com/dezalma3v/image/upload/v1546788800/palyer-3-d.png"
          class="palyer3D"
        />

        {/* <svg width="56" height="130" viewBox="0 0 31 68" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g style="mix-blend-mode:multiply">
          <ellipse cx="15" cy="60" rx="12" ry="5" fill="url(#paint0_radial)" fill-opacity="0.5"/>
          </g>
          <path d="M19.3683 53.3032C18.3218 57.279 12.6782 57.279 11.6317 53.3032L3.3974 22.0181C2.72982 19.4818 4.64289 17 7.26566 17L23.7344 17C26.3571 17 28.2702 19.4818 27.6026 22.0181L19.3683 53.3032Z" fill="white"/>
          <ellipse cx="15.8229" cy="9.48058" rx="6.13541" ry="6.21154" fill="white"/>
          <defs>
          <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 60) rotate(90) scale(5 12)">
          <stop stop-color="#3E3E3E"/>
          <stop offset="1" stop-color="#5F5F5F" stop-opacity="0"/>
          </radialGradient>
          </defs>
          </svg> */}
      </div>
    );
  }
}
