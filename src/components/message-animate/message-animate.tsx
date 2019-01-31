import { Component, Prop } from "@stencil/core";

// import "./scoreAnimate.js";


@Component({
  tag: "pbp-message-animate",
  styleUrl: "message-animate.css"
})
export class MessageAnimate {
  @Prop() messageText: string;
  // ComponentWillLoad(){
  //  this.messageText.text = "30 : 15";

  // }

  render() {
    // this.messageText.text = "30 : 15";
    return <div>
        <div class="leftBall"></div>
        <div class="rightBall"></div>
    <div class="scoreBG"></div>
    
  
   <span class="score">{this.messageText}</span>
    
    </div>
  //   <div id="animation_container" >
	// 	<canvas id="canvas" width="440" height="340" ></canvas>
	// 	<div id="dom_overlay_container" >
	// 	</div>
    
  // </div>;
  
  }
}
