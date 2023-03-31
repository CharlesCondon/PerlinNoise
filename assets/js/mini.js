let song,amp,mic,phase=0,zoff=0,spaceSlider,strokeSlider;var starSpeed,stars=[];let rToggle=1,r,g,b;function preload(){song=loadSound("daftPunk.mp3")}function toggleSong(){song.isPlaying()?(song.pause(),document.getElementById("playImg").src="assets/images/playBtn.png"):(song.play(),document.getElementById("playImg").src="assets/images/pauseBtn.png")}function toggleSettings(){let e=document.getElementById("controls");e.classList.toggle("animate__fadeInRight"),e.classList.toggle("hide")}function toggleMusic(){let e=document.getElementById("musicChoice");e.classList.toggle("animate__fadeInLeft"),e.classList.toggle("hide")}function changeSong(){toggleSong(),song=loadSound(`${this.id}.mp3`)}function setup(){createCanvas(windowWidth,windowHeight).parent("visuals");for(var e=0;e<800;e++)stars[e]=new Star;document.getElementById("playBtn").addEventListener("click",toggleSong);document.getElementById("controlsCont").addEventListener("click",toggleSettings);document.getElementById("musicBtn").addEventListener("click",toggleMusic),document.getElementById("disco");let t=document.getElementById("daftPunk"),n=document.getElementById("kiss"),s=document.getElementById("river"),l=document.getElementById("mientras");t.addEventListener("click",changeSong),n.addEventListener("click",changeSong),s.addEventListener("click",changeSong),l.addEventListener("click",changeSong),amp=new p5.Amplitude,fft=new p5.FFT,spaceSlider=createSlider(.5,15,.1,.1),strokeSlider=createSlider(1,10,2,.5),numSlider=createSlider(1,5,1,1),qSlider=createSlider(1.1,3,1.5,.1),spaceSlider.parent("spacing"),strokeSlider.parent("thickness"),numSlider.parent("dupes"),qSlider.parent("deviation"),windowWidth<600&&(rToggle=.5)}function draw(){disco.checked?(r=Math.floor(255*Math.random())+100,g=Math.floor(255*Math.random())+100,b=Math.floor(255*Math.random())+100):(r=255,g=255,b=255);let e=amp.getLevel();fft.analyze();let t=fft.getCentroid();background(0),translate(width/2,height/2),stroke(r,g,b);let n=strokeSlider.value();beginShape(POINTS),strokeWeight(n);let s=spaceSlider.value(),l=numSlider.value(),a=qSlider.value(),o=500;for(let i=0;i<TWO_PI;i+=radians(s/2)){let d=map(cos(i+phase),-1,1,0,t/o),c=map(sin(i+phase),-1,1,0,t/o),p=map(noise(d,c,zoff),0,1,100,height/2),$=p*rToggle*cos(i),m=p*rToggle*sin(i);vertex($,m)}if(l>1)for(let _=1;_<l;_++){for(let f=0;f<TWO_PI;f+=radians(s/2)){let u=map(cos(f+phase),-1,1,0,t/o),h=map(sin(f+phase),-1,1,0,t/o),S=map(noise(u,h,zoff),0,1,100,height/2),y=S*rToggle*cos(f),E=S*rToggle*sin(f);vertex(y,E)}o*=a}endShape(CLOSE),starSpeed=map(t/20,0,width,0,50);for(var v=0;v<stars.length;v++)strokeWeight(2),stars[v].update(),stars[v].show();phase+=e/4,zoff+=e/8}