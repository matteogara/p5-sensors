let video;
let audio;
let bufferThreshold;
let bufferPosterize;

function setup() {
  createCanvas(500, 400);
  video = createCapture(VIDEO);
  video.size(500, 400);
  video.hide();
  
  audio = new p5.AudioIn();
  audio.start();
  
  bufferThreshold = createGraphics(500, 400);
  bufferPosterize = createGraphics(500, 400);
}

function draw() {
  let volume = audio.getLevel();
  console.log(volume);

  let threshold = map(volume, 0, 0.008, 0.1, 0.8);
  
  let colorLevels = map(volume, 0, 0.008, 1, 8);
  
  bufferThreshold.image(video, 0, 0);
  bufferThreshold.filter(THRESHOLD, threshold);
  
  bufferPosterize.image(video, 0, 0);
  bufferPosterize.filter(POSTERIZE, colorLevels);
 
  image(bufferThreshold, 0, 0);
  
  blend(bufferPosterize, 0, 0, 500, 400, 0, 0, 500, 400, EXCLUSION);
}
