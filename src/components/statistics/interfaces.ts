export interface statistic {
  type: 'progress' | 'pie'
  label: string
  homeValue: number
  awayValue: number
}


//

export enum  StatisticType {
  DistanceCovered = 1, 	
  ServingBallSpeed = 2,
  AverageBallSpeed = 3,
  Rally = 4,
  LongestRally = 5,
  LongestPointStreak = 6,
  NetShotPlacement = 7,
  BaselineShotPlacement = 8,
  Ace = 9,
  DoubleFaults = 10, 	
  Win1stServe = 11,	
  BreakPointConversions = 12,
  PlayersHeatmap = 13,
  LastPointPlayersTracking = 14,
  Winner = 15
}

export enum  StatisticUnit {
  Meter = 1, 	
  Percentage = 2,	
  KmH  = 3,
  Counter = 4,
  Graph = 5
}

export enum  ParticipantStat {
  HomePlayer1 = 1, 	
  HomePlayer2 = 2,		
  AwayPlayer1   = 3,
  AwayPlayer2 = 4
}

export enum  PeriodType {
  Current = 1, 	
  Set = 2,		
  Game   = 3,
  Point = 4
}