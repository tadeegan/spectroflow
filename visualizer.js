var WIDTH = $(window).width() * 3;
var HEIGHT = ($(window).height() - 80) * .35;
$("#line-canvas").attr("width", WIDTH);
$("#line-canvas").attr("height", HEIGHT);

var SMOOTHING = 1.0;
var FFT_SIZE = 2048;

function Visualizer() {
  this.analyser = context.createAnalyser();

  this.analyser.connect(context.destination);
  this.analyser.minDecibels = -140;
  this.analyser.maxDecibels = 0;
  loadSounds(this, {
    buffer: document.getElementsByTagName('audio')[0].src
  });
  this.freqs = new Uint8Array(this.analyser.frequencyBinCount);
  this.times = new Uint8Array(this.analyser.frequencyBinCount);

  this.isPlaying = false;
  this.startTime = 0;
  this.startOffset = 0;
}

// Toggle playback
Visualizer.prototype.togglePlayback = function() {
  if (this.isPlaying) {
    // Stop playback
    this.source.noteOff(0);
    this.startOffset += context.currentTime - this.startTime;
    console.log('paused at', this.startOffset);
    // Save the position of the play head.
  } else {
    this.startTime = context.currentTime;
    console.log('started at', this.startOffset);
    this.source = context.createBufferSource();
    // Connect graph
    this.source.connect(this.analyser);
    this.source.buffer = this.buffer;
    this.source.loop = true;
    // Start playback, but make sure we stay in bound of the buffer.
    this.source.start(0, this.startOffset % this.buffer.duration);
    // Start visualizer.
    requestAnimFrame(this.draw.bind(this));
  }
  this.isPlaying = !this.isPlaying;
}

Visualizer.prototype.run = function() {
  this.startTime = context.currentTime;
    console.log('started at', this.startOffset);
    this.source = context.createBufferSource();
    // Connect graph
    this.source.connect(this.analyser);
    this.source.buffer = this.buffer;
    this.source.loop = true;
    // Start playback, but make sure we stay in bound of the buffer.
    this.source.start(0, this.startOffset % this.buffer.duration);
    // Start visualizer.
    requestAnimFrame(this.draw.bind(this));
}

Visualizer.prototype.halt = function() {
    this.source.noteOff(0);
    this.startOffset += context.currentTime - this.startTime;
}

Visualizer.prototype.draw = function() {
  this.analyser.smoothingTimeConstant = SMOOTHING;
  this.analyser.fftSize = FFT_SIZE;

  // Get the frequency data from the currently playing music
  this.analyser.getByteFrequencyData(this.freqs);
  this.analyser.getByteTimeDomainData(this.times);

  var width = Math.floor(1/this.freqs.length, 10);

  var canvas = document.getElementById('line-canvas');
  var drawContext = canvas.getContext('2d');

  // Draw the time domain waveform
  // how the signals change over time
  for (var i = 0; i < this.analyser.frequencyBinCount; i++) {
    var value = this.times[i];
    var percent = value / 256;
    var height = HEIGHT * percent * .66;
    var offset = HEIGHT - height - 1;
    var barWidth = WIDTH/this.analyser.frequencyBinCount;
    drawContext.fillStyle = '#666680';
    drawContext.fillRect(i * barWidth, offset, 5, 5);
  }

  if (this.isPlaying) {
    requestAnimFrame(this.draw.bind(this));
  }
}

Visualizer.prototype.getFrequencyValue = function(freq) {
  var nyquist = context.sampleRate/2;
  var index = Math.round(freq/nyquist * this.freqs.length);
  return this.freqs[index];
}