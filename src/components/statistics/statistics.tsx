import { Component, Prop } from "@stencil/core";
@Component({
  tag: "pbp-statistics",
  styleUrl: "statistics.css"
})
export class Statistics {
  @Prop() open: boolean;
  @Prop() statistics: any;
  @Prop() homePlayerName: any;
  @Prop() awayPlayerName: any;

  render() {
    return (
      <div class="statistics">
        <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"
          class=" stat-background"
        />
        <span class="playersName title text-center">
          <b>{this.homePlayerName}</b>{" "}
          <span style={{ "font-weight": "10" }}>-vs- </span>{" "}
          <b>{this.awayPlayerName}</b>
        </span>
        <pbp-stat-board
          statisticsData={this.statistics}
          homePlayerName={this.homePlayerName}
          awayPlayerName={this.awayPlayerName}
        />
      </div>
    );
  }
}
