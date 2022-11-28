let startButton;
let stopButton;
let resetButton;
let Time;

let timer;
let startTime;
let elapsedTime = 0;
let holdTime = 0;

window.onload = function () {
	startButton = document.getElementById("start");
	stopButton = document.getElementById("stop");
	resetButton = document.getElementById("reset");
	Time = document.getElementById("time");
}

function start(){
	startTime = Date.now();

	measureTime();

	startButton.disabled = true;
	stopButton.disabled = false;
	resetButton.disabled = false;
}

function stop(){
	clearInterval(timer);

	holdTime += Date.now() - startTime;

	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = false;
}

function reset(){
	clearInterval(timer);

	elapsedTime = 0;
	holdTime = 0;
	Time.textContent = "00:00.000";

	startButton.disabled = false;
	stopButton.disabled = true;
	resetButton.disabled = true;
}

function measureTime() {
	timer = setTimeout(function () {
		elapsedTime = Date.now() - startTime + holdTime;
		Time.textContent = new Date(elapsedTime).toISOString().slice(14, 23);

		measureTime();
	}, 10);
}
