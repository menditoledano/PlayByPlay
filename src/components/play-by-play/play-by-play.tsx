import { Component, Prop, State } from "@stencil/core";
import KalmanFilter from "kalmanjs";

import { hubConnection } from "signalr-no-jquery";
import {
  Incident,
  Element,
  // Frame,
  Incidents,
  States,
  Elements,
  score,
  LiveScore,
  lsPosition,
  IncidentLabel
} from "./interfaces";
const livScoreMock: LiveScore = {
  Scoreboard: {
    Status: 2,
    CurrentPeriod: 2,
    Time: "-1",
    Results: [
      {
        Position: "1",
        Value: "1"
      },
      {
        Position: "2",
        Value: "0"
      }
    ]
  },
  Periods: [
    {
      Type: 1,
      IsFinished: true,
      IsConfirmed: true,
      Results: [
        {
          Position: "1",
          Value: "6"
        },
        {
          Position: "2",
          Value: "1"
        }
      ],

      Incidents: null
    },
    {
      Type: 2,
      IsFinished: false,
      IsConfirmed: false,
      Results: [
        {
          Position: "1",
          Value: "4"
        },
        {
          Position: "2",
          Value: "4"
        }
      ],
      Incidents: null
    },
    {
      Type: 60,
      IsFinished: false,
      IsConfirmed: false,
      Results: [
        {
          Position: "1",
          Value: "0"
        },
        {
          Position: "2",
          Value: "0"
        }
      ],
      Incidents: null
    }
  ],
  Statistics: [
    {
      Type: 20,
      Results: [
        {
          Position: "1",
          Value: "2"
        },
        {
          Position: "2",
          Value: "2"
        }
      ],
      Incidents: null
    },
    {
      Type: 21,
      Results: [
        {
          Position: "1",
          Value: "2"
        },
        {
          Position: "2",
          Value: "1"
        }
      ],
      Incidents: null
    }
  ],
  // "LivescoreExtraData":null
  LivescoreExtraData: [
    {
      Name: "1",
      Value: "2"
    }
  ]
};
@Component({
  tag: "play-by-play-widget",
  styleUrl: "play-by-play.css"
})
export class PlayByPlay {
  @Prop() fixtureid: string;
  @Prop() onloaderror: () => void;
  @Prop() ondisconnected: () => void;
  @Prop() onconnected: () => void;
  @State() score: score;
  @State() view: "bird" | "camera" | "side";
  @State() fieldView: "clay" | "hard" | "grass" = "hard";
  @State() connection;
  @State() hubProxy;
  @State() elements: Element[];
  @State() prevElements: any[];
  @State() reconnectAttemp: number = 0;
  @State() reconnectTimeout: number = 10;
  @State() jsonViewerOpen: boolean = false;
  @State() error: boolean = false;
  @State() showStatistics: boolean = true;
  @State() statisticsData: any = [];
  @State() message: {
    date: Date;
    text: string;
    type?: "ERROR" | "INFO";
  };
  @State() previousBalls: Element[];
  @State() playerTrack: Element[];
  @State() prevElement: Element[];
  @State() lVisionMode: boolean = true;
  @State() liveScoreMode: boolean = false;
  @State() liveScoreData: LiveScore;
  @State() kf: any;
  @State() showMessageBoard: boolean = false;
  @State() scoreToShow: string;
  @State() homePlayer: string;
  @State() awayPlayer: string;
  @State() delayForElements: boolean = true;
  @State() freezeElements: boolean = false;
  @State() lsPlayersPosition: number = 1;
  componentWillLoad() {
    this.kf = new KalmanFilter({ R: 0.001, Q: 2 });
    this.liveScoreData = livScoreMock;
    this.view = "camera";
    this.previousBalls = [];
    this.playerTrack = [];
    // this.updateLiveScoreData(this.liveScoreData);
    const url: string = "http://ICnat.lsports.eu:8100";
    this.connection = hubConnection(url);
    this.hubProxy = this.connection.createHubProxy("PlayByPlayHub");
    const that = this;

    this.hubProxy.on("fixtureDataReceived", function(fixtureData: any) {
      console.log("fixtureData");

      console.log(fixtureData);
      that.homePlayer = fixtureData.Body.Events[0].Fixture.Participants[0].Name;
      that.awayPlayer = fixtureData.Body.Events[0].Fixture.Participants[1].Name;
      console.log(that.homePlayer + that.awayPlayer);

      fixtureData.Body.Events[0].Fixture.FixtureExtraData[1].Value.length
        ? (that.fieldView = fixtureData.Body.Events[0].Fixture.FixtureExtraData[1].Value.toLowerCase())
        : "hard";
    });

    this.hubProxy.on("pbpFrameReceived", function(frame: any) {
      that.updateElements(frame.Elements);
      // console.log(frame);

      that.updateScore(frame.Score);

      frame.Incidents.length &&
        that.updateIncident(frame.Incidents[0], frame.Timestamp);

      frame.Incidents.length && console.log("frame.Incidents");
      frame.Incidents.length && console.log(frame.Incidents);

      that.updateStatisticsStatus(frame.Incidents);
    });

    this.hubProxy.on("livescoreReceived", function(liveScoreData: any) {
      console.log("liveScoreData");
      console.log(liveScoreData.Body.Events[0].Livescore);
      that.updateLiveScoreData(liveScoreData);
    });
    this.hubProxy.on("statisticsMessageReceived", function(statistics: any) {
      that.updateStatisticsData(statistics);
      // console.log("statisticsMessageReceived");

      // console.log(statistics);
    });

    // snapshot
    this.hubProxy.on("statisticsSnapshotReceived", function(statistics: any) {
      console.log("statisticsSnapshotReceived");
      console.log(statistics);

      that.updateStatisticsSnapShotData(statistics);
    });

    this.hubProxy.on("stateMessageReceived", function(frame: any) {
      that.updateStateMessage(frame);
      // console.log(frame);
    });

    this.start();
  }

