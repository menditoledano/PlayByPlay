import { Component, Prop } from "@stencil/core";
// import { StatisticsData } from './interfaces';

@Component({
  tag: "pbp-statistics",
  styleUrl: "statistics.css"
})
export class Statistics {
  @Prop() open: boolean;
  @Prop() statistics: any;

  // not final
  // @Prop() position: {
  //   top: number
  //   left: number
  // };

  componentWillLoad() {}

  render() {
    return (
      <div>
        <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1547197062/board-bg.png"
          class=" stat-background"
        />
        <span class="playersName text-center">Home -vs- Away</span>
        {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1547314994/rectangle.png"class=" stat-rectangle "></img> */}
        <span class="stat-homeName text-center"> Home </span>
        <span class="stat-awayName text-center"> Away </span>
        {/* <pbp-last-points-stat></pbp-last-points-stat> */}
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
    <pbp-last-points-stat></pbp-last-points-stat>
      {/* <img class="d-block w-100" src="..." alt="First slide"> */}
    </div>
    <div class="carousel-item">
    <pbp-shot-placement-stat></pbp-shot-placement-stat> 
     
    </div>
    {/* <div class="carousel-item">
    <span>CCC</span>
     
    </div> */}
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

       </div>
    );
  }
}
