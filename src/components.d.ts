/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  score,
} from './components/score-board/interfaces';


export namespace Components {

  interface PbpAngleControl {
    'jsonOpen': boolean;
    'onViewChange': (e: any) => void;
    'view': string;
  }
  interface PbpAngleControlAttributes extends StencilHTMLAttributes {
    'jsonOpen'?: boolean;
    'onViewChange'?: (e: any) => void;
    'view'?: string;
  }

  interface PbpBall {
    'animationNumber': number;
    'opacity': number;
    'position': {
      top: number
      left: number
    };
  }
  interface PbpBallAttributes extends StencilHTMLAttributes {
    'animationNumber'?: number;
    'opacity'?: number;
    'position'?: {
      top: number
      left: number
    };
  }

  interface PbpField {
    'jsonOpen': boolean;
    'view': "bird" | "camera" | "side";
  }
  interface PbpFieldAttributes extends StencilHTMLAttributes {
    'jsonOpen'?: boolean;
    'view'?: "bird" | "camera" | "side";
  }

  interface PbpJsonViewer {
    'items': any[];
    'onToggle': any;
    'open': boolean;
  }
  interface PbpJsonViewerAttributes extends StencilHTMLAttributes {
    'items'?: any[];
    'onToggle'?: any;
    'open'?: boolean;
  }

  interface PbpMessageAnimate {
    'messageText': string;
  }
  interface PbpMessageAnimateAttributes extends StencilHTMLAttributes {
    'messageText'?: string;
  }

  interface PbpMessage {
    'jsonOpen': boolean;
    'message': {
      date: Date;
      text: string;
      type?: "ERROR" | "INFO";
    };
  }
  interface PbpMessageAttributes extends StencilHTMLAttributes {
    'jsonOpen'?: boolean;
    'message'?: {
      date: Date;
      text: string;
      type?: "ERROR" | "INFO";
    };
  }

  interface PbpNet {}
  interface PbpNetAttributes extends StencilHTMLAttributes {}

  interface PlayByPlayWidget {
    'fixtureid': string;
    'onconnected': () => void;
    'ondisconnected': () => void;
    'onloaderror': () => void;
  }
  interface PlayByPlayWidgetAttributes extends StencilHTMLAttributes {
    'fixtureid'?: string;
    'onconnected'?: () => void;
    'ondisconnected'?: () => void;
    'onloaderror'?: () => void;
  }

  interface PbpPlayer {
    'opacity': number;
    'playerType': any;
    'position': {
      currTop: number;
      currLeft: number;
    };
    'postionNumber': number;
    'view': "bird" | "camera" | "side";
  }
  interface PbpPlayerAttributes extends StencilHTMLAttributes {
    'opacity'?: number;
    'playerType'?: any;
    'position'?: {
      currTop: number;
      currLeft: number;
    };
    'postionNumber'?: number;
    'view'?: "bird" | "camera" | "side";
  }

  interface PbpScoreBoard {
    'jsonOpen': boolean;
    'liveScore': score;
    'message': {
      date: Date;
      text: string;
      type?: "ERROR" | "INFO";
    };
    'open': boolean;
    'playerA': string;
    'playerB': string;
    'score': score;
  }
  interface PbpScoreBoardAttributes extends StencilHTMLAttributes {
    'jsonOpen'?: boolean;
    'liveScore'?: score;
    'message'?: {
      date: Date;
      text: string;
      type?: "ERROR" | "INFO";
    };
    'open'?: boolean;
    'playerA'?: string;
    'playerB'?: string;
    'score'?: score;
  }

  interface PbpLastPointsStat {
    'open': boolean;
    'position': {
      top: number
      left: number
    };
  }
  interface PbpLastPointsStatAttributes extends StencilHTMLAttributes {
    'open'?: boolean;
    'position'?: {
      top: number
      left: number
    };
  }

  interface PbpShotPlacementStat {
    'open': boolean;
    'position': {
      top: number
      left: number
    };
  }
  interface PbpShotPlacementStatAttributes extends StencilHTMLAttributes {
    'open'?: boolean;
    'position'?: {
      top: number
      left: number
    };
  }

  interface PbpStatBoard {
    'awayPlayerName': any;
    'homePlayerName': any;
    'statisticsData': any;
  }
  interface PbpStatBoardAttributes extends StencilHTMLAttributes {
    'awayPlayerName'?: any;
    'homePlayerName'?: any;
    'statisticsData'?: any;
  }

  interface PbpStatistics {
    'awayPlayerName': any;
    'homePlayerName': any;
    'open': boolean;
    'statistics': any;
  }
  interface PbpStatisticsAttributes extends StencilHTMLAttributes {
    'awayPlayerName'?: any;
    'homePlayerName'?: any;
    'open'?: boolean;
    'statistics'?: any;
  }

  interface PbpTrackBall {
    'opacity': number;
    'position': {
      top: number
      left: number
    };
  }
  interface PbpTrackBallAttributes extends StencilHTMLAttributes {
    'opacity'?: number;
    'position'?: {
      top: number
      left: number
    };
  }

  interface PbpTrackPlayer {
    'opacity': number;
    'position': {
      top: number
      left: number
    };
    'view': 'bird' | 'camera' | 'side';
  }
  interface PbpTrackPlayerAttributes extends StencilHTMLAttributes {
    'opacity'?: number;
    'position'?: {
      top: number
      left: number
    };
    'view'?: 'bird' | 'camera' | 'side';
  }
}

declare global {
  interface StencilElementInterfaces {
    'PbpAngleControl': Components.PbpAngleControl;
    'PbpBall': Components.PbpBall;
    'PbpField': Components.PbpField;
    'PbpJsonViewer': Components.PbpJsonViewer;
    'PbpMessageAnimate': Components.PbpMessageAnimate;
    'PbpMessage': Components.PbpMessage;
    'PbpNet': Components.PbpNet;
    'PlayByPlayWidget': Components.PlayByPlayWidget;
    'PbpPlayer': Components.PbpPlayer;
    'PbpScoreBoard': Components.PbpScoreBoard;
    'PbpLastPointsStat': Components.PbpLastPointsStat;
    'PbpShotPlacementStat': Components.PbpShotPlacementStat;
    'PbpStatBoard': Components.PbpStatBoard;
    'PbpStatistics': Components.PbpStatistics;
    'PbpTrackBall': Components.PbpTrackBall;
    'PbpTrackPlayer': Components.PbpTrackPlayer;
  }

  interface StencilIntrinsicElements {
    'pbp-angle-control': Components.PbpAngleControlAttributes;
    'pbp-ball': Components.PbpBallAttributes;
    'pbp-field': Components.PbpFieldAttributes;
    'pbp-json-viewer': Components.PbpJsonViewerAttributes;
    'pbp-message-animate': Components.PbpMessageAnimateAttributes;
    'pbp-message': Components.PbpMessageAttributes;
    'pbp-net': Components.PbpNetAttributes;
    'play-by-play-widget': Components.PlayByPlayWidgetAttributes;
    'pbp-player': Components.PbpPlayerAttributes;
    'pbp-score-board': Components.PbpScoreBoardAttributes;
    'pbp-last-points-stat': Components.PbpLastPointsStatAttributes;
    'pbp-shot-placement-stat': Components.PbpShotPlacementStatAttributes;
    'pbp-stat-board': Components.PbpStatBoardAttributes;
    'pbp-statistics': Components.PbpStatisticsAttributes;
    'pbp-track-ball': Components.PbpTrackBallAttributes;
    'pbp-track-player': Components.PbpTrackPlayerAttributes;
  }


  interface HTMLPbpAngleControlElement extends Components.PbpAngleControl, HTMLStencilElement {}
  var HTMLPbpAngleControlElement: {
    prototype: HTMLPbpAngleControlElement;
    new (): HTMLPbpAngleControlElement;
  };

  interface HTMLPbpBallElement extends Components.PbpBall, HTMLStencilElement {}
  var HTMLPbpBallElement: {
    prototype: HTMLPbpBallElement;
    new (): HTMLPbpBallElement;
  };

  interface HTMLPbpFieldElement extends Components.PbpField, HTMLStencilElement {}
  var HTMLPbpFieldElement: {
    prototype: HTMLPbpFieldElement;
    new (): HTMLPbpFieldElement;
  };

  interface HTMLPbpJsonViewerElement extends Components.PbpJsonViewer, HTMLStencilElement {}
  var HTMLPbpJsonViewerElement: {
    prototype: HTMLPbpJsonViewerElement;
    new (): HTMLPbpJsonViewerElement;
  };

  interface HTMLPbpMessageAnimateElement extends Components.PbpMessageAnimate, HTMLStencilElement {}
  var HTMLPbpMessageAnimateElement: {
    prototype: HTMLPbpMessageAnimateElement;
    new (): HTMLPbpMessageAnimateElement;
  };

  interface HTMLPbpMessageElement extends Components.PbpMessage, HTMLStencilElement {}
  var HTMLPbpMessageElement: {
    prototype: HTMLPbpMessageElement;
    new (): HTMLPbpMessageElement;
  };

  interface HTMLPbpNetElement extends Components.PbpNet, HTMLStencilElement {}
  var HTMLPbpNetElement: {
    prototype: HTMLPbpNetElement;
    new (): HTMLPbpNetElement;
  };

  interface HTMLPlayByPlayWidgetElement extends Components.PlayByPlayWidget, HTMLStencilElement {}
  var HTMLPlayByPlayWidgetElement: {
    prototype: HTMLPlayByPlayWidgetElement;
    new (): HTMLPlayByPlayWidgetElement;
  };

  interface HTMLPbpPlayerElement extends Components.PbpPlayer, HTMLStencilElement {}
  var HTMLPbpPlayerElement: {
    prototype: HTMLPbpPlayerElement;
    new (): HTMLPbpPlayerElement;
  };

  interface HTMLPbpScoreBoardElement extends Components.PbpScoreBoard, HTMLStencilElement {}
  var HTMLPbpScoreBoardElement: {
    prototype: HTMLPbpScoreBoardElement;
    new (): HTMLPbpScoreBoardElement;
  };

  interface HTMLPbpLastPointsStatElement extends Components.PbpLastPointsStat, HTMLStencilElement {}
  var HTMLPbpLastPointsStatElement: {
    prototype: HTMLPbpLastPointsStatElement;
    new (): HTMLPbpLastPointsStatElement;
  };

  interface HTMLPbpShotPlacementStatElement extends Components.PbpShotPlacementStat, HTMLStencilElement {}
  var HTMLPbpShotPlacementStatElement: {
    prototype: HTMLPbpShotPlacementStatElement;
    new (): HTMLPbpShotPlacementStatElement;
  };

  interface HTMLPbpStatBoardElement extends Components.PbpStatBoard, HTMLStencilElement {}
  var HTMLPbpStatBoardElement: {
    prototype: HTMLPbpStatBoardElement;
    new (): HTMLPbpStatBoardElement;
  };

  interface HTMLPbpStatisticsElement extends Components.PbpStatistics, HTMLStencilElement {}
  var HTMLPbpStatisticsElement: {
    prototype: HTMLPbpStatisticsElement;
    new (): HTMLPbpStatisticsElement;
  };

  interface HTMLPbpTrackBallElement extends Components.PbpTrackBall, HTMLStencilElement {}
  var HTMLPbpTrackBallElement: {
    prototype: HTMLPbpTrackBallElement;
    new (): HTMLPbpTrackBallElement;
  };

  interface HTMLPbpTrackPlayerElement extends Components.PbpTrackPlayer, HTMLStencilElement {}
  var HTMLPbpTrackPlayerElement: {
    prototype: HTMLPbpTrackPlayerElement;
    new (): HTMLPbpTrackPlayerElement;
  };

  interface HTMLElementTagNameMap {
    'pbp-angle-control': HTMLPbpAngleControlElement
    'pbp-ball': HTMLPbpBallElement
    'pbp-field': HTMLPbpFieldElement
    'pbp-json-viewer': HTMLPbpJsonViewerElement
    'pbp-message-animate': HTMLPbpMessageAnimateElement
    'pbp-message': HTMLPbpMessageElement
    'pbp-net': HTMLPbpNetElement
    'play-by-play-widget': HTMLPlayByPlayWidgetElement
    'pbp-player': HTMLPbpPlayerElement
    'pbp-score-board': HTMLPbpScoreBoardElement
    'pbp-last-points-stat': HTMLPbpLastPointsStatElement
    'pbp-shot-placement-stat': HTMLPbpShotPlacementStatElement
    'pbp-stat-board': HTMLPbpStatBoardElement
    'pbp-statistics': HTMLPbpStatisticsElement
    'pbp-track-ball': HTMLPbpTrackBallElement
    'pbp-track-player': HTMLPbpTrackPlayerElement
  }

  interface ElementTagNameMap {
    'pbp-angle-control': HTMLPbpAngleControlElement;
    'pbp-ball': HTMLPbpBallElement;
    'pbp-field': HTMLPbpFieldElement;
    'pbp-json-viewer': HTMLPbpJsonViewerElement;
    'pbp-message-animate': HTMLPbpMessageAnimateElement;
    'pbp-message': HTMLPbpMessageElement;
    'pbp-net': HTMLPbpNetElement;
    'play-by-play-widget': HTMLPlayByPlayWidgetElement;
    'pbp-player': HTMLPbpPlayerElement;
    'pbp-score-board': HTMLPbpScoreBoardElement;
    'pbp-last-points-stat': HTMLPbpLastPointsStatElement;
    'pbp-shot-placement-stat': HTMLPbpShotPlacementStatElement;
    'pbp-stat-board': HTMLPbpStatBoardElement;
    'pbp-statistics': HTMLPbpStatisticsElement;
    'pbp-track-ball': HTMLPbpTrackBallElement;
    'pbp-track-player': HTMLPbpTrackPlayerElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