  start = () => {
    const that = this;
    this.connection
      .start()
      .done(() => {
        this.message = { date: new Date(), text: "Connected", type: "INFO" };
        this.error = false;
        // this.onconnected();
        return this.hubProxy.invoke("Subscribe", this.fixtureid);
      })
      .fail(() => {
        this.error = true;

        if (this.reconnectAttemp < 3) {
          this.reconnectAttemp++;
          this.updateErrorMessage();
          that.message = { date: new Date(), text: "Connecting" };
          setTimeout(that.start, this.reconnectTimeout * 1000);
        } else {
        }
      });
  };

  updateErrorMessage = () => {
    const that = this;
    let counter = 10;
    const interval = setInterval(() => {
      counter--;
      that.message = {
        date: new Date(),
        text: `Connection Lost, Trying to reconnect in ${counter}`,
        type: "ERROR"
      };
      if (!counter) {
        that.message = { date: new Date(), text: "Connecting" };
        clearInterval(interval);
      }
    }, 1000);
  };

  onViewChange = e => {
    this.view = e.target.value;
  };

  updateIncident = (incident: Incident, timestamp: Date) => {
    if (this.error) {
      return;
    }
    incident = incident;
    timestamp = timestamp;

    this.message = {
      date: new Date(timestamp),
      text: `${Incidents[incident.Label]}`
    };
  };

  updateStateMessage = state => {
    console.log("state");

    console.log(state);

    if (state.State === States.StreamStopped) {
      this.error = false;
    } else if (state.State === States.StreamStarted) {
      if (this.delayForElements) {
        this.freezeElements = false;
        this.error = false;
        this.showStatistics = true;
        this.showMessageBoard = false;
      }
    } else if (state.State === States.Fade) {
      this.error = true;
    } else if (state.State === States.FallBack) {
      this.lVisionMode = false;
      this.liveScoreMode = true;
      console.log("transfer to livescore mode");
    } else if (state.State === States.Freeze) {
      this.freezeElements = true;
      // this.error = true;
    }

    this.message = {
      date: new Date(state.Timestamp),
      text: state.Description,
      type: state.State === States.StreamStopped ? "ERROR" : "INFO"
    };
  };

