function mp_handle_error(err, comp) {
	console.error(err);
	alert("Uh oh! Something went horribly wrong. Maybe we should have hired proper Developers instead of cats...\nSend an E-Mail with screenshot to " + atob(atob("WTNaeWMxOWlkV2R6UUdoaFkydGxjak13TURBdVkyWT0=")) /* vary bad mail scrambleing */ + "\n\nComponent: " + comp + ((typeof err.lineNumber == 'number') ? "\nLine Number: " + err.lineNumber : "") + "\nError Cause: " + err.cause  + "\nError String: " + err.toString());
}


try {
/* visualizer */
var mp_header = document.getElementById('mp_header');
var mp_audio_vis = document.getElementById('mp_audio_vis');
var mp_audio_vis_2 = document.getElementById('mp_audio_vis_2');

mp_audio_vis.width = mp_header.clientWidth;
mp_audio_vis.height = mp_header.clientHeight;

var mp_vis_ctx = mp_audio_vis.getContext("2d");
mp_vis_ctx.strokeStyle = 'whitesmoke';

var audioContext = new AudioContext();

const audioCtx = new AudioContext();
var audiosource_music;
var analyser_music = audioContext.createAnalyser();
analyser_music.fftSize = Math.pow(2, Math.floor(Math.log(mp_audio_vis_2.clientWidth)/Math.log(2) + 1)) * 2; //round up to the nearest power of 2
analyser_music.smoothingTimeConstant = 0.1; //make it react fast
var mp_buf = new Uint8Array(analyser_music.frequencyBinCount);
var mp_freq = new Uint8Array(analyser_music.frequencyBinCount);

mp_audio_vis_2.width =mp_audio_vis_2.clientWidth;
mp_audio_vis_2.height = 128;
var mp_vis_ctx_2 = mp_audio_vis_2.getContext("2d");
mp_vis_ctx_2.strokeStyle = 'whitesmoke';

var mp_vis_fps = 0;
var mp_vis_frames = 0;
var mp_vis_cycle = 0;
var mp_vis_div = 0;
var mp_fft_enable = true;
function vis_audio() {
	//fps limit
	mp_vis_cycle++; //adding before testing is mitigated by the <=
	if(mp_vis_cycle <= mp_vis_div) {
		/* divide framerate to save CPU and battery */
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
	for (let s = 0; s < Math.min(audioContext.sampleRate/100, mp_buf.length - mp_audio_vis.width - 10); s++) { //try to sync to waveform
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
	if (mp_fft_enable) {
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
	}
	
	mp_vis_frames++;
	requestAnimationFrame(vis_audio);
}
vis_audio();


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
}
catch (err) {
	mp_handle_error(err, "Lines Viz");
}

try {
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
}
catch (err) {
	mp_handle_error(err, "FPS Counters");
}

/* butterchurn */
try {
var butter_presets = Object.entries(butterchurnPresetsExtra.getPresets());
var butter_canvas = document.getElementById('butter_canvas');
var butter_div = document.getElementById('butter_div');
butter_canvas.width = butter_div.clientWidth;
butter_canvas.height = butter_div.clientHeight;
var butterviz = butterchurn.default.createVisualizer(audioContext, butter_canvas, {
  width: butter_div.clientWidth,
  height: butter_div.clientHeight,
  pixelRatio: window.devicePixelRatio || 1,
  textureRatio: 1
});
var buttervis_cycle = 0;
function buttervizLoop() {
	//fps limit
	buttervis_cycle++; //adding before testing is mitigated by the <=
	if(buttervis_cycle <= mp_vis_div) {
		/* divide framerate to save CPU and battery */
		requestAnimationFrame(buttervizLoop);
		return;
	}
	buttervis_cycle = 0;
	butterviz_frames++;
	
	butterviz.render();
	requestAnimationFrame(buttervizLoop);
}

var preset_switcher_interval = null;
function switch_butter_preset() {
	butterviz.loadPreset(butter_presets[Math.floor(Math.random() * butter_presets.length - 0.1)][1], 5);
}

window.addEventListener('resize', e => {
	butter_canvas.width = butter_div.clientWidth;
	butter_canvas.height = butter_div.clientHeight;
	butterviz.setRendererSize(butter_div.clientWidth, butter_div.clientHeight);
});
}
catch (err) {
	mp_handle_error(err, "Butterchurn");
}

try {
if (navigator.mediaDevices) {
	navigator.mediaDevices.getUserMedia({
		audio: {
			echoCancellation: false,
			autoGainControl: true,
			noiseSuppression: false,
			latency: 0
    }}).then((stream) => {
	audiosource_music = audioContext.createMediaStreamSource(stream);
	audiosource_music.connect(analyser_music);
	butterviz.connectAudio(audiosource_music);
	buttervizLoop();
	//analyser_music.connect(audioContext.destination);
  }).catch((err) => {
		alert("Sorry, can't visualize your music without a working mic...");
		console.log(err);
  });
} else {
		alert("Sorry,your browser does not support microphone input.");
}
} catch (err) {
	mp_handle_error(err, "Microphone");
}

try {
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
mp_autoswitch.onclick = function(){
	if (preset_switcher_interval != null) {
		clearInterval(preset_switcher_interval);
		preset_switcher_interval = null;
		mp_autoswitch.style.borderColor='#FFF';
	}
	else {
		preset_switcher_interval = setInterval(switch_butter_preset,30000);
		mp_autoswitch.style.borderColor='#0FF';
	}
};
mp_next_preset.onclick = function(){switch_butter_preset();};

function sel_image(s) {
	if (FileReader && s.files && s.files.length) {
		let fr = new FileReader();
		fr.onload = function () {
			logo_img.style.display="block";
			logo_img.src=fr.result;
		}
		fr.readAsDataURL(s.files[0]);
	}
	else s.style.borderColor='red';
}
mp_logo_file.onchange = function(){sel_image(this)};

function cluttervis(v) {Array.prototype.forEach.call(document.getElementsByClassName("mp_clutter"), e => {e.style.display = v;})};
var mp_help = document.getElementById('mp_help');
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
			cluttervis('initial');
			mp_fullscreen.style.borderColor = '#0FF';
			break;
		case 1:
			document.body.requestFullscreen();
			cluttervis('none');
			mp_fullscreen.style.borderColor = 'orange';
			break;
		case 2:
			document.exitFullscreen();
			cluttervis('initial');
			mp_fullscreen.style.borderColor = '#FFF';
			break;
	}
	mp_fullscreen_state++;
}

document.body.addEventListener('fullscreenchange', e => {
	if (document.fullscreenElement == null) {
		mp_fullscreen_state = 0;
		cluttervis('initial');
		mp_fullscreen.style.borderColor = '#FFF';
	}
});

var mp_help_open = false;
mp_help.onclick = function() {
	if (mp_help_open) return;
	let help_popup_div = document.createElement('div');
	let help_popup_inner_div = document.createElement('div');
	let help_popup_close_btn = document.createElement('button');
	let help_popup_heading = document.createElement('h3');
	let help_popup_text = document.createElement('p');
	
	help_popup_div.className = 'mp_help_popup';
	
	help_popup_heading.innerText = 'cvrs music help because design stupid';
	
	help_popup_text.innerHTML = 'click on a song to start, if its finished the next song in the album will play.<br>music is paused, seeked, etc with the audio controls at the top. the exact look depends on your browser.<br>down below is a bar of buttons: <ol><li>skip to the next/prev song in album</li><li>audio quality button. changes between OPUS/AAC/MP3 (SD) and FLAC (HD) audio.<br>if it turns cyan, that means HD is supported and playing, <wbr>if its in HD mode but stays white, HD is not sopported for this track (yet)</li><li>fullscreen button. has 3 modes: <wbr>normal, fullscreen, fullscreen with no clutter</li><li>FPS limiter. can do max, half, third, quarter FPS. saves CPU and battery. <wbr>Also prevents crashing on <s>Applenet Explorar</s> iOS Safari.</li></ol>';
	
	help_popup_close_btn.innerText = 'Close Help';
	help_popup_close_btn.onclick = function() {help_popup_div.remove(); mp_help_open = false;};
	
	help_popup_inner_div.appendChild(help_popup_heading);
	help_popup_inner_div.appendChild(help_popup_text);
	help_popup_inner_div.appendChild(help_popup_close_btn);
	help_popup_div.appendChild(help_popup_inner_div);
	document.body.appendChild(help_popup_div);
	
	mp_help_open = true;
}
}

catch (err) {
	mp_handle_error(err, "Controls");
}
