// Frequency Setup
// function setup() {
//     createCanvas(windowWidth / 1.5, windowHeight / 1.5);
//     let btn = createButton("Play");
//     btn.mousePressed(toggleSong);
//     colorMode(HSB);
//     angleMode(DEGREES);
//     fft = new p5.FFT(.98, 256);
//     song.play();
// }

// draw using Frequency
// function draw() {
//     let spectrum = fft.analyze();
//     background(0);
//     noStroke();
//     translate(width / 2, height / 2);
//     beginShape();
//     for (let a = 0; a < spectrum.length; a++) {
//         let angle = map(a, 0, spectrum.length, 0, 360);
//         var amp = spectrum[a];
//         let r = map(amp, 0, 360, 20, 100);
//         let x = r * cos(angle*1.5);
//         let y = r * sin(angle*1.5);
//         vertex(x, y);
//     }
//     endShape(CLOSE);
//     phase += .01;
//     zoff += .01;
// }

// // Mic Setup
// function toggleMic() {
//     mic.start(successCall, errorCall);
// }
// function errorCall() {
//     console.log("error")
// }
// function successCall() {
//     console.log("success")
//     console.log(mic.getSources())
// }
// function gotSources(deviceList) {
//     if (deviceList.length > 0) {
//     //set the source to the first item in the deviceList array
//       mic.setSource(0);
//       let currentSource = deviceList[mic.currentSource];
//       text('set source to: ' + currentSource.deviceId, 5, 20, width);
//     }
// }
// function setup() {
//     createCanvas(windowWidth / 1.5, windowHeight / 1.5);
//     let microphone = createButton("Turn on Mic");
//     amp = new p5.Amplitude();
//     fft = new p5.FFT();
//     mic = new p5.AudioIn();
    
//     mic.getSources(gotSources);
//     // mic.connect();
//     microphone.mousePressed(toggleMic);
//     // noiseSlider = createSlider(0, 10, 10, 0.1);
//     spaceSlider = createSlider(.1, 15, .1, .1);
//     strokeSlider = createSlider(1, 10, 2, .5);
// }

// // draw using Mic Noise
// function draw() {
//     let vol = mic.getLevel();
//     // chrome only works with this line uncommented for some reason
//     console.log(vol)
//     let fre = fft.analyze();
//     let centroid = fft.getCentroid();
//     background(0);
//     translate(width / 2, height / 2);
//     stroke(255);
//     let w = strokeSlider.value();
//     strokeWeight(w);
//     beginShape(POINTS);
//     // let noiseMax = noiseSlider.value();
//     let spacing = spaceSlider.value();
//     for (let a = 0; a < TWO_PI; a += radians(spacing/2)) {
//         let xoff = map(cos(a + phase), -1, 1, 0, (vol *20));
//         let yoff = map(sin(a + phase), -1, 1, 0, (vol *20));
//         let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
//         let x = r * cos(a);
//         let y = r * sin(a);
//         vertex(x, y);
//     }
//     endShape(CLOSE);
//     phase += (vol);
//     zoff += (vol);
// }