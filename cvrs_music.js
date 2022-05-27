/* album gallery */
var mp_gallery = document.getElementById('mp_gallery');
crazy_albums.forEach((album, album_idx) => {
	let album_div = document.createElement('div');
	album_div.className = 'crazy_album';
	album_div.style.backgroundImage = 'url(' + album.album_cover + ')';
	
	let album_info_a = document.createElement('a');
	album_info_a.className = 'crazy_album_info';
	album_info_a.innerText = `${album.album_artist} - ${album.album_name}`;
	album_info_a.href = album.album_url;
	album_div.appendChild(album_info_a);
	
	let tracklist_div = document.createElement('ul');
	tracklist_div.className = 'crazy_tracklist';
	album.album_tracks.forEach((track, track_idx) => {
		let track_div = document.createElement('li');
		let track_btn = document.createElement('button');
		
		track_btn.addEventListener('click', e => {select_track(album_idx,track_idx);});
		track_btn.innerText = (track.track_artist || album.album_artist) + ' - ' + track.track_name;
		track_btn.id = `a${album_idx}t${track_idx}`;
		track_btn.className = 'crazy_button';
		track_div.appendChild(track_btn);
		
		tracklist_div.appendChild(track_div);
	});
	album_div.appendChild(tracklist_div);
	
	mp_gallery.appendChild(album_div);
});

var mp_audio = document.getElementById('mp_audio');

/* playlist logic */
var music_credits = document.getElementById('music_credits');

var mp_use_hd_audio = false;
var mp_track_index = 0;
var mü_album_index = 0;

function select_track(album,track) {
	mp_album_index = album;
	mp_track_index = track;
	
	play_track_index();
}

function change_track(d) {
	if (d) {
		mp_track_index++;
		if (mp_track_index >= crazy_albums[mp_album_index].album_tracks.length) mp_track_index = 0;
	}
	else {
		mp_track_index--;
		if (mp_track_index < 0) mp_track_index = crazy_albums[mp_album_index].album_tracks.length-1;
	}
	
	play_track_index();
}

function play_track_index() {
	audioContext.resume(); //just fucking resume avery time. cant hurt
	
	let track_artist = crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_artist'] || crazy_albums[mp_album_index]['album_artist'];
	let track_name = crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_name'];
	
	music_credits.innerText = track_artist + ' - ' + track_name;
	music_credits.href = crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_url'] || crazy_albums[mp_album_index]['album_url'];
	
	let audio_url = crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_sd'];
	
	if (mp_use_hd_audio && typeof crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_hd'] == 'string') {
		audio_url = crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_hd'];
	}
	
	//yes i know this is inefficien, no i dont care atm
	Array.prototype.forEach.call(document.getElementsByClassName('crazy_button'),btn=>{btn.style.borderColor = 'white'}); 
	document.getElementById(`a${mp_album_index}t${mp_track_index}`).style.borderColor = 'cyan';
	
	mp_audio.src=audio_url;
	mp_audio.load();
	mp_audio.play();
	
	if ("mediaSession" in navigator){
		navigator.mediaSession.metadata = new MediaMetadata({
			title: track_name,
			artist: track_artist,
			album: crazy_albums[mp_album_index]['album_name'],
			artwork: [{src: crazy_albums[mp_album_index]['album_cover']}]
		});
	}
}

mp_audio.onended = function(){change_track(true);};


/* visualizer */
var mp_header = document.getElementById('mp_header');
var mp_audio_vis = document.getElementById('mp_audio_vis');
var mp_audio_vis_2 = document.getElementById('mp_audio_vis_2');

mp_audio_vis.width = mp_header.clientWidth;
mp_audio_vis.height = mp_header.clientHeight;

var mp_vis_ctx = mp_audio_vis.getContext("2d");
mp_vis_ctx.strokeStyle = 'whitesmoke';

const audioContext = new AudioContext();
const audiosource_music = audioContext.createMediaElementSource(mp_audio);
var analyser_music = audioContext.createAnalyser();
analyser_music.fftSize = Math.pow(2, Math.floor(Math.log(mp_audio_vis_2.clientWidth)/Math.log(2) + 1)) * 2; //round up to the nearest power of 2
analyser_music.smoothingTimeConstant = 0.1; //make it react fast
var mp_buf = new Uint8Array(analyser_music.frequencyBinCount);
var mp_freq = new Uint8Array(analyser_music.frequencyBinCount);
audiosource_music.connect(analyser_music);
analyser_music.connect(audioContext.destination);

mp_audio_vis_2.width =mp_audio_vis_2.clientWidth;
mp_audio_vis_2.height = 128;
var mp_vis_ctx_2 = mp_audio_vis_2.getContext("2d");
mp_vis_ctx_2.strokeStyle = 'whitesmoke';

var mp_vis_fps = 0;
var mp_vis_frames = 0;
var mp_vis_cycle = 0;
var mp_vis_div = 0;
function vis_audio() {
	//fps limit
	mp_vis_cycle++; //adding before testing is mitigated by the <=
	if(mp_vis_cycle <= mp_vis_div) {
		/* divide framerate to save CPU. most LCDs dont display full framerate well anyways */
		requestAnimationFrame(vis_audio);
		return;
	}
	
	mp_vis_cycle = 0;
	
	mp_vis_ctx.clearRect(0,0,mp_audio_vis.width,mp_audio_vis.height);
	mp_vis_ctx.beginPath();
	//mp_vis_ctx.strokeStyle = 'whitesmoke';
	mp_vis_ctx.lineWidth = 2;
	
	
	analyser_music.getByteTimeDomainData(mp_buf);
	
	let trig = 0;
	let highs = 0;
	for (let s = 0; s < mp_buf.length - mp_audio_vis.width - 10; s++) { //try to sync to waveform
		if (mp_buf[s] > highs) {
			highs = mp_buf[s];
			trig = s;
		}
	}
	
	for (let x = 0; x < mp_audio_vis.width; x++) {
		let y = mp_buf[x+trig] * (mp_audio_vis.height / 255);
		
		if (x == 1) {
				mp_vis_ctx.moveTo(x,y);
		}
		else {
				mp_vis_ctx.lineTo(x,y);
		}
	}
	
	mp_vis_ctx.stroke();
	
	
	mp_vis_ctx_2.clearRect(0,0,mp_audio_vis_2.width,mp_audio_vis_2.height);
	mp_vis_ctx_2.beginPath();
	//mp_vis_ctx_2.strokeStyle = 'whitesmoke';
	mp_vis_ctx_2.lineWidth = 2;
	
	analyser_music.getByteFrequencyData(mp_freq);
	for (let x = 0; x < mp_audio_vis_2.width; x++) {
		let y = ((mp_freq[x] / 2) * -1) + mp_audio_vis_2.height;
		
		if (x == 1) {
				mp_vis_ctx_2.moveTo(x,y);
		}
		else {
				mp_vis_ctx_2.lineTo(x,y);
		}
	}
	
	mp_vis_ctx_2.stroke();
	
	
	mp_vis_frames++;
	requestAnimationFrame(vis_audio);
}
vis_audio();

mp_audio.onwaiting = mp_audio.onstalled = function () {mp_vis_ctx.strokeStyle = '#333'; mp_vis_ctx_2.strokeStyle = '#333';}
mp_audio.onplaying = function () {mp_vis_ctx.strokeStyle = 'whitesmoke'; mp_vis_ctx_2.strokeStyle = 'whitesmoke';}
mp_audio.onerror = function () {mp_vis_ctx.strokeStyle = 'red';mp_vis_ctx_2.strokeStyle = 'red';}

window.addEventListener('resize', e => { //runs this shitfuck whenever the resolution changes
	let old_stroke_style = mp_vis_ctx.strokeStyle;
	let old_stroke_style_2 = mp_vis_ctx_2.strokeStyle;
	
	mp_audio_vis.width = mp_header.clientWidth;
	mp_audio_vis.height = mp_header.clientHeight;
	mp_audio_vis_2.width = mp_audio_vis_2.clientWidth;
	analyser_music.fftSize = Math.pow(2, Math.floor(Math.log(mp_audio_vis_2.clientWidth)/Math.log(2) + 1)) * 2; //round up to the nearest power of 2
	mp_buf = new Uint8Array(analyser_music.frequencyBinCount);
	mp_freq = new Uint8Array(analyser_music.frequencyBinCount);
	
	mp_vis_ctx_2.strokeStyle = old_stroke_style;
	mp_vis_ctx.strokeStyle = old_stroke_style_2;
	mp_vis_ctx_2.lineWidth = mp_vis_ctx.lineWidth = 2;
});


//measure fps
var butterviz_frames = 0;
var butterviz_fps = 0;
var mp_performance = document.getElementById('mp_fps');
setInterval(function(){
	mp_vis_fps = mp_vis_frames;
	mp_vis_frames = 0;
	mp_fps.innerText = 'Lines: ' + mp_vis_fps + "FPS";
	
	butterviz_fps = butterviz_frames;
	butterviz_frames = 0;
	mp_fps.innerText += '  Butterchurn: ' + butterviz_fps + "FPS";
}, 1000);


