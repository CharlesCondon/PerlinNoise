let song;
let amp;
let mic;
let phase = 0;
let zoff = 0;
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
function toggleInfo() {
    let info = document.getElementById("infoBlob");
    info.classList.toggle("animate__fadeIn");
    info.classList.toggle("hide");
}
function toggleMusic() {
    let music = document.getElementById("musicChoice");
    music.classList.toggle("animate__fadeInLeft");
    music.classList.toggle("hide");
}
function changeSong() {
    if (song.isPlaying()) {
        song.pause();
        document.getElementById("playImg").src = "assets/images/playBtn.png";
    }
    song = loadSound(`${this.id}.mp3`);
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

    let musicCont = document.getElementById("musicBtn");
    musicCont.addEventListener('click', toggleMusic);

    let infoCont = document.getElementById("infoCont");
    infoCont.addEventListener('click', toggleInfo);

    let disco = document.getElementById("disco");

    let daft = document.getElementById("daftPunk");
    let kiss = document.getElementById("kiss");
    let alice = document.getElementById("river");
    let solitude = document.getElementById("mientras");
    let death = document.getElementById("getGot");
    daft.addEventListener('click', changeSong);
    kiss.addEventListener('click', changeSong);
    alice.addEventListener('click', changeSong);
    solitude.addEventListener('click', changeSong);
    death.addEventListener('click', changeSong);
    
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