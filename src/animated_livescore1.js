(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animated_livescore1_atlas_", frames: [[0,0,110,56],[0,58,23,23]]}
];


// symbols:



(lib.CachedTexturedBitmap_1 = function() {
	this.initialize(ss["animated_livescore1_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.tennisBall = function() {
	this.initialize(ss["animated_livescore1_atlas_"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.onCourt_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedTexturedBitmap_1();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.6898,0.6898);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.onCourt_Layer_1, null, null);


(lib.ballMC_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.tennisBall();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.ballMC_Layer_1, null, null);


(lib.onCourt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.onCourt_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(38,19.3,1,1,0,0,0,38,19.3);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.onCourt, new cjs.Rectangle(0,0,75.9,38.7), null);


(lib.ballMC = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.ballMC_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(11.5,11.5,1,1,0,0,0,11.5,11.5);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.ballMC, new cjs.Rectangle(0,0,23,23), null);


(lib.Scene_1_onCourt = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// onCourt
	this.instance = new lib.onCourt();
	this.instance.parent = this;
	this.instance.setTransform(359,21.05,0.7249,0.7249,0,0,0,37.8,19.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(37).to({_off:false},0).wait(5));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC13
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(358.8,16.2,0.5393,0.5393,10.7427,0,0,11.8,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(36).to({alpha:1},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC12
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(330.6,13.55,0.5753,0.5753,10.7421,0,0,11.7,11.8);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(33).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC11
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(302.8,16,0.6112,0.6112,10.7419,0,0,11.7,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(30).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC10
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(272.15,26.9,0.6472,0.6472,10.7432,0,0,11.6,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(27).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC9
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(244.7,40.75,0.6831,0.6831,10.7439,0,0,11.7,11.6);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(24).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC8
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(214.85,62.05,0.7191,0.7191,10.7439,0,0,11.7,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(21).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC7
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(188.2,85,0.7551,0.7551,10.7431,0,0,11.6,11.6);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC6
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(159.25,113.9,0.773,0.773,10.7428,0,0,11.6,11.6);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(15).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC5
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(132,144.85,0.809,0.809,10.7434,0,0,11.7,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(3).to({alpha:0.4414},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC4
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(103.25,180.55,0.8449,0.8449,10.7433,0,0,11.6,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(9).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(3).to({alpha:0.4414},0).wait(3).to({alpha:0.3711},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC3
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(76.1,217.4,0.8809,0.8809,10.7429,0,0,11.7,11.7);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(3).to({alpha:0.4414},0).wait(3).to({alpha:0.3711},0).wait(3).to({alpha:0.3008},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC2
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(48.65,256.4,0.8989,0.8989,10.7442,0,0,11.6,11.6);
	this.instance.alpha = 0.0195;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({alpha:1},0).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(3).to({alpha:0.4414},0).wait(3).to({alpha:0.3711},0).wait(3).to({alpha:0.3008},0).wait(3).to({alpha:0.2305},0).wait(6));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_ballMC1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// ballMC1
	this.instance = new lib.ballMC();
	this.instance.parent = this;
	this.instance.setTransform(18.85,303,0.8989,0.8989,10.7442,0,0,11.6,11.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({alpha:0.9297},0).wait(3).to({alpha:0.8594},0).wait(3).to({alpha:0.7891},0).wait(3).to({alpha:0.7188},0).wait(3).to({alpha:0.6484},0).wait(3).to({alpha:0.5781},0).wait(3).to({alpha:0.5117},0).wait(3).to({alpha:0.4414},0).wait(3).to({alpha:0.3711},0).wait(3).to({alpha:0.3008},0).wait(3).to({alpha:0.2305},0).wait(3).to({alpha:0.1602},0).wait(6));

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.animated_livescore1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.getNumChildren() - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_41 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(41).call(this.frame_41).wait(1));

	// ballMC13_obj_
	this.ballMC13 = new lib.Scene_1_ballMC13();
	this.ballMC13.name = "ballMC13";
	this.ballMC13.parent = this;
	this.ballMC13.setTransform(358.7,16.1,1,1,0,0,0,358.7,16.1);
	this.ballMC13.depth = 0;
	this.ballMC13.isAttachedToCamera = 0
	this.ballMC13.isAttachedToMask = 0
	this.ballMC13.layerDepth = 0
	this.ballMC13.layerIndex = 0
	this.ballMC13.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC13).wait(42));

	// ballMC12_obj_
	this.ballMC12 = new lib.Scene_1_ballMC12();
	this.ballMC12.name = "ballMC12";
	this.ballMC12.parent = this;
	this.ballMC12.setTransform(330.5,13.3,1,1,0,0,0,330.5,13.3);
	this.ballMC12.depth = 0;
	this.ballMC12.isAttachedToCamera = 0
	this.ballMC12.isAttachedToMask = 0
	this.ballMC12.layerDepth = 0
	this.ballMC12.layerIndex = 1
	this.ballMC12.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC12).wait(42));

	// ballMC11_obj_
	this.ballMC11 = new lib.Scene_1_ballMC11();
	this.ballMC11.name = "ballMC11";
	this.ballMC11.parent = this;
	this.ballMC11.setTransform(302.7,15.8,1,1,0,0,0,302.7,15.8);
	this.ballMC11.depth = 0;
	this.ballMC11.isAttachedToCamera = 0
	this.ballMC11.isAttachedToMask = 0
	this.ballMC11.layerDepth = 0
	this.ballMC11.layerIndex = 2
	this.ballMC11.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC11).wait(42));

	// ballMC10_obj_
	this.ballMC10 = new lib.Scene_1_ballMC10();
	this.ballMC10.name = "ballMC10";
	this.ballMC10.parent = this;
	this.ballMC10.setTransform(272.1,26.7,1,1,0,0,0,272.1,26.7);
	this.ballMC10.depth = 0;
	this.ballMC10.isAttachedToCamera = 0
	this.ballMC10.isAttachedToMask = 0
	this.ballMC10.layerDepth = 0
	this.ballMC10.layerIndex = 3
	this.ballMC10.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC10).wait(42));

	// ballMC9_obj_
	this.ballMC9 = new lib.Scene_1_ballMC9();
	this.ballMC9.name = "ballMC9";
	this.ballMC9.parent = this;
	this.ballMC9.setTransform(244.6,40.6,1,1,0,0,0,244.6,40.6);
	this.ballMC9.depth = 0;
	this.ballMC9.isAttachedToCamera = 0
	this.ballMC9.isAttachedToMask = 0
	this.ballMC9.layerDepth = 0
	this.ballMC9.layerIndex = 4
	this.ballMC9.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC9).wait(42));

	// ballMC8_obj_
	this.ballMC8 = new lib.Scene_1_ballMC8();
	this.ballMC8.name = "ballMC8";
	this.ballMC8.parent = this;
	this.ballMC8.setTransform(214.7,61.9,1,1,0,0,0,214.7,61.9);
	this.ballMC8.depth = 0;
	this.ballMC8.isAttachedToCamera = 0
	this.ballMC8.isAttachedToMask = 0
	this.ballMC8.layerDepth = 0
	this.ballMC8.layerIndex = 5
	this.ballMC8.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC8).wait(42));

	// ballMC7_obj_
	this.ballMC7 = new lib.Scene_1_ballMC7();
	this.ballMC7.name = "ballMC7";
	this.ballMC7.parent = this;
	this.ballMC7.setTransform(188.2,84.9,1,1,0,0,0,188.2,84.9);
	this.ballMC7.depth = 0;
	this.ballMC7.isAttachedToCamera = 0
	this.ballMC7.isAttachedToMask = 0
	this.ballMC7.layerDepth = 0
	this.ballMC7.layerIndex = 6
	this.ballMC7.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC7).wait(42));

	// ballMC6_obj_
	this.ballMC6 = new lib.Scene_1_ballMC6();
	this.ballMC6.name = "ballMC6";
	this.ballMC6.parent = this;
	this.ballMC6.setTransform(159.2,113.8,1,1,0,0,0,159.2,113.8);
	this.ballMC6.depth = 0;
	this.ballMC6.isAttachedToCamera = 0
	this.ballMC6.isAttachedToMask = 0
	this.ballMC6.layerDepth = 0
	this.ballMC6.layerIndex = 7
	this.ballMC6.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC6).wait(42));

	// ballMC5_obj_
	this.ballMC5 = new lib.Scene_1_ballMC5();
	this.ballMC5.name = "ballMC5";
	this.ballMC5.parent = this;
	this.ballMC5.setTransform(131.8,144.7,1,1,0,0,0,131.8,144.7);
	this.ballMC5.depth = 0;
	this.ballMC5.isAttachedToCamera = 0
	this.ballMC5.isAttachedToMask = 0
	this.ballMC5.layerDepth = 0
	this.ballMC5.layerIndex = 8
	this.ballMC5.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC5).wait(42));

	// ballMC4_obj_
	this.ballMC4 = new lib.Scene_1_ballMC4();
	this.ballMC4.name = "ballMC4";
	this.ballMC4.parent = this;
	this.ballMC4.setTransform(103.2,180.3,1,1,0,0,0,103.2,180.3);
	this.ballMC4.depth = 0;
	this.ballMC4.isAttachedToCamera = 0
	this.ballMC4.isAttachedToMask = 0
	this.ballMC4.layerDepth = 0
	this.ballMC4.layerIndex = 9
	this.ballMC4.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC4).wait(42));

	// ballMC3_obj_
	this.ballMC3 = new lib.Scene_1_ballMC3();
	this.ballMC3.name = "ballMC3";
	this.ballMC3.parent = this;
	this.ballMC3.setTransform(75.9,217.2,1,1,0,0,0,75.9,217.2);
	this.ballMC3.depth = 0;
	this.ballMC3.isAttachedToCamera = 0
	this.ballMC3.isAttachedToMask = 0
	this.ballMC3.layerDepth = 0
	this.ballMC3.layerIndex = 10
	this.ballMC3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC3).wait(42));

	// ballMC2_obj_
	this.ballMC2 = new lib.Scene_1_ballMC2();
	this.ballMC2.name = "ballMC2";
	this.ballMC2.parent = this;
	this.ballMC2.setTransform(48.6,256.3,1,1,0,0,0,48.6,256.3);
	this.ballMC2.depth = 0;
	this.ballMC2.isAttachedToCamera = 0
	this.ballMC2.isAttachedToMask = 0
	this.ballMC2.layerDepth = 0
	this.ballMC2.layerIndex = 11
	this.ballMC2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC2).wait(42));

	// ballMC1_obj_
	this.ballMC1 = new lib.Scene_1_ballMC1();
	this.ballMC1.name = "ballMC1";
	this.ballMC1.parent = this;
	this.ballMC1.setTransform(18.8,302.8,1,1,0,0,0,18.8,302.8);
	this.ballMC1.depth = 0;
	this.ballMC1.isAttachedToCamera = 0
	this.ballMC1.isAttachedToMask = 0
	this.ballMC1.layerDepth = 0
	this.ballMC1.layerIndex = 12
	this.ballMC1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.ballMC1).wait(42));

	// onCourt_obj_
	this.onCourt = new lib.Scene_1_onCourt();
	this.onCourt.name = "onCourt";
	this.onCourt.parent = this;
	this.onCourt.depth = 0;
	this.onCourt.isAttachedToCamera = 0
	this.onCourt.isAttachedToMask = 0
	this.onCourt.layerDepth = 0
	this.onCourt.layerIndex = 13
	this.onCourt.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.onCourt).wait(42));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(203.2,167.2,183.40000000000003,147.7);
