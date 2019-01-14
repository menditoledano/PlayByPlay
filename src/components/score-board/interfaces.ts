export interface score {
   CurrentScore : CurrentScore
   ScorePeriod: ScorePeriod[]
   
  }
  export interface ScorePeriod{
    ScorePeriodValue : ScorePeriodValue;
    Home : string
    Away : string
  }

  export interface CurrentScore{
    Home : string
    Away : string

  }
  export interface points {
    label:string
    sets: number
    game: number
    point:number
  }
  
  //


export enum  ScorePeriodValue {
  	
  FirstSetscore = 1, 	
  SecondSetScore = 2,		
  ThirdSetScore   = 3,
  FourthSetScore = 4,
  FifthSetScore = 5,
  GameScore = 60,
  FullTime = 100
}