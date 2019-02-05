import { Component, Prop } from "@stencil/core";
// import { StatisticsData } from './interfaces';

@Component({
  tag: "pbp-statistics",
  styleUrl: "statistics.css"
})
export class Statistics {
  @Prop() open: boolean;
  @Prop() statistics: any;
  @Prop() homePlayerName: any;
  @Prop() awayPlayerName: any;

  componentWillLoad() {}

  render() {
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"
          class=" stat-background"
        />
        <span class="playersName text-center">
          {this.homePlayerName + " -vs- " + this.awayPlayerName}{" "}
        </span>
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <ol class="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to="1" />
            <li data-target="#carouselExampleIndicators" data-slide-to="2" />
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <pbp-stat-board statisticsData={this.statistics}  homePlayerName={this.homePlayerName} awayPlayerName={this.awayPlayerName}/>
            </div>
            {/* <div class="carousel-item">
              <pbp-shot-placement-stat />
            </div> */}
            {/* <div class="carousel-item">
              <pbp-stat-board />
            </div> */}
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            {/* <span class="carousel-control-prev-icon" aria-hidden="true" /> */}
            {/* <span class="sr-only">Previous</span> */}
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            {/* <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="sr-only">Next</span> */}
          </a>
        </div>
      </div>
    );
  }
}