// library properties:
lib.properties = {
	id: '6A40633FE6092C47B6CF1C2ED447423E',
	width: 393,
	height: 323,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/animated_livescore1_atlas_.png", id:"animated_livescore1_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['6A40633FE6092C47B6CF1C2ED447423E'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


// Layer depth API : 

AdobeAn.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;




var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("6A40633FE6092C47B6CF1C2ED447423E");
	var lib=comp.getLibrary();
	var loader = new createjs.LoadQueue(false);
	loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
	loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
	var lib=comp.getLibrary();
	loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
	var images=comp.getImages();	
	if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }	
}
function handleComplete(evt,comp) {
	//This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
	var lib=comp.getLibrary();
	var ss=comp.getSpriteSheet();
	var queue = evt.target;
	var ssMetadata = lib.ssMetadata;
	for(i=0; i<ssMetadata.length; i++) {
		ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
	}
	exportRoot = new lib.animated_livescore1();
	stage = new lib.Stage(canvas);	
	//Registers the "tick" event listener.
	fnStartAnimation = function() {
		stage.addChild(exportRoot);
		createjs.Ticker.setFPS(lib.properties.fps);
		createjs.Ticker.addEventListener("tick", stage)
		stage.addEventListener("tick", handleTick)
		function getProjectionMatrix(container, totalDepth) {
			var focalLength = 528.25;
			var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
			var scale = (totalDepth + focalLength)/focalLength;
			var scaleMat = new createjs.Matrix2D;
			scaleMat.a = 1/scale;
			scaleMat.d = 1/scale;
			var projMat = new createjs.Matrix2D;
			projMat.tx = -projectionCenter.x;
			projMat.ty = -projectionCenter.y;
			projMat = projMat.prependMatrix(scaleMat);
			projMat.tx += projectionCenter.x;
			projMat.ty += projectionCenter.y;
			return projMat;
		}
		function handleTick(event) {
			var cameraInstance = exportRoot.___camera___instance;
			if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
			{
				cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
				cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
				if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
				cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
			}
			applyLayerZDepth(exportRoot);
		}
		function applyLayerZDepth(parent)
		{
			var cameraInstance = parent.___camera___instance;
			var focalLength = 528.25;
			var projectionCenter = { 'x' : 0, 'y' : 0};
			if(parent === exportRoot)
			{
				var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
				projectionCenter.x = stageCenter.x;
				projectionCenter.y = stageCenter.y;
			}
			for(child in parent.children)
			{
				var layerObj = parent.children[child];
				if(layerObj == cameraInstance)
					continue;
				applyLayerZDepth(layerObj, cameraInstance);
				if(layerObj.layerDepth === undefined)
					continue;
				if(layerObj.currentFrame != layerObj.parent.currentFrame)
				{
					layerObj.gotoAndPlay(layerObj.parent.currentFrame);
				}
				var matToApply = new createjs.Matrix2D;
				var cameraMat = new createjs.Matrix2D;
				var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
				var cameraDepth = 0;
				if(cameraInstance && !layerObj.isAttachedToCamera)
				{
					var mat = cameraInstance.getMatrix();
					mat.tx -= projectionCenter.x;
					mat.ty -= projectionCenter.y;
					cameraMat = mat.invert();
					cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
					cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
					if(cameraInstance.depth)
						cameraDepth = cameraInstance.depth;
				}
				if(layerObj.depth)
				{
					totalDepth = layerObj.depth;
				}
				//Offset by camera depth
				totalDepth -= cameraDepth;
				if(totalDepth < -focalLength)
				{
					matToApply.a = 0;
					matToApply.d = 0;
				}
				else
				{
					if(layerObj.layerDepth)
					{
						var sizeLockedMat = getProjectionMatrix(parent, layerObj.layerDepth);
						if(sizeLockedMat)
						{
							sizeLockedMat.invert();
							matToApply.prependMatrix(sizeLockedMat);
						}
					}
					matToApply.prependMatrix(cameraMat);
					var projMat = getProjectionMatrix(parent, totalDepth);
					if(projMat)
					{
						matToApply.prependMatrix(projMat);
					}
				}
				layerObj.transformMatrix = matToApply;
			}
		}
	}	    
	//Code to support hidpi screens and responsive scaling.
	function makeResponsive(isResp, respDim, isScale, scaleType) {		
		var lastW, lastH, lastS=1;		
		window.addEventListener('resize', resizeCanvas);		
		resizeCanvas();		
		function resizeCanvas() {			
			var w = lib.properties.width, h = lib.properties.height;			
			var iw = window.innerWidth, ih=window.innerHeight;			
			var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
			if(isResp) {                
				if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
					sRatio = lastS;                
				}				
				else if(!isScale) {					
					if(iw<w || ih<h)						
						sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==1) {					
					sRatio = Math.min(xRatio, yRatio);				
				}				
				else if(scaleType==2) {					
					sRatio = Math.max(xRatio, yRatio);				
				}			
			}			
			canvas.width = w*pRatio*sRatio;			
			canvas.height = h*pRatio*sRatio;
			canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';				
			canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
			stage.scaleX = pRatio*sRatio;			
			stage.scaleY = pRatio*sRatio;			
			lastW = iw; lastH = ih; lastS = sRatio;            
			stage.tickOnUpdate = false;            
			stage.update();            
			stage.tickOnUpdate = true;		
		}
	}
	makeResponsive(false,'both',false,1);	
	AdobeAn.compositionLoaded(lib.properties.id);
	fnStartAnimation();
}