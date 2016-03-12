var canvas = document.getElementById('canvas');
var	context = canvas.getContext('2d');
var	animateButton = document.getElementById('animateButton');
var	sky = new Image();

var skyOffset = 0;
var SKY_VELOCITY = 30;
var fps = 0;

var paused = true; 
var lastTime = 0;

function erase() {

	context.clearRect(0,0,canvas.width,canvas.height);
}

function draw() {

	context.save();
	skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY/fps : 0;

	context.save();
	context.translate(-skyOffset, 0);
	context.drawImage(sky,0,0);
	context.drawImage(sky,sky.width-2,0);
	context.restore();
}

function calculateFps(now) {

	var fps = 1000 / (now - lastTime);
	lastTime = now;
	return fps;
}

function animate(now) {

	if (now === undefined) {
		now = +new Date;
	}

	fps = calculateFps(now);

	if(!paused) {
		erase();
		draw();
	}
	//requestNextAnimationFrame(animate);
	setTimeout(animate,100);
}

animateButton.onclick = function(e) {
	paused = paused ? false : true;
	if(paused) {
		animateButton.value = 'Animate';
	}
	else{
		animateButton.value = 'Paused';
	}
};

canvas.width = canvas.width;
canvas.height = canvas.height;

sky.src = 'sky.png';
sky.onload = function(e) {
	draw();
};
setTimeout(animate,100);
//requestNextAnimationFrame(animate);
