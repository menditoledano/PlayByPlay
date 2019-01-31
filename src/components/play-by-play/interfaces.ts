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
  Fade = 2,
  FallBack = 3,
  Freeze = 4
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
  RedCard = 0,
  Forehand = 1,
  Serve = 2,
  Kik = 3,
  Hit = 4,
  ScoreboardChanged = 5,
  PlayerOutOfCourt = 6,
  TennisPointFinished = 10,
  TennisGameFinished = 11,
  TennisSetFinished = 12,
  TennisMatchFinished = 13,
  TennisPointStreak = 14
}

export enum State {
  StreamStarted = 1,
  StreamStopped = 2,
  Fade = 3,
  Fallback = 4,
  Freeze = 5
}

//

export interface score {
  CurrentScore : CurrentScore
   ScorePeriod: ScorePeriod[];
   
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




  //liveScore interface

  export interface LiveScore{
    Scoreboard : lsScoreboard;
    Periods : Period[];
    Statistics : lsStatistic[];
    LivescoreExtraData : lsData[];

  }
  export interface lsScoreboard{
    Status : number;
    // Description : number;
    CurrentPeriod : number;
    Time : string;
    Results : lsResult[];
  }

  export interface lsResult{
    Value: string;
    Position : string;
  }

  export interface Period{
    Type: number;
    IsFinished : boolean;
    IsConfirmed: boolean;
    Results : lsResult[];
    Incidents : string;
  } 

  //TODO: lsIncidents model(?)

  export interface lsData{
    Name: string; 
    Value: string; 
  } 
  export interface lsStatistic {
    Type: number;
    Results: lsResult[];
    Incidents : string;
  }
  
  export interface lsValue {
    Value: string;
    Position: string;
  }

    //liveScore Enum

    export enum lsScoreboardStatus {  	
      NotStartedYet = 1,
      InProgress = 2,
      Finished = 3,
      Cancelled = 4,
      Postponed = 5,
      Interrupted = 6,
      Abandoned = 7,
      CoverageLost = 8, 	
      AboutToStart = 9
    }

    export enum lsPosition {  	
      homePlayer = 1,
      awayPlayer = 2,

    }

    export enum  ScorePeriodValue {
  	
      FirstSetscore = 1, 	
      SecondSetScore = 2,		
      ThirdSetScore   = 3,
      FourthSetScore = 4,
      FifthSetScore = 5,
      GameScore = 60,
      FullTime = 100
    }

    // export enum lsStatusDescription {  	
    //   Halftime = 1,
    //   OvertimeHalftime = 2,
    //   HomeParticipantHasRetired = 3,
    //   AwayParticipantHasRetired = 4,
    //   Postponed = 5,
    //   Interrupted = 6,
    //   Abandoned = 7,
    //   CoverageLost = 8, 	
    //   AboutToStart = 9
    // }