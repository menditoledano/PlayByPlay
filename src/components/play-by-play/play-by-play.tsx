import { Component, Prop, State } from "@stencil/core";
import KalmanFilter from "kalmanjs";
import { hubConnection } from "signalr-no-jquery";
import {
  Incident,
  Element,
  Frame,
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
  @State() reconnectAttemp: number = 0;
  @State() reconnectTimeout: number = 10;
  @State() jsonViewerOpen: boolean = false;
  @State() error: boolean = false;
  @State() showStatistics: boolean = false;
  @State() statisticsData: any;
  @State() message: {
    date: Date;
    text: string;
    type?: "ERROR" | "INFO";
  };
  @State() previousBalls: Element[];
  @State() playerTrack: Element[];

  @State() lVisionMode: boolean = true;
  @State() liveScoreMode: boolean = false;
  @State() liveScoreData: LiveScore;
  @State() kf: any;

  componentWillLoad() {
    this.kf = new KalmanFilter({ R: 0.001, Q: 2 });
    // console.log(this.kf.filter(1));
    // console.log(this.kf.filter(2));
    // console.log(this.kf.filter(3));
    // console.log(this.kf.filter(4));
    // console.log(this.kf.filter(2));

    this.liveScoreData = livScoreMock;
    this.view = "camera";
    this.previousBalls = [];
    this.playerTrack = [];
    // this.updateLiveScoreData(this.liveScoreData);
    const url: string = "http://ICnat.lsports.eu:8100";
    this.connection = hubConnection(url);
    this.hubProxy = this.connection.createHubProxy("playByPlayHub");
    const that = this;

    this.hubProxy.on("pbpFrameReceived", function(frame: Frame) {
      that.updateElements(frame.Elements);
      // console.log(frame);

      that.updateScore(frame.Score);

      frame.Incidents.length &&
        that.updateIncident(frame.Incidents[0], frame.Timestamp);
      // console.log(frame.Incidents);

      that.updateStatisticsStatus(frame.Incidents);
    });

    this.hubProxy.on("livescoreReceived", function(liveScoreData: LiveScore) {
      console.log(liveScoreData);
      that.updateLiveScoreData(liveScoreData);

      //TODO frame
    });

    //Delta of statistics
    // this.hubProxy.on("updateFixtureStatistic", function(frame: Frame) {
    //   //tbd sould be fixtureStatistics model
    //   // console.log(frame);
    //   // that.showStatistics = true;
    //   // console.log(frame);
    //   frame = frame;
    // });

    this.hubProxy.on("statisticsMessageReceived", function(statistics: any) {
      statistics = statistics;
      console.log("statisticsMessageReceived");

      console.log(statistics);
    });

    // snapshot
    this.hubProxy.on("statisticsSnapshotReceived", function(statistics: any) {
      // console.log('statisticsSnapshotReceived');
      // console.log(statistics);

      that.updateStatisticsData(statistics);
    });

    this.hubProxy.on("stateMessageReceived", function(frame: Frame) {
      // console.log('stateMessageReceived');
      // console.log(frame);

      that.updateStateMessage(frame);
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
        // this.ondisconnected();
        if (this.reconnectAttemp < 3) {
          this.reconnectAttemp++;
          this.updateErrorMessage();
          that.message = { date: new Date(), text: "Connecting" };
          setTimeout(that.start, this.reconnectTimeout * 1000);
        } else {
          // this.onloaderror();
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
    // this.updateStatisticsStatus(incident);
    if (this.error) {
      return;
    }
    this.message = {
      date: new Date(timestamp),
      text: `${Incidents[incident.Label]} \n by ${incident.Metadata.Performer}`
    };
  };

  updateStateMessage = frame => {
    if (frame.State === States.StreamStopped) {
      this.error = false;
      // this.showStatistics = false;
    } else if (frame.State === States.StreamStarted) {
      this.error = false;
      // this.showStatistics = false;
    } else if (frame.State === States.Fade) {
      // this.showStatistics = false;
      this.error = false;
    }
    this.message = {
      date: new Date(frame.Timestamp),
      text: frame.Description,
      type: frame.State === States.StreamStopped ? "ERROR" : "INFO"
    };
  };

  updateStatisticsStatus = incident => {
    // console.log("on updateStatisticsStatus");
    incident.map(currIncident => {
      if (currIncident.Label === IncidentLabel.TennisPointFinished) {
        // console.log("TennisPointFinished ...");
        // console.log(incident.Label);
        this.showStatistics = false;

        setTimeout(() => this.showStatistics=false, 15000);
        // this.showStatistics = false;
        //tbd send to the statistics what to show
      } else if (currIncident.Label === IncidentLabel.TennisGameFinished) {
        // this.showStatistics = false;
        setTimeout(() => {}, 10000);
      } else if (currIncident.Label === IncidentLabel.TennisSetFinished) {
        // this.showStatistics = false;
        setTimeout(() => {}, 15000);
      } else if (currIncident.Label === IncidentLabel.TennisMatchFinished) {
        // this.showStatistics = false;
        setTimeout(() => {}, 15000);
      }
    });
  };

  updateStatisticsData = statistics => {
    this.statisticsData = statistics;
    // console.log(statistics);
  };
  updateElements = elements => {
    // this.liveScoreMode = true;
    // this.lVisionMode = false;
    // console.log(elements);

    // this.elements && (this.showStatistics = false);
    const previousBall =
      this.elements && this.elements.find(el => el.Type === Elements.Ball);
    const playerSingelTrack =
      this.elements && this.elements.find(el => el.Type === Elements.Player);

    if (!!previousBall) {
      this.previousBalls.push(previousBall);
      if (this.previousBalls.length > 2) {
        this.previousBalls.shift();
      }
    }

    if (!!playerSingelTrack) {
      this.playerTrack.push(playerSingelTrack);
      // if (this.playerTrack.length > 2) {
      //   this.playerTrack.shift();
      // }
    }

    this.elements = elements;
  };

  //

  updateScore = score => {
    // console.log("SCORE" );
    // console.log(JSON.stringify(score));

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
            {this.score && (
              <pbp-score-board
                score={this.score}
                message={this.message}
                class={""}
              />
            )}
            {/* <pbp-angle-control jsonOpen={this.jsonViewerOpen}  view={this.view} onViewChange={this.onViewChange} class="d-none"/> */}
            <br />
            <br />
            <br />
            <br />
            <pbp-field view={this.view}>
              {this.elements &&
                this.elements.map(element => {
                  return element.Type === Elements.Player ? (
                    <pbp-player
                      // id='pbpPlayer'
                      view={this.view}
                      position={{
                        prevTop: this.playerTrack[this.playerTrack.length - 1]
                          .Location.X,
                        prevLeft: this.playerTrack[this.playerTrack.length - 1]
                          .Location.Y,
                        currTop: element.Location.X,
                        currLeft: element.Location.Y
                      }}
                    />
                  ) : element.Type === Elements.Ball ? (
                    <pbp-ball
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
              <pbp-statistics statistics={this.statisticsData} />
            )}
            {this.error && (
              <span class={`error-overlay ${this.jsonViewerOpen && "open"}`}>
                <svg
                  width="59"
                  height="50"
                  viewBox="0 0 59 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M58.336 42.97C60.2266 46.0944 57.8534 50 54.0772 50H4.92223C1.13875 50 -1.2235 46.0884 0.663472 42.97L25.2413 2.34229C27.1329 -0.783593 31.8706 -0.777929 33.7588 2.34229L58.336 42.97V42.97ZM29.5 34.5703C26.8978 34.5703 24.7882 36.5815 24.7882 39.0625C24.7882 41.5435 26.8978 43.5547 29.5 43.5547C32.1023 43.5547 34.2118 41.5435 34.2118 39.0625C34.2118 36.5815 32.1023 34.5703 29.5 34.5703ZM25.0266 18.4232L25.7864 31.7045C25.8219 32.326 26.3609 32.8125 27.0137 32.8125H31.9863C32.6391 32.8125 33.1781 32.326 33.2136 31.7045L33.9735 18.4232C34.0119 17.752 33.4513 17.1875 32.7461 17.1875H26.2538C25.5487 17.1875 24.9882 17.752 25.0266 18.4232V18.4232Z"
                    fill="#3F3F3F"
                  />
                </svg>
              </span>
            )}
          </div>
        ) : //show in livscoreMode
        this.liveScoreMode ? (
          <div class={`wrapper ${this.fieldView}`}>
            {this.score && (
              <pbp-score-board
                score={this.score}
                message={this.message}
                class={""}
              />
            )}

            {/* <pbp-angle-control jsonOpen={this.jsonViewerOpen}  view={this.view} onViewChange={this.onViewChange} class="d-none"/> */}
            <br />
            <br />
            <br />
            <br />
            <pbp-field jsonOpen={this.jsonViewerOpen} view={this.view}>
              <pbp-player
                view={this.view}
                position={{
                  prevTop: 0.65,
                  prevLeft: 0.45,
                  currTop: 0.82,
                  currLeft: 0.25
                }}
              />

              <pbp-player
                view={this.view}
                position={{
                  prevTop: 0.85,
                  prevLeft: 0.35,
                  currTop: 0.42,
                  currLeft: 0.15
                }}
              />

              <pbp-ball
                position={{
                  top: 0.86,
                  left: -0.085
                }}
              />
            </pbp-field>

            {this.showStatistics && (
              <pbp-statistics
                statistics={this.statisticsData}
                open={this.jsonViewerOpen}
              />
            )}
            {this.error && (
              <span class={`error-overlay ${this.jsonViewerOpen && "open"}`}>
                <svg
                  width="59"
                  height="50"
                  viewBox="0 0 59 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M58.336 42.97C60.2266 46.0944 57.8534 50 54.0772 50H4.92223C1.13875 50 -1.2235 46.0884 0.663472 42.97L25.2413 2.34229C27.1329 -0.783593 31.8706 -0.777929 33.7588 2.34229L58.336 42.97V42.97ZM29.5 34.5703C26.8978 34.5703 24.7882 36.5815 24.7882 39.0625C24.7882 41.5435 26.8978 43.5547 29.5 43.5547C32.1023 43.5547 34.2118 41.5435 34.2118 39.0625C34.2118 36.5815 32.1023 34.5703 29.5 34.5703ZM25.0266 18.4232L25.7864 31.7045C25.8219 32.326 26.3609 32.8125 27.0137 32.8125H31.9863C32.6391 32.8125 33.1781 32.326 33.2136 31.7045L33.9735 18.4232C34.0119 17.752 33.4513 17.1875 32.7461 17.1875H26.2538C25.5487 17.1875 24.9882 17.752 25.0266 18.4232V18.4232Z"
                    fill="#3F3F3F"
                  />
                </svg>
              </span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
