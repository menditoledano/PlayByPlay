import { Component, Prop, State } from "@stencil/core";
import { ParticipantStat } from "../interfaces";
// import { Statistics } from '../statistics';

@Component({
  tag: "pbp-stat-board",
  styleUrl: "stat-board.css"
})
export class statBoard {
  @Prop() statisticsData: any;
  @State() aceHome: any;
  @State() aceAway: any;
  @State() distanceCoveredHome: any;
  @State() distanceCoveredAway: any;

  componentWillLoad() {
    {
      this.statisticsData.map(currStat => {
        currStat.StatisticType == 20
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.aceHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.aceAway = data.StatPerPeriod[0].StatValue)
                : "";
              console.log(data.StatPerPeriod[0].StatValue);
            })
          : currStat.StatisticType == 1
          ? currStat.ParticipantStatisticMetadata.map(data => {
              data.ParticipantStat === ParticipantStat.HomePlayer1
                ? (this.distanceCoveredHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.distanceCoveredAway = data.StatPerPeriod[0].StatValue)
                : "";
            })
          : "";
      });
    }
  }

  render() {
    return (
      <div>
        {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" graph-stat-rectangle "></img> */}
        {/* <span class="stat-title title-lps text-center">
          Longest point Streak
        </span> */}
        {console.log("a = " + this.aceAway + " b = " + this.aceAway + "  ")}
        {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" graph-stat "></img> */}
        <div class="ace">
          <span class="stat-title title-ace text-center">{`Ace`}</span>
          <span class="stat-title curr-points-ace text-center">
            {/* (Last Game) */}
          </span>
          <img
            src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
            class="small-stat-rectangle ace"
          />

          <div class="aceDataHome">
            <span class=" point">
              {" "}
              {this.aceHome && +this.aceHome + "\n" + " "}
            </span>
            <span class="pointTitle">points</span>
          </div>
          <div class="aceDataAway">
            <span class=" point">
              {this.aceAway && +this.aceAway + "\n" + " "}
            </span>
            <span class="pointTitle">points</span>
          </div>
        </div>

        <div class="distanceCovered">
          <span class="stat-title title-distanceCovered text-center">
            {`Distance Covered` + ``}
          </span>
          <span class="stat-title  curr-points-distanceCovered text-center">
            {/* (Last Game) */}
          </span>
          <img
            src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
            class="small-stat-rectangle distanceCovered"
          />
          <span class="distanceCoveredHome">
            {this.distanceCoveredHome && Math.floor(this.distanceCoveredHome) + "\n" + " "}
            <span class="pointTitleA">m</span>
          </span>
          <span class="distanceCoveredIcon" />
          <span class="distanceCoveredAway">
            {this.distanceCoveredAway && Math.floor(this.distanceCoveredAway )+ "\n" + " "}
            <span class="pointTitleA">m</span>
          </span>
        </div>

        {/* <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
          class=" d-none d-sm-block small-stat-rectangle breakPoint"
        /> */}
        {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle distanceCovered"></img> */}
      </div>
    );
  }
}
