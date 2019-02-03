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
  @State() doubleFaultHome: any;
  @State() doubleFaultAway: any;

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
                ? (this.doubleFaultHome = data.StatPerPeriod[0].StatValue)
                : data.ParticipantStat === ParticipantStat.AwayPlayer1
                ? (this.doubleFaultAway = data.StatPerPeriod[0].StatValue)
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

        <div class="doubleFault">
          <span class="stat-title title-doubleFault text-center">
            {`Double Fault` + ``}
          </span>
          <span class="stat-title  curr-points-doubleFault text-center">
            {/* (Last Game) */}
          </span>
          <img
            src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
            class="small-stat-rectangle doubleFault"
          />
          <span class="doubleFaultHome">
            {this.doubleFaultHome && this.doubleFaultHome + "\n" + " "}
            <span class="pointTitleA">m</span>
          </span>
          <span class="doubleFaultIcon" />
          <span class="doubleFaultAway">
            {this.doubleFaultAway && this.doubleFaultAway + "\n" + " "}
            <span class="pointTitleA">m</span>
          </span>
        </div>

        <img
          src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"
          class=" d-none d-sm-block small-stat-rectangle breakPoint"
        />
        {/* <img src="https://res.cloudinary.com/dezalma3v/image/upload/v1548698782/small-rectangle-stat.png"class=" small-stat-rectangle distanceCovered"></img> */}
      </div>
    );
  }
}
