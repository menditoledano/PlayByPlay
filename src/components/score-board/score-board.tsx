import { Component, Prop } from "@stencil/core";
import { score, ScorePeriodValue } from "./interfaces";

@Component({
  tag: "pbp-score-board",
  styleUrl: "score-board.css"
})
export class ScoreBoard {
  @Prop() playerA: string = "Home";
  @Prop() playerB: string = "Away";
  @Prop() score: score;
  @Prop() liveScore: score;
  @Prop() open: boolean;
  @Prop() jsonOpen: boolean;
  @Prop() message: {
    date: Date;
    text: string;
    type?: "ERROR" | "INFO";
  };
  render() {
    return (
      
      <div class="">
        <div class="">
          <img
            src="https://res.cloudinary.com/dezalma3v/image/upload/v1546962118/scoreBoardBg.png"
            class="scoreBoardBG "
          />

          <span class="title playerText">Player</span>
          <span class="playerText playerName A">{this.playerA}</span>
          <span class="playerText playerName B">{this.playerB}</span>
        </div>

}
        {/* <span class="title previusSets">Previus Sets</span> */}

        <span class="title sets ">Sets</span>
        {/* <span class="title game ">Game</span> */}
        <span class="title point">Points</span>
        <span class="title set1">1st</span>
        <span class="title set2">2st</span>
        <span class="title set3">3st</span>
        <span class="title set4">4st</span>
        <span class="title set5">5st</span>

        {this.score.ScorePeriod.map(scorePeriod => {
          return (
            <div class="row">
              <span class={`setScore set1 A text-center`}>
                {/* {scorePeriod.ScorePeriodValue == 1 ? scorePeriod.Home : "-"} */}
                {this.score.ScorePeriod[0]&&this.score.ScorePeriod[0].ScorePeriodValue ===
                ScorePeriodValue.FirstSetscore
                  ? this.score.ScorePeriod[0].Home
                  : "-"}
              </span>
              <span class={`setScore set1  B text-center`}>
                {/* {scorePeriod.ScorePeriodValue == 1 ? scorePeriod.Away : "-"} */}
                {this.score.ScorePeriod[0]&&this.score.ScorePeriod[0].ScorePeriodValue ===
                ScorePeriodValue.FirstSetscore
                  ? this.score.ScorePeriod[0].Away
                  : "-"}
              </span>

              <span class={`setScore set2 A text-center`}>
                {/* {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? scorePeriod.Home
                  : "-"} */}
                {this.score.ScorePeriod[1]&&this.score.ScorePeriod[1].ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? this.score.ScorePeriod[1].Home
                  : "-"}
              </span>
              <span class={`setScore set2  B text-center`}>
                {/* {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? scorePeriod.Away
                  : "-"} */}
                {this.score.ScorePeriod[1]&&this.score.ScorePeriod[1].ScorePeriodValue ===
                ScorePeriodValue.SecondSetScore
                  ? this.score.ScorePeriod[1].Away
                  : "-"}
              </span>

              <span class={`setScore set3 A text-center`}>
                {/* {scorePeriod.ScorePeriodValue === ScorePeriodValue.ThirdSetScore
                  ? scorePeriod.Home
                  : "-"} */}
                {this.score.ScorePeriod[2]&&this.score.ScorePeriod[2].ScorePeriodValue ===
                ScorePeriodValue.ThirdSetScore
                  ? this.score.ScorePeriod[2].Home
                  : "-"}
              </span>
              <span class={`setScore set3  B text-center`}>
                {/* {scorePeriod.ScorePeriodValue === ScorePeriodValue.ThirdSetScore
                  ? scorePeriod.Away
                  : "-"} */}
                {this.score.ScorePeriod[2]&&this.score.ScorePeriod[2].ScorePeriodValue ===
                ScorePeriodValue.ThirdSetScore
                  ? this.score.ScorePeriod[2].Away
                  : "-"}
              </span>

              <span class={`setScore set4 A text-center`}>
                {/* {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? scorePeriod.Home
                  : "-"} */}
                {this.score.ScorePeriod[3]&&this.score.ScorePeriod[3].ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? this.score.ScorePeriod[3].Home
                  : "-"}
              </span>
              <span class={`setScore set4  B text-center`}>
                {/* {scorePeriod.ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? scorePeriod.Away
                  : "-"} */}
                {this.score.ScorePeriod[3]&&this.score.ScorePeriod[3].ScorePeriodValue ===
                ScorePeriodValue.FourthSetScore
                  ? this.score.ScorePeriod[3].Away
                  : "-"}
              </span>
              <span class={`setScore set5 A text-center`}>
               
                {this.score.ScorePeriod[4]&&this.score.ScorePeriod[4].ScorePeriodValue ===
                ScorePeriodValue.FifthSetScore
                  ? this.score.ScorePeriod[4].Home
                  : "-"}
              </span>
              <span class={`setScore set5  B text-center`}>
              
                {this.score.ScorePeriod[4]&&this.score.ScorePeriod[4].ScorePeriodValue ===
                ScorePeriodValue.FifthSetScore
                  ? this.score.ScorePeriod[4].Away
                  : "-"}
              </span>

              <span class={`setScore sets A } text-center `}>
                {parseInt(this.score.CurrentScore.Home) > 0
                  ? this.score.CurrentScore.Home
                  : "0"}
              </span>
              <span class={`setScore sets B } text-center `}>
                {parseInt(this.score.CurrentScore.Away) > 0
                  ? this.score.CurrentScore.Away
                  : "0"}
              </span>

              {/* <span class={`setScore game A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Home) >= 10
                    ? scorePeriod.Home
                    : parseInt(scorePeriod.Home) < 10 &&
                      parseInt(scorePeriod.Home) > 0
                    ? "0" + scorePeriod.Home
                    : "0"
                  : "0"}
              </span>
              <span class={`setScore game B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Away) >= 10
                    ? scorePeriod.Away
                    : parseInt(scorePeriod.Away) < 10 &&
                      parseInt(scorePeriod.Away) > 0
                    ? "0" + scorePeriod.Away
                    : "0"
                  : "0"}
              </span> */}

              <span class={`setScore point A text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Home) >= 10
                    ? scorePeriod.Home
                    : parseInt(scorePeriod.Home) < 10 &&
                      parseInt(scorePeriod.Home) > 0
                    ? "0" + scorePeriod.Home
                    : "0"
                  : "0"}
              </span>
              <span class={`setScore point B text-center`}>
                {scorePeriod.ScorePeriodValue === ScorePeriodValue.GameScore
                  ? parseInt(scorePeriod.Away) >= 10
                    ? scorePeriod.Away
                    : parseInt(scorePeriod.Away) < 10 &&
                      parseInt(scorePeriod.Away) > 0
                    ? "0" + scorePeriod.Away
                    : "0"
                  : "0"}
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
        <pbp-message message={this.message} class="" />
      </div>
    );
  }
}