/* butterchurn */
var butter_presets = Object.entries(butterchurnPresetsExtra.getPresets());
var butter_canvas = document.getElementById('butter_canvas');
var butter_div = document.getElementById('butter_div');
butter_canvas.width = butter_div.clientWidth;
butter_canvas.height = butter_div.clientHeight;
const butterviz = butterchurn.default.createVisualizer(audioContext, butter_canvas, {
  width: butter_div.clientWidth,
  height: butter_div.clientHeight,
  pixelRatio: window.devicePixelRatio || 1,
  textureRatio: 1
});
butterviz.connectAudio(audiosource_music);
var buttervis_cycle = 0;
function buttervizLoop() {
	//fps limit
	buttervis_cycle++; //adding before testing is mitigated by the <=
	if(buttervis_cycle <= mp_vis_div) {
		/* divide framerate to save CPU. most LCDs dont display full framerate well anyways */
		requestAnimationFrame(buttervizLoop);
		return;
	}
	buttervis_cycle = 0;
	butterviz_frames++;
	
	butterviz.render();
	requestAnimationFrame(buttervizLoop);
}
buttervizLoop();

function switch_butter_preset() {
	butterviz.loadPreset(butter_presets[Math.floor(Math.random() * butter_presets.length - 0.1)][1], 5);
}
setInterval(switch_butter_preset,30000);

window.addEventListener('resize', e => {
	butter_canvas.width = butter_div.clientWidth;
	butter_canvas.height = butter_div.clientHeight;
	butterviz.setRendererSize(butter_div.clientWidth, butter_div.clientHeight);
});


/* controls */
var mp_performance = document.getElementById('mp_performance');
var mp_next = document.getElementById('mp_next');
var mp_prev = document.getElementById('mp_prev');
var mp_hd = document.getElementById('mp_hd');
var mp_fullscreen = document.getElementById('mp_fullscreen');

function mp_cycle_fps() {
	mp_vis_div += 1;
	if (mp_vis_div >= 4) mp_vis_div=0;
	mp_performance.innerText = (mp_vis_div!=0) ? "1/" + (mp_vis_div+1) : "max";
}

mp_performance.onclick = mp_cycle_fps;
mp_performance.innerText = "max";
mp_next.onclick = function(){change_track(true)};
mp_prev.onclick = function(){change_track(false)};
mp_hd.onclick = function(){
	if(mp_track_index<0) {
		alert("No HD version available for eastereggs. I dont want to implement that.");
		return;
	}
	
	mp_use_hd_audio = !mp_use_hd_audio;
	mp_hd.innerText = mp_use_hd_audio ? 'HD' : 'SD';
	
	let mp_pos_on_sw = mp_audio.currentTime;
	if (typeof crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_hd'] == 'string') {
		if (mp_use_hd_audio) {
				mp_audio.src=crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_hd'];
		}
		else {
				mp_audio.src=crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_sd'];
		}
		
		mp_audio.load();
		mp_audio.play().then(p => {mp_audio.currentTime = mp_pos_on_sw;});
	}
	
}
mp_audio.onloadeddata = function() {
	mp_hd.style.borderColor = (typeof crazy_albums[mp_album_index]['album_tracks'][mp_track_index]['track_hd'] == 'string' && mp_use_hd_audio) ? '#0FF' : '#FFF';
	switch_butter_preset();
};

var mp_clutter = document.getElementById('mp_clutter');
var mp_fullscreen_state = 0;
mp_fullscreen.onclick = function () {
	if (!document.fullscreenEnabled) {
		mp_fullscreen.style.borderColor = '#F00';
		return;
	}
	switch (mp_fullscreen_state) {
		default:
			mp_fullscreen_state = 0;
		case 0:
			document.body.requestFullscreen();
			mp_clutter.style.display = 'initial';
			mp_fullscreen.style.borderColor = '#0FF';
			break;
		case 1:
			document.body.requestFullscreen();
			mp_clutter.style.display = 'none';
			mp_fullscreen.style.borderColor = 'orange';
			break;
		case 2:
			document.exitFullscreen();
			mp_clutter.style.display = 'initial';
			mp_fullscreen.style.borderColor = '#FFF';
			break;
	}
	mp_fullscreen_state++;
}

document.body.addEventListener('fullscreenchange', e => {
	if (document.fullscreenElement == null) {
		mp_fullscreen_state = 0;
		mp_clutter.style.display = 'initial';
		mp_fullscreen.style.borderColor = '#FFF';
	}
});


/* media session controls */
navigator.mediaSession.setActionHandler('nexttrack', function() {change_track(true)});
navigator.mediaSession.setActionHandler('previoustrack', function() {change_track(false)});
navigator.mediaSession.setActionHandler('play', function() {mp_audio.play();});
navigator.mediaSession.setActionHandler('pause', function() {mp_audio.pause();});
navigator.mediaSession.setActionHandler('seekto', function(e) {
	mp_audio.currentTime = e.seekTime;
});

mp_audio.addEventListener('play', e => {
	navigator.mediaSession.playbackState = "playing";
});
mp_audio.addEventListener('pause', e => {
	navigator.mediaSession.playbackState = "paused";
});
mp_audio.addEventListener('timeupdate', e => {
	navigator.mediaSession.setPositionState({
		duration: mp_audio.duration,
		playbackRate: mp_audio.playbackRate,
		position: mp_audio.currentTime
	});
});
