let song;
let amp;
let mic;
let phase = 0;
let zoff = 0;
let noiseSlider;
let spaceSlider;
let strokeSlider;
var stars = [];
var starSpeed;
let rToggle = 1;
let r;
let g;
let b;

function preload() {
    song = loadSound("daftPunk.mp3");
}

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
        document.getElementById("playImg").src = "assets/images/playBtn.png";
    } else {
        song.play();
        document.getElementById("playImg").src = "assets/images/pauseBtn.png";
    }
}
function toggleSettings() {
    let controls = document.getElementById("controls");
    controls.classList.toggle("animate__fadeInRight");
    controls.classList.toggle("hide");
}

// Perlin Noise Setup
function setup() {
    var initCanvas = createCanvas(windowWidth, windowHeight);
    initCanvas.parent("visuals");
    for (var i = 0; i < 800; i++) {
        stars[i] = new Star();
    }
    let btn = document.getElementById("playBtn");
    btn.addEventListener('click', toggleSong);
    let settings = document.getElementById("controlsCont");
    settings.addEventListener('click', toggleSettings);
    let disco = document.getElementById("disco");
    
    amp = new p5.Amplitude();
    fft = new p5.FFT();
    spaceSlider = createSlider(.5, 15, .1, .1);
    strokeSlider = createSlider(1, 10, 2, .5);
    numSlider = createSlider(1, 5, 1, 1);
    qSlider = createSlider(1.1, 3, 1.5, .1);

    spaceSlider.parent("spacing");
    strokeSlider.parent("thickness");
    numSlider.parent("dupes");
    qSlider.parent("deviation");

    if (windowWidth < 600) {
        rToggle = .5;
    }
}

// draw using Perlin Noise
function draw() {
    if (disco.checked) {
        r = Math.floor(Math.random()*255)+100
        g = Math.floor(Math.random()*255)+100
        b = Math.floor(Math.random()*255)+100
    }
    else {
        r = 255;
        g = 255;
        b = 255;
    }
    let vol = amp.getLevel();
    let fre = fft.analyze();
    let centroid = fft.getCentroid();
    background(0);
    translate(width / 2, height / 2);
    stroke(r, g, b);
    let w = strokeSlider.value();
    beginShape(POINTS);
    strokeWeight(w);
    let spacing = spaceSlider.value();
    let circleNum = numSlider.value();
    let qNum = qSlider.value();
    let q = 500;

    for (let a = 0; a < TWO_PI; a += radians(spacing/2)) {
        let xoff = map(cos(a + phase), -1, 1, 0, (centroid/q));
        let yoff = map(sin(a + phase), -1, 1, 0, (centroid/q));
        let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
        let x = (r * rToggle) * cos(a);
        let y = (r * rToggle) * sin(a);
        vertex(x, y);
    }

    if(circleNum>1) {
        for (let k=1; k<circleNum; k++) {
            for (let a = 0; a < TWO_PI; a += radians(spacing/2)) {
                let xoff = map(cos(a + phase), -1, 1, 0, (centroid/q));
                let yoff = map(sin(a + phase), -1, 1, 0, (centroid/q));
                let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
                let x = (r * rToggle) * cos(a);
                let y = (r * rToggle) * sin(a);
                vertex(x, y);
            }
            q=q*qNum;
        }
    }
    endShape(CLOSE);
    starSpeed = map(centroid/20, 0, width, 0, 50);
    for (var i = 0; i < stars.length; i++) {
        strokeWeight(2);
        stars[i].update();
        stars[i].show();
    }
    phase += (vol/4);
    zoff += (vol/8);
}

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