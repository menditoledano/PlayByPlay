import { Component, Prop } from "@stencil/core";
@Component({
  tag: "pbp-message-animate",
  styleUrl: "message-animate.css"
})
export class MessageAnimate {
  @Prop() messageText: string;

  render() {
    return (
      <div>
        <div class="leftBall" />
        <div class="rightBall" />
        <div class="scoreBG" />
        <span class="score">{this.messageText}</span>
      </div>
    );
  }
}
