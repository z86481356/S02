const 
    GAME_W = window.innerWidth,
    GAME_H = window.innerHeight,
    GAME_RATIO = GAME_W / GAME_H,
    GAME_ORIENTATION = 'landscape'

const renderer = new PIXI.WebGLRenderer(GAME_W, GAME_H, {transparent: true,autoResize: true});
document.getElementById('live2d').appendChild(renderer.view);
const stage = new PIXI.Container();

//renderer.view.style.position = "fixed";
//renderer.view.style.bottom = "0px";
//renderer.view.style.right = "0px";

const modelHaru = {
	"type": "Live2D Model Setting",
	"name": "haru",
	"model": "assets/haru/haru.moc",
	"textures": [
		"assets/haru/haru.1024/texture_00.png",
		"assets/haru/haru.1024/texture_01.png",
		"assets/haru/haru.1024/texture_02.png",
		"assets/haru/haru.1024/texture_03.png"
	],
	"physics": "assets/haru/haru.physics.json",
	"pose": "assets/haru/haru.pose.json",
	"expressions": [{
		"name": "are you uncomfortable",
		"file": "assets/haru/expressions/are you uncomfortable.exp.json"
	}, {
		"name": "HE_A",
		"file": "assets/haru/expressions/HE_A.exp.json"
	}, {
		"name": "idle_00",
		"file": "assets/haru/expressions/idle_00.exp.json"
	}, {
		"name": "idle_01",
		"file": "assets/haru/expressions/idle_01.exp.json"
	}, {
		"name": "Right here here",
		"file": "assets/haru/expressions/Right here here.exp.json"
	}, {
		"name": "RR hatehatehate",
		"file": "assets/haru/expressions/RR hatehatehate.exp.json"
	}, {
		"name": "what are you doing",
		"file": "assets/haru/expressions/what are you doing.exp.json"
	}, {
		"name": "You are not right",
		"file": "assets/haru/expressions/You are not right.exp.json"
	}],
	"layout": {
		"center_x": 0,
		"y": 1.8,
		"width": 3.5
	},
	"hit_areas": [{
		"name": "head",
		"id": "D_REF.HEAD"
	}, {
		"name": "body",
		"id": "D_REF.BODY"
	}],
	"motions": {
		"idle": [{
			"file": "assets/haru/motions/idle_00.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}, {
			"file": "assets/haru/motions/idle_01.mtn",
			"fade_in": 2000,
			"fade_out": 2000
		}],
		"tap_body": [
		    {"file": "assets/haru/motions/You are not right.mtn","sound": "assets/haru/sounds/You are not right.mp3"},
			{"file": "assets/haru/motions/are you uncomfortable.mtn","sound": "assets/haru/sounds/are you uncomfortable.mp3"},
			{"file": "assets/haru/motions/what are you doing.mtn","sound": "assets/haru/sounds/what are you doing.mp3"},
			{"file": "assets/haru/motions/WAAAA.mtn","sound": "assets/haru/sounds/WAAAA.mp3"},
			{"file": "assets/haru/motions/special case.mtn","sound": "assets/haru/sounds/special case.mp3"},
			{"file": "assets/haru/motions/I O.mtn","sound": "assets/haru/sounds/I O.mp3"},
			{"file": "assets/haru/motions/No.mtn","sound": "assets/haru/sounds/No.mp3"},
			{"file": "assets/haru/motions/hate.mtn","sound": "assets/haru/sounds/hate.mp3"},
			{"file": "assets/haru/motions/Irritability.mtn","sound": "assets/haru/sounds/Irritability.mp3"},
			{"file": "assets/haru/motions/Fighter.mtn","sound": "assets/haru/sounds/Fighter.mp3"},
			{"file": "assets/haru/motions/What else to excuse.mtn","sound": "assets/haru/sounds/What else to excuse.mp3"},
		    {"file": "assets/haru/motions/RR hatehatehate.mtn","sound": "assets/haru/sounds/RR hatehatehate.mp3"}
			],
		"pinch_in": [{
			"file": "assets/haru/motions/are you uncomfortable.mtn",
			"sound": "assets/haru/sounds/are you uncomfortable.mp3"
		}],
		"pinch_out": [{
			"file": "assets/haru/motions/are you uncomfortable.mtn",
			"sound": "assets/haru/sounds/are you uncomfortable.mp3"
		}],
		"shake": [{
			"file": "assets/haru/motions/what are you doing.mtn",
			"sound": "assets/haru/sounds/what are you doing.mp3",
			"fade_in": 2000
		}],
		"flick_head": [{
			"file": "assets/haru/motions/Right here here.mtn",
			"sound": "assets/haru/sounds/Right here here.mp3"
			}, {
			"file": "assets/haru/motions/HE_A.mtn",
			"sound": "assets/haru/sounds/HE_A.mp3"
			}, {
			"file": "assets/haru/motions/ah.mtn",
			"sound": "assets/haru/sounds/ah.mp3"
		}]
	}
};



const sprite = new PIXI.Sprite.fromImage('./bg.jpg');
stage.addChild(sprite);

// setTimeout(() => {
//   const sprite2 = new PIXI.Sprite.fromImage('./pixiv4.jpg');
//   sprite2.y = 350;
//   stage.addChildAt(sprite2, 1);
// }, 1000)

const live2dSprite = new PIXI.Live2DSprite(modelHaru, {
	debugLog: false,
	randomMotion: false,
	eyeBlink: false,
	// audioPlayer: (...args) => console.log(...args)
});
stage.addChild(live2dSprite);

live2dSprite.x = -105;
// live2dSprite.y = -150;
live2dSprite.adjustScale(0, 0.40, 0.42);
//live2dSprite.adjustTranslate(0.4, 0);
live2dSprite.startRandomMotion('idle');

live2dSprite.on('click', (evt) => {
	const point = evt.data.global;
	if (live2dSprite.hitTest('body', point.x, point.y)) {
		live2dSprite.startRandomMotionOnce('tap_body');
	}
	if (live2dSprite.hitTest('head', point.x, point.y)) {
		live2dSprite.startRandomMotionOnce('flick_head');
	}
});
live2dSprite.on('mousemove', (evt) => {
	const point = evt.data.global;
	live2dSprite.setViewPoint(point.x, point.y);
});

function animate() {
	requestAnimationFrame(animate);
	renderer.render(stage);
}
animate();