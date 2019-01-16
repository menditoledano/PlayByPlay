import { Component, Prop } from "@stencil/core";
import { score, ScorePeriodValue } from "./interfaces";

// const mockScore :score = {
// CurrentScore:{
// Home: '2',
// Away: '4'},
//   ScorePeriod:[
//   {
//   ScorePeriodValue:1,
//   Home: "6",
//   Away: "3"
//   },
//   {
//   ScorePeriodValue:2,
//   Home: "4",
//   Away: "6"
//   },
//   {
//   ScorePeriodValue: 3,
//   Home: "4",
//   Away: "2"
//   },
//   {
//   ScorePeriodValue: 60,
//   Home: '30',
//   Away: '15'
//   }
//          ]
//   }

@Component({
  tag: "pbp-score-board",
  styleUrl: "score-board.css"
})
export class ScoreBoard {
  @Prop() playerA: string = "R. Federe";
  @Prop() playerB: string = "N. Djokovic";
  @Prop() score: score;
  @Prop() open: boolean;
  @Prop() jsonOpen: boolean;
  @Prop() message: {
    date: Date;
    text: string;
    type?: "ERROR" | "INFO";
  };

  // componentWillLoad() {
  //    this.score = mockScore;
  // }

  render() {
    return (
      <div class="container">
        <div class="row">
          <img
            src="https://res.cloudinary.com/dezalma3v/image/upload/v1546962118/scoreBoardBg.png"
            class="scoreBoardBG "
          />

          <span class="playerText">Player</span>
          <span class="playerName A">{this.playerA}</span>
          <span class="playerName B">{this.playerB}</span>
        </div>

        <span class="previusSets">Previus Sets</span>

        <span class="title sets">Sets</span>
        <span class="title game">Game</span>
        <span class="title point">Point</span>

        {this.score.ScorePeriod.map(scorePeriod => {
          return (
            <div class="row">
              <span class={`setScore set1 A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.FirstSetscore
                  ? parseInt(scorePeriod.Home)
                  : "-"}
              </span>
              <span class={`setScore set1  B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.FirstSetscore
                  ? parseInt(scorePeriod.Away)
                  : "-"}
              </span>

              <span class={`setScore set2 A text-center`}>
                {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? parseInt(scorePeriod.Home)
                  : "-"}
              </span>
              <span class={`setScore set2  B text-center`}>
                {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? parseInt(scorePeriod.Away)
                  : "-"}
              </span>

              <span class={`setScore set3 A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.ThirdSetScore
                  ? parseInt(scorePeriod.Home)
                  : "-"}
              </span>
              <span class={`setScore set3  B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.ThirdSetScore
                  ? parseInt(scorePeriod.Away)
                  : "-"}
              </span>

              <span class={`setScore set4 A text-center`}>
                {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? parseInt(scorePeriod.Home)
                  : "-"}
              </span>
              <span class={`setScore set4  B text-center`}>
                {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? parseInt(scorePeriod.Away)
                  : "-"}
              </span>

              <span class={`setScore sets A } text-center `}>
                {parseInt(this.score.CurrentScore.Home) > 0
                  ? this.score.CurrentScore.Home
                  : "-"}
              </span>
              <span class={`setScore sets B } text-center `}>
                {parseInt(this.score.CurrentScore.Away) > 0
                  ? this.score.CurrentScore.Away
                  : "-"}
              </span>

              <span class={`setScore game A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Home) >= 10
                    ? scorePeriod.Home
                    : parseInt(scorePeriod.Home) < 10 &&
                      parseInt(scorePeriod.Home) > 0
                    ? "0" + scorePeriod.Home
                    : "-"
                  : "-"}
              </span>
              <span class={`setScore game B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Away) >= 10
                    ? scorePeriod.Away
                    : parseInt(scorePeriod.Away) < 10 &&
                      parseInt(scorePeriod.Away) > 0
                    ? "0" + scorePeriod.Away
                    : "-"
                  : "-"}
              </span>

              <span class={`setScore point A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.FullTime
                  ? parseInt(scorePeriod.Home) >= 10
                    ? scorePeriod.Home
                    : parseInt(scorePeriod.Home) < 10 &&
                      parseInt(scorePeriod.Home) > 0
                    ? "0" + scorePeriod.Home
                    : "-"
                  : "-"}
              </span>
              <span class={`setScore point B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.FullTime
                  ? parseInt(scorePeriod.Away) >= 10
                    ? scorePeriod.Away
                    : parseInt(scorePeriod.Away) < 10 &&
                      parseInt(scorePeriod.Away) > 0
                    ? "0" + scorePeriod.Away
                    : "-"
                  : "-"}
              </span>
            </div>
          );
        })}
        <div class="line">
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="60">
            <path
              fill="#19455D"
              fill-rule="evenodd"
              d="M0 0h1v60H0V0z"
              opacity=".502"
            />
          </svg>
        </div>
        <pbp-message message={this.message} class="textStyle " />
      </div>
    );
  }
}
