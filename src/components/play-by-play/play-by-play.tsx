import { Component, Prop, State } from '@stencil/core';
import { hubConnection } from 'signalr-no-jquery';
import { Incident, Element, Frame, Incidents, States, Elements} from './interfaces';


@Component({
  tag: 'play-by-play',
  styleUrl: 'play-by-play.css'
})
export class PlayByPlay {
  @Prop() fixtureid: string;
  @Prop() onloaderror: () => void;
  @Prop() ondisconnected: () => void;
  @Prop() onconnected: () => void;
  @State() view: 'bird' | 'camera' | 'side';
  @State() connection;
  @State() hubProxy;
  @State() elements: Element[];
  @State() reconnectAttemp: number = 0;
  @State() reconnectTimeout: number = 10;
  @State() jsonViewerOpen: boolean = true;
  @State() error: boolean = false;
  @State() showStatistics: boolean = false;
  @State() message: {
    date: Date
    text: string
    type?: 'ERROR' | 'INFO'
  }
  @State() previousBalls: Element[];
  
  

  componentWillLoad() {
    this.view = 'camera';
    this.previousBalls = [];
    const url: string = 'http://ICnat.lsports.eu:8100';
    this.connection = hubConnection(url);
    this.hubProxy = this.connection.createHubProxy('playByPlayHub');
    const that = this;

    this.hubProxy.on('updatePlayByPlay', function(frame: Frame) {
      that.updateElements(frame.Elements);
      frame.Incidents.length && that.updateIncident(frame.Incidents[0], frame.Timestamp);
    });

    this.hubProxy.on('updateFixtureStatistics', function(frame: Frame) {
      console.log('updateFixtureStatistics'+  JSON.stringify(frame));
      // that.showStatistics = true;
      // console.log(frame);
    });

    this.hubProxy.on('stateMessageReceived', function(frame: Frame) {
      that.updateStateMessage(frame);
      console.log('get frame from server : ' +  JSON.stringify(frame));
      // alert(JSON.stringify(frame));
      
    });

    this.start();
  }

  start = () => {
    const that = this;
    this.connection
      .start()
      .done(() => {
        this.message = { date: new Date(), text: 'Connected', type: 'INFO' };
        this.error = false;
        // this.onconnected();
        return this.hubProxy.invoke('Subscribe', this.fixtureid);
      })
      .fail(() => {
        this.error = true;
        // this.ondisconnected();
        if (this.reconnectAttemp < 3) {
          this.reconnectAttemp++;
          this.updateErrorMessage();
          that.message = { date: new Date(), text: 'Connecting' };
          setTimeout(that.start,this.reconnectTimeout*1000);
        } else {
          // this.onloaderror();
        }
      });
  }

  updateErrorMessage = () => {
    const that = this;
    let counter = 10;
    const interval = setInterval(() => {
      counter--;
      that.message = { date: new Date(), text: `Connection Lost, Trying to reconnect in ${counter}`, type: 'ERROR' };
      if (!counter) {
        that.message = { date: new Date(), text: 'Connecting' }
        clearInterval(interval);
      }
    },1000);
  }

  onViewChange = (e) => {
    this.view = e.target.value;
  }

  updateIncident = (incident: Incident, timestamp: Date) => {
    if (this.error) { return }
    this.message = {
      date: new Date(timestamp),
      text: `${Incidents[incident.Label]} by ${incident.Metadata.Performer}`
    }
  }

  updateStateMessage = (frame) => {
    if (frame.State === States.StreamStopped) {
      this.error = true;
      this.showStatistics = false;
    } else if (frame.State === States.StreamStarted) {
      this.error = false;
      this.showStatistics = false;
    } else if (frame.State === States.Fade) {
      this.showStatistics = true;
      this.error = false;
    }
    this.message = {
      date: new Date(frame.Timestamp),
      text: frame.Description,
      type: frame.State === States.StreamStopped ? 'ERROR' : 'INFO'
    }
  }

  updateElements = (elements) => {
    const previousBall = this.elements && this.elements.find(el => el.Type === Elements.Ball)
    if (!!previousBall) {
      this.previousBalls.push(previousBall);
      if (this.previousBalls.length > 20) {
        this.previousBalls.shift();
      }
    }
    this.elements = elements;
  }

  onToggleJsonViewer = () => {
    this.jsonViewerOpen = !this.jsonViewerOpen;
  }

  render() {
    return<div class="embed-responsive embed-responsive-4by3 container">
    <div class="row justify-content-center">
        <div class="col align-self-center">

   <div class="wrapper ">
      {/* <div class="container">
            <div class="row">
            <div class="col-xs-10 col-sm-10  col-md-10 col-lg-20">  */}
      <pbp-angle-control class={'realative-top'} view={this.view} onViewChange={this.onViewChange} />
      <br></br>
      <br></br>
      <br></br>
      <pbp-score-board class={'align-text-top text-center'}></pbp-score-board>
      <br></br>
      <pbp-field jsonOpen={this.jsonViewerOpen} view={this.view}>
        {this.elements && this.elements.map(element => {
          return element.Type === Elements.Player
            ? <pbp-player view={this.view} position={{ top: element.Location.X, left: element.Location.Y }} />
            : <pbp-ball position={{ top: element.Location.X, left: element.Location.Y }} />
        })}
        {
          this.elements &&
          !!this.elements.filter(el => el.Type === Elements.Ball).length &&
          this.previousBalls &&
          this.previousBalls.map((ball, i) => <pbp-ball opacity={i === 0 ? .1 : .3} position={{ top: ball.Location.X, left: ball.Location.Y }} />)
        }
      </pbp-field>
      <pbp-json-viewer onToggle={this.onToggleJsonViewer} open={this.jsonViewerOpen} items={this.elements} class="textStyle" />
      <pbp-message jsonOpen={this.jsonViewerOpen} message={this.message} class="textStyle"/>
      {this.showStatistics && <pbp-statistics open={this.jsonViewerOpen} />}
      {
        this.error && <span class={`error-overlay ${this.jsonViewerOpen && 'open'}`}>
       
        
          <svg width="59" height="50" viewBox="0 0 59 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M58.336 42.97C60.2266 46.0944 57.8534 50 54.0772 50H4.92223C1.13875 50 -1.2235 46.0884 0.663472 42.97L25.2413 2.34229C27.1329 -0.783593 31.8706 -0.777929 33.7588 2.34229L58.336 42.97V42.97ZM29.5 34.5703C26.8978 34.5703 24.7882 36.5815 24.7882 39.0625C24.7882 41.5435 26.8978 43.5547 29.5 43.5547C32.1023 43.5547 34.2118 41.5435 34.2118 39.0625C34.2118 36.5815 32.1023 34.5703 29.5 34.5703ZM25.0266 18.4232L25.7864 31.7045C25.8219 32.326 26.3609 32.8125 27.0137 32.8125H31.9863C32.6391 32.8125 33.1781 32.326 33.2136 31.7045L33.9735 18.4232C34.0119 17.752 33.4513 17.1875 32.7461 17.1875H26.2538C25.5487 17.1875 24.9882 17.752 25.0266 18.4232V18.4232Z" fill="#3F3F3F"/>
          </svg>
        </span>
      }
      </div>
       </div>
       </div>
     </div>;
  }
}
