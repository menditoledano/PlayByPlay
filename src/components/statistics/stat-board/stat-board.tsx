import { Component, Prop, State } from "@stencil/core";
import { ParticipantStat, StatisticType } from "../interfaces";
@Component({
  tag: "pbp-stat-board",
  styleUrl: "stat-board.css"
})
export class statBoard {
  @Prop() homePlayerName: any;
  @Prop() awayPlayerName: any;
  @Prop() statisticsData: any;
  @State() aceHome: any;
  @State() aceAway: any;
  @State() doublFaultHome: any;
  @State() doublFaultAway: any;
  @State() distanceCoveredHome: any;
  @State() distanceCoveredAway: any;
  @State() breakPointWonHome: any;
  @State() breakPointWonAway: any;
  @State() Win1stServeHome: any;
  @State() Win1stServeAway: any;

  componentWillLoad() {
    {
      this.statisticsData.map(currStat => {
        currStat.StatisticType == StatisticType.Ace
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.aceHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.aceAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : currStat.StatisticType == StatisticType.DistanceCovered
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.distanceCoveredHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.distanceCoveredAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : currStat.StatisticType == StatisticType.DoubleFaults
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.doublFaultHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.doublFaultAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : currStat.StatisticType == StatisticType.BreakPointConversions
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.breakPointWonHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.breakPointWonAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : currStat.StatisticType == StatisticType.Win1stServe
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.Win1stServeHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.Win1stServeAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : "";
      });
    }
  }

  render() {
    return (
      <div>
        {console.log("a = " + this.aceAway + " b = " + this.aceAway + "  ")}

        {/* carousel */}
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
              <div class="ace">
                <span class="stat-title title-ace text-center">{`Ace`}</span>
                <span class="stat-title curr-points-ace text-center" />
                <img
                  src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
                  class="small-stat-rectangle ace"
                />

                <div class="aceDataHome">
                  <span class=" point">
                    {" "}
                    {this.aceHome && +this.aceHome + "\n" + " "}
                  </span>
                </div>
                <div class="aceDataAway">
                  <span class=" point">
                    {this.aceAway && +this.aceAway + "\n" + " "}
                  </span>
                </div>
                <span class="playerName second home">
                  {this.homePlayerName}
                </span>
                <span class="playerName second away">
                  {this.awayPlayerName}
                </span>
              </div>

              <div class="distanceCovered">
                <span class="stat-title title-distanceCovered text-center">
                  {`Distance Covered` + ``}
                </span>
                <span class="stat-title  curr-points-distanceCovered text-center" />
                <img
                  src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
                  class="small-stat-rectangle distanceCovered"
                />
                <span class="distanceCoveredHome">
                  {this.distanceCoveredHome &&
                    Math.floor(this.distanceCoveredHome) + "\n" + " "}
                  <span class="pointTitleA">m</span>
                </span>
                <span class="distanceCoveredIcon" />
                <span class="distanceCoveredAway">
                  {this.distanceCoveredAway &&
                    Math.floor(this.distanceCoveredAway) + "\n" + " "}
                  <span class="pointTitleA">m</span>
                </span>
                <span class="playerName first home">{this.homePlayerName}</span>
                <span class="playerName first away">{this.awayPlayerName}</span>
              </div>
            </div>
            <div class="carousel-item">
              <div class="doubleFault">
                <span class="stat-title title-doubleFault text-center">{`Double Fault`}</span>
                <span class="stat-title curr-points-ace text-center">
                </span>
                <img
                  src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
                  class="small-stat-rectangle ace"
                />
                <div class="aceDataHome">
                  <span class=" point">
                    {" "}
                    {this.doublFaultHome && +this.doublFaultHome + "\n" + " "}
                  </span>
                  {/* <span class="pointTitle">points</span> */}
                </div>
                <div class="aceDataAway">
                  <span class=" point">
                    {this.doublFaultAway && +this.doublFaultAway + "\n" + " "}
                  </span>
                </div>
                <span class="playerName second home">
                  {this.homePlayerName}
                </span>
                <span class="playerName second away">
                  {this.awayPlayerName}
                </span>
              </div>

              <div class="breakPointWon">
                <span class="stat-title title-breakPointWon text-center">
                  {`Break Point Won %` + ``}
                </span>
                <span class="stat-title  curr-points-distanceCovered text-center">
                </span>
                <img
                  src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
                  class="small-stat-rectangle distanceCovered"
                />
                <svg viewBox="0 0 36 36" class="circular-home-cover">
                  <path
                    class="circle-cover"
                    stroke-dasharray={`100, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <svg viewBox="0 0 36 36" class="circular-chart home">
                  <path
                    class="circle"
                    stroke-dasharray={`${this.breakPointWonHome}, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <span class="breakPointWon points home">
                  {this.breakPointWonHome}%
                </span>

                <svg viewBox="0 0 36 36" class="circular-away-cover">
                  <path
                    class="circle-cover"
                    stroke-dasharray={`100, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <svg viewBox="0 0 36 36" class="circular-chart away">
                  <path
                    class="circle"
                    stroke-dasharray={`${this.breakPointWonAway}, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span class="breakPointWon points away">
                  {this.breakPointWonAway}%
                </span>
                {/* <span class="Attempts away">Attempts</span> */}
                <span class="playerName first home">{this.homePlayerName}</span>
                <span class="playerName first away">{this.awayPlayerName}</span>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
                class="small-stat-rectangle Win1stServe"
              />
              <div class="Win1stServe">
                <span class="stat-title title-Win1stServe text-center">
                  {`Win 1st Serve ` + ``}
                </span>
                <span class="stat-title  curr-points-distanceCovered text-center">
                </span>

                <svg viewBox="0 0 36 36" class="circular-home-cover">
                  <path
                    class="circle-cover"
                    stroke-dasharray={`100, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <svg viewBox="0 0 36 36" class="circular-chart home">
                  <path
                    class="circle"
                    stroke-dasharray={`${this.Win1stServeHome}, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>

                <span class="breakPointWon points home">
                  {this.Win1stServeHome}%
                </span>
                <svg viewBox="0 0 36 36" class="circular-away-cover">
                  <path
                    class="circle-cover"
                    stroke-dasharray={`100, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <svg viewBox="0 0 36 36" class="circular-chart away">
                  <path
                    class="circle"
                    stroke-dasharray={`${this.Win1stServeAway}, 100`}
                    d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span class="breakPointWon points away">
                  {this.Win1stServeAway}%
                </span>
                <span class="playerName Win1stServe home">{this.homePlayerName}</span>
                <span class="playerName Win1stServe away">{this.awayPlayerName}</span>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true" />
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true" />
            <span class="sr-only">Next</span>
          </a>
        </div>
        {/* end of carousel */}
      </div>
    );
  }
}
