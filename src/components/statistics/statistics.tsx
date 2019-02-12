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
      <div class="statistics">

        <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"
          class=" stat-background"
        />
        <span class="playersName title text-center">
        
          <b>{this.homePlayerName}</b>  <span   style={{"font-weight":"10"}}>-vs- </span> <b>{this.awayPlayerName}</b>
        </span>
        {/* <div
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
            <div class="carousel-item active"> */}
              <pbp-stat-board statisticsData={this.statistics}  homePlayerName={this.homePlayerName} awayPlayerName={this.awayPlayerName}/>
            {/* </div>
       
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
          
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
       
          </a>
        </div> */}
      </div>
    );
  }
}
