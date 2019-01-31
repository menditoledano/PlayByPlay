(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"scoreAnimate_forExport_atlas_", frames: [[286,0,90,165],[378,0,90,165],[0,0,284,160]]}
];


// symbols:



(lib.LEFTtennisBall = function() {
	this.initialize(ss["scoreAnimate_forExport_atlas_"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.RIGHTtennisBall = function() {
	this.initialize(ss["scoreAnimate_forExport_atlas_"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.scoreBG = function() {
	this.initialize(ss["scoreAnimate_forExport_atlas_"]);
	this.gotoAndStop(2);
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


(lib.scoreBG_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.scoreBG();
	this.instance.parent = this;
	this.instance.setTransform(5,-2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.scoreBG_Layer_1, null, null);


(lib.rightBall_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.RIGHTtennisBall();
	this.instance.parent = this;
	this.instance.setTransform(-1,-4,1.04,1.04);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.rightBall_Layer_1, null, null);


(lib.leftBall_Layer_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.LEFTtennisBall();
	this.instance.parent = this;
	this.instance.setTransform(-1,-7,1.0697,1.0697);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.leftBall_Layer_1, null, null);


(lib.scoreBG_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.scoreBG_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(147,78,1,1,0,0,0,147,78);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.scoreBG_1, new cjs.Rectangle(5,-2,284,160), null);


(lib.Scene_1_scoreBG = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// scoreBG
	this.instance = new lib.scoreBG_1();
	this.instance.parent = this;
	this.instance.setTransform(219,215,1,1,0,0,0,142,80);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(67).to({alpha:0},7).wait(2));

}).prototype = p = new cjs.MovieClip();


(lib.rightBall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.rightBall_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(45.8,81.8,1,1,0,0,0,45.8,81.8);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.rightBall, new cjs.Rectangle(-1,-4,93.6,171.6), null);


(lib.leftBall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1_obj_
	this.Layer_1 = new lib.leftBall_Layer_1();
	this.Layer_1.name = "Layer_1";
	this.Layer_1.parent = this;
	this.Layer_1.setTransform(47.1,81.3,1,1,0,0,0,47.1,81.3);
	this.Layer_1.depth = 0;
	this.Layer_1.isAttachedToCamera = 0
	this.Layer_1.isAttachedToMask = 0
	this.Layer_1.layerDepth = 0
	this.Layer_1.layerIndex = 0
	this.Layer_1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Layer_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.leftBall, new cjs.Rectangle(-1,-7,96.3,176.5), null);


(lib.Scene_1_RIGHTtennisBall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// RIGHTtennisBall
	this.instance = new lib.rightBall();
	this.instance.parent = this;
	this.instance.setTransform(28.2,15.35,0.0862,0.0862,0,0,0,45.3,83);
	this.instance.alpha = 0;
	this.instance.filters = [new cjs.BlurFilter(38, 38, 2)];
	this.instance.cache(-3,-6,98,176);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:45,regY:82.7,scaleX:0.3714,scaleY:0.3714,x:179.3,y:305.4,alpha:0.7617},12,cjs.Ease.get(-1)).to({regY:82.5,scaleX:1,scaleY:1,x:258,y:213.5,alpha:1},4,cjs.Ease.get(1)).to({x:389.5},7).to({x:383},3).wait(38).to({x:389.5},3).to({x:258,alpha:0},7).wait(2));

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_LEFTtennisBall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// LEFTtennisBall
	this.instance = new lib.leftBall();
	this.instance.parent = this;
	this.instance.setTransform(22.95,15.3,0.0862,0.0862,0,0,0,46.5,82.4);
	this.instance.alpha = 0;
	this.instance.filters = [new cjs.BlurFilter(38, 38, 2)];
	this.instance.cache(-3,-9,100,181);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:46.1,regY:82.1,scaleX:0.3714,scaleY:0.3714,x:152.1,y:305.2,alpha:0.7617},12,cjs.Ease.get(-1)).to({regX:46,regY:82,scaleX:1,scaleY:1,x:184,y:213,alpha:1},4,cjs.Ease.get(1)).to({x:52.5},7).to({x:59},3).wait(38).to({x:52.5},3).to({x:184,alpha:0},7).wait(2));

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.scoreAnimate_forExport = function(mode,startPosition,loop) {
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
	this.frame_75 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(75).call(this.frame_75).wait(1));

	// Layer_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("ARALjIAAgaIAcAAIAAAag");
	var mask_graphics_16 = new cjs.Graphics().p("ARAVVIAAyxIAcAAIAASxg");
	var mask_graphics_17 = new cjs.Graphics().p("AMpVVIAAyxIGQAAIAASxg");
	var mask_graphics_18 = new cjs.Graphics().p("AIRVVIAAyxIMGAAIAASxg");
	var mask_graphics_19 = new cjs.Graphics().p("AD5VVIAAyxIR7AAIAASxg");
	var mask_graphics_20 = new cjs.Graphics().p("AgeVWIAAyxIXvAAIAASxg");
	var mask_graphics_21 = new cjs.Graphics().p("Ak1VWIAAyxIdkAAIAASxg");
	var mask_graphics_22 = new cjs.Graphics().p("ApNVWIAAyxMAjZAAAIAASxg");
	var mask_graphics_23 = new cjs.Graphics().p("AtlVVIAAyxMApOAAAIAASxg");
	var mask_graphics_67 = new cjs.Graphics().p("AtlVVIAAyxMApOAAAIAASxg");
	var mask_graphics_68 = new cjs.Graphics().p("ApNVVIAAyxMAjZAAAIAASxg");
	var mask_graphics_69 = new cjs.Graphics().p("Ak2VVIAAyxIdkAAIAASxg");
	var mask_graphics_70 = new cjs.Graphics().p("AgeVVIAAyxIXvAAIAASxg");
	var mask_graphics_71 = new cjs.Graphics().p("AD5VVIAAyxIR7AAIAASxg");
	var mask_graphics_72 = new cjs.Graphics().p("AIRVVIAAyxIMGAAIAASxg");
	var mask_graphics_73 = new cjs.Graphics().p("AMpVVIAAyxIGQAAIAASxg");
	var mask_graphics_74 = new cjs.Graphics().p("ARAVVIAAyxIAcAAIAASxg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:111.6253,y:73.9044}).wait(16).to({graphics:mask_graphics_16,x:111.6253,y:136.55}).wait(1).to({graphics:mask_graphics_17,x:120.9469,y:136.55}).wait(1).to({graphics:mask_graphics_18,x:130.2993,y:136.55}).wait(1).to({graphics:mask_graphics_19,x:139.6228,y:136.55}).wait(1).to({graphics:mask_graphics_20,x:148.9502,y:136.575}).wait(1).to({graphics:mask_graphics_21,x:158.2718,y:136.575}).wait(1).to({graphics:mask_graphics_22,x:167.6242,y:136.575}).wait(1).to({graphics:mask_graphics_23,x:176.8997,y:136.55}).wait(44).to({graphics:mask_graphics_67,x:176.8997,y:136.55}).wait(1).to({graphics:mask_graphics_68,x:167.5742,y:136.55}).wait(1).to({graphics:mask_graphics_69,x:158.2218,y:136.55}).wait(1).to({graphics:mask_graphics_70,x:148.9233,y:136.55}).wait(1).to({graphics:mask_graphics_71,x:139.5978,y:136.525}).wait(1).to({graphics:mask_graphics_72,x:130.2743,y:136.525}).wait(1).to({graphics:mask_graphics_73,x:120.9469,y:136.525}).wait(1).to({graphics:mask_graphics_74,x:111.6253,y:136.55}).wait(2));

	// scoreBG_obj_
	this.scoreBG = new lib.Scene_1_scoreBG();
	this.scoreBG.name = "scoreBG";
	this.scoreBG.parent = this;
	this.scoreBG.setTransform(224,213,1,1,0,0,0,224,213);
	this.scoreBG.depth = 0;
	this.scoreBG.isAttachedToCamera = 0
	this.scoreBG.isAttachedToMask = 0
	this.scoreBG.layerDepth = 0
	this.scoreBG.layerIndex = 0
	this.scoreBG.maskLayerName = 0

	var maskedShapeInstanceList = [this.scoreBG];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.scoreBG).wait(76));

	// RIGHTtennisBall_obj_
	this.RIGHTtennisBall = new lib.Scene_1_RIGHTtennisBall();
	this.RIGHTtennisBall.name = "RIGHTtennisBall";
	this.RIGHTtennisBall.parent = this;
	this.RIGHTtennisBall.setTransform(28.3,15.3,1,1,0,0,0,28.3,15.3);
	this.RIGHTtennisBall.depth = 0;
	this.RIGHTtennisBall.isAttachedToCamera = 0
	this.RIGHTtennisBall.isAttachedToMask = 0
	this.RIGHTtennisBall.layerDepth = 0
	this.RIGHTtennisBall.layerIndex = 1
	this.RIGHTtennisBall.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.RIGHTtennisBall).wait(76));

	// LEFTtennisBall_obj_
	this.LEFTtennisBall = new lib.Scene_1_LEFTtennisBall();
	this.LEFTtennisBall.name = "LEFTtennisBall";
	this.LEFTtennisBall.parent = this;
	this.LEFTtennisBall.setTransform(23,15.2,1,1,0,0,0,23,15.2);
	this.LEFTtennisBall.depth = 0;
	this.LEFTtennisBall.isAttachedToCamera = 0
	this.LEFTtennisBall.isAttachedToMask = 0
	this.LEFTtennisBall.layerDepth = 0
	this.LEFTtennisBall.layerIndex = 2
	this.LEFTtennisBall.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.LEFTtennisBall).wait(76));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(158.9,97.6,290.6,267.5);
// library properties:
lib.properties = {
	id: '600977F1C69CBC45A2A16929CCDF8C51',
	width: 440,
	height: 340,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/scoreAnimate_forExport_atlas_.png", id:"scoreAnimate_forExport_atlas_"}
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
an.compositions['600977F1C69CBC45A2A16929CCDF8C51'] = {
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
export default function init() {
	canvas = document.getElementById("canvas");
	anim_container = document.getElementById("animation_container");
	dom_overlay_container = document.getElementById("dom_overlay_container");
	var comp=AdobeAn.getComposition("600977F1C69CBC45A2A16929CCDF8C51");
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
	exportRoot = new lib.scoreAnimate_forExport();
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


// export { init }; 