export interface statistic {
  type: "progress" | "pie";
  label: string;
  homeValue: number;
  awayValue: number;
}

//interface
export interface StatisticsData {
  StatisticType: number;
  StatisticUnit: number;
  ParticipantStatsticMetadata: ParticipantStatsticMetadata[];
}

export interface ParticipantStatsticMetadata {
  ParticipantStat: number;
  StatPerPeriod: StatPerPeriod[];
}

export interface StatPerPeriod {
  PeriodType: number;
  PeriodValue: number;
  StatValue: number;
}
//E

// LiveScore Statistics models
export interface lsStatistics {
  Type: number;
  Value: lsValue[];
}

export interface lsValue {
  Value: string;
  position: string;
}

//Enums

export enum StatisticType {
  DistanceCovered = 1,
  ServingBallSpeed = 2,
  AverageBallSpeed = 3,
  Rally = 4,
  LongestRally = 5,
  LongestPointStreak = 6,
  NetShotPlacement = 7,
  BaselineShotPlacement = 8,
  // MidlineShotPlacement = 9,
  Ace = 20,
  DoubleFaults = 21,
  Win1stServe = 34,
  BreakPointConversions = 23,
  // PlayersHeatmap = 13,
  // LastPointPlayersTracking = 14,
  // Winner = 15
}

export enum StatisticUnit {
  Meter = 1,
  Percentage = 2,
  KmH = 3,
  Counter = 4,
  // Graph = 5
}

export enum ParticipantStat {
  HomePlayer1 = 1,
  HomePlayer2 = 2,
  AwayPlayer1 = 3,
  AwayPlayer2 = 4
}

export enum PeriodType {
  Current = 1,
  Set = 2,
  Game = 3,
  Point = 4
}