  updateStatisticsStatus = incident => {
    incident.map(currIncident => {
      if (currIncident.Label === IncidentLabel.TennisMatchFinished) {
        this.scoreToShow = "Match";
        console.log("Match");
        console.log(currIncident.Label);
        this.delayForElements = false;
        this.showMessageBoard = true;
        setTimeout(() => {
          this.showStatistics = true;
        }, 1000);
        setTimeout(() => {
          this.delayForElements = true;
        }, 7000);
      } else if (currIncident.Label === IncidentLabel.TennisSetFinished) {
        this.scoreToShow = "Set";
        console.log("set");
        console.log(currIncident.Label);
        this.delayForElements = false;
        this.showMessageBoard = true;
        setTimeout(() => {
          this.showStatistics = true;
        }, 1000);
        setTimeout(() => {
          this.delayForElements = true;
        }, 7000);
      } else if (currIncident.Label === IncidentLabel.TennisGameFinished) {
        this.scoreToShow = "Game";
        console.log("game");
        console.log(currIncident.Label);
        this.delayForElements = false;
        this.showMessageBoard = true;
        setTimeout(() => {
          this.showStatistics = true;
        }, 1000);
        setTimeout(() => {
          this.delayForElements = true;
        }, 7000);
      } else if (currIncident.Label === IncidentLabel.TennisPointFinished) {
        this.scoreToShow = "Point";
        console.log("TennisPointFinished");
        console.log(currIncident.Label);
        this.delayForElements = false;
        this.showMessageBoard = true;
        setTimeout(() => {
          this.showStatistics = true;
        }, 1300);
        setTimeout(() => {
          this.delayForElements = true;
        }, 7000);
      }
    });
  };
  updateStatisticsSnapShotData = statistics => {
    // this.statisticsData.push(statistics);
    this.statisticsData = statistics;
    // console.log(this.statisticsData);
  };
  updateStatisticsData = statistic => {
    this.statisticsData &&
   typeof this.statisticsData.find(
      lookForStat => lookForStat.StatisticType === statistic.StatisticType
    ) == "undefined"
      ? this.statisticsData.push(statistic)
      : 
      this.statisticsData.map(currStat => {
          if (currStat.StatisticType === statistic.StatisticType) {
            currStat.ParticipantStatisticMetadata.map(currSnapMetadata => {
              statistic.ParticipantStatisticMetadata.map(currMsgMetadata => {
                currSnapMetadata.ParticipantStat ===
                currMsgMetadata.ParticipantStat
                  ? (currSnapMetadata.StatPerPeriod =
                      currMsgMetadata.StatPerPeriod)
                  : "";
                  ;
              });
            });
          }
        });
    // this.statisticsData = statistic;
    // console.log(this.statisticsData);
  };
  updateElements = elements => {
    this.lVisionMode = true;
    this.liveScoreMode = false;

    this.elements && this.delayForElements
      ? ((this.showMessageBoard = false), (this.showStatistics = true))
      : "";
    const previousBall =
      this.elements && this.elements.find(el => el.Type === Elements.Ball);
    const playerSingelTrack =
      this.elements && this.elements.find(el => el.Type === Elements.Player);
    // const singleElement = this.elements && this.elements;

    if (!!previousBall) {
      this.previousBalls.push(previousBall);
      if (this.previousBalls.length > 2) {
        this.previousBalls.shift();
      }
    }

    if (!!playerSingelTrack) {
      this.playerTrack.push(playerSingelTrack);
      if (this.playerTrack.length > 2) {
        this.playerTrack.shift();
      }
    }
    if (elements.length > 1) {
      this.prevElement = elements;
      // console.log(this.prevElement);
    }
    // if (this.freezeElements) {
    //   this.elements = this.prevElement;
    //   console.log(this.prevElement);
    // } else
    !this.freezeElements
      ? (this.elements = elements)
      : (this.elements = this.prevElement);
  };

  updateScore = score => {
    this.score = score;
  };

  updateLiveScoreData = liveScoreData => {
    //update setsScore
    liveScoreData.Scoreboard.Results.map(currPoint => {
      currPoint.Position == lsPosition.homePlayer
        ? (this.score.CurrentScore.Home = currPoint.Value)
        : (this.score.CurrentScore.Away = currPoint.Value);
    });
  };
  render() {
    return (
      <div class="">
        {this.lVisionMode ? (
          <div class={`wrapper ${this.fieldView}`}>
            <img
              class="betaIcon"
              src="https://res.cloudinary.com/dezalma3v/image/upload/v1549369560/Beta_icon-18.png"
            />
            {/* {this.score && (
              <pbp-score-board
                score={this.score}
                message={this.message}
                // class={"d-none"}
              />
            )} */}
            {/* <pbp-angle-control jsonOpen={this.jsonViewerOpen}  view={this.view} onViewChange={this.onViewChange} class="d-none"/> */}
            <br />
            <br />
            <br />
            <br />
            {this.showMessageBoard && (
              <pbp-message-animate
                class="msgAnimate"
                messageText={this.scoreToShow}
              />
            )}

            <pbp-field view={this.view}>
              {!this.freezeElements && this.elements
                ? this.elements.map(element => {
                    return element.Type === Elements.Player ? (
                      <pbp-player
                        view={this.view}
                        opacity={1}
                        position={{
                          currTop: element.Location.X,
                          currLeft: element.Location.Y
                        }}
                      />
                    ) : element.Type === Elements.Ball ? (
                      <pbp-ball
                        opacity={1}
                        position={{
                          top: element.Location.X,
                          left: element.Location.Y
                        }}
                      />
                    ) : (
                      "nothing"
                    );
                  })
                : //show freeze mode
                  this.prevElement &&
                  this.prevElement.map(element => {
                    return element.Type === Elements.Player ? (
                      <pbp-player
                        //  opacity={0.1}
                        opacity={0.5}
                        view={this.view}
                        position={{
                          currTop: element.Location.X,
                          currLeft: element.Location.Y
                        }}
                        // opacity={1}
                      />
                    ) : element.Type === Elements.Ball ? (
                      <pbp-ball
                        opacity={0.5}
                        position={{
                          top: element.Location.X,
                          left: element.Location.Y
                        }}
                      />
                    ) : (
                      "nothing"
                    );
                  })}
              {this.elements &&
                !!this.elements.filter(el => el.Type === Elements.Ball)
                  .length &&
                this.previousBalls &&
                this.previousBalls.map((ball, i) => (
                  <pbp-ball
                    opacity={i === 0 ? 0.1 : 0.3}
                    position={{
                      top: ball.Location.X,
                      left: ball.Location.Y
                    }}
                  />
                ))}
              {/* {
                              this.elements &&
                              !!this.elements.filter(el => el.Type === Elements.Player).length &&
                              this.playerTrack &&
                              this.playerTrack.map((player,i) => <pbp-track-player view={this.view} opacity={i === 0 ? .1 : .3 } position={{ top: player.Location.X, left: player.Location.Y }} />)
                            } */}
            </pbp-field>
            {this.showStatistics && (
              <pbp-statistics
                homePlayerName={this.homePlayer}
                awayPlayerName={this.awayPlayer}
                statistics={this.statisticsData}
              />
            )}
            {this.error && (
              <span class={`error-overlay ${this.jsonViewerOpen && "open"}`}>
                <div class="errorMessage">
                  <span class="errorText">
                    {" "}
                    {this.message && this.message.text}
                  </span>
                </div>
              </span>
            )}
            {/* {!this.showStatistics && this.freezeElements && (
              <span class={`error-overlay ${this.jsonViewerOpen && "open"}`} />
            )} */}
          </div>
        ) : //show in livscoreMode
        this.liveScoreMode ? (
          <div class={`wrapper ${this.fieldView}`}>
            <img
              class="betaIcon"
              src="https://res.cloudinary.com/dezalma3v/image/upload/v1549369560/Beta_icon-18.png"
            />
            {/* {this.score && (
              <pbp-score-board
                score={this.score}
                message={this.message}
                class={""}
              />
            )} */}

            {/* <pbp-angle-control jsonOpen={this.jsonViewerOpen}  view={this.view} onViewChange={this.onViewChange} class="d-none"/> */}
            <br />
            <br />
            <br />
            <br />
            <pbp-field jsonOpen={this.jsonViewerOpen} view={this.view}>
              <div id="animation_container" class="animation_container">
                <canvas id="canvas" width="393" height="323" class="canvas" />
                <div id="dom_overlay_container" class="dom_overlay_container" />
              </div>
              <pbp-player
                view={this.view}
                position={{
                  currTop: this.lsPlayersPosition == 1 ? 0.12 : 0.8,
                  currLeft: -0.04
                }}
              />
              <pbp-player
                view={this.view}
                position={{
                  currTop: this.lsPlayersPosition == 1 ? 0.75 : 0.25,
                  currLeft: 1
                }}
              />

              <pbp-ball
                animationNumber={this.lsPlayersPosition}
                position={{
                  top: 0.86,
                  left: -0.085
                }}
              />
              <div class={`ballLanding${this.lsPlayersPosition}`} />
            </pbp-field>

            {this.showStatistics && (
              <pbp-statistics
                statistics={this.statisticsData}
                open={this.jsonViewerOpen}
              />
            )}
            {this.error && <span class={`error-overlay`} />}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
