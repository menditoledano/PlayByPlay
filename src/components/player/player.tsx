import { Component, Prop } from "@stencil/core";
@Component({
  tag: "pbp-player",
  styleUrl: "player.css"
})
export class Player {
  @Prop() playerType: any;
  @Prop() opacity: number;
  @Prop() postionNumber: number;
  @Prop() side: "home" | "away" = "home";
  @Prop() position: {
    currTop: number;
    currLeft: number;
  };
  @Prop() view: "bird" | "camera" | "side";

  render() {
    const transform =
      "player" +
      (this.view === "camera" ? " rotate" : "") +
      " " +
      this.postionNumber;

    return (
      <div
        id="player"
        class={transform}
        style={{

          top: `${this.position.currTop * 100}%`,
          left: `${this.position.currLeft * 100}%`,
          opacity: `${this.opacity}`
     }}
      >
        {this.side == "home" ? (
          <img
            src=" https://res.cloudinary.com/dezalma3v/image/upload/v1546788800/palyer-3-d.png"
            class="palyer3D"
          />
        ) : this.side == "away"?(
          <img
            src=" https://res.cloudinary.com/dezalma3v/image/upload/v1549739328/palyer-3-d-copy_3x.png"
            class="palyer3D"
          />
        ):""}
      </div>
    );
  }
}
