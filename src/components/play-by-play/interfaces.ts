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
    Speed: number
    Target: string
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
