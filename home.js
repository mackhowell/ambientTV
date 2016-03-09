"use strict";

var songPlayer;
var numVideos = 0;
var unstartedErrorCount = 0;
var bgVideoIDArray = [
	"jL9vALlM8YQ",
	"y5HwpVrJ0No",
	"KOvQVHM5Gk8",
	"wq5aT-Xz-7I",
	"-EiFyiogGmY",
	"1ijRFHRzpIw",
	"tzh2l1k5igs",
	"ANXDzoX6kms",
	"8_uu2GiEu5o",
	"T_X8P5Sinxo"
];

$(document).ready(function () {
	var randomElement = bgVideoIDArray[Math.floor(Math.random() * bgVideoIDArray.length)];
	selectBackground(randomElement);
	document.getElementById("videoName").innerText = randomElement;

	// already loaded by tubular
	// var tag = document.createElement('script');
	// tag.src = "https://www.youtube.com/iframe_api";
	// var firstScriptTag = document.getElementsByTagName('script')[0];
	// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	$("#next").on("click", function() {
		next();
	});
});

window.setupSongPlayer = function() {
	// This func is called from tubular.
	songPlayer = new YT.Player('songPlayer', {
		height: '390',
		width: '640',
		events: {
			'onReady': onSongPlayerReady,
			'onError': onSongPlayerError,
			'onStateChange': onSongPlayerStateChange
		}
	});
}

var oldNumber = 0;
var newNumber = 0;

function newRandomNumber(min, max) {
	oldNumber = newNumber;
	newNumber = Math.floor(Math.random() * max) + min;
	if (newNumber == oldNumber) {
		newRandomNumber(min, max);
	} else {
		return newNumber;
	}
}

window.onSongPlayerError = function(error) {
	console.log("mega fucking error... \n" + JSON.parse(JSON.stringify(obj)));
}

function onSongPlayerReady(event) {
	console.log("inside player ready");
	loadPlaylist();
}

function loadPlaylist() {
	console.log("inside load playlist");
	songPlayer.cuePlaylist({
		'listType': 'playlist',
		'list': 'PLhfx68zwRR47NmfZcKG7WqnY_qSXBw2Kj',
		'index': newRandomNumber(0, 170),
	});
	player.setShuffle({
		'shufflePlaylist': true
	});
}

function next() {
	unstartedErrorCount = 0
	songPlayer.cuePlaylist({
		'listType': 'playlist',
		'list': 'PLhfx68zwRR47NmfZcKG7WqnY_qSXBw2Kj',
		'index': newRandomNumber(0, numVideos),
		'startSeconds': '0',
		'suggestedQuality': 'small',
	});
	songPlayer.setShuffle({
		'shufflePlaylist': true
	});

	var randomElement = bgVideoIDArray[Math.floor(Math.random() * bgVideoIDArray.length)];
	selectBackground(randomElement);
	document.getElementById("videoName").innerText = randomElement;
}

function onSongPlayerStateChange(event) {
	if (event.data == YT.PlayerState.CUED) {
		console.log("inside cued state");
		numVideos = event.target.getPlaylist().length;
		event.target.playVideo();
		document.getElementById("songName").innerText = player.getVideoData().title;
	} else if (event.data == YT.PlayerState.ENDED) {
		console.log("inside player ended state");
		next();
	} else if (event.data == YT.PlayerState.UNSTARTED) {
		unstartedErrorCount++;
		if (unstartedErrorCount == 3) {
			console.log("inside unplayable track state");
			setTimeout(next(), 1000);
		}
	}
}

function selectBackground(randomElement) {
	console.log("inside selectBackground...random bg = " + randomElement);
	$('#tubularBG').tubular({videoId: randomElement});
}
