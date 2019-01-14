export interface Element {
  Type: number
  Label: number
  Location: {
    X: number
    Y: number
    Z: number
  }
  Metadata: any
}

export interface Frame {
  Score : score
  Elements: Element[]
  Incidents: Incident[]
  CourtDetected: boolean
  FixtureId: number
  Timestamp: Date
}

export interface Incident {
  Label: Incidents,
  Metadata: {
    Performer: string
    Target: string
    Speed: number
  }
}

export enum States {
  StreamStarted = 0,
  StreamStopped = 1,
  Fade = 2
}

export enum Elements {
  Player = 0,
  Ball = 1
}

export enum Incidents {
  Forehand = 1,
  Serve = 2,
  Shot = 4
}


//

export enum MessageTypes {
  FrameMessage = 1,
  Statistics = 2,
  State = 3
}

export enum ElementsType {
  Person = 1,
  Ball = 2
}

export enum  ElementsLabel {
  HomePlayer = 1,
  AwayPlayer = 2,
  TennisBall = 3
}

export enum  IncidentLabel {
  Forehand = 1,
  Serve = 2,
  Backhand = 3,
  Hit = 4
}

export enum State {
  StreamStarted = 1,
  StreamStopped = 2,
  Fade = 3,
  Fallback = 4
}







//

export interface score {
   ScorePeriod: ScorePeriod[];
   CurrentScore : CurrentScore
  }


  export interface ScorePeriod{
    ScorePeriodValue : number;
    Home : string
    Away : string
  }

  export interface CurrentScore{
    Home : string
    Away : string

  }