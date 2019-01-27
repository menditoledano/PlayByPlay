webpackJsonp([1], {
  "+yYV": function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
        for (var e, l = 1, t = arguments.length; l < t; l++)
          for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
        return n
      },
      o = l("TToO").__decorate,
      i = l("TToO").__metadata;
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var u = l("SLR8"),
      a = l("YaPU"),
      r = l("g5jc"),
      s = (l("bfOx"), l("Zkkf"), l("Zn+w")),
      c = (l("BAgd"), l("D4Le"));

    function d(n, e, l) {
      var t = l.value;
      return l.value = function () {
        for (var n = this, e = [], l = 0; l < arguments.length; l++) e[l] = arguments[l];
        this.canContinue().subscribe(function (l) {
          return t.apply(n, e)
        })
      }, l
    }
    l("D692"), l("cPqY"), l("fvZC"), l("5wxv"), l("ZJhL"), l("joif"), l("L1ao"), e.RegisterEventsComponent = function () {
      function n(n, e, l, t, o, i) {
        var u = this;
        this.route = n, this.matchService = e, this.notificationService = l, this.compositionService = t, this.eventService = o, this.stream = i, this.currentFrame$ = new r.Subject, this.fpsVideo = 10, this.instruction$ = new r.Subject, this.match = {
          players: [],
          home_team: {
            id: -1,
            short_name: "",
            acronym: ""
          },
          away_team: {
            id: -1,
            short_name: "",
            acronym: ""
          },
          home_team_kit_color: {
            jersey_color: "",
            short_color: "",
            number_color: ""
          },
          away_team_kit_color: {
            jersey_color: "",
            short_color: "",
            number_color: ""
          }
        }, this.closeButton$ = new r.Subject, this.matchStartTime = new Date, this.matchStartFrame = 0, this.pendingRequest = !1, this.isSuccessfullySent$ = new r.Subject, this.canValidate = !1, this.goalAgainstSelf = !1, this.modalRegularMode = !1, this.modalShortcutMode = !1, this.currentPeriod = 0, this.home_score = 0, this.away_score = 0, this.matchPlayers = {
          homePlayers: [],
          awayPlayers: [],
          homeSubstitutes: [],
          awaySubstitutes: []
        }, this.referee_events = [{
          name: "Video Assistance",
          type: "video_assistance",
          status: "demanded",
          ignore_player: !0
        }, {
          name: "Video Cancelled",
          type: "video_assistance",
          image: "video_cancelled",
          status: "cancelled",
          ignore_player: !0
        }, {
          name: "Video Validated",
          type: "video_assistance",
          image: "video_validated",
          status: "validated",
          ignore_player: !0
        }], this.referee_events_subjects = [{
          name: "Goal",
          type: "score_change",
          ignore_player: !0
        }, {
          name: "Penalty Awarded",
          type: "penalty_awarded",
          ignore_player: !0
        }, {
          name: "Red Card",
          type: "red_card",
          image: "yellow_red_card",
          ignore_player: !0
        }], this.events_groups = [{
          group: "usuals",
          items: [{
            name: "Throw In",
            type: "throw_in",
            ignore_player: !0
          }, {
            name: "Free Kick",
            type: "free_kick",
            ignore_player: !0
          }, {
            name: "Goal Kick",
            type: "goal_kick",
            ignore_player: !0
          }, {
            name: "Corner Kick",
            type: "corner_kick",
            ignore_player: !0
          }]
        }, {
          group: "shots",
          items: [{
            name: "Off Target",
            type: "shot_off_target"
          }, {
            name: "On Target",
            type: "shot_on_target"
          }, {
            name: "Goal !",
            type: "score_change"
          }, {
            name: "Substitution",
            type: "substitution"
          }]
        }, {
          group: "others",
          items: [{
            name: "Goal Block",
            type: "goalkeeper_interception",
            image: "shot_saved",
            ignore_player: !0
          }, {
            name: "Offside",
            type: "offside"
          }, {
            name: "Penalty Awarded",
            type: "penalty_awarded"
          }, {
            name: "Penalty Missed",
            type: "penalty_missed"
          }]
        }], this.canContinue = function () {
          return u.isSuccessfullySent$.take(1).takeWhile(function (n) {
            return 1 == n
          })
        }, this.route.params.subscribe(function (n) {
          u.match_id = +n.match_id
        }), this.stream.handleWebSocket = function (n) {}, this.stream.refreshTabVisibility = function () {}, this.stream.reconstructMatchState = function (n) {
          return a.Observable.never()
        }
      }
      return n.prototype.ngOnInit = function () {
        var n = this;
        this._image = u.images, this.getMatchData().subscribe(function (e) {
          n.updateOnFieldPlayers()
        }), this.commandThroughKeyboard()
      }, n.prototype.ngAfterViewInit = function () {
        this.syncScoreAndPeriod()
      }, n.prototype.setTeam = function (n) {
        this.selectedTeam = n, this.selectedEvent.team = n, this.selectedPlayer = void 0, this.selectedPlayerIn = void 0, this.selectedPlayerAssist = void 0, "score_change" == this.selectedEvent.type && this.scoreEvent(n, 1), this.goalAgainstSelf && this.scoreEvent(["home", "away"].find(function (e) {
          return e != n
        }), 1)
      }, n.prototype.processRegularEvent = function (n) {
        this.modalRegularMode = !0, this.selectedEvent = t({}, n, {
          period: this.currentPeriod
        })
      }, n.prototype.processRefereeEvent = function (n) {
        this.processRegularEvent(n)
      }, n.prototype.processShortcutEvent = function (n, e, l) {
        var t = this;
        this.selectedTeam = e, this.selectedPlayer = l, this.modalShortcutMode = !0, "injury" == n ? (l.injured ? this.formatShortcutEvent("Injury Return", "injury_return") : this.formatShortcutEvent("Injury", "injury"), this.canContinue().subscribe(function (n) {
          return l.injured = !l.injured
        })) : "yellow_card" == n ? (l.yellow_card ? this.formatShortcutEvent("Yellow Red Card", "yellow_red_card") : this.formatShortcutEvent("Yellow Card", "yellow_card", "yellow_red_card"), this.canContinue().subscribe(function (n) {
          l.yellow_card++, l.yellow_card > 1 && l.red_card++, l.red_card > 0 && (l.end_time = (new Date).toISOString().substring(11, 19)), t.updateOnFieldPlayers()
        })) : "red_card" == n ? (l.red_card ? (this.formatShortcutEvent("Cancel Red Card", "red_card", "yellow_red_card"), this.selectedEvent.instruction_only = !0, this.selectedEvent.cancelled = !0, this.canContinue().subscribe(function (n) {
          l.red_card = 0, l.end_time = null
        })) : (this.formatShortcutEvent("Red Card", "red_card", "yellow_red_card"), this.canContinue().subscribe(function (n) {
          l.red_card = 1, l.end_time = (new Date).toISOString().substring(11, 19)
        })), this.updateOnFieldPlayers()) : "score" == n && this.scoreEvent(e, 1)
      }, n.prototype.scoreEvent = function (n, e) {
        this.modalShortcutMode = !1, this.modalRegularMode = !0, this.selectedTeam = n;
        var l = {
          home: this.home_score,
          away: this.away_score
        };
        l[n] = l[n] + e, l[n] < 0 ? this.resetSelection() : (this.selectedEvent = {
          name: this.match.home_team.short_name + ": " + l.home + " - " + l.away + " " + this.match.away_team.short_name,
          type: "score_change",
          team: n,
          period: this.currentPeriod,
          home_score: l.home,
          away_score: l.away
        }, e < 0 && (this.selectedEvent.instruction_only = !0, this.selectedEvent.cancelled = !0, this.selectedEvent.ignore_team = !0, this.selectedEvent.ignore_assist = !0), this.scoreDisplayCallback(l))
      }, n.prototype.periodEvent = function (n) {
        if ("period_start" == n) {
          var e = this.currentPeriod + 1;
          this.selectedEvent = {
            image: "../../utils/play",
            name: "period " + e + " has started",
            type: n,
            period: e
          }
        } else if ("break_start" == n && this.currentPeriod > 0) this.selectedEvent = {
          image: "../../utils/pause",
          name: "period " + this.currentPeriod + " is over. The game is paused.",
          type: n,
          period: this.currentPeriod
        };
        else {
          if (!("match_ended" == n && this.currentPeriod > 0)) return void this.resetSelection();
          this.selectedEvent = {
            image: "../../utils/stop",
            name: "The game is over.",
            type: n,
            period: this.currentPeriod
          }
        }
        this.selectedEvent.ignore_team = !0, this.selectedEvent.ignore_player = !0, this.modalShortcutMode = !0, this.canValidate = !0, this.periodDisplayCallback(n)
      }, n.prototype.augmentEvent = function () {
        switch (this.selectedEvent.type) {
          case "video_assistance":
            this.selectedEvent.subject = this.selectedRefereeEventSubject;
            break;
          case "substitution":
            var n = this.selectedPlayerIn,
              e = this.selectedPlayer;
            this.selectedPlayer && (this.selectedEvent.player_out = {
              id: this.selectedPlayer.id
            }), this.selectedPlayerIn && (this.selectedEvent.player_in = {
              id: this.selectedPlayerIn.id
            }), this.substitutionCallback(n, e);
            break;
          case "score_change":
            var l = this.selectedPlayer,
              t = this.selectedEvent.cancelled;
            this.selectedEvent.goal_scorer = {
              id: this.selectedPlayer.id
            }, this.goalAgainstSelf || this.selectedPlayer.teamSide != this.selectedTeam ? (this.selectedEvent.goal_scorer.method = "own_goal", this.canContinue().subscribe(function (n) {
              return l.own_goal += t ? -1 : 1
            })) : this.canContinue().subscribe(function (n) {
              return l.goal += t ? -1 : 1
            }), this.selectedPlayerAssist && (this.selectedEvent.assist = {
              id: this.selectedPlayerAssist.id
            });
            break;
          case "shot_on_target":
            var o = {
              type: "shot_saved",
              team: "home" == this.selectedTeam ? "away" : "home",
              period: this.currentPeriod
            };
            return this.selectedPlayer && (this.selectedEvent.player = {
              id: this.selectedPlayer.id
            }), [{
              match: this.match_id,
              data: this.selectedEvent
            }, {
              match: this.match_id,
              data: o
            }];
          default:
            this.selectedPlayer && (this.selectedEvent.player = {
              id: this.selectedPlayer.id
            })
        }
        return delete this.selectedEvent.name, delete this.selectedEvent.image, delete this.selectedEvent.ignore_player, delete this.selectedEvent.ignore_assist, delete this.selectedEvent.ignore_team, {
          match: this.match_id,
          data: this.selectedEvent
        }
      }, n.prototype.validateSelection = function () {
        var n = this,
          e = this.selectedEvent.name;
        if (("match_ended" == this.selectedEvent.type || this.selectedEvent.instruction_only) && !confirm("ATTENTION ! \nCETTE COMMANDE EST IRR\xc9VERSIBLE.\n\xcaTES VOUS S\xdbR DE VOULOIR CONTINUER ?\n")) return alert("VOUS VENEZ D'ANNULER VOTRE ACTION !"), this.notificationService.addNotification({
          type: "warning",
          message: "<b>ATTENTION:</b><br>L'\xe9venement \"" + e + "\" <u>N'A PAS \xc9T\xc9 ENVOY\xc9 !</u>",
          ttl: 1e4
        }), void this.resetSelection();
        var l = this.augmentEvent(),
          t = this.matchService.sendEvent(l).catch(function (n) {
            return a.Observable.throw(n.error)
          });
        this.pendingRequest = !0, t.subscribe(function (t) {
          console.log("JUST SENT:", l), n.pendingRequest = !1, n.notificationService.addNotification({
            type: "success",
            message: "Successfully sent event : " + e,
            ttl: 1e3
          }), n.isSuccessfullySent$.next(!0), n.resetSelection()
        }, function (e) {
          n.pendingRequest = !1, n.notificationService.addNotification({
            type: "error",
            message: "<b> Could not send event: </b>" + c.formatJsonErrorAsList(e) + " !"
          }), n.isSuccessfullySent$.next(!1), n.resetSelection()
        })
      }, n.prototype.resetSelection = function () {
        this.modalRegularMode = !1, this.modalShortcutMode = !1, this.canValidate = !1, this.selectedTeam = void 0, this.selectedEvent = void 0, this.selectedPlayer = void 0, this.selectedPlayerIn = void 0, this.selectedPlayerAssist = void 0, this.goalAgainstSelf = !1, this.selectedRefereeEventSubject = !1, this.isSuccessfullySent$.next(!1)
      }, n.prototype.updateOnFieldPlayers = function () {
        var n = this,
          e = s.getSortedRoles(),
          l = this.match.players.filter(function (n) {
            return !n.end_time || n.red_card
          });
        l.sort(function (n, l) {
          return e.indexOf(n.player_role.name) - e.indexOf(l.player_role.name)
        }), this.matchPlayers = {
          homePlayers: [],
          awayPlayers: [],
          homeSubstitutes: [],
          awaySubstitutes: []
        }, l.map(function (e) {
          e.team_id == n.match.home_team.id ? ("SUB" == e.player_role.acronym ? n.matchPlayers.homeSubstitutes.push(e) : n.matchPlayers.homePlayers.push(e), e.teamSide = "home") : e.team_id == n.match.away_team.id && ("SUB" == e.player_role.acronym ? n.matchPlayers.awaySubstitutes.push(e) : n.matchPlayers.awayPlayers.push(e), e.teamSide = "away")
        })
      }, n.prototype.formatShortcutEvent = function (n, e, l) {
        void 0 === l && (l = null), this.selectedEvent = {
          name: n,
          type: e,
          team: this.selectedTeam,
          period: this.currentPeriod,
          player: {
            id: this.selectedPlayer.id
          }
        }, l && (this.selectedEvent.image = l)
      }, n.prototype.getFrameFromTimeDiff = function () {
        var n = new Date,
          e = new Date(this.matchStartTime);
        return Math.floor(this.matchStartFrame + this.fpsVideo * (n - e) / 1e3)
      }, n.prototype.syncScoreAndPeriod = function () {
        var n = this,
          e = this.matchService.getTimeline(this.match_id).map(function (e) {
            var l, t, o = e.length;
            if (!(o < 1))
              for (var i = o - 1; i >= 0; i--) {
                var u = e[i].period;
                if (!l && u && (n.currentPeriod = l = u), t || "score_change" != e[i].type || (n.away_score = (t = e[i]).away_score, n.home_score = t.home_score), l && t) break
              }
          }),
          l = this.matchService.whenInit().map(function () {
            if (!(n.matchService.instructions.length < 1)) {
              var e = n.matchService.instructions.find(function (n) {
                return "period" == n.subject && "period_1" == n.name
              });
              e && (n.matchStartTime = e.timestamp, n.matchStartFrame = e.frame)
            }
          });
        a.Observable.forkJoin(e, l).subscribe(function () {
          var e = n.getFrameFromTimeDiff();
          n.currentFrame$.next(e), console.log("updating Scoreboard : ", e), n.stream.lastCameraFrame = e + 1, n.eventService.instruction$.next({
            home_score: n.home_score,
            away_score: n.away_score,
            frame: e,
            subject: "score"
          })
        })
      }, n.prototype.getMatchData = function () {
        var n = this;
        return this.compositionService.getMatch(this.match_id, "en").flatMap(function (e) {
          return n.match = e, a.Observable.of([])
        })
      }, n.prototype.periodDisplayCallback = function (n) {
        var e, l = this.getFrameFromTimeDiff();
        "period_start" == n ? (this.currentPeriod++, e = {
          start: l,
          subject: "period",
          name: "period_" + this.currentPeriod
        }) : "break_start" == n ? e = {
          end: l,
          subject: "period",
          name: "period_" + this.currentPeriod
        } : "match_ended" == n && (e = {
          end: l,
          subject: "period",
          name: "period_" + this.currentPeriod
        }), this.stream.lastCameraFrame = l + 1, this.eventService.instruction$.next(e)
      }, n.prototype.scoreDisplayCallback = function (n, e) {
        void 0 === e && (e = this.getFrameFromTimeDiff()), this.home_score = n.home, this.away_score = n.away, this.stream.lastCameraFrame = e + 1, this.eventService.instruction$.next({
          home_score: this.home_score,
          away_score: this.away_score,
          frame: e,
          subject: "score"
        })
      }, n.prototype.substitutionCallback = function (n, e) {
        e && (e.end_time = (new Date).toISOString().substring(11, 19)), n && (n.player_role.acronym = e ? e.player_role.acronym : "UKN", n.player_role.name = e ? e.player_role.name : "UNKNOWN", n.start_time = (new Date).toISOString().substring(11, 19)), this.updateOnFieldPlayers()
      }, n.prototype.canShowValidationButton = function () {
        var n = !0;
        return this.selectedEvent && "substitution" === this.selectedEvent.type ? n = !!this.selectedPlayer && !!this.selectedPlayerIn : this.selectedEvent && this.referee_events.map(function (n) {
          return n.type
        }).indexOf(this.selectedEvent.type) > -1 ? n = !!this.selectedRefereeEventSubject : this.selectedEvent && "score_change" === this.selectedEvent.type && (n = !!this.selectedPlayer), n && !this.pendingRequest && (this.selectedTeam || this.selectedPlayer || this.canValidate)
      }, n.prototype.neededAdditionalPlayer = function () {
        var n = null;
        return "substitution" == this.selectedEvent.type && (n = {
          roleOnField: this.selectedTeam + "Substitutes",
          label: "Player In"
        }), this.goalAgainstSelf || "score_change" != this.selectedEvent.type || this.selectedEvent.ignore_assist || (n = {
          roleOnField: this.selectedTeam + "Players",
          label: "Assist"
        }), n
      }, n.prototype.neededRefereeSubject = function () {
        return this.selectedEvent && this.referee_events.map(function (n) {
          return n.type
        }).indexOf(this.selectedEvent.type) > -1
      }, n.prototype.enabledRegularPlayer = function () {
        var n = this,
          e = null;
        if (this.selectedEvent && !this.selectedEvent.ignore_player)
          if ("score_change" == this.selectedEvent.type && this.selectedEvent.cancelled) {
            var l = ["home", "away"].find(function (e) {
                return e != n.selectedTeam
              }),
              t = this.matchPlayers[l + "Players"].filter(function (n) {
                return n.own_goal > 0
              }),
              o = this.matchPlayers[this.selectedTeam + "Players"].filter(function (n) {
                return n.goal > 0
              });
            e = t.concat(o)
          } else "score_change" == this.selectedEvent.type && this.goalAgainstSelf ? (l = ["home", "away"].find(function (e) {
            return e != n.selectedTeam
          }), e = this.matchPlayers[l + "Players"]) : e = this.matchPlayers[this.selectedTeam + "Players"];
        return e
      }, n.prototype.commandThroughKeyboard = function () {
        var n = this;
        document.addEventListener("keyup", function (e) {
          96 == e.keyCode && n.selectedEvent ? n.setTeam("home") : 110 == e.keyCode && n.selectedEvent ? n.setTeam("away") : e.keyCode > 96 && e.keyCode < 106 ? n.processRegularEvent(n.events_groups[Math.floor((e.keyCode - 97) / 4)].items[(e.keyCode - 97) % 4]) : 13 == e.keyCode && !n.pendingRequest && (n.selectedTeam || n.selectedPlayer || n.canValidate) ? n.validateSelection() : 45 != e.keyCode && 27 != e.keyCode || n.resetSelection()
        })
      }, o([d, i("design:type", Function), i("design:paramtypes", [Object]), i("design:returntype", void 0)], n.prototype, "periodDisplayCallback", null), o([d, i("design:type", Function), i("design:paramtypes", [Object, Object]), i("design:returntype", void 0)], n.prototype, "scoreDisplayCallback", null), o([d, i("design:type", Function), i("design:paramtypes", [Object, Object]), i("design:returntype", void 0)], n.prototype, "substitutionCallback", null), n
    }(), e.callbackMethod = d
  },
  "//3A": function (n, e, l) {
    "use strict";
    e.styles = ["@import url(https://fonts.googleapis.com/css?family=Saira+Semi+Condensed|Saira+Condensed:700);.absolute-wrapper[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;top:0;left:0;z-index:10000}.close-x[_ngcontent-%COMP%]{z-index:54;cursor:pointer;position:absolute;font-size:2vw;font-weight:900;right:1%;top:2%}.compo-wrapper[_ngcontent-%COMP%]{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;width:100%;height:100%;top:0;left:0;z-index:1000;-webkit-box-shadow:inset 0 0 90px 15px rgba(0,0,0,.6);box-shadow:inset 0 0 90px 15px rgba(0,0,0,.6)}.compo-container[_ngcontent-%COMP%]{width:96%;height:94%;top:3%;left:2%;position:absolute;color:#fbf9f1;background-color:rgba(0,0,0,.6);z-index:1;-ms-flex-pack:distribute;justify-content:space-around}.fullPerspective[_ngcontent-%COMP%]{width:86%;height:100%;top:3%;left:7%;background-color:rgba(25,25,25,.3);-webkit-box-shadow:0 0 90px 15px rgba(25,25,25,.3);box-shadow:0 0 90px 15px rgba(25,25,25,.3)}.embeddable-container[_ngcontent-%COMP%]{position:relative;height:100%;margin:auto;max-width:800px}.full-width-canvas[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:auto;overflow:hidden}.embeddable-container[_ngcontent-%COMP%]   .skc-btn[_ngcontent-%COMP%]{position:absolute;top:0;left:0}.scoreboard-positionner[_ngcontent-%COMP%]{position:relative;display:block;width:100%;background-color:#000;height:calc(.07 * 100vw);max-height:56px;overflow:hidden}.minimap-positionner[_ngcontent-%COMP%]{width:100%;display:block;overflow:hidden;height:auto;position:relative;z-index:1}@media (max-width:800px) and (orientation:landscape){.full-width-canvas[_ngcontent-%COMP%]{max-width:calc(100vh * 1.3888876350307424);overflow:hidden}.scoreboard-positionner[_ngcontent-%COMP%]{height:calc(100vh * .07 * 1.3888876350307424)}}@media (max-height:576.00052px) and (orientation:landscape){.full-width-canvas[_ngcontent-%COMP%]{max-width:calc(100vh * 1.3888876350307424);overflow:hidden}.scoreboard-positionner[_ngcontent-%COMP%]{height:calc(100vh * .07 * 1.3888876350307424)}}@media (max-height:456.62497496px) and (orientation:landscape){.full-width-canvas-full-perspective[_ngcontent-%COMP%]{max-width:calc(100vh * 1.7519847662043324);overflow:hidden}.scoreboard-positionner-full-perspective[_ngcontent-%COMP%]{height:calc(100vh * .07 * 1.7519847662043324)}}@media (max-width:800px) and (orientation:landscape){.full-width-canvas-full-perspective[_ngcontent-%COMP%]{max-width:calc(100vh * 1.7519847662043324);overflow:hidden}.scoreboard-positionner-full-perspective[_ngcontent-%COMP%]{height:calc(100vh * .07 * 1.7519847662043324)}}"]
  },
  0: function (n, e, l) {
    n.exports = l("CUXk")
  },
  "0NEb": function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
      for (var e, l = 1, t = arguments.length; l < t; l++)
        for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
      return n
    };
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var o = l("WT6e"),
      i = (l("7DMc"), l("YaPU")),
      u = l("e5zT"),
      a = l("g5jc"),
      r = (l("j+m6"), l("6Y8j"), l("Zkkf"), l("Zn+w")),
      s = l("FjE5"),
      c = (l("6sdY"), l("BAgd"), l("D4Le")),
      d = (l("pll1"), l("wBdC")),
      p = l("zvWE"),
      m = l("FjE5");
    e.CreateTeamComponent = function () {
      function n(n, e, l, t, i, a) {
        this.teamsService = n, this.rolesService = e, this.compositionsService = l, this.seasonsService = t, this.notificationService = i, this.parentForm = a, this.teamChange = new o.EventEmitter, this.playersChange = new o.EventEmitter, this.colorKitChange = new o.EventEmitter, this.coachChange = new o.EventEmitter, this.isUpdateModeChange = new o.EventEmitter, this.teamOptions$ = new u.ReplaySubject(1), this.roleOptions$ = new u.ReplaySubject(1), this.seasonOptions$ = new u.ReplaySubject(1), this.newSeasonKit = p.getEmptySeasonKit(), this.playerOptionsInitial = [], this.playerOptions = [], this.roleOptions = [], this.seasonKitOptions = [], this.teamLongName = "", this.isPlayerValid = !0, this.setDefaultPlayer()
      }
      return n.prototype.onJerseyColorChange = function () {
        m.distBetweenColors(this.newSeasonKit.kit_color.jersey_color, this.newSeasonKit.kit_color.number_color) < 180 && (this.newSeasonKit.kit_color.number_color = this.blackOrWhiteText(this.newSeasonKit.kit_color.jersey_color))
      }, n.prototype.getIsPlayerValid = function () {
        return null !== this.player.id && null !== this.player.player_role.id && null !== this.player.number && void 0 !== this.player.number && "" != this.player.last_name
      }, n.prototype.formatPlayerName = function (n) {
        return n.last_name + " " + n.first_name
      }, Object.defineProperty(n.prototype, "team", {
        get: function () {
          return this._team
        },
        set: function (n) {
          var e = this;
          if (this._team = n, this._team && !this._team.id && 0 !== this._team.id && (this.teamLongName = void 0, this.seasonKitOptions = void 0, this.playerOptions = void 0), this.isUpdateMode && this._team) {
            this.teamLongName = this._team.name;
            var l = new a.Subject;
            this.teamOptions$.map(function (n) {
              return e._team = n.find(function (n) {
                return n.id === e._team.id
              }), e._team
            }).flatMap(function (n) {
              return n ? e.teamsService.getTeamDetails(n.id) : (console.log("discarding team"), i.Observable.from([]))
            }).subscribe(l), this.fillTeamDetails(l), setTimeout(function () {
              e.teamChange.emit(e._team)
            }, 0)
          }
        },
        enumerable: !0,
        configurable: !0
      }), n.prototype.ngOnInit = function () {
        var n = this;
        this.teamsService.getTeams().subscribe(this.teamOptions$), this.rolesService.getRoles().subscribe(this.roleOptions$), this.seasonsService.getSeasons("-start_date").subscribe(this.seasonOptions$), this.roleOptions$.subscribe(function (e) {
          n.roleOptions = e
        })
      }, n.prototype.ngAfterViewInit = function () {
        var n = this;
        this.controls.forEach(function (e) {
          n.parentForm.addControl(e)
        })
      }, n.prototype.addPlayer = function () {
        this.isPlayerValid = this.getIsPlayerValid(), this.isPlayerValid && (this.players.push(t({}, this.player, {
          player_role: t({}, this.player.player_role)
        })), this.updatePlayerOptions())
      }, n.prototype.setDefaultPlayer = function () {
        this.playerOptions && this.playerOptions.length ? (this.player = this.playerOptions[0], console.log("Setting default player to", this.player)) : this.player = new d.Player
      }, n.prototype.deletePlayer = function (n) {
        this.players.splice(n, 1), this.updatePlayerOptions()
      }, n.prototype.fillTeamDetails = function (n) {
        var e = this;
        this.playerOptions$ = new a.Subject;
        var l = new a.Subject,
          o = new a.Subject;
        n.map(function (n) {
          return n.season_kits
        }).subscribe(l), l.subscribe(function (n) {
          e.seasonKitOptions = n.sort(function (n, e) {
            return e.season.name.localeCompare(n.season.name)
          }), e.updateCheckedSeasonKitRadioButton()
        }), n.map(function (n) {
          return n.coach
        }).subscribe(o), o.subscribe(function (n) {
          n && (n.id || 0 === n.id) && (!e.coach || e.coach.id && -1 == e.coach.id) && (console.log("Updating coach from team as no value coming from match."), e.coach = n, e.coachChange.emit(e.coach))
        }), n.map(function (n) {
          return n.players.map(function (n) {
            return t({}, n, {
              number: n.usual_number,
              player_role: n.usual_role ? n.usual_role : {
                name: "",
                id: null
              }
            })
          }).sort(function (n, l) {
            return e.formatPlayerName(n).localeCompare(e.formatPlayerName(l))
          })
        }, function (n) {
          return console.log(n)
        }).subscribe(this.playerOptions$), this.playerOptions$.subscribe(function (n) {
          e.playerOptionsInitial = n, e.updatePlayerOptions()
        })
      }, n.prototype.onTeamSelected = function (n) {
        var e = this;
        void 0 === n && (n = !0);
        var l = new a.Subject;
        this.teamOptions$.map(function (n) {
          return e.team = n.find(function (n) {
            return n.name === e.teamLongName
          }), e.teamChange.emit(e.team), e.team
        }).flatMap(function (l) {
          return l ? (n && e.fetchLatestMatchInfo(l.id), e.teamsService.getTeamDetails(l.id)) : i.Observable.from([])
        }).subscribe(l), this.fillTeamDetails(l)
      }, n.prototype.onRoleSelected = function (n, e) {
        void 0 === e && (e = null), null !== e ? this.players[e].player_role = this.roleOptions.find(function (e) {
          return e.name === n
        }) : this.player.player_role = this.roleOptions.find(function (e) {
          return e.name === n
        })
      }, n.prototype.onSeasonKitSelected = function (n) {
        this.colorKitChange.emit(this.colorKit)
      }, n.prototype.updateCheckedSeasonKitRadioButton = function () {
        var n = this;
        if (this.colorKit && void 0 != this.colorKit.id && this.seasonKitOptions && this.seasonKitOptions.length > 0) {
          var e = this.seasonKitOptions.map(function (n) {
            return n.kit_color
          }).find(function (e) {
            return e.id === n.colorKit.id
          });
          e && (this.colorKit = e, this.colorKitChange.emit(this.colorKit))
        }
      }, n.prototype.blackOrWhiteText = function (n) {
        var e = s.hexToRgb(n),
          l = e[0];
        return void 0 !== l && (l + e[1] + e[2]) / 3 < 128 ? "#ffffff" : "#000000"
      }, n.prototype.fetchLatestMatchInfo = function (n) {
        var e = this;
        this.compositionsService.getLatestMatch(n).subscribe(function (n) {
          if (e.players = [], e.playersChange.emit(e.players), n) {
            e.colorKit = e.team.id === n.home_team.id ? n.home_team_kit_color : n.away_team_kit_color;
            for (var l = 0, t = n.players; l < t.length; l++) {
              var o = t[l];
              o.team_id === e.team.id && ("00:00:00" !== o.start_time && (o.player_role = {
                id: 17,
                name: "Substitute",
                acronym: "SUB"
              }, o.start_time = void 0), o.end_time = void 0, o.yellow_card = 0, o.red_card = 0, o.goal = 0, o.own_goal = 0, o.injured = !1, e.players.push(o))
            }
            e.sortPlayersByRole(), e.updatePlayerOptions(), e.updateCheckedSeasonKitRadioButton()
          } else e.colorKit = {
            id: ""
          }, e.colorKitChange.emit(e.colorKit)
        })
      }, n.prototype.sortPlayersByRole = function () {
        var n = r.getSortedRoles();
        this.players = this.players.sort(function (e, l) {
          return n.indexOf(e.player_role.name) - n.indexOf(l.player_role.name)
        })
      }, n.prototype.updatePlayerOptions = function () {
        var n = this;
        this.playerOptions = this.playerOptionsInitial.filter(function (e) {
          return n.players.findIndex(function (n) {
            return n.id === e.id
          }) < 0
        }), this.setDefaultPlayer()
      }, n.prototype.isNewSeasonKitValid = function () {
        return this.team && void 0 != this.team.id && "" !== this.team.id && "" !== this.newSeasonKit.name && void 0 != this.newSeasonKit.season_id && "" !== this.newSeasonKit.kit_color.jersey_color && "" !== this.newSeasonKit.kit_color.short_color
      }, n.prototype.createTeamSeasonKit = function () {
        var n = this;
        this.newSeasonKit.team = this.team.id, this.teamsService.createTeamSeasonKit(this.newSeasonKit).subscribe(function (e) {
          n.teamsService.getTeamSeasonKits(n.team.id).subscribe(function (l) {
            n.seasonKitOptions = l.sort(function (n, e) {
              return e.season.name.localeCompare(n.season.name)
            }), n.colorKit = e.kit_color, n.updateCheckedSeasonKitRadioButton(), n.seasonKitTabs.tabs[0].active = !0
          }), n.newSeasonKit = p.getEmptySeasonKit()
        }, function (e) {
          n.notificationService.addNotification({
            type: "error",
            message: "Could not create season kit: " + c.formatJsonErrorAsList(e),
            ttl: 2e3
          })
        })
      }, n.prototype.countOnField = function (n) {
        return n.filter(function (n) {
          return "SUB" != n.player_role.acronym
        }).length
      }, n.prototype.checkTeamIntegrity = function () {
        p.checkFormIntegrity(this.team, this.teamLongName, this.notificationService) || (this.teamLongName = "")
      }, n
    }()
  },
  "4EQH": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("D4Le"),
      o = l("FjE5");
    e.X_CENTER = 960, e.Y_CENTER = 624, e.ZOOM_SCALING_FACTOR = 1.54, e.ZOOM_ROTATION = "90deg", e.CAMERA_LIMITS = 545 * e.ZOOM_SCALING_FACTOR, e.KALMAN_PARAMETERS = {
      R: .011,
      Q: 10,
      C: 2
    }, e.coordinatesToHQField = function (n, e) {
      return {
        x: 3.299 * n + 9.5238,
        y: 3.2566 * e - 11.416
      }
    }, e.rawCoordinatesToPerspective = function (n, e) {
      var l = -5304e-7 * e + 1.0018593;
      return {
        x: (2.3462 * n + -.51037 * e + 287.262442) / l,
        y: (1.46748 * e + 180.8057) / l
      }
    }, e.rawCoordinatesToFullPerspective = function (n, e) {
      var l = -5349e-7 * e + 1.001875;
      return {
        x: (2.34684 * n - .51626 * e + 286.56481) / l,
        y: (44216e-8 * n + 1.5244 * e + 76.75621) / l
      }
    }, e.rawCoordinatesToRotate = function (n, e) {
      return {
        x: 1938.54064 - 5.01424 * e,
        y: 5.08046 * n - 839.73335
      }
    }, e.HQCoordinatesToPerspective = function (n, e) {
      var l = -16287e-8 * e + 1;
      return {
        x: (.7112 * n + -.15672 * e + 278.7) / l,
        y: (.45062 * e + 185.95) / l
      }
    }, e.PerspectiveToHQCoordinates = function (n, e) {
      var l = 36143e-8 * e + 1;
      return {
        x: (1.5006 * n + .34738 * e - 482.8) / l,
        y: (2.2192 * e - 412.65) / l
      }
    }, e.HQCoordinatesToFullPerspective = function (n, e) {
      var l = -16426e-8 * e + 1;
      return {
        x: (.71138 * n + -.15853 * e + 277.98) / l,
        y: (13403e-8 * n + .46812 * e + 82.099) / l
      }
    }, e.rotateCoordinates = function (n, l) {
      return {
        x: e.ZOOM_SCALING_FACTOR * (e.Y_CENTER - l) + e.X_CENTER,
        y: e.ZOOM_SCALING_FACTOR * (n - e.X_CENTER) + e.Y_CENTER
      }
    }, e.reverseRotateCoordinates = function (n, l) {
      return {
        x: 1 / e.ZOOM_SCALING_FACTOR * (l - e.Y_CENTER) + e.X_CENTER,
        y: 1 / e.ZOOM_SCALING_FACTOR * (e.X_CENTER - n) + e.Y_CENTER
      }
    }, e.setBlur = function (n, e) {
      this.removeBlur(n), e < 2 || n.parentNode.classList.add("motion-blur-" + (e > 6 ? 1 : 0))
    }, e.removeBlur = function (n) {
      t.range(0, 3).map(function (e) {
        return n.parentNode.classList.remove("motion-blur-" + e)
      })
    }, e.setBallRotationSpeed = function (n, e) {
      n.style.animationDuration = (e > 6 ? 1.5 : e < 2 ? 0 : 24 / (1.5 * (e - 2) / 4)) + "s"
    }, e.setStyle = function (n, e) {
      n.fillStyle = e, n.strokeStyle = e
    }, e.getColoredProtoFlat = function (n, e, l, t) {
      return void 0 === t && (t = "#FFFFFF"), "data:image/svg+xml;utf8," + encodeURIComponent('<?xml version="1.0" encoding="utf-8"?>\n\x3c!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<svg version="1.1" id="palet10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve" height="' + e + '" width="' + e + '">\n<style type="text/css">\n\t.st0{fill:url(#ombre-portee_2_);}\n\t.st1{fill:#F4F4F4;}\n\t.st2{fill:url(#SVGID_1_);}\n\t.st3{fill:' + n + ';}\n\t.st4{fill:url(#reflet-maillot_2_);}\n\t.st5{fill:url(#SVGID_2_);}\n</style>\n<g id="ombre-portee_1_">\n\t<radialGradient id="ombre-portee_2_" cx="149.6667" cy="150.3773" r="150" gradientUnits="userSpaceOnUse">\n\t\t<stop  offset="0" style="stop-color:#000000"/>\n\t\t<stop  offset="0.6" style="stop-color:#000000;stop-opacity:0.5"/>\n\t\t<stop  offset="1" style="stop-color:#000000;stop-opacity:0"/>\n\t</radialGradient>\n\t<circle id="ombre-portee" class="st0" cx="149.7" cy="150.4" r="150"/>\n</g>\n<g id="base_1_">\n\t<circle id="base" class="st1" cx="149.7" cy="120.5" r="120"/>\n</g>\n<g id="bevel-base_1_">\n\t<g id="bevel-base">\n\t\t<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="149.6667" y1="240.5" x2="149.6667" y2="0.5">\n\t\t\t<stop  offset="0" style="stop-color:#000000;stop-opacity:0.3"/>\n\t\t\t<stop  offset="0.163" style="stop-color:#030303;stop-opacity:0.2511"/>\n\t\t\t<stop  offset="0.2935" style="stop-color:#0D0D0D;stop-opacity:0.2119"/>\n\t\t\t<stop  offset="0.4128" style="stop-color:#1E1E1E;stop-opacity:0.1762"/>\n\t\t\t<stop  offset="0.5254" style="stop-color:#363636;stop-opacity:0.1424"/>\n\t\t\t<stop  offset="0.6335" style="stop-color:#555555;stop-opacity:0.11"/>\n\t\t\t<stop  offset="0.7379" style="stop-color:#7A7A7A;stop-opacity:7.862356e-02"/>\n\t\t\t<stop  offset="0.8396" style="stop-color:#A7A7A7;stop-opacity:4.811057e-02"/>\n\t\t\t<stop  offset="0.9365" style="stop-color:#DADADA;stop-opacity:1.904610e-02"/>\n\t\t\t<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>\n\t\t</linearGradient>\n\t\t<path class="st2" d="M149.7,9.5c29.6,0,57.5,11.5,78.5,32.5c21,21,32.5,48.8,32.5,78.5S249.1,178,228.2,199\n\t\t\tc-21,21-48.8,32.5-78.5,32.5S92.1,220,71.2,199c-21-21-32.5-48.8-32.5-78.5S50.2,63,71.2,42C92.1,21,120,9.5,149.7,9.5 M149.7,0.5\n\t\t\tc-66.3,0-120,53.7-120,120s53.7,120,120,120s120-53.7,120-120S215.9,0.5,149.7,0.5L149.7,0.5z"/>\n\t</g>\n</g>\n<g id="maillot_1_">\n\t<circle id="maillot" class="st3" cx="149.7" cy="120.4" r="97.5"/>\n</g>\n<g id="reflet-maillot_1_">\n\t<linearGradient id="reflet-maillot_2_" gradientUnits="userSpaceOnUse" x1="149.6667" y1="22.5" x2="149.6667" y2="217.5">\n\t\t<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.3"/>\n\t\t<stop  offset="0.9095" style="stop-color:#FFFFFF;stop-opacity:2.714938e-02"/>\n\t\t<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>\n\t</linearGradient>\n\t<circle id="reflet-maillot" class="st4" cx="149.7" cy="120" r="97.5"/>\n</g>\n<g id="bevel-maillot_1_">\n\t<g id="bevel-maillot">\n\t\t<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="149.6667" y1="22.5" x2="149.6667" y2="217.5">\n\t\t\t<stop  offset="0" style="stop-color:#000000;stop-opacity:0.2"/>\n\t\t\t<stop  offset="0.163" style="stop-color:#030303;stop-opacity:0.1674"/>\n\t\t\t<stop  offset="0.2935" style="stop-color:#0D0D0D;stop-opacity:0.1413"/>\n\t\t\t<stop  offset="0.4128" style="stop-color:#1E1E1E;stop-opacity:0.1174"/>\n\t\t\t<stop  offset="0.5254" style="stop-color:#363636;stop-opacity:9.491296e-02"/>\n\t\t\t<stop  offset="0.6335" style="stop-color:#555555;stop-opacity:7.330532e-02"/>\n\t\t\t<stop  offset="0.7379" style="stop-color:#7A7A7A;stop-opacity:5.241570e-02"/>\n\t\t\t<stop  offset="0.8396" style="stop-color:#A7A7A7;stop-opacity:3.207372e-02"/>\n\t\t\t<stop  offset="0.9365" style="stop-color:#DADADA;stop-opacity:1.269740e-02"/>\n\t\t\t<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>\n\t\t</linearGradient>\n\t\t<path class="st5" d="M149.7,31.5c48.8,0,88.5,39.7,88.5,88.5s-39.7,88.5-88.5,88.5c-48.8,0-88.5-39.7-88.5-88.5\n\t\t\tS100.9,31.5,149.7,31.5 M149.7,22.5c-53.8,0-97.5,43.7-97.5,97.5s43.7,97.5,97.5,97.5c53.8,0,97.5-43.7,97.5-97.5\n\t\t\tS203.5,22.5,149.7,22.5L149.7,22.5z"/>\n\t</g>\n</g>\n<g style=\'fill: ' + t + "'>\n" + l + "\n</g>\n</svg>")
    }, e.getColoredProtoPerspective = function (n, e, l, t) {
      return void 0 === t && (t = "#FFFFFF"), "data:image/svg+xml;utf8," + encodeURIComponent('<?xml version="1.0" encoding="utf-8"?>\n\x3c!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --\x3e\n<svg version="1.1" id="palet10" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 300 237" enable-background="new 0 0 300 237" xml:space="preserve" height="' + e + '" width="' + e + '">\n<radialGradient id="ombre-portee_1_" cx="150" cy="165.3773" r="150" gradientTransform="matrix(1 0 0 0.75 0 0.0943)" gradientUnits="userSpaceOnUse">\n\t<stop  offset="0" style="stop-color:#000000"/>\n\t<stop  offset="0.6" style="stop-color:#000000;stop-opacity:0.5"/>\n\t<stop  offset="1" style="stop-color:#000000;stop-opacity:0"/>\n</radialGradient>\n<ellipse id="ombre-portee" fill="url(#ombre-portee_1_)" cx="150" cy="124.127" rx="150" ry="112.5"/>\n<ellipse id="base" fill="#FFFFFF" cx="149.5" cy="90.377" rx="120" ry="90"/>\n<ellipse id="maillot" fill="' + n + '" cx="149.5" cy="90.377" rx="105" ry="78.75"/>\n<linearGradient id="reflet-maillot_1_" gradientUnits="userSpaceOnUse" x1="149.5" y1="11.6273" x2="149.5" y2="169.1273">\n\t<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.3"/>\n\t<stop  offset="0.9095" style="stop-color:#FFFFFF;stop-opacity:0.0271"/>\n\t<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>\n</linearGradient>\n<ellipse id="reflet-maillot" fill="url(#reflet-maillot_1_)" cx="149.5" cy="90.377" rx="105" ry="78.75"/>\n<g id="bevel-maillot">\n\t<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="149.5" y1="11.6273" x2="149.5" y2="169.1273">\n\t\t<stop  offset="0" style="stop-color:#000000;stop-opacity:0.2"/>\n\t\t<stop  offset="0.163" style="stop-color:#030303;stop-opacity:0.1674"/>\n\t\t<stop  offset="0.2935" style="stop-color:#0D0D0D;stop-opacity:0.1413"/>\n\t\t<stop  offset="0.4128" style="stop-color:#1E1E1E;stop-opacity:0.1174"/>\n\t\t<stop  offset="0.5254" style="stop-color:#363636;stop-opacity:0.0949"/>\n\t\t<stop  offset="0.6335" style="stop-color:#555555;stop-opacity:0.0733"/>\n\t\t<stop  offset="0.7379" style="stop-color:#7A7A7A;stop-opacity:0.0524"/>\n\t\t<stop  offset="0.8396" style="stop-color:#A7A7A7;stop-opacity:0.0321"/>\n\t\t<stop  offset="0.9365" style="stop-color:#DADADA;stop-opacity:0.0127"/>\n\t\t<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>\n\t</linearGradient>\n\t<path fill="url(#SVGID_1_)" d="M149.5,18.556c54.077,0,98.072,32.219,98.072,71.822s-43.995,71.822-98.072,71.822\n\t\tS51.428,129.98,51.428,90.377S95.423,18.556,149.5,18.556 M149.5,11.627c-57.99,0-105,35.258-105,78.75s47.01,78.75,105,78.75\n\t\ts105-35.258,105-78.75S207.49,11.627,149.5,11.627L149.5,11.627z"/>\n</g>\n<g id="epaisseur">\n\t<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="29.5" y1="150.3022" x2="269.5" y2="150.3022">\n\t\t<stop  offset="0.1" style="stop-color:#CCCCCC"/>\n\t\t<stop  offset="0.25" style="stop-color:#FFFFFF"/>\n\t\t<stop  offset="0.5314" style="stop-color:#FAFAFA"/>\n\t\t<stop  offset="0.75" style="stop-color:#F7F7F7"/>\n\t\t<stop  offset="0.9" style="stop-color:#CCCCCC"/>\n\t</linearGradient>\n\t<path fill="url(#SVGID_2_)" d="M149.5,179.377c-66.274,0-120-40.294-120-90v31.85c0,49.706,53.726,90,120,90s120-40.294,120-90\n\t\tv-31.85C269.5,139.083,215.774,179.377,149.5,179.377z"/>\n</g>\n<g style = \'fill: ' + t + ";'>\n\t" + l + "\n</g>\n</svg>")
    }, e.getColoredJersey = function (n, e) {
      return void 0 === e && (e = null), "data:image/svg+xml;utf8," + encodeURIComponent('<svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" ' + (e ? 'height="' + e + 'px" width="' + e + 'px"' : "") + ' viewBox="0 0 200 200" >\n    <defs>\n        <style>.cls-1{fill:#fff;}</style>\n    </defs>\n    <title>maillot</title>\n    <path fill=\'' + n + "' " + (o.distBetweenColors(n, "#000000") < 60 ? 'stroke="white" stroke-width="8" stroke-linecap="round"' : " ") + ' d="M126.81,18A28.34,28.34,0,0,1,100,37.84,28.52,28.52,0,0,1,73,18L0,36.74l15,50,32.55-4.9V182h104.9V81.82L185,86.72l15-50Z"/>\n</svg>')
    }, e.isIOS = function () {
      return /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream
    }, e.Android8Detector = function () {
      function n() {
        this.options = [], this.header = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera], this.dataos = [{
          name: "Windows Phone",
          value: "Windows Phone",
          version: "OS"
        }, {
          name: "Windows",
          value: "Win",
          version: "NT"
        }, {
          name: "iPhone",
          value: "iPhone",
          version: "OS"
        }, {
          name: "iPad",
          value: "iPad",
          version: "OS"
        }, {
          name: "Kindle",
          value: "Silk",
          version: "Silk"
        }, {
          name: "Android",
          value: "Android",
          version: "Android"
        }, {
          name: "PlayBook",
          value: "PlayBook",
          version: "OS"
        }, {
          name: "BlackBerry",
          value: "BlackBerry",
          version: "/"
        }, {
          name: "Macintosh",
          value: "Mac",
          version: "OS X"
        }, {
          name: "Linux",
          value: "Linux",
          version: "rv"
        }, {
          name: "Palm",
          value: "Palm",
          version: "PalmOS"
        }], this.databrowser = [{
          name: "Chrome",
          value: "Chrome",
          version: "Chrome"
        }, {
          name: "Firefox",
          value: "Firefox",
          version: "Firefox"
        }, {
          name: "Safari",
          value: "Safari",
          version: "Version"
        }, {
          name: "Internet Explorer",
          value: "MSIE",
          version: "MSIE"
        }, {
          name: "Opera",
          value: "Opera",
          version: "Opera"
        }, {
          name: "BlackBerry",
          value: "CLDC",
          version: "CLDC"
        }, {
          name: "Mozilla",
          value: "Mozilla",
          version: "Mozilla"
        }], this.init()
      }
      return n.prototype.init = function () {
        var n = this.header.join(" ");
        this.os = this.matchItem(n, this.dataos), this.browser = this.matchItem(n, this.databrowser)
      }, n.prototype.matchItem = function (n, e) {
        var l, t, o, i, u = 0;
        for (l = 0; l < e.length; l += 1)
          if (new RegExp(e[l].value, "i").test(n)) {
            if (t = new RegExp(e[l].version + "[- /:;]([\\d._]+)", "i"), i = "", (o = n.match(t)) && o[1] && (o = o[1]), o)
              for (o = o.split(/[._]+/), u = 0; u < o.length; u += 1) i += 0 === u ? o[u] + "." : o[u];
            else i = "0";
            return {
              name: e[l].name,
              version: i
            }
          }
        return {
          name: "unknown",
          version: 0
        }
      }, n.prototype.isAndroid8 = function () {
        return "Android" == this.os.name && "8" == this.os.version[0]
      }, n
    }()
  },
  "5pge": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("LfZH");

    function o(n) {
      var e = "";
      return n.first_name && n.last_name ? e = n.first_name + " " + n.last_name : (n.first_name || n.last_name) && (e = n.first_name || n.last_name), e
    }
    e.getPeriodsDurations = function (n, e) {
      for (var l = n.pop(), t = 0; l;) t += (l.end - l.start) / (60 * e) > 30 ? 2700 : 900, l = n.pop();
      return t
    }, e.openEventContainer = function (n) {
      n.classList.remove("eventContainerFadeIn"), n.classList.add("eventContainerFadeIn")
    }, e.displayCurrentEvent = function (n) {
      n.nativeElement.classList.remove("hidden", "eventFadeInHorizontal");
      for (var e = 0, l = n.nativeElement.getElementsByTagName("li"); e < l.length; e++)(a = l[e]).classList.add("opaque"), a.classList.remove("eventFadeInVertical");
      for (var t = 1, o = function (n) {
          setTimeout(function () {
            n.classList.add("eventFadeInVertical"), n.classList.remove("opaque")
          }, 150 * t), t++
        }, i = 0, u = n.nativeElement.getElementsByTagName("li"); i < u.length; i++) {
        var a;
        o(a = u[i])
      }
      n.nativeElement.classList.add("current_event", "eventFadeInHorizontal")
    }, e.displayPreviousEvent = function (n) {
      n.nativeElement.classList.remove("eventFadeInHorizontal", "current_event", "eventMoveDown");
      for (var e = 0, l = n.nativeElement.getElementsByTagName("li"); e < l.length; e++) l[e].classList.remove("eventFadeInVertical");
      n.nativeElement.classList.add("eventMoveDown")
    }, e.displayExitEvent = function (n) {
      n.nativeElement.classList.remove("eventMoveDown", "hidden"), n.nativeElement.classList.add("eventFadeAway"), setTimeout(function () {
        n.nativeElement.classList.add("hidden")
      }, 400)
    }, e.displayExitNoop = function (n) {
      var e = this;
      n.nativeElement.classList.remove("noopFadeIn"), n.nativeElement.classList.add("noopFadeOut"), setTimeout(function () {
        return e.isDisplayingNoop = !1
      }, 400)
    }, e.displayEnterNoop = function (n) {
      n.nativeElement.classList.remove("noopFadeOut"), n.nativeElement.classList.add("noopFadeIn")
    }, e.resetEventsDivs = function (n) {
      n.forEach(function (n) {
        return n.nativeElement.classList.value = "event_box hidden"
      })
    }, e.populateEventDiv = function (n, e, l, i, u) {
      var a, r = n.nativeElement.getElementsByClassName("event_icon")[0],
        s = n.nativeElement.getElementsByClassName("event_title")[0],
        c = n.nativeElement.getElementsByClassName("event_team")[0],
        d = n.nativeElement.getElementsByClassName("player_main")[0],
        p = n.nativeElement.getElementsByClassName("player_main_icon")[0],
        m = n.nativeElement.getElementsByClassName("player_second")[0],
        f = n.nativeElement.getElementsByClassName("player_second_icon")[0],
        h = t.translate((e.type || e.title).replace(/_/gi, " "), u),
        g = e.type;
      a = e.team ? i[e.team + "_team"].short_name : "";
      var v = "",
        y = "",
        b = void 0,
        C = void 0;
      switch (n.nativeElement.setAttribute("data-event-src-id", e.src_id), e.type) {
        case "score_change":
          e.goal_scorer && e.goal_scorer.method && "own_goal" === e.goal_scorer.method ? (h = t.translate("own goal !", u), (e.goal_scorer.id || 0 === e.goal_scorer.id) && (b = "own_goal", v = o(i.players.find(function (n) {
            return n.id == e.goal_scorer.id
          })))) : (h = t.translate("goal !", u), e.goal_scorer && (e.goal_scorer.id || 0 === e.goal_scorer.id) && (b = "goal", v = o(i.players.find(function (n) {
            return n.id == e.goal_scorer.id
          }))), e.assist && (e.assist.id || 0 === e.assist.id) && (C = "arrow", y = o(i.players.find(function (n) {
            return n.id == e.assist.id
          }))));
          break;
        case "yellow_card":
        case "red_card":
          g = "yellow_red_card", e.player && (e.player.id || 0 === e.player.id) && (b = e.type, v = o(i.players.find(function (n) {
            return n.id == e.player.id
          })));
          break;
        case "yellow_red_card":
          h = t.translate("red card", u), g = "yellow_red_card", e.player && (e.player.id || 0 === e.player.id) && (b = e.type, v = o(i.players.find(function (n) {
            return n.id == e.player.id
          })));
          break;
        case "substitution":
          e.player_in && (e.player_in.id || 0 === e.player_in.id) && (b = "substitution_in", v = o(i.players.find(function (n) {
            return n.id == e.player_in.id
          }))), e.player_in && (e.player_out.id || 0 === e.player_out.id) && (C = "substitution_out", y = o(i.players.find(function (n) {
            return n.id == e.player_out.id
          })));
          break;
        case "injury":
        case "injury_return":
          e.player && (e.player.id || 0 === e.player.id) && (b = e.type, v = o(i.players.find(function (n) {
            return n.id == e.player.id
          })));
          break;
        case "shot_on_target":
        case "shot_off_target":
        case "offside":
        case "penalty_missed":
        case "corner_kick":
          e.player && (e.player.id || 0 === e.player.id) && (v = o(i.players.find(function (n) {
            return n.id == e.player.id
          })));
          break;
        case "penalty_awarded":
          h = t.translate("penalty", u), e.player && (e.player.id || 0 === e.player.id) && (v = o(i.players.find(function (n) {
            return n.id == e.player.id
          })));
          break;
        case "match_started":
        case "match_ended":
        case "period_start":
        case "break_start":
          g = "whistle";
          break;
        case "goalkeeper_interception":
          h = t.translate("gk interception", u), g = "shot_saved";
          break;
        case "video_assistance":
          "red_card" == e.subject ? (v = "card", b = "../big_icon/yellow_red_card") : "score_change" == e.subject ? (v = "goal", b = "../big_icon/" + e.subject) : "penalty_awarded" == e.subject && (v = "penalty", b = "../big_icon/" + e.subject), "cancelled" === e.status ? g = "video_cancelled" : "validated" === e.status && (g = "video_validated"), v = t.translate(v + " " + ("demanded" == e.status ? "?" : "validated" == e.status ? "confirmed !" : "cancelled !"), u)
      }
      r.src = l.getUrl("events/big_icon/" + g + ".svg"), s.textContent = h.toUpperCase(), c.textContent = a.toUpperCase(), d.textContent = v.toUpperCase(), m.textContent = y.toUpperCase(), b ? (p.src = l.getUrl("events/small_icon/" + b + ".svg"), p.parentNode.style.display = "block") : p.parentNode.style.display = "none", C ? (f.src = l.getUrl("events/small_icon/" + C + ".svg"), f.parentNode.style.display = "block") : f.parentNode.style.display = "none"
    }, e.moveDiv = function (n, e) {
      e.nativeElement.classList = n.nativeElement.classList, e.nativeElement.innerHTML = n.nativeElement.innerHTML
    }
  },
  "6Y8j": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS"), e.RolesService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getRoles = function () {
        return this.httpClient.get("/api/roles").map(function (n) {
          return n.roles
        })
      }, n
    }()
  },
  "6c27": function (n, e, l) {
    "use strict";
    var t = l("aUQL"),
      o = l("WT6e"),
      i = l("Xjw4"),
      u = l("bfOx"),
      a = l("D692"),
      r = l("ItHS"),
      s = l("jDyY"),
      c = l("PakY"),
      d = l("ZBXF"),
      p = o.\u0275crt({
        encapsulation: 0,
        styles: [t.styles],
        data: {}
      });

    function m(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 0, "div", [], null, null, null, null, null))], null, null)
    }

    function f(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(1, 0, null, null, 1, "span", [
        ["class", "badge badge-primary"],
        ["title", "with events"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(2, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "]))], null, function (n, e) {
        n(e, 2, 0, e.parent.context.$implicit.coverage)
      })
    }

    function h(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(1, 0, null, null, 1, "span", [
        ["class", "badge badge-secondary"],
        ["title", "without events"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(2, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "]))], null, function (n, e) {
        n(e, 2, 0, e.parent.context.$implicit.coverage)
      })
    }

    function g(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 24, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(2, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(3, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(5, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(6, null, ["", " - ", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(8, 0, null, null, 8, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275and(16777216, null, null, 1, null, m)), o.\u0275did(11, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"],
        ngIfThen: [1, "ngIfThen"],
        ngIfElse: [2, "ngIfElse"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275and(0, [
        ["premium", 2]
      ], null, 0, null, f)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275and(0, [
        ["classic", 2]
      ], null, 0, null, h)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(18, 0, null, null, 5, "td", [], null, null, null, null, null)), (n()(), o.\u0275eld(19, 0, null, null, 4, "a", [
        ["class", "btn btn-default"]
      ], [
        [1, "target", 0],
        [8, "href", 4]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== o.\u0275nov(n, 20).onClick(l.button, l.ctrlKey, l.metaKey, l.shiftKey) && t), t
      }, null, null)), o.\u0275did(20, 671744, null, 0, u.RouterLinkWithHref, [u.Router, u.ActivatedRoute, i.LocationStrategy], {
        queryParams: [0, "queryParams"],
        routerLink: [1, "routerLink"]
      }, null), o.\u0275pod(21, {
        "hide-score": 0
      }), o.\u0275pad(22, 3), (n()(), o.\u0275ted(-1, null, ["Live"])), (n()(), o.\u0275ted(-1, null, ["\n        "]))], function (n, e) {
        n(e, 11, 0, e.context.$implicit.coverage == e.component.PREMIUM_COVERAGE, o.\u0275nov(e, 13), o.\u0275nov(e, 15)), n(e, 20, 0, n(e, 21, 0, "classic" == e.context.$implicit.coverage ? 1 : 0), n(e, 22, 0, "/match", e.context.$implicit.id, "embeddable"))
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.date_time), n(e, 6, 0, e.context.$implicit.home_team.short_name, e.context.$implicit.away_team.short_name), n(e, 19, 0, o.\u0275nov(e, 20).target, o.\u0275nov(e, 20).href)
      })
    }

    function v(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 31, "div", [
        ["class", "row"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275eld(2, 0, null, null, 28, "div", [
        ["class", "col-sm-8"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(4, 0, null, null, 25, "table", [
        ["class", "table table-bordered"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(6, 0, null, null, 16, "thead", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(8, 0, null, null, 13, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(10, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Date"])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(13, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Match"])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(16, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Coverage"])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(19, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Access Live"])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(24, 0, null, null, 4, "tbody", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, g)), o.\u0275did(27, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n"])), (n()(), o.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 27, 0, e.component.matches)
      }, null)
    }

    function y(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 2, "agenda", [], null, null, null, v, p)), o.\u0275prd(512, null, a.MatchService, a.MatchService, [r.HttpClient, s.DisplayService, c.LoggingService]), o.\u0275did(2, 114688, null, 0, d.AgendaComponent, [a.MatchService], null, null)], function (n, e) {
        n(e, 2, 0)
      }, null)
    }
    e.RenderType_AgendaComponent = p, e.View_AgendaComponent_0 = v, e.View_AgendaComponent_Host_0 = y, e.AgendaComponentNgFactory = o.\u0275ccf("agenda", d.AgendaComponent, y, {}, {}, [])
  },
  "6sdY": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS"), e.SeasonsService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getSeasons = function (n) {
        void 0 === n && (n = null);
        var e = "/api/seasons/";
        return n && (e += "?orderby=" + n), this.httpClient.get(e).map(function (n) {
          return n.results
        })
      }, n
    }()
  },
  "6tqK": function (n, e, l) {
    "use strict";
    var t, o = this && this.__extends || (t = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (n, e) {
        n.__proto__ = e
      } || function (n, e) {
        for (var l in e) e.hasOwnProperty(l) && (n[l] = e[l])
      },
      function (n, e) {
        function l() {
          this.constructor = n
        }
        t(n, e), n.prototype = null === e ? Object.create(e) : (l.prototype = e.prototype, new l)
      });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var i = l("YaPU");
    l("lMWm"), l("HUv8"), l("MQ0p");
    var u = l("4EQH"),
      a = l("wtpC"),
      r = l("4zOZ"),
      s = new a.KalmanFilter(u.KALMAN_PARAMETERS),
      c = function () {
        function n(n, e, l, t, o) {
          var i = this;
          this.imageGetter = l, this.targetFPS = t, this.container = o, this.resolution = 2, this.isZoomMode = !1, this.isSpriteActivated = !0, this.isPerspectiveMode = !0, this.fullPerspective = !1, this.isPaused = !1, this.lastDrawables = [], this.lastLevels = {}, this.numberPaths = [], this.imagesSrc = {}, this.livingNodes = [], this.lastBallPosition = {
            x: 0,
            y: 0
          }, this.offsets = {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
            offsetX: 0,
            offsetY: 0,
            prevOffsetX: 0,
            prevOffsetY: 0,
            maxSize: 0
          }, this.image = n, this.canvas = e, this.context = e.getContext("2d"), this.context.font = "15px Arial", this.context.lineWidth = 3, this.image.onload = function () {
            i.resize()
          }, n.complete && this.resize()
        }
        return n.prototype.updateZoomMode = function (n) {
          this.offsets.offsetY = 0, this.clear(!0), this.image.style.transform = n ? "rotateZ(" + u.ZOOM_ROTATION + ") scale(" + u.ZOOM_SCALING_FACTOR + ")" : "rotateZ(0) scale(1)", this.isZoomMode = n
        }, n.prototype.updatePerspectiveMode = function (n) {
          this.isPerspectiveMode = n, this.clear(!0), this.image.src = this.imageGetter.getUrl(this.isPerspectiveMode ? "field_persp.jpg" : "field.jpg")
        }, n.prototype.setFullPerspectiveMode = function () {
          this.isPerspectiveMode = !1, this.fullPerspective = !0
        }, n.prototype.draw = function (n) {
          this.lastDrawables.length && this.refreshOffsets(), this.clear(), this.isPaused && this.resume(), this.lastDrawables = [];
          for (var e = 0, l = n; e < l.length; e++) {
            var t = l[e];
            if (t.isZoomMode !== this.isZoomMode) {
              var o = (this.isZoomMode ? u.rotateCoordinates : u.reverseRotateCoordinates)(t.x, t.y);
              t.x = o.x, t.y = o.y, t.size = this.isZoomMode ? 60 : 48
            }
            t.isPerspectiveMode !== this.isPerspectiveMode && (o = (this.isPerspectiveMode ? u.HQCoordinatesToPerspective : u.PerspectiveToHQCoordinates)(t.x, t.y), t.x = o.x, t.y = o.y), this.lastDrawables.push(Object.assign({}, t)), "" === t.number && (t.size /= 2, this.isSpriteActivated) ? this.drawBallSprite(t) : (this.toRatio(t), this._draw(t))
          }
        }, n.prototype.resume = function () {
          this.isPaused = !1, this._resume()
        }, n.prototype.pause = function (n) {
          this.isPaused || (this.isPaused = !0, this.pauseFrame = n, this.resetLastLevelState(), this.setBallControl(0), this._pause())
        }, n.prototype.resetLastLevelState = function () {
          this.lastLevels = {
            V: 0,
            zLevel: .51,
            theta: 0
          }
        }, n.prototype.getBallState = function (n) {
          if (!n.velocity) return this.resetLastLevelState(), this.lastLevels;
          var e = s.filter(n.velocity),
            l = e / 10,
            t = this.lastLevels.V;
          l > .25 && (l = this.lastLevels.zLevel - (e - t) / 19.62 * (e + t - 9.81) * 5), (!l || l < .51 || l > 4) && (l = .51);
          var o = [n.x - this.lastBallPosition.x, n.y - this.lastBallPosition.y],
            i = Math.acos(o[0] / Math.sqrt(Math.pow(o[0], 2) + Math.pow(o[1], 2)));
          return this.lastBallPosition.x = n.x, this.lastBallPosition.y = n.y, this.lastLevels = {
            zLevel: l,
            V: e,
            theta: i
          }, this.lastLevels
        }, n.prototype.setBallControl = function (n) {
          var e = document.querySelector(".ball-sprite");
          e && (n || 0 == n) && (u.setBlur(e, n), u.setBallRotationSpeed(e, n))
        }, n.prototype.drawBallSprite = function (n) {
          var e, l, t, o = Object.assign({}, n);
          this.toRatio(n);
          var i = this.livingNodes.ball,
            u = n.x,
            a = n.y,
            r = n.size,
            s = this.getBallState(o);
          this.setBallControl(s.V), void 0 === i ? ((l = document.createElement("div")).style.position = "absolute", l.style.zIndex = "10", l.style.width = "48px", l.style.height = "48px", (e = document.createElement("div")).classList.add("ball-sprite"), e.style.background = 'url("' + this.imageGetter.getUrl("sprite_ball.png") + '") left center', l.appendChild(e), this.container.appendChild(l), this.livingNodes.ball = i = {
            node: l,
            age: 0
          }, (t = document.createElement("img")).src = this.imageGetter.getUrl("ombre.png"), t.style.display = "block", t.style.position = "absolute", t.style.zIndex = "10", t.style.width = r + "px", this.container.appendChild(t), this.livingNodes.shadow = {
            node: t,
            age: 0
          }) : (l = i.node, t = this.livingNodes.shadow.node), this.livingNodes.shadow.age = 0, i.age = 0, l.style.top = a + "px", l.style.left = u + "px", t.style.top = a + r * s.zLevel - 1.3 * r / 2 + "px", t.style.left = u - r / 2 + "px", l.style.transform = "translate3D(-50%, -50%,0) scale(" + 1.8 * r / 48 + ") rotateZ(-" + s.theta + "rad)"
        }, n.prototype.clear = function (n) {
          void 0 === n && (n = !1), this._clear(n)
        }, n.prototype.toRatio = function (n) {
          this.isZoomMode && (n.y -= this.offsets.offsetY), "CANVAS" !== this.drawMethod || "" === n.number && this.isSpriteActivated || (n.size *= this.resolution, n.x *= this.resolution, n.y *= this.resolution), n.size *= this.ratio, n.x *= this.ratio, n.y *= this.ratio, n.x -= n.size / 2, n.y -= n.size / 2
        }, n.prototype.refreshOffsets = function () {
          var n = this.lastDrawables.map(function (n) {
              return n.x
            }).sort(function (n, e) {
              return n - e
            }),
            e = this.lastDrawables.map(function (n) {
              return n.y
            }).sort(function (n, e) {
              return n - e
            });
          this.offsets.maxSize = this.lastDrawables.map(function (n) {
            return n.size
          }).sort(function (n, e) {
            return e - n
          })[0], this.offsets.minX = n[0], this.offsets.maxX = n.slice().pop(), this.offsets.minY = e[0], this.offsets.maxY = e.pop(), this.isZoomMode && (this.offsets.prevOffsetY = this.offsets.offsetY, this.processOffsetY(), this.image.style.transform = "rotateZ(" + u.ZOOM_ROTATION + ") scale(" + u.ZOOM_SCALING_FACTOR + ") translate(" + -this.offsets.offsetY / u.ZOOM_SCALING_FACTOR * this.ratio + "px, -0px)")
        }, n.prototype.processOffsetY = function () {
          var n = 30 / this.targetFPS * 25,
            e = 30 / this.targetFPS * 3,
            l = (this.offsets.minY + this.offsets.maxY) / 2 - u.Y_CENTER,
            t = l - this.offsets.prevOffsetY;
          Math.abs(t) < n ? l = this.offsets.prevOffsetY : Math.abs(t) >= e && (l = this.offsets.prevOffsetY + Math.sign(t) * (1 + Math.abs(t) / 500) * e), Math.abs(l) >= u.CAMERA_LIMITS && (l = Math.sign(l) * u.CAMERA_LIMITS), this.offsets.offsetY = l
        }, n.prototype.resize = function () {
          this.canvas.width = this.image.width * this.resolution, this.canvas.height = this.image.height * this.resolution, this.canvas.style.width = this.image.width + "px", this.canvas.style.height = this.image.height + "px", this.ratio = this.image.width / this.image.naturalWidth
        }, n.prototype.onResize = function () {
          this.resize(), this._clear(!0)
        }, n.prototype.getDrawableImage = function (n, e, l, t) {
          var o = this,
            a = (this.imagesSrc[t] || {})[n];
          if (!a) {
            var s = this.isPerspectiveMode || this.fullPerspective ? u.getColoredProtoPerspective : u.getColoredProtoFlat,
              c = new r.BehaviorSubject(s(n, l, "", e));
            return this.getNumberPath(t).subscribe(function (i) {
              var u;
              a = s(n, l, i, e), o.imagesSrc[t] = Object.assign(((u = {})[n] = a, u), o.imagesSrc[t]), c.next(a)
            }), c
          }
          return i.Observable.of(a)
        }, n.prototype.getNumberPath = function (n) {
          var e = this;
          if (!n || "" === n || 0 === n) return i.Observable.of("");
          var l = this.isPerspectiveMode || this.fullPerspective,
            t = d(n, l),
            o = this.numberPaths[t] || this.imageGetter.getStoredItem(t);
          if (o) return i.Observable.of(o);
          var u, a = new XMLHttpRequest;
          return u = this.imageGetter.getUrl(l ? "perspective_numbers/numero-perspective-" + ("0" + n).slice(-2) + ".svg" : "numbers/numero-" + ("0" + n).slice(-2) + ".svg"), i.Observable.timer(100).subscribe(function (n) {
            a.open("GET", u, !0), a.send(null)
          }), i.Observable.fromEvent(a, "loadend").take(1).map(function (l) {
            if (!a.responseXML) return console.error("Unable to parse path for number : " + n + ". I will retry soon."), "";
            var i = a.responseXML.getElementsByTagName("svg")[0].getElementsByTagName("path");
            return o = "<path d='" + i[0].attributes.d.value + "'/>", parseInt(n) > 9 && (o = o + '<path d="' + i[1].attributes.d.value + '"/>'), e.imageGetter.storeItem(t, o), e.numberPaths[t] = o, o
          })
        }, n
      }();

    function d(n, e) {
      return (e ? "p_" : "") + ("R" === n ? 101 : n)
    }
    e.Drawer = c, e.getCachedNumberName = d, e.HTMLDrawer = function (n) {
      function e(e, l, t, o, i) {
        var u = n.call(this, e, l, t, o, i) || this;
        return u.drawMethod = "HTML", u.nNodesToResume = 0, u
      }
      return o(e, n), e.prototype._draw = function (n) {
        var e = this.livingNodes[n.uniqueId],
          l = n.x,
          t = n.y,
          o = n.size,
          i = n.color,
          u = n.numberColor,
          a = n.number,
          r = n.trackable_object;
        if (void 0 === e) {
          var s = document.createElement("img");
          s.style.position = "absolute", s.style.zIndex = "9", s.style.top = t + "px", s.style.left = l + "px", s.style.width = o + "px", this.nNodesToResume > 0 && (this.nNodesToResume -= 1, s.classList.add("resuming-drawing")), this.container.appendChild(s), this.livingNodes[n.uniqueId] = e = {
            node: s,
            age: 0,
            trackable_object: r
          }, this.getDrawableImage(i, u, o, a).subscribe(function (n) {
            return s.src = n
          })
        } else e.trackable_object !== r ? (this.getDrawableImage(i, u, o, a).subscribe(function (n) {
          return e.node.src = n
        }), e.trackable_object = r) : (e.age = 0, e.node.style.top = t + "px", e.node.style.left = l + "px")
      }, e.prototype._resume = function () {
        this.nNodesToResume = this.livingNodes.filter(function (n) {
          return !!n || 0 == n
        }).length
      }, e.prototype._pause = function () {
        this.livingNodes.forEach(function (n) {
          n.node.classList.add("paused-drawing")
        })
      }, e.prototype._clear = function (n) {
        void 0 === n && (n = !1), n && (this.imagesSrc = [], this.numberPaths = []);
        for (var e = 0, l = Object.keys(this.livingNodes); e < l.length; e++) {
          var t = l[e],
            o = this.livingNodes[t];
          o.age += 1, (o.age > 1 || n) && (this.container.removeChild(o.node), delete this.livingNodes[t])
        }
      }, e
    }(c), e.CanvasDrawer = function (n) {
      function e(e, l, t, o, i) {
        var u = n.call(this, e, l, t, o, i) || this;
        return u.canvasImages = [], u.drawMethod = "CANVAS", u
      }
      return o(e, n), e.prototype._draw = function (n) {
        var e = this,
          l = n.x,
          t = n.y,
          o = n.size,
          i = n.color,
          u = n.numberColor,
          a = n.number,
          r = this.canvasImages[n.uniqueId];
        if (void 0 === r) {
          var s = new Image;
          this.getDrawableImage(i, u, o, a).subscribe(function (n) {
            s.src = n, e.context.drawImage(s, l, t, o, o)
          }), this.canvasImages[n.uniqueId] = {
            image: s,
            trackable_object: n.trackable_object
          }
        } else r.trackable_object !== n.trackable_object ? this.getDrawableImage(i, u, o, a).subscribe(function (i) {
          r.image.src = i, e.context.drawImage(r.image, l, t, o, o), r.trackable_object = n.trackable_object
        }) : this.context.drawImage(this.canvasImages[n.uniqueId].image, l, t, o, o)
      }, e.prototype._pause = function () {
        this.canvas.classList.remove("resuming-drawing"), this.canvas.classList.add("paused-drawing")
      }, e.prototype._resume = function () {
        this.canvas.classList.remove("paused-drawing"), this.canvas.classList.add("resuming-drawing")
      }, e.prototype._clear = function (n) {
        void 0 === n && (n = !1);
        for (var e = 0, l = Object.keys(this.livingNodes); e < l.length; e++) {
          var t = l[e],
            o = this.livingNodes[t];
          o.age += 1, (o.age > 1 || n) && (this.container.removeChild(o.node), delete this.livingNodes[t])
        }
        n && (this.canvasImages = [], this.imagesSrc = [], this.numberPaths = []), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }, e
    }(c), e.CanvasImageElement = function () {
      function n(n, e) {
        var l = this;
        this.isReady = !1, this.image = n, this.canvas = e, this.context = e.getContext("2d"), this.context.font = "15px Arial", this.context.lineWidth = 3, n.complete ? this.resize() : this.image.onload = function () {
          l.resize()
        }
      }
      return n.prototype.resize = function () {
        this.canvas.width = 2 * this.image.width, this.canvas.height = 2 * this.image.height, this._ratio = this.image.width / this.image.naturalWidth, this.isReady = !0
      }, n.prototype.clearRect = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      }, n.prototype.onResize = function () {
        this.resize()
      }, n
    }()
  },
  "7/qC": function (n, e, l) {
    "use strict";
    var t = l("gF3u"),
      o = l("WT6e"),
      i = l("Xjw4"),
      u = l("ktH5"),
      a = l("TTk8"),
      r = l("8edL"),
      s = l("D692"),
      c = l("joif"),
      d = l("jDyY"),
      p = l("+yYV"),
      m = l("bfOx"),
      f = l("BAgd"),
      h = l("Zkkf"),
      g = l("L1ao"),
      v = o.\u0275crt({
        encapsulation: 0,
        styles: [t.styles],
        data: {}
      });

    function y(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 9, "li", [
        ["class", "event-box referee-decision"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processRefereeEvent(n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(2, 0, null, null, 3, "div", [
        ["class", "img-container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(7, 0, null, null, 1, "p", [
        ["class", "event-title"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(8, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n      "]))], null, function (n, e) {
        n(e, 4, 0, o.\u0275inlineInterpolate(1, "", e.component._image.getUrl("events/big_icon/" + (e.context.$implicit.image || e.context.$implicit.type) + ".svg"), "")), n(e, 8, 0, e.context.$implicit.name)
      })
    }

    function b(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 9, "li", [
        ["class", "event-box"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processRegularEvent(n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(2, 0, null, null, 3, "div", [
        ["class", "img-container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(7, 0, null, null, 1, "p", [
        ["class", "event-title"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(8, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n      "]))], null, function (n, e) {
        n(e, 4, 0, o.\u0275inlineInterpolate(1, "", e.component._image.getUrl("events/big_icon/" + (e.context.$implicit.image || e.context.$implicit.type) + ".svg"), "")), n(e, 8, 0, e.context.$implicit.name)
      })
    }

    function C(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "ul", [], [
        [8, "className", 0]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275and(16777216, null, null, 1, null, b)), o.\u0275did(3, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n    "]))], function (n, e) {
        n(e, 3, 0, e.context.$implicit.items)
      }, function (n, e) {
        n(e, 0, 0, o.\u0275inlineInterpolate(1, "", e.context.$implicit.group, ""))
      })
    }

    function _(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 36, "li", [
        ["class", "player"]
      ], [
        [8, "id", 0]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(2, 0, null, null, 3, "div", [
        ["class", "player-shortcut-event"],
        ["style", "background: #337ab7;"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processShortcutEvent("score", n.parent.context.$implicit, n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(7, 0, null, null, 2, "div", [
        ["class", "player-number"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(8, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(9, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(11, 0, null, null, 2, "div", [
        ["class", "player-acronym"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(12, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(13, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(15, 0, null, null, 2, "div", [
        ["class", "player-name"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(16, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(17, null, ["", " ", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(19, 0, null, null, 3, "div", [
        ["class", "player-shortcut-event shortcut-injury"],
        ["style", "background: red;"]
      ], [
        [2, "greyed", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processShortcutEvent("injury", n.parent.context.$implicit, n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(21, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(24, 0, null, null, 6, "div", [
        ["class", "player-shortcut-event shortcut-yellow-card"],
        ["style", "background: black; position: relative;"]
      ], [
        [2, "greyed", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processShortcutEvent("yellow_card", n.parent.context.$implicit, n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(26, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(28, 0, null, null, 1, "p", [
        ["style", "color: #fff; position: absolute; left: 0; bottom: 0;"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(29, null, ["\n              ", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(32, 0, null, null, 3, "div", [
        ["class", "player-shortcut-event shortcut-red-card"],
        ["style", "background: black;"]
      ], [
        [2, "greyed", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processShortcutEvent("red_card", n.parent.context.$implicit, n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(34, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n\n        "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, o.\u0275inlineInterpolate(1, "", e.context.$implicit.id, "")), n(e, 4, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/big_icon/score_change.svg"), "")), n(e, 9, 0, e.context.$implicit.number), n(e, 13, 0, e.context.$implicit.player_role.acronym), n(e, 17, 0, e.context.$implicit.first_name, e.context.$implicit.last_name), n(e, 19, 0, !e.context.$implicit.injured), n(e, 21, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/big_icon/injury.svg"), "")), n(e, 24, 0, !e.context.$implicit.yellow_card), n(e, 26, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/small_icon/yellow_card.svg"), "")), n(e, 29, 0, e.context.$implicit.yellow_card ? e.context.$implicit.yellow_card : ""), n(e, 32, 0, !e.context.$implicit.red_card), n(e, 34, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/small_icon/red_card.svg"), ""))
      })
    }

    function w(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "ul", [
        ["class", "regular-players"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, _)), o.\u0275did(3, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n      "]))], function (n, e) {
        n(e, 3, 0, e.component.matchPlayers[e.context.$implicit + "Players"])
      }, null)
    }

    function x(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "li", [
        ["class", "player"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n          ", "\n        "]))], null, function (n, e) {
        n(e, 1, 0, e.context.$implicit.number)
      })
    }

    function S(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "div", [
        ["class", "own-goal-box"]
      ], [
        [2, "selected", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "click" === e && (t = 0 != (o.goalAgainstSelf = !o.goalAgainstSelf) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n          "])), (n()(), o.\u0275eld(2, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(3, null, [" Goal against self: ", " "])), (n()(), o.\u0275ted(-1, null, ["\n\n        "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, l.goalAgainstSelf), n(e, 3, 0, l.goalAgainstSelf)
      })
    }

    function O(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 13, "li", [
        ["class", "modal-player"]
      ], [
        [2, "hidden", null],
        [8, "id", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.selectedPlayer = n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(2, 0, null, null, 2, "div", [
        ["class", "player-number"]
      ], [
        [4, "order", null]
      ], null, null, null, null)), (n()(), o.\u0275eld(3, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(4, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(6, 0, null, null, 2, "div", [
        ["class", "player-acronym"]
      ], [
        [4, "order", null]
      ], null, null, null, null)), (n()(), o.\u0275eld(7, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(8, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(10, 0, null, null, 2, "div", [
        ["class", "player-name"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(11, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(12, null, ["", " ", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, e.context.$implicit.id == (null == l.selectedPlayerAssist ? null : l.selectedPlayerAssist.id) || "score_change" == (null == l.selectedEvent ? null : l.selectedEvent.type) && (null == l.selectedEvent ? null : l.selectedEvent.cancelled) && !(e.context.$implicit.goal > 0 || e.context.$implicit.own_goal > 0), o.\u0275inlineInterpolate(1, "", e.context.$implicit.id, "")), n(e, 2, 0, e.context.$implicit.teamSide != l.selectedTeam ? 5 : 0), n(e, 4, 0, e.context.$implicit.number), n(e, 6, 0, e.context.$implicit.teamSide != l.selectedTeam ? 4 : 0), n(e, 8, 0, e.context.$implicit.player_role.acronym), n(e, 12, 0, e.context.$implicit.first_name, e.context.$implicit.last_name)
      })
    }

    function M(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "ul", [
        ["class", "regular-players"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, O)), o.\u0275did(3, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n        "]))], function (n, e) {
        n(e, 3, 0, e.context.$implicit)
      }, null)
    }

    function P(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 13, "li", [
        ["class", "modal-player"]
      ], [
        [2, "hidden", null],
        [8, "id", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "click" === e && (t = !1 !== ("Assist" == n.parent.context.$implicit.label ? o.selectedPlayerAssist = n.context.$implicit : o.selectedPlayerIn = n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(2, 0, null, null, 2, "div", [
        ["class", "player-number"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(3, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(4, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(6, 0, null, null, 2, "div", [
        ["class", "player-acronym"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(7, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(8, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(10, 0, null, null, 2, "div", [
        ["class", "player-name"]
      ], null, null, null, null, null)), (n()(), o.\u0275eld(11, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(12, null, ["", " ", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, e.context.$implicit.id == (null == l.selectedPlayer ? null : l.selectedPlayer.id), o.\u0275inlineInterpolate(1, "", e.context.$implicit.id, "")), n(e, 4, 0, e.context.$implicit.number), n(e, 8, 0, e.context.$implicit.player_role.acronym), n(e, 12, 0, e.context.$implicit.first_name, e.context.$implicit.last_name)
      })
    }

    function E(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 8, "ul", [
        ["class", "additional-players"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(2, 0, null, null, 2, "li", [], null, null, null, null, null)), (n()(), o.\u0275eld(3, 0, null, null, 1, "h1", [
        ["style", "color: #FFF;"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(4, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, P)), o.\u0275did(7, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n        "]))], function (n, e) {
        n(e, 7, 0, e.component.matchPlayers[e.context.$implicit.roleOnField])
      }, function (n, e) {
        n(e, 4, 0, e.context.$implicit.label)
      })
    }

    function R(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 9, "li", [
        ["class", "event-box referee-decision"]
      ], [
        [2, "selected", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.selectedRefereeEventSubject = n.context.$implicit.type) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(2, 0, null, null, 3, "div", [
        ["class", "img-container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(7, 0, null, null, 1, "p", [
        ["class", "event-title"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(8, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n          "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, l.selectedRefereeEventSubject == e.context.$implicit.type), n(e, 4, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/big_icon/" + (e.context.$implicit.image || e.context.$implicit.type) + ".svg"), "")), n(e, 8, 0, e.context.$implicit.name)
      })
    }

    function k(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "ul", [
        ["class", "flex-row referee-choices-subjects"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, R)), o.\u0275did(3, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n        "]))], function (n, e) {
        n(e, 3, 0, e.component.referee_events_subjects)
      }, null)
    }

    function T(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 10, "div", [
        ["class", "players-box"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, M)), o.\u0275did(3, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, E)), o.\u0275did(6, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, k)), o.\u0275did(9, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n      "]))], function (n, e) {
        var l = e.component;
        n(e, 3, 0, l.enabledRegularPlayer()), n(e, 6, 0, l.neededAdditionalPlayer()), n(e, 9, 0, l.neededRefereeSubject())
      }, null)
    }

    function I(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["team"]))], null, null)
    }

    function N(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["video assistance subject"]))], null, null)
    }

    function A(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["player\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, "substitution" == (null == l.selectedEvent ? null : l.selectedEvent.type) ? "out" : "score_change" == (null == l.selectedEvent ? null : l.selectedEvent.type) ? "scorer" : "")
      })
    }

    function D(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["player in"]))], null, null)
    }

    function F(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["player\n            assist\n          "]))], null, null)
    }

    function V(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 3, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(2, 0, null, null, 0, "img", [
        ["style", "height: 8vh;"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(3, null, ["\n            ", "\n          "]))], null, function (n, e) {
        var l = e.component;
        n(e, 2, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("events/big_icon/" + (l.selectedEvent ? l.selectedEvent.image || l.selectedEvent.type : "") + ".svg"), "")), n(e, 3, 0, l.selectedEvent ? l.selectedEvent.name : "")
      })
    }

    function j(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.selectedTeam ? l.match[l.selectedTeam + "_team"].short_name : "")
      })
    }

    function L(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.selectedRefereeEventSubject ? l.selectedRefereeEventSubject.replace("_", " ") : "")
      })
    }

    function U(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.selectedPlayer ? l.selectedPlayer.first_name + " " + l.selectedPlayer.last_name : "")
      })
    }

    function z(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.selectedPlayerIn ? (null == l.selectedPlayerIn ? null : l.selectedPlayerIn.first_name) + " " + (null == l.selectedPlayerIn ? null : l.selectedPlayerIn.last_name) : "")
      })
    }

    function $(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(1, null, ["\n            ", ""]))], null, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.selectedPlayerAssist ? (null == l.selectedPlayerAssist ? null : l.selectedPlayerAssist.first_name) + " " + (null == l.selectedPlayerAssist ? null : l.selectedPlayerAssist.last_name) : "")
      })
    }

    function G(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 4, "div", [
        ["class", "validate-btn"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.validateSelection() && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(2, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Validate"])), (n()(), o.\u0275ted(-1, null, ["\n  "]))], null, null)
    }

    function B(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 154, "div", [
        ["class", "controls-container"]
      ], null, null, null, null, null)), o.\u0275did(1, 540672, null, 0, u.PendingRequestDirective, [o.ElementRef], {
        isPendingRequest: [0, "isPendingRequest"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275eld(3, 0, null, null, 10, "div", [
        ["class", "left-controls"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(5, 0, null, null, 4, "ul", [
        ["class", "presentation-box referee-decisions"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275and(16777216, null, null, 1, null, y)), o.\u0275did(8, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275and(16777216, null, null, 1, null, C)), o.\u0275did(12, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n  "])), (n()(), o.\u0275ted(-1, null, ["\n\n  "])), (n()(), o.\u0275eld(15, 0, null, null, 51, "div", [
        ["class", "right-controls"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(17, 0, null, null, 35, "div", [
        ["class", "scoreboard-container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(19, 0, null, null, 4, "div", [
        ["class", "scoreboard-positioner"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(21, 0, null, null, 1, "scoreboard", [], null, null, null, a.View_ScoreboardComponent_0, a.RenderType_ScoreboardComponent)), o.\u0275did(22, 4243456, null, 0, r.ScoreboardComponent, [s.MatchService, c.EventService, d.DisplayService], null, null), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(25, 0, null, null, 2, "div", [
        ["class", "home-score-inc"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.scoreEvent("home", 1) && t), t
      }, null, null)), (n()(), o.\u0275eld(26, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["+"])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(29, 0, null, null, 2, "div", [
        ["class", "home-score-dec"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.scoreEvent("home", -1) && t), t
      }, null, null)), (n()(), o.\u0275eld(30, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["-"])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(33, 0, null, null, 2, "div", [
        ["class", "away-score-inc"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.scoreEvent("away", 1) && t), t
      }, null, null)), (n()(), o.\u0275eld(34, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["+"])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(37, 0, null, null, 2, "div", [
        ["class", "away-score-dec"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.scoreEvent("away", -1) && t), t
      }, null, null)), (n()(), o.\u0275eld(38, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["-"])), (n()(), o.\u0275ted(-1, null, ["\n\n\n      "])), (n()(), o.\u0275eld(41, 0, null, null, 2, "div", [
        ["class", "period-start"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.periodEvent("period_start") && t), t
      }, null, null)), (n()(), o.\u0275eld(42, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(45, 0, null, null, 2, "div", [
        ["class", "break-start"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.periodEvent("break_start") && t), t
      }, null, null)), (n()(), o.\u0275eld(46, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(49, 0, null, null, 2, "div", [
        ["class", "match-end"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.periodEvent("match_ended") && t), t
      }, null, null)), (n()(), o.\u0275eld(50, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(54, 0, null, null, 11, "div", [
        ["class", "players-container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275and(16777216, null, null, 2, null, w)), o.\u0275did(57, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), o.\u0275pad(58, 2), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(60, 0, null, null, 4, "ul", [
        ["class", "away-players"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, x)), o.\u0275did(63, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n\n  "])), (n()(), o.\u0275eld(68, 0, null, null, 85, "div", [
        ["class", "events-modal"]
      ], [
        [2, "hidden", null],
        [2, "attention", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(70, 0, null, null, 22, "div", [
        ["class", "completion-zone"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(72, 0, null, null, 16, "div", [
        ["class", "teams-completion"]
      ], [
        [2, "hidden", null],
        [2, "center-screen", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(74, 0, null, null, 4, "div", [
        ["class", "team-box"]
      ], [
        [2, "selected", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.setTeam("home") && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(76, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(77, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n\n        "])), (n()(), o.\u0275eld(80, 0, null, null, 4, "div", [
        ["class", "team-box"]
      ], [
        [2, "selected", null]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.setTeam("away") && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(82, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(83, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275and(16777216, null, null, 1, null, S)), o.\u0275did(87, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275and(16777216, null, null, 1, null, T)), o.\u0275did(91, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(94, 0, null, null, 58, "div", [
        ["class", "synthesis-zone"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(96, 0, null, null, 4, "div", [
        ["style", "flex: 2; display: flex;"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(98, 0, null, null, 1, "h2", [
        ["style", "margin: auto;"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["To submit"])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(102, 0, null, null, 49, "table", [
        ["class", "table table-bordered"],
        ["style", " flex: 4;text-align: center; color: #fff; margin:auto "]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(104, 0, null, null, 22, "thead", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(106, 0, null, null, 19, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(108, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["event"])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, I)), o.\u0275did(112, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, N)), o.\u0275did(115, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, A)), o.\u0275did(118, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, D)), o.\u0275did(121, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, F)), o.\u0275did(124, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(128, 0, null, null, 22, "tbody", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(130, 0, null, null, 19, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, V)), o.\u0275did(133, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, j)), o.\u0275did(136, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, L)), o.\u0275did(139, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, U)), o.\u0275did(142, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, z)), o.\u0275did(145, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275and(16777216, null, null, 1, null, $)), o.\u0275did(148, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n"])), (n()(), o.\u0275ted(-1, null, ["\n\n"])), (n()(), o.\u0275eld(156, 0, null, null, 11, "div", [
        ["class", "validation-container"]
      ], null, null, null, null, null)), o.\u0275did(157, 540672, null, 0, u.PendingRequestDirective, [o.ElementRef], {
        isPendingRequest: [0, "isPendingRequest"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275and(16777216, null, null, 1, null, G)), o.\u0275did(160, 16384, null, 0, i.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n  "])), (n()(), o.\u0275eld(162, 0, null, null, 4, "div", [
        ["class", "cancel-btn"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.resetSelection() && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(164, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Cancel"])), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n"])), (n()(), o.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.pendingRequest), n(e, 8, 0, l.referee_events), n(e, 12, 0, l.events_groups), n(e, 57, 0, n(e, 58, 0, "home", "away")), n(e, 63, 0, l.awayPlayers), n(e, 87, 0, l.selectedTeam && "score_change" == (null == l.selectedEvent ? null : l.selectedEvent.type)), n(e, 91, 0, l.selectedTeam), n(e, 112, 0, !(null != l.selectedEvent && l.selectedEvent.ignore_team)), n(e, 115, 0, l.neededRefereeSubject()), n(e, 118, 0, !(null != l.selectedEvent && l.selectedEvent.ignore_player)), n(e, 121, 0, "substitution" == (null == l.selectedEvent ? null : l.selectedEvent.type) && !(null != l.selectedEvent && l.selectedEvent.ignore_player)), n(e, 124, 0, !(l.goalAgainstSelf || "score_change" != (null == l.selectedEvent ? null : l.selectedEvent.type) || null != l.selectedEvent && l.selectedEvent.ignore_assist)), n(e, 133, 0, l.selectedEvent), n(e, 136, 0, !(null != l.selectedEvent && l.selectedEvent.ignore_team)), n(e, 139, 0, l.neededRefereeSubject()), n(e, 142, 0, !(null != l.selectedEvent && l.selectedEvent.ignore_player)), n(e, 145, 0, "substitution" == (null == l.selectedEvent ? null : l.selectedEvent.type) && !(null != l.selectedEvent && l.selectedEvent.ignore_player)), n(e, 148, 0, !(l.goalAgainstSelf || "score_change" != (null == l.selectedEvent ? null : l.selectedEvent.type) || null != l.selectedEvent && l.selectedEvent.ignore_assist)), n(e, 157, 0, l.pendingRequest), n(e, 160, 0, l.canShowValidationButton())
      }, function (n, e) {
        var l = e.component;
        n(e, 42, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("utils/play.svg"), "")), n(e, 46, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("utils/pause.svg"), "")), n(e, 50, 0, o.\u0275inlineInterpolate(1, "", l._image.getUrl("utils/stop.svg"), "")), n(e, 68, 0, !l.modalRegularMode && !l.modalShortcutMode, "match_ended" == (null == l.selectedEvent ? null : l.selectedEvent.type) || (null == l.selectedEvent ? null : l.selectedEvent.instruction_only)), n(e, 70, 0, l.modalShortcutMode), n(e, 72, 0, null == l.selectedEvent ? null : l.selectedEvent.ignore_team, !l.selectedTeam), n(e, 74, 0, "home" == l.selectedTeam && !l.goalAgainstSelf || "away" == l.selectedTeam && l.goalAgainstSelf), n(e, 77, 0, l.match.home_team.short_name), n(e, 80, 0, "away" == l.selectedTeam && !l.goalAgainstSelf || "home" == l.selectedTeam && l.goalAgainstSelf), n(e, 83, 0, l.match.away_team.short_name)
      })
    }

    function H(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "app-register-events", [], null, null, null, B, v)), o.\u0275did(1, 4308992, null, 0, p.RegisterEventsComponent, [m.ActivatedRoute, s.MatchService, f.NotificationService, h.CompositionsService, c.EventService, g.WSStreamService], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_RegisterEventsComponent = v, e.View_RegisterEventsComponent_0 = B, e.View_RegisterEventsComponent_Host_0 = H, e.RegisterEventsComponentNgFactory = o.\u0275ccf("app-register-events", p.RegisterEventsComponent, H, {}, {}, [])
  },
  "7G+B": function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("Xjw4"),
      i = l("f7mB"),
      u = t.\u0275crt({
        encapsulation: 0,
        styles: [".info[_ngcontent-%COMP%]{\n      color: darkseagreen;\n    }\n    .log[_ngcontent-%COMP%]{\n      color: #fefefe;\n    }\n    .warn[_ngcontent-%COMP%]{\n      color: #cc7832;\n    }\n    .error[_ngcontent-%COMP%]{\n      color: #ff7070;\n    }\n    \n    .debug-container[_ngcontent-%COMP%] {\n      \n      display: block;\n      position: relative;\n      width: 80vw;\n      margin-left: 10vw;\n      height: 50vh;\n      overflow: scroll;\n      background: #2b2b2b;\n      padding: 2.5vh 1vw 2.5vh 4vw;\n    }\n\n    .debug-container[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {\n      list-style-type: none;\n    }\n\n    .debug-container[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]::before {\n      content: '>> ';\n      color: #a5c25c;\n      position: absolute;\n      left: 1vw;\n    }\n\n    .rm-btn[_ngcontent-%COMP%] {\n      display: inline;\n      border-radius: 100%;\n      color: #769aa5;\n      cursor: pointer;\n      border: 1px solid #3d4f5c;\n      padding: 0 5px 1px 5px;\n      margin-left: 10px;\n\n    }\n\n    \n    [_ngcontent-%COMP%]::-webkit-scrollbar {\n      width: 10px;\n    }\n\n    \n    [_ngcontent-%COMP%]::-webkit-scrollbar-track {\n      background: white;\n    }\n\n    \n    [_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n      background: #888;\n    }\n\n    \n    [_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n      background: #555;\n    }\n\n    @media screen and (max-width: 750px) {\n      .debug-container[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%]::before {\n        position: absolute;\n        left: 0;\n      }\n\n      .debug-container[_ngcontent-%COMP%] {\n        width: 100vw;\n        margin-left: 0;\n      }\n\n      .debug-container[_ngcontent-%COMP%]    > li[_ngcontent-%COMP%] {\n        margin-left: 2vw;\n      }\n    }"],
        data: {}
      });

    function a(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 6, "li", [], [
        [8, "className", 0]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(2, 0, null, null, 0, "span", [], null, null, null, null, null)), (n()(), t.\u0275ted(3, null, ["\n        ", " "])), (n()(), t.\u0275eld(4, 0, null, null, 1, "span", [
        ["class", "rm-btn"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.removeLog(n.context.$implicit.key) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["x"])), (n()(), t.\u0275ted(-1, null, ["\n      "]))], null, function (n, e) {
        n(e, 0, 0, t.\u0275inlineInterpolate(1, "", e.context.$implicit.level, "")), n(e, 3, 0, e.context.$implicit.message)
      })
    }

    function r(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(1, 0, null, null, 9, "ul", [
        ["class", "debug-container"],
        ["id", "console"]
      ], null, [
        [null, "scroll"]
      ], function (n, e, l) {
        var t = !0;
        return "scroll" === e && (t = !1 !== n.component.userScrolled(l) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275and(16777216, null, null, 1, null, a)), t.\u0275did(4, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n      \n      "])), (n()(), t.\u0275eld(6, 0, null, null, 0, "li", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(8, 0, null, null, 1, "button", [
        ["style", "position: absolute; right:10px; border-radius: 4px; background: #769aa5;"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.removeLog(-1) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Clear\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "]))], function (n, e) {
        n(e, 4, 0, e.component.logs)
      }, null)
    }

    function s(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "debug-logs", [], null, null, null, r, u)), t.\u0275did(1, 4243456, null, 0, i.DebugLogs, [], null, null)], null, null)
    }
    e.RenderType_DebugLogs = u, e.View_DebugLogs_0 = r, e.View_DebugLogs_Host_0 = s, e.DebugLogsNgFactory = t.\u0275ccf("debug-logs", i.DebugLogs, s, {
      logs: "logs"
    }, {
      rmLog: "rmLog"
    }, [])
  },
  "7Z0p": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.AddHeaderInterceptor = function () {
      function n() {}
      return n.prototype.intercept = function (n, e) {
        var l = n.headers;
        return ["POST", "PUT", "DELETE", "PATCH"].indexOf(n.method) > -1 && (l = l.set("Content-Type", "application/json")), e.handle(n.clone({
          headers: l
        }))
      }, n
    }()
  },
  "8edL": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("D692");
    var t = l("SLR8"),
      o = l("C4jB"),
      i = l("4EQH");
    l("joif"), l("jDyY"), e.ScoreboardComponent = function () {
      function n(n, e, l) {
        this.matchService = n, this.eventService = e, this.display = l, this.imageGetter = t.images
      }
      return n.prototype.notifyClick = function (n) {
        this.display.menuButtonClicked$.next("Menu")
      }, n.prototype.ngAfterViewInit = function () {
        var n = this;
        this.menuButton = new o.Triggerable(document.querySelector(".minimap-menu-btn"), !1, this.imageGetter.getUrl("menu/burger-open.svg"), this.imageGetter.getUrl("menu/burger-close.svg")), this.matchService.whenMatchInfoReady().subscribe(function (e) {
          document.getElementById("away-jersey").src = i.getColoredJersey(n.matchService.composition.away_team_color), document.getElementById("home-jersey").src = i.getColoredJersey(n.matchService.composition.home_team_color)
        }), this.display.menuButtonClicked$.subscribe(function (e) {
          "open" === e && n.menuButton.isOpen || "close" === e && !n.menuButton.isOpen || n.menuButton.trigger()
        })
      }, n
    }()
  },
  "8kGE": function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("Xjw4"),
      i = l("l5LN"),
      u = l("PakY"),
      a = l("jDyY"),
      r = t.\u0275crt({
        encapsulation: 0,
        styles: ["#adContainer[_ngcontent-%COMP%] {\n        position: absolute;\n        z-index: 0;\n        top: 0px;\n        left: 0px;\n        width: 100%;\n        height: 100%;\n      }\n      #play[_ngcontent-%COMP%] {\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        transform: translate(-50%, -50%);\n        color: #e8e7e7;\n        background: rgba(0, 0, 0, 0.8);\n        border-radius: 4px;\n        cursor: pointer;\n        font-size: calc(50px + 10vw);\n        padding: 30px;\n      }\n      #mute[_ngcontent-%COMP%] {\n        position: absolute;\n        left: 5%;\n        top: 80%;\n        color: #e8e7e7;\n        background: rgba(0, 0, 0, 0.46);\n        border-radius: 4px;\n        cursor: pointer;\n        font-size: calc(24px + 0.5vw);\n        padding: 1px 1px 1px 2px;\n      }"],
        data: {}
      });

    function s(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 0, "div", [
        ["class", "glyphicon glyphicon-play-circle"],
        ["id", "play"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.launchAds() && t), t
      }, null, null))], null, null)
    }

    function c(n) {
      return t.\u0275vid(0, [t.\u0275qud(402653184, 1, {
        adContainerElement: 0
      }), t.\u0275qud(402653184, 2, {
        adVideoElement: 0
      }), (n()(), t.\u0275eld(2, 0, null, null, 14, "div", [
        ["class", "ima-ads"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n               "])), (n()(), t.\u0275eld(4, 0, [
        [1, 0],
        ["adContainer", 1]
      ], null, 11, "div", [
        ["id", "adContainer"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n                 "])), (n()(), t.\u0275ted(-1, null, ["\n                 "])), (n()(), t.\u0275eld(7, 0, [
        [2, 0],
        ["adVideo", 1]
      ], null, 1, "video", [
        ["id", "adVideo"],
        ["playsinline", ""],
        ["poster", "doesnotexist"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n                 "])), (n()(), t.\u0275ted(-1, null, ["\n                 "])), (n()(), t.\u0275and(16777216, null, null, 1, null, s)), t.\u0275did(11, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n                 "])), (n()(), t.\u0275eld(13, 0, null, null, 1, "div", [
        ["class", "glyphicon"],
        ["id", "mute"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.mute() && t), t
      }, null, null)), t.\u0275did(14, 278528, null, 0, o.NgClass, [t.IterableDiffers, t.KeyValueDiffers, t.ElementRef, t.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n               "])), (n()(), t.\u0275ted(-1, null, ["\n             "]))], function (n, e) {
        var l = e.component;
        n(e, 11, 0, l.showPlay), n(e, 14, 0, "glyphicon", l.muted ? "glyphicon-volume-off" : "glyphicon-volume-up")
      }, null)
    }

    function d(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "ima-ads", [], null, null, null, c, r)), t.\u0275did(1, 4243456, null, 0, i.ImaAdsComponent, [u.LoggingService, a.DisplayService], null, null)], null, null)
    }
    e.RenderType_ImaAdsComponent = r, e.View_ImaAdsComponent_0 = c, e.View_ImaAdsComponent_Host_0 = d, e.ImaAdsComponentNgFactory = t.\u0275ccf("ima-ads", i.ImaAdsComponent, d, {}, {}, [])
  },
  "8rS7": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.environment = {
      name: "prod",
      release: "6a0127e92f2d78e9f031fd077288a134bcaf834e"
    }
  },
  "9NDR": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("SLR8"),
      o = l("6tqK"),
      i = l("tPzB"),
      u = l("Zn+w"),
      a = l("FjE5"),
      r = l("YaPU");
    l("bAW0"), l("EKDC"), l("cPqY"), l("D692"), l("jDyY"), e.CompositionComponent = function () {
      function n(n, e, l) {
        this.elem = n, this.matchService = e, this.display = l, this._canvasUtils = new i.CanvasUtils, this._image = t.images
      }
      return n.prototype.ngAfterViewInit = function () {
        var n = this;
        this.initMap(), this.matchService.whenMatchInfoReady().switchMap(function () {
          return r.Observable.interval(100)
        }).skipWhile(function (e) {
          return !n._compo.isReady
        }).take(1).subscribe(function (e) {
          return n.render()
        })
      }, n.prototype.initMap = function () {
        var n = this.elem.nativeElement.querySelector("#compo");
        this._compo = new o.CanvasImageElement(n, this.elem.nativeElement.querySelector(".compo-overlay")), this.teamToCoordinates = this.getCompoPositions()
      }, n.prototype.resizeCanvas = function (n) {
        console.log("in resizeCanvases"), this._compo.onResize(), this.teamToCoordinates = this.getCompoPositions(), this.matchService.composition && this.render()
      }, n.prototype.getCompoPositions = function () {
        return u.getTeamsPositions(1, 1)
      }, n.prototype.getDrawInfo = function (n) {
        var e = this._compo.canvas.width,
          l = this._compo.canvas.height,
          t = a.getObjectById(n, this.matchService.composition),
          o = t.object,
          i = t.object_type,
          u = {
            coordinates: void 0,
            color: void 0
          };
        switch (i) {
          case "ball":
            u.coordinates = {
              x: .5,
              y: .75
            }, u.color = this.matchService.composition.referee_color;
            break;
          case "referee":
            u.coordinates = {
              x: .5,
              y: 1 / 6
            }, u.color = this.matchService.composition.referee_color;
            break;
          case "player":
            var r = this.getPlayerDrawInfo(o),
              s = r.coordinates,
              c = r.color;
            s || (s = {}, console.error("No coordinates for :", o)), u = {
              coordinates: {
                x: s.x,
                y: s.y
              },
              color: c
            };
            break;
          default:
            return void console.error("Got unknown object_type:", i)
        }
        return u.coordinates.x *= e, u.coordinates.y *= l, u
      }, n.prototype.getPlayerDrawInfo = function (n) {
        var e = this.matchService.composition.home_team.id === n.team_id,
          l = u.getTeamsPositions(1, 1)[e ? "home" : "away"],
          t = a.getPlayerColor(this.matchService.composition, e, n.player_role.name);
        return {
          coordinates: l[n.player_role.name],
          color: t
        }
      }, n.prototype.drawCompo = function () {
        console.log("drawing compo, drawer is ready : ", this._compo.isReady);
        for (var n = 0, e = this.matchService.composition.players.filter(function (n) {
            return a.objectInGameAtTime(n)
          }); n < e.length; n++) {
          var l = e[n],
            t = this.getDrawInfo(l.trackable_object);
          this.drawPlayerWithName(t.coordinates, l, t.color)
        }
      }, n.prototype.drawPlayerWithName = function (n, e, l) {
        this._canvasUtils.setStyle(this._compo.context, "#FFFFFF");
        var t = this._compo.canvas.width / u.CANVAS_DEFAULT_WIDTH,
          o = n.x,
          i = n.y - 22 * t,
          a = e.last_name || e.first_name,
          r = this._compo.context.font;
        this._compo.context.font = 10 * t + "px Saira Semi Condensed, sans-serif", this._canvasUtils.drawText(a, o, i, 1, this._compo.context, 40 * t / 2), this._compo.context.font = r, this._canvasUtils.drawJersey(n.x, n.y, e.number.toString(), this._compo.context, l, t, e.highlighted, e.tag)
      }, n.prototype.render = function () {
        this._compo.clearRect(), this.drawCompo()
      }, n
    }()
  },
  Aa5z: function (n, e, l) {
    "use strict";
    var t = l("sXaM"),
      o = l("oPSX"),
      i = l("WT6e"),
      u = l("Xjw4"),
      a = l("sxR1"),
      r = l("D692"),
      s = l("jDyY"),
      c = l("PakY"),
      d = l("J8vI"),
      p = l("joif"),
      m = i.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles],
        data: {}
      });

    function f(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 13, "p", [
        ["class", "debug"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["Frame : "])), (n()(), i.\u0275eld(2, 0, null, null, 1, "b", [
        ["style", "color: #fffb00"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(3, null, [" ", ""])), (n()(), i.\u0275ted(-1, null, ["\n    displayType: "])), (n()(), i.\u0275eld(5, 0, null, null, 1, "b", [
        ["style", "color: #ce4f0c;"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" Noop "])), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(8, 0, null, null, 1, "b", [
        ["style", "color: #0b7342;"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" Action "])), (n()(), i.\u0275ted(-1, null, ["\n    nEventsReceived : "])), (n()(), i.\u0275eld(11, 0, null, null, 1, "b", [
        ["style", "color: #c0a16b;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(12, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n  "]))], null, function (n, e) {
        var l = e.component;
        n(e, 3, 0, l.currentDebugFrame), n(e, 5, 0, !l.drawer || !l.drawer.isPaused), n(e, 8, 0, !l.drawer || l.drawer.isPaused), n(e, 12, 0, l.eventService.contextualEvents.length)
      })
    }

    function h(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, [
        [1, 0],
        ["noop", 1]
      ], null, 26, "div", [
        ["class", "display_wrapper"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(2, 0, null, null, 23, "div", [
        ["class", "events_container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275eld(4, 0, null, null, 20, "div", [
        ["class", "noop_box current_event"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(6, 0, null, null, 3, "div", [
        ["class", "logo-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(8, 0, null, null, 0, "img", [
        ["class", "logo"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275eld(11, 0, null, null, 12, "div", [
        ["class", "text-descr"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(13, 0, null, null, 4, "div", [
        ["class", "event_title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n\n            "])), (n()(), i.\u0275eld(15, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), i.\u0275ted(16, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(19, 0, null, null, 3, "div", [
        ["class", "description"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(21, 0, null, null, 1, "h3", [
        ["id", "noop_text"]
      ], [
        [8, "innerHTML", 1]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275ted(-1, null, ["\n  "]))], null, function (n, e) {
        var l = e.component;
        n(e, 8, 0, i.\u0275inlineInterpolate(1, "", l._image.getUrl("menu/match_information.svg"), "")), n(e, 16, 0, l.translate("Match Information", l.display.lang)), n(e, 21, 0, null == l.eventService.currentStat ? null : l.eventService.currentStat.data.text)
      })
    }

    function g(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, [
        [2, 0],
        ["eventRef", 1]
      ], null, 42, "ul", [
        ["class", "event_box hidden"],
        ["data-event-src-id", ""]
      ], [
        [1, "index", 0]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(2, 0, null, null, 3, "li", [
        ["class", "icon-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(4, 0, null, null, 0, "img", [
        ["class", "event_icon"],
        ["src", ""]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(7, 0, null, null, 3, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(9, 0, null, null, 0, "h1", [
        ["class", "event_title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(12, 0, null, null, 3, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(14, 0, null, null, 0, "h2", [
        ["class", "event_team"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(17, 0, null, null, 11, "li", [
        ["class", "player_main_container illustrated-info"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(19, 0, null, null, 3, "div", [
        ["class", "player_main_icon_container img-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(21, 0, null, null, 0, "img", [
        ["class", "player_main_icon"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(24, 0, null, null, 3, "div", [
        ["class", " text-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(26, 0, null, null, 0, "h3", [
        ["class", "player_main"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(30, 0, null, null, 11, "li", [
        ["class", "player_second_container illustrated-info"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(32, 0, null, null, 3, "div", [
        ["class", "player_second_icon_container img-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(34, 0, null, null, 0, "img", [
        ["class", "player_second_icon"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(37, 0, null, null, 3, "div", [
        ["class", "text-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(39, 0, null, null, 0, "h3", [
        ["class", "player_second"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n      "]))], null, function (n, e) {
        n(e, 0, 0, e.context.$implicit)
      })
    }

    function v(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 8, "div", [
        ["class", "display_wrapper"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(2, 0, null, null, 5, "div", [
        ["class", "events_container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275and(16777216, null, null, 2, null, g)), i.\u0275did(5, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), i.\u0275pad(6, 3), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275ted(-1, null, ["\n  "]))], function (n, e) {
        n(e, 5, 0, n(e, 6, 0, 0, 1, 2))
      }, null)
    }

    function y(n) {
      return i.\u0275vid(0, [i.\u0275qud(671088640, 1, {
        noop: 1
      }), i.\u0275qud(671088640, 2, {
        eventsDivs: 1
      }), (n()(), i.\u0275ted(-1, null, ["\n\n"])), (n()(), i.\u0275eld(3, 0, null, null, 16, "div", [
        ["class", "map-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275eld(5, 0, null, null, 0, "canvas", [
        ["class", "map-overlay"],
        ["id", "map-canvas"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275eld(7, 0, null, null, 0, "img", [
        ["id", "map-image"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275and(16777216, null, null, 1, null, f)), i.\u0275did(10, 16384, null, 0, u.NgIf, [i.ViewContainerRef, i.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n\n  "])), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275and(16777216, null, null, 1, null, h)), i.\u0275did(14, 16384, null, 0, u.NgIf, [i.ViewContainerRef, i.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n\n\n  "])), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275and(16777216, null, null, 1, null, v)), i.\u0275did(18, 16384, null, 0, u.NgIf, [i.ViewContainerRef, i.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n\n\n"])), (n()(), i.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        var l = e.component;
        n(e, 10, 0, l.display.isDebug), n(e, 14, 0, (l.isDisplayingNoop || l.eventService.hasMatchEnded) && !l.display.widgetToDisplay), n(e, 18, 0, l.nEventsToDisplay && l.currentlyDisplayedEvents.size > 0)
      }, function (n, e) {
        var l = e.component;
        n(e, 7, 0, i.\u0275inlineInterpolate(1, "", l._image.getUrl(l.display.fullPerspective ? "full_perspective_field.jpg" : "field_persp.jpg"), ""))
      })
    }

    function b(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 1, "minimap-view", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== i.\u0275nov(n, 1).onResize(l) && t), t
      }, y, m)), i.\u0275did(1, 4243456, null, 0, a.MinimapComponent, [i.ElementRef, r.MatchService, s.DisplayService, c.LoggingService, d.PositionService, p.EventService], null, null)], null, null)
    }
    e.RenderType_MinimapComponent = m, e.View_MinimapComponent_0 = y, e.View_MinimapComponent_Host_0 = b, e.MinimapComponentNgFactory = i.\u0275ccf("minimap-view", a.MinimapComponent, b, {}, {}, [])
  },
  As41: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("wu3h"), l("45Dp"), l("DAFs"), l("FD+i"), l("qXjp"), l("IzNg"), l("MVjO"), l("oFcf"), l("nR/1"), l("cUYv"), l("594w"), l("7N90"), l("/Ife"), l("2tFN"), l("ChGr"), l("5DV0"), l("ZSR1")
  },
  "At+v": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("/Hyb"),
      o = l("8rS7"),
      i = l("PakY"),
      u = void 0;
    "local" != o.environment.name && (u = "https://d7be5e213229436e88825ec9a9c49ddd@sentry.io/130305"), t.config(u, {
      environment: o.environment.name,
      release: o.environment.release
    }).install(), e.RavenErrorHandler = function () {
      function n(n) {
        var e = this;
        setTimeout(function () {
          return e._console = n.get(i.LoggingService)
        })
      }
      return n.prototype.handleError = function (n) {
        var e = this,
          l = n.originalError || "name: " + n.name + " \n content : " + (n.message || n.toString() || JSON.stringify(n));
        throw t.captureException(l), this._console ? this._console.error(l) : setTimeout(function () {
          return e._console.log(l)
        }, 200), n
      }, n
    }(), e.AppModule = function () {}
  },
  AwKb: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.REFEREE = "referee", e.HOME_PLAYER = "home team", e.AWAY_PLAYER = "away team", e.HOME_GOALKEEPER = "home goalkeeper", e.AWAY_GOALKEEPER = "away goalkeeper", e.BALL = "balls", e.Match = function () {}
  },
  BAgd: function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
      for (var e, l = 1, t = arguments.length; l < t; l++)
        for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
      return n
    };
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.NotificationService = function () {
      function n() {
        this.key = 0, this.notifications = []
      }
      return n.prototype.addNotification = function (n) {
        var e = this;
        this.key += 1;
        var l = n.key ? n.key : this.key;
        this.notifications.push(t({
          key: l
        }, n)), n.ttl > 0 && setTimeout(function () {
          return e.removeNotification(l)
        }, n.ttl)
      }, n.prototype.getNotifications = function () {
        return this.notifications
      }, n.prototype.removeNotification = function (n) {
        var e = this.notifications.findIndex(function (e) {
          return e.key == n
        });
        void 0 != e && this.notifications.splice(e, 1)
      }, n
    }()
  },
  C1j0: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("bfOx");
    var t = l("SLR8");
    l("SsVf"), e.LoginViewComponent = function () {
      function n(n, e, l) {
        var o = this;
        this.sessionService = n, this.route = e, this.router = l, this._image = t.images, this.loginError = !1, n.retrieveSession().then(function () {
          n.isLoggedIn() && o.router.navigateByUrl(o.sessionService.redirectUrl || "home")
        }, function () {})
      }
      return n.prototype.login = function (n, e, l) {
        var t = this;
        n.preventDefault(), this.loginError = !1, this.sessionService.login(e, l).then(function () {
          t.route.params.subscribe(function (n) {
            t.router.navigateByUrl(n.next || t.sessionService.redirectUrl || "home")
          })
        }, function (n) {
          t.loginError = !0
        })
      }, n
    }()
  },
  C4jB: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Triggerable = function () {
      function n(e, l, t, o, i, u) {
        void 0 === i && (i = ""), void 0 === u && (u = ""), this.node = e, this.isOpen = l, this.imageOpened = t, this.imageClosed = o, this.descriptionOpen = i, this.descriptionClosed = u, this.image = this.node.querySelector("img"), this.image.style.transitionDuration = n.animationDuration + "s", this.description = this.node.querySelector("p"), this.isOpen ? this.close() : this.open()
      }
      return n.prototype.trigger = function () {
        var e = this;
        console.log("menu triggered, state : ", this.isOpen), this.image.style.width = "0", this.isOpen = !this.isOpen, setTimeout(function () {
          e.image.style.width = "50%", e.isOpen ? e.close() : e.open()
        }, n.animationDuration / 2 * 1e3)
      }, n.prototype.open = function () {
        this.description && (this.description.innerHTML = this.descriptionOpen), this.image.src = this.imageOpened
      }, n.prototype.close = function () {
        this.description && (this.description.innerHTML = this.descriptionClosed), this.image.src = this.imageClosed
      }, n.animationDuration = .4, n
    }()
  },
  CUXk: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("As41");
    var t = l("WT6e"),
      o = l("8rS7");
    l("lMWm"), l("MDfR"), l("HUv8"), l("TDKa"), l("MQ0p"), l("bAW0"), l("dRKc"), l("owTz"), l("xgm2"), l("o53x"), l("VwFy"), l("F3G9"), l("v7CW"), l("XeQn"), l("bqhO"), l("aTdd"), l("cPqY"), l("HUnO");
    var i = l("HBQT"),
      u = l("OE0E");
    "local" != o.environment.name && t.enableProdMode(), u.platformBrowser().bootstrapModuleFactory(i.AppModuleNgFactory).then(function (n) {
      return console.log("Bootstrap success")
    })
  },
  D4Le: function (n, e, l) {
    "use strict";
    var t, o = this && this.__extends || (t = Object.setPrototypeOf || {
        __proto__: []
      }
      instanceof Array && function (n, e) {
        n.__proto__ = e
      } || function (n, e) {
        for (var l in e) e.hasOwnProperty(l) && (n[l] = e[l])
      },
      function (n, e) {
        function l() {
          this.constructor = n
        }
        t(n, e), n.prototype = null === e ? Object.create(e) : (l.prototype = e.prototype, new l)
      });
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var i = l("LfZH"),
      u = l("Gvdl");
    e.formatJsonErrorAsList = function (n) {
      if ("string" == typeof n) return "<p>" + n + "</p>";
      n.error && "object" == typeof n.error && (n = n.error);
      var e = [];
      for (var l in n) n.hasOwnProperty(l) && e.push(l + ": " + JSON.stringify(n[l]));
      return e.length > 0 ? "<ul><li>" + e.join("</li><li>") + "</li></ul>" : "<p>No details about this error!</p>"
    }, e.compareOnId = function (n, e) {
      return n && e && n.id === e.id
    }, e.sortDictByKey = function (n, e) {
      return n.sort(function (n, l) {
        return n[e] > l[e] ? 1 : n[e] < l[e] ? -1 : 0
      })
    }, e.clone = function (n) {
      return JSON.parse(JSON.stringify(n))
    }, e.getTimeInMinutes = function (n) {
      return 60 * parseInt(n.substring(0, 2)) + parseInt(n.substring(3, 5))
    }, e.range = function (n, e) {
      for (var l = [], t = n; t < e; t++) l.push(t);
      return l
    }, e.sortByArray = function (n, e, l) {
      var t = [];
      return e.forEach(function (e) {
        var o = !1;
        n = n.filter(function (n) {
          return !(!o && l(n) == e && (t.push(n), o = !0, 1))
        })
      }), t
    }, e.zip = function (n) {
      return n[0].map(function (e, l) {
        return n.map(function (n) {
          return n[l]
        })
      })
    }, e.secondsToStrDelay = function (n, e) {
      n = parseInt(n, 10);
      var l = Math.floor(n / 86400);
      n -= 3600 * l * 24;
      var t = Math.floor(n / 3600);
      n -= 3600 * t;
      var o = Math.floor(n / 60);
      n -= 60 * o;
      var u = "";
      return l > 1 ? u = l + i.translate(" Days, ", e) : 1 === l && (u = l + i.translate(" Day, ", e)), u + t + i.translate(" Hours, ", e) + o + i.translate(" Minutes, ", e) + n + i.translate(" Seconds", e)
    }, e.getCodeSignification = function (n) {
      var e;
      switch (n.code) {
        case 1e3:
          e = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
          break;
        case 1001:
          e = 'An endpoint is "going away", such as a server going down or a browser having navigated away from a page.';
          break;
        case 1002:
          e = "An endpoint is terminating the connection due to a protocol error";
          break;
        case 1003:
          e = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
          break;
        case 1004:
          e = "Reserved. The specific meaning might be defined in the future.";
          break;
        case 1005:
          e = "No status code was actually present.";
          break;
        case 1006:
          e = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
          break;
        case 1007:
          e = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
          break;
        case 1008:
          e = 'An endpoint is terminating the connection because it has received a message that "violates its policy". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.';
          break;
        case 1009:
          e = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
          break;
        case 1010:
          e = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + n.reason;
          break;
        case 1011:
          e = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
          break;
        case 1015:
          e = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
        default:
          e = "Unknown reason"
      }
      return e
    }, e.ResettableReplaySubject = function (n) {
      function e(e) {
        void 0 === e && (e = Number.POSITIVE_INFINITY);
        var l = n.call(this) || this;
        return l.bufferSize = e, l.source = new u.Subject, l.resetter = new u.Subject, l.destination = new u.ReplaySubject(l.bufferSize), l.observable = l.resetter.asObservable().startWith(null).switchMap(function () {
          return l.destination
        }), l.subscription = l.source.subscribe(l.destination), l
      }
      return o(e, n), e.prototype.next = function (n) {
        this.source.next(n)
      }, e.prototype.reset = function () {
        this.subscription.unsubscribe(), this.destination = new u.ReplaySubject(this.bufferSize), this.subscription = this.source.subscribe(this.destination), this.resetter.next(null)
      }, e.prototype.subscribe = function (n) {
        return void 0 === n && (n = null), this.observable.subscribe(n)
      }, e
    }(u.ReplaySubject)
  },
  D692: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("VKQ6"), l("F3G9");
    var o = l("PJh5"),
      i = l("Gvdl"),
      u = (l("jDyY"), l("SALZ")),
      a = l("FjE5"),
      r = l("Zn+w");
    l("PakY"), e.MatchService = function () {
      function n(n, e, l) {
        var t = this;
        this.httpClient = n, this.display = e, this.console = l, this.isLiveInfoReady = !1, this.fps = {
          video: void 0,
          target: void 0
        }, this.videoType = "mixed", this.isMatchInfoReady$ = new i.BehaviorSubject(!1), this.isInit$ = new i.BehaviorSubject(!1), this.composition = {}, this.instructions = [], e.whenInit().subscribe(function () {
          return t.initMatchData()
        })
      }
      return n.prototype.initMatchData = function () {
        var n = this;
        if (console.log("Initing match data"), this.display.matchId || 0 == this.display.matchId) {
          var e = this.getMatchLiveInfo().map(function (e) {
              return n.updMatchLiveInfo(e)
            }),
            l = this.getMatchInfo().map(function (e) {
              return n.updMatchInfo(e)
            }).do(function (e) {
              return n.isMatchInfoReady$.next(!0)
            });
          u.forkJoin(e, l).do(function () {
            return n.isInit$.next(!0)
          }).subscribe()
        }
      }, n.prototype.whenInit = function () {
        return this.isInit$.filter(function (n) {
          return !!n
        }).first()
      }, n.prototype.whenMatchInfoReady = function () {
        return this.isMatchInfoReady$.filter(function (n) {
          return !!n
        }).first()
      }, n.prototype.resetCompo = function () {
        this.composition.players.forEach(function (n) {
          n.yellow_card = 0, n.red_card = 0, n.goal = 0, n.own_goal = 0, n.injured = !1, n.end_time = null, "00:00:00" != n.start_time && (n.player_role.name = "Substitute", n.start_time = null)
        })
      }, n.prototype.updMatchLiveInfo = function (n) {
        this.fps.video = n.video.fps, this.matchEndTime = n.end_time, this.fps.target = this.fps.video >= 25 ? this.fps.video : (Math.floor(25 / this.fps.video) + 1) * this.fps.video, this.videoType = n.video.video_type;
        var e = n.ws_url;
        this.wsUrl = e && e.length && -1 === e.indexOf("/local/") && "127.0.0.1" != e && "localhost" != e ? "wss://" + e : "ws://localhost:8080", this.isLiveInfoReady = !0
      }, n.prototype.updMatchInfo = function (n) {
        var e = this;
        this.composition = a.setColorsOnComposition(n), this.coverage = n.event_provider ? r.PREMIUM_COVERAGE : r.CLASSIC_COVERAGE, console.log(this.composition);
        var l = (+new Date(n.date_time) - +Date.now()) / 1e3;
        if (l > r.REFRESH_COMPOSITION_BEFORE) {
          var t = l - r.REFRESH_COMPOSITION_BEFORE * Math.random();
          this.console.log("Match has not started yet. Refreshing in:", Math.floor(t / 60), " m ", t % 60, " s"), setTimeout(function () {
            return e.getMatchInfo().subscribe(function (n) {
              return e.updMatchInfo(n)
            })
          }, 1e3 * t)
        }
      }, n.prototype.getMatchInfo = function () {
        return this.httpClient.get("/api/match/" + this.display.matchId + "?lang=" + this.display.lang).catch(function (n) {
          return console.log("err", n), t.Observable.throw(n)
        })
      }, n.prototype.getMatchLiveInfo = function () {
        var n = this;
        return this.httpClient.get("/api/match/" + this.display.matchId + "/match_live").catch(function (e) {
          return 404 == e.status ? (n.isLiveInfoReady = !1, console.warn("Match Live is not ready. Refreshing in 30s..."), t.Observable.timer(3e4).switchMap(function (e) {
            return n.getMatchLiveInfo()
          })) : t.Observable.throw(e)
        })
      }, n.prototype.getInstructions = function (n) {
        var e = this;
        void 0 === n && (n = null), console.log("%c Getting Instructions! ", "background: #222; color: #bada55");
        var l = this.httpClient.get("/api/match/" + this.display.matchId + "/instructions").do(function (n) {
          return e.instructions = n
        });
        return n ? l.filter(function (e) {
          return e.frame > n
        }) : l
      }, n.prototype.getMatches = function (n) {
        void 0 === n && (n = !1);
        var e = "/api/matches/?limit=300";
        if (n) {
          var l = new Date,
            i = o(l).subtract(3, "hours").toDate().toISOString();
          e = e.concat("&date_time__gt=" + i)
        }
        return this.httpClient.get(e).map(function (n) {
          return n.results
        }).catch(function (n) {
          return console.log("getMatches", n), t.Observable.throw(n)
        })
      }, n.prototype.sendEvent = function (n) {
        return this.httpClient.post("/api/registered_events/", JSON.stringify(n))
      }, n.prototype.getTimeline = function (n, e) {
        return void 0 === e && (e = null), this.httpClient.get("/api/match/" + n + "/timeline").map(function (n) {
          return n.timeline
        })
      }, n
    }()
  },
  EWKk: function (n, e, l) {
    "use strict";
    e.styles = ["li[_ngcontent-%COMP%]{list-style-type:none}p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{padding:0;margin:0}*[_ngcontent-%COMP%]{-webkit-box-sizing:content-box;box-sizing:content-box}.box-shadow[_ngcontent-%COMP%]{-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.box-shadow-hover[_ngcontent-%COMP%]{-webkit-box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}.display-flex[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-row[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.flex-column[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{-ms-flex-wrap:wrap;flex-wrap:wrap}.flex-nowrap[_ngcontent-%COMP%]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.border-radius-4px[_ngcontent-%COMP%]{border-radius:4px}.white-bold-text[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center}.scale-150p[_ngcontent-%COMP%]{-webkit-transform:scale(1.5);transform:scale(1.5);z-index:9999999}.scale-130p[_ngcontent-%COMP%]{-webkit-transform:scaleY(1.3) scaleX(1.1);transform:scaleY(1.3) scaleX(1.1);z-index:9999999}.centered-text[_ngcontent-%COMP%]{margin-left:50%;margin-top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.scoreboard-btn[_ngcontent-%COMP%]{position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.greyed[_ngcontent-%COMP%]{opacity:.3}.inner-modal[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;z-index:999999}.scoreboard_relative_container[_ngcontent-%COMP%]{position:relative;height:100%;width:100%;font-family:'Saira Semi Condensed',sans-serif}.minimap-menu-btn[_ngcontent-%COMP%]{height:100%;z-index:10;width:8%;right:6.5%;position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:distribute;justify-content:space-around;text-align:center;color:#fff;-webkit-transition:1s;transition:1s;cursor:pointer}.minimap-menu-btn[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:50%;margin:auto}.timer[_ngcontent-%COMP%]{height:100%;z-index:4;width:8%;left:8.5%;position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:distribute;justify-content:space-around;text-align:center;color:#fff}.timer[_ngcontent-%COMP%]   .digits[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1 0 35%;flex:1 0 35%;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.timer[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1 0 10%;flex:1 0 10%;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.score[_ngcontent-%COMP%]{height:100%;z-index:4;width:35%;margin-left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-pack:distribute;justify-content:space-around;text-align:center;color:#fff;font-weight:200;overflow:hidden}.largeTeamName[_ngcontent-%COMP%]{width:59%!important}.score[_ngcontent-%COMP%]   .digits[_ngcontent-%COMP%]{height:95%;-ms-flex-item-align:center;align-self:center;-webkit-box-flex:3;-ms-flex:3;flex:3;padding:0 2%;color:#fff;font-weight:900;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-transform-origin:center;transform-origin:center;-webkit-transform:scale(1.5);transform:scale(1.5)}.score[_ngcontent-%COMP%]   .digits[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.score[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{width:0;height:60%;border:2px solid;border-radius:5px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-ms-flex-item-align:center;align-self:center;background:#fff}.score[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center}.score[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]{-webkit-box-flex:15;-ms-flex:15;flex:15;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;height:100%;-ms-flex-item-align:center;align-self:center}.float-left[_ngcontent-%COMP%]{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center;text-align:left}.float-right[_ngcontent-%COMP%]{-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center;text-align:right}.score[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .jersey[_ngcontent-%COMP%]{height:100%;-webkit-box-flex:0;-ms-flex:0 0 40%;flex:0 0 40%;display:-webkit-box;display:-ms-flexbox;display:flex}.score[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .jersey[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60%;margin:auto}.score[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{-webkit-box-flex:0;-ms-flex:0 0 60%;flex:0 0 60%;margin:auto!important}@media screen and (max-width:550px){.regular-text[_ngcontent-%COMP%]{font-size:4vw}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(1.5px + 2vw)}.score[_ngcontent-%COMP%]   .separator[_ngcontent-%COMP%]{border:1px solid}}@media screen and (max-width:700px) and (min-width:551px){.regular-text[_ngcontent-%COMP%]{font-size:calc(6px + 2vw)}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(6px + 1vw)}}@media screen and (min-width:700px) and (max-width:900px){.regular-text[_ngcontent-%COMP%]{font-size:calc(16px + .8vw)}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(8px + .8vw)}}@media screen and (min-width:900px) and (max-width:1400px){.regular-text[_ngcontent-%COMP%]{font-size:calc(16px + .8vw)}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(8px + .8vw)}}@media screen and (min-width:1401px){.regular-text[_ngcontent-%COMP%]{font-size:calc(18px + .5vw)}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:calc(10px + .5vw)}}.large-teams[_ngcontent-%COMP%]{width:45%}.large-teams[_ngcontent-%COMP%]   .team[_ngcontent-%COMP%]   .jersey[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50%}"]
  },
  FZ1G: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("m4s2"),
      i = l("9NDR"),
      u = l("D692"),
      a = l("jDyY"),
      r = l("pxu+"),
      s = l("Zkkf"),
      c = l("bfOx"),
      d = t.\u0275crt({
        encapsulation: 2,
        styles: [],
        data: {}
      });

    function p(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "compositions", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var o = !0;
        return "window:resize" === e && (o = !1 !== t.\u0275nov(n, 1).resizeCanvas(l) && o), o
      }, o.View_CompositionComponent_0, o.RenderType_CompositionComponent)), t.\u0275did(1, 4243456, null, 0, i.CompositionComponent, [t.ElementRef, u.MatchService, a.DisplayService], null, null)], null, null)
    }

    function m(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "view-live", [], null, null, null, p, d)), t.\u0275did(1, 114688, null, 0, r.CompositionViewComponent, [s.CompositionsService, c.ActivatedRoute], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_CompositionViewComponent = d, e.View_CompositionViewComponent_0 = p, e.View_CompositionViewComponent_Host_0 = m, e.CompositionViewComponentNgFactory = t.\u0275ccf("view-live", r.CompositionViewComponent, m, {}, {}, [])
  },
  FfWz: function (n, e, l) {
    "use strict";
    e.styles = ["li[_ngcontent-%COMP%]{list-style-type:none}p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{padding:0;margin:0}*[_ngcontent-%COMP%]{-webkit-box-sizing:content-box;box-sizing:content-box}.box-shadow[_ngcontent-%COMP%]{-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.box-shadow-hover[_ngcontent-%COMP%]{-webkit-box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}.display-flex[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-row[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.flex-column[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{-ms-flex-wrap:wrap;flex-wrap:wrap}.flex-nowrap[_ngcontent-%COMP%]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.border-radius-4px[_ngcontent-%COMP%]{border-radius:4px}.white-bold-text[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center}.scale-150p[_ngcontent-%COMP%]{-webkit-transform:scale(1.5);transform:scale(1.5);z-index:9999999}.scale-130p[_ngcontent-%COMP%]{-webkit-transform:scaleY(1.3) scaleX(1.1);transform:scaleY(1.3) scaleX(1.1);z-index:9999999}.centered-text[_ngcontent-%COMP%]{margin-left:50%;margin-top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.scoreboard-btn[_ngcontent-%COMP%]{position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.greyed[_ngcontent-%COMP%]{opacity:.3}.inner-modal[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;z-index:999999}#menu-slider[_ngcontent-%COMP%]{position:absolute;-webkit-transition-duration:.4s;transition-duration:.4s;width:40%;height:100%;right:-40%;top:0;background-color:#000;z-index:5;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.empty-space[_ngcontent-%COMP%]{-webkit-box-flex:0;-ms-flex:0 0 10vh;flex:0 0 10vh;max-height:9.7vw;width:100%}.option[_ngcontent-%COMP%]:hover{background:rgba(255,255,255,.33)}.option[_ngcontent-%COMP%]{color:#fff;cursor:pointer;-webkit-box-flex:1;-ms-flex:1;flex:1;width:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;border-radius:2%}.option-icon[_ngcontent-%COMP%]{-webkit-box-flex:30%;-ms-flex:30%;flex:30%;color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex}.option-description[_ngcontent-%COMP%]{-webkit-box-flex:70%;-ms-flex:70%;flex:70%;display:-webkit-box;display:-ms-flexbox;display:flex}.option-description[_ngcontent-%COMP%] > *[_ngcontent-%COMP%], .option-icon[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:auto}img[_ngcontent-%COMP%]{width:50%}p[_ngcontent-%COMP%]{font-size:calc(6px + 1vw);margin-left:0!important}"]
  },
  FiIa: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("W903"),
      i = l("jKnT"),
      u = l("7G+B"),
      a = l("f7mB"),
      r = l("Xjw4"),
      s = l("bfOx"),
      c = l("NU7y"),
      d = l("BAgd"),
      p = l("PakY"),
      m = l("Z/zE"),
      f = t.\u0275crt({
        encapsulation: 2,
        styles: [],
        data: {}
      });

    function h(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "user-message", [], null, null, null, o.View_UserMessageComponent_0, o.RenderType_UserMessageComponent)), t.\u0275did(1, 114688, null, 0, i.UserMessageComponent, [], {
        notification: [0, "notification"],
        onClose: [1, "onClose"]
      }, null)], function (n, e) {
        n(e, 1, 0, e.context.$implicit, e.component.dismissNotificationFactory(e.context.index))
      }, null)
    }

    function g(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 2, "debug-logs", [], null, [
        [null, "rmLog"]
      ], function (n, e, l) {
        var t = !0;
        return "rmLog" === e && (t = !1 !== n.component.removeLog(l) && t), t
      }, u.View_DebugLogs_0, u.RenderType_DebugLogs)), t.\u0275did(1, 4243456, null, 0, a.DebugLogs, [], {
        logs: [0, "logs"]
      }, {
        rmLog: "rmLog"
      }), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 1, 0, e.component.getLogs())
      }, null)
    }

    function v(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275and(16777216, null, null, 1, null, h)), t.\u0275did(1, 802816, null, 0, r.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n"])), (n()(), t.\u0275eld(3, 16777216, null, null, 2, "router-outlet", [], null, null, null, null, null)), t.\u0275did(4, 212992, null, 0, s.RouterOutlet, [s.ChildrenOutletContexts, t.ViewContainerRef, t.ComponentFactoryResolver, [8, null], t.ChangeDetectorRef], null, null), (n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275ted(-1, null, ["\n\n"])), (n()(), t.\u0275and(16777216, null, null, 1, null, g)), t.\u0275did(8, 16384, null, 0, r.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.notifications), n(e, 4, 0), n(e, 8, 0, l.isDebug)
      }, null)
    }

    function y(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "my-app", [], null, null, null, v, f)), t.\u0275did(1, 114688, null, 0, c.AppComponent, [d.NotificationService, p.LoggingService, s.ActivatedRoute, m.Angulartics2GoogleAnalytics], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_AppComponent = f, e.View_AppComponent_0 = v, e.View_AppComponent_Host_0 = y, e.AppComponentNgFactory = t.\u0275ccf("my-app", c.AppComponent, y, {}, {}, [])
  },
  FjE5: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("D4Le"),
      o = l("gvjY"),
      i = l("Zn+w"),
      u = l("wtpC"),
      a = l("AwKb");

    function r(n, e) {
      var l = e.players.find(function (e) {
        return e.trackable_object == n
      });
      if (l) return {
        object: l,
        object_type: "player"
      };
      var t = e.referees.find(function (e) {
        return e.trackable_object == n
      });
      return t ? {
        object: t,
        object_type: "referee"
      } : e.ball.trackable_object == n ? {
        object: e.ball,
        object_type: "ball"
      } : {
        object: void 0,
        object_type: void 0
      }
    }

    function s(n, e, l) {
      void 0 === l && (l = "");
      var t = {
        home: "Goalkeeper" === l ? n.home_team_goal_color : n.home_team_color,
        away: "Goalkeeper" === l ? n.away_team_goal_color : n.away_team_color
      };
      return e ? t.home : t.away
    }

    function c(n, e, l) {
      void 0 === l && (l = "");
      var t = {
        home: "Goalkeeper" === l ? m(n.home_team_goal_color) : n.home_number_color,
        away: "Goalkeeper" === l ? m(n.away_team_goal_color) : n.away_number_color
      };
      return e ? t.home : t.away
    }

    function d(n, e) {
      var l, t, o = r(n.trackable_object, e),
        i = o.object,
        u = o.object_type;
      if ("ball" === u) i.number = "", t = m(l = e.referee_color);
      else if ("referee" === u) i.number = "R", t = m(l = e.referee_color);
      else {
        if ("player" !== u) return {
          number: void 0,
          color: void 0,
          numberColor: void 0,
          drawNumber: !1
        };
        l = s(e, e.home_team.id === i.team_id, i.player_role.name), t = c(e, e.home_team.id === i.team_id, i.player_role.name)
      }
      return {
        number: i.number,
        color: l,
        numberColor: t,
        drawNumber: !0
      }
    }

    function p(n, e) {
      var l, t, o, i = n.group_name;
      return i === a.BALL ? (o = "", t = m(l = e.referee_color)) : i === a.REFEREE ? (o = "R", t = m(l = e.referee_color)) : i === a.HOME_PLAYER ? (l = e.home_team_color, t = e.home_number_color) : i === a.AWAY_PLAYER ? (l = e.away_team_color, t = e.away_number_color) : i === a.HOME_GOALKEEPER ? t = m(l = e.home_team_goal_color) : i === a.AWAY_GOALKEEPER ? t = m(l = e.away_team_goal_color) : console.log(n, " IS NOT A VALID trackable FORMAT !"), {
        number: o,
        color: l,
        numberColor: t,
        drawNumber: !1
      }
    }

    function m(n) {
      return parseInt(n.substring(1, 3), 16) + parseInt(n.substring(3, 5), 16) + parseInt(n.substring(5, 7), 16) > 382.5 ? "#000000" : "#FFFFFF"
    }

    function f(n) {
      var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);
      return e ? [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)] : null
    }

    function h(n, e) {
      var l = f(n),
        t = l[0],
        o = l[1],
        i = l[2],
        u = f(e),
        a = u[1],
        r = u[2];
      return Math.sqrt((Math.pow(u[0] - t, 2) + Math.pow(a - o, 2) + Math.pow(r - i, 2)) / 3)
    }

    function g(n, e, l) {
      var t = Object.assign({}, n);
      return n.isPerspectiveMode === e.isPerspectiveMode && n.isZoomMode === e.isZoomMode && (t.x = (1 - l) * n.x + l * e.x, t.y = (1 - l) * n.y + l * e.y, t.velocity = (1 - l) * n.velocity + l * e.velocity), t.interpolated = !0, t
    }
    e.objectInGameAtTime = function (n, e) {
      function l(n) {
        var e = n.split(":").map(function (n) {
          return parseInt(n)
        });
        return 3600 * e[0] + 60 * e[1] + e[2]
      }
      if (void 0 === e && (e = "00:00:00"), e = e || "00:00:00", !n.start_time) return !1;
      var t = l(n.start_time),
        o = n.end_time ? l(n.end_time) : Math.pow(10, 10),
        i = l(e);
      return o >= i && i >= t
    }, e.getObjectById = r, e.getPlayerColor = s, e.getPlayerNumberColor = c, e.getDrawablesInfo = function (n, e) {
      for (var l, t = [], o = 0, i = n; o < i.length; o++) {
        var u = i[o];
        l = Object.assign({}, u), (l = u.hasOwnProperty("trackable_object") ? Object.assign(l, d(l, e)) : Object.assign(l, p(l, e))).uniqueId = l.unique_id, t.push(l)
      }
      return t
    }, e.trackableIsBall = function (n, e) {
      return "" == (n.hasOwnProperty("trackable_object") ? d(n, e) : p(n, e)).number
    }, e.getDrawableThroughTrackableObject = d, e.getDrawableThroughGroupName = p, e.getAccentColor = m, e.hexToRgb = f, e.distBetweenColors = h, e.setColorsOnComposition = function (n) {
      var e, l = n.home_team_kit_color.jersey_color,
        t = n.away_team_kit_color.jersey_color;
      return h(l, t) < i.DIST_COLOR_THRESHOLD && h(l, t = n.away_team_kit_color.short_color) < i.DIST_COLOR_THRESHOLD && h(l = n.home_team_kit_color.short_color, t = n.away_team_kit_color.jersey_color) < i.DIST_COLOR_THRESHOLD && (t = n.away_team_kit_color.short_color), e = function (n, e, l) {
        return n.sort(function (n, t) {
          return h(n, e) + h(n, l) - h(t, e) - h(t, l)
        }).slice(n.length - 3)
      }(i.REFEREE_GOAL_COLORS, l, t), n.home_team_goal_color = e[0], n.away_team_goal_color = e[1], n.referee_color = e[2], n.home_team_color = l, n.away_team_color = t, n.home_number_color = n.home_team_kit_color.number_color, n.away_number_color = n.away_team_kit_color.number_color, delete n.home_team_kit_color, delete n.away_team_kit_color, n
    }, e.linearInterpolateFrame = g, e.getInterpolatedFrames = function (n, e, l, i) {
      if (!n || !e) return [];
      var u = Math.floor(i / l) - 1,
        a = t.range(0, u).map(function (e) {
          return {
            type: o.ACTION_NOOP,
            data: [],
            frame: n.frame
          }
        });
      if (e.type === o.ACTION_FRAME && n.type === o.ACTION_FRAME)
        for (var r = function (n) {
            var l = e.data.find(function (e) {
              return e.unique_id == n.unique_id
            });
            if (l)
              for (var t = 0; t < u; t++) a[t].type = o.ACTION_FRAME, a[t].data.push(g(n, l, (1 + t) / (1 + u)))
          }, s = 0, c = n.data; s < c.length; s++) r(c[s]);
      return [n].concat(a)
    }, e.applyKernelRegression = function (n, e) {
      var l = 0,
        t = [],
        o = [],
        i = [];
      n.forEach(function (n) {
        null !== n.x && null !== n.y && (t.push(l), o.push(n.x), i.push(n.y), l++)
      });
      var a = u.regression(t, o, u.epanechnikov, 2.8),
        r = u.regression(t, i, u.epanechnikov, 2.8),
        s = n.slice(e);
      l = e, s.forEach(function (n) {
        null !== n.x && null !== n.y && (n.x = a(l), n.y = r(l), l++)
      })
    }
  },
  GYfm: function (n, e, l) {
    "use strict";
    var t = l("sXaM"),
      o = l("vqlA"),
      i = l("WT6e"),
      u = l("Xjw4"),
      a = l("mOI5"),
      r = l("OE0E"),
      s = l("jDyY"),
      c = l("D692"),
      d = i.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles],
        data: {}
      });

    function p(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 36, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n              "])), (n()(), i.\u0275eld(2, 0, null, null, 1, "div", [
        ["class", "infos-player"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(3, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n              "])), (n()(), i.\u0275eld(5, 0, null, null, 30, "div", [
        ["class", "infos-icons"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(7, 0, null, null, 1, "span", [
        ["class", "infos-icon-goal"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(10, 0, null, null, 1, "span", [
        ["class", "infos-icon-goal"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(13, 0, null, null, 1, "span", [
        ["class", "infos-icon-goal-sum"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(14, null, ["\n                  x", "\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(16, 0, null, null, 1, "span", [
        ["class", "infos-icon-own-goal"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(19, 0, null, null, 1, "span", [
        ["class", "infos-icon-own-goal"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(22, 0, null, null, 1, "span", [
        ["class", "infos-icon-goal-sum"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(23, null, ["\n                  x", "\n                "])), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(25, 0, null, null, 0, "span", [
        ["class", "infos-icon-yellow"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(27, 0, null, null, 0, "span", [
        ["class", "infos-icon-red"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(29, 0, null, null, 0, "span", [
        ["class", "infos-icon-in"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(31, 0, null, null, 0, "span", [
        ["class", "infos-icon-out"]
      ], [
        [2, "hidden", null],
        [4, "background-image", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n\n                "])), (n()(), i.\u0275eld(33, 0, null, null, 1, "span", [
        ["style", "width: 1px; visibility: hidden;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["."])), (n()(), i.\u0275ted(-1, null, ["\n              "])), (n()(), i.\u0275ted(-1, null, ["\n\n            "]))], null, function (n, e) {
        var l = e.component;
        n(e, 3, 0, l.factoredName(e.context.$implicit)), n(e, 5, 0, !(e.context.$implicit.red_card || e.context.$implicit.yellow_card || e.context.$implicit.goal || e.context.$implicit.own_goal || e.context.$implicit.end_time || "00:00:00" !== e.context.$implicit.start_time)), n(e, 7, 0, !(e.context.$implicit.goal > 0), l.getTrustedImage("menu/compo_picto.svg#infos-goal")), n(e, 10, 0, !(2 === e.context.$implicit.goal), l.getTrustedImage("menu/compo_picto.svg#infos-goal")), n(e, 13, 0, !(e.context.$implicit.goal > 2)), n(e, 14, 0, e.context.$implicit.goal), n(e, 16, 0, !(e.context.$implicit.own_goal > 0), l.getTrustedImage("menu/compo_picto.svg#infos-own-goal")), n(e, 19, 0, !(2 === e.context.$implicit.own_goal), l.getTrustedImage("menu/compo_picto.svg#infos-own-goal")), n(e, 22, 0, !(e.context.$implicit.own_goal > 2)), n(e, 23, 0, e.context.$implicit.own_goal), n(e, 25, 0, !e.context.$implicit.yellow_card, l.getTrustedImage("menu/compo_picto.svg#infos-yellow")), n(e, 27, 0, !e.context.$implicit.red_card, l.getTrustedImage("menu/compo_picto.svg#infos-red")), n(e, 29, 0, !(e.context.$implicit.start_time && "00:00:00" != e.context.$implicit.start_time), l.getTrustedImage("menu/compo_picto.svg#infos-in")), n(e, 31, 0, !(e.context.$implicit.end_time && !e.context.$implicit.red_card), l.getTrustedImage("menu/compo_picto.svg#infos-out"))
      })
    }

    function m(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 7, "ul", [
        ["class", "infos-list"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(2, 0, null, null, 1, "li", [
        ["class", "title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(3, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275and(16777216, null, null, 1, null, p)), i.\u0275did(6, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n          "]))], function (n, e) {
        n(e, 6, 0, e.component.matchPlayers[e.parent.context.$implicit + e.context.$implicit])
      }, function (n, e) {
        var l = e.component;
        n(e, 3, 0, l.translate("Players" == e.context.$implicit ? "started" : "substitutes", l.display.lang))
      })
    }

    function f(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 13, "div", [], [
        [8, "className", 0]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(2, 0, null, null, 6, "div", [
        ["class", "infos-coach"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(4, 0, null, null, 0, "span", [
        ["class", "team-disk-color"]
      ], [
        [4, "background-color", null]
      ], null, null, null, null)), (n()(), i.\u0275ted(5, null, ["\n            ", ":\n            "])), (n()(), i.\u0275eld(6, 0, null, null, 1, "span", [
        ["class", "infos-name"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(7, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n\n          "])), (n()(), i.\u0275and(16777216, null, null, 2, null, m)), i.\u0275did(11, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), i.\u0275pad(12, 2), (n()(), i.\u0275ted(-1, null, ["\n\n        "]))], function (n, e) {
        n(e, 11, 0, n(e, 12, 0, "Players", "Substitutes"))
      }, function (n, e) {
        var l = e.component;
        n(e, 0, 0, i.\u0275inlineInterpolate(1, "infos-team infos-team-", e.context.$implicit, "")), n(e, 4, 0, l.teamColors[e.context.$implicit]), n(e, 5, 0, l.translate("coach", l.display.lang)), n(e, 7, 0, "home" === e.context.$implicit ? l.homeCoachName : l.awayCoachName)
      })
    }

    function h(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 22, "div", [
        ["class", "display_wrapper"],
        ["style", "z-index: 53;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275eld(2, 0, null, null, 19, "div", [
        ["class", "compo-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(4, 0, null, null, 16, "div", [
        ["class", "compo-infos"]
      ], null, null, null, null, null)), i.\u0275did(5, 278528, null, 0, u.NgClass, [i.IterableDiffers, i.KeyValueDiffers, i.ElementRef, i.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), i.\u0275pod(6, {
        "full-perspective": 0
      }), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275eld(8, 0, null, null, 4, "div", [
        ["class", "infos-referee"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(9, null, ["\n        ", ": "])), (n()(), i.\u0275eld(10, 0, null, null, 1, "span", [
        ["class", "infos-name"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(11, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275eld(14, 0, null, null, 5, "div", [
        ["class", "infos-teams"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275and(16777216, null, null, 2, null, f)), i.\u0275did(17, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), i.\u0275pad(18, 2), (n()(), i.\u0275ted(-1, null, ["\n\n      "])), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275ted(-1, null, ["\n"])), (n()(), i.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 5, 0, "compo-infos", n(e, 6, 0, e.component.display.fullPerspective)), n(e, 17, 0, n(e, 18, 0, "home", "away"))
      }, function (n, e) {
        var l = e.component;
        n(e, 9, 0, l.translate("Referee", l.display.lang)), n(e, 11, 0, l.refereeName)
      })
    }

    function g(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 1, "match-sheet", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== i.\u0275nov(n, 1).onResize(l) && t), t
      }, h, d)), i.\u0275did(1, 4243456, null, 0, a.MatchSheetComponent, [r.DomSanitizer, s.DisplayService, c.MatchService], null, null)], null, null)
    }
    e.RenderType_MatchSheetComponent = d, e.View_MatchSheetComponent_0 = h, e.View_MatchSheetComponent_Host_0 = g, e.MatchSheetComponentNgFactory = i.\u0275ccf("match-sheet", a.MatchSheetComponent, g, {}, {}, [])
  },
  GYns: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("7DMc"),
      i = l("Xjw4"),
      u = l("qs3f"),
      a = l("lOd9"),
      r = l("ElZy"),
      s = l("Ki8D"),
      c = l("j+m6"),
      d = l("ItHS"),
      p = l("6Y8j"),
      m = l("Zkkf"),
      f = l("6sdY"),
      h = l("0NEb"),
      g = l("BAgd"),
      v = t.\u0275crt({
        encapsulation: 0,
        styles: ["th[_ngcontent-%COMP%], td[_ngcontent-%COMP%] {\n      text-align: center;\n    }\n    .isRequired[_ngcontent-%COMP%]{\n      margin-top: -41px;\n        height: 40px;\n        border: 3px solid #a94442;\n        border-bottom-left-radius: 3px;\n        border-top-left-radius: 3px;\n        width: 5px;\n      z-index:1000;\n      position: absolute;\n    }\n    span.color-box[_ngcontent-%COMP%] {\n      display: inline-block;\n      border: 1px solid black;\n      width: 100px;\n      text-align: center;\n      font-weight: bold;\n    }"],
        data: {}
      });

    function y(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.name), n(e, 2, 0, e.context.$implicit.name)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function b(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 18, "div", [
        ["class", "radio"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(2, 0, null, null, 15, "label", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275eld(4, 0, null, null, 6, "input", [
        ["type", "radio"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 5)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 5).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 5)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 5)._compositionEnd(l.target.value) && o), "change" === e && (o = !1 !== t.\u0275nov(n, 6).onChange() && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 6).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.colorKit = l) && o), "ngModelChange" === e && (o = !1 !== i.onSeasonKitSelected(l) && o), o
      }, null, null)), t.\u0275did(5, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(6, 212992, null, 0, o.RadioControlValueAccessor, [t.Renderer2, t.ElementRef, o.\u0275i, t.Injector], {
        name: [0, "name"],
        value: [1, "value"]
      }, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [o.DefaultValueAccessor, o.RadioControlValueAccessor]), t.\u0275did(8, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(10, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(11, null, ["\n              ", " - ", " -\n              "])), (n()(), t.\u0275eld(12, 0, null, null, 1, "span", [
        ["class", "color-box"]
      ], [
        [4, "background-color", null],
        [4, "color", null]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Jersey"])), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275eld(15, 0, null, null, 1, "span", [
        ["class", "color-box"]
      ], [
        [4, "background-color", null],
        [4, "color", null]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Short"])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "]))], function (n, e) {
        var l = e.component;
        n(e, 6, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-color-kit-option"), e.context.$implicit.kit_color), n(e, 8, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-color-kit-option"), l.colorKit)
      }, function (n, e) {
        var l = e.component;
        n(e, 4, 0, t.\u0275nov(e, 10).ngClassUntouched, t.\u0275nov(e, 10).ngClassTouched, t.\u0275nov(e, 10).ngClassPristine, t.\u0275nov(e, 10).ngClassDirty, t.\u0275nov(e, 10).ngClassValid, t.\u0275nov(e, 10).ngClassInvalid, t.\u0275nov(e, 10).ngClassPending), n(e, 11, 0, e.context.$implicit.season.name, e.context.$implicit.name), n(e, 12, 0, e.context.$implicit.kit_color.jersey_color, e.context.$implicit.kit_color.number_color), n(e, 15, 0, e.context.$implicit.kit_color.short_color, l.blackOrWhiteText(e.context.$implicit.kit_color.short_color))
      })
    }

    function C(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.id), n(e, 2, 0, e.context.$implicit.id)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function _(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], null, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], null, null), (n()(), t.\u0275ted(3, null, ["", ""]))], null, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function w(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 33, "tr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(2, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(3, null, ["", ""])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(5, 0, null, null, 12, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(7, 0, null, null, 9, "select", [
        ["class", "form-control"],
        ["name", "sub-player-role"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 8).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 8).onTouched() && o), "ngModelChange" === e && (o = !1 !== i.onRoleSelected(l, n.context.index) && o), o
      }, null, null)), t.\u0275did(8, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(10, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(12, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275and(16777216, null, null, 1, null, _)), t.\u0275did(15, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(19, 0, null, null, 7, "td", [], null, null, null, null, null)), (n()(), t.\u0275eld(20, 0, null, null, 6, "input", [
        ["class", "form-control"],
        ["max", "100"],
        ["min", "0"],
        ["name", "sub-player-number"],
        ["type", "number"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 21)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 21).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 21)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 21)._compositionEnd(l.target.value) && o), "change" === e && (o = !1 !== t.\u0275nov(n, 22).onChange(l.target.value) && o), "input" === e && (o = !1 !== t.\u0275nov(n, 22).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 22).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.players[n.context.index].number = l) && o), o
      }, null, null)), t.\u0275did(21, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(22, 16384, null, 0, o.\u0275bc, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [o.DefaultValueAccessor, o.\u0275bc]), t.\u0275did(24, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(26, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(28, 0, null, null, 4, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(30, 0, null, null, 1, "button", [
        ["class", "btn btn-danger"],
        ["type", "button"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.deletePlayer(n.context.index) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Delete player"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "]))], function (n, e) {
        var l = e.component;
        n(e, 10, 0, "sub-player-role", l.players[e.context.index].player_role.name), n(e, 15, 0, l.roleOptions), n(e, 24, 0, "sub-player-number", l.players[e.context.index].number)
      }, function (n, e) {
        n(e, 3, 0, e.component.formatPlayerName(e.context.$implicit)), n(e, 7, 0, t.\u0275nov(e, 12).ngClassUntouched, t.\u0275nov(e, 12).ngClassTouched, t.\u0275nov(e, 12).ngClassPristine, t.\u0275nov(e, 12).ngClassDirty, t.\u0275nov(e, 12).ngClassValid, t.\u0275nov(e, 12).ngClassInvalid, t.\u0275nov(e, 12).ngClassPending), n(e, 20, 0, t.\u0275nov(e, 26).ngClassUntouched, t.\u0275nov(e, 26).ngClassTouched, t.\u0275nov(e, 26).ngClassPristine, t.\u0275nov(e, 26).ngClassDirty, t.\u0275nov(e, 26).ngClassValid, t.\u0275nov(e, 26).ngClassInvalid, t.\u0275nov(e, 26).ngClassPending)
      })
    }

    function x(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", " ", "\n                "]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.last_name, e.context.$implicit.first_name)
      })
    }

    function S(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.name), n(e, 2, 0, e.context.$implicit.name)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function O(n) {
      return t.\u0275vid(0, [t.\u0275qud(671088640, 1, {
        controls: 1
      }), t.\u0275qud(402653184, 2, {
        seasonKitTabs: 0
      }), (n()(), t.\u0275eld(2, 0, null, null, 251, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(4, 0, null, null, 23, "div", [
        ["class", "form-group row has-feedback"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(6, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], [
        [8, "htmlFor", 0]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Team name"])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(9, 0, null, null, 17, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(11, 0, null, null, 7, "input", [
        ["class", "form-control"],
        ["list", "teams"],
        ["required", ""],
        ["type", "text"]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "focusout"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 12)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 12).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 12)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 12)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.teamLongName = l) && o), "input" === e && (o = !1 !== i.onTeamSelected(!0) && o), "focusout" === e && (o = !1 !== i.checkTeamIntegrity() && o), o
      }, null, null)), t.\u0275did(12, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(13, 16384, null, 0, o.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, o.NG_VALIDATORS, function (n) {
        return [n]
      }, [o.RequiredValidator]), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(16, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [2, o.NG_VALIDATORS],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(18, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(20, 0, null, null, 5, "datalist", [
        ["id", "teams"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275and(16777216, null, null, 2, null, y)), t.\u0275did(23, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(29, 0, null, null, 7, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(31, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Team coach"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(34, 0, null, null, 1, "div", [
        ["class", "col-sm-4"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(35, null, ["\n      ", " ", "\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275eld(38, 0, null, null, 112, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(40, 0, null, null, 109, "tabset", [
        ["class", "form-group row"]
      ], [
        [2, "tab-container", null]
      ], null, null, u.View_TabsetComponent_0, u.RenderType_TabsetComponent)), t.\u0275did(41, 180224, [
        [2, 4],
        ["seasonKitTabs", 4]
      ], 0, a.TabsetComponent, [r.TabsetConfig, t.Renderer2], null, null), (n()(), t.\u0275ted(-1, 0, ["\n      "])), (n()(), t.\u0275eld(43, 0, null, 0, 0, "div", [], [
        [2, "isRequired", null]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, 0, ["\n      "])), (n()(), t.\u0275eld(45, 0, null, 0, 8, "tab", [], [
        [1, "id", 0],
        [2, "active", null],
        [2, "tab-pane", null]
      ], null, null, null, null)), t.\u0275did(46, 212992, null, 0, s.TabDirective, [a.TabsetComponent, t.ElementRef, t.Renderer2], {
        heading: [0, "heading"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275eld(48, 0, null, null, 4, "div", [
        ["style", "max-height: 200px; display: inline-block; overflow-y:scroll; padding-left: 10px; padding-right: 10px;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 1, null, b)), t.\u0275did(51, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, 0, ["\n\n      "])), (n()(), t.\u0275eld(55, 0, null, 0, 93, "tab", [
        ["heading", "Create a new season kit"]
      ], [
        [1, "id", 0],
        [2, "active", null],
        [2, "tab-pane", null]
      ], null, null, null, null)), t.\u0275did(56, 212992, null, 0, s.TabDirective, [a.TabsetComponent, t.ElementRef, t.Renderer2], {
        heading: [0, "heading"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275eld(58, 0, null, null, 14, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(60, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Name"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(63, 0, null, null, 8, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(65, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["placeholder", "Season kit name (i.e. home, away, third ...)"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 66)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 66).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 66)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 66)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newSeasonKit.name = l) && o), o
      }, null, null)), t.\u0275did(66, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(68, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(70, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(74, 0, null, null, 19, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(76, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Season"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(79, 0, null, null, 13, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(81, 0, null, null, 10, "select", [
        ["class", "form-control"],
        ["name", "season"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 82).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 82).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.newSeasonKit.season_id = l) && o), o
      }, null, null)), t.\u0275did(82, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(84, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(86, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275and(16777216, null, null, 2, null, C)), t.\u0275did(89, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(95, 0, null, null, 14, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(97, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Jersey color"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(100, 0, null, null, 8, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(102, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["type", "color"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 103)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 103).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 103)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 103)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newSeasonKit.kit_color.jersey_color = l) && o), "change" === e && (o = !1 !== i.onJerseyColorChange() && o), o
      }, null, null)), t.\u0275did(103, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(105, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(107, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(111, 0, null, null, 14, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(113, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Number color"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(116, 0, null, null, 8, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(118, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["type", "color"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 119)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 119).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 119)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 119)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newSeasonKit.kit_color.number_color = l) && o), o
      }, null, null)), t.\u0275did(119, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(121, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(123, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(127, 0, null, null, 20, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(129, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Short color"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(132, 0, null, null, 8, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(134, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["type", "color"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 135)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 135).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 135)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 135)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newSeasonKit.kit_color.short_color = l) && o), o
      }, null, null)), t.\u0275did(135, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(137, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(139, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(142, 0, null, null, 4, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(144, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.createTeamSeasonKit() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Create season kit\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, 0, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275eld(152, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275eld(154, 0, null, null, 98, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(156, 0, null, null, 92, "fieldset", [], [
        [8, "disabled", 0]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(158, 0, null, null, 89, "table", [
        ["class", "table table-hover table-striped table-condensed table-bordered pagin-table"],
        ["id", "sort"],
        ["style", "width: auto; overflow: hidden"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(160, 0, null, null, 87, "tbody", [], null, null, null, null, null)), (n()(), t.\u0275eld(161, 0, null, null, 18, "tr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(163, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Name"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(166, 0, null, null, 6, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Role\n            "])), (n()(), t.\u0275eld(168, 0, null, null, 3, "button", [
        ["class", "btn btn-info btn-sm"],
        ["title", "Sort players by their roles"],
        ["type", "button"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.sortPlayersByRole() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275eld(170, 0, null, null, 0, "span", [
        ["class", "glyphicon glyphicon-sort"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(174, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Number"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(177, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(178, null, ["Total: ", " / 11 "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275and(16777216, null, null, 1, null, w)), t.\u0275did(182, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(184, 0, null, null, 62, "tr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(186, 0, null, null, 23, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(188, 0, null, null, 20, "div", [
        ["class", "input-group"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275eld(190, 0, null, null, 6, "div", [
        ["class", "input-group-btn"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n                "])), (n()(), t.\u0275eld(192, 0, null, null, 3, "button", [
        ["class", "btn btn-info"],
        ["title", "Update available players"],
        ["type", "button"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.onTeamSelected(!1) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n                  "])), (n()(), t.\u0275eld(194, 0, null, null, 0, "i", [
        ["class", "glyphicon glyphicon-refresh"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\xa0\n                "])), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275eld(198, 0, null, null, 9, "select", [
        ["class", "form-control"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 199).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 199).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.player = l) && o), o
      }, null, null)), t.\u0275did(199, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(201, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(203, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n                "])), (n()(), t.\u0275and(16777216, null, null, 1, null, x)), t.\u0275did(206, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n\n          "])), (n()(), t.\u0275eld(211, 0, null, null, 16, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(216, 0, null, null, 10, "select", [
        ["class", "form-control"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 217).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 217).onTouched() && o), "ngModelChange" === e && (o = !1 !== i.onRoleSelected(l, null) && o), o
      }, null, null)), t.\u0275did(217, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(219, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(221, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n              "])), (n()(), t.\u0275and(16777216, null, null, 2, null, S)), t.\u0275did(224, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n\n          "])), (n()(), t.\u0275eld(229, 0, null, null, 9, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(231, 0, null, null, 6, "input", [
        ["class", "form-control"],
        ["max", "100"],
        ["min", "0"],
        ["type", "number"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 232)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 232).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 232)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 232)._compositionEnd(l.target.value) && o), "change" === e && (o = !1 !== t.\u0275nov(n, 233).onChange(l.target.value) && o), "input" === e && (o = !1 !== t.\u0275nov(n, 233).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 233).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.player.number = l) && o), o
      }, null, null)), t.\u0275did(232, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(233, 16384, null, 0, o.\u0275bc, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [o.DefaultValueAccessor, o.\u0275bc]), t.\u0275did(235, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(237, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(240, 0, null, null, 5, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(243, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.addPlayer() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Add player"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(250, 0, null, null, 1, "div", [
        ["class", "alert alert-danger"]
      ], [
        [8, "hidden", 0]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      Please enter a valid player (name, role and number).\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n\n"])), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        var l = e.component;
        n(e, 13, 0, ""), n(e, 16, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, ""), l.teamLongName), n(e, 23, 0, t.\u0275unv(e, 23, 0, t.\u0275nov(e, 24).transform(l.teamOptions$))), n(e, 46, 0, t.\u0275inlineInterpolate(1, "", null != l.seasonKitOptions && l.seasonKitOptions.length ? "Select a color kit" : null != l.colorKit && l.colorKit.id ? "Color kit selected" : "No color kit found !", "")), n(e, 51, 0, l.seasonKitOptions), n(e, 56, 0, "Create a new season kit"), n(e, 68, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-new-color-kit-name"), l.newSeasonKit.name), n(e, 84, 0, "season", l.newSeasonKit.season_id), n(e, 89, 0, t.\u0275unv(e, 89, 0, t.\u0275nov(e, 90).transform(l.seasonOptions$))), n(e, 105, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-new-color-kit-jersey"), l.newSeasonKit.kit_color.jersey_color), n(e, 121, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-new-color-kit-number"), l.newSeasonKit.kit_color.number_color), n(e, 137, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-new-color-kit-short"), l.newSeasonKit.kit_color.short_color), n(e, 182, 0, l.players), n(e, 201, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-player"), l.player), n(e, 206, 0, l.playerOptions), n(e, 219, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-player-role"), l.player.player_role.name), n(e, 224, 0, t.\u0275unv(e, 224, 0, t.\u0275nov(e, 225).transform(l.roleOptions$))), n(e, 235, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "-player-number"), l.player.number)
      }, function (n, e) {
        var l = e.component;
        n(e, 6, 0, t.\u0275inlineInterpolate(1, "", l.homeOrAway, "")), n(e, 11, 0, t.\u0275nov(e, 13).required ? "" : null, t.\u0275nov(e, 18).ngClassUntouched, t.\u0275nov(e, 18).ngClassTouched, t.\u0275nov(e, 18).ngClassPristine, t.\u0275nov(e, 18).ngClassDirty, t.\u0275nov(e, 18).ngClassValid, t.\u0275nov(e, 18).ngClassInvalid, t.\u0275nov(e, 18).ngClassPending), n(e, 35, 0, l.coach.last_name, l.coach.first_name), n(e, 40, 0, t.\u0275nov(e, 41).clazz), n(e, 43, 0, !(null != l.colorKit && l.colorKit.id)), n(e, 45, 0, t.\u0275nov(e, 46).id, t.\u0275nov(e, 46).active, t.\u0275nov(e, 46).addClass), n(e, 55, 0, t.\u0275nov(e, 56).id, t.\u0275nov(e, 56).active, t.\u0275nov(e, 56).addClass), n(e, 65, 0, t.\u0275nov(e, 70).ngClassUntouched, t.\u0275nov(e, 70).ngClassTouched, t.\u0275nov(e, 70).ngClassPristine, t.\u0275nov(e, 70).ngClassDirty, t.\u0275nov(e, 70).ngClassValid, t.\u0275nov(e, 70).ngClassInvalid, t.\u0275nov(e, 70).ngClassPending), n(e, 81, 0, t.\u0275nov(e, 86).ngClassUntouched, t.\u0275nov(e, 86).ngClassTouched, t.\u0275nov(e, 86).ngClassPristine, t.\u0275nov(e, 86).ngClassDirty, t.\u0275nov(e, 86).ngClassValid, t.\u0275nov(e, 86).ngClassInvalid, t.\u0275nov(e, 86).ngClassPending), n(e, 102, 0, t.\u0275nov(e, 107).ngClassUntouched, t.\u0275nov(e, 107).ngClassTouched, t.\u0275nov(e, 107).ngClassPristine, t.\u0275nov(e, 107).ngClassDirty, t.\u0275nov(e, 107).ngClassValid, t.\u0275nov(e, 107).ngClassInvalid, t.\u0275nov(e, 107).ngClassPending), n(e, 118, 0, t.\u0275nov(e, 123).ngClassUntouched, t.\u0275nov(e, 123).ngClassTouched, t.\u0275nov(e, 123).ngClassPristine, t.\u0275nov(e, 123).ngClassDirty, t.\u0275nov(e, 123).ngClassValid, t.\u0275nov(e, 123).ngClassInvalid, t.\u0275nov(e, 123).ngClassPending), n(e, 134, 0, t.\u0275nov(e, 139).ngClassUntouched, t.\u0275nov(e, 139).ngClassTouched, t.\u0275nov(e, 139).ngClassPristine, t.\u0275nov(e, 139).ngClassDirty, t.\u0275nov(e, 139).ngClassValid, t.\u0275nov(e, 139).ngClassInvalid, t.\u0275nov(e, 139).ngClassPending), n(e, 144, 0, !l.isNewSeasonKitValid()), n(e, 156, 0, l.lineupModificationDisabled), n(e, 178, 0, l.countOnField(l.players)), n(e, 198, 0, t.\u0275nov(e, 203).ngClassUntouched, t.\u0275nov(e, 203).ngClassTouched, t.\u0275nov(e, 203).ngClassPristine, t.\u0275nov(e, 203).ngClassDirty, t.\u0275nov(e, 203).ngClassValid, t.\u0275nov(e, 203).ngClassInvalid, t.\u0275nov(e, 203).ngClassPending), n(e, 216, 0, t.\u0275nov(e, 221).ngClassUntouched, t.\u0275nov(e, 221).ngClassTouched, t.\u0275nov(e, 221).ngClassPristine, t.\u0275nov(e, 221).ngClassDirty, t.\u0275nov(e, 221).ngClassValid, t.\u0275nov(e, 221).ngClassInvalid, t.\u0275nov(e, 221).ngClassPending), n(e, 231, 0, t.\u0275nov(e, 237).ngClassUntouched, t.\u0275nov(e, 237).ngClassTouched, t.\u0275nov(e, 237).ngClassPristine, t.\u0275nov(e, 237).ngClassDirty, t.\u0275nov(e, 237).ngClassValid, t.\u0275nov(e, 237).ngClassInvalid, t.\u0275nov(e, 237).ngClassPending), n(e, 250, 0, l.isPlayerValid)
      })
    }

    function M(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 5, "admin-create-team", [], null, null, null, O, v)), t.\u0275prd(512, null, c.TeamsService, c.TeamsService, [d.HttpClient]), t.\u0275prd(512, null, p.RolesService, p.RolesService, [d.HttpClient]), t.\u0275prd(512, null, m.CompositionsService, m.CompositionsService, [d.HttpClient]), t.\u0275prd(512, null, f.SeasonsService, f.SeasonsService, [d.HttpClient]), t.\u0275did(5, 4308992, null, 0, h.CreateTeamComponent, [c.TeamsService, p.RolesService, m.CompositionsService, f.SeasonsService, g.NotificationService, o.NgForm], null, null)], function (n, e) {
        n(e, 5, 0)
      }, null)
    }
    e.RenderType_CreateTeamComponent = v, e.View_CreateTeamComponent_0 = O, e.View_CreateTeamComponent_Host_0 = M, e.CreateTeamComponentNgFactory = t.\u0275ccf("admin-create-team", h.CreateTeamComponent, M, {
      players: "players",
      colorKit: "colorKit",
      coach: "coach",
      homeOrAway: "homeOrAway",
      lineupModificationDisabled: "lineupModificationDisabled",
      isUpdateMode: "isUpdateMode",
      team: "team"
    }, {
      teamChange: "teamChange",
      playersChange: "playersChange",
      colorKitChange: "colorKitChange",
      coachChange: "coachChange",
      isUpdateModeChange: "isUpdateModeChange"
    }, [])
  },
  HBQT: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("At+v"),
      i = l("NU7y"),
      u = l("HMtV"),
      a = l("6c27"),
      r = l("FZ1G"),
      s = l("WXck"),
      c = l("7/qC"),
      d = l("fvPM"),
      p = l("HGvv"),
      m = l("PSbe"),
      f = l("nHVU"),
      h = l("9pkN"),
      g = l("FiIa"),
      v = l("Xjw4"),
      y = l("OE0E"),
      b = l("Px6H"),
      C = l("Bj4q"),
      _ = l("ItHS"),
      w = l("7Z0p"),
      x = l("7DMc"),
      S = l("WPXp"),
      O = l("bfOx"),
      M = l("/CuN"),
      P = l("F6a+"),
      E = l("oZUJ"),
      R = l("ElZy"),
      k = l("u9Zd"),
      T = l("Z/zE"),
      I = l("SsVf"),
      N = l("a+4R"),
      A = l("Zkkf"),
      D = l("BAgd"),
      F = l("6sdY"),
      V = l("dgbi"),
      j = l("R5tW"),
      L = l("jDyY"),
      U = l("PakY"),
      z = l("D692"),
      $ = l("L1ao"),
      G = l("joif"),
      B = l("J8vI"),
      H = l("C1j0"),
      q = l("ZBXF"),
      Y = l("pxu+"),
      K = l("gFWv"),
      W = l("+yYV"),
      X = l("a5fX"),
      Z = l("JCcm"),
      J = l("XVEw"),
      Q = l("UuY2"),
      nn = l("a3ba"),
      en = l("xvT5"),
      ln = l("CCBf"),
      tn = l("RaSy");
    e.AppModuleNgFactory = t.\u0275cmf(o.AppModule, [i.AppComponent], function (n) {
      return t.\u0275mod([t.\u0275mpd(512, t.ComponentFactoryResolver, t.\u0275CodegenComponentFactoryResolver, [
        [8, [u.LoginViewComponentNgFactory, a.AgendaComponentNgFactory, r.CompositionViewComponentNgFactory, s.EmbeddableLiveComponentNgFactory, c.RegisterEventsComponentNgFactory, d.DevToolsComponentNgFactory, p.AdminComponentNgFactory, m.AdminAddTeamPlayerNgFactory, f.PageNotFoundComponentNgFactory, h.BsDropdownContainerComponentNgFactory, g.AppComponentNgFactory]],
        [3, t.ComponentFactoryResolver], t.NgModuleRef
      ]), t.\u0275mpd(5120, t.LOCALE_ID, t.\u0275q, [
        [3, t.LOCALE_ID]
      ]), t.\u0275mpd(4608, v.NgLocalization, v.NgLocaleLocalization, [t.LOCALE_ID, [2, v.\u0275a]]), t.\u0275mpd(5120, t.APP_ID, t.\u0275i, []), t.\u0275mpd(5120, t.IterableDiffers, t.\u0275n, []), t.\u0275mpd(5120, t.KeyValueDiffers, t.\u0275o, []), t.\u0275mpd(4608, y.DomSanitizer, y.\u0275e, [v.DOCUMENT]), t.\u0275mpd(6144, t.Sanitizer, null, [y.DomSanitizer]), t.\u0275mpd(4608, y.HAMMER_GESTURE_CONFIG, y.HammerGestureConfig, []), t.\u0275mpd(5120, y.EVENT_MANAGER_PLUGINS, function (n, e, l, t, o) {
        return [new y.\u0275DomEventsPlugin(n, e), new y.\u0275KeyEventsPlugin(l), new y.\u0275HammerGesturesPlugin(t, o)]
      }, [v.DOCUMENT, t.NgZone, v.DOCUMENT, v.DOCUMENT, y.HAMMER_GESTURE_CONFIG]), t.\u0275mpd(4608, y.EventManager, y.EventManager, [y.EVENT_MANAGER_PLUGINS, t.NgZone]), t.\u0275mpd(135680, y.\u0275DomSharedStylesHost, y.\u0275DomSharedStylesHost, [v.DOCUMENT]), t.\u0275mpd(4608, y.\u0275DomRendererFactory2, y.\u0275DomRendererFactory2, [y.EventManager, y.\u0275DomSharedStylesHost]), t.\u0275mpd(5120, b.AnimationDriver, C.\u0275c, []), t.\u0275mpd(5120, b.\u0275AnimationStyleNormalizer, C.\u0275d, []), t.\u0275mpd(4608, b.\u0275AnimationEngine, C.\u0275b, [b.AnimationDriver, b.\u0275AnimationStyleNormalizer]), t.\u0275mpd(5120, t.RendererFactory2, C.\u0275e, [y.\u0275DomRendererFactory2, b.\u0275AnimationEngine, t.NgZone]), t.\u0275mpd(6144, y.\u0275SharedStylesHost, null, [y.\u0275DomSharedStylesHost]), t.\u0275mpd(4608, t.Testability, t.Testability, [t.NgZone]), t.\u0275mpd(4608, y.Meta, y.Meta, [v.DOCUMENT]), t.\u0275mpd(4608, y.Title, y.Title, [v.DOCUMENT]), t.\u0275mpd(4608, _.HttpXsrfTokenExtractor, _.\u0275h, [v.DOCUMENT, t.PLATFORM_ID, _.\u0275f]), t.\u0275mpd(4608, _.\u0275i, _.\u0275i, [_.HttpXsrfTokenExtractor, _.\u0275g]), t.\u0275mpd(5120, _.HTTP_INTERCEPTORS, function (n) {
        return [n, new w.AddHeaderInterceptor]
      }, [_.\u0275i]), t.\u0275mpd(4608, _.\u0275e, _.\u0275e, []), t.\u0275mpd(6144, _.XhrFactory, null, [_.\u0275e]), t.\u0275mpd(4608, _.HttpXhrBackend, _.HttpXhrBackend, [_.XhrFactory]), t.\u0275mpd(6144, _.HttpBackend, null, [_.HttpXhrBackend]), t.\u0275mpd(4608, _.HttpHandler, _.\u0275c, [_.HttpBackend, t.Injector]), t.\u0275mpd(4608, _.HttpClient, _.HttpClient, [_.HttpHandler]), t.\u0275mpd(4608, x.\u0275i, x.\u0275i, []), t.\u0275mpd(4608, S.AnimationBuilder, C.\u0275BrowserAnimationBuilder, [t.RendererFactory2, y.DOCUMENT]), t.\u0275mpd(5120, O.ActivatedRoute, O.\u0275f, [O.Router]), t.\u0275mpd(4608, O.NoPreloading, O.NoPreloading, []), t.\u0275mpd(6144, O.PreloadingStrategy, null, [O.NoPreloading]), t.\u0275mpd(135680, O.RouterPreloader, O.RouterPreloader, [O.Router, t.NgModuleFactoryLoader, t.Compiler, t.Injector, O.PreloadingStrategy]), t.\u0275mpd(4608, O.PreloadAllModules, O.PreloadAllModules, []), t.\u0275mpd(5120, O.ROUTER_INITIALIZER, O.\u0275i, [O.\u0275g]), t.\u0275mpd(5120, t.APP_BOOTSTRAP_LISTENER, function (n) {
        return [n]
      }, [O.ROUTER_INITIALIZER]), t.\u0275mpd(4608, M.PositioningService, M.PositioningService, []), t.\u0275mpd(4608, P.ComponentLoaderFactory, P.ComponentLoaderFactory, [t.ComponentFactoryResolver, t.NgZone, t.Injector, M.PositioningService, t.ApplicationRef]), t.\u0275mpd(4608, E.BsDropdownState, E.BsDropdownState, []), t.\u0275mpd(4608, R.TabsetConfig, R.TabsetConfig, []), t.\u0275mpd(4608, k.RouterlessTracking, k.AngularRouterTracking, [O.Router, v.Location]), t.\u0275mpd(4608, k.Angulartics2, k.Angulartics2, [k.RouterlessTracking, k.ANGULARTICS2_TOKEN]), t.\u0275mpd(4608, T.Angulartics2GoogleAnalytics, T.Angulartics2GoogleAnalytics, [k.Angulartics2]), t.\u0275mpd(4608, I.SessionService, I.SessionService, [_.HttpClient]), t.\u0275mpd(4608, I.AuthGuard, I.AuthGuard, [I.SessionService, O.Router]), t.\u0275mpd(4608, I.AdminAuthGuard, I.AdminAuthGuard, [I.SessionService, O.Router]), t.\u0275mpd(4608, N.VideoInfoService, N.VideoInfoService, [_.HttpClient]), t.\u0275mpd(4608, A.CompositionsService, A.CompositionsService, [_.HttpClient]), t.\u0275mpd(4608, D.NotificationService, D.NotificationService, []), t.\u0275mpd(4608, F.SeasonsService, F.SeasonsService, [_.HttpClient]), t.\u0275mpd(4608, V.VideoSourcesService, V.VideoSourcesService, [_.HttpClient]), t.\u0275mpd(4608, j.PendingChangesGuard, j.PendingChangesGuard, []), t.\u0275mpd(4608, L.DisplayService, L.DisplayService, [O.ActivatedRoute]), t.\u0275mpd(4608, U.LoggingService, U.LoggingService, [O.ActivatedRoute]), t.\u0275mpd(4608, z.MatchService, z.MatchService, [_.HttpClient, L.DisplayService, U.LoggingService]), t.\u0275mpd(4608, $.WSStreamService, $.WSStreamService, [z.MatchService, L.DisplayService, U.LoggingService]), t.\u0275mpd(4608, G.EventService, G.EventService, [$.WSStreamService, z.MatchService, L.DisplayService]), t.\u0275mpd(4608, B.PositionService, B.PositionService, [$.WSStreamService, L.DisplayService, z.MatchService]), t.\u0275mpd(512, v.CommonModule, v.CommonModule, []), t.\u0275mpd(512, t.ErrorHandler, o.RavenErrorHandler, [t.Injector]), t.\u0275mpd(1024, t.NgProbeToken, function () {
        return [O.\u0275b()]
      }, []), t.\u0275mpd(512, O.\u0275g, O.\u0275g, [t.Injector]), t.\u0275mpd(1024, t.APP_INITIALIZER, function (n, e) {
        return [y.\u0275h(n), O.\u0275h(e)]
      }, [
        [2, t.NgProbeToken], O.\u0275g
      ]), t.\u0275mpd(512, t.ApplicationInitStatus, t.ApplicationInitStatus, [
        [2, t.APP_INITIALIZER]
      ]), t.\u0275mpd(131584, t.ApplicationRef, t.ApplicationRef, [t.NgZone, t.\u0275Console, t.Injector, t.ErrorHandler, t.ComponentFactoryResolver, t.ApplicationInitStatus]), t.\u0275mpd(512, t.ApplicationModule, t.ApplicationModule, [t.ApplicationRef]), t.\u0275mpd(512, y.BrowserModule, y.BrowserModule, [
        [3, y.BrowserModule]
      ]), t.\u0275mpd(512, _.HttpClientXsrfModule, _.HttpClientXsrfModule, []), t.\u0275mpd(512, _.HttpClientModule, _.HttpClientModule, []), t.\u0275mpd(512, x.\u0275ba, x.\u0275ba, []), t.\u0275mpd(512, x.FormsModule, x.FormsModule, []), t.\u0275mpd(512, C.BrowserAnimationsModule, C.BrowserAnimationsModule, []), t.\u0275mpd(1024, O.\u0275a, O.\u0275d, [
        [3, O.Router]
      ]), t.\u0275mpd(512, O.UrlSerializer, O.DefaultUrlSerializer, []), t.\u0275mpd(512, O.ChildrenOutletContexts, O.ChildrenOutletContexts, []), t.\u0275mpd(256, O.ROUTER_CONFIGURATION, {}, []), t.\u0275mpd(1024, v.LocationStrategy, O.\u0275c, [v.PlatformLocation, [2, v.APP_BASE_HREF], O.ROUTER_CONFIGURATION]), t.\u0275mpd(512, v.Location, v.Location, [v.LocationStrategy]), t.\u0275mpd(512, t.Compiler, t.Compiler, []), t.\u0275mpd(512, t.NgModuleFactoryLoader, t.SystemJsNgModuleLoader, [t.Compiler, [2, t.SystemJsNgModuleLoaderConfig]]), t.\u0275mpd(1024, O.ROUTES, function () {
        return [
          [{
            path: "",
            redirectTo: "login",
            pathMatch: "full"
          }, {
            path: "login",
            component: H.LoginViewComponent
          }, {
            path: "home",
            component: q.AgendaComponent,
            canActivate: [I.AuthGuard]
          }, {
            path: "match/:match_id/composition",
            component: Y.CompositionViewComponent,
            canActivate: [I.AuthGuard]
          }, {
            path: "match/:match_id/embeddable",
            component: K.EmbeddableLiveComponent
          }, {
            path: "match/:match_id/register-events",
            component: W.RegisterEventsComponent,
            canActivate: [I.AdminAuthGuard]
          }, {
            path: "dev-tools",
            component: X.DevToolsComponent,
            canActivate: [I.AdminAuthGuard]
          }, {
            path: "admin",
            component: Z.AdminComponent,
            canActivate: [I.AdminAuthGuard],
            canDeactivate: [j.PendingChangesGuard]
          }, {
            path: "admin/add-team-player",
            component: J.AdminAddTeamPlayer,
            canActivate: [I.AdminAuthGuard]
          }, {
            path: "**",
            component: Q.PageNotFoundComponent
          }]
        ]
      }, []), t.\u0275mpd(1024, O.Router, O.\u0275e, [t.ApplicationRef, O.UrlSerializer, O.ChildrenOutletContexts, v.Location, t.Injector, t.NgModuleFactoryLoader, t.Compiler, O.ROUTES, O.ROUTER_CONFIGURATION, [2, O.UrlHandlingStrategy],
        [2, O.RouteReuseStrategy]
      ]), t.\u0275mpd(512, O.RouterModule, O.RouterModule, [
        [2, O.\u0275a],
        [2, O.Router]
      ]), t.\u0275mpd(512, nn.AppRoutingModule, nn.AppRoutingModule, []), t.\u0275mpd(512, en.BsDropdownModule, en.BsDropdownModule, []), t.\u0275mpd(512, ln.TabsModule, ln.TabsModule, []), t.\u0275mpd(512, k.Angulartics2OnModule, k.Angulartics2OnModule, []), t.\u0275mpd(512, k.Angulartics2Module, k.Angulartics2Module, []), t.\u0275mpd(512, o.AppModule, o.AppModule, []), t.\u0275mpd(256, _.\u0275f, "csrftoken", []), t.\u0275mpd(256, _.\u0275g, "X-CSRFToken", []), t.\u0275mpd(256, tn.BsDropdownConfig, {
        autoClose: !0
      }, []), t.\u0275mpd(256, k.ANGULARTICS2_TOKEN, {
        providers: [T.Angulartics2GoogleAnalytics],
        settings: {}
      }, [])])
    })
  },
  HGvv: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("Xjw4"),
      i = l("7DMc"),
      u = l("ktH5"),
      a = l("GYns"),
      r = l("j+m6"),
      s = l("ItHS"),
      c = l("6Y8j"),
      d = l("Zkkf"),
      p = l("6sdY"),
      m = l("0NEb"),
      f = l("BAgd"),
      h = l("Prjq"),
      g = l("Rd49"),
      v = l("dTtl"),
      y = l("p764"),
      b = l("Kmda"),
      C = l("WtMm"),
      _ = l("T6ZN"),
      w = l("D692"),
      x = l("jDyY"),
      S = l("PakY"),
      O = l("HySA"),
      M = l("JCcm"),
      P = l("dgbi"),
      E = l("a+4R"),
      R = t.\u0275crt({
        encapsulation: 0,
        styles: ["table[_ngcontent-%COMP%]    > thead[_ngcontent-%COMP%]    > tr[_ngcontent-%COMP%]    > th[_ngcontent-%COMP%] {\n      text-align: center;\n    }\n\n    table[_ngcontent-%COMP%] {\n      -webkit-box-sizing: border-box;\n    }"],
        data: {}
      });

    function k(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 20, "tr", [
        ["style", "width: 100%;display: inline-table;table-layout: fixed;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(2, 0, null, null, 3, "td", [], null, null, null, null, null)), (n()(), t.\u0275eld(3, 0, null, null, 1, "a", [
        ["class", "btn btn-warning"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.fillMatchUpdate(n.context.$implicit.id) && t), t
      }, null, null)), (n()(), t.\u0275ted(4, null, [" id = ", ""])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(7, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(8, null, [" ", " "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(10, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(11, null, [" ", " "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(13, 0, null, null, 2, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(14, null, [" ", " "])), t.\u0275ppd(15, 2), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(17, 0, null, null, 3, "td", [], null, null, null, null, null)), (n()(), t.\u0275eld(18, 0, null, null, 1, "a", [
        ["class", "btn btn-default"]
      ], [
        [8, "href", 4]
      ], null, null, null, null)), (n()(), t.\u0275ted(19, null, [" id = ", ""])), (n()(), t.\u0275ted(-1, null, ["\n        "]))], null, function (n, e) {
        n(e, 4, 0, e.context.$implicit.id), n(e, 8, 0, e.context.$implicit.home_team.short_name), n(e, 11, 0, e.context.$implicit.away_team.short_name), n(e, 14, 0, t.\u0275unv(e, 14, 0, n(e, 15, 0, t.\u0275nov(e.parent.parent.parent, 0), e.context.$implicit.date_time, "dd/MM/yyyy-H:mm-Z"))), n(e, 18, 0, t.\u0275inlineInterpolate(1, "/app/match/", e.context.$implicit.id, "/register-events")), n(e, 19, 0, e.context.$implicit.id)
      })
    }

    function T(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 31, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275eld(2, 0, null, null, 28, "table", [
        ["class", "text-center table table-bordered table-hover"],
        ["style", "display:block;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(4, 0, null, null, 19, "thead", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(6, 0, null, null, 16, "tr", [
        ["style", "width: 100%;display: inline-table;table-layout: fixed; text-align: center;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(8, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Update"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(11, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Home Team"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(14, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Away Team"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(17, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Date"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(20, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Register Events"])), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275eld(25, 0, null, null, 4, "tbody", [
        ["style", "display:block; height: 30vh; overflow-y:scroll;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275and(16777216, null, null, 1, null, k)), t.\u0275did(28, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "]))], function (n, e) {
        n(e, 28, 0, e.component.matches)
      }, null)
    }

    function I(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 6, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(2, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275and(16777216, null, null, 1, null, T)), t.\u0275did(5, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n  "]))], function (n, e) {
        n(e, 5, 0, e.component.matches)
      }, null)
    }

    function N(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [2, i.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit)
      })
    }

    function A(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [2, i.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", " ", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name, e.context.$implicit.help)
      })
    }

    function D(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [2, i.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function F(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.name), n(e, 2, 0, e.context.$implicit.name)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.city ? "(" + e.context.$implicit.city + ")" : "")
      })
    }

    function V(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [2, i.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function j(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, i.NgSelectOption, [t.ElementRef, t.Renderer2, [2, i.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, i.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit)
      })
    }

    function L(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "submit"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.updateMatch() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        Update match\n      "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, !t.\u0275nov(e.parent, 24).form.valid || !(null != l.homeColorKit && l.homeColorKit.id) || !(null != l.awayColorKit && l.awayColorKit.id) || l.pendingRequest)
      })
    }

    function U(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "submit"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.createMatch() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        Create match\n      "]))], null, function (n, e) {
        var l = e.component;
        n(e, 0, 0, !t.\u0275nov(e.parent, 24).form.valid || !(null != l.homeColorKit && l.homeColorKit.id) || !(null != l.awayColorKit && l.awayColorKit.id) || l.pendingRequest)
      })
    }

    function z(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(2, 0, null, null, 0, "img", [], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "]))], null, function (n, e) {
        var l = e.component;
        n(e, 2, 0, t.\u0275inlineInterpolate(2, "/api/match/", l.matchId, "/decoder_preview?nPreview=", l.nPreview, ""))
      })
    }

    function $(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "span", [], null, null, null, null, null)), (n()(), t.\u0275ted(1, null, ["(", ")"]))], null, function (n, e) {
        n(e, 1, 0, e.component.launchStatus[e.parent.context.$implicit].duration)
      })
    }

    function G(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 7, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(2, 0, null, null, 1, "span", [], [
        [8, "className", 0]
      ], null, null, null, null)), (n()(), t.\u0275ted(3, null, ["", ""])), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275and(16777216, null, null, 1, null, $)), t.\u0275did(6, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n          "]))], function (n, e) {
        n(e, 6, 0, e.component.launchStatus[e.context.$implicit].duration)
      }, function (n, e) {
        var l = e.component;
        n(e, 2, 0, t.\u0275inlineInterpolate(1, "label label-", l.launchStatus[e.context.$implicit].label, "")), n(e, 3, 0, l.launchStatus[e.context.$implicit].status)
      })
    }

    function B(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 4, "td", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n            "])), (n()(), t.\u0275eld(2, 0, null, null, 1, "button", [
        ["class", "btn btn-xs btn-warning"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.launchTask(n.context.$implicit) && t), t
      }, null, null)), (n()(), t.\u0275ted(3, null, ["Relaunch ", ""])), (n()(), t.\u0275ted(-1, null, [" (debug only)\n          "]))], null, function (n, e) {
        var l = e.component;
        n(e, 2, 0, !l.isUpdateMode || l.pendingRequest), n(e, 3, 0, e.context.$implicit)
      })
    }

    function H(n) {
      return t.\u0275vid(0, [t.\u0275pid(0, o.DatePipe, [t.LOCALE_ID]), (n()(), t.\u0275eld(1, 0, null, null, 384, "div", [
        ["class", "container"]
      ], null, null, null, null, null)), t.\u0275did(2, 278528, null, 0, o.NgStyle, [t.KeyValueDiffers, t.ElementRef, t.Renderer2], {
        ngStyle: [0, "ngStyle"]
      }, null), t.\u0275pod(3, {
        color: 0
      }), t.\u0275did(4, 540672, null, 0, u.PendingRequestDirective, [t.ElementRef], {
        isPendingRequest: [0, "isPendingRequest"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(6, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(7, null, ["", " Mode"])), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275eld(9, 0, null, null, 1, "a", [
        ["class", "btn btn-default"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.isUpdateModeChangeState() && t), t
      }, null, null)), (n()(), t.\u0275ted(10, null, ["Switch\n    to\n    ", " Mode"])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(12, 0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(14, 0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275and(16777216, null, null, 1, null, I)), t.\u0275did(18, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275eld(20, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(22, 0, null, null, 362, "form", [
        ["novalidate", ""]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "submit"],
        [null, "reset"]
      ], function (n, e, l) {
        var o = !0;
        return "submit" === e && (o = !1 !== t.\u0275nov(n, 24).onSubmit(l) && o), "reset" === e && (o = !1 !== t.\u0275nov(n, 24).onReset() && o), o
      }, null, null)), t.\u0275did(23, 16384, null, 0, i.\u0275bf, [], null, null), t.\u0275did(24, 4210688, [
        ["matchform", 4]
      ], 0, i.NgForm, [
        [8, null],
        [8, null]
      ], null, null), t.\u0275prd(2048, null, i.ControlContainer, null, [i.NgForm]), t.\u0275did(26, 16384, null, 0, i.NgControlStatusGroup, [i.ControlContainer], null, null), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(28, 0, null, null, 28, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(30, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "time"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Match datetime - timezone"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(33, 0, null, null, 8, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(35, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "time"],
        ["type", "datetime-local"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 36)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 36).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 36)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 36)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.match.date_time = l) && o), o
      }, null, null)), t.\u0275did(36, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), t.\u0275did(38, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(40, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(43, 0, null, null, 12, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(45, 0, null, null, 9, "select", [
        ["class", "form-control"],
        ["name", "timezone"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 46).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 46).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.timezone = l) && o), "ngModelChange" === e && (o = !1 !== i.onTzSelected(l) && o), o
      }, null, null)), t.\u0275did(46, 16384, null, 0, i.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.SelectControlValueAccessor]), t.\u0275did(48, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(50, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 1, null, N)), t.\u0275did(53, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(58, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(60, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["SkillCorner info"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(63, 0, null, null, 20, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(65, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "event-provider"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Event Provider"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(68, 0, null, null, 14, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(70, 0, null, null, 11, "select", [
        ["class", "form-control"],
        ["name", "event-provider"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 71).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 71).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.eventProvider = l) && o), o
      }, null, null)), t.\u0275did(71, 16384, null, 0, i.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275did(72, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.SelectControlValueAccessor]), t.\u0275did(75, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(77, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 1, null, A)), t.\u0275did(80, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(85, 0, null, null, 20, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(87, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "lineup-provider"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Lineup Provider"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(90, 0, null, null, 14, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(92, 0, null, null, 11, "select", [
        ["class", "form-control"],
        ["name", "lineup-provider"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 93).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 93).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.lineupProvider = l) && o), o
      }, null, null)), t.\u0275did(93, 16384, null, 0, i.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275did(94, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.SelectControlValueAccessor]), t.\u0275did(97, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(99, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 1, null, D)), t.\u0275did(102, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(107, 0, null, null, 25, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(109, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(111, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Home team"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(114, 0, null, null, 5, "admin-create-team", [], null, [
        [null, "teamChange"],
        [null, "playersChange"],
        [null, "isUpdateModeChange"],
        [null, "colorKitChange"],
        [null, "coachChange"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "teamChange" === e && (t = !1 !== (o.homeTeam = l) && t), "playersChange" === e && (t = !1 !== (o.homePlayers = l) && t), "isUpdateModeChange" === e && (t = !1 !== (o.isUpdateMode = l) && t), "colorKitChange" === e && (t = !1 !== (o.homeColorKit = l) && t), "coachChange" === e && (t = !1 !== (o.homeCoach = l) && t), t
      }, a.View_CreateTeamComponent_0, a.RenderType_CreateTeamComponent)), t.\u0275prd(512, null, r.TeamsService, r.TeamsService, [s.HttpClient]), t.\u0275prd(512, null, c.RolesService, c.RolesService, [s.HttpClient]), t.\u0275prd(512, null, d.CompositionsService, d.CompositionsService, [s.HttpClient]), t.\u0275prd(512, null, p.SeasonsService, p.SeasonsService, [s.HttpClient]), t.\u0275did(119, 4308992, null, 0, m.CreateTeamComponent, [r.TeamsService, c.RolesService, d.CompositionsService, p.SeasonsService, f.NotificationService, i.NgForm], {
        players: [0, "players"],
        colorKit: [1, "colorKit"],
        coach: [2, "coach"],
        homeOrAway: [3, "homeOrAway"],
        lineupModificationDisabled: [4, "lineupModificationDisabled"],
        isUpdateMode: [5, "isUpdateMode"],
        team: [6, "team"]
      }, {
        teamChange: "teamChange",
        playersChange: "playersChange",
        colorKitChange: "colorKitChange",
        coachChange: "coachChange",
        isUpdateModeChange: "isUpdateModeChange"
      }), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(121, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(123, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Away team"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(126, 0, null, null, 5, "admin-create-team", [], null, [
        [null, "teamChange"],
        [null, "playersChange"],
        [null, "isUpdateModeChange"],
        [null, "colorKitChange"],
        [null, "coachChange"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "teamChange" === e && (t = !1 !== (o.awayTeam = l) && t), "playersChange" === e && (t = !1 !== (o.awayPlayers = l) && t), "isUpdateModeChange" === e && (t = !1 !== (o.isUpdateMode = l) && t), "colorKitChange" === e && (t = !1 !== (o.awayColorKit = l) && t), "coachChange" === e && (t = !1 !== (o.awayCoach = l) && t), t
      }, a.View_CreateTeamComponent_0, a.RenderType_CreateTeamComponent)), t.\u0275prd(512, null, r.TeamsService, r.TeamsService, [s.HttpClient]), t.\u0275prd(512, null, c.RolesService, c.RolesService, [s.HttpClient]), t.\u0275prd(512, null, d.CompositionsService, d.CompositionsService, [s.HttpClient]), t.\u0275prd(512, null, p.SeasonsService, p.SeasonsService, [s.HttpClient]), t.\u0275did(131, 4308992, null, 0, m.CreateTeamComponent, [r.TeamsService, c.RolesService, d.CompositionsService, p.SeasonsService, f.NotificationService, i.NgForm], {
        players: [0, "players"],
        colorKit: [1, "colorKit"],
        coach: [2, "coach"],
        homeOrAway: [3, "homeOrAway"],
        lineupModificationDisabled: [4, "lineupModificationDisabled"],
        isUpdateMode: [5, "isUpdateMode"],
        team: [6, "team"]
      }, {
        teamChange: "teamChange",
        playersChange: "playersChange",
        colorKitChange: "colorKitChange",
        coachChange: "coachChange",
        isUpdateModeChange: "isUpdateModeChange"
      }), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(134, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(136, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Stadium, competition, referee"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(139, 0, null, null, 35, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(141, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(142, null, ["Stadium (Home stadium: ", ")"])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275eld(144, 0, null, null, 17, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(146, 0, null, null, 7, "input", [
        ["class", "form-control"],
        ["list", "stadiums"],
        ["name", "stadium"],
        ["required", ""],
        ["type", "text"]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "focusout"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 147)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 147).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 147)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 147)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.stadiumName = l) && o), "input" === e && (o = !1 !== i.onStadiumSelected() && o), "focusout" === e && (o = !1 !== i.checkStadiumIntegrity() && o), o
      }, null, null)), t.\u0275did(147, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(148, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), t.\u0275did(151, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(153, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(155, 0, null, null, 5, "datalist", [
        ["id", "stadiums"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, F)), t.\u0275did(158, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, o.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275eld(163, 0, null, null, 4, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(165, 0, null, null, 1, "button", [
        ["class", "btn btn-primary"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.setStadiumToHome() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Select home stadium\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n\n      "])), (n()(), t.\u0275eld(169, 0, null, null, 4, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(171, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.setHomeTeamStadiumToStadium() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["set as home team's default\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(176, 0, null, null, 41, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(178, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Or create a new stadium:"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(181, 0, null, null, 8, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(183, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-stadium-name"],
        ["placeholder", "Stadium Name"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 184)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 184).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 184)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 184)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newStadium.name = l) && o), o
      }, null, null)), t.\u0275did(184, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), t.\u0275did(186, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(188, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(191, 0, null, null, 8, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(193, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-stadium-city"],
        ["placeholder", "City"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 194)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 194).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 194)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 194)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newStadium.city = l) && o), o
      }, null, null)), t.\u0275did(194, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), t.\u0275did(196, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(198, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(201, 0, null, null, 9, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(203, 0, null, null, 6, "input", [
        ["class", "form-control"],
        ["name", "new-stadium-capacity"],
        ["placeholder", "Capacity"],
        ["type", "number"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 204)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 204).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 204)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 204)._compositionEnd(l.target.value) && o), "change" === e && (o = !1 !== t.\u0275nov(n, 205).onChange(l.target.value) && o), "input" === e && (o = !1 !== t.\u0275nov(n, 205).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 205).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.newStadium.capacity = l) && o), o
      }, null, null)), t.\u0275did(204, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(205, 16384, null, 0, i.\u0275bc, [t.Renderer2, t.ElementRef], null, null), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [i.DefaultValueAccessor, i.\u0275bc]), t.\u0275did(207, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(209, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275eld(212, 0, null, null, 4, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(214, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.addStadium() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          Add stadium\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(219, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(221, 0, null, null, 6, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(223, 0, null, null, 3, "admin-choose-competition", [], null, [
        [null, "competitionEditionChange"],
        [null, "competitionRoundIdChange"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "competitionEditionChange" === e && (t = !1 !== (o.competitionEdition = l) && t), "competitionRoundIdChange" === e && (t = !1 !== (o.competitionRoundId = l) && t), t
      }, h.View_ChooseCompetitionComponent_0, h.RenderType_ChooseCompetitionComponent)), t.\u0275prd(512, null, g.CompetitionEditionsService, g.CompetitionEditionsService, [s.HttpClient]), t.\u0275did(225, 4767744, null, 0, v.ChooseCompetitionComponent, [g.CompetitionEditionsService, i.NgForm], {
        competitionEdition: [0, "competitionEdition"],
        competitionRoundId: [1, "competitionRoundId"]
      }, {
        competitionEditionChange: "competitionEditionChange",
        competitionRoundIdChange: "competitionRoundIdChange"
      }), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(229, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(231, 0, null, null, 5, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(233, 0, null, null, 2, "admin-choose-referee", [], null, [
        [null, "refereeChange"]
      ], function (n, e, l) {
        var t = !0;
        return "refereeChange" === e && (t = !1 !== (n.component.referee = l) && t), t
      }, y.View_ChooseRefereeComponent_0, y.RenderType_ChooseRefereeComponent)), t.\u0275prd(512, null, b.RefereesService, b.RefereesService, [s.HttpClient]), t.\u0275did(235, 573440, null, 0, C.ChooseRefereeComponent, [b.RefereesService, f.NotificationService, i.NgForm], {
        referee: [0, "referee"]
      }, {
        refereeChange: "refereeChange"
      }), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(238, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(240, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Video info"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(243, 0, null, null, 29, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(245, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "fps"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["FPS"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(248, 0, null, null, 11, "div", [
        ["class", "col-sm-2"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(250, 0, null, null, 8, "input", [
        ["class", "form-control"],
        ["min", "0"],
        ["name", "fps"],
        ["required", ""],
        ["type", "number"]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 251)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 251).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 251)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 251)._compositionEnd(l.target.value) && o), "change" === e && (o = !1 !== t.\u0275nov(n, 252).onChange(l.target.value) && o), "input" === e && (o = !1 !== t.\u0275nov(n, 252).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 252).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.videoFps = l) && o), o
      }, null, null)), t.\u0275did(251, 16384, null, 0, i.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275did(252, 16384, null, 0, i.\u0275bc, [t.Renderer2, t.ElementRef], null, null), t.\u0275did(253, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [i.DefaultValueAccessor, i.\u0275bc]), t.\u0275did(256, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(258, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(261, 0, null, null, 10, "div", [
        ["class", "btn-group"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(263, 0, null, null, 1, "div", [
        ["class", "btn btn-primary btn-lg float-left"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.videoFps = 10) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, [" 10"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(266, 0, null, null, 1, "div", [
        ["class", "btn btn-primary btn-sm float-left"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.videoFps = 25) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, [" 25"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(269, 0, null, null, 1, "div", [
        ["class", "btn btn-primary btn-xs float-left"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.videoFps = 60) && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, [" 60"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(274, 0, null, null, 21, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(276, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "source"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Video source"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(279, 0, null, null, 15, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n        "])), (n()(), t.\u0275eld(281, 0, null, null, 12, "select", [
        ["class", "form-control"],
        ["name", "source"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 282).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 282).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.videoSource = l) && o), o
      }, null, null)), t.\u0275did(282, 16384, null, 0, i.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], {
        compareWith: [0, "compareWith"]
      }, null), t.\u0275did(283, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.SelectControlValueAccessor]), t.\u0275did(286, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(288, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, V)), t.\u0275did(291, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, o.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(297, 0, null, null, 20, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(299, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "video-type"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Video type"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(302, 0, null, null, 14, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(304, 0, null, null, 11, "select", [
        ["class", "form-control"],
        ["name", "video-type"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 305).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 305).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.videoType = l) && o), o
      }, null, null)), t.\u0275did(305, 16384, null, 0, i.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275did(306, 16384, null, 0, i.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, i.NG_VALIDATORS, function (n) {
        return [n]
      }, [i.RequiredValidator]), t.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.SelectControlValueAccessor]), t.\u0275did(309, 671744, null, 0, i.NgModel, [
        [2, i.ControlContainer],
        [2, i.NG_VALIDATORS],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), t.\u0275did(311, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 1, null, j)), t.\u0275did(314, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(319, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(321, 0, null, null, 7, "div", [
        ["class", "btn-group"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275and(16777216, null, null, 1, null, L)), t.\u0275did(324, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n\n      "])), (n()(), t.\u0275and(16777216, null, null, 1, null, U)), t.\u0275did(327, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(330, 0, null, null, 4, "div", [
        ["class", "btn-group"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(332, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "submit"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.launchLive() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        Launch live\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(336, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275and(16777216, null, null, 1, null, z)), t.\u0275did(339, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(341, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Launch Status"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(344, 0, null, null, 36, "table", [
        ["class", "text-center table table-bordered table-hover"],
        ["style", "display:block;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(346, 0, null, null, 16, "thead", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(348, 0, null, null, 13, "tr", [
        ["style", "width: 100%;display: inline-table;table-layout: fixed; text-align: center;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(350, 0, null, null, 4, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(351, null, ["\n          Capture (id=", ")\n          "])), (n()(), t.\u0275eld(352, 0, null, null, 1, "button", [
        ["class", "btn btn-xs btn-primary"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.changePreviewMode() && t), t
      }, null, null)), (n()(), t.\u0275ted(353, null, ["", " Preview"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(356, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Computation"])), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275eld(359, 0, null, null, 1, "th", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, [" Node"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n      "])), (n()(), t.\u0275eld(364, 0, null, null, 15, "tbody", [
        ["style", "display:block; overflow-y:scroll;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(366, 0, null, null, 5, "tr", [
        ["style", "width: 100%;display: inline-table;table-layout: fixed;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, G)), t.\u0275did(369, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pad(370, 3), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(373, 0, null, null, 5, "tr", [
        ["style", "width: 100%;display: inline-table;table-layout: fixed;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, B)), t.\u0275did(376, 802816, null, 0, o.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pad(377, 3), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(382, 0, null, null, 1, "div", [], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.logStuff() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["Da log button"])), (n()(), t.\u0275ted(-1, null, ["\n\n  "])), (n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275ted(-1, null, ["\n\n"]))], function (n, e) {
        var l = e.component;
        n(e, 2, 0, n(e, 3, 0, l.isUpdateMode ? "#662900" : "")), n(e, 4, 0, l.pendingRequest), n(e, 18, 0, l.isUpdateMode), n(e, 38, 0, "time", l.match.date_time), n(e, 48, 0, "timezone", l.timezone), n(e, 53, 0, l.timezones), n(e, 72, 0, ""), n(e, 75, 0, "event-provider", l.eventProvider), n(e, 80, 0, l.eventProviderOptions), n(e, 94, 0, ""), n(e, 97, 0, "lineup-provider", l.lineupProvider), n(e, 102, 0, l.lineupProviderOptions), n(e, 119, 0, l.homePlayers, l.homeColorKit, l.homeCoach, "home", "sportradar" == l.lineupProvider.name, l.isUpdateMode, l.homeTeam), n(e, 131, 0, l.awayPlayers, l.awayColorKit, l.awayCoach, "away", "sportradar" == l.lineupProvider.name, l.isUpdateMode, l.awayTeam), n(e, 148, 0, ""), n(e, 151, 0, "stadium", l.stadiumName), n(e, 158, 0, t.\u0275unv(e, 158, 0, t.\u0275nov(e, 159).transform(l.stadiumOptions$))), n(e, 186, 0, "new-stadium-name", l.newStadium.name), n(e, 196, 0, "new-stadium-city", l.newStadium.city), n(e, 207, 0, "new-stadium-capacity", l.newStadium.capacity), n(e, 225, 0, l.competitionEdition, l.competitionRoundId), n(e, 235, 0, l.referee), n(e, 253, 0, ""), n(e, 256, 0, "fps", l.videoFps), n(e, 282, 0, l.compareOnId), n(e, 283, 0, ""), n(e, 286, 0, "source", l.videoSource), n(e, 291, 0, t.\u0275unv(e, 291, 0, t.\u0275nov(e, 292).transform(l.videoSourceOptions$))), n(e, 306, 0, ""), n(e, 309, 0, "video-type", l.videoType), n(e, 314, 0, l.videoTypeOptions), n(e, 324, 0, l.isUpdateMode), n(e, 327, 0, !l.isUpdateMode), n(e, 339, 0, l.showPreview), n(e, 369, 0, n(e, 370, 0, "capture", "computation", "node")), n(e, 376, 0, n(e, 377, 0, "capture", "computation", "node"))
      }, function (n, e) {
        var l = e.component;
        n(e, 7, 0, l.isUpdateMode ? "Update" : "Create "), n(e, 10, 0, l.isUpdateMode ? "Create" : "Update"), n(e, 22, 0, t.\u0275nov(e, 26).ngClassUntouched, t.\u0275nov(e, 26).ngClassTouched, t.\u0275nov(e, 26).ngClassPristine, t.\u0275nov(e, 26).ngClassDirty, t.\u0275nov(e, 26).ngClassValid, t.\u0275nov(e, 26).ngClassInvalid, t.\u0275nov(e, 26).ngClassPending), n(e, 35, 0, t.\u0275nov(e, 40).ngClassUntouched, t.\u0275nov(e, 40).ngClassTouched, t.\u0275nov(e, 40).ngClassPristine, t.\u0275nov(e, 40).ngClassDirty, t.\u0275nov(e, 40).ngClassValid, t.\u0275nov(e, 40).ngClassInvalid, t.\u0275nov(e, 40).ngClassPending), n(e, 45, 0, t.\u0275nov(e, 50).ngClassUntouched, t.\u0275nov(e, 50).ngClassTouched, t.\u0275nov(e, 50).ngClassPristine, t.\u0275nov(e, 50).ngClassDirty, t.\u0275nov(e, 50).ngClassValid, t.\u0275nov(e, 50).ngClassInvalid, t.\u0275nov(e, 50).ngClassPending), n(e, 70, 0, t.\u0275nov(e, 72).required ? "" : null, t.\u0275nov(e, 77).ngClassUntouched, t.\u0275nov(e, 77).ngClassTouched, t.\u0275nov(e, 77).ngClassPristine, t.\u0275nov(e, 77).ngClassDirty, t.\u0275nov(e, 77).ngClassValid, t.\u0275nov(e, 77).ngClassInvalid, t.\u0275nov(e, 77).ngClassPending), n(e, 92, 0, t.\u0275nov(e, 94).required ? "" : null, t.\u0275nov(e, 99).ngClassUntouched, t.\u0275nov(e, 99).ngClassTouched, t.\u0275nov(e, 99).ngClassPristine, t.\u0275nov(e, 99).ngClassDirty, t.\u0275nov(e, 99).ngClassValid, t.\u0275nov(e, 99).ngClassInvalid, t.\u0275nov(e, 99).ngClassPending), n(e, 142, 0, null == l.homeTeam ? null : null == l.homeTeam.stadium ? null : l.homeTeam.stadium.name), n(e, 146, 0, t.\u0275nov(e, 148).required ? "" : null, t.\u0275nov(e, 153).ngClassUntouched, t.\u0275nov(e, 153).ngClassTouched, t.\u0275nov(e, 153).ngClassPristine, t.\u0275nov(e, 153).ngClassDirty, t.\u0275nov(e, 153).ngClassValid, t.\u0275nov(e, 153).ngClassInvalid, t.\u0275nov(e, 153).ngClassPending), n(e, 165, 0, !(null != l.homeTeam && null != l.homeTeam.stadium && l.homeTeam.stadium.name)), n(e, 171, 0, !(null != l.homeTeam && l.homeTeam.id)), n(e, 183, 0, t.\u0275nov(e, 188).ngClassUntouched, t.\u0275nov(e, 188).ngClassTouched, t.\u0275nov(e, 188).ngClassPristine, t.\u0275nov(e, 188).ngClassDirty, t.\u0275nov(e, 188).ngClassValid, t.\u0275nov(e, 188).ngClassInvalid, t.\u0275nov(e, 188).ngClassPending), n(e, 193, 0, t.\u0275nov(e, 198).ngClassUntouched, t.\u0275nov(e, 198).ngClassTouched, t.\u0275nov(e, 198).ngClassPristine, t.\u0275nov(e, 198).ngClassDirty, t.\u0275nov(e, 198).ngClassValid, t.\u0275nov(e, 198).ngClassInvalid, t.\u0275nov(e, 198).ngClassPending), n(e, 203, 0, t.\u0275nov(e, 209).ngClassUntouched, t.\u0275nov(e, 209).ngClassTouched, t.\u0275nov(e, 209).ngClassPristine, t.\u0275nov(e, 209).ngClassDirty, t.\u0275nov(e, 209).ngClassValid, t.\u0275nov(e, 209).ngClassInvalid, t.\u0275nov(e, 209).ngClassPending), n(e, 214, 0, "" === l.newStadium.name), n(e, 250, 0, t.\u0275nov(e, 253).required ? "" : null, t.\u0275nov(e, 258).ngClassUntouched, t.\u0275nov(e, 258).ngClassTouched, t.\u0275nov(e, 258).ngClassPristine, t.\u0275nov(e, 258).ngClassDirty, t.\u0275nov(e, 258).ngClassValid, t.\u0275nov(e, 258).ngClassInvalid, t.\u0275nov(e, 258).ngClassPending), n(e, 281, 0, t.\u0275nov(e, 283).required ? "" : null, t.\u0275nov(e, 288).ngClassUntouched, t.\u0275nov(e, 288).ngClassTouched, t.\u0275nov(e, 288).ngClassPristine, t.\u0275nov(e, 288).ngClassDirty, t.\u0275nov(e, 288).ngClassValid, t.\u0275nov(e, 288).ngClassInvalid, t.\u0275nov(e, 288).ngClassPending), n(e, 304, 0, t.\u0275nov(e, 306).required ? "" : null, t.\u0275nov(e, 311).ngClassUntouched, t.\u0275nov(e, 311).ngClassTouched, t.\u0275nov(e, 311).ngClassPristine, t.\u0275nov(e, 311).ngClassDirty, t.\u0275nov(e, 311).ngClassValid, t.\u0275nov(e, 311).ngClassInvalid, t.\u0275nov(e, 311).ngClassPending), n(e, 332, 0, !l.isUpdateMode || l.pendingRequest), n(e, 351, 0, l.decoderId), n(e, 352, 0, !l.matchId), n(e, 353, 0, l.showPreview ? "Hide" : "Show")
      })
    }

    function q(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 5, "admin-match", [], null, [
        ["window", "beforeunload"]
      ], function (n, e, l) {
        var o = !0;
        return "window:beforeunload" === e && (o = !1 !== t.\u0275nov(n, 5).unloadNotification(l) && o), o
      }, H, R)), t.\u0275prd(512, null, _.StadiumsService, _.StadiumsService, [s.HttpClient]), t.\u0275prd(512, null, r.TeamsService, r.TeamsService, [s.HttpClient]), t.\u0275prd(512, null, w.MatchService, w.MatchService, [s.HttpClient, x.DisplayService, S.LoggingService]), t.\u0275prd(512, null, O.LaunchStatusService, O.LaunchStatusService, [s.HttpClient]), t.\u0275did(5, 114688, null, 0, M.AdminComponent, [s.HttpClient, _.StadiumsService, r.TeamsService, f.NotificationService, w.MatchService, P.VideoSourcesService, E.VideoInfoService, O.LaunchStatusService], null, null)], function (n, e) {
        n(e, 5, 0)
      }, null)
    }
    e.RenderType_AdminComponent = R, e.View_AdminComponent_0 = H, e.View_AdminComponent_Host_0 = q, e.AdminComponentNgFactory = t.\u0275ccf("admin-match", M.AdminComponent, q, {}, {}, [])
  },
  HMtV: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("Xjw4"),
      i = l("7DMc"),
      u = l("C1j0"),
      a = l("SsVf"),
      r = l("bfOx"),
      s = t.\u0275crt({
        encapsulation: 2,
        styles: [],
        data: {}
      });

    function c(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(2, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Incorrect email/password combination"])), (n()(), t.\u0275ted(-1, null, ["\n      "]))], null, null)
    }

    function d(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275eld(1, 0, null, null, 36, "nav", [
        ["class", "navbar navbar-default navbar-fixed-top"],
        ["role", "navigation"],
        ["style", "position: relative;"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(3, 0, null, null, 33, "div", [
        ["class", "container-fluid"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(6, 0, null, null, 18, "div", [
        ["class", "navbar-header"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(8, 0, null, null, 10, "button", [
        ["aria-expanded", "false"],
        ["class", "navbar-toggle collapsed"],
        ["data-target", ".navbar-collapse"],
        ["data-toggle", "collapse"],
        ["type", "button"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(10, 0, null, null, 1, "span", [
        ["class", "sr-only"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Toggle navigation"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(13, 0, null, null, 0, "span", [
        ["class", "icon-bar"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(15, 0, null, null, 0, "span", [
        ["class", "icon-bar"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(17, 0, null, null, 0, "span", [
        ["class", "icon-bar"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(20, 0, null, null, 3, "a", [
        ["class", "navbar-brand"],
        ["href", "/"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(22, 0, null, null, 0, "img", [
        ["alt", ""],
        ["width", "170"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(27, 0, null, null, 8, "div", [
        ["class", "collapse navbar-collapse"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(29, 0, null, null, 5, "ul", [
        ["class", "nav navbar-nav navbar-right"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(31, 0, null, null, 2, "li", [
        ["data-menuanchor", "home"]
      ], null, null, null, null, null)), (n()(), t.\u0275eld(32, 0, null, null, 1, "a", [
        ["href", "/"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Website"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275ted(-1, null, ["\n\n"])), (n()(), t.\u0275eld(39, 0, null, null, 32, "div", [
        ["class", "row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(41, 0, null, null, 29, "div", [
        ["class", "col-sm-3 col-sm-offset-4"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(43, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Login"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275and(16777216, null, null, 1, null, c)), t.\u0275did(47, 16384, null, 0, o.NgIf, [t.ViewContainerRef, t.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(49, 0, null, null, 20, "form", [
        ["novalidate", ""],
        ["role", "form"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "submit"],
        [null, "reset"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "submit" === e && (o = !1 !== t.\u0275nov(n, 51).onSubmit(l) && o), "reset" === e && (o = !1 !== t.\u0275nov(n, 51).onReset() && o), "submit" === e && (o = !1 !== i.login(l, t.\u0275nov(n, 58).value, t.\u0275nov(n, 63).value) && o), o
      }, null, null)), t.\u0275did(50, 16384, null, 0, i.\u0275bf, [], null, null), t.\u0275did(51, 4210688, null, 0, i.NgForm, [
        [8, null],
        [8, null]
      ], null, null), t.\u0275prd(2048, null, i.ControlContainer, null, [i.NgForm]), t.\u0275did(53, 16384, null, 0, i.NgControlStatusGroup, [i.ControlContainer], null, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(55, 0, null, null, 1, "label", [
        ["for", "email"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Email"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(58, 0, [
        ["email", 1]
      ], null, 0, "input", [
        ["class", "form-control"],
        ["id", "email"],
        ["placeholder", "Email"],
        ["type", "text"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(60, 0, null, null, 1, "label", [
        ["for", "password"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Password"])), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(63, 0, [
        ["password", 1]
      ], null, 0, "input", [
        ["class", "form-control"],
        ["id", "password"],
        ["placeholder", "Password"],
        ["type", "password"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(65, 0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(67, 0, null, null, 1, "button", [
        ["class", "btn btn-sm btn-primary"],
        ["type", "submit"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Submit"])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 47, 0, e.component.loginError)
      }, function (n, e) {
        n(e, 22, 0, t.\u0275inlineInterpolate(1, "", e.component._image.getUrl("SkillCorner.jpg"), "")), n(e, 49, 0, t.\u0275nov(e, 53).ngClassUntouched, t.\u0275nov(e, 53).ngClassTouched, t.\u0275nov(e, 53).ngClassPristine, t.\u0275nov(e, 53).ngClassDirty, t.\u0275nov(e, 53).ngClassValid, t.\u0275nov(e, 53).ngClassInvalid, t.\u0275nov(e, 53).ngClassPending)
      })
    }

    function p(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "login-view", [], null, null, null, d, s)), t.\u0275did(1, 49152, null, 0, u.LoginViewComponent, [a.SessionService, r.ActivatedRoute, r.Router], null, null)], null, null)
    }
    e.RenderType_LoginViewComponent = s, e.View_LoginViewComponent_0 = d, e.View_LoginViewComponent_Host_0 = p, e.LoginViewComponentNgFactory = t.\u0275ccf("login-view", u.LoginViewComponent, p, {}, {}, [])
  },
  HQll: function (n, e) {
    function l(n) {
      return Promise.resolve().then(function () {
        throw new Error("Cannot find module '" + n + "'.")
      })
    }
    l.keys = function () {
      return []
    }, l.resolve = l, n.exports = l, l.id = "HQll"
  },
  HySA: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("u//w"), e.LaunchStatusService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getStatus = function (n) {
        return this.httpClient.get("/api/match/" + n + "/match_live/launch_status").catch(function (n) {
          return console.log("Cannot fetch status information"), t.Observable.empty()
        })
      }, n
    }()
  },
  ILnZ: function (n, e, l) {
    "use strict";
    e.styles = ["@import url(https://fonts.googleapis.com/css?family=Saira+Semi+Condensed|Saira+Condensed:700);.canvas-wrap[_ngcontent-%COMP%]{overflow:visible}.menu[_ngcontent-%COMP%]{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;top:0;left:0;width:100%;height:100%;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;z-index:2000}.menu-item[_ngcontent-%COMP%]{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.skc-btn[_ngcontent-%COMP%]{max-width:50px;max-height:50px;min-width:30px;min-height:30px;opacity:.5;cursor:pointer;border-radius:50%;width:5vw;height:5vw;padding:0;border:none}.skc-btn[_ngcontent-%COMP%]:focus{outline:0}.skc-btn-sub[_ngcontent-%COMP%]{display:none;margin:0 .5vw .5vw}.skc-btn-main[_ngcontent-%COMP%]{-webkit-box-ordinal-group:10000;-ms-flex-order:9999;order:9999;margin:.5vw}.skc-btn-toggled[_ngcontent-%COMP%], .skc-btn[_ngcontent-%COMP%]:hover{border:thick solid #00f}.skc-btn-sub[_ngcontent-%COMP%]:hover{border:thick solid green}.menu-item[_ngcontent-%COMP%]:hover   .skc-btn-sub[_ngcontent-%COMP%]{display:block}"]
  },
  J8vI: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("YaPU");
    l("TDKa"), l("MQ0p"), l("bAW0"), l("u//w"), l("p017"), l("VKQ6"), l("owTz"), l("PCB2"), l("o53x"), l("v7CW"), l("LhOs"), l("cxtG"), l("pDJ4"), l("R/sw"), l("QU7m");
    var o = l("FjE5"),
      i = l("gvjY"),
      u = l("4EQH"),
      a = (l("L1ao"), l("QPaD")),
      r = (l("jDyY"), l("D692"), l("Zn+w"));
    e.PositionService = function () {
      function n(n, e, l) {
        this.stream = n, this.display = e, this.matchService = l, this.pastFrames = [], this.lastBallPos = {
          frame: 0,
          x: null,
          y: null
        }, this.scheduler = a.animationFrame, this.then = this.scheduler.now() - 400, this.nFramesToSkip = 0
      }
      return n.prototype.getRefinedStream = function () {
        var n = this;
        return this.stream.cameraStream$.do(function (e) {
          return n.lastReceivedFrame = e.frame
        }).do(function (e) {
          return n.normalizeTrackables(e)
        }).let(this.smoothActions.bind(this)).let(this.augmentActions.bind(this)).concatMap(function (e) {
          return n.flattenStreamSpeed(e)
        })
      }, n.prototype.augmentActions = function (n) {
        var e = this;
        return n.bufferCount(2, 1).concatMap(function (n) {
          return t.Observable.from(o.getInterpolatedFrames(n[0], n[1], e.matchService.fps.video, e.matchService.fps.target))
        })
      }, n.prototype.normalizeTrackables = function (n) {
        var e = this;
        n.data.forEach(function (l) {
          var t;
          l.x = l.map_x || l.x, l.y = l.map_y || l.y, e.matchService.composition && o.trackableIsBall(l, e.matchService.composition) && e.addVelocity(n.frame, l), e.display.isZoomMode ? (l.size = 60, t = u.rawCoordinatesToRotate(l.x, l.y)) : (l.size = 48, t = e.display.fullPerspective ? u.rawCoordinatesToFullPerspective(l.x, l.y) : e.display.isPerspectiveMode ? u.rawCoordinatesToPerspective(l.x, l.y) : u.coordinatesToHQField(l.x, l.y)), l.x = t.x, l.y = t.y, l.unique_id = l.track_id, l.isPerspectiveMode = e.display.isPerspectiveMode, l.isZoomMode = e.display.isZoomMode
        })
      }, n.prototype.smoothActions = function (n) {
        var e = this;
        return n.bufferCount(10).flatMap(function (n) {
          var l = e.pastFrames.concat(n),
            t = e.getTrackablesTrajectories(l);
          for (var i in t) o.applyKernelRegression(t[i], 5);
          return e.updatePastFrames(n), n
        })
      }, n.prototype.addVelocity = function (n, e) {
        var l = e.x,
          t = e.y;
        e.velocity = n - this.lastBallPos.frame < 2 ? Math.sqrt(Math.pow(l - this.lastBallPos.x, 2) + Math.pow(t - this.lastBallPos.y, 2)) : 0, this.lastBallPos.x = l, this.lastBallPos.y = t, this.lastBallPos.frame = n
      }, n.prototype.getDetectedTrackablesIds = function (n) {
        var e = new Set;
        return n.forEach(function (n) {
          return n.data.forEach(function (n) {
            e.add(n.unique_id)
          })
        }), e
      }, n.prototype.getTrackablesTrajectories = function (n) {
        var e = {};
        return this.getDetectedTrackablesIds(n).forEach(function (n) {
          e[n] = []
        }), n.forEach(function (n) {
          n.data.forEach(function (n) {
            e[n.unique_id].push(n)
          })
        }), e
      }, n.prototype.updatePastFrames = function (n) {
        this.pastFrames = n.slice(-5)
      }, n.prototype.resetPastFrames = function () {
        this.pastFrames = []
      }, n.prototype.flattenStreamSpeed = function (n) {
        var e = this;
        if (n.type === i.ACTION_NOOP) {
          if (this.nFramesToSkip > 0) return this.nFramesToSkip--, t.Observable.of(n);
          if (this.lastReceivedFrame - n.frame > r.MAX_LIVE_DELAY * this.matchService.fps.video) return this.nFramesToSkip = (r.MAX_LIVE_DELAY - r.LIVE_SENDING_PERIOD) * this.matchService.fps.target - 1, t.Observable.of(n)
        }
        var l = 1e3 / this.matchService.fps.target,
          o = this.scheduler.now(),
          u = o - this.then;
        if (u > l) return this.then = o, t.Observable.of(n);
        var a = l - u;
        return t.Observable.timer(a, this.scheduler).map(function (l) {
          return e.then = o + a, n
        })
      }, n
    }()
  },
  JCcm: function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
      for (var e, l = 1, t = arguments.length; l < t; l++)
        for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
      return n
    };
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("ItHS");
    var o = l("eXMp"),
      i = (l("T6ZN"), l("BAgd"), l("YaPU"));
    l("MDfR"), l("xgm2");
    var u = l("e5zT"),
      a = l("D4Le"),
      r = l("zvWE"),
      s = (l("j+m6"), l("D692"), l("a+4R"), l("dgbi"), l("HySA"), l("PJh5")),
      c = l("xNPZ"),
      d = l("Zn+w");
    e.AdminComponent = function () {
      function n(n, e, l, t, o, i, r, s) {
        this.httpClient = n, this.stadiumsService = e, this.teamsService = l, this.notificationService = t, this.matchService = o, this.videoSourcesService = i, this.videoInfoService = r, this.launchStatusService = s, this.compareOnId = a.compareOnId, this.stadiumName = void 0, this.pendingRequest = !1, this.timezones = c.tz.names(), this.timezone = this.timezones.find(function (n) {
          return "Europe/Paris" === n
        }), this.isUpdateMode = !1, this.stadiumOptions$ = new u.ReplaySubject, this.eventProviderOptions = [{
          name: "",
          help: "no event"
        }, {
          name: d.SPORTRADAR_EVENT,
          help: ""
        }, {
          name: d.SKILLCORNER_EVENT,
          help: ""
        }], this.lineupProviderOptions = [{
          name: d.SPORTRADAR_EVENT
        }, {
          name: d.SKILLCORNER_EVENT
        }], this.videoSourceOptions$ = new u.ReplaySubject(1), this.videoTypeOptions = ["mixed", "wide shot"], this.showPreview = !1, this.nPreview = 0, this.match = {
          date_time: void 0
        }, this.stadiumsService.getStadiums().subscribe(this.stadiumOptions$), this.videoSourcesService.getVideoSources().subscribe(this.videoSourceOptions$)
      }
      return n.prototype.canDeactivate = function () {
        return !(this.homeTeam && void 0 != this.homeTeam.id || this.awayTeam && void 0 != this.awayTeam.id || this.stadium || this.referee)
      }, n.prototype.unloadNotification = function (n) {
        this.canDeactivate() || (n.returnValue = "You are about to lose your changes. Are you sure you want to proceed ?")
      }, n.prototype.resetFormFields = function () {
        this.matchToUpdateId = void 0, this.stadiumName = void 0, this.match = {
          date_time: (new Date).toISOString().substring(0, 10) + "T20:45:00"
        }, this.matchId = void 0, this.decoderId = void 0, this.homeTeam = {
          id: "",
          name: "",
          stadium: ""
        }, this.homeCoach = new o.Coach, this.homeColorKit = void 0, this.homePlayers = [], this.awayTeam = {
          id: "",
          name: "",
          stadium: ""
        }, this.awayCoach = new o.Coach, this.awayColorKit = void 0, this.awayPlayers = [], this.stadium = void 0, this.newStadium = {
          name: "",
          city: "",
          capacity: void 0
        }, this.newStadiumSetHomeTeam = !1, this.referee = void 0, this.competitionEdition = void 0, this.competitionRoundId = void 0, this.lineupProvider = this.lineupProviderOptions.find(function (n) {
          return n.name == d.SPORTRADAR_EVENT
        }), this.eventProvider = this.eventProviderOptions.find(function (n) {
          return n.name == d.SPORTRADAR_EVENT
        }), this.videoFps = void 0, this.videoSource = void 0, this.videoType = "mixed", this.launchStatusRefreshing = !1, this.resetLaunchStatus()
      }, n.prototype.resetLaunchStatus = function () {
        this.launchStatus = {
          capture: {
            status: "unlaunched",
            label: "default",
            duration: void 0
          },
          computation: {
            status: "unlaunched",
            label: "default",
            duration: void 0
          },
          node: {
            status: "unlaunched",
            label: "default",
            duration: void 0
          }
        }
      }, n.prototype.ngOnInit = function () {
        this.resetFormFields()
      }, n.prototype.logStuff = function () {
        console.log("this.competitionEdition", this.competitionEdition), console.log("this.competitionRoundId", this.competitionRoundId), console.log("this.referee", this.referee), console.log("this.stadium", this.stadium), console.log("this.homePlayers", this.homePlayers), console.log("this.datetime", this.match.date_time), console.log("this.timezone", this.timezone), console.log("with timezone", c.tz(this.match.date_time, this.timezone))
      }, n.prototype.getMatches = function () {
        var n = this;
        this.matchService.getMatches().subscribe(function (e) {
          return n.matches = e
        })
      }, n.prototype.updateMatchesAfterCreation = function (n) {
        var e = this;
        this.matchService.getMatches().subscribe(function (l) {
          e.matches = l, e.fillMatchUpdate(n), e.isUpdateMode = !0
        })
      }, n.prototype.continuouslyRefreshStatus = function () {
        var n = this;
        this.launchStatusRefreshing && (this.launchStatusService.getStatus(this.matchToUpdateId).subscribe(function (e) {
          e.forEach(function (e) {
            (!n.launchStatus[e.task].start || n.launchStatus[e.task].start <= e.start) && (n.launchStatus[e.task].duration = e.end ? s.utc(s(e.end).diff(s(e.start))).format("HH:mm:ss") : e.start ? s.utc(s().diff(s(e.start))).format("HH:mm:ss") : void 0, n.launchStatus[e.task].start = e.start, n.launchStatus[e.task].status = e.status, n.launchStatus[e.task].label = d.STATUS_TO_LABEL[e.status])
          })
        }), setTimeout(function () {
          return n.continuouslyRefreshStatus()
        }, 15e3))
      }, n.prototype.fillMatchUpdate = function (n) {
        var e = this;
        this.resetLaunchStatus(), this.matchToUpdateId = n, this.matchId = n, this.videoInfoService.getVideoAndMatchInfo(n).subscribe(function (n) {
          var l = n.match;
          e.match.date_time = s(l.date_time).tz(e.timezone).format("YYYY-MM-DDTHH:mm"), e.homeTeam = {
            id: l.home_team.id
          }, e.awayTeam = {
            id: l.away_team.id
          }, e.homeCoach = l.home_team_coach ? l.home_team_coach : new o.Coach, e.awayCoach = l.away_team_coach ? l.away_team_coach : new o.Coach, e.homeColorKit = l.home_team_kit_color, e.awayColorKit = l.away_team_kit_color, e.homePlayers = l.players.filter(function (n) {
            return n.team_id === e.homeTeam.id
          }), e.awayPlayers = l.players.filter(function (n) {
            return n.team_id === e.awayTeam.id
          }), e.stadium = l.stadium, e.stadiumName = e.stadium.name, e.referee = l.referees[0], e.competitionEdition = l.competition_edition, e.competitionRoundId = l.competition_round.id;
          var t = e.eventProviderOptions.find(function (n) {
              return n.name == l.event_provider
            }),
            i = e.lineupProviderOptions.find(function (n) {
              return n.name == l.lineup_provider
            });
          t && (e.eventProvider = t), i && (e.lineupProvider = i), e.videoFps = n.fps, e.videoSource = n.source, n.video_receiver && n.video_receiver.decoder && (e.decoderId = n.video_receiver.decoder), e.videoTypeOptions.indexOf(n.video_type) > -1 && (e.videoType = n.video_type), e.launchStatusRefreshing || (e.launchStatusRefreshing = !0, e.continuouslyRefreshStatus())
        })
      }, n.prototype.onTzSelected = function (n) {
        this.match.date_time = s(this.match.date_time).tz(this.timezone).format("YYYY-MM-DDTHH:mm")
      }, n.prototype.changePreviewMode = function () {
        this.showPreview || (this.nPreview = this.nPreview + 1), this.showPreview = !this.showPreview
      }, n.prototype.updateMatch = function () {
        var n = this;
        if (this.checkFormatBeforeRequest()) {
          var e = this.constructRequestData(),
            l = this.httpClient.put("/api/match/update", JSON.stringify(e)).catch(function (n) {
              return i.Observable.throw(n.error)
            });
          this.pendingRequest = !0, l.subscribe(function (e) {
            n.pendingRequest = !1, n.matchId = e.match.id, n.notificationService.addNotification({
              type: "success",
              message: "Successfully updated match : id: " + n.matchId
            }), n.getMatches()
          }, function (e) {
            n.pendingRequest = !1, n.notificationService.addNotification({
              type: "error",
              message: "<b> Could not update match: </b>" + a.formatJsonErrorAsList(e) + " !"
            })
          })
        }
      }, n.prototype.createMatch = function () {
        var n = this;
        if (this.checkFormatBeforeRequest()) {
          var e = this.constructRequestData(),
            l = this.httpClient.post("/api/match/create", JSON.stringify(e)).catch(function (n) {
              return i.Observable.throw(n.error)
            });
          this.pendingRequest = !0, l.subscribe(function (e) {
            n.pendingRequest = !1, n.matchId = e.match.id, n.updateMatchesAfterCreation(n.matchId), n.notificationService.addNotification({
              type: "success",
              message: "Successfully created match : id: " + n.matchId
            })
          }, function (e) {
            n.pendingRequest = !1, n.notificationService.addNotification({
              type: "error",
              message: "<b> Could not create match: </b>" + a.formatJsonErrorAsList(e)
            })
          })
        }
      }, n.prototype.onStadiumSelected = function () {
        var n = this;
        this.stadiumOptions$.subscribe(function (e) {
          return n.stadium = e.find(function (e) {
            return e.name === n.stadiumName
          })
        })
      }, n.prototype.addStadium = function () {
        var n = this;
        this.stadiumsService.createStadium(this.newStadium).subscribe(function (e) {
          n.stadiumOptions$ = new u.ReplaySubject(1), n.stadiumsService.getStadiums().subscribe(n.stadiumOptions$), n.stadiumOptions$.subscribe(function (l) {
            n.stadium = l.find(function (n) {
              return n.id == e.id
            }), n.stadiumName = n.stadium.name, n.newStadium = {
              name: "",
              city: "",
              capacity: void 0
            }, n.newStadiumSetHomeTeam = !1
          })
        }, function (e) {
          return n.notificationService.addNotification({
            type: "error",
            message: "Failed to create stadium: " + a.formatJsonErrorAsList(e),
            ttl: 5e3
          })
        })
      }, n.prototype.setHomeTeamStadiumToStadium = function () {
        var n = this;
        "" != this.homeTeam.id && this.teamsService.patchTeam({
          id: this.homeTeam.id,
          stadium_id: this.stadium.id
        }).subscribe(function (e) {
          n.homeTeam.stadium = n.stadium
        }, function (e) {
          return n.notificationService.addNotification({
            type: "error",
            message: "Failed to add stadium as home stadium for team: " + a.formatJsonErrorAsList(e),
            ttl: 2e3
          })
        })
      }, n.prototype.setStadiumToHome = function () {
        var n = this;
        this.stadiumOptions$.subscribe(function (e) {
          n.stadium = e.find(function (e) {
            return e.id == n.homeTeam.stadium.id
          }), n.stadiumName = n.stadium.name
        })
      }, n.prototype.checkFormatBeforeRequest = function () {
        var n = this.awayTeam && null !== this.awayTeam.id ? this.homeTeam && null !== this.homeTeam.id ? "" : "home" : "away",
          e = this.homeColorKit && void 0 != this.homeColorKit.id ? this.awayColorKit && void 0 != this.awayColorKit.id ? "" : "away" : "home",
          l = "";
        return "" == n || (l = l + "- Please enter an existing " + n + " team name !<br>"), "" == e || (l = l + "- Please enter an existing " + e + " kit color !<br>"), this.stadium && void 0 != this.stadium.id || (l += "- Please enter an existing stadium name !<br>"), !this.referee || void 0 != this.referee.id || (l += "- Please enter an existing referee name or leave empty!<br>"), "" === l || (this.notificationService.addNotification({
          type: "error",
          message: l,
          ttl: 2e3
        }), !1)
      }, n.prototype.constructRequestData = function () {
        var n = this,
          e = {
            date_time: c.tz(this.match.date_time, this.timezone).format(),
            home_team: this.homeTeam.id,
            away_team: this.awayTeam.id,
            home_team_kit_color: this.homeColorKit.id,
            away_team_kit_color: this.awayColorKit.id,
            stadium: this.stadium.id,
            players: Array.prototype.concat(this.homePlayers.map(function (e) {
              return t({}, e, {
                team: n.homeTeam.id
              })
            }), this.awayPlayers.map(function (e) {
              return t({}, e, {
                team: n.awayTeam.id
              })
            })),
            competition_edition: this.competitionEdition.id,
            competition_round: this.competitionRoundId,
            lineup_provider: this.lineupProvider.name,
            event_provider: this.eventProvider.name
          };
        return this.isUpdateMode && (e.id = this.matchToUpdateId), this.isUpdateMode || e.players.map(function (n) {
          n.yellow_card = 0, n.red_card = 0, n.injured = !1, n.end_time = null, n.start_time = "00:00:00"
        }), this.referee && (e.referee = this.referee.id), this.homeCoach && (this.homeCoach.id || 0 == this.homeCoach.id) && this.homeCoach.id > -1 && (e.home_team_coach = this.homeCoach.id), this.awayCoach && (this.awayCoach || this.awayCoach.id) && this.awayCoach.id > -1 && (e.away_team_coach = this.awayCoach.id), {
          match: e,
          video: {
            fps: this.videoFps,
            source_id: this.videoSource.id,
            video_type: this.videoType
          }
        }
      }, n.prototype.isUpdateModeChangeState = function () {
        !this.isUpdateMode || (this.homeTeam && this.homeTeam.name || this.awayTeam && this.awayTeam.name) && !confirm("You are about to discard your changes.\nAre you sure you want to proceed ?") ? this.isUpdateMode || (this.homeTeam && this.homeTeam.name || this.awayTeam && this.awayTeam.name) && !confirm("You are about to discard your changes.\nAre you sure you want to proceed ?") || (this.isUpdateMode = !0, this.resetFormFields(), this.getMatches(), this.notificationService.addNotification({
          type: "info",
          message: "You are in UPDATE mode now",
          ttl: 1e3
        })) : (this.isUpdateMode = !1, this.resetFormFields(), this.notificationService.addNotification({
          type: "info",
          message: "You are in CREATE mode now",
          ttl: 1e3
        }))
      }, n.prototype.checkStadiumIntegrity = function () {
        r.checkFormIntegrity(this.stadium, this.stadiumName, this.notificationService) || (this.stadiumName = "")
      }, n.prototype.setPendingLaunchStatus = function (n) {
        this.launchStatus[n].start = void 0, this.launchStatus[n].duration = "00:00:00", this.launchStatus[n].status = "pending", this.launchStatus[n].label = d.STATUS_TO_LABEL.pending
      }, n.prototype.launchLive = function () {
        var n = this;
        if ("pending" != this.launchStatus.capture.status && "success" != this.launchStatus.capture.status && "pending" != this.launchStatus.computation.status && "success" != this.launchStatus.computation.status && "pending" != this.launchStatus.node.status && "success" != this.launchStatus.node.status || confirm("Live already launched, are you sure you want to relaunch it?")) {
          var e = this.httpClient.put("/api/match/" + this.matchToUpdateId + "/match_live/launch", "{}").catch(function (n) {
            return i.Observable.throw(n)
          });
          for (var l in this.pendingRequest = !0, this.launchStatus) this.setPendingLaunchStatus(l);
          e.subscribe(function (e) {
            n.pendingRequest = !1, n.decoderId = e.decoder, n.notificationService.addNotification({
              type: "success",
              message: "Started launching live (watch status for update)"
            })
          }, function (e) {
            n.pendingRequest = !1, n.notificationService.addNotification({
              type: "error",
              message: "<b> Could not launch live: </b>" + a.formatJsonErrorAsList(e)
            })
          })
        }
      }, n.prototype.launchTask = function (n) {
        var e = this;
        if ("pending" != this.launchStatus[n].status && "success" != this.launchStatus[n].status || confirm(n + " already launched, are you sure you want to relaunch it?")) {
          var l = this.httpClient.put("/api/match/" + this.matchToUpdateId + "/match_live/launch_" + n, "{}").catch(function (n) {
            return i.Observable.throw(n.error)
          });
          this.pendingRequest = !0, this.setPendingLaunchStatus(n), l.subscribe(function (l) {
            e.pendingRequest = !1, e.notificationService.addNotification({
              type: "success",
              message: "Started launching " + n + " (watch status for update)"
            })
          }, function (l) {
            e.pendingRequest = !1, e.notificationService.addNotification({
              type: "error",
              message: "<b> Could not launch " + n + ": </b>" + a.formatJsonErrorAsList(l)
            })
          })
        }
      }, n
    }()
  },
  Kmda: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR"), e.RefereesService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getReferees = function () {
        return this.httpClient.get("/api/referees/?limit=100000").map(function (n) {
          return n.results
        }).catch(function (n) {
          return console.log("getReferees", n), t.Observable.throw(n)
        })
      }, n.prototype.addReferee = function (n) {
        return this.httpClient.post("/api/referees/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n
    }()
  },
  L1ao: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("YaPU"),
      o = (l("D692"), l("e5zT")),
      i = l("4zOZ");
    l("TDKa"), l("MQ0p"), l("bAW0"), l("u//w"), l("HUv8"), l("VKQ6"), l("owTz"), l("o53x"), l("v7CW"), l("F3G9"), l("XeQn"), l("LhOs"), l("cxtG"), l("pDJ4"), l("R/sw"), l("QU7m");
    var u = l("xe4/"),
      a = l("gvjY"),
      r = l("4EQH"),
      s = (l("PakY"), l("D4Le"));
    l("cPqY"), l("VwFy"), l("PCB2");
    var c = l("Gvdl");
    l("jDyY"), e.WSStreamService = function () {
      function n(n, e, l) {
        var t = this;
        this.matchService = n, this.console = l, this.isInit$ = new i.BehaviorSubject(!1), this.wsActions$ = new o.ReplaySubject(1), this.lastVisibilityChangeTime = performance.now(), this.eventStream$ = new i.BehaviorSubject(void 0), this.cameraStream$ = new c.Subject, this.lastCameraFrame = -1 / 0, e.whenInit().concatMap(function () {
          return n.whenInit()
        }).do(function () {
          return t.getRawActions()
        }).concatMap(function () {
          return t.cameraStream$.take(1)
        }).subscribe(function () {
          return t.isInit$.next(!0)
        })
      }
      return n.prototype.whenInit = function () {
        return this.isInit$.filter(function (n) {
          return !!n
        }).first()
      }, n.prototype.handleWebSocket = function (n) {
        var e = this;
        if ("hidden" == this.tabVisibility) return t.Observable.timer(2e3).subscribe(function () {
          return e.handleWebSocket(n)
        }), void this.console.log("[WS.Hidden] - hidden tab, will retry in 2s.");
        this.ws && (this.ws.onclose = function () {}, this.ws.onerror = function () {}, this.closeWS()), this.ws = new WebSocket(n), this.ws.binaryType = "arraybuffer", this.ws.onerror = function (l) {
          e.console.error("[WS.Error] : retrying to open in 10s. type : ", l.type), e.ws.onclose = function () {}, e.ws.onerror = function () {}, t.Observable.timer(1e4).subscribe(function () {
            return e.handleWebSocket(n)
          })
        }, this.ws.onopen = function (l) {
          t.Observable.fromEvent(e.ws, "message").concatMap(function (n) {
            var e = n.data;
            return "[object ArrayBuffer]" == Object.prototype.toString.call(e) && (e = u.inflate(e, {
              to: "string"
            })), JSON.parse(e).data
          }).filter(function (n) {
            return "visible" == e.tabVisibility || n.type != a.ACTION_FRAME
          }).do(function (n) {
            return e.dispatchActions(n)
          }).subscribe(e.wsActions$), e.console.info("[WS.Open] : Opened socket"), e.ws.onclose = function (l) {
            if (!e.tabVisibility) return e.console.warn("[WS.Close] : retrying now. Cause : " + s.getCodeSignification(l)), e.handleWebSocket(n);
            e.console.warn("[WS.Close] : retrying to open in 5s. Cause : " + s.getCodeSignification(l)), t.Observable.timer(5e3).subscribe(function () {
              return e.handleWebSocket(n)
            })
          }
        }
      }, n.prototype.reconstructMatchState = function (n) {
        return t.Observable.throw(Error("This method should be overloaded inside Events service !"))
      }, n.prototype.getFirstNewFrame = function () {
        var n = this;
        return this.wsActions$.skip(1).take(1).map(function (n) {
          return n.frame
        }).timeout(3e3).catch(function (e) {
          return "TimeoutError" === e.name ? n.lastCameraFrame == -1 / 0 && n.matchService.matchEndTime ? (n.console.log("Not fetching instructions since the match has ended or not started yet"), n.refreshTabVisibility(), t.Observable.empty()) : (n.lastCameraFrame = 1 / 0, t.Observable.of(1 / 0)) : t.Observable.throw(e)
        })
      }, n.prototype.focusBackAfterClosedWS = function () {
        var n = this;
        this.console.info("focus back after closed WS"), this.tabVisibility = "visible", this.lastVisibilityChangeTime = performance.now(), this.getFirstNewFrame().switchMap(function (e) {
          return n.reconstructMatchState({
            fetchFromBack: !0,
            lastFrame: e,
            applyNow: !1
          })
        }).subscribe(this.refreshTabVisibility.bind(this))
      }, n.prototype.refreshTabVisibility = function () {
        var n = this,
          e = document.visibilityState;
        if (e == this.tabVisibility) return t.Observable.timer(2e3).subscribe(function () {
          return n.refreshTabVisibility()
        });
        this.console.info("[Refresh] - Visibility changed to : ", e);
        var l = "visible" == e,
          o = !!this.ws && (this.ws.readyState == this.ws.CLOSED || this.ws.readyState == this.ws.CLOSING);
        return l && o ? this.focusBackAfterClosedWS() : l || o ? (this.tabVisibility = e, this.lastVisibilityChangeTime = performance.now(), void t.Observable.timer(2e3).subscribe(function () {
          return n.refreshTabVisibility()
        })) : this.focusLostSocketIsOpen()
      }, n.prototype.focusLostSocketIsOpen = function () {
        var n = this;
        this.console.info("Focus is lost, but the socket is still open."), r.isIOS() ? (this.tabVisibility = "hidden", this.lastVisibilityChangeTime = performance.now(), this.closeWS(), this.refreshTabVisibility()) : t.Observable.timer(5e3).subscribe(function () {
          "hidden" == document.visibilityState && performance.now() - n.lastVisibilityChangeTime > 4e3 && (n.tabVisibility = "hidden", n.lastVisibilityChangeTime = performance.now(), n.closeWS()), n.refreshTabVisibility()
        })
      }, n.prototype.closeWS = function () {
        !this.ws || this.ws.readyState != this.ws.OPEN && this.ws.readyState != this.ws.CONNECTING || this.ws.close()
      }, n.prototype.getRawActions = function () {
        return this.refreshTabVisibility(), this.handleWebSocket(this.matchService.wsUrl), this.wsActions$
      }, n.prototype.dispatchActions = function (n) {
        switch (n.type) {
          case a.ACTION_CONTEXTUAL:
          case a.INSTRUCTION:
          case a.ACTION_MESSAGE:
          case a.ACTION_HEATMAP:
            this.eventStream$.next(n);
            break;
          case a.ACTION_FRAME:
          case a.ACTION_NOOP:
            this.lastCameraFrame = n.frame, this.cameraStream$.next(n)
        }
      }, n
    }()
  },
  LMoW: function (n, e, l) {
    "use strict";
    var t = l("FfWz"),
      o = l("WT6e"),
      i = l("Xjw4"),
      u = l("jxg3"),
      a = l("jDyY"),
      r = l("J8vI"),
      s = o.\u0275crt({
        encapsulation: 0,
        styles: [t.styles],
        data: {}
      });

    function c(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 12, "li", [
        ["class", "option"]
      ], [
        [2, "hidden", null],
        [8, "id", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.activateOption(n.context.$implicit.name) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(2, 0, null, null, 3, "div", [
        ["class", "option-icon"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [], [
        [8, "src", 4],
        [8, "alt", 0]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(7, 0, null, null, 4, "div", [
        ["class", "option-description"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(9, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(10, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "]))], null, function (n, e) {
        n(e, 0, 0, e.context.$implicit.hide, o.\u0275inlineInterpolate(1, "triggerable-", e.context.$implicit.name, "")), n(e, 4, 0, o.\u0275inlineInterpolate(1, "", e.context.$implicit.icon, ""), o.\u0275inlineInterpolate(1, "Click to activate ", e.context.$implicit.name, "")), n(e, 10, 0, e.context.$implicit.description)
      })
    }

    function d(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 6, "ul", [
        ["id", "menu-slider"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275eld(2, 0, null, null, 0, "li", [
        ["class", "empty-space"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275and(16777216, null, null, 1, null, c)), o.\u0275did(5, 802816, null, 0, i.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n\n"])), (n()(), o.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 5, 0, e.component.options)
      }, null)
    }

    function p(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "minimap-menu", [], null, null, null, d, s)), o.\u0275did(1, 4308992, null, 0, u.MinimapMenuComponent, [o.ElementRef, a.DisplayService, r.PositionService], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_MinimapMenuComponent = s, e.View_MinimapMenuComponent_0 = d, e.View_MinimapMenuComponent_Host_0 = p, e.MinimapMenuComponentNgFactory = o.\u0275ccf("minimap-menu", u.MinimapMenuComponent, p, {}, {}, [])
  },
  LfZH: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.translationTable = {
      "Zoom In": {
        fr: "Agrandir",
        zh: "\u63a8\u8fdb\u653e\u5927",
        es: "Agrandar",
        de: "Vergr\xf6\xdfern"
      },
      "Zoom Out": {
        fr: "R\xe9tr\xe9cir",
        zh: "\u62c9\u8fdc\u7f29\u5c0f",
        es: "Achicar",
        de: "Schrumpfen"
      },
      "View 2D/3D": {
        fr: "Vue 2D/3D",
        zh: "2D/3D\u89c6\u89d2",
        es: "Vista 2D/3D ",
        de: "Ansicht 2D/3D"
      },
      "Match Information": {
        fr: "Infos match",
        zh: "\u6bd4\u8d5b\u4fe1\u606f",
        es: "Informaci\xf3n",
        de: "Spielinformationen"
      },
      "Match Sheet": {
        fr: "Feuille de match",
        zh: "\u7403\u961f\u9635\u5bb9",
        es: "Hoja de Partido",
        de: "Spielblatt"
      },
      Lineup: {
        fr: "Composition",
        zh: "\u7403\u961f\u4fe1\u606f",
        es: "Alineaci\xf3n",
        de: "Aufstellung"
      },
      Statistics: {
        fr: "Statistiques",
        zh: "\u7edf\u8ba1",
        es: "Estad\xedstica",
        de: "Statistiken"
      },
      Help: {
        fr: "Aide",
        zh: "\u5e2e\u52a9",
        es: "Ayuda",
        de: "Hilfe"
      },
      " Days, ": {
        fr: " Jours, ",
        zh: "\u5929",
        es: " D\xedas, ",
        de: " Tage, "
      },
      " Day, ": {
        fr: " Jour, ",
        zh: "\u5929",
        es: " D\xeda, ",
        de: " Tag, "
      },
      " Hours, ": {
        fr: " Heures, ",
        zh: "\u5c0f\u65f6",
        es: " Horas, ",
        de: " Std, "
      },
      " Minutes, ": {
        fr: " Minutes, ",
        zh: "\u5206\u949f",
        es: " Minutos, ",
        de: " Min, "
      },
      " Seconds": {
        fr: " Secondes",
        zh: "\u79d2",
        es: " Segundos",
        de: " Sek"
      },
      "The match has ended<br>We hope you enjoyed it !": {
        fr: "Le match est termin\xe9<br>On esp\xe8re que vous l'avez appr\xe9ci\xe9 !",
        zh: "\u6bd4\u8d5b\u5df2\u7ed3\u675f<br>\u5e0c\u671b\u60a8\u559c\u6b22",
        es: "El partido ha terminado<br>Esperamos que lo hayan disfrutado!",
        de: "Das Spiel ist beendet<br>Wir hoffen es hat euch gefallen!"
      },
      "The match has not started yet": {
        fr: "Le match n'a pas encore commenc\xe9",
        zh: "\u6bd4\u8d5b\u5c1a\u672a\u5f00\u59cb",
        es: "El partido a\xfan no ha comenzado",
        de: "Das Spiel hat noch nicht begonnen"
      },
      "First half break<br>The match will resume soon": {
        fr: "Mi-temps<br>Le match va bient\xf4t reprendre",
        zh: "\u534a\u573a\u4f11\u606f<br>\u6bd4\u8d5b\u7a0d\u540e\u4f1a\u91cd\u65b0\u5f00\u59cb",
        es: "Descanso del primer tiempo<br>El partido se reanudar\xe1 pronto",
        de: "Erste Pause<br>Das Spiel wird bald fortgesetzt"
      },
      "Second half break<br>The extra time will begin soon": {
        fr: "Fin de la seconde p\xe9riode<br>La prolongation va bient\xf4t commencer",
        zh: "\u4e0b\u534a\u573a\u7ed3\u675f<br>\u52a0\u65f6\u8d5b\u4f1a\u7a0d\u540e\u5f00\u59cb",
        es: "Descanso del segundo tiempo<br>El tiempo extra comenzar\xe1 pronto",
        de: "Zweite Pause<br>Die Verl\xe4ngerung wird bald beginnen"
      },
      "The two teams are exchanging their positions<br>The match will resume soon": {
        fr: "Les deux \xe9quipes changent de c\xf4t\xe9<br>Le match va bient\xf4t reprendre",
        zh: "\u4e24\u961f\u6b63\u5728\u4ea4\u6362\u573a\u5730<br>\u6bd4\u8d5b\u4f1a\u7a0d\u540e\u5f00\u59cb",
        es: "Los equipos intercambian su posici\xf3n dentro del campo<br>El partido se reanudar\xe1 pronto",
        de: "Die beiden Teams tauschen ihre Positionen aus<br>Das Spiel wird bald fortgesetzt"
      },
      "Penalty shootout<br>The kicker is heading to the penalty spot": {
        fr: "S\xe9ance de tirs au but<br>Le tireur se dirige vers le point de p\xe9nalty",
        zh: "\u4e92\u5c04\u5341\u4e8c\u7801<br>\u4e3b\u7f5a\u8005\u6b63\u8d70\u5411\u70b9\u7403\u70b9",
        es: "Tanda de penales<br>El jugador se prepara",
        de: "Elfmeterschie\xdfen<br>Der Sch\xfctze bereitet sich vor"
      },
      Referee: {
        fr: "Arbitre",
        zh: "\u88c1\u5224",
        es: "\xc1rbitro",
        de: "Schiedsrichter"
      },
      coach: {
        fr: "entraineur",
        zh: "\u6559\u7ec3",
        es: "Entrenador",
        de: "Trainer"
      },
      started: {
        fr: "titulaires",
        zh: "\u9996\u53d1\u7403\u5458",
        es: "alineaci\xf3n inicial",
        de: "aufstellung"
      },
      substitutes: {
        fr: "rempla\xe7ants",
        zh: "\u66ff\u8865",
        es: "sustitutos",
        de: "ersatz"
      },
      "own goal !": {
        fr: "but csc !",
        zh: "\u4e4c\u9f99\u7403",
        es: "autogol !",
        de: "eigentor !"
      },
      "goal !": {
        fr: "but !",
        zh: "\u8fdb\u7403",
        es: "gol !!!",
        de: "tor !"
      },
      "yellow card": {
        fr: "carton jaune",
        zh: "\u9ec4\u724c",
        es: "tarjeta amarilla",
        de: "gelbe karte"
      },
      "red card": {
        fr: "carton rouge",
        zh: "\u7ea2\u724c",
        es: "tarjeta roja",
        de: "rote karte"
      },
      substitution: {
        fr: "remplacement",
        zh: "\u66ff\u8865",
        es: "sustituci\xf3n",
        de: "auswechslung"
      },
      injury: {
        fr: "blessure",
        zh: "\u53d7\u4f24",
        es: "lesi\xf3n",
        de: "verletzung"
      },
      "injury return": {
        fr: "retour de blessure",
        zh: "\u53d7\u4f24\u5f52\u6765",
        es: "regreso al campo",
        de: "verletzung zur\xfcck"
      },
      "shot on target": {
        fr: "tir cadr\xe9",
        zh: "\u5c04\u6b63",
        es: "tiro a meta",
        de: "torschuss"
      },
      "shot off target": {
        fr: "tir non cadr\xe9",
        zh: "\u5c04\u504f",
        es: "tiro fuera de meta",
        de: "fehlschuss"
      },
      "shot saved": {
        fr: "tir arr\xeat\xe9",
        zh: "\u5c04\u95e8\u88ab\u6251\u4f4f",
        es: "tiro tapado",
        de: "schuss abgewehrt"
      },
      offside: {
        fr: "hors-jeu",
        zh: "\u8d8a\u4f4d",
        es: "fuera de juego",
        de: "abseits"
      },
      penalty: {
        fr: "penalty",
        zh: "\u70b9\u7403",
        es: "penal",
        de: "elfmeter"
      },
      "penalty missed": {
        fr: "penalty rat\xe9",
        zh: "\u70b9\u7403\u5c04\u5931",
        es: "penal fallado",
        de: "elfmeter verschossen"
      },
      "goal kick": {
        fr: "sortie de but",
        zh: "\u7403\u95e8\u7403",
        es: "saque de puerta",
        de: "abstoss"
      },
      "corner kick": {
        fr: "corner",
        zh: "\u89d2\u7403",
        es: "saque de esquina",
        de: "ecksto\xdf"
      },
      "free kick": {
        fr: "coup franc",
        zh: "\u4efb\u610f\u7403",
        es: "tiro libre",
        de: "freisto\xdf"
      },
      "throw in": {
        fr: "touche",
        zh: "\u754c\u5916\u7403",
        es: "saque",
        de: "einwurf"
      },
      "match started": {
        fr: "d\xe9but du match",
        zh: "\u6bd4\u8d5b\u5df2\u5f00\u59cb",
        es: "partido comenz\xf3",
        de: "spiel begonnen"
      },
      "match ended": {
        fr: "fin du match",
        zh: "\u6bd4\u8d5b\u5df2\u7ed3\u675f",
        es: "el partido termin\xf3",
        de: "Spiel beendet"
      },
      "period start": {
        fr: "d\xe9but de p\xe9riode",
        zh: "\u534a\u573a\u5f00\u59cb",
        es: "per\xedodo de inicio",
        de: "beginn halbzeit"
      },
      "break start": {
        fr: "fin de p\xe9riode",
        zh: "\u6682\u505c\u5f00\u59cb",
        es: "inicio del descanso",
        de: "beginn halbzeitpause"
      },
      "gk interception": {
        fr: "interception goal",
        zh: "\u95e8\u5c06\u62e6\u622a\u4f20\u4e2d",
        es: "intercepci\xf3n portero",
        de: "ball gefangen"
      },
      "goal ?": {
        fr: " but ?",
        zh: "\u8fdb\u7403\u6709\u6548\uff1f",
        de: "tor ?",
        es: "gol ? "
      },
      "goal cancelled !": {
        fr: "but annul\xe9 !",
        zh: "\u53d6\u6d88\u8fdb\u7403\uff01",
        de: "Tor revidiert !",
        es: "gol anulado !"
      },
      "goal confirmed !": {
        fr: "but valid\xe9 !",
        zh: "\u8fdb\u7403\u6709\u6548\uff01",
        de: "Tor gegeben !",
        es: " gol confirmado !"
      },
      "penalty ?": {
        fr: "penalty ?",
        zh: "\u662f\u70b9\u7403\u5417\uff1f",
        de: "Elfmeter ?",
        es: "penal ?"
      },
      "penalty cancelled !": {
        fr: "penalty annul\xe9 !",
        zh: "\u53d6\u6d88\u70b9\u7403\uff01",
        de: "Elfmeter revidiert ! ",
        es: "penal anulado !"
      },
      "penalty confirmed !": {
        fr: "penalty valid\xe9 !",
        zh: " \u786e\u8ba4\u5224\u7f5a\u70b9\u7403\uff01",
        de: " Elfmeter best\xe4tigt !",
        es: "penal confirmado !"
      },
      "card ?": {
        fr: "carton ?",
        zh: "\u8981\u51fa\u724c\u5417\uff1f",
        de: "Karte ?",
        es: "tarjeta ?"
      },
      "card cancelled !": {
        fr: "carton annul\xe9 !",
        zh: "\u7f5a\u724c\u53d6\u6d88\uff01",
        de: "Karte revidiert !",
        es: "tarjeta anulada !"
      },
      "card confirmed !": {
        fr: "carton valid\xe9 !",
        zh: "\u786e\u8ba4\u7f5a\u724c\uff01",
        de: "Karte best\xe4tigt !",
        es: "tarjeta confirmada !"
      },
      "video assistance": {
        fr: "assistance vid\xe9o",
        zh: "\u89c6\u9891\u52a9\u7406\u88c1\u5224",
        de: " video assistent",
        es: "asistente de v\xeddeo"
      }
    }, e.translate = function (n, l) {
      if ("en" === l) return n;
      if ("The match will start in<br>" === n.slice(0, 27)) {
        var t = n.slice(27);
        "fr" === l ? n = "Le match commencera dans<br>" + t : "zh" === l ? n = "\u6bd4\u8d5b\u5c06\u5728" + t + "\u540e\u5f00\u59cb" : "es" === l ? n = "El partido comenzar\xe1 en<br>" + t : "de" === l && (n = "Das Spiel beginnt in<br>" + t)
      }
      return n in e.translationTable && l in e.translationTable[n] && (n = e.translationTable[n][l]), n
    }
  },
  MBVx: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("D4Le");
    e.ObjectBindings = function () {
      function n() {
        this.bindings = new Set
      }
      return n.setToHashable = function (n) {
        var e = Array.from(n).sort();
        return JSON.stringify({
          start: e[0],
          end: e[1]
        })
      }, n.prototype.addPair = function (e) {
        var l = n.setToHashable(e);
        this.bindings.has(l) ? this.bindings.delete(l) : this.bindings.add(l), this.bindings = new Set(Array.from(this.bindings))
      }, n.prototype.toggleLine = function (e, l) {
        for (var o = t.sortByArray(e, l, function (n) {
            return n.player_role.name
          }).map(function (n) {
            return n.trackable_object
          }), i = t.zip([o.slice(0, o.length - 1), o.slice(1)]).map(n.setToHashable), u = !0, a = 0, r = i; a < r.length; a++) this.bindings.has(r[a]) || (u = !1);
        if (u)
          for (var s = 0, c = i; s < c.length; s++) this.bindings.delete(c[s]);
        else
          for (var d = 0, p = i; d < p.length; d++) this.bindings.add(p[d]);
        this.bindings = new Set(Array.from(this.bindings))
      }, n.prototype.clearBindings = function () {
        this.bindings.clear(), this.bindings = new Set(Array.from(this.bindings))
      }, n
    }()
  },
  Mo2G: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.User = function () {
      function n(n) {
        var e = n.email;
        this.id = n.id, this.email = e
      }
      return n.prototype.clone = function () {
        return new n({
          id: this.id,
          email: this.email
        })
      }, n
    }()
  },
  NU7y: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("bfOx"), l("Z/zE"), l("BAgd"), l("PakY"), e.AppComponent = function () {
      function n(n, e, l, t) {
        var o = this;
        this.notificationService = n, this.loggingService = e, this.route = l, this.title = "SkillCorner", this.areLogsVisible = !1, this.isDebug = !1, this.route.queryParams.subscribe(function (n) {
          o.isDebug = 1 == +n.debug
        })
      }
      return n.prototype.ngOnInit = function () {
        this.notifications = this.notificationService.getNotifications()
      }, n.prototype.showLogs = function () {
        this.areLogsVisible = !0
      }, n.prototype.hideLogs = function () {
        this.areLogsVisible = !1
      }, n.prototype.getLogs = function () {
        return this.loggingService.getLogs()
      }, n.prototype.removeLog = function (n) {
        if (-1 == n) return this.loggingService.removeAll();
        this.loggingService.removeLog(n)
      }, n.prototype.dismissNotificationFactory = function (n) {
        var e = this;
        return function () {
          void 0 != e.notifications[n] && e.notificationService.removeNotification(e.notifications[n].key)
        }
      }, n
    }()
  },
  PSbe: function (n, e, l) {
    "use strict";
    var t = l("puWn"),
      o = l("WT6e"),
      i = l("7DMc"),
      u = l("Xjw4"),
      a = l("chaR"),
      r = l("vUAE"),
      s = l("ItHS"),
      c = l("VveI"),
      d = l("j+m6"),
      p = l("BAgd"),
      m = l("ikkQ"),
      f = l("XVEw"),
      h = o.\u0275crt({
        encapsulation: 0,
        styles: [t.styles],
        data: {}
      });

    function g(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), o.\u0275did(1, 147456, null, 0, i.NgSelectOption, [o.ElementRef, o.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), o.\u0275did(2, 147456, null, 0, i.\u0275q, [o.ElementRef, o.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), o.\u0275ted(3, null, ["", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.name), n(e, 2, 0, e.context.$implicit.name)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function v(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 16, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(2, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(3, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(5, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(6, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(8, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(9, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(11, 0, null, null, 4, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n                "])), (n()(), o.\u0275eld(13, 0, null, null, 1, "a", [
        ["class", "skc-link-danger"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.deleteTeamPlayer(n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["Remove from team"])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275ted(-1, null, ["\n            "]))], null, function (n, e) {
        n(e, 3, 0, e.context.$implicit.last_name), n(e, 6, 0, e.context.$implicit.first_name), n(e, 9, 0, e.context.$implicit.birthday)
      })
    }

    function y(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "li", [], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.setExistingPlayer(n.context.$implicit) && t), t
      }, null, null)), (n()(), o.\u0275ted(1, null, ["\n                ", " \xa0 ", "\n              "]))], null, function (n, e) {
        n(e, 1, 0, e.component.formatPlayerName(e.context.$implicit), e.context.$implicit.birthday)
      })
    }

    function b(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 7, "div", [
        ["class", "alert alert-danger"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(2, 0, null, null, 4, "button", [
        ["aria-label", "Close"],
        ["class", "close"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.validationErrors = "") && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(4, 0, null, null, 1, "span", [
        ["aria-hidden", "true"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\xd7"])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(7, null, ["\n        ", "\n      "]))], null, function (n, e) {
        n(e, 7, 0, e.component.validationErrors)
      })
    }

    function C(n) {
      return o.\u0275vid(0, [o.\u0275qud(402653184, 1, {
        playerSearchInput: 0
      }), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(2, 0, null, null, 124, "div", [
        ["class", "container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(4, 0, null, null, 0, "br", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(6, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        Note the 'remove from team' button works only if the player has not taken part in any match with the team.\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(9, 0, null, null, 18, "div", [
        ["class", "form-group"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(11, 0, null, null, 15, "label", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Team:\n          "])), (n()(), o.\u0275eld(13, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["list", "teams"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          i = n.component;
        return "input" === e && (t = !1 !== o.\u0275nov(n, 14)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== o.\u0275nov(n, 14).onTouched() && t), "compositionstart" === e && (t = !1 !== o.\u0275nov(n, 14)._compositionStart() && t), "compositionend" === e && (t = !1 !== o.\u0275nov(n, 14)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (i.teamName = l) && t), "input" === e && (t = !1 !== i.onTeamSelected() && t), t
      }, null, null)), o.\u0275did(14, 16384, null, 0, i.DefaultValueAccessor, [o.Renderer2, o.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), o.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), o.\u0275did(16, 671744, null, 0, i.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), o.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), o.\u0275did(18, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(20, 0, null, null, 5, "datalist", [
        ["id", "teams"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275and(16777216, null, null, 2, null, g)), o.\u0275did(23, 802816, null, 0, u.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), o.\u0275pid(131072, u.AsyncPipe, [o.ChangeDetectorRef]), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(29, 0, null, null, 5, "div", [], [
        [8, "hidden", 0]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(31, 0, null, null, 2, "admin-choose-coach", [], null, [
        [null, "teamChange"],
        [null, "coachChange"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "teamChange" === e && (t = !1 !== (o.team = l) && t), "coachChange" === e && (t = !1 !== (o.coach = l) && t), t
      }, a.View_ChooseCoachComponent_0, a.RenderType_ChooseCoachComponent)), o.\u0275prd(512, null, r.CoachesService, r.CoachesService, [s.HttpClient]), o.\u0275did(33, 573440, null, 0, c.ChooseCoachComponent, [r.CoachesService, d.TeamsService, p.NotificationService], {
        team: [0, "team"],
        coach: [1, "coach"]
      }, {
        coachChange: "coachChange"
      }), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(36, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(39, 0, null, null, 82, "div", [], [
        [8, "hidden", 0]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(41, 0, null, null, 79, "div", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275eld(43, 0, null, null, 20, "table", [
        ["style", "width: 80%; overflow: hidden"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(45, 0, null, null, 18, "tbody", [], null, null, null, null, null)), (n()(), o.\u0275eld(46, 0, null, null, 12, "tr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(48, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Last name"])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(51, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["First name"])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(54, 0, null, null, 1, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["Birthday"])), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275eld(57, 0, null, null, 0, "td", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275and(16777216, null, null, 2, null, v)), o.\u0275did(61, 802816, null, 0, u.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), o.\u0275pid(131072, u.AsyncPipe, [o.ChangeDetectorRef]), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n\n          "])), (n()(), o.\u0275eld(65, 0, null, null, 0, "hr", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n\n          Add existing player to team\n          "])), (n()(), o.\u0275eld(67, 0, null, null, 16, "div", [
        ["class", "input-autocomplete"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(70, 0, [
        [1, 0],
        ["playerSearchInput", 1]
      ], null, 5, "input", [
        ["list", "playerList"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0;
        return "input" === e && (t = !1 !== o.\u0275nov(n, 71)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== o.\u0275nov(n, 71).onTouched() && t), "compositionstart" === e && (t = !1 !== o.\u0275nov(n, 71)._compositionStart() && t), "compositionend" === e && (t = !1 !== o.\u0275nov(n, 71)._compositionEnd(l.target.value) && t), t
      }, null, null)), o.\u0275did(71, 16384, null, 0, i.DefaultValueAccessor, [o.Renderer2, o.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), o.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), o.\u0275did(73, 671744, null, 0, i.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, null), o.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), o.\u0275did(75, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(77, 0, null, null, 5, "ul", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              "])), (n()(), o.\u0275and(16777216, null, null, 2, null, y)), o.\u0275did(80, 802816, null, 0, u.NgForOf, [o.ViewContainerRef, o.TemplateRef, o.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), o.\u0275pid(131072, u.AsyncPipe, [o.ChangeDetectorRef]), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n\n          Or create a new player and add it to team\n          "])), (n()(), o.\u0275eld(85, 0, null, null, 34, "div", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(87, 0, null, null, 8, "label", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              First name:\n              "])), (n()(), o.\u0275eld(89, 0, null, null, 5, "input", [
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          i = n.component;
        return "input" === e && (t = !1 !== o.\u0275nov(n, 90)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== o.\u0275nov(n, 90).onTouched() && t), "compositionstart" === e && (t = !1 !== o.\u0275nov(n, 90)._compositionStart() && t), "compositionend" === e && (t = !1 !== o.\u0275nov(n, 90)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (i.newPlayer.first_name = l) && t), t
      }, null, null)), o.\u0275did(90, 16384, null, 0, i.DefaultValueAccessor, [o.Renderer2, o.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), o.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), o.\u0275did(92, 671744, null, 0, i.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), o.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), o.\u0275did(94, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n\n            "])), (n()(), o.\u0275eld(97, 0, null, null, 8, "label", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              Last name:\n              "])), (n()(), o.\u0275eld(99, 0, null, null, 5, "input", [
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          i = n.component;
        return "input" === e && (t = !1 !== o.\u0275nov(n, 100)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== o.\u0275nov(n, 100).onTouched() && t), "compositionstart" === e && (t = !1 !== o.\u0275nov(n, 100)._compositionStart() && t), "compositionend" === e && (t = !1 !== o.\u0275nov(n, 100)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (i.newPlayer.last_name = l) && t), t
      }, null, null)), o.\u0275did(100, 16384, null, 0, i.DefaultValueAccessor, [o.Renderer2, o.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), o.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), o.\u0275did(102, 671744, null, 0, i.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), o.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), o.\u0275did(104, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(107, 0, null, null, 8, "label", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n              Birthday:\n              "])), (n()(), o.\u0275eld(109, 0, null, null, 5, "input", [
        ["type", "date"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          i = n.component;
        return "input" === e && (t = !1 !== o.\u0275nov(n, 110)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== o.\u0275nov(n, 110).onTouched() && t), "compositionstart" === e && (t = !1 !== o.\u0275nov(n, 110)._compositionStart() && t), "compositionend" === e && (t = !1 !== o.\u0275nov(n, 110)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (i.newPlayer.birthday = l) && t), t
      }, null, null)), o.\u0275did(110, 16384, null, 0, i.DefaultValueAccessor, [o.Renderer2, o.ElementRef, [2, i.COMPOSITION_BUFFER_MODE]], null, null), o.\u0275prd(1024, null, i.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [i.DefaultValueAccessor]), o.\u0275did(112, 671744, null, 0, i.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, i.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), o.\u0275prd(2048, null, i.NgControl, null, [i.NgModel]), o.\u0275did(114, 16384, null, 0, i.NgControlStatus, [i.NgControl], null, null), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275ted(-1, null, ["\n            "])), (n()(), o.\u0275eld(117, 0, null, null, 1, "button", [
        ["class", "btn btn-success"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.addPlayer() && t), t
      }, null, null)), (n()(), o.\u0275ted(-1, null, ["Add player to team"])), (n()(), o.\u0275ted(-1, null, ["\n          "])), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275ted(-1, null, ["\n\n\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275and(16777216, null, null, 1, null, b)), o.\u0275did(125, 16384, null, 0, u.NgIf, [o.ViewContainerRef, o.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "]))], function (n, e) {
        var l = e.component;
        n(e, 16, 0, l.teamName), n(e, 23, 0, o.\u0275unv(e, 23, 0, o.\u0275nov(e, 24).transform(l.teamOptions$))), n(e, 33, 0, l.team, l.coach), n(e, 61, 0, o.\u0275unv(e, 61, 0, o.\u0275nov(e, 62).transform(l.players$))), n(e, 73, 0, l.formatPlayerName(l.existingPlayer)), n(e, 80, 0, o.\u0275unv(e, 80, 0, o.\u0275nov(e, 81).transform(l.playerOptions$))), n(e, 92, 0, l.newPlayer.first_name), n(e, 102, 0, l.newPlayer.last_name), n(e, 112, 0, l.newPlayer.birthday), n(e, 125, 0, l.validationErrors)
      }, function (n, e) {
        var l = e.component;
        n(e, 13, 0, o.\u0275nov(e, 18).ngClassUntouched, o.\u0275nov(e, 18).ngClassTouched, o.\u0275nov(e, 18).ngClassPristine, o.\u0275nov(e, 18).ngClassDirty, o.\u0275nov(e, 18).ngClassValid, o.\u0275nov(e, 18).ngClassInvalid, o.\u0275nov(e, 18).ngClassPending), n(e, 29, 0, !l.team), n(e, 39, 0, !l.team), n(e, 70, 0, o.\u0275nov(e, 75).ngClassUntouched, o.\u0275nov(e, 75).ngClassTouched, o.\u0275nov(e, 75).ngClassPristine, o.\u0275nov(e, 75).ngClassDirty, o.\u0275nov(e, 75).ngClassValid, o.\u0275nov(e, 75).ngClassInvalid, o.\u0275nov(e, 75).ngClassPending), n(e, 89, 0, o.\u0275nov(e, 94).ngClassUntouched, o.\u0275nov(e, 94).ngClassTouched, o.\u0275nov(e, 94).ngClassPristine, o.\u0275nov(e, 94).ngClassDirty, o.\u0275nov(e, 94).ngClassValid, o.\u0275nov(e, 94).ngClassInvalid, o.\u0275nov(e, 94).ngClassPending), n(e, 99, 0, o.\u0275nov(e, 104).ngClassUntouched, o.\u0275nov(e, 104).ngClassTouched, o.\u0275nov(e, 104).ngClassPristine, o.\u0275nov(e, 104).ngClassDirty, o.\u0275nov(e, 104).ngClassValid, o.\u0275nov(e, 104).ngClassInvalid, o.\u0275nov(e, 104).ngClassPending), n(e, 109, 0, o.\u0275nov(e, 114).ngClassUntouched, o.\u0275nov(e, 114).ngClassTouched, o.\u0275nov(e, 114).ngClassPristine, o.\u0275nov(e, 114).ngClassDirty, o.\u0275nov(e, 114).ngClassValid, o.\u0275nov(e, 114).ngClassInvalid, o.\u0275nov(e, 114).ngClassPending)
      })
    }

    function _(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 3, "admin-add-team-player", [], null, null, null, C, h)), o.\u0275prd(512, null, d.TeamsService, d.TeamsService, [s.HttpClient]), o.\u0275prd(512, null, m.PlayersService, m.PlayersService, [s.HttpClient]), o.\u0275did(3, 114688, null, 0, f.AdminAddTeamPlayer, [d.TeamsService, m.PlayersService, p.NotificationService], null, null)], function (n, e) {
        n(e, 3, 0)
      }, null)
    }
    e.RenderType_AdminAddTeamPlayer = h, e.View_AdminAddTeamPlayer_0 = C, e.View_AdminAddTeamPlayer_Host_0 = _, e.AdminAddTeamPlayerNgFactory = o.\u0275ccf("admin-add-team-player", f.AdminAddTeamPlayer, _, {}, {}, [])
  },
  PakY: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("bfOx"), e.LoggingService = function () {
      function n(n) {
        var e = this;
        this.route = n, this.isDebug = !1, this.lastIndex = 0, this.logMessages = [], this.route.queryParams.subscribe(function (n) {
          e.isDebug = 1 == +n.debug
        }), this.logMessages = []
      }
      return n.prototype.addLog = function (n, e, l) {
        var t = this;
        void 0 === e && (e = "info"), void 0 === l && (l = null);
        var o = this.lastIndex++;
        this.logMessages.push({
          key: o,
          message: n,
          level: e,
          ttl: l
        }), l > 0 && setTimeout(function () {
          return t.removeLog(o)
        })
      }, n.prototype.log = function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        console.log.apply(null, n);
        var l = new Date;
        if (n.unshift("[" + l.toTimeString().split(" ")[0] + "] -- "), this.isDebug) {
          var t = n.reduce(function (n, e) {
            return n + JSON.stringify(e)
          }, "");
          this.addLog(t, "log")
        }
      }, n.prototype.info = function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        console.info.apply(null, n);
        var l = new Date;
        if (n.unshift("[" + l.toTimeString().split(" ")[0] + "] -- "), this.isDebug) {
          var t = n.reduce(function (n, e) {
            return n + JSON.stringify(e)
          });
          this.addLog(t, "info")
        }
      }, n.prototype.warn = function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        console.warn.apply(null, n);
        var l = new Date;
        if (n.unshift("[" + l.toTimeString().split(" ")[0] + "] -- "), this.isDebug) {
          var t = n.reduce(function (n, e) {
            return n + JSON.stringify(e)
          }, "");
          this.addLog(t, "warn")
        }
      }, n.prototype.error = function () {
        for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
        console.error.apply(null, n);
        var l = new Date;
        if (n.unshift("[" + l.toTimeString().split(" ")[0] + "] -- "), this.isDebug) {
          var t = n.reduce(function (n, e) {
            return n + JSON.stringify(e)
          }, "");
          this.addLog(t, "error")
        }
      }, n.prototype.getLogs = function () {
        return this.logMessages
      }, n.prototype.removeLog = function (n) {
        for (var e = 0, l = 0, t = this.logMessages; l < t.length; l++) {
          if (t[l].key == n) {
            this.logMessages.splice(e, 1);
            break
          }++e
        }
      }, n.prototype.removeAll = function () {
        this.logMessages.splice(0, this.lastIndex), this.lastIndex = 0
      }, n
    }()
  },
  Prjq: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("7DMc"),
      i = l("Xjw4"),
      u = l("Rd49"),
      a = l("ItHS"),
      r = l("dTtl"),
      s = t.\u0275crt({
        encapsulation: 0,
        styles: [""],
        data: {}
      });

    function c(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], {
        ngValue: [0, "ngValue"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        ngValue: [0, "ngValue"]
      }, null), (n()(), t.\u0275ted(3, null, [" ", ""]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit), n(e, 2, 0, e.context.$implicit)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name)
      })
    }

    function d(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [2, o.SelectControlValueAccessor]], {
        value: [0, "value"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), t.\u0275ted(3, null, ["", " | ", "\n          "]))], function (n, e) {
        n(e, 1, 0, e.context.$implicit.id), n(e, 2, 0, e.context.$implicit.id)
      }, function (n, e) {
        n(e, 3, 0, e.context.$implicit.name, e.context.$implicit.round_number)
      })
    }

    function p(n) {
      return t.\u0275vid(0, [t.\u0275qud(671088640, 1, {
        controls: 1
      }), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(2, 0, null, null, 21, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(4, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "competition-edition"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Competition"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(7, 0, null, null, 15, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(9, 0, null, null, 12, "select", [
        ["class", "form-control"],
        ["name", "competition-edition"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 10).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 10).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.competitionEdition = l) && o), "ngModelChange" === e && (o = !1 !== i.onCompetitionEditionChange(l) && o), o
      }, null, null)), t.\u0275did(10, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], {
        compareWith: [0, "compareWith"]
      }, null), t.\u0275did(11, 16384, null, 0, o.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, o.NG_VALIDATORS, function (n) {
        return [n]
      }, [o.RequiredValidator]), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(14, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [2, o.NG_VALIDATORS],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(16, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, c)), t.\u0275did(19, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(25, 0, null, null, 21, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(27, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "competition-round"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Competition Round"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(30, 0, null, null, 15, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(32, 0, null, null, 12, "select", [
        ["class", "form-control"],
        ["name", "competition-round"],
        ["required", ""]
      ], [
        [1, "required", 0],
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "change"],
        [null, "blur"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "change" === e && (o = !1 !== t.\u0275nov(n, 33).onChange(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 33).onTouched() && o), "ngModelChange" === e && (o = !1 !== (i.competitionRoundId = l) && o), "ngModelChange" === e && (o = !1 !== i.onCompetitionRoundIdChange(l) && o), o
      }, null, null)), t.\u0275did(33, 16384, null, 0, o.SelectControlValueAccessor, [t.Renderer2, t.ElementRef], null, null), t.\u0275did(34, 16384, null, 0, o.RequiredValidator, [], {
        required: [0, "required"]
      }, null), t.\u0275prd(1024, null, o.NG_VALIDATORS, function (n) {
        return [n]
      }, [o.RequiredValidator]), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.SelectControlValueAccessor]), t.\u0275did(37, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [2, o.NG_VALIDATORS],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(39, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, d)), t.\u0275did(42, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "]))], function (n, e) {
        var l = e.component;
        n(e, 10, 0, l.compareOnId), n(e, 11, 0, ""), n(e, 14, 0, "competition-edition", l.competitionEdition), n(e, 19, 0, t.\u0275unv(e, 19, 0, t.\u0275nov(e, 20).transform(l.competitionEditionOptions$))), n(e, 34, 0, ""), n(e, 37, 0, "competition-round", l.competitionRoundId), n(e, 42, 0, t.\u0275unv(e, 42, 0, t.\u0275nov(e, 43).transform(l.competitionRoundOptions$)))
      }, function (n, e) {
        n(e, 9, 0, t.\u0275nov(e, 11).required ? "" : null, t.\u0275nov(e, 16).ngClassUntouched, t.\u0275nov(e, 16).ngClassTouched, t.\u0275nov(e, 16).ngClassPristine, t.\u0275nov(e, 16).ngClassDirty, t.\u0275nov(e, 16).ngClassValid, t.\u0275nov(e, 16).ngClassInvalid, t.\u0275nov(e, 16).ngClassPending), n(e, 32, 0, t.\u0275nov(e, 34).required ? "" : null, t.\u0275nov(e, 39).ngClassUntouched, t.\u0275nov(e, 39).ngClassTouched, t.\u0275nov(e, 39).ngClassPristine, t.\u0275nov(e, 39).ngClassDirty, t.\u0275nov(e, 39).ngClassValid, t.\u0275nov(e, 39).ngClassInvalid, t.\u0275nov(e, 39).ngClassPending)
      })
    }

    function m(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 2, "admin-choose-competition", [], null, null, null, p, s)), t.\u0275prd(512, null, u.CompetitionEditionsService, u.CompetitionEditionsService, [a.HttpClient]), t.\u0275did(2, 4767744, null, 0, r.ChooseCompetitionComponent, [u.CompetitionEditionsService, o.NgForm], null, null)], null, null)
    }
    e.RenderType_ChooseCompetitionComponent = s, e.View_ChooseCompetitionComponent_0 = p, e.View_ChooseCompetitionComponent_Host_0 = m, e.ChooseCompetitionComponentNgFactory = t.\u0275ccf("admin-choose-competition", r.ChooseCompetitionComponent, m, {
      competitionEdition: "competitionEdition",
      competitionRoundId: "competitionRoundId"
    }, {
      competitionEditionChange: "competitionEditionChange",
      competitionRoundIdChange: "competitionRoundIdChange"
    }, [])
  },
  R5tW: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.PendingChangesGuard = function () {
      function n() {}
      return n.prototype.canDeactivate = function (n) {
        return !!n.canDeactivate() || confirm("WARNING: You have unsaved changes. Press Cancel to go back and save these changes, or OK to lose these changes.")
      }, n
    }()
  },
  Rd49: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR");
    var o = l("D4Le");
    e.CompetitionEditionsService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getObjects = function () {
        return this.httpClient.get("/api/competition_editions/").map(function (n) {
          var e = n.objects.sort(function (n, e) {
            return n.season.name === e.season.name ? n.name > e.name ? 1 : -1 : n.season.name < e.season.name ? 1 : -1
          });
          return e.forEach(function (n) {
            n.competition.rounds = o.sortDictByKey(n.competition.rounds, "round_number")
          }), e
        }).catch(function (n) {
          return console.log("getCompetitionEditions", n), t.Observable.throw(n)
        })
      }, n
    }()
  },
  SLR8: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = function () {
      function n(n) {
        this.prefix = n
      }
      return n.prototype.getUrl = function (n) {
        return this.prefix + "/" + n
      }, n.prototype.getStoredItem = function (n) {
        var e;
        try {
          e = localStorage.getItem(n)
        } catch (n) {}
        if (e) return e
      }, n.prototype.storeItem = function (n, e) {
        try {
          localStorage.setItem(n, e)
        } catch (n) {}
      }, n
    }();
    e.ImageStore = t;
    var o, i = function () {
      function n(n) {
        this.prefix = n
      }
      return n.prototype.getUrl = function (n) {
        return this.prefix + "/" + n
      }, n
    }();
    e.VideoStore = i;
    try {
      o = applicationConfig
    } catch (n) {
      o = {
        STATIC_IMAGE_FOLDER: "assets/images",
        STATIC_VIDEO_FOLDER: "assets/videos"
      }
    }
    e.images = new t(o.STATIC_IMAGE_FOLDER), e.videos = new i(o.STATIC_VIDEO_FOLDER)
  },
  SsVf: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("Mo2G"),
      o = (l("bfOx"), l("YaPU"));
    l("TDKa"), l("2vRS");
    var i = l("/Hyb");
    e.SessionService = function () {
      function n(n) {
        this.httpClient = n, this.loginServiceUrl = "/api/sessions/", this._isLoggedIn = !1, this._loggedInUser = null, this._isAdmin = !1
      }
      return n.prototype.login = function (n, e) {
        var l = this,
          o = JSON.stringify({
            email: n,
            password: e
          });
        return new Promise(function (n, e) {
          l.httpClient.post(l.loginServiceUrl, o).subscribe(function (e) {
            l._isLoggedIn = !0;
            var o = e.id,
              u = e.email;
            l._loggedInUser = new t.User({
              id: o,
              email: u
            }), l._isAdmin = e.is_staff, i.setUserContext({
              id: o,
              email: u
            }), n()
          }, function (n) {
            l._isLoggedIn = !1, l._loggedInUser = null, l._isAdmin = !1, e()
          })
        })
      }, n.prototype.retrieveSession = function () {
        var n = this;
        return new Promise(function (e, l) {
          n.httpClient.get(n.loginServiceUrl).subscribe(function (o) {
            if (o.id || 0 == o.id) {
              n._isLoggedIn = !0;
              var u = o.id,
                a = o.email;
              n._loggedInUser = new t.User({
                id: u,
                email: a
              }), n._isAdmin = o.is_staff, i.setUserContext({
                id: u,
                email: a
              }), e()
            } else n._isLoggedIn = !1, n._loggedInUser = null, n._isAdmin = !1, l()
          })
        })
      }, n.prototype.logout = function () {
        var n = this;
        return new Promise(function (e, l) {
          n.httpClient.delete(n.loginServiceUrl).subscribe(function (l) {
            n._isLoggedIn = !1, n._loggedInUser = null, e()
          })
        })
      }, n.prototype.isLoggedIn = function () {
        return this._isLoggedIn
      }, n.prototype.isAdmin = function () {
        return this._isAdmin
      }, n.prototype.getLoggedInUser = function () {
        return this.isLoggedIn() ? this._loggedInUser.clone() : null
      }, n.prototype.setLoggedInUser = function (n) {
        n ? (this._isLoggedIn = !0, this._loggedInUser = n) : (this._isLoggedIn = !1, this._loggedInUser = null)
      }, n
    }(), e.AuthGuard = function () {
      function n(n, e) {
        this.sessionService = n, this.router = e
      }
      return n.prototype.canActivate = function (n, e) {
        return this.checkLogin(e.url)
      }, n.prototype.checkLogin = function (n) {
        var e = this;
        if (this.sessionService.isLoggedIn()) return o.Observable.from([!0]);
        var l = this.sessionService.retrieveSession().then(function () {
          return !0
        }, function () {
          return e.sessionService.redirectUrl = n, e.router.navigate(["/login"]), !1
        });
        return o.Observable.fromPromise(l).first()
      }, n
    }(), e.AdminAuthGuard = function () {
      function n(n, e) {
        this.sessionService = n, this.router = e
      }
      return n.prototype.canActivate = function (n, e) {
        return this.checkLoginAndAdmin(e.url)
      }, n.prototype.checkLoginAndAdmin = function (n) {
        var e = this;
        if (this.sessionService.isLoggedIn() && this.sessionService.isAdmin()) return o.Observable.from([!0]);
        var l = this.sessionService.retrieveSession().then(function () {
          return !!e.sessionService.isAdmin() || (e.router.navigate(["/home"]), !1)
        }, function () {
          return e.sessionService.redirectUrl = n, e.router.navigate(["/login"]), !1
        });
        return o.Observable.fromPromise(l).first()
      }, n
    }()
  },
  T6ZN: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR"), e.StadiumsService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getStadiums = function () {
        return console.log("getting stadiums"), this.httpClient.get("/api/stadiums?limit=100000").map(function (n) {
          return n.results
        })
      }, n.prototype.createStadium = function (n) {
        return this.httpClient.post("/api/stadiums/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n
    }()
  },
  T7wj: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("SLR8"),
      o = l("LfZH"),
      i = l("PJh5"),
      u = l("xNPZ");
    l("jDyY"), l("D692"), e.MatchInformationComponent = function () {
      return function (n, e) {
        var l = this;
        this.display = n, this.matchService = e, this.translate = o.translate, this.imageURLGetter = t.images, this.matchService.whenMatchInfoReady().subscribe(function (n) {
          l.competitionEdition = l.matchService.composition.competition_edition.competition.name, l.competitionRound = l.matchService.composition.competition_round.name, l.homeTeamName = l.matchService.composition.home_team.short_name, l.awayTeamName = l.matchService.composition.away_team.short_name, l.matchDateTime = i.tz(l.matchService.composition.date_time, u.tz.guess()).format("YYYY-MM-DD HH:mm"), l.stadiumName = l.matchService.composition.stadium.name
        })
      }
    }()
  },
  TTk8: function (n, e, l) {
    "use strict";
    var t = l("EWKk"),
      o = l("WT6e"),
      i = l("Xjw4"),
      u = l("8edL"),
      a = l("D692"),
      r = l("joif"),
      s = l("jDyY"),
      c = o.\u0275crt({
        encapsulation: 0,
        styles: [t.styles],
        data: {}
      });

    function d(n) {
      return o.\u0275vid(0, [o.\u0275pid(0, i.DecimalPipe, [o.LOCALE_ID]), (n()(), o.\u0275eld(1, 0, null, null, 59, "div", [
        ["class", "regular-text scoreboard_relative_container"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275eld(3, 0, null, null, 1, "div", [
        ["class", "minimap-menu-btn"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.notifyClick(l) && t), t
      }, null, null)), (n()(), o.\u0275eld(4, 0, null, null, 0, "img", [
        ["alt", "Trigger the menu"],
        ["src", ""]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275eld(6, 0, null, null, 15, "div", [
        ["class", "timer"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(8, 0, null, null, 2, "div", [
        ["class", "digits"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(9, null, ["\n      ", "\n    "])), o.\u0275ppd(10, 2), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(12, 0, null, null, 4, "div", [
        ["class", "separator"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(14, 0, null, null, 1, "b", [], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, [":"])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275eld(18, 0, null, null, 2, "div", [
        ["class", "digits"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(19, null, ["\n      ", "\n    "])), o.\u0275ppd(20, 2), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n\n  "])), (n()(), o.\u0275eld(23, 0, null, null, 36, "div", [
        ["class", "score"]
      ], null, null, null, null, null)), o.\u0275did(24, 278528, null, 0, i.NgClass, [o.IterableDiffers, o.KeyValueDiffers, o.ElementRef, o.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), o.\u0275pod(25, {
        "large-teams": 0
      }), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(27, 0, null, null, 9, "div", [
        ["class", "team"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(29, 0, null, null, 3, "div", [
        ["class", "float-left jersey"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(31, 0, null, null, 0, "img", [
        ["alt", ""],
        ["id", "home-jersey"],
        ["src", ""]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(34, 0, null, null, 1, "p", [
        ["class", "float-left"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(35, null, [" ", ""])), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(38, 0, null, null, 2, "div", [
        ["class", "digits"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(39, null, ["\n      ", "\n    "])), o.\u0275ppd(40, 2), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(42, 0, null, null, 1, "div", [
        ["class", "separator"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n    "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(45, 0, null, null, 2, "div", [
        ["class", "digits"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), (n()(), o.\u0275ted(46, null, ["\n      ", "\n    "])), o.\u0275ppd(47, 2), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275eld(49, 0, null, null, 9, "div", [
        ["class", "team"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n\n      "])), (n()(), o.\u0275eld(51, 0, null, null, 1, "p", [
        ["class", "float-right"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(52, null, ["", ""])), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275eld(54, 0, null, null, 3, "div", [
        ["class", "float-right jersey"]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n        "])), (n()(), o.\u0275eld(56, 0, null, null, 0, "img", [
        ["alt", ""],
        ["id", "away-jersey"],
        ["src", ""]
      ], null, null, null, null, null)), (n()(), o.\u0275ted(-1, null, ["\n      "])), (n()(), o.\u0275ted(-1, null, ["\n\n    "])), (n()(), o.\u0275ted(-1, null, ["\n  "])), (n()(), o.\u0275ted(-1, null, ["\n"])), (n()(), o.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 24, 0, "score", n(e, 25, 0, "zh" == e.component.display.lang))
      }, function (n, e) {
        var l = e.component;
        n(e, 6, 0, !(l.eventService.timer.m || l.eventService.timer.s) && 0 != l.eventService.timer.m && 0 != l.eventService.timer.s || l.display.hideScore), n(e, 9, 0, o.\u0275unv(e, 9, 0, n(e, 10, 0, o.\u0275nov(e, 0), l.eventService.timer.m, "2.0"))), n(e, 19, 0, o.\u0275unv(e, 19, 0, n(e, 20, 0, o.\u0275nov(e, 0), l.eventService.timer.s, "2.0"))), n(e, 35, 0, l.matchService.composition.home_team ? l.matchService.composition.home_team.acronym : ""), n(e, 38, 0, l.display.hideScore), n(e, 39, 0, o.\u0275unv(e, 39, 0, n(e, 40, 0, o.\u0275nov(e, 0), l.eventService.scoreBoard.home_score, "1.0"))), n(e, 45, 0, l.display.hideScore), n(e, 46, 0, o.\u0275unv(e, 46, 0, n(e, 47, 0, o.\u0275nov(e, 0), l.eventService.scoreBoard.away_score, "1.0"))), n(e, 52, 0, l.matchService.composition.away_team ? l.matchService.composition.away_team.acronym : "")
      })
    }

    function p(n) {
      return o.\u0275vid(0, [(n()(), o.\u0275eld(0, 0, null, null, 1, "scoreboard", [], null, null, null, d, c)), o.\u0275did(1, 4243456, null, 0, u.ScoreboardComponent, [a.MatchService, r.EventService, s.DisplayService], null, null)], null, null)
    }
    e.RenderType_ScoreboardComponent = c, e.View_ScoreboardComponent_0 = d, e.View_ScoreboardComponent_Host_0 = p, e.ScoreboardComponentNgFactory = o.\u0275ccf("scoreboard", u.ScoreboardComponent, p, {}, {}, [])
  },
  UEcf: function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
        for (var e, l = 1, t = arguments.length; l < t; l++)
          for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
        return n
      },
      o = l("TToO").__decorate,
      i = l("TToO").__metadata;
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var u = l("YaPU");

    function a(n) {
      return function (e, l, o) {
        var i, u = o.value;
        return o.value = function () {
          for (var e = [], l = 0; l < arguments.length; l++) e[l] = arguments[l];
          var o = u.apply(this, e);
          i = "INSTRUCTION" == n ? {
            data: [{
              data: o,
              type: n,
              frame: o.frame
            }],
            info: "data"
          } : {
            data: [{
              data: [t({}, o, {
                type: o.subject
              })],
              type: n,
              frame: o.frame
            }],
            info: "data"
          }, this.toSocket(i)
        }, o
      }
    }
    l("bAW0"), l("owTz"), l("XeQn"), e.FrameStream = function () {
      function n(n, e, l, t, o) {
        void 0 === l && (l = 1e4), void 0 === t && (t = "ws://localhost:8080"), void 0 === o && (o = 10);
        var i = this;
        this.token = n, this.console = e, this.frameOffset = l, this.wsUrl = t, this.fps = o, this.currentPeriod = 1, this.speedFactor = 1, this.streamType = "NOOP", this.i = 0, this.speedOffset = 0, this.ws = new WebSocket(t), this.ws.onopen = function (n) {
          i.initStream()
        }
      }
      return n.prototype.setStreamTo = function (n) {
        this.i = 0, this.streamType = n
      }, n.prototype.constructNoop = function (n) {
        return {
          frame: n,
          type: "NOOP",
          data: []
        }
      }, n.prototype.changeSpeedFactor = function (n) {
        n != this.speedFactor && (this.speedOffset = (this.speedFactor - n) * this.i + this.speedOffset, this.speedFactor = n)
      }, n.prototype.constructActionFrame = function (n) {
        this.speedFactor * this.i + this.speedOffset > 575 && (this.i = 0, this.speedOffset = 0);
        var e, l = 0,
          t = [{
            x: this.speedFactor * Math.pow(++this.i, 2) + this.speedOffset,
            y: Math.floor(200.365),
            trackable_object: 55,
            group_name: "ball"
          }];
        return [2805, 638, 10084, 8886, 8748, 7845, 7838, 1308, 238, 9533, 4359, 490, 9911, 7246, 2284, 7290, 9913, 9236, 11717, 7286, 9483, 1372, 6179, 10313, 1302, 11694, 466, 1547, 6300, 8297, 2296, 6296, 2819, 10118, 8216, 956, 2009, 3889, 5375, 3519, 6038, 768, 6886, 8487, 2551, 11323].slice(0, 1).forEach(function (n) {
          ++l, Math.random() > .5 && (e = {
            x: 0 * Math.floor(575 * Math.random()),
            y: 0 * Math.floor(400.73 * Math.random()),
            track_id: n,
            trackable_object: n,
            number: l,
            group_name: Math.random() < .5 ? "home team" : "away team"
          }, t.push(e))
        }), {
          frame: n,
          type: "FRAME",
          data: t
        }
      }, n.prototype.packageAction = function (n) {
        return {
          data: n,
          info: "data"
        }
      }, n.prototype.initStream = function () {
        var n = this,
          e = 0;
        u.Observable.interval(1e3 / this.fps).filter(function () {
          return n.canPlayStream
        }).map(function () {
          return ++e
        }).map(function (e) {
          return n.currentFrame = e + n.frameOffset, n.currentFrame
        }).map(function (e) {
          return "NOOP" == n.streamType ? n.constructNoop(e) : n.constructActionFrame(e)
        }).bufferCount(10).map(this.packageAction).subscribe(function (e) {
          return n.toSocket(e)
        })
      }, n.prototype.playStream = function () {
        this.canPlayStream = !0
      }, n.prototype.stopStream = function () {
        this.canPlayStream = !1
      }, n.prototype.toSocket = function (n) {
        n.token = this.token, this.ws.send(JSON.stringify(n))
      }, n.prototype.sendPeriodInstruction = function (n, e, l) {
        return void 0 === e && (e = "start"), void 0 === l && (l = this.currentFrame), this.currentPeriod = n, (t = {
          subject: "period",
          name: "period_" + n
        })[e] = l, t;
        var t
      }, n.prototype.sendSubstitutionInstruction = function (n, e, l) {
        return void 0 === l && (l = this.currentFrame), {
          subject: "substitution",
          player_in_id: n,
          player_out_id: e,
          frame: l
        }
      }, n.prototype.sendSubstitutionEvent = function (n, e, l) {
        return void 0 === l && (l = this.currentFrame), {
          subject: "substitution",
          player_in: {
            id: n
          },
          player_out: {
            id: e
          },
          frame: l,
          src_id: 2
        }
      }, n.prototype.sendCardInstruction = function (n, e, l) {
        return void 0 === l && (l = this.currentFrame), {
          subject: "card",
          player_id: n,
          card_type: e + "_card",
          frame: l,
          src_id: 1
        }
      }, n.prototype.sendCardEvent = function (n, e, l) {
        return void 0 === l && (l = this.currentFrame), {
          period: this.currentPeriod,
          player: {
            id: n
          },
          subject: e + "_card",
          frame: l,
          src_id: 1
        }
      }, o([a("INSTRUCTION"), i("design:type", Function), i("design:paramtypes", [Object, Object, Object]), i("design:returntype", void 0)], n.prototype, "sendPeriodInstruction", null), o([a("INSTRUCTION"), i("design:type", Function), i("design:paramtypes", [Object, Object, Object]), i("design:returntype", void 0)], n.prototype, "sendSubstitutionInstruction", null), o([a("CONTEXTUAL"), i("design:type", Function), i("design:paramtypes", [Object, Object, Object]), i("design:returntype", void 0)], n.prototype, "sendSubstitutionEvent", null), o([a("INSTRUCTION"), i("design:type", Function), i("design:paramtypes", [Object, Object, Object]), i("design:returntype", void 0)], n.prototype, "sendCardInstruction", null), o([a("CONTEXTUAL"), i("design:type", Function), i("design:paramtypes", [Object, Object, Object]), i("design:returntype", void 0)], n.prototype, "sendCardEvent", null), n
    }()
  },
  UuY2: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.PageNotFoundComponent = function () {}
  },
  VveI: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("WT6e"),
      o = (l("vUAE"), l("j+m6"), l("D4Le")),
      i = l("D4Le"),
      u = (l("BAgd"), l("e5zT")),
      a = (l("7DMc"), l("eXMp")),
      r = l("zvWE");
    e.ChooseCoachComponent = function () {
      function n(n, e, l) {
        this.coachesService = n, this.teamsService = e, this.notificationService = l, this.compareOnId = i.compareOnId, this.getName = r.getName, this.coachChange = new t.EventEmitter, this.newCoach = new a.Coach, this.getCoachesList()
      }
      return n.prototype.ngOnChanges = function () {
        this.coach && this.coach.last_name && this.coach.first_name ? this.coachName = r.getName(this.coach) : void 0 == this.coach && (this.coachName = void 0)
      }, n.prototype.onCoachSelected = function () {
        var n = this;
        this.coachOptions$.subscribe(function (e) {
          return n.coach = e.find(function (e) {
            return r.getName(e) == n.coachName
          })
        }), this.coachChange.emit(this.coach)
      }, n.prototype.getCoachesList = function () {
        this.coachOptions$ = new u.ReplaySubject, this.coachesService.getCoaches().subscribe(this.coachOptions$)
      }, n.prototype.addCoach = function () {
        var n = this;
        this.coachesService.addCoach(this.newCoach).subscribe(function (e) {
          n.getCoachesList(), n.coachOptions$.subscribe(function (l) {
            n.coach = l.find(function (n) {
              return n.id === e.id
            }), n.coachChange.next(n.coach), n.saveCoach()
          }), n.newCoach = new a.Coach
        }, function (e) {
          n.notificationService.addNotification({
            type: "error",
            message: "Could not add coach: " + o.formatJsonErrorAsList(e),
            ttl: 2e3
          })
        })
      }, n.prototype.saveCoach = function () {
        var n = this;
        console.log("team_id", this.team.id, "coach_id", this.coach.id), this.teamsService.patchTeam({
          id: this.team.id,
          coach_id: this.coach.id
        }).subscribe(function (e) {
          n.notificationService.addNotification({
            type: "success",
            message: "Successfully updated team coach."
          })
        })
      }, n.prototype.checkCoachIntegrity = function () {
        r.checkFormIntegrity(this.coach, this.coachName, this.notificationService, r.getName) || (this.coachName = "")
      }, n
    }()
  },
  W903: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("Xjw4"),
      i = l("jKnT"),
      u = t.\u0275crt({
        encapsulation: 0,
        styles: [".user-message[_ngcontent-%COMP%] {\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    margin: 0 0 0 0;\n    padding: 1% 0 1% 0;\n    top: 0;\n    position: fixed;\n    z-index: 10000000;\n    opacity: 1;\n    font-size: 5vmin;\n  }\n\n  .message-container[_ngcontent-%COMP%] {\n    text-align: justify;\n  }\n  \n  .close[_ngcontent-%COMP%] {\n    color: #FFF;\n    border: 2px solid #000;\n    font-size: 8vmin;\n    position: absolute;\n\n    right: 5%;\n    top: 5%;\n    opacity: 1;\n    z-index: 10001\n  }\n  .alert-error[_ngcontent-%COMP%] {\n    color: #721c24;\n    background-color: #f8d7da;\n    border-color: #f5c6cb;\n  }\n  \n  .alert-info[_ngcontent-%COMP%] {\n    background-color: rgba(91, 192, 222, 0.85);\n    color: white;\n    border-radius: 6px;\n  }"],
        data: {
          animation: [{
            type: 7,
            name: "created",
            definitions: [{
              type: 1,
              expr: ":enter",
              animation: [{
                type: 6,
                styles: {
                  height: 0
                },
                offset: null
              }, {
                type: 4,
                styles: void 0,
                timings: "100ms ease-in"
              }],
              options: null
            }, {
              type: 1,
              expr: "1 => 0",
              animation: [{
                type: 4,
                styles: {
                  type: 6,
                  styles: {
                    height: 0
                  },
                  offset: null
                },
                timings: "200ms ease-out"
              }],
              options: null
            }],
            options: {}
          }]
        }
      });

    function a(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 8, "div", [
        ["class", "user-message"]
      ], [
        [24, "@created", 0]
      ], null, null, null, null)), t.\u0275did(1, 278528, null, 0, o.NgClass, [t.IterableDiffers, t.KeyValueDiffers, t.ElementRef, t.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), t.\u0275pad(2, 5), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(4, 0, null, null, 0, "div", [
        ["class", "message-container"]
      ], [
        [8, "innerHTML", 1]
      ], null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(6, 0, null, null, 1, "a", [
        ["aria-label", "close"],
        ["class", "close"],
        ["data-dismiss", "alert"],
        ["title", "close"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.onCloseAnimate() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\xd7"])), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 1, 0, "user-message", n(e, 2, 0, "alert", "alert-" + e.component.notification.type, "fade in", "alert-dismissable", "user-message"))
      }, function (n, e) {
        var l = e.component;
        n(e, 0, 0, l.created), n(e, 4, 0, l.htmlCode)
      })
    }

    function r(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "user-message", [], null, null, null, a, u)), t.\u0275did(1, 114688, null, 0, i.UserMessageComponent, [], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_UserMessageComponent = u, e.View_UserMessageComponent_0 = a, e.View_UserMessageComponent_Host_0 = r, e.UserMessageComponentNgFactory = t.\u0275ccf("user-message", i.UserMessageComponent, r, {
      notification: "notification",
      onClose: "onClose"
    }, {}, [])
  },
  WXck: function (n, e, l) {
    "use strict";
    var t = l("sXaM"),
      o = l("ILnZ"),
      i = l("//3A"),
      u = l("WT6e"),
      a = l("8kGE"),
      r = l("l5LN"),
      s = l("PakY"),
      c = l("jDyY"),
      d = l("m4s2"),
      p = l("9NDR"),
      m = l("D692"),
      f = l("gQ8C"),
      h = l("T7wj"),
      g = l("GYfm"),
      v = l("mOI5"),
      y = l("OE0E"),
      b = l("Xjw4"),
      C = l("TTk8"),
      _ = l("8edL"),
      w = l("joif"),
      x = l("LMoW"),
      S = l("jxg3"),
      O = l("J8vI"),
      M = l("Aa5z"),
      P = l("sxR1"),
      E = l("gFWv"),
      R = u.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles, i.styles],
        data: {}
      });

    function k(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 1, "ima-ads", [], null, null, null, a.View_ImaAdsComponent_0, a.RenderType_ImaAdsComponent)), u.\u0275did(1, 4243456, null, 0, r.ImaAdsComponent, [s.LoggingService, c.DisplayService], null, null)], null, null)
    }

    function T(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 1, "compositions", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== u.\u0275nov(n, 1).resizeCanvas(l) && t), t
      }, d.View_CompositionComponent_0, d.RenderType_CompositionComponent)), u.\u0275did(1, 4243456, null, 0, p.CompositionComponent, [u.ElementRef, m.MatchService, c.DisplayService], null, null)], null, null)
    }

    function I(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 1, "match-info", [], null, null, null, f.View_MatchInformationComponent_0, f.RenderType_MatchInformationComponent)), u.\u0275did(1, 49152, null, 0, h.MatchInformationComponent, [c.DisplayService, m.MatchService], null, null)], null, null)
    }

    function N(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 1, "match-sheet", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== u.\u0275nov(n, 1).onResize(l) && t), t
      }, g.View_MatchSheetComponent_0, g.RenderType_MatchSheetComponent)), u.\u0275did(1, 4243456, null, 0, v.MatchSheetComponent, [y.DomSanitizer, c.DisplayService, m.MatchService], null, null)], null, null)
    }

    function A(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 19, "div", [
        ["class", "absolute-wrapper"]
      ], null, null, null, null, null)), (n()(), u.\u0275ted(-1, null, ["\n              "])), (n()(), u.\u0275eld(2, 0, null, null, 16, "div", [
        ["class", "compo-wrapper"]
      ], null, null, null, null, null)), (n()(), u.\u0275ted(-1, null, ["\n                "])), (n()(), u.\u0275eld(4, 0, null, null, 13, "div", [
        ["class", "compo-container"]
      ], [
        [2, "fullPerspective", null]
      ], null, null, null, null)), (n()(), u.\u0275ted(-1, null, ["\n                  "])), (n()(), u.\u0275eld(6, 0, null, null, 1, "div", [
        ["class", "close-x"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== (n.component.display.widgetToDisplay = null) && t), t
      }, null, null)), (n()(), u.\u0275ted(-1, null, ["X"])), (n()(), u.\u0275ted(-1, null, ["\n                  "])), (n()(), u.\u0275and(16777216, null, null, 1, null, T)), u.\u0275did(10, 16384, null, 0, b.NgIf, [u.ViewContainerRef, u.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), u.\u0275ted(-1, null, ["\n                  "])), (n()(), u.\u0275and(16777216, null, null, 1, null, I)), u.\u0275did(13, 16384, null, 0, b.NgIf, [u.ViewContainerRef, u.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), u.\u0275ted(-1, null, ["\n                  "])), (n()(), u.\u0275and(16777216, null, null, 1, null, N)), u.\u0275did(16, 16384, null, 0, b.NgIf, [u.ViewContainerRef, u.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), u.\u0275ted(-1, null, ["\n                "])), (n()(), u.\u0275ted(-1, null, ["\n              "])), (n()(), u.\u0275ted(-1, null, ["\n            "]))], function (n, e) {
        var l = e.component;
        n(e, 10, 0, "Lineup" == l.display.widgetToDisplay), n(e, 13, 0, "Match Information" == l.display.widgetToDisplay), n(e, 16, 0, "Match Sheet" == l.display.widgetToDisplay)
      }, function (n, e) {
        n(e, 4, 0, e.component.display.fullPerspective)
      })
    }

    function D(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275ted(-1, null, ["\n    "])), (n()(), u.\u0275eld(1, 0, null, null, 34, "div", [], [
        [4, "background-color", null]
      ], null, null, null, null)), (n()(), u.\u0275ted(-1, null, ["\n      "])), (n()(), u.\u0275eld(3, 0, null, null, 30, "div", [
        ["class", "canvas-wrap embeddable-container"]
      ], null, null, null, null, null)), (n()(), u.\u0275ted(-1, null, ["\n        "])), (n()(), u.\u0275eld(5, 0, null, null, 27, "div", [
        ["class", "full-width-canvas"]
      ], null, null, null, null, null)), u.\u0275did(6, 278528, null, 0, b.NgClass, [u.IterableDiffers, u.KeyValueDiffers, u.ElementRef, u.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), u.\u0275pod(7, {
        "full-width-canvas-full-perspective": 0
      }), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275and(16777216, null, null, 1, null, k)), u.\u0275did(10, 16384, null, 0, b.NgIf, [u.ViewContainerRef, u.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275eld(12, 0, null, null, 6, "div", [
        ["class", "scoreboard-positionner"]
      ], [
        [2, "hidden", null]
      ], null, null, null, null)), u.\u0275did(13, 278528, null, 0, b.NgClass, [u.IterableDiffers, u.KeyValueDiffers, u.ElementRef, u.Renderer2], {
        klass: [0, "klass"],
        ngClass: [1, "ngClass"]
      }, null), u.\u0275pod(14, {
        "scoreboard-positionner-full-perspective": 0
      }), (n()(), u.\u0275ted(-1, null, ["\n            "])), (n()(), u.\u0275eld(16, 0, null, null, 1, "scoreboard", [], null, null, null, C.View_ScoreboardComponent_0, C.RenderType_ScoreboardComponent)), u.\u0275did(17, 4243456, null, 0, _.ScoreboardComponent, [m.MatchService, w.EventService, c.DisplayService], null, null), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275eld(20, 0, null, null, 1, "minimap-menu", [], null, null, null, x.View_MinimapMenuComponent_0, x.RenderType_MinimapMenuComponent)), u.\u0275did(21, 4308992, null, 0, S.MinimapMenuComponent, [u.ElementRef, c.DisplayService, O.PositionService], null, null), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275eld(23, 0, null, null, 8, "div", [
        ["class", "minimap-positionner"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.display.menuButtonClicked$.next("close") && t), t
      }, null, null)), (n()(), u.\u0275ted(-1, null, ["\n            "])), (n()(), u.\u0275ted(-1, null, ["\n            "])), (n()(), u.\u0275and(16777216, null, null, 1, null, A)), u.\u0275did(27, 16384, null, 0, b.NgIf, [u.ViewContainerRef, u.TemplateRef], {
        ngIf: [0, "ngIf"]
      }, null), (n()(), u.\u0275ted(-1, null, ["\n            "])), (n()(), u.\u0275eld(29, 0, null, null, 1, "minimap-view", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== u.\u0275nov(n, 30).onResize(l) && t), t
      }, M.View_MinimapComponent_0, M.RenderType_MinimapComponent)), u.\u0275did(30, 4243456, null, 0, P.MinimapComponent, [u.ElementRef, m.MatchService, c.DisplayService, s.LoggingService, O.PositionService, w.EventService], null, null), (n()(), u.\u0275ted(-1, null, ["\n          "])), (n()(), u.\u0275ted(-1, null, ["\n        "])), (n()(), u.\u0275ted(-1, null, ["\n      "])), (n()(), u.\u0275ted(-1, null, ["\n      "])), (n()(), u.\u0275ted(-1, null, ["\n    "])), (n()(), u.\u0275ted(-1, null, ["\n\n  "]))], function (n, e) {
        var l = e.component;
        n(e, 6, 0, "full-width-canvas", n(e, 7, 0, l.display.fullPerspective)), n(e, 10, 0, l.display.adTagUrl), n(e, 13, 0, "scoreboard-positionner", n(e, 14, 0, l.display.fullPerspective)), n(e, 21, 0), n(e, 27, 0, l.display.widgetToDisplay)
      }, function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.display.isDebug ? "#D8D8D8" : "#000"), n(e, 12, 0, l.display.hideScoreBoard)
      })
    }

    function F(n) {
      return u.\u0275vid(0, [(n()(), u.\u0275eld(0, 0, null, null, 1, "embeddable-view", [], null, null, null, D, R)), u.\u0275did(1, 49152, null, 0, E.EmbeddableLiveComponent, [c.DisplayService], null, null)], null, null)
    }
    e.RenderType_EmbeddableLiveComponent = R, e.View_EmbeddableLiveComponent_0 = D, e.View_EmbeddableLiveComponent_Host_0 = F, e.EmbeddableLiveComponentNgFactory = u.\u0275ccf("embeddable-view", E.EmbeddableLiveComponent, F, {}, {}, [])
  },
  WtMm: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("WT6e"),
      o = (l("Kmda"), l("D4Le")),
      i = l("D4Le"),
      u = (l("BAgd"), l("e5zT")),
      a = (l("7DMc"), l("embA")),
      r = l("zvWE");
    e.ChooseRefereeComponent = function () {
      function n(n, e, l) {
        this.refereesService = n, this.notificationService = e, this.parentForm = l, this.compareOnId = i.compareOnId, this.getName = r.getName, this.refereeChange = new t.EventEmitter, this.newReferee = new a.Referee, this.get_referees_list()
      }
      return n.prototype.ngOnChanges = function () {
        this.referee && this.referee.last_name && this.referee.first_name ? this.refereeName = r.getName(this.referee) : void 0 == this.referee && (this.refereeName = void 0)
      }, n.prototype.onRefereeSelected = function () {
        var n = this;
        this.refereeOptions$.subscribe(function (e) {
          return n.referee = e.find(function (e) {
            return r.getName(e) == n.refereeName
          })
        }), this.refereeChange.emit(this.referee)
      }, n.prototype.get_referees_list = function () {
        this.refereeOptions$ = new u.ReplaySubject, this.refereesService.getReferees().subscribe(this.refereeOptions$)
      }, n.prototype.addReferee = function () {
        var n = this;
        this.refereesService.addReferee(this.newReferee).subscribe(function (e) {
          n.get_referees_list(), n.refereeOptions$.subscribe(function (l) {
            n.referee = l.find(function (n) {
              return n.id === e.id
            }), n.refereeChange.next(n.referee)
          }), n.newReferee = new a.Referee
        }, function (e) {
          n.notificationService.addNotification({
            type: "error",
            message: "Could not add referee: " + o.formatJsonErrorAsList(e),
            ttl: 2e3
          })
        })
      }, n.prototype.checkRefereeIntegrity = function () {
        r.checkFormIntegrity(this.referee, this.refereeName, this.notificationService, r.getName) || (this.refereeName = "")
      }, n
    }()
  },
  XVEw: function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
      for (var e, l = 1, t = arguments.length; l < t; l++)
        for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
      return n
    };
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("j+m6");
    var o = l("YaPU");
    l("TDKa"), l("MQ0p"), l("owTz"), l("o53x"), l("bqhO"), l("aTdd");
    var i = l("e5zT"),
      u = l("g5jc"),
      a = (l("ikkQ"), l("BAgd"), l("D4Le")),
      r = l("wBdC");
    e.AdminAddTeamPlayer = function () {
      function n(n, e, l) {
        this.teamsService = n, this.playersService = e, this.notificationService = l, this.teamOptions$ = new i.ReplaySubject(1), this.teamName = "", this.teamShortName = "", this.initialData = {
          existingPlayer: new r.Player(-1),
          newPlayer: new r.Player(void 0)
        }, this.existingPlayer = t({}, this.initialData.existingPlayer), this.newPlayer = t({}, this.initialData.newPlayer)
      }
      return n.prototype.ngOnInit = function () {
        var n = this;
        this.teamsService.getTeams().subscribe(this.teamOptions$), this.playerOptions$ = new u.Subject, this.playerOptions$.subscribe(function (n) {
          return console.log("LOG PLAYER OPTIONS", n)
        }, function (n) {
          return console.log("error", n)
        }), console.log("this.playerSearchInput", this.playerSearchInput), o.Observable.fromEvent(this.playerSearchInput.nativeElement, "keyup").map(function (n) {
          return n.target.value
        }).filter(function (n) {
          return n.length > 1
        }).debounceTime(250).distinctUntilChanged().switchMap(function (e) {
          return n.playersService.getPlayers(e)
        }).subscribe(this.playerOptions$)
      }, n.prototype.formatPlayerName = function (n) {
        return n.last_name && n.first_name ? n.last_name + " " + n.first_name : n.last_name + n.first_name
      }, n.prototype.onTeamSelected = function () {
        var n = this;
        console.log("onTeamSelected"), console.log("this.team.name (out)", this.teamName), this.players$ = new u.Subject, this.teamOptions$.map(function (e) {
          return n.team = e.find(function (e) {
            return e.name === n.teamName
          }), n.team
        }).flatMap(function (e) {
          return console.log("team selected: ", e), e ? n.teamsService.getTeamDetails(e.id).map(function (e) {
            return n.coach = e.coach, console.log("t", e), e.players.map(function (n) {
              return t({}, n, {
                number: n.usual_number,
                role: n.usual_role ? n.usual_role : {
                  name: "",
                  id: null
                }
              })
            }).sort(function (e, l) {
              return n.formatPlayerName(e).localeCompare(n.formatPlayerName(l))
            })
          }) : o.Observable.from([])
        }).subscribe(this.players$)
      }, n.prototype.addPlayer = function () {
        var n = this;
        this.validateExistingPlayer(), -1 == this.existingPlayer.id || "" == this.newPlayer.first_name && "" == this.newPlayer.last_name || (this.validationErrors = "Please don't provide both data for existing and new player.\n      Clear the field you do not want to use and try again."), this.validationErrors || (-1 != this.existingPlayer.id ? this.createTeamPlayerFromExisting(this.existingPlayer.id) : this.playersService.createPlayer(this.newPlayer).subscribe(function (e) {
          n.createTeamPlayerFromExisting(e.id)
        }, function (e) {
          n.notificationService.addNotification({
            type: "error",
            message: "Could not create player: " + a.formatJsonErrorAsList(e)
          })
        }))
      }, n.prototype.createTeamPlayerFromExisting = function (n) {
        var e = this;
        this.playersService.addTeamPlayer({
          player: n,
          team: this.team.id
        }).subscribe(function (n) {
          e.onTeamSelected(), e.existingPlayer = t({}, e.initialData.existingPlayer), e.newPlayer = t({}, e.initialData.newPlayer)
        }, function (n) {
          e.notificationService.addNotification({
            type: "error",
            message: "Could not add player to team: " + a.formatJsonErrorAsList(n)
          })
        })
      }, n.prototype.deleteTeamPlayer = function (n) {
        var e = this;
        this.playersService.deleteTeamPlayer(n.team_player_id).subscribe(function (n) {
          console.log("res", n), e.onTeamSelected()
        })
      }, n.prototype.setExistingPlayer = function (n) {
        this.existingPlayer = n, this.newPlayer = new r.Player(void 0), this.validationErrors = ""
      }, n.prototype.validateExistingPlayer = function () {
        "" === this.playerSearchInput.nativeElement.value && (this.existingPlayer = t({}, this.initialData.existingPlayer)), this.playerSearchInput.nativeElement.value !== this.formatPlayerName(this.existingPlayer) && (this.validationErrors = "Existing player name did not match selected player anymore.\n      Please select a player again using the dropdown list, or clear the existing player name if you want to create\n      a new player.")
      }, n
    }()
  },
  ZBXF: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("D692");
    var t = l("PJh5"),
      o = l("xNPZ");
    e.AgendaComponent = function () {
      function n(n) {
        this.matchService = n
      }
      return n.prototype.ngOnInit = function () {
        this.getMatches()
      }, n.prototype.getMatches = function () {
        var n = this;
        this.matchService.getMatches(!0).subscribe(function (e) {
          n.matches = e, n.matches.forEach(function (n) {
            n.date_time = t.tz(n.date_time, o.tz.guess()).format("YYYY-MM-DD HH:mm")
          })
        })
      }, n
    }()
  },
  Zkkf: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("lMWm"), l("MDfR"), l("xgm2"), l("owTz");
    var o = l("FjE5");
    e.CompositionsService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getMatch = function (n, e) {
        var l = this;
        return this.httpClient.get("/api/match/" + n + "?lang=" + e).do(function (n) {
          return l.lastComposition = o.setColorsOnComposition(Object.assign({}, n))
        }).catch(function (n) {
          return console.log("err", n), t.Observable.throw(n)
        })
      }, n.prototype.getLatestMatch = function (n) {
        var e = this;
        return this.httpClient.get("/api/matches/?limit=1&team=" + n).map(function (n) {
          return n.results[0]
        }).flatMap(function (n) {
          return n ? e.getMatch(n.id, "en") : t.Observable.of(null)
        }).catch(function (n) {
          return console.log("err", n), t.Observable.throw(n)
        })
      }, n
    }()
  },
  "Zn+w": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.TAG_COLORS = ["#48fb47", "#ffff00", "#ff9933", "#00ffff", "#ff0033"], e.DIST_COLOR_THRESHOLD = 40, e.REFEREE_GOAL_COLORS = ["#ededed", "#141414", "#bc1010", "#00d3d3", "#efef09", "#ffcd63", "#10c916"], e.CANVAS_DEFAULT_WIDTH = 575, e.MAX_LIVE_DELAY = 3, e.LIVE_SENDING_PERIOD = 1, e.MAX_STAT_DURATION = 10, e.MIN_STAT_DURATION = 9.5, e.PREMIUM_COVERAGE = "premium", e.CLASSIC_COVERAGE = "classic", e.SKILLCORNER_EVENT = "skillcorner", e.SPORTRADAR_EVENT = "sportradar", e.REFRESH_COMPOSITION_BEFORE = 180, e.REFERER_ADS = {
      "nettavisen.no": "https://pubads.g.doubleclick.net/gampad/ads?slotname=%2F5374%2Ftv2video%2Fnettavisen%2Fnettavisen&sz=640x480&cust_params=dfpduration%3D4&url=https%3A%2F%2Fwww.nettavisen.no%2Fna24%2Fkare-har-slst-bort-700000-kroner-pa-denne-bilen%2F3423418147.html&unviewed_position_start=1&env=vp&gdfp_req=1&ad_rule=0&output=xml_vast3&video_url_to_fetch=https%3A%2F%2Fwww.nettavisen.no%2Fna24%2Fkare-har-slst-bort-700000-kroner-pa-denne-bilen%2F3423418147.html&vad_type=linear&vpos=preroll&pod=1&vrid=5644&pmnd=0&pmxd=40000&pmad=2&is_amp=0&adk=3506354507&correlator=1607207542024736&scor=998061777860989&ged=timeout&osd=2&hl=no&frm=2&sdkv=h.3.192.0&sdki=3c0d&mpt=videojs-ima&mpv=0.2.0&sdr=1&vpa=auto&eid=231422001&u_so=l&afvsz=450x50%2C468x60%2C480x70%2C728x90&kfa=0&tfcd=0",
      besoccer: "https://googleads.g.doubleclick.net/pagead/ads?client=ca-video-pub-8933329999391104&slotname=AP_Partner_Besoccer_VAST&ad_type=video_text_image&description_url=https%3A%2F%2Fbesoccer.com&videoad_start_delay=0&vpmute=1&vpa=0"
    }, e.LINE_TO_ROLES = {
      goal: ["Goalkeeper"],
      defense: ["Left Wing Back", "Left Back", "Central Back", "Right Back", "Sweeper", "Right Wing Back"],
      middle: ["Left Midfield", "Defensive Midfield", "Central Midfield", "Attacking Midfield", "Right Midfield"],
      attack: ["Left Winger", "Left Forward", "Central Forward", "Right Forward", "Right Winger"],
      substitutes: ["Substitute"]
    }, e.getSortedRoles = function () {
      return [].concat(e.LINE_TO_ROLES.goal, e.LINE_TO_ROLES.defense, e.LINE_TO_ROLES.middle, e.LINE_TO_ROLES.attack, e.LINE_TO_ROLES.substitutes)
    }, e.getTeamsPositions = function (n, e) {
      var l = n / 10,
        t = e / 10,
        o = {
          Goalkeeper: {
            x: l / 1.7,
            y: e / 2
          },
          Sweeper: {
            x: 2 * l,
            y: e / 2
          },
          "Central Back": {
            x: 1.4 * l,
            y: e / 2
          },
          "Left Back": {
            x: 1.4 * l,
            y: e / 2 - 5 * t / 3
          },
          "Right Back": {
            x: 1.4 * l,
            y: e / 2 + 5 * t / 3
          },
          "Left Wing Back": {
            x: 2.1 * l,
            y: e / 2 - 3.5 * t
          },
          "Right Wing Back": {
            x: 2.1 * l,
            y: e / 2 + 3.5 * t
          },
          "Defensive Midfield": {
            x: 2.5 * l,
            y: e / 2
          },
          "Central Midfield": {
            x: 3.2 * l,
            y: e / 2
          },
          "Left Midfield": {
            x: 3.1 * l,
            y: e / 2 - 5 * t / 3
          },
          "Right Midfield": {
            x: 3.1 * l,
            y: e / 2 + 5 * t / 3
          },
          "Attacking Midfield": {
            x: 3.7 * l,
            y: e / 2
          },
          "Left Winger": {
            x: 3.9 * l,
            y: e / 2 - 3.5 * t
          },
          "Right Winger": {
            x: 3.9 * l,
            y: e / 2 + 3.5 * t
          },
          "Left Forward": {
            x: 4.6 * l,
            y: e / 2 - 5 * t / 3
          },
          "Central Forward": {
            x: 4.6 * l,
            y: e / 2
          },
          "Right Forward": {
            x: 4.6 * l,
            y: e / 2 + 5 * t / 3
          }
        };
      return {
        home: o,
        away: function (n, e, l) {
          var t = JSON.parse(JSON.stringify(o));
          for (var i in t)
            if (t.hasOwnProperty(i)) {
              var u = t[i];
              u.x = e - u.x, u.y = l - u.y
            }
          return t
        }(0, n, e)
      }
    }, e.STATUS_TO_LABEL = {
      unlaunched: "default",
      terminated: "default",
      pending: "warning",
      waiting_ping: "warning",
      failed: "danger",
      success: "success"
    }
  },
  "a+4R": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS"), e.VideoInfoService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getVideoAndMatchInfo = function (n) {
        return this.httpClient.get("/api/match/" + n + "/video")
      }, n
    }()
  },
  a3ba: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("bfOx"), l("C1j0"), l("pxu+"), l("ZBXF"), l("gFWv"), l("UuY2"), l("SsVf"), l("XVEw"), l("JCcm"), l("R5tW"), l("+yYV"), l("a5fX"), e.AppRoutingModule = function () {}
  },
  a5fX: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("UEcf"),
      o = (l("PakY"), l("ItHS"), l("Gvdl"));
    l("J8vI"), console, e.DevToolsComponent = function () {
      function n(n, e, l) {
        var o = this;
        this.console = n, this.httpClient = e, this.position = l, this.initFrame = 5e3, this.playerId = 6027, this.playerIn = 4219, this.currentPeriod = 0, this.speedFactor = 1, this.httpClient.get("/api/node_token").subscribe(function (n) {
          o.fs = new t.FrameStream(n, o.console, o.initFrame), o.controls = [{
            name: "Play Stream",
            task: o.fs.playStream.bind(o.fs)
          }, {
            name: "Stop Stream",
            task: o.fs.stopStream.bind(o.fs)
          }, {
            name: "Set To NOOP",
            task: function () {
              return o.fs.setStreamTo("NOOP")
            }
          }, {
            name: "Set To ACTION",
            task: function () {
              return o.fs.setStreamTo("FAME")
            }
          }], o.instructions = [{
            name: "Send Yellow Card",
            task: function () {
              o.fs.sendCardInstruction(o.playerId, "yellow"), o.fs.sendCardEvent(o.playerId, "yellow")
            }
          }, {
            name: "Send Yellow Card modified",
            task: function () {
              o.fs.sendCardInstruction(o.playerIn, "yellow"), o.fs.sendCardEvent(o.playerIn, "yellow")
            }
          }, {
            name: "Send Red Card",
            task: function () {
              return o.fs.sendCardInstruction(o.playerId, "red")
            }
          }, {
            name: "Substitution_event",
            task: function () {
              o.fs.sendSubstitutionEvent(o.playerId, o.playerIn), o.fs.sendSubstitutionInstruction(o.playerId, o.playerIn)
            }
          }, {
            name: "Start Period",
            task: function () {
              return o.fs.sendPeriodInstruction(++o.currentPeriod, "start")
            }
          }, {
            name: "End Period",
            task: function () {
              return o.fs.sendPeriodInstruction(o.currentPeriod, "end")
            }
          }]
        })
      }
      return n.prototype.ngOnInit = function () {
        var n = this;
        o.Observable.interval(500).subscribe(function () {
          return n.fs.changeSpeedFactor(n.speedFactor)
        })
      }, n.prototype.processEvent = function (n) {
        this.console.log("processing", n.name), n.task()
      }, n
    }()
  },
  aUQL: function (n, e, l) {
    "use strict";
    e.styles = [".table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]{vertical-align:middle}.badge-primary[_ngcontent-%COMP%]{background:#0c7342}"]
  },
  chaR: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("7DMc"),
      i = l("Xjw4"),
      u = l("vUAE"),
      a = l("ItHS"),
      r = l("VveI"),
      s = l("j+m6"),
      c = l("BAgd"),
      d = t.\u0275crt({
        encapsulation: 0,
        styles: [""],
        data: {}
      });

    function p(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n          "]))], function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.getName(e.context.$implicit)), n(e, 2, 0, l.getName(e.context.$implicit))
      }, null)
    }

    function m(n) {
      return t.\u0275vid(0, [t.\u0275qud(671088640, 1, {
        controls: 1
      }), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(2, 0, null, null, 27, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(4, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "coach"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Select a coach"])), (n()(), t.\u0275ted(-1, null, ["\n      \n      "])), (n()(), t.\u0275eld(7, 0, null, null, 15, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(9, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["list", "coaches"],
        ["name", "coach"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "focusout"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 10)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 10).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 10)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 10)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.coachName = l) && o), "input" === e && (o = !1 !== i.onCoachSelected() && o), "focusout" === e && (o = !1 !== i.checkCoachIntegrity() && o), o
      }, null, null)), t.\u0275did(10, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(12, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(14, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(16, 0, null, null, 5, "datalist", [
        ["id", "coaches"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, p)), t.\u0275did(19, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(24, 0, null, null, 4, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(26, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.saveCoach() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          Save Coach\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(31, 0, null, null, 30, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(33, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Or add a new coach to the list"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(36, 0, null, null, 8, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(38, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-coach-name"],
        ["placeholder", "Last name"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 39)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 39).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 39)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 39)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newCoach.last_name = l) && o), o
      }, null, null)), t.\u0275did(39, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(41, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(43, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(46, 0, null, null, 8, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(48, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-coach-name"],
        ["placeholder", "First name"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 49)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 49).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 49)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 49)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newCoach.first_name = l) && o), o
      }, null, null)), t.\u0275did(49, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(51, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(53, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(56, 0, null, null, 4, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(58, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.addCoach() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          Add and select coach\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "]))], function (n, e) {
        var l = e.component;
        n(e, 12, 0, "coach", l.coachName), n(e, 19, 0, t.\u0275unv(e, 19, 0, t.\u0275nov(e, 20).transform(l.coachOptions$))), n(e, 41, 0, "new-coach-name", l.newCoach.last_name), n(e, 51, 0, "new-coach-name", l.newCoach.first_name)
      }, function (n, e) {
        var l = e.component;
        n(e, 9, 0, t.\u0275nov(e, 14).ngClassUntouched, t.\u0275nov(e, 14).ngClassTouched, t.\u0275nov(e, 14).ngClassPristine, t.\u0275nov(e, 14).ngClassDirty, t.\u0275nov(e, 14).ngClassValid, t.\u0275nov(e, 14).ngClassInvalid, t.\u0275nov(e, 14).ngClassPending), n(e, 26, 0, !l.coachName), n(e, 38, 0, t.\u0275nov(e, 43).ngClassUntouched, t.\u0275nov(e, 43).ngClassTouched, t.\u0275nov(e, 43).ngClassPristine, t.\u0275nov(e, 43).ngClassDirty, t.\u0275nov(e, 43).ngClassValid, t.\u0275nov(e, 43).ngClassInvalid, t.\u0275nov(e, 43).ngClassPending), n(e, 48, 0, t.\u0275nov(e, 53).ngClassUntouched, t.\u0275nov(e, 53).ngClassTouched, t.\u0275nov(e, 53).ngClassPristine, t.\u0275nov(e, 53).ngClassDirty, t.\u0275nov(e, 53).ngClassValid, t.\u0275nov(e, 53).ngClassInvalid, t.\u0275nov(e, 53).ngClassPending), n(e, 58, 0, "" === l.newCoach.first_name && "" === l.newCoach.last_name)
      })
    }

    function f(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 2, "admin-choose-coach", [], null, null, null, m, d)), t.\u0275prd(512, null, u.CoachesService, u.CoachesService, [a.HttpClient]), t.\u0275did(2, 573440, null, 0, r.ChooseCoachComponent, [u.CoachesService, s.TeamsService, c.NotificationService], null, null)], null, null)
    }
    e.RenderType_ChooseCoachComponent = d, e.View_ChooseCoachComponent_0 = m, e.View_ChooseCoachComponent_Host_0 = f, e.ChooseCoachComponentNgFactory = t.\u0275ccf("admin-choose-coach", r.ChooseCoachComponent, f, {
      team: "team",
      coach: "coach"
    }, {
      coachChange: "coachChange"
    }, [])
  },
  dTtl: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("WT6e"),
      o = (l("Rd49"), l("YaPU"));
    l("TDKa"), l("7DMc");
    var i = l("D4Le");
    e.ChooseCompetitionComponent = function () {
      function n(n, e) {
        this.competitionEditionsService = n, this.parentForm = e, this.compareOnId = i.compareOnId, this.competitionEditionChange = new t.EventEmitter, this.competitionRoundIdChange = new t.EventEmitter, this.competitionEditionOptions$ = this.competitionEditionsService.getObjects()
      }
      return n.prototype.ngOnChanges = function (n) {
        var e = this;
        n.competitionEdition && this.competitionEdition && this.competitionEditionOptions$.subscribe(function (n) {
          e.competitionEdition.competition = n.find(function (n) {
            return n.id === (e.competitionEdition ? e.competitionEdition.id : -1)
          }).competition, e.competitionRoundOptions$ = o.Observable.from([e.competitionEdition.competition.rounds])
        })
      }, n.prototype.ngAfterViewInit = function () {
        var n = this;
        this.controls.forEach(function (e) {
          n.parentForm.addControl(e)
        })
      }, n.prototype.onCompetitionEditionChange = function (n) {
        var e = this;
        this.competitionEdition = n, this.competitionEditionChange.next(this.competitionEdition), this.competitionRoundOptions$ = o.Observable.from([this.competitionEdition.competition.rounds]), this.competitionRoundId = null, this.competitionRoundOptions$.subscribe(function (n) {
          n.length && (e.competitionRoundId = n[0].id)
        }), this.competitionRoundIdChange.next(this.competitionRoundId)
      }, n.prototype.onCompetitionRoundIdChange = function (n) {
        this.competitionRoundId = n, this.competitionRoundIdChange.next(this.competitionRoundId)
      }, n
    }()
  },
  dgbi: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS"), e.VideoSourcesService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getVideoSources = function () {
        return this.httpClient.get("/api/video_sources")
      }, n
    }()
  },
  eXMp: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Coach = function (n, e, l) {
      void 0 === n && (n = -1), void 0 === e && (e = ""), void 0 === l && (l = ""), this.id = n, this.first_name = e, this.last_name = l
    }
  },
  embA: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Referee = function (n, e, l, t) {
      void 0 === n && (n = -1), void 0 === e && (e = -1), void 0 === l && (l = ""), void 0 === t && (t = ""), this.id = n, this.trackable_object = e, this.first_name = l, this.last_name = t
    }
  },
  f7mB: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("WT6e"),
      o = l("Gvdl");
    e.DebugLogs = function () {
      function n() {
        this.rmLog = new t.EventEmitter, this.enableAutoScroll = !0, this.lastScroll = 0
      }
      return n.prototype.ngAfterViewInit = function () {
        var n = this;
        this.consoleContainer = document.getElementById("console"), o.Observable.interval(2e3).subscribe(function () {
          return n.refreshConsole()
        })
      }, n.prototype.refreshConsole = function () {
        this.enableAutoScroll && (this.consoleContainer.scrollTop = this.consoleContainer.scrollHeight)
      }, n.prototype.userScrolled = function (n) {
        var e = this.consoleContainer.scrollTop - this.lastScroll;
        this.lastScroll = this.consoleContainer.scrollTop, e >= 0 && Math.abs(this.consoleContainer.scrollTop - this.consoleContainer.scrollHeight) < 5 ? this.enableAutoScroll = !0 : e < 0 && (this.enableAutoScroll = !1)
      }, n.prototype.removeLog = function (n) {
        this.rmLog.next(n)
      }, n
    }()
  },
  fvPM: function (n, e, l) {
    "use strict";
    var t = l("tkqE"),
      o = l("gF3u"),
      i = l("WT6e"),
      u = l("Xjw4"),
      a = l("7DMc"),
      r = l("a5fX"),
      s = l("PakY"),
      c = l("ItHS"),
      d = l("J8vI"),
      p = i.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles],
        data: {}
      });

    function m(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 5, "li", [
        ["class", "event-box referee-decision"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processEvent(n.context.$implicit) && t), t
      }, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(3, 0, null, null, 1, "p", [
        ["class", "event-title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(4, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n            "]))], null, function (n, e) {
        n(e, 4, 0, e.context.$implicit.name)
      })
    }

    function f(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 5, "li", [
        ["class", "event-box"],
        ["style", "flex: 0 0 16%"]
      ], null, [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.processEvent(n.context.$implicit) && t), t
      }, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(3, 0, null, null, 1, "p", [
        ["class", "event-title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(4, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n            "]))], null, function (n, e) {
        n(e, 4, 0, e.context.$implicit.name)
      })
    }

    function h(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 85, "div", [
        ["class", "controls-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(2, 0, null, null, 82, "div", [
        ["class", "left-controls"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(4, 0, null, null, 2, "ul", [
        ["style", "flex: 0.13;"]
      ], null, null, null, null, null)), (n()(), i.\u0275eld(5, 0, null, null, 1, "h3", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["Controls :"])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(8, 0, null, null, 4, "ul", [
        ["class", "presentation-box referee-decisions"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275and(16777216, null, null, 1, null, m)), i.\u0275did(11, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275eld(14, 0, null, null, 3, "ul", [
        ["style", "flex: 0.13;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(16, 0, null, null, 1, "h3", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["Instructions :"])), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275eld(19, 0, null, null, 4, "ul", [
        ["class", "presentation-box referee-decisions"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275and(16777216, null, null, 1, null, f)), i.\u0275did(22, 802816, null, 0, u.NgForOf, [i.ViewContainerRef, i.TemplateRef, i.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275eld(25, 0, null, null, 2, "ul", [
        ["style", "flex: 0.13;"]
      ], null, null, null, null, null)), (n()(), i.\u0275eld(26, 0, null, null, 1, "h3", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["Parameters :"])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(29, 0, null, null, 54, "ul", [
        ["class", "presentation-box referee-decisions"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(31, 0, null, null, 11, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(33, 0, null, null, 1, "label", [
        ["for", "player_id"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" Player Id/Out : "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(36, 0, null, null, 5, "input", [
        ["id", "player_id"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "input" === e && (t = !1 !== i.\u0275nov(n, 37)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== i.\u0275nov(n, 37).onTouched() && t), "compositionstart" === e && (t = !1 !== i.\u0275nov(n, 37)._compositionStart() && t), "compositionend" === e && (t = !1 !== i.\u0275nov(n, 37)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (o.playerId = l) && t), t
      }, null, null)), i.\u0275did(37, 16384, null, 0, a.DefaultValueAccessor, [i.Renderer2, i.ElementRef, [2, a.COMPOSITION_BUFFER_MODE]], null, null), i.\u0275prd(1024, null, a.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [a.DefaultValueAccessor]), i.\u0275did(39, 671744, null, 0, a.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, a.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), i.\u0275prd(2048, null, a.NgControl, null, [a.NgModel]), i.\u0275did(41, 16384, null, 0, a.NgControlStatus, [a.NgControl], null, null), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275ted(-1, null, ["\n\n            "])), (n()(), i.\u0275eld(44, 0, null, null, 11, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(46, 0, null, null, 1, "label", [
        ["for", "player_id"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" Player In : "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(49, 0, null, null, 5, "input", [
        ["id", "player_id"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "input" === e && (t = !1 !== i.\u0275nov(n, 50)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== i.\u0275nov(n, 50).onTouched() && t), "compositionstart" === e && (t = !1 !== i.\u0275nov(n, 50)._compositionStart() && t), "compositionend" === e && (t = !1 !== i.\u0275nov(n, 50)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (o.playerIn = l) && t), t
      }, null, null)), i.\u0275did(50, 16384, null, 0, a.DefaultValueAccessor, [i.Renderer2, i.ElementRef, [2, a.COMPOSITION_BUFFER_MODE]], null, null), i.\u0275prd(1024, null, a.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [a.DefaultValueAccessor]), i.\u0275did(52, 671744, null, 0, a.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, a.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), i.\u0275prd(2048, null, a.NgControl, null, [a.NgModel]), i.\u0275did(54, 16384, null, 0, a.NgControlStatus, [a.NgControl], null, null), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275ted(-1, null, ["\n\n            "])), (n()(), i.\u0275eld(57, 0, null, null, 11, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(59, 0, null, null, 1, "label", [
        ["for", "init_frame"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" Init Frame : "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(62, 0, null, null, 5, "input", [
        ["id", "init_frame"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "input" === e && (t = !1 !== i.\u0275nov(n, 63)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== i.\u0275nov(n, 63).onTouched() && t), "compositionstart" === e && (t = !1 !== i.\u0275nov(n, 63)._compositionStart() && t), "compositionend" === e && (t = !1 !== i.\u0275nov(n, 63)._compositionEnd(l.target.value) && t), "ngModelChange" === e && (t = !1 !== (o.initFrame = l) && t), t
      }, null, null)), i.\u0275did(63, 16384, null, 0, a.DefaultValueAccessor, [i.Renderer2, i.ElementRef, [2, a.COMPOSITION_BUFFER_MODE]], null, null), i.\u0275prd(1024, null, a.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [a.DefaultValueAccessor]), i.\u0275did(65, 671744, null, 0, a.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, a.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), i.\u0275prd(2048, null, a.NgControl, null, [a.NgModel]), i.\u0275did(67, 16384, null, 0, a.NgControlStatus, [a.NgControl], null, null), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(70, 0, null, null, 12, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(72, 0, null, null, 1, "label", [
        ["for", "init_frame"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" speed factor: "])), (n()(), i.\u0275ted(-1, null, ["\n                "])), (n()(), i.\u0275eld(75, 0, null, null, 6, "input", [
        ["id", "init_frame"],
        ["type", "number"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"],
        [null, "change"]
      ], function (n, e, l) {
        var t = !0,
          o = n.component;
        return "input" === e && (t = !1 !== i.\u0275nov(n, 76)._handleInput(l.target.value) && t), "blur" === e && (t = !1 !== i.\u0275nov(n, 76).onTouched() && t), "compositionstart" === e && (t = !1 !== i.\u0275nov(n, 76)._compositionStart() && t), "compositionend" === e && (t = !1 !== i.\u0275nov(n, 76)._compositionEnd(l.target.value) && t), "change" === e && (t = !1 !== i.\u0275nov(n, 77).onChange(l.target.value) && t), "input" === e && (t = !1 !== i.\u0275nov(n, 77).onChange(l.target.value) && t), "blur" === e && (t = !1 !== i.\u0275nov(n, 77).onTouched() && t), "ngModelChange" === e && (t = !1 !== (o.speedFactor = l) && t), t
      }, null, null)), i.\u0275did(76, 16384, null, 0, a.DefaultValueAccessor, [i.Renderer2, i.ElementRef, [2, a.COMPOSITION_BUFFER_MODE]], null, null), i.\u0275did(77, 16384, null, 0, a.\u0275bc, [i.Renderer2, i.ElementRef], null, null), i.\u0275prd(1024, null, a.NG_VALUE_ACCESSOR, function (n, e) {
        return [n, e]
      }, [a.DefaultValueAccessor, a.\u0275bc]), i.\u0275did(79, 671744, null, 0, a.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, a.NG_VALUE_ACCESSOR]
      ], {
        model: [0, "model"]
      }, {
        update: "ngModelChange"
      }), i.\u0275prd(2048, null, a.NgControl, null, [a.NgModel]), i.\u0275did(81, 16384, null, 0, a.NgControlStatus, [a.NgControl], null, null), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        var l = e.component;
        n(e, 11, 0, l.controls), n(e, 22, 0, l.instructions), n(e, 39, 0, l.playerId), n(e, 52, 0, l.playerIn), n(e, 65, 0, l.initFrame), n(e, 79, 0, l.speedFactor)
      }, function (n, e) {
        n(e, 36, 0, i.\u0275nov(e, 41).ngClassUntouched, i.\u0275nov(e, 41).ngClassTouched, i.\u0275nov(e, 41).ngClassPristine, i.\u0275nov(e, 41).ngClassDirty, i.\u0275nov(e, 41).ngClassValid, i.\u0275nov(e, 41).ngClassInvalid, i.\u0275nov(e, 41).ngClassPending), n(e, 49, 0, i.\u0275nov(e, 54).ngClassUntouched, i.\u0275nov(e, 54).ngClassTouched, i.\u0275nov(e, 54).ngClassPristine, i.\u0275nov(e, 54).ngClassDirty, i.\u0275nov(e, 54).ngClassValid, i.\u0275nov(e, 54).ngClassInvalid, i.\u0275nov(e, 54).ngClassPending), n(e, 62, 0, i.\u0275nov(e, 67).ngClassUntouched, i.\u0275nov(e, 67).ngClassTouched, i.\u0275nov(e, 67).ngClassPristine, i.\u0275nov(e, 67).ngClassDirty, i.\u0275nov(e, 67).ngClassValid, i.\u0275nov(e, 67).ngClassInvalid, i.\u0275nov(e, 67).ngClassPending), n(e, 75, 0, i.\u0275nov(e, 81).ngClassUntouched, i.\u0275nov(e, 81).ngClassTouched, i.\u0275nov(e, 81).ngClassPristine, i.\u0275nov(e, 81).ngClassDirty, i.\u0275nov(e, 81).ngClassValid, i.\u0275nov(e, 81).ngClassInvalid, i.\u0275nov(e, 81).ngClassPending)
      })
    }

    function g(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 1, "app-dev-tools", [], null, null, null, h, p)), i.\u0275did(1, 114688, null, 0, r.DevToolsComponent, [s.LoggingService, c.HttpClient, d.PositionService], null, null)], function (n, e) {
        n(e, 1, 0)
      }, null)
    }
    e.RenderType_DevToolsComponent = p, e.View_DevToolsComponent_0 = h, e.View_DevToolsComponent_Host_0 = g, e.DevToolsComponentNgFactory = i.\u0275ccf("app-dev-tools", r.DevToolsComponent, g, {}, {}, [])
  },
  gF3u: function (n, e, l) {
    "use strict";
    e.styles = ["li[_ngcontent-%COMP%]{list-style-type:none}p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{padding:0;margin:0}.box-shadow[_ngcontent-%COMP%]{-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.box-shadow-hover[_ngcontent-%COMP%]{-webkit-box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}.display-flex[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-row[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.flex-column[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{-ms-flex-wrap:wrap;flex-wrap:wrap}.flex-nowrap[_ngcontent-%COMP%]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.border-radius-4px[_ngcontent-%COMP%]{border-radius:4px}.white-bold-text[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center}.scale-150p[_ngcontent-%COMP%]{-webkit-transform:scale(1.5);transform:scale(1.5);z-index:9999999}.scale-130p[_ngcontent-%COMP%]{-webkit-transform:scaleY(1.3) scaleX(1.1);transform:scaleY(1.3) scaleX(1.1);z-index:9999999}.centered-text[_ngcontent-%COMP%]{margin-left:50%;margin-top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.scoreboard-btn[_ngcontent-%COMP%]{position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.greyed[_ngcontent-%COMP%]{opacity:.3}.inner-modal[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;z-index:999999}*[_ngcontent-%COMP%]{-webkit-box-sizing:content-box;box-sizing:content-box;-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}p[_ngcontent-%COMP%]{margin:auto}.events-modal[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;background:rgba(5,5,5,.83);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;z-index:9999999;-webkit-animation:0s .5s slidein;animation:0s .5s slidein}.attention[_ngcontent-%COMP%]{background:red;opacity:1}.attention[_ngcontent-%COMP%]   .synthesis-zone[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] > thead[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{background:#000;color:#ff0}.attention[_ngcontent-%COMP%]   .synthesis-zone[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]{background:#000;color:#fff;font-weight:900}@-webkit-keyframes slidein{from{margin-left:100%;width:300%}to{margin-left:0;width:100%}}@keyframes slidein{from{margin-left:100%;width:300%}to{margin-left:0;width:100%}}.completion-zone[_ngcontent-%COMP%]{-webkit-box-flex:4;-ms-flex:4;flex:4;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.teams-completion[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around;-webkit-transition:None;transition:None}.team-box[_ngcontent-%COMP%]{border-radius:4px;-webkit-box-flex:1;-ms-flex:1;flex:1;margin:5px;border:1px solid #fff;background:rgba(49,112,143,.8);display:-webkit-box;display:-ms-flexbox;display:flex;cursor:pointer}.own-goal-box[_ngcontent-%COMP%]{border-radius:4px;margin:5px;border:1px solid #fff;background:rgba(104,135,143,.8);display:-webkit-box;display:-ms-flexbox;display:flex;cursor:pointer;-webkit-box-flex:.2;-ms-flex:.2;flex:.2}.own-goal-box[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{cursor:pointer;color:#fff;font-weight:700;text-align:center;margin:auto;font-size:calc(10px + .5vw)}.selected[_ngcontent-%COMP%]{background:#ff8700!important}.team-box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center;margin:auto;font-size:30px}.players-box[_ngcontent-%COMP%]{margin:5px;-webkit-box-flex:5;-ms-flex:5;flex:5;border:1px solid grey;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.modal-player[_ngcontent-%COMP%]{cursor:pointer;-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;color:#fff;margin:1px 10%;border-radius:4px}.modal-player[_ngcontent-%COMP%]:hover{-webkit-transform:scaleY(1.3) scaleX(1.1);transform:scaleY(1.3) scaleX(1.1);z-index:9999999;background:#cd5c5c}.modal-player[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.modal-player[_ngcontent-%COMP%]   .player-number[_ngcontent-%COMP%]{font-size:calc(10px + .3vw);font-weight:800;background:#d39e15}.modal-player[_ngcontent-%COMP%]   .player-acronym[_ngcontent-%COMP%]{font-size:calc(10px + .3vw);font-weight:800;background:#00c6ff}.modal-player[_ngcontent-%COMP%]   .player-name[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center;font-size:calc(12px + .5vw)}.synthesis-zone[_ngcontent-%COMP%]{margin:5px 10%;-webkit-box-flex:1;-ms-flex:1;flex:1;color:#fff;font-weight:700;text-align:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.synthesis-zone[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] > thead[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{text-align:center;background:#a9a9a9}.synthesis-zone[_ngcontent-%COMP%]   .table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%]{background:#6b5300;vertical-align:middle}.controls-container[_ngcontent-%COMP%]{position:relative;height:calc(90vh - 20px);width:calc(100vw - 40px);min-width:525px;margin:10px 20px;background:rgba(255,237,173,.27);border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.presentation-box[_ngcontent-%COMP%]{border-radius:4px;background:#383838;border:1px solid #fff;color:#fff;-webkit-box-flex:.77!important;-ms-flex:.77!important;flex:.77!important}.left-controls[_ngcontent-%COMP%]{-webkit-box-flex:4;-ms-flex:4;flex:4;padding:5px;border:1px solid grey;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.left-controls[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{height:100%;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-ms-flex-pack:distribute;justify-content:space-around;padding:1px}.event-box[_ngcontent-%COMP%]{cursor:hand;-webkit-box-flex:0;-ms-flex:0 0 22%;flex:0 0 22%;height:80%;background:#03955a;border-radius:4px;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around}.referee-decision[_ngcontent-%COMP%]{background:#950303}.referee-choices-subjects[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1}.referee-choices-subjects[_ngcontent-%COMP%]   .referee-decision[_ngcontent-%COMP%]{height:50%;margin:auto}.img-container[_ngcontent-%COMP%]{-webkit-box-flex:0;-ms-flex:0 0 70%;flex:0 0 70%;height:70%;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;width:100%}.img-container[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%}@-moz-document url-prefix(){.img-container>img{max-width:90%;margin:auto;flex:0 0 70%}}.event-title[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center;-webkit-box-flex:0;-ms-flex:0 1 15%;flex:0 1 15%;font-size:calc(.65vw + 7px)}.event-box[_ngcontent-%COMP%]:hover{-webkit-box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);background:#ff8700}.right-controls[_ngcontent-%COMP%]{position:relative;padding:7px 14px;-webkit-box-flex:4;-ms-flex:4;flex:4;border:1px solid grey;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around}.scoreboard-container[_ngcontent-%COMP%]{-webkit-box-flex:2;-ms-flex:2;flex:2;border:2px solid #000;position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;width:100%;margin-left:-2px}.scoreboard-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:1.5vw;line-height:8px;margin-left:50%;margin-top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);color:#fff;font-weight:700;text-align:center}.scoreboard-positioner[_ngcontent-%COMP%]{position:absolute;width:100%;margin-left:0;height:50%;top:25%;background:#000;overflow:hidden}.away-score-dec[_ngcontent-%COMP%]:hover, .away-score-inc[_ngcontent-%COMP%]:hover, .break-start[_ngcontent-%COMP%]:hover, .home-score-dec[_ngcontent-%COMP%]:hover, .home-score-inc[_ngcontent-%COMP%]:hover, .match-end[_ngcontent-%COMP%]:hover, .period-start[_ngcontent-%COMP%]:hover{-webkit-transform:scale(1.5);transform:scale(1.5);z-index:9999999}.scoreboard-btn-top[_ngcontent-%COMP%]{top:1%}.scoreboard-btn-middle[_ngcontent-%COMP%]{top:37%}.scoreboard-btn-bottom[_ngcontent-%COMP%]{top:76%}.away-score-inc[_ngcontent-%COMP%], .home-score-inc[_ngcontent-%COMP%]{background:#00c6ff;position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1);top:1%}.away-score-dec[_ngcontent-%COMP%], .home-score-dec[_ngcontent-%COMP%]{background:#ff7e00;top:76%;position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.home-score-dec[_ngcontent-%COMP%], .home-score-inc[_ngcontent-%COMP%]{left:33%}.away-score-dec[_ngcontent-%COMP%], .away-score-inc[_ngcontent-%COMP%]{left:63%}.break-start[_ngcontent-%COMP%], .match-end[_ngcontent-%COMP%], .period-start[_ngcontent-%COMP%]{position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1);display:-webkit-box;display:-ms-flexbox;display:flex}.period-start[_ngcontent-%COMP%]{background:#148600;right:85.5%;top:1%}.break-start[_ngcontent-%COMP%]{background:#d39e15;right:85.5%;top:76%}.match-end[_ngcontent-%COMP%]{background:#a80007;right:8%;z-index:9999999;top:37%}.break-start[_ngcontent-%COMP%] > img[_ngcontent-%COMP%], .match-end[_ngcontent-%COMP%] > img[_ngcontent-%COMP%], .period-start[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{max-height:100%;margin:auto;fill:#fff}.players-container[_ngcontent-%COMP%]{-webkit-box-flex:8;-ms-flex:8;flex:8;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.additional-players[_ngcontent-%COMP%], .regular-players[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding:24px 5px 18px}.player[_ngcontent-%COMP%]{margin:1px;-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid grey;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.player[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.player[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{padding:2%;width:calc(98% - 3px);margin:auto}.player-number[_ngcontent-%COMP%]{-webkit-box-flex:.8;-ms-flex:.8;flex:.8;border:1px solid grey}.player-acronym[_ngcontent-%COMP%]{font-size:calc(.2vw + 8px);-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid grey}.player-name[_ngcontent-%COMP%]{overflow:overlay;-webkit-box-flex:6;-ms-flex:6;flex:6;border:1px solid grey;font-weight:700;font-size:calc(.5vw + 7px)}.player-shortcut-event[_ngcontent-%COMP%]{cursor:pointer;-webkit-box-flex:1;-ms-flex:1;flex:1;border:1px solid grey}.validation-container[_ngcontent-%COMP%]{height:calc(10vh - 10px);width:calc(100vw - 40px);margin:0 20px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.cancel-btn[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;cursor:pointer;border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;margin:5px;background:#8b0000}.validate-btn[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;cursor:pointer;border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;margin:5px;background:#008b00}.confirmation-btn[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;cursor:pointer;border-radius:4px;display:-webkit-box;display:-ms-flexbox;display:flex;margin:5px}.validation-container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center;font-size:30px;margin:auto}.center-screen[_ngcontent-%COMP%]{-webkit-box-flex:100;-ms-flex:100;flex:100;padding:15% 0}"]
  },
  gFWv: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("jDyY"), e.EmbeddableLiveComponent = function (n) {
      this.display = n
    }
  },
  gQ8C: function (n, e, l) {
    "use strict";
    var t = l("ILnZ"),
      o = l("sXaM"),
      i = l("WT6e"),
      u = l("T7wj"),
      a = l("jDyY"),
      r = l("D692"),
      s = i.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles],
        data: {}
      });

    function c(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275eld(1, 0, null, null, 53, "div", [
        ["class", "standalone-match-info display_wrapper"],
        ["style", "z-index: 53"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275eld(3, 0, null, null, 50, "div", [
        ["class", "noop_box"],
        ["style", "height: 100%; flex: 0 0 100%; width: 100%;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275eld(5, 0, null, null, 3, "div", [
        ["class", "logo-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(7, 0, null, null, 0, "img", [
        ["class", "logo"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n\n        "])), (n()(), i.\u0275eld(10, 0, null, null, 42, "div", [
        ["class", "text-descr"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(12, 0, null, null, 4, "div", [
        ["class", "event_title"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n\n            "])), (n()(), i.\u0275eld(14, 0, null, null, 1, "h1", [], null, null, null, null, null)), (n()(), i.\u0275ted(15, null, ["", ""])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275ted(-1, null, ["\n          "])), (n()(), i.\u0275eld(18, 0, null, null, 33, "ul", [
        ["class", "match-info-elements"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(20, 0, null, null, 3, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(22, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), i.\u0275ted(23, null, [" ", " "])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(25, 0, null, null, 4, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(27, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), i.\u0275ted(28, null, [" ", " "])), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(31, 0, null, null, 9, "li", [
        ["style", "margin: 3% 0 3% 0;"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(33, 0, null, null, 7, "p", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(35, 0, null, null, 1, "span", [
        ["class", "match-info-team"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(36, null, ["", ""])), (n()(), i.\u0275ted(-1, null, [" vs "])), (n()(), i.\u0275eld(38, 0, null, null, 1, "span", [
        ["class", "match-info-team"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(39, null, ["", ""])), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(42, 0, null, null, 3, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(44, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), i.\u0275ted(45, null, ["", " "])), (n()(), i.\u0275ted(-1, null, ["\n            "])), (n()(), i.\u0275eld(47, 0, null, null, 3, "li", [], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, [" "])), (n()(), i.\u0275eld(49, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), i.\u0275ted(50, null, ["", " "])), (n()(), i.\u0275ted(-1, null, ["\n\n\n          "])), (n()(), i.\u0275ted(-1, null, ["\n        "])), (n()(), i.\u0275ted(-1, null, ["\n      "])), (n()(), i.\u0275ted(-1, null, ["\n    "])), (n()(), i.\u0275ted(-1, null, ["\n  "]))], null, function (n, e) {
        var l = e.component;
        n(e, 7, 0, i.\u0275inlineInterpolate(1, "", l.imageURLGetter.getUrl("menu/match_information.svg"), "")), n(e, 15, 0, l.translate("Match Information", l.display.lang)), n(e, 23, 0, l.competitionEdition), n(e, 28, 0, l.competitionRound), n(e, 36, 0, l.homeTeamName), n(e, 39, 0, l.awayTeamName), n(e, 45, 0, l.matchDateTime), n(e, 50, 0, l.stadiumName)
      })
    }

    function d(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 1, "match-info", [], null, null, null, c, s)), i.\u0275did(1, 49152, null, 0, u.MatchInformationComponent, [a.DisplayService, r.MatchService], null, null)], null, null)
    }
    e.RenderType_MatchInformationComponent = s, e.View_MatchInformationComponent_0 = c, e.View_MatchInformationComponent_Host_0 = d, e.MatchInformationComponentNgFactory = i.\u0275ccf("match-info", u.MatchInformationComponent, d, {}, {}, [])
  },
  gvjY: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.ACTION_FRAME = "FRAME", e.ACTION_HEATMAP = "HEATMAP", e.ACTION_MESSAGE = "MESSAGE", e.ACTION_NOOP = "NOOP", e.ACTION_CONTEXTUAL = "CONTEXTUAL", e.INSTRUCTION = "INSTRUCTION", e.EVENTS_AGE_IN_SECONDS = 10, e.DisplayAction = function () {}
  },
  ikkQ: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR"), e.PlayersService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getPlayers = function (n) {
        return void 0 === n && (n = ""), this.httpClient.get("/api/players/?search=" + n).map(function (n) {
          return n.results
        })
      }, n.prototype.addTeamPlayer = function (n) {
        return this.httpClient.post("/api/team_players/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n.prototype.deleteTeamPlayer = function (n) {
        return this.httpClient.delete("/api/team_players/" + n)
      }, n.prototype.createPlayer = function (n) {
        return this.httpClient.post("/api/players/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n
    }()
  },
  "j+m6": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR"), e.TeamsService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getTeams = function () {
        return this.httpClient.get("/api/teams/?limit=100000").map(function (n) {
          return n.results
        }).catch(function (n) {
          return console.log("getTeams", n), t.Observable.throw(n)
        })
      }, n.prototype.getTeamSeasonKits = function (n, e) {
        void 0 === e && (e = null);
        var l = "/api/team_season_kit/?team=" + n;
        return e && (l += "&season__start_date__lt=" + e + "&season__end_date__gt=" + e), this.httpClient.get(l).map(function (n) {
          return n.results
        })
      }, n.prototype.getTeamDetails = function (n) {
        return this.httpClient.get("/api/teams/" + n)
      }, n.prototype.patchTeam = function (n) {
        return this.httpClient.patch("/api/teams/" + n.id, JSON.stringify(n))
      }, n.prototype.createTeamSeasonKit = function (n) {
        return this.httpClient.post("/api/team_season_kit/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n
    }()
  },
  jDyY: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("4zOZ");
    l("bfOx"), l("owTz");
    var o = l("SALZ"),
      i = l("Zn+w"),
      u = l("Gvdl");
    e.DisplayService = function () {
      function n(n) {
        var e = this;
        this.route = n, this.isPerspectiveMode$ = new t.BehaviorSubject(!0), this.isZoomMode$ = new t.BehaviorSubject(!1), this.menuButtonClicked$ = new u.ReplaySubject(1), this.isInit$ = new t.BehaviorSubject(!1);
        var l = n.params.concatMap(function (n) {
            for (var l = e.route; l.firstChild;) l = l.firstChild;
            return l.params
          }).map(function (n) {
            e.matchId = +n.match_id
          }).first(),
          a = this.route.queryParams.map(function (n) {
            e.noRecognition = 1 == +n["no-recognition"], e.isDebug = 1 == +n.debug, e.lang = n.lang || "en", e.hideScore = 1 == +n["hide-score"], e.hideScoreBoard = 1 == +n["hide-scoreboard"], e.fullPerspective = 1 == +n["full-perspective"], e.fullPerspective && e.isPerspectiveMode$.next(!1);
            var l = n.referer || "";
            l && (e.adTagUrl = i.REFERER_ADS[l])
          }).first();
        o.forkJoin(l, a).do(function () {
          return e.isInit$.next(!0)
        }).subscribe(function (n) {
          console.log("DisplayService has been initialized !"), e.isPerspectiveMode$.subscribe(function (n) {
            return e.isPerspectiveMode = n
          }), e.isZoomMode$.subscribe(function (n) {
            return e.isZoomMode = n
          })
        })
      }
      return n.prototype.whenInit = function () {
        return this.isInit$.filter(function (n) {
          return !!n
        }).first()
      }, n
    }()
  },
  jKnT: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), e.UserMessageComponent = function () {
      function n() {
        this.created = 1
      }
      return n.prototype.ngOnInit = function () {
        this.htmlCode = this.notification.message
      }, n.prototype.onCloseAnimate = function () {
        this.created = 0, setTimeout(this.onClose, 200)
      }, n
    }()
  },
  joif: function (n, e, l) {
    "use strict";
    var t = this && this.__assign || Object.assign || function (n) {
      for (var e, l = 1, t = arguments.length; l < t; l++)
        for (var o in e = arguments[l]) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = e[o]);
      return n
    };
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("MDfR");
    var o = l("gvjY"),
      i = (l("L1ao"), l("Gvdl")),
      u = (l("D692"), l("D4Le")),
      a = l("Zn+w"),
      r = l("5pge"),
      s = l("PJh5"),
      c = (l("jDyY"), l("LfZH"));
    l("Mwnw"), e.EventService = function () {
      function n(n, e, l) {
        var t = this;
        this.stream = n, this.matchService = e, this.display = l, this.contextualEvents = [], this.instruction$ = new u.ResettableReplaySubject, this.instructions = [], this.currentStat = null, this.event_id = 0, this.timer = {
          m: 0,
          s: 0
        }, this.periodMap = [], this.scoreMap = [], this.scoreBoard = {
          frame: 0,
          home_score: 0,
          away_score: 0
        }, this.isMatchPlaying = !1, this.isTimeStreaming$ = new i.Subject, this.hasMatchEnded = !1, this.updateScoreBoard = function () {
          var n = t.scoreMap.filter(function (n) {
            return null !== n.frame
          }).slice(-1).pop();
          n && (t.scoreBoard = n)
        }, n.reconstructMatchState = this.reconstructMatchState.bind(this), this.instruction$.subscribe(function (n) {
          return t.updateCompositionsThroughInstruction(n, t.stream.lastCameraFrame)
        }), this.matchService.whenMatchInfoReady().do(this.updateStat.bind(this)).concatMap(function () {
          return t.matchService.whenInit()
        }).do(this.resetToStartState.bind(this)).do(this.initScoreAndTimer.bind(this)).concatMap(function () {
          return t.reconstructMatchState({
            fetchFromBack: !0,
            lastFrame: 1 / 0,
            applyNow: !0
          })
        }).do(this.updateStat.bind(this)).concatMap(function () {
          return n.whenInit()
        }).concatMap(function () {
          return t.reconstructMatchState({
            fetchFromBack: !1,
            lastFrame: n.lastCameraFrame,
            applyNow: !1
          })
        }).subscribe(), n.eventStream$.filter(function (n) {
          return !!n
        }).subscribe(function (n) {
          n.type == o.ACTION_CONTEXTUAL ? n.data.map(function (e) {
            return t.insertOrUpdateCE(e, n.frame)
          }) : n.type == o.INSTRUCTION && t.insertOrUpdateI(n.data, n.frame)
        })
      }
      return n.prototype.reconstructMatchState = function (n) {
        var e = this,
          l = n.fetchFromBack,
          o = n.lastFrame,
          u = n.applyNow;
        console.log("%c Reconstructing match state. Fetch: " + l + " lastFrame: " + o + " 'applyNow:', " + u, "background: #f00; color: white; font-size: 12px"), this.resetToStartState(), this.instruction$.reset();
        var a = new i.ReplaySubject;
        return l ? (this.instructions = [], this.matchService.getInstructions().concatMap(function (n) {
          return i.Observable.from(n)
        }).map(function (n) {
          return t({}, n.data, {
            frame: n.frame
          })
        }).subscribe({
          next: function (n) {
            a.next(n), e.instructions.push(n)
          },
          complete: function () {
            return a.complete()
          }
        })) : i.Observable.from(this.instructions).subscribe({
          next: function (n) {
            return a.next(n)
          },
          complete: function () {
            return a.complete()
          }
        }), a.map(function (n) {
          return t({}, n, {
            applyNow: u
          })
        }).filter(function (n) {
          return n.frame <= o
        }).subscribe(function (n) {
          return e.instruction$.next(n)
        }), a.toArray().do(function (n) {
          return console.log("Finally : ", n)
        })
      }, n.prototype.updateCompositionsThroughInstruction = function (n, e) {
        var l = this;
        console.log("applying instruction : ", n.subject);
        var o = n.applyNow ? 0 : 1e3 * (n.frame - e) / this.matchService.fps.video;
        o = Math.min(5e3, o);
        var i, u = this.matchService.composition.players.slice();
        switch (n.subject) {
          case "period":
            var a = void 0;
            "@match" == n.name ? (this.hasMatchEnded = !0, this.isMatchPlaying = !1, (a = this.periodMap.filter(function (n) {
              return null != n.start || null != n.end
            }).slice(-1).pop()) || (a = this.periodMap[0])) : a = this.periodMap.find(function (e) {
              return e.name == n.name
            }), n.hasOwnProperty("start") && (a.start = n.start), n.hasOwnProperty("end") && (a.end = n.end);
            var r = n.end || n.start;
            e >= r ? this.updateTimerMap(e) : (console.log("%c waiting for " + o + "ms before update with" + JSON.stringify(n), "border:2px solid black"), o ? setTimeout(function () {
              return l.updateTimerMap(r + 1)
            }, o) : this.updateTimerMap(r + 1));
            break;
          case "score":
            this.scoreMap.push(n), this.updateScoreBoard();
            var s = u.find(function (e) {
              return e.id == n.goal_scorer_id
            });
            s && (n.own_goal ? s.own_goal += n.cancelled ? -1 : 1 : s.goal += n.cancelled ? -1 : 1);
            break;
          case "card":
            i = u.find(function (e) {
              return e.id == n.player_id
            }), "yellow_red_card" == n.card_type ? (i.yellow_card = 1, i.red_card = 1) : "red_card" == n.card_type && n.cancelled ? (i.red_card = 0, i.end_time = null) : i[n.card_type] = 1, 1 == i.red_card && this.getMatchTime(n.frame).subscribe(function (n) {
              return i.end_time = n
            });
            break;
          case "injury":
            (i = u.find(function (e) {
              return e.id == n.player_id
            })).injured = "injury" === n.state;
            break;
          case "substitution":
            var c = u.find(function (e) {
                return e.id == n.player_in_id
              }),
              d = u.find(function (e) {
                return e.id == n.player_out_id
              });
            this.getMatchTime(n.frame).subscribe(function (n) {
              c.start_time = n, c.player_role = Object.assign({}, d.player_role), d.end_time = n
            });
            break;
          default:
            throw Error("Received unknown instruction: " + n)
        }
        this.matchService.composition = t({}, this.matchService.composition, {
          players: u
        })
      }, n.prototype.getMatchTime = function (n) {
        var e = this;
        return void 0 === n && (n = null), (n ? i.Observable.of(n) : this.stream.cameraStream$.filter(function (n) {
          return !!n
        }).take(1).map(function (n) {
          return n.frame
        })).map(function (n) {
          var l, t, o;
          return l = 0, (o = (t = e.periodMap.filter(function (n) {
            return null != n.end || null != n.start
          }).slice()).pop()) && (o.end ? (t.push(o), l = r.getPeriodsDurations(t, e.matchService.fps.video)) : l = (n - o.start) / e.matchService.fps.video + r.getPeriodsDurations(t, e.matchService.fps.video)), s().startOf("day").seconds(l).format("HH:mm:ss")
        }).timeout(500).catch(function (n) {
          return "TimeoutError" === n.name ? i.Observable.of("00:00:00") : i.Observable.throw(n)
        })
      }, n.prototype.resetToStartState = function () {
        this.hasMatchEnded = !1, this.isMatchPlaying = !1, this.matchService.resetCompo(), this.resetScoreAndTimer()
      }, n.prototype.getCurrentPeriod = function () {
        if (this.hasMatchEnded) return -1;
        var n = this.periodMap.filter(function (n) {
          return null != n.end || null != n.start
        }).slice();
        return n.length ? parseInt(n.pop().name.split("_")[1]) : 0
      }, n.prototype.handleNotPlayingMatch = function (n) {
        this.isTimeStreaming$.next(!1), this.isMatchPlaying = !1, this.updateStat(), this.timerBase = r.getPeriodsDurations(n, this.matchService.fps.video), this.updateTimer()
      }, n.prototype.updateTimerMap = function (n) {
        var e = this.periodMap.filter(function (n) {
            return null != n.end || null != n.start
          }).slice(),
          l = e.pop();
        if (!l || l.end && l.end < n) e.push(l), this.handleNotPlayingMatch(e);
        else {
          var t = (n - l.start) / this.matchService.fps.video;
          this.isMatchPlaying = !0, this.updateStat();
          var o = r.getPeriodsDurations(e, this.matchService.fps.video);
          this.timerBase = t + o, this.updateTimer(), this.isTimeStreaming$.next(!0)
        }
      }, n.prototype.initScoreAndTimer = function () {
        var n = this;
        this.resetScoreAndTimer(), this.timeStream$ = this.timeStreamer(), this.timeStream$.subscribe(function (e) {
          n.incrementTimer(e), n.updateTimer()
        })
      }, n.prototype.insertOrUpdateCE = function (n, e) {
        if (n.hasOwnProperty("src_id")) {
          var l = this.contextualEvents.findIndex(function (e) {
            return e.src_id == n.src_id
          });
          if (l > -1) return n.needs_update = !0, void(this.contextualEvents[l] = n)
        } else n.src_id = --this.event_id;
        n.frame = e, this.contextualEvents.push(n)
      }, n.prototype.insertOrUpdateI = function (n, e) {
        if (n.hasOwnProperty("src_id")) {
          var l = this.instructions.findIndex(function (e) {
            return e.src_id == n.src_id
          });
          if (l > -1) return this.instructions[l] = t({}, n, {
            frame: this.instructions[l].frame
          }), void this.reconstructMatchState({
            fetchFromBack: !1,
            lastFrame: this.stream.lastCameraFrame,
            applyNow: !0
          }).subscribe()
        } else n.src_id = --this.event_id;
        n.frame = e, this.instructions.push(n), this.instruction$.next(n)
      }, n.prototype.resetScoreAndTimer = function () {
        this.timer = {
          m: 0,
          s: 0
        }, this.timerBase = 0, this.periodMap = [{
          name: "period_1",
          start: null,
          end: null
        }, {
          name: "period_2",
          start: null,
          end: null
        }, {
          name: "period_3",
          start: null,
          end: null
        }, {
          name: "period_4",
          start: null,
          end: null
        }], this.scoreMap = [], this.scoreBoard = {
          frame: null,
          home_score: 0,
          away_score: 0
        }
      }, n.prototype.timeStreamer = function () {
        var n, e, l, t;
        return this.isTimeStreaming$.switchMap(function (o) {
          return o ? (n = Date.now(), e = 0, i.Observable.interval(1e3).map(function (o) {
            return t = Date.now() - n, l = Math.floor(t / 1e3) - e, e = Math.floor(t / 1e3), l
          })) : i.Observable.never()
        })
      }, n.prototype.incrementTimer = function (n) {
        void 0 === n && (n = 1), this.timerBase = n + this.timerBase
      }, n.prototype.updateTimer = function () {
        this.timer.m = Math.floor(this.timerBase / 60), this.timer.s = Math.floor(this.timerBase % 60)
      }, n.prototype.setCurrentStat = function (n, e) {
        void 0 === n && (n = ""), n || (n = "<p>" + this.matchService.composition.competition_edition.competition.name + "</p>\n                       <p>" + this.matchService.composition.stadium.name + "</p>", this.matchService.composition.referees && this.matchService.composition.referees.length && (n = n + "<p>" + c.translate("Referee", this.display.lang) + ": " + this.matchService.composition.referees[0].first_name + " " + this.matchService.composition.referees[0].last_name + "</p>")), this.currentStat = {
          type: o.ACTION_MESSAGE,
          data: {
            text: n
          },
          frame: e
        }, console.log("Current stat set to : ", this.currentStat)
      }, n.prototype.updateStat = function () {
        var n, e = this;
        if (this.matchService.coverage != a.PREMIUM_COVERAGE || this.isMatchPlaying) return this.setCurrentStat("", this.stream.lastCameraFrame);
        switch (this.getCurrentPeriod()) {
          case -1:
            n = "<p>" + c.translate("The match has ended<br>We hope you enjoyed it !", this.display.lang) + "</p>";
            break;
          case 0:
            if (n = "<p>" + c.translate("The match has not started yet", this.display.lang) + "</p>", !this.matchService.isLiveInfoReady) return i.Observable.interval(1e3).takeUntil(this.matchService.whenInit()).subscribe(function (l) {
              var t = (+new Date(e.matchService.composition.date_time) - +Date.now()) / 1e3;
              t >= 0 && (n = c.translate("The match will start in<br>" + u.secondsToStrDelay(t, e.display.lang), e.display.lang)), e.setCurrentStat(n, e.stream.lastCameraFrame)
            });
            break;
          case 1:
            n = "<p>" + c.translate("First half break<br>The match will resume soon", this.display.lang) + "</p>";
            break;
          case 2:
            n = "<p>" + c.translate("Second half break<br>The extra time will begin soon", this.display.lang) + "</p>";
            break;
          case 3:
            n = "<p>" + c.translate("The two teams are exchanging their positions<br>The match will resume soon", this.display.lang) + "</p>";
            break;
          case 4:
            n = "<p>" + c.translate("Penalty shootout<br>The kicker is heading to the penalty spot", this.display.lang) + "</p>"
        }
        this.setCurrentStat(n, this.stream.lastCameraFrame)
      }, n
    }()
  },
  jxg3: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("SLR8"),
      o = l("C4jB"),
      i = l("LfZH"),
      u = l("YaPU"),
      a = (l("J8vI"), l("jDyY"), function () {
        function n(n, e) {
          this.node = n, this.isOpen = e
        }
        return n.prototype.trigger = function () {
          this.isOpen ? this.close() : this.open(), this.isOpen = !this.isOpen
        }, n.prototype.open = function () {
          this.node.style.right = "0"
        }, n.prototype.close = function () {
          this.node.style.right = "-40%"
        }, n
      }());
    e.MenuSlider = a, e.MinimapMenuComponent = function () {
      function n(n, e, l) {
        var o = this;
        this._elem = n, this.display = e, this.positionService = l, this.imageGetter = t.images, e.whenInit().subscribe(function () {
          o.options = [{
            name: "Zoom",
            descriptionOpen: i.translate("Zoom In", e.lang),
            descriptionClosed: i.translate("Zoom Out", e.lang),
            iconOpen: o.imageGetter.getUrl("menu/zoom-open.svg"),
            iconClosed: o.imageGetter.getUrl("menu/zoom-close.svg"),
            icon: null,
            isTriggerable: !0,
            hide: e.fullPerspective
          }, {
            name: "View 2D/3D",
            description: i.translate("View 2D/3D", e.lang),
            icon: o.imageGetter.getUrl("menu/vue2D3D.svg"),
            hide: e.fullPerspective
          }, {
            name: "Match Information",
            description: i.translate("Match Information", e.lang),
            icon: o.imageGetter.getUrl("menu/match_information.svg")
          }, {
            name: "Lineup",
            description: i.translate("Lineup", e.lang),
            icon: o.imageGetter.getUrl("menu/lineup.svg")
          }, {
            name: "Match Sheet",
            description: i.translate("Match Sheet", e.lang),
            icon: o.imageGetter.getUrl("menu/roster.svg")
          }]
        })
      }
      return n.prototype.ngOnInit = function () {
        var n = this;
        this.display.menuButtonClicked$.filter(function (e) {
          return !!n.menuSlider && !!n.options
        }).subscribe(function (e) {
          "Menu" === e || "close" === e && n.menuSlider.isOpen ? n.menuSlider.trigger() : "Zoom" === e && n.options.find(function (n) {
            return "Zoom" === n.name
          }).triggerableElement.trigger()
        })
      }, n.prototype.ngAfterViewInit = function () {
        var n = this;
        u.Observable.interval(50).filter(function (e) {
          return !!n.options
        }).take(1).subscribe(function (e) {
          n.initTriggerables()
        })
      }, n.prototype.initTriggerables = function () {
        this.options.forEach(function (n) {
          n.isTriggerable && (n.triggerableElement = new o.Triggerable(document.querySelector("#triggerable-" + n.name), !1, n.iconOpen, n.iconClosed, n.descriptionOpen, n.descriptionClosed))
        }), this.menuSlider = new a(this._elem.nativeElement.querySelector("#menu-slider"), !1)
      }, n.prototype.activateOption = function (n) {
        var e = this.options.find(function (e) {
          return e.name === n
        });
        e.isTriggerable && e.triggerableElement.trigger(), this.menuSlider.trigger(), this.updateMinimapOptions(n)
      }, n.prototype.updateMinimapOptions = function (n) {
        switch (n) {
          case "Zoom":
            this.display.isPerspectiveMode && this.display.isPerspectiveMode$.next(!1), this.display.isZoomMode$.next(!this.display.isZoomMode), this.positionService.resetPastFrames();
            break;
          case "View 2D/3D":
            this.display.isZoomMode && (this.display.isZoomMode$.next(!1), this.display.menuButtonClicked$.next("Zoom")), this.display.isPerspectiveMode$.next(!this.display.isPerspectiveMode), this.positionService.resetPastFrames();
            break;
          case "Match Information":
          case "Lineup":
          case "Match Sheet":
            this.display.widgetToDisplay = n
        }
        this.display.menuButtonClicked$.next("close")
      }, n
    }()
  },
  ktH5: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), e.PendingRequestDirective = function () {
      function n(n) {
        this.el = n
      }
      return n.prototype.ngOnChanges = function (n) {
        1 == this.isPendingRequest && this.el.nativeElement.classList.add("pending-request"), 0 == this.isPendingRequest && this.el.nativeElement.classList.remove("pending-request")
      }, n
    }()
  },
  l5LN: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("YaPU");
    l("bAW0"), l("MQ0p"), l("QU7m"), l("fvZC"), l("PakY"), l("jDyY"), e.ImaAdsComponent = function () {
      function n(n, e) {
        this.console = n, this.display = e, this.showAds = !1, this.muted = !0, this.showPlay = !0
      }
      return n.prototype.ngAfterViewInit = function () {
        var n = this,
          e = document.createElement("script");
        e.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js", e.type = "text/javascript", document.getElementsByTagName("head")[0].appendChild(e), t.Observable.fromEvent(e, "load").take(1).timeout(1e4).catch(function (e) {
          return "TimeoutError" === e.name ? (n.onMissingGoogleImaLoader(), t.Observable.empty()) : t.Observable.throw(e)
        }).subscribe(function (e) {
          n.adContainerElement.nativeElement.style.zIndex = 1e3, n.showAds = !0
        })
      }, n.prototype.launchAds = function () {
        "undefined" != typeof google ? (this.ima = new o(this.adContainerElement.nativeElement, this.adVideoElement.nativeElement), this.ima.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.onAdsManagerLoaded.bind(this), !1), this.ima.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), !1), this.ima.adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(!0), this.requestAds()) : this.onMissingGoogleImaLoader()
      }, n.prototype.requestAds = function () {
        this.showPlay = !1;
        var n, e = new google.ima.AdsRequest;
        e.setAdWillAutoPlay(!1), e.setAdWillPlayMuted(!1), n = this.display.adTagUrl instanceof Array ? this.display.adTagUrl[Math.floor(Math.random() * this.display.adTagUrl.length)] : this.display.adTagUrl, e.adTagUrl = n;
        var l = this.adContainerElement.nativeElement.offsetWidth,
          t = this.adContainerElement.nativeElement.offsetHeight;
        e.linearAdSlotWidth = Math.max(l, 640), e.linearAdSlotHeight = Math.max(t, 360), e.nonLinearAdSlotWidth = l, e.nonLinearAdSlotHeight = 100, this.ima.adsLoader.requestAds(e)
      }, n.prototype.onAdsManagerLoaded = function (n) {
        this.ima.adsManager = n.getAdsManager(this.adVideoElement.nativeElement), this.processAdsManager()
      }, n.prototype.processAdsManager = function () {
        var n = this;
        this.ima.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdError.bind(this), !1), this.ima.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.onAdComplete.bind(this), !1), this.ima.adsManager.setVolume(this.muted ? 0 : 1);
        var e = this.adContainerElement.nativeElement.offsetWidth,
          l = this.adContainerElement.nativeElement.offsetHeight;
        this.ima.adsManager.init(e, l, google.ima.ViewMode.NORMAL), this.ima.adsManager.setVolume(this.muted ? 0 : 1), this.ima.adsManager.start(), this.ima.adsManager.setVolume(this.muted ? 0 : 1), t.Observable.interval(1e3).takeWhile(function (e) {
          return n.showAds
        }).subscribe(function (t) {
          n.adContainerElement.nativeElement.offsetWidth == e && n.adContainerElement.nativeElement.offsetHeight == l || n.ima.adsManager.resize(e = n.adContainerElement.nativeElement.offsetWidth, l = n.adContainerElement.nativeElement.offsetHeight, google.ima.ViewMode.NORMAL)
        })
      }, n.prototype.mute = function () {
        this.muted = !this.muted, this.ima && this.ima.adsManager && this.ima.adsManager.setVolume(this.muted ? 0 : 1)
      }, n.prototype.onAdError = function (n) {
        this.showAds = !1, this.adContainerElement.nativeElement.style.zIndex = 0, this.console.error("Ad error", n.getError()), this.ima.adsManager && this.ima.adsManager.destroy()
      }, n.prototype.onAdComplete = function (n) {
        this.showAds = !1, this.adContainerElement.nativeElement.style.zIndex = 0
      }, n.prototype.onMissingGoogleImaLoader = function () {
        this.console.warn("Missing googleImaLoader")
      }, n
    }();
    var o = function () {
      return function (n, e) {
        this.adDisplayContainer = new google.ima.AdDisplayContainer(n, e), this.adDisplayContainer.initialize(), this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer), this.adsManager = null
      }
    }();
    e.Ima = o
  },
  m4s2: function (n, e, l) {
    "use strict";
    var t = l("ILnZ"),
      o = l("sXaM"),
      i = l("WT6e"),
      u = l("9NDR"),
      a = l("D692"),
      r = l("jDyY"),
      s = i.\u0275crt({
        encapsulation: 0,
        styles: [t.styles, o.styles],
        data: {}
      });

    function c(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 5, "div", [
        ["class", "canvas-wrap map-container"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275eld(2, 0, null, null, 0, "canvas", [
        ["class", "compo-overlay"],
        ["id", "myCanvas"]
      ], null, null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n  "])), (n()(), i.\u0275eld(4, 0, null, null, 0, "img", [
        ["id", "compo"],
        ["style", "visibility: hidden"]
      ], [
        [8, "src", 4]
      ], null, null, null, null)), (n()(), i.\u0275ted(-1, null, ["\n"])), (n()(), i.\u0275ted(-1, null, ["\n"]))], null, function (n, e) {
        var l = e.component;
        n(e, 4, 0, i.\u0275inlineInterpolate(1, "", l._image.getUrl(l.display.fullPerspective ? "full_perspective_field.jpg" : "field.jpg"), ""))
      })
    }

    function d(n) {
      return i.\u0275vid(0, [(n()(), i.\u0275eld(0, 0, null, null, 1, "compositions", [], null, [
        ["window", "resize"]
      ], function (n, e, l) {
        var t = !0;
        return "window:resize" === e && (t = !1 !== i.\u0275nov(n, 1).resizeCanvas(l) && t), t
      }, c, s)), i.\u0275did(1, 4243456, null, 0, u.CompositionComponent, [i.ElementRef, a.MatchService, r.DisplayService], null, null)], null, null)
    }
    e.RenderType_CompositionComponent = s, e.View_CompositionComponent_0 = c, e.View_CompositionComponent_Host_0 = d, e.CompositionComponentNgFactory = i.\u0275ccf("compositions", u.CompositionComponent, d, {}, {}, [])
  },
  mOI5: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("SLR8"),
      o = l("LfZH"),
      i = l("Zn+w");
    l("OE0E"), l("jDyY"), l("D692"), e.MatchSheetComponent = function () {
      function n(n, e, l) {
        var i = this;
        this._sanitizer = n, this.display = e, this.matchService = l, this.teamColors = {
          home: "",
          away: ""
        }, this.matchPlayers = {
          homePlayers: [],
          awayPlayers: [],
          homeSubstitutes: [],
          awaySubstitutes: []
        }, this.translate = o.translate, this.imageURLGetter = t.images, this.matchService.whenMatchInfoReady().subscribe(function () {
          i.updateMatchContext(), i.updateOnFieldPlayers()
        })
      }
      return n.prototype.getTrustedImage = function (n) {
        return this._sanitizer.bypassSecurityTrustStyle("url(" + this.imageURLGetter.getUrl(n) + ")")
      }, n.prototype.onResize = function (n) {
        n.preventDefault(), this.infosRefreshPlayerName()
      }, n.prototype.infosRefreshPlayerName = function () {
        var n = document.getElementsByClassName("infos-player");
        n.length > 0 && Array.prototype.forEach.call(n, function (n) {
          var e = n.parentNode,
            l = e.getElementsByClassName("infos-icons"),
            t = 0;
          l.length > 0 && (t = l.item(0).offsetWidth), n.style.maxWidth = Math.floor(e.clientWidth - t) - 2 + "px"
        })
      }, n.prototype.ngAfterViewInit = function () {
        this.infosRefreshPlayerName(), setTimeout(this.infosRefreshPlayerName, 1e3)
      }, n.prototype.updateMatchContext = function () {
        var n = this.matchService.composition.referees[0],
          e = this.matchService.composition.home_team.coach,
          l = this.matchService.composition.away_team.coach;
        n && (this.refereeName = this.factoredName(n)), e && (this.homeCoachName = this.factoredName(e)), l && (this.awayCoachName = this.factoredName(l)), this.teamColors.home = this.matchService.composition.home_team_color, this.teamColors.away = this.matchService.composition.away_team_color
      }, n.prototype.updateOnFieldPlayers = function () {
        var n = this,
          e = i.getSortedRoles(),
          l = this.matchService.composition.players;
        l.sort(function (n, l) {
          return e.indexOf(n.player_role.name) - e.indexOf(l.player_role.name)
        }), this.matchPlayers = {
          homePlayers: [],
          awayPlayers: [],
          homeSubstitutes: [],
          awaySubstitutes: []
        }, l.map(function (e) {
          e.team_id == n.matchService.composition.home_team.id ? "00:00:00" != e.start_time ? n.matchPlayers.homeSubstitutes.push(e) : n.matchPlayers.homePlayers.push(e) : e.team_id == n.matchService.composition.away_team.id && ("00:00:00" != e.start_time ? n.matchPlayers.awaySubstitutes.push(e) : n.matchPlayers.awayPlayers.push(e))
        })
      }, n.prototype.factoredName = function (n) {
        return n.first_name && n.last_name ? n.first_name[0] + ". " + n.last_name : n.first_name || n.last_name
      }, n
    }()
  },
  nHVU: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("bfOx"),
      i = l("Xjw4"),
      u = l("UuY2"),
      a = t.\u0275crt({
        encapsulation: 2,
        styles: [],
        data: {}
      });

    function r(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 15, "div", [
        ["style", "display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; height: 60%"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(2, 0, null, null, 4, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(4, 0, null, null, 1, "p", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["This url does not exist!"])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275eld(8, 0, null, null, 6, "div", [], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(10, 0, null, null, 3, "a", [
        ["class", "btn btn-default"]
      ], [
        [1, "target", 0],
        [8, "href", 4]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var o = !0;
        return "click" === e && (o = !1 !== t.\u0275nov(n, 11).onClick(l.button, l.ctrlKey, l.metaKey, l.shiftKey) && o), o
      }, null, null)), t.\u0275did(11, 671744, null, 0, o.RouterLinkWithHref, [o.Router, o.ActivatedRoute, i.LocationStrategy], {
        routerLink: [0, "routerLink"]
      }, null), t.\u0275pad(12, 1), (n()(), t.\u0275ted(-1, null, ["Get back home"])), (n()(), t.\u0275ted(-1, null, ["\n  "])), (n()(), t.\u0275ted(-1, null, ["\n"])), (n()(), t.\u0275ted(-1, null, ["\n"]))], function (n, e) {
        n(e, 11, 0, n(e, 12, 0, "/home"))
      }, function (n, e) {
        n(e, 10, 0, t.\u0275nov(e, 11).target, t.\u0275nov(e, 11).href)
      })
    }

    function s(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 1, "ng-component", [], null, null, null, r, a)), t.\u0275did(1, 49152, null, 0, u.PageNotFoundComponent, [], null, null)], null, null)
    }
    e.RenderType_PageNotFoundComponent = a, e.View_PageNotFoundComponent_0 = r, e.View_PageNotFoundComponent_Host_0 = s, e.PageNotFoundComponentNgFactory = t.\u0275ccf("ng-component", u.PageNotFoundComponent, s, {}, {}, [])
  },
  oPSX: function (n, e, l) {
    "use strict";
    e.styles = ["[_nghost-%COMP%]     .ball-sprite{position:relative;width:48px;height:48px;-webkit-animation:1s steps(24) infinite play;animation:1s steps(24) infinite play;z-index:999}.motion-blur-0[_ngcontent-%COMP%], .motion-blur-1[_ngcontent-%COMP%], .motion-blur-2[_ngcontent-%COMP%]{position:relative}[_nghost-%COMP%]     .motion-blur-0{-webkit-filter:blur(1px);filter:blur(1px)}[_nghost-%COMP%]     .motion-blur-1{-webkit-filter:blur(2px);filter:blur(2px)}[_nghost-%COMP%]     .motion-blur-2{-webkit-filter:blur(3px);filter:blur(3px)}[_nghost-%COMP%]     .paused-drawing{-webkit-transition-property:opacity width transform;transition-property:opacity width transform;-webkit-transition-duration:2s;transition-duration:2s;opacity:.4}[_nghost-%COMP%]     .resuming-drawing{-webkit-animation:1s resume-opacity;animation:1s resume-opacity}@-webkit-keyframes resume-opacity{0%{opacity:.4}100%{opacity:1}}@keyframes resume-opacity{0%{opacity:.4}100%{opacity:1}}@-webkit-keyframes play{0%{background-position:0}100%{background-position:-1152px}}@keyframes play{0%{background-position:0}100%{background-position:-1152px}}\n/*# sourceMappingURL=ball-effects.css.map*/"]
  },
  p764: function (n, e, l) {
    "use strict";
    var t = l("WT6e"),
      o = l("7DMc"),
      i = l("Xjw4"),
      u = l("Kmda"),
      a = l("ItHS"),
      r = l("WtMm"),
      s = l("BAgd"),
      c = t.\u0275crt({
        encapsulation: 0,
        styles: [""],
        data: {}
      });

    function d(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 3, "option", [], null, null, null, null, null)), t.\u0275did(1, 147456, null, 0, o.NgSelectOption, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), t.\u0275did(2, 147456, null, 0, o.\u0275q, [t.ElementRef, t.Renderer2, [8, null]], {
        value: [0, "value"]
      }, null), (n()(), t.\u0275ted(-1, null, ["\n          "]))], function (n, e) {
        var l = e.component;
        n(e, 1, 0, l.getName(e.context.$implicit)), n(e, 2, 0, l.getName(e.context.$implicit))
      }, null)
    }

    function p(n) {
      return t.\u0275vid(0, [t.\u0275qud(671088640, 1, {
        controls: 1
      }), (n()(), t.\u0275ted(-1, null, ["\n    "])), (n()(), t.\u0275eld(2, 0, null, null, 21, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(4, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"],
        ["for", "referee"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Select a referee"])), (n()(), t.\u0275ted(-1, null, ["\n      \n      "])), (n()(), t.\u0275eld(7, 0, null, null, 15, "div", [
        ["class", "col-sm-6"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(9, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["list", "referees"],
        ["name", "referee"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "focusout"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 10)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 10).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 10)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 10)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.refereeName = l) && o), "input" === e && (o = !1 !== i.onRefereeSelected() && o), "focusout" === e && (o = !1 !== i.checkRefereeIntegrity() && o), o
      }, null, null)), t.\u0275did(10, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(12, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(14, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(16, 0, null, null, 5, "datalist", [
        ["id", "referees"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          "])), (n()(), t.\u0275and(16777216, null, null, 2, null, d)), t.\u0275did(19, 802816, null, 0, i.NgForOf, [t.ViewContainerRef, t.TemplateRef, t.IterableDiffers], {
        ngForOf: [0, "ngForOf"]
      }, null), t.\u0275pid(131072, i.AsyncPipe, [t.ChangeDetectorRef]), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      \n\n    "])), (n()(), t.\u0275ted(-1, null, ["\n\n    "])), (n()(), t.\u0275eld(25, 0, null, null, 30, "div", [
        ["class", "form-group row"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(27, 0, null, null, 1, "label", [
        ["class", "col-sm-2 col-form-label"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["Or add a new referee to the list"])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(30, 0, null, null, 8, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(32, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-referee-name"],
        ["placeholder", "Last name"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 33)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 33).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 33)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 33)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newReferee.last_name = l) && o), o
      }, null, null)), t.\u0275did(33, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(35, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(37, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(40, 0, null, null, 8, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(42, 0, null, null, 5, "input", [
        ["class", "form-control"],
        ["name", "new-referee-name"],
        ["placeholder", "First name"],
        ["type", "text"]
      ], [
        [2, "ng-untouched", null],
        [2, "ng-touched", null],
        [2, "ng-pristine", null],
        [2, "ng-dirty", null],
        [2, "ng-valid", null],
        [2, "ng-invalid", null],
        [2, "ng-pending", null]
      ], [
        [null, "ngModelChange"],
        [null, "input"],
        [null, "blur"],
        [null, "compositionstart"],
        [null, "compositionend"]
      ], function (n, e, l) {
        var o = !0,
          i = n.component;
        return "input" === e && (o = !1 !== t.\u0275nov(n, 43)._handleInput(l.target.value) && o), "blur" === e && (o = !1 !== t.\u0275nov(n, 43).onTouched() && o), "compositionstart" === e && (o = !1 !== t.\u0275nov(n, 43)._compositionStart() && o), "compositionend" === e && (o = !1 !== t.\u0275nov(n, 43)._compositionEnd(l.target.value) && o), "ngModelChange" === e && (o = !1 !== (i.newReferee.first_name = l) && o), o
      }, null, null)), t.\u0275did(43, 16384, null, 0, o.DefaultValueAccessor, [t.Renderer2, t.ElementRef, [2, o.COMPOSITION_BUFFER_MODE]], null, null), t.\u0275prd(1024, null, o.NG_VALUE_ACCESSOR, function (n) {
        return [n]
      }, [o.DefaultValueAccessor]), t.\u0275did(45, 671744, [
        [1, 4]
      ], 0, o.NgModel, [
        [8, null],
        [8, null],
        [8, null],
        [2, o.NG_VALUE_ACCESSOR]
      ], {
        name: [0, "name"],
        model: [1, "model"]
      }, {
        update: "ngModelChange"
      }), t.\u0275prd(2048, null, o.NgControl, null, [o.NgModel]), t.\u0275did(47, 16384, null, 0, o.NgControlStatus, [o.NgControl], null, null), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275eld(50, 0, null, null, 4, "div", [
        ["class", "col-sm-3"]
      ], null, null, null, null, null)), (n()(), t.\u0275ted(-1, null, ["\n        "])), (n()(), t.\u0275eld(52, 0, null, null, 1, "button", [
        ["class", "btn btn-success"],
        ["type", "button"]
      ], [
        [8, "disabled", 0]
      ], [
        [null, "click"]
      ], function (n, e, l) {
        var t = !0;
        return "click" === e && (t = !1 !== n.component.addReferee() && t), t
      }, null, null)), (n()(), t.\u0275ted(-1, null, ["\n          Add and select referee\n        "])), (n()(), t.\u0275ted(-1, null, ["\n      "])), (n()(), t.\u0275ted(-1, null, ["\n    "]))], function (n, e) {
        var l = e.component;
        n(e, 12, 0, "referee", l.refereeName), n(e, 19, 0, t.\u0275unv(e, 19, 0, t.\u0275nov(e, 20).transform(l.refereeOptions$))), n(e, 35, 0, "new-referee-name", l.newReferee.last_name), n(e, 45, 0, "new-referee-name", l.newReferee.first_name)
      }, function (n, e) {
        var l = e.component;
        n(e, 9, 0, t.\u0275nov(e, 14).ngClassUntouched, t.\u0275nov(e, 14).ngClassTouched, t.\u0275nov(e, 14).ngClassPristine, t.\u0275nov(e, 14).ngClassDirty, t.\u0275nov(e, 14).ngClassValid, t.\u0275nov(e, 14).ngClassInvalid, t.\u0275nov(e, 14).ngClassPending), n(e, 32, 0, t.\u0275nov(e, 37).ngClassUntouched, t.\u0275nov(e, 37).ngClassTouched, t.\u0275nov(e, 37).ngClassPristine, t.\u0275nov(e, 37).ngClassDirty, t.\u0275nov(e, 37).ngClassValid, t.\u0275nov(e, 37).ngClassInvalid, t.\u0275nov(e, 37).ngClassPending), n(e, 42, 0, t.\u0275nov(e, 47).ngClassUntouched, t.\u0275nov(e, 47).ngClassTouched, t.\u0275nov(e, 47).ngClassPristine, t.\u0275nov(e, 47).ngClassDirty, t.\u0275nov(e, 47).ngClassValid, t.\u0275nov(e, 47).ngClassInvalid, t.\u0275nov(e, 47).ngClassPending), n(e, 52, 0, "" === l.newReferee.first_name && "" === l.newReferee.last_name)
      })
    }

    function m(n) {
      return t.\u0275vid(0, [(n()(), t.\u0275eld(0, 0, null, null, 2, "admin-choose-referee", [], null, null, null, p, c)), t.\u0275prd(512, null, u.RefereesService, u.RefereesService, [a.HttpClient]), t.\u0275did(2, 573440, null, 0, r.ChooseRefereeComponent, [u.RefereesService, s.NotificationService, o.NgForm], null, null)], null, null)
    }
    e.RenderType_ChooseRefereeComponent = c, e.View_ChooseRefereeComponent_0 = p, e.View_ChooseRefereeComponent_Host_0 = m, e.ChooseRefereeComponentNgFactory = t.\u0275ccf("admin-choose-referee", r.ChooseRefereeComponent, m, {
      referee: "referee"
    }, {
      refereeChange: "refereeChange"
    }, [])
  },
  puWn: function (n, e, l) {
    "use strict";
    e.styles = [".input-autocomplete[_ngcontent-%COMP%]{width:80%}.input-autocomplete[_ngcontent-%COMP%] > input[_ngcontent-%COMP%] + ul[_ngcontent-%COMP%]{width:100%;list-style-type:none;padding:0;border:1px solid #ccc;display:None}.input-autocomplete[_ngcontent-%COMP%] > input[_ngcontent-%COMP%] + ul[_ngcontent-%COMP%]:hover{display:block}.input-autocomplete[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]{width:100%}.input-autocomplete[_ngcontent-%COMP%] > input[_ngcontent-%COMP%]:focus + ul[_ngcontent-%COMP%]{display:block}.input-autocomplete[_ngcontent-%COMP%] > input[_ngcontent-%COMP%] + ul[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]:hover{background:#beb4a6}.pending-request[_ngcontent-%COMP%]{opacity:.75;cursor:progress;pointer-events:none}"]
  },
  "pxu+": function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e"), l("Zkkf"), l("bfOx");
    var t = l("MBVx"),
      o = l("FjE5");
    e.CompositionViewComponent = function () {
      function n(n, e) {
        var l = this;
        this.compositionsService = n, this.route = e, e.params.subscribe(function (n) {
          l.match_id = +n.match_id, l.lang = n.lang || "en"
        }), this.objectBindings = new t.ObjectBindings
      }
      return n.prototype.ngOnInit = function () {
        var n = this;
        this.compositionsService.getMatch(this.match_id, this.lang).subscribe(function (e) {
          n.compositions = o.setColorsOnComposition(e), console.log("this.compositions", n.compositions)
        })
      }, n
    }()
  },
  sXaM: function (n, e, l) {
    "use strict";
    e.styles = ["@import url(https://fonts.googleapis.com/css?family=Saira+Semi+Condensed|Saira+Condensed:700);li[_ngcontent-%COMP%]{list-style-type:none}p[_ngcontent-%COMP%], ul[_ngcontent-%COMP%]{padding:0;margin:0}*[_ngcontent-%COMP%]{-webkit-box-sizing:content-box;box-sizing:content-box}.box-shadow[_ngcontent-%COMP%]{-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.box-shadow-hover[_ngcontent-%COMP%]{-webkit-box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22);box-shadow:0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.22)}.display-flex[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex}.flex-row[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.flex-column[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.flex-wrap[_ngcontent-%COMP%]{-ms-flex-wrap:wrap;flex-wrap:wrap}.flex-nowrap[_ngcontent-%COMP%]{-ms-flex-wrap:nowrap;flex-wrap:nowrap}.border-radius-4px[_ngcontent-%COMP%]{border-radius:4px}.white-bold-text[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-align:center}.scale-150p[_ngcontent-%COMP%]{-webkit-transform:scale(1.5);transform:scale(1.5);z-index:9999999}.scale-130p[_ngcontent-%COMP%]{-webkit-transform:scaleY(1.3) scaleX(1.1);transform:scaleY(1.3) scaleX(1.1);z-index:9999999}.centered-text[_ngcontent-%COMP%]{margin-left:50%;margin-top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%)}.scoreboard-btn[_ngcontent-%COMP%]{position:absolute;height:23%;width:4.7%;border-radius:4px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);-webkit-transition:.3s cubic-bezier(.25,.8,.25,1);transition:.3s cubic-bezier(.25,.8,.25,1)}.greyed[_ngcontent-%COMP%]{opacity:.3}.inner-modal[_ngcontent-%COMP%]{width:100%;height:100%;position:absolute;z-index:999999}h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{margin:0;padding:0}.debug[_ngcontent-%COMP%]{position:absolute;bottom:0;margin-left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);color:#fff;background:#000;z-index:7;font-size:calc(8px + .6vw);width:80%;text-align:center}.display_wrapper[_ngcontent-%COMP%]{font-family:'Saira Semi Condensed',sans-serif;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;width:100%;height:100%;top:0;left:0;z-index:1000;-webkit-box-shadow:inset 0 0 90px 15px rgba(0,0,0,.6);box-shadow:inset 0 0 90px 15px rgba(0,0,0,.6)}h1[_ngcontent-%COMP%]{font-family:'Saira Condensed',sans-serif}.events_container[_ngcontent-%COMP%]{width:95%;height:92%;top:4%;left:2.5%;position:absolute;color:#fbf9f1;background-color:rgba(0,0,0,.6);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-ms-flex-pack:distribute;justify-content:space-around}.event_box[_ngcontent-%COMP%], .noop_box[_ngcontent-%COMP%]{height:60%;border-radius:2px;-ms-flex-item-align:center;align-self:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.event_box[_ngcontent-%COMP%]{height:85%;-webkit-box-flex:0;-ms-flex:0 0 49%;flex:0 0 49%;width:49%}.event_box[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;margin-top:1%}.event_box[_ngcontent-%COMP%] > .icon-container[_ngcontent-%COMP%]{-webkit-box-flex:3!important;-ms-flex:3!important;flex:3!important;width:100%!important;padding:1%!important;overflow:hidden}.event_box[_ngcontent-%COMP%] > .icon-container[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{width:100%;max-height:100%}.illustrated-info[_ngcontent-%COMP%]{min-width:0;max-width:100%}.illustrated-info[_ngcontent-%COMP%] > .img-container[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:10%}.illustrated-info[_ngcontent-%COMP%] > .text-container[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;width:80%;max-width:80%}.illustrated-info[_ngcontent-%COMP%]   .text-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{margin:auto 0;white-space:nowrap}.illustrated-info[_ngcontent-%COMP%] > .img-container[_ngcontent-%COMP%] > img[_ngcontent-%COMP%]{margin-top:100%;height:35%;margin-right:20%;float:right}.noop_box[_ngcontent-%COMP%]{width:60%;-webkit-box-flex:0;-ms-flex:0 0 60%;flex:0 0 60%;margin:auto}.icon-container[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:0;-ms-flex:0 2 20%;flex:0 2 20%;justify-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.logo-container[_ngcontent-%COMP%]{width:50%}.standalone-match-info[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%]{width:36%;margin-left:32%}.logo[_ngcontent-%COMP%]{margin:auto auto auto 25%;width:50%}.text-descr[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%;-webkit-box-flex:8;-ms-flex:8;flex:8;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.event_team[_ngcontent-%COMP%]{margin:auto;white-space:nowrap}.event_title[_ngcontent-%COMP%]{font-weight:700}.event_title[_ngcontent-%COMP%], .event_title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:calc(36px);text-align:center}.event_title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]::after{content:'';display:block;width:100%;color:#fbf9f1;border-bottom:2px solid #fff;margin:0 auto 2px}.description[_ngcontent-%COMP%]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:3;-ms-flex:3;flex:3;text-align:center}h3[_ngcontent-%COMP%]{font-size:20px}.description[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-align:center;font-size:calc(8px + 1vw);margin:auto}@media (max-width:800px){.event_title[_ngcontent-%COMP%], .event_title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:calc(12px + 2vw)}.events_container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:calc(8px + 1vw)}.events_container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:calc(12px + 1vw)}.event-box[_ngcontent-%COMP%]{height:100%}}@media (max-height:576.00052px){.event_title[_ngcontent-%COMP%], .event_title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:calc(12px + 2vw)}.events_container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:calc(8px + 1vw)}.events_container[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:calc(12px + 1vw)}.event-box[_ngcontent-%COMP%]{height:100%}}@-webkit-keyframes containerFadeIn{0%{opacity:0;-webkit-transform:scale(1.2);transform:scale(1.2)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.eventContainerFadeIn[_ngcontent-%COMP%]{-webkit-animation-name:containerFadeIn;animation-name:containerFadeIn;-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}@keyframes containerFadeIn{0%{opacity:0;-webkit-transform:scale(1.2);transform:scale(1.2)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.eventFadeInVertical[_ngcontent-%COMP%]{-webkit-animation-name:fadeInVertical;animation-name:fadeInVertical;-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes fadeInVertical{0%{opacity:0;-webkit-transform:translateY(40%) translateZ(0);transform:translateY(40%) translateZ(0)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes fadeInVertical{0%{opacity:0;-webkit-transform:translateY(40%) translateZ(0);transform:translateY(40%) translateZ(0)}100%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}.eventFadeInHorizontal[_ngcontent-%COMP%]{-webkit-animation-name:fadeInHorizontal;animation-name:fadeInHorizontal;-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-timing-function:linear;animation-timing-function:linear}@-webkit-keyframes fadeInHorizontal{0%{-webkit-transform:translateX(20%) translateZ(0);transform:translateX(20%) translateZ(0)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes fadeInHorizontal{0%{-webkit-transform:translateX(20%) translateZ(0);transform:translateX(20%) translateZ(0)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}.eventMoveDown[_ngcontent-%COMP%]{-webkit-animation-name:moveDown;animation-name:moveDown;-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-timing-function:cubic-bezier(.22,.68,0,1.71);animation-timing-function:cubic-bezier(.22,.68,0,1.71)}@-webkit-keyframes moveDown{0%{-webkit-transform:translateX(80%) translateZ(0);transform:translateX(80%) translateZ(0)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes moveDown{0%{-webkit-transform:translateX(80%) translateZ(0);transform:translateX(80%) translateZ(0)}100%{-webkit-transform:translateX(0);transform:translateX(0)}}.eventFadeAway[_ngcontent-%COMP%]{-webkit-animation-name:fadeAway;animation-name:fadeAway;-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-timing-function:cubic-bezier(.22,.68,0,1.71);animation-timing-function:cubic-bezier(.22,.68,0,1.71)}@-webkit-keyframes fadeAway{0%{position:absolute;opacity:.8;-webkit-transform:translateX(0) scale(1) translateZ(0);transform:translateX(0) scale(1) translateZ(0)}100%{position:absolute;opacity:0;-webkit-transform:translateX(-100%) scale(0);transform:translateX(-100%) scale(0)}}@keyframes fadeAway{0%{position:absolute;opacity:.8;-webkit-transform:translateX(0) scale(1) translateZ(0);transform:translateX(0) scale(1) translateZ(0)}100%{position:absolute;opacity:0;-webkit-transform:translateX(-100%) scale(0);transform:translateX(-100%) scale(0)}}.noopFadeIn[_ngcontent-%COMP%]{-webkit-animation-name:containerFadeIn;animation-name:containerFadeIn;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}@-webkit-keyframes bounceIn{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-300px,0,0);transform:translate3d(-300px,0,0)}60%{opacity:.8;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes bounceIn{60%,75%,90%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:translate3d(-300px,0,0);transform:translate3d(-300px,0,0)}60%{opacity:.8;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}.noopFadeOut[_ngcontent-%COMP%]{-webkit-animation-name:fadeOutLateral;animation-name:fadeOutLateral;-webkit-animation-duration:.4s;animation-duration:.4s;-webkit-animation-timing-function:cubic-bezier(.22,.68,0,1.71);animation-timing-function:cubic-bezier(.22,.68,0,1.71)}@-webkit-keyframes fadeOutLateral{0%{opacity:1}100%{opacity:0}}@keyframes fadeOutLateral{0%{opacity:1}100%{opacity:0}}.match-info-elements[_ngcontent-%COMP%]{list-style-type:none;height:100%;font-size:calc(10px + 1vw);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding-bottom:15%}.match-info-elements[_ngcontent-%COMP%] > li[_ngcontent-%COMP%]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;text-align:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.match-info-team[_ngcontent-%COMP%]{font-size:calc(12px + 1.2vw)!important;font-weight:900}.match-info-elements[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > p[_ngcontent-%COMP%]{margin:auto}.opaque[_ngcontent-%COMP%]{opacity:0}"]
  },
  sxR1: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("WT6e");
    var t = l("SLR8"),
      o = l("6tqK"),
      i = l("tPzB"),
      u = l("FjE5"),
      a = l("5pge"),
      r = l("4EQH"),
      s = l("gvjY");
    l("u//w"), l("HUv8"), l("VwFy"), l("EKDC"), l("/+N7");
    var c = l("LfZH");
    l("D692"), l("PakY"), l("J8vI"), l("jDyY"), l("joif"), e.MinimapComponent = function () {
      function n(n, e, l, o, u, a) {
        this._elem = n, this.matchService = e, this.display = l, this.console = o, this.positionService = u, this.eventService = a, this.durationBeforeMatchInfo = 0, this._image = t.images, this.translate = c.translate, this._canvasUtils = new i.CanvasUtils, this.isDisplayingStats = !1, this.currentlyDisplayedEvents = new Set, this.nEventsToDisplay = 0, this.eventPosition = {
          x: null,
          y: null
        }, this.isDisplayingNoop = !0
      }
      return n.prototype.ngAfterViewInit = function () {
        this.initMap().subscribe(this.render.bind(this))
      }, n.prototype.initMap = function () {
        var n = this;
        return this.matchService.whenInit().map(function (e) {
          var l;
          r.isIOS() ? (n.console.log("Setting HTML Drawer for iOS"), l = o.HTMLDrawer) : (n.console.log("Setting Canvas Drawer for non-iOS device"), l = o.CanvasDrawer), n.drawer = new l(n._elem.nativeElement.querySelector("#map-image"), n._elem.nativeElement.querySelector("#map-canvas"), n._image, n.matchService.fps.target, n._elem.nativeElement.querySelector(".map-container")), n.display.fullPerspective && n.drawer.setFullPerspectiveMode(), n.display.isZoomMode$.subscribe(function (e) {
            return n.drawer.updateZoomMode(e)
          }), n.display.isPerspectiveMode$.filter(function () {
            return !n.display.fullPerspective
          }).subscribe(function (e) {
            return n.drawer.updatePerspectiveMode(e)
          }), n.renderStat(), n.durationBeforeMatchInfo = 10
        })
      }, n.prototype.onResize = function (n) {
        n.preventDefault(), this.drawer && this.drawer.onResize()
      }, n.prototype.drawObjects = function (n) {
        var e = u.getDrawablesInfo(n, this.matchService.composition);
        this.drawer.draw(e)
      }, n.prototype.clear = function () {
        this.heatmap && this.heatmap._renderer.ctx.clearRect(0, 0, this.heatmap._renderer.canvas.width, this.heatmap._renderer.canvas.height)
      }, n.prototype.animateEventsDisplay = function (n) {
        var e = n[0],
          l = n[1],
          t = n[2];
        1 == this.nEventsToDisplay ? (a.openEventContainer(e.nativeElement.parentNode), a.displayCurrentEvent(e)) : 2 == this.nEventsToDisplay ? (a.displayCurrentEvent(l), a.displayPreviousEvent(e)) : this.nEventsToDisplay > 2 && (a.displayCurrentEvent(t), a.displayPreviousEvent(l), a.displayExitEvent(e))
      }, n.prototype.render = function () {
        var n = this;
        this.positionService.getRefinedStream().subscribe(function (e) {
          var l = e.data,
            t = e.frame,
            o = e.type;
          switch (o) {
            case s.ACTION_FRAME:
              l && n.renderActionFrame(t, l);
              break;
            case s.ACTION_NOOP:
              n.renderActionNoop(t, l);
              break;
            default:
              n.console.error("Unknown action type:", o)
          }
          n.display.isDebug && (n.currentDebugFrame = t)
        })
      }, n.prototype.resetEvents = function () {
        this.nEventsToDisplay = 0, this.eventPosition = {
          x: null,
          y: null
        }, a.resetEventsDivs(this.eventsDivs), this.currentlyDisplayedEvents = new Set
      }, n.prototype.applyToNoop = function (n) {
        var e = this;
        if (this.noop.length > 0) return n.apply(this);
        this.noop.changes.skipWhile(function () {
          return e.noop.length < 1
        }).take(1).subscribe(function () {
          n.apply(e)
        })
      }, n.prototype.renderActionFrame = function (n, e) {
        var l = this;
        this.clear(), this.drawObjects(e), this.isDisplayingStats = !1, this.isDisplayingNoop && this.applyToNoop(function () {
          return a.displayExitNoop.bind(l)(l.noop.first)
        }), this.drawer.isPaused && this.drawer.resume(), "wide shot" === this.matchService.videoType ? this.renderEvent(n) : this.resetEvents()
      }, n.prototype.renderActionNoop = function (n, e) {
        this.isDisplayingStats || this.nEventsToDisplay || this.clear(), this.renderEvent(n), 0 === this.nEventsToDisplay && (this.drawer.isPaused || this.drawer.pause(n), n - this.drawer.pauseFrame > this.durationBeforeMatchInfo * this.matchService.fps.video && this.renderStat())
      }, n.prototype.whenEventDivsReady = function () {
        var n = this;
        return this.eventsDivs.changes.startWith(this.eventsDivs.length).skipWhile(function () {
          return n.eventsDivs.length < 3
        }).take(1)
      }, n.prototype.renderEvent = function (n) {
        var e = this,
          l = !0;
        this.eventService.contextualEvents.filter(function (t) {
          if (!t) return !1;
          t.needs_update && e.whenEventDivsReady().subscribe(function () {
            var n = e.eventsDivs.find(function (n) {
              return n.nativeElement.getAttribute("data-event-src-id") == t.src_id
            });
            n && a.populateEventDiv(n, t, e._image, e.matchService.composition, e.display.lang), t.needs_update = !1
          });
          var o = !e.currentlyDisplayedEvents.has(t.src_id),
            i = ("wide shot" === e.matchService.videoType ? .5 : 1) * s.EVENTS_AGE_IN_SECONDS * e.matchService.fps.video,
            u = Math.abs(n - t.frame) < i;
          return l = l && !u, o && u
        }).map(function (n) {
          e.clear(), e.isDisplayingNoop && e.applyToNoop(function () {
            return a.displayExitNoop.bind(e)(e.noop.first)
          }), e.isDisplayingStats = !1, e.nEventsToDisplay += 1;
          var l = Math.min(e.nEventsToDisplay - 1, 2);
          e.whenEventDivsReady().subscribe(function () {
            var t = e.eventsDivs.toArray();
            e.nEventsToDisplay > 3 && a.moveDiv(t[l], t[l - 1]), a.populateEventDiv(t[l], n, e._image, e.matchService.composition, e.display.lang), e.animateEventsDisplay(t)
          }), null != n.x && null != n.y && (e.eventPosition = {
            x: n.x,
            y: n.y
          }), e.currentlyDisplayedEvents.add(n.src_id)
        }), "wide shot" !== this.matchService.videoType && this.eventService.isMatchPlaying || !l || this.resetEvents(), this.nEventsToDisplay > 0 && null != this.eventPosition.x && null != this.eventPosition.y && this.clear()
      }, n.prototype.renderStat = function () {
        var n = this;
        this.eventService.currentStat && (this.eventService.currentStat.type == s.ACTION_HEATMAP ? (this.drawHeatmap(this._elem.nativeElement.querySelector(".map-container"), this.eventService.currentStat.data), this.isDisplayingNoop && this.applyToNoop(function () {
          return a.displayExitNoop.bind(n)(n.noop.first)
        })) : this.isDisplayingNoop || (this.isDisplayingNoop = !0, this.applyToNoop(function () {
          return a.displayEnterNoop.bind(n)(n.noop.first)
        })), this.isDisplayingStats = !0)
      }, n.prototype.drawHeatmap = function (n, e) {
        var l = this,
          t = e.heatmap,
          o = e.text;
        this.heatmap || (this.heatmap = h337.create({
          container: n
        }));
        var i = Object.assign({}, t);
        i.data = t.data.map(function (n) {
          var e = Object.assign({}, n);
          return e.x = n.x * l.heatmap._renderer.canvas.width, e.y = n.y * l.heatmap._renderer.canvas.height, e.x = Number(e.x.toFixed(2)), e.y = Number(e.y.toFixed(2)), e
        }), this.heatmap.setData(i), this._canvasUtils.drawTextOrHtml(this.heatmap._renderer.canvas, o, "")
      }, n
    }()
  },
  tPzB: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    var t = l("Zn+w"),
      o = l("4EQH");
    e.CanvasUtils = function () {
      function n() {
        this.eventPositionFrame = 0
      }
      return n.prototype.drawEventPosition = function (n, e, l) {
        var t = [n * l.x, n * l.y],
          o = t[0],
          i = t[1];
        this.eventPositionFrame = (this.eventPositionFrame + .08) % 6;
        var u = Math.cos(this.eventPositionFrame) + 1.5;
        this.setStyle(e, ""), e.beginPath(), e.arc(o, i, 2 * n, 0, 2 * Math.PI, !0), e.fill(), e.closePath(), this.setStyle(e, "Red"), e.beginPath(), e.arc(o, i, 4 * u * n, 0, 2 * Math.PI, !0), e.closePath(), this.stroke(e, "red", 2)
      }, n.prototype.clearRect = function (n) {
        n.getContext("2d").clearRect(0, 0, n.width, n.height)
      }, n.prototype.setStyle = function (n, e) {
        n.fillStyle = e, n.strokeStyle = e
      }, n.prototype.setStyleTransparent = function (n, e) {
        var l = parseInt(e.substring(1, 3), 16),
          t = parseInt(e.substring(3, 5), 16),
          o = parseInt(e.substring(5, 7), 16);
        n.fillStyle = "rgba( " + String(l) + ", " + String(t) + ", " + String(o) + ", 0.5)", n.strokeStyle = "rgba( " + String(l) + ", " + String(t) + ", " + String(o) + ", 0.5)"
      }, n.prototype.getAccentColor = function (n) {
        return parseInt(n.substring(1, 3), 16) + parseInt(n.substring(3, 5), 16) + parseInt(n.substring(5, 7), 16) > 382.5 ? "#000000" : "#FFFFFF"
      }, n.prototype.drawRect = function (n, e, l, t, o, i) {
        i.strokeRect(n *= o, e *= o, l *= o, t *= o)
      }, n.prototype.drawFillRect = function (n, e, l, t, o, i) {
        i.fillRect(n *= o, e *= o, l *= o, t *= o)
      }, n.prototype.drawGradLine = function (n, e, l, t, o, i, u, a) {
        o || (o = 1);
        var r = n * o,
          s = l * o,
          c = e * o,
          d = t * o,
          p = i.createLinearGradient(r, c, s, d);
        p.addColorStop(0, u), p.addColorStop(1, a), i.strokeStyle = p, i.lineWidth *= 2, i.beginPath(), i.moveTo(r, c), i.lineTo(s, d), i.stroke(), i.lineWidth /= 2
      }, n.prototype.drawLine = function (n, e, l, t, o, i) {
        n *= o, l *= o, e *= o, t *= o, i.lineWidth *= 3, i.beginPath(), i.moveTo(n, e), i.lineTo(l, t), i.stroke(), i.lineWidth /= 3
      }, n.prototype.drawText = function (n, e, l, t, o, i) {
        if (void 0 === i && (i = null), n = n.toUpperCase(), i > 0)
          for (; o.measureText(n).width / 2 > 1.3 * i;) n = n.slice(0, -1);
        e -= o.measureText(n).width / 2, o.fillText(n, e *= t, l *= t)
      }, n.prototype.drawGradText = function (n, e, l, t, o, i, u, a, r) {
        var s = u.createLinearGradient(e * i, l * i, t * i, o * i);
        s.addColorStop(0, a), s.addColorStop(1, r);
        var c = (e + t) / 2,
          d = (l + o) / 2;
        c -= u.measureText(n).width / 2, c *= i, d *= i, u.fillStyle = s, u.fillText(n, c, d)
      }, n.prototype.stroke = function (n, e, l) {
        void 0 === e && (e = null), void 0 === l && (l = 1), e && (n.strokeStyle = e);
        var t = n.lineWidth;
        n.lineWidth = l, n.stroke(), n.lineWidth = t
      }, n.prototype.drawCircle = function (n, e, l, o, i, u, a, r, s) {
        void 0 === s && (s = !1), n *= u, e *= u, o ? this.setStyleTransparent(a, i) : this.setStyle(a, i), a.beginPath(), a.font = "bold " + Math.round(9.5 * u) + "px Arial", a.arc(n, e, 7.5 * u, 0, 2 * Math.PI, !0), a.closePath(), a.fill(), this.stroke(a, "black", .4), Number.isInteger(parseInt(l)) ? s || (this.setStyle(a, this.getAccentColor(i)), a.fillText(l, n - a.measureText(l).width / 2, e + 3 * u)) : "R" === l && (this.setStyle(a, this.getAccentColor(i)), a.fillText("R", n - a.measureText("R").width / 2, e + 3 * u)), void 0 == r || s || (a.beginPath(), a.arc(n, e, 12 * u, 0, 2 * Math.PI, !0), a.closePath(), this.stroke(a, t.TAG_COLORS[r % t.TAG_COLORS.length], 3))
      }, n.prototype.drawBall = function (n, e, l, t, o) {
        n *= t, e *= t, this.setStyle(o, l), o.beginPath(), o.arc(n, e, 4 * t, 0, 2 * Math.PI, !0), o.closePath(), o.fill(), this.stroke(o, "black", .5)
      }, n.prototype.drawCompoBall = function (n, e, l, t, o, i) {
        this.setStyle(o, l), o.beginPath(), o.arc(n, e, 10 * t, 0, 2 * Math.PI, !0), o.closePath(), o.fill(), this.stroke(o, i)
      }, n.prototype.drawRoundRect = function (n, e, l, t, o, i, u) {
        var a = (n *= i) + l,
          r = (e *= i) + t;
        u.beginPath(), u.moveTo(n + o, e), u.lineTo(a - o, e), u.quadraticCurveTo(a, e, a, e + o), u.lineTo(a, e + t - o), u.quadraticCurveTo(a, r, a - o, r), u.lineTo(n + o, r), u.quadraticCurveTo(n, r, n, r - o), u.lineTo(n, e + o), u.quadraticCurveTo(n, e, n + o, e), this.stroke(u, "white")
      }, n.prototype.drawJersey = function (n, e, l, i, u, a, r, s) {
        var c = this;
        void 0 === a && (a = 1), void 0 === r && (r = !1), void 0 === s && (s = void 0);
        var d = 40 * a,
          p = new Image;
        p.onload = function () {
          i.drawImage(p, n - d / 2, e - d / 2, d, d), e -= 15 * a, c.setStyle(i, u), i.beginPath(), i.moveTo(n, e), i.fill(), c.setStyle(i, c.getAccentColor(u));
          var o = i.font;
          i.font = 13 * a + "px sans-serif", i.fillText(l, n - i.measureText(l).width / 2, e + 16 * a), i.font = o, (r || void 0 != s) && c.stroke(i, void 0 != s ? t.TAG_COLORS[s % t.TAG_COLORS.length] : "#7D26CD", 4)
        }, p.src = o.getColoredJersey(u, d)
      }, n.prototype.drawTextOrHtml = function (n, e, l, t) {
        void 0 === l && (l = "#0A7541"), void 0 === t && (t = 3.8);
        var o = n.getContext("2d");
        /<[a-z][\s\S]*>/i.test(e) || (e = '\n        <div style="width: 90%; text-align: center; position: absolute; top: 50%; left: 50%; transform: translateX(-50%) translateY(-50%);">\n          <span>' + (e = e.replace(/\n/g, "<br/>")) + "</span>\n        </div>\n      ");
        var i = "data:image/svg+xml;utf8," + encodeURIComponent('\n        <svg xmlns="http://www.w3.org/2000/svg" width="' + n.width + 'px" height="' + n.height + 'px">\n          <foreignObject width="100%" height="100%">\n            <div xmlns="http://www.w3.org/1999/xhtml">\n              <div style="height: 100vh; background-color: ' + l + "; font: " + t + 'vw arial; color: white;}">\n                ' + e + "\n              </div>\n            </div>\n          </foreignObject>\n        </svg>\n    "),
          u = new Image;
        u.src = i, u.onload = function () {
          o.drawImage(u, 0, 0)
        }
      }, n
    }()
  },
  tkqE: function (n, e, l) {
    "use strict";
    e.styles = ["input[_ngcontent-%COMP%]{color:#000}"]
  },
  uslO: function (n, e, l) {
    var t = {
      "./af": "3CJN",
      "./af.js": "3CJN",
      "./ar": "3MVc",
      "./ar-dz": "tkWw",
      "./ar-dz.js": "tkWw",
      "./ar-kw": "j8cJ",
      "./ar-kw.js": "j8cJ",
      "./ar-ly": "wPpW",
      "./ar-ly.js": "wPpW",
      "./ar-ma": "dURR",
      "./ar-ma.js": "dURR",
      "./ar-sa": "7OnE",
      "./ar-sa.js": "7OnE",
      "./ar-tn": "BEem",
      "./ar-tn.js": "BEem",
      "./ar.js": "3MVc",
      "./az": "eHwN",
      "./az.js": "eHwN",
      "./be": "3hfc",
      "./be.js": "3hfc",
      "./bg": "lOED",
      "./bg.js": "lOED",
      "./bm": "hng5",
      "./bm.js": "hng5",
      "./bn": "aM0x",
      "./bn.js": "aM0x",
      "./bo": "w2Hs",
      "./bo.js": "w2Hs",
      "./br": "OSsP",
      "./br.js": "OSsP",
      "./bs": "aqvp",
      "./bs.js": "aqvp",
      "./ca": "wIgY",
      "./ca.js": "wIgY",
      "./cs": "ssxj",
      "./cs.js": "ssxj",
      "./cv": "N3vo",
      "./cv.js": "N3vo",
      "./cy": "ZFGz",
      "./cy.js": "ZFGz",
      "./da": "YBA/",
      "./da.js": "YBA/",
      "./de": "DOkx",
      "./de-at": "8v14",
      "./de-at.js": "8v14",
      "./de-ch": "Frex",
      "./de-ch.js": "Frex",
      "./de.js": "DOkx",
      "./dv": "rIuo",
      "./dv.js": "rIuo",
      "./el": "CFqe",
      "./el.js": "CFqe",
      "./en-au": "Sjoy",
      "./en-au.js": "Sjoy",
      "./en-ca": "Tqun",
      "./en-ca.js": "Tqun",
      "./en-gb": "hPuz",
      "./en-gb.js": "hPuz",
      "./en-ie": "ALEw",
      "./en-ie.js": "ALEw",
      "./en-il": "QZk1",
      "./en-il.js": "QZk1",
      "./en-nz": "dyB6",
      "./en-nz.js": "dyB6",
      "./eo": "Nd3h",
      "./eo.js": "Nd3h",
      "./es": "LT9G",
      "./es-do": "7MHZ",
      "./es-do.js": "7MHZ",
      "./es-us": "INcR",
      "./es-us.js": "INcR",
      "./es.js": "LT9G",
      "./et": "XlWM",
      "./et.js": "XlWM",
      "./eu": "sqLM",
      "./eu.js": "sqLM",
      "./fa": "2pmY",
      "./fa.js": "2pmY",
      "./fi": "nS2h",
      "./fi.js": "nS2h",
      "./fo": "OVPi",
      "./fo.js": "OVPi",
      "./fr": "tzHd",
      "./fr-ca": "bXQP",
      "./fr-ca.js": "bXQP",
      "./fr-ch": "VK9h",
      "./fr-ch.js": "VK9h",
      "./fr.js": "tzHd",
      "./fy": "g7KF",
      "./fy.js": "g7KF",
      "./gd": "nLOz",
      "./gd.js": "nLOz",
      "./gl": "FuaP",
      "./gl.js": "FuaP",
      "./gom-latn": "+27R",
      "./gom-latn.js": "+27R",
      "./gu": "rtsW",
      "./gu.js": "rtsW",
      "./he": "Nzt2",
      "./he.js": "Nzt2",
      "./hi": "ETHv",
      "./hi.js": "ETHv",
      "./hr": "V4qH",
      "./hr.js": "V4qH",
      "./hu": "xne+",
      "./hu.js": "xne+",
      "./hy-am": "GrS7",
      "./hy-am.js": "GrS7",
      "./id": "yRTJ",
      "./id.js": "yRTJ",
      "./is": "upln",
      "./is.js": "upln",
      "./it": "FKXc",
      "./it.js": "FKXc",
      "./ja": "ORgI",
      "./ja.js": "ORgI",
      "./jv": "JwiF",
      "./jv.js": "JwiF",
      "./ka": "RnJI",
      "./ka.js": "RnJI",
      "./kk": "j+vx",
      "./kk.js": "j+vx",
      "./km": "5j66",
      "./km.js": "5j66",
      "./kn": "gEQe",
      "./kn.js": "gEQe",
      "./ko": "eBB/",
      "./ko.js": "eBB/",
      "./ky": "6cf8",
      "./ky.js": "6cf8",
      "./lb": "z3hR",
      "./lb.js": "z3hR",
      "./lo": "nE8X",
      "./lo.js": "nE8X",
      "./lt": "/6P1",
      "./lt.js": "/6P1",
      "./lv": "jxEH",
      "./lv.js": "jxEH",
      "./me": "svD2",
      "./me.js": "svD2",
      "./mi": "gEU3",
      "./mi.js": "gEU3",
      "./mk": "Ab7C",
      "./mk.js": "Ab7C",
      "./ml": "oo1B",
      "./ml.js": "oo1B",
      "./mn": "CqHt",
      "./mn.js": "CqHt",
      "./mr": "5vPg",
      "./mr.js": "5vPg",
      "./ms": "ooba",
      "./ms-my": "G++c",
      "./ms-my.js": "G++c",
      "./ms.js": "ooba",
      "./mt": "oCzW",
      "./mt.js": "oCzW",
      "./my": "F+2e",
      "./my.js": "F+2e",
      "./nb": "FlzV",
      "./nb.js": "FlzV",
      "./ne": "/mhn",
      "./ne.js": "/mhn",
      "./nl": "3K28",
      "./nl-be": "Bp2f",
      "./nl-be.js": "Bp2f",
      "./nl.js": "3K28",
      "./nn": "C7av",
      "./nn.js": "C7av",
      "./pa-in": "pfs9",
      "./pa-in.js": "pfs9",
      "./pl": "7LV+",
      "./pl.js": "7LV+",
      "./pt": "ZoSI",
      "./pt-br": "AoDM",
      "./pt-br.js": "AoDM",
      "./pt.js": "ZoSI",
      "./ro": "wT5f",
      "./ro.js": "wT5f",
      "./ru": "ulq9",
      "./ru.js": "ulq9",
      "./sd": "fW1y",
      "./sd.js": "fW1y",
      "./se": "5Omq",
      "./se.js": "5Omq",
      "./si": "Lgqo",
      "./si.js": "Lgqo",
      "./sk": "OUMt",
      "./sk.js": "OUMt",
      "./sl": "2s1U",
      "./sl.js": "2s1U",
      "./sq": "V0td",
      "./sq.js": "V0td",
      "./sr": "f4W3",
      "./sr-cyrl": "c1x4",
      "./sr-cyrl.js": "c1x4",
      "./sr.js": "f4W3",
      "./ss": "7Q8x",
      "./ss.js": "7Q8x",
      "./sv": "Fpqq",
      "./sv.js": "Fpqq",
      "./sw": "DSXN",
      "./sw.js": "DSXN",
      "./ta": "+7/x",
      "./ta.js": "+7/x",
      "./te": "Nlnz",
      "./te.js": "Nlnz",
      "./tet": "gUgh",
      "./tet.js": "gUgh",
      "./tg": "5SNd",
      "./tg.js": "5SNd",
      "./th": "XzD+",
      "./th.js": "XzD+",
      "./tl-ph": "3LKG",
      "./tl-ph.js": "3LKG",
      "./tlh": "m7yE",
      "./tlh.js": "m7yE",
      "./tr": "k+5o",
      "./tr.js": "k+5o",
      "./tzl": "iNtv",
      "./tzl.js": "iNtv",
      "./tzm": "FRPF",
      "./tzm-latn": "krPU",
      "./tzm-latn.js": "krPU",
      "./tzm.js": "FRPF",
      "./ug-cn": "To0v",
      "./ug-cn.js": "To0v",
      "./uk": "ntHu",
      "./uk.js": "ntHu",
      "./ur": "uSe8",
      "./ur.js": "uSe8",
      "./uz": "XU1s",
      "./uz-latn": "/bsm",
      "./uz-latn.js": "/bsm",
      "./uz.js": "XU1s",
      "./vi": "0X8Q",
      "./vi.js": "0X8Q",
      "./x-pseudo": "e/KL",
      "./x-pseudo.js": "e/KL",
      "./yo": "YXlc",
      "./yo.js": "YXlc",
      "./zh-cn": "Vz2w",
      "./zh-cn.js": "Vz2w",
      "./zh-hk": "ZUyn",
      "./zh-hk.js": "ZUyn",
      "./zh-tw": "BbgG",
      "./zh-tw.js": "BbgG"
    };

    function o(n) {
      return l(i(n))
    }

    function i(n) {
      var e = t[n];
      if (!(e + 1)) throw new Error("Cannot find module '" + n + "'.");
      return e
    }
    o.keys = function () {
      return Object.keys(t)
    }, o.resolve = i, n.exports = o, o.id = "uslO"
  },
  vUAE: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), l("ItHS");
    var t = l("YaPU");
    l("MDfR"), e.CoachesService = function () {
      function n(n) {
        this.httpClient = n
      }
      return n.prototype.getCoaches = function () {
        return this.httpClient.get("/api/coaches/?limit=100000").map(function (n) {
          return n.results
        }).catch(function (n) {
          return console.log("getCoaches", n), t.Observable.throw(n)
        })
      }, n.prototype.addCoach = function (n) {
        return this.httpClient.post("/api/coaches/", JSON.stringify(n)).catch(function (n) {
          return t.Observable.throw(n)
        })
      }, n
    }()
  },
  vqlA: function (n, e, l) {
    "use strict";
    e.styles = ["@import url(https://fonts.googleapis.com/css?family=Saira+Semi+Condensed|Saira+Condensed:700);.compo-infos[_ngcontent-%COMP%]{width:100%;height:100%;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:\"Saira Semi Condensed\",sans-serif;color:#898a8b;font-size:20px;font-weight:500;text-transform:uppercase;line-height:normal;padding:25px 0}.compo-infos[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]{margin:0;padding:0;-webkit-box-sizing:border-box;box-sizing:border-box}.compo-infos[_ngcontent-%COMP%]   .infos-name[_ngcontent-%COMP%]{color:#fff}.compo-infos[_ngcontent-%COMP%]   .infos-referee[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5em}.compo-infos[_ngcontent-%COMP%]   .infos-teams[_ngcontent-%COMP%]{white-space:nowrap}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]{width:50%;display:inline-block;vertical-align:top;white-space:nowrap;line-height:1.25em;padding:0 5%}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .team-disk-color[_ngcontent-%COMP%]{content:'';display:inline-block;height:16.24px;width:16.24px;border-radius:50%;margin-right:11.2px;vertical-align:baseline;position:relative;top:2.4px;float:left}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-coach[_ngcontent-%COMP%]{margin-bottom:25px}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]{width:60%;display:inline-block;list-style:none;color:#fff}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]:last-child{width:40%}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{clear:left}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-player[_ngcontent-%COMP%]{display:block;float:left;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]{display:block;float:left}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   [class^=infos-icon-][_ngcontent-%COMP%]{display:inline-block;font-size:13.6px;height:1em;margin-left:4px}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-goal[_ngcontent-%COMP%], .compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-in[_ngcontent-%COMP%], .compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-out[_ngcontent-%COMP%], .compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-own-goal[_ngcontent-%COMP%]{width:1em}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-red[_ngcontent-%COMP%], .compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-yellow[_ngcontent-%COMP%]{width:.636em}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .infos-icons[_ngcontent-%COMP%]   .infos-icon-goal-sum[_ngcontent-%COMP%]{width:.2em;font-size:.6em;text-transform:none;margin-left:-5%;margin-right:6%}.compo-infos[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-list[_ngcontent-%COMP%]   li.title[_ngcontent-%COMP%]{color:#898a8b;margin-bottom:25px}.full-perspective[_ngcontent-%COMP%]{padding:2px 0;background-color:rgba(40,40,40,.6)}.full-perspective[_ngcontent-%COMP%]   .infos-referee[_ngcontent-%COMP%]{margin-bottom:.2em}.full-perspective[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]{line-height:1.17em}.full-perspective[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-coach[_ngcontent-%COMP%]{margin-bottom:9px}.full-perspective[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{margin-bottom:9px!important}@media (max-width:800px){[class^=infos-icon-][_ngcontent-%COMP%]{font-size:1.7vw!important;margin-left:.5vw!important}.compo-infos[_ngcontent-%COMP%]{font-size:2.5vw!important;padding:3.125vw 0!important}.infos-coach[_ngcontent-%COMP%]{margin-bottom:3.125vw!important}.team-disk-color[_ngcontent-%COMP%]{height:2.03vw!important;width:2.03vw!important;margin-right:1.4vw!important;top:.3vw!important}.title[_ngcontent-%COMP%]{margin-bottom:3.125vw!important}.full-perspective[_ngcontent-%COMP%]{padding:2px 0}.full-perspective[_ngcontent-%COMP%]   .infos-referee[_ngcontent-%COMP%]{margin-bottom:.2em}}@media (max-height:576.00052px) and (orientation:landscape){[class^=infos-icon-][_ngcontent-%COMP%]{color:red;font-size:2.36110898vh!important;margin-left:.69444382vh!important}.compo-infos[_ngcontent-%COMP%]{font-size:3.47221909vh!important;padding:4.34027386vh 0!important}.infos-coach[_ngcontent-%COMP%]{margin-bottom:4.34027386vh!important}.team-disk-color[_ngcontent-%COMP%]{height:2.8194419vh!important;width:2.8194419vh!important;margin-right:1.94444269vh!important;top:.41666629vh!important}.title[_ngcontent-%COMP%]{margin-bottom:4.34027386vh!important}}@media (max-height:456.62497496px) and (orientation:landscape){.full-perspective[_ngcontent-%COMP%]   .infos-referee[_ngcontent-%COMP%]{margin-bottom:.2em}.full-perspective[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   .infos-coach[_ngcontent-%COMP%]{margin-bottom:1.97098286vh}.full-perspective[_ngcontent-%COMP%]   .infos-team[_ngcontent-%COMP%]   li.title[_ngcontent-%COMP%]{margin-bottom:1.97098286vh!important}}"]
  },
  wBdC: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.Player = function () {
      return function (n, e, l, o, i) {
        void 0 === n && (n = -1), void 0 === e && (e = ""), void 0 === l && (l = ""), void 0 === o && (o = new t), void 0 === i && (i = null), this.first_name = e, this.last_name = l, this.player_role = o, this.number = i, this.id = n
      }
    }();
    var t = function (n, e) {
      void 0 === n && (n = -1), void 0 === e && (e = ""), this.id = n, this.name = e
    };
    e.PlayerRole = t
  },
  wtpC: function (n, e, l) {
    "use strict";

    function t(n) {
      for (var e = 0, l = 0; l < n.length; l++) e += n[l];
      return e
    }
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.regression = function (n, e, l, o) {
      if ((o = o || .5) < 0) throw new RangeError("Bandwidth has to be a positive number.");
      if (!e) throw new TypeError("Numeric y must be supplied. For density estimationuse .density() function");
      if (0 == ("function" == typeof l)) throw new TypeError("Kernel function has to be supplied.");
      var i, u = n,
        a = e,
        r = (function (n, e, l, t) {
          return n((t - l) / e)
        }).bind(null, l, o);
      return i = function (n) {
          var e = u.map(function (e) {
            return r(n, e)
          });
          return t(e.map(function (n, e) {
            return n * a[e]
          })) / t(e)
        },
        function (n) {
          return 0 == ("[object Array]" === Object.prototype.toString.call(n)) ? i(n) : n.map(function (n) {
            return i(n)
          })
        }
    }, e.epanechnikov = function (n) {
      return Math.abs(n) <= 1 ? .75 * (1 - n * n) : 0
    }, e.tricube = function (n) {
      return Math.abs(n) <= 1 ? 70 / 81 * function (n) {
        var e = 1 - Math.pow(Math.abs(n), 3);
        return Math.pow(e, 3)
      }(n) : 0
    }, e.KalmanFilter = function () {
      function n(n) {
        var e = void 0 === n ? {} : n,
          l = e.R,
          t = e.Q,
          o = void 0 === t ? 1 : t,
          i = e.A,
          u = void 0 === i ? 1 : i,
          a = e.B,
          r = void 0 === a ? 0 : a,
          s = e.C,
          c = void 0 === s ? 1 : s;
        this.R = void 0 === l ? 1 : l, this.Q = o, this.A = u, this.C = c, this.B = r, this.cov = NaN, this.x = NaN
      }
      return n.prototype.filter = function (n, e) {
        if (void 0 === e && (e = 0), isNaN(this.x)) this.x = 1 / this.C * n, this.cov = 1 / this.C * this.Q * (1 / this.C);
        else {
          var l = this.predict(e),
            t = this.uncertainty(),
            o = t * this.C * (1 / (this.C * t * this.C + this.Q));
          this.x = l + o * (n - this.C * l), this.cov = t - o * this.C * t
        }
        return this.x
      }, n.prototype.predict = function (n) {
        return void 0 === n && (n = 0), this.A * this.x + this.B * n
      }, n.prototype.uncertainty = function () {
        return this.A * this.cov * this.A + this.R
      }, n.prototype.lastMeasurement = function () {
        return this.x
      }, n.prototype.setMeasurementNoise = function (n) {
        this.Q = n
      }, n.prototype.setProcessNoise = function (n) {
        this.R = n
      }, n
    }()
  },
  zvWE: function (n, e, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.getEmptySeasonKit = function () {
      return {
        team: void 0,
        name: "",
        season_id: void 0,
        kit_color: {
          jersey_color: "#000000",
          number_color: "#ffffff",
          short_color: "#000000"
        }
      }
    }, e.checkFormIntegrity = function (n, e, l, t) {
      void 0 === t && (t = null), null == t && (t = function (n) {
        return n.hasOwnProperty("name") ? n.name : void 0
      });
      var o = n && void 0 != n.id && t(n) === e;
      return o || e && (console.log("service Notif"), l.addNotification({
        type: "warning",
        message: "<b>" + e + "</b> is not on the list.<br> Please select a valid name or create a new one.",
        ttl: 2e3
      })), o
    }, e.getName = function (n) {
      return n.last_name + " " + n.first_name
    }
  }
}, [0]);
//# sourceMappingURL=main.e1edb41a3d20b12565ce.bundle.js.map
