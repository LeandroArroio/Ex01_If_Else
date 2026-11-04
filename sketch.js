let targets = [];   // guarda os alvos na tela
let effects = [];   // guarda os efeitos visuais ao acertar num alvo
let trail = [];     // guarda o histórico do rato para desenhar o rastro
let audioCtx;       // áudio do navegador

function setup() {
  createCanvas(800, 600); 
  noCursor();             
  createTarget();         
}

function draw() {
  background(0);

  if (frameCount % 60 === 0) {
    createTarget();
  }

  drawTargets();   
  drawEffects();   
  drawCrosshair(); 
}

function mousePressed() {
 
  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];
    
    if (dist(mouseX, mouseY, t.x, t.y) < t.r) {
      
      effects.push({ x: t.x, y: t.y, r: t.r * 0.3, opacity: 255 });
      
      targets.splice(i, 1);  
      playWaterDropSound();  
      break;                 
    }
  }
}

function drawTargets() {
  for (let i = targets.length - 1; i >= 0; i--) {
    let t = targets[i];
    
    
    if (millis() - t.creationTime > 1000) {
      targets.splice(i, 1);
    } else {
      noStroke(); 
      
      
      let mainColor;
      if (dist(mouseX, mouseY, t.x, t.y) < t.r) {
        mainColor = color(255, 100, 100); 
      } else {
        mainColor = color(100, 200, 255); 
      }
      
      fill(mainColor); circle(t.x, t.y, t.r * 2);   
      fill(255);       circle(t.x, t.y, t.r * 1.3); 
      fill(mainColor); circle(t.x, t.y, t.r * 0.6); 
    }
  }
}

function drawEffects() {
  for (let i = effects.length - 1; i >= 0; i--) {
    let e = effects[i];
    
    noFill();
    stroke(255, e.opacity);
    strokeWeight(4);
    circle(e.x, e.y, e.r * 2); 

    e.r += 2;
    e.opacity -= 5;
    
    if (e.opacity <= 0) {
      effects.splice(i, 1);
    }
  }
}

function createTarget() {
  targets.push({
    x: random(35, width - 35),  
    y: random(35, height - 35), 
    r: 35,                      
    creationTime: millis()      
  });
}

function drawCrosshair() {

  trail.push({ x: mouseX, y: mouseY });
  
  if (trail.length > 20) {
    trail.shift();
  }

  noFill();
  for (let i = 0; i < trail.length - 1; i++) {
    strokeWeight(2);
    stroke(255, 0, 0, map(i, 0, trail.length, 0, 255));
    line(trail[i].x, trail[i].y, trail[i+1].x, trail[i+1].y);
  }

  strokeWeight(2);
  if (mouseIsPressed) {
    stroke(255); 
  } else {
    stroke(255, 0, 0); 
  }
  
  
  line(mouseX - 15, mouseY, mouseX + 15, mouseY); 
  line(mouseX, mouseY - 15, mouseX, mouseY + 15); 
}

function playWaterDropSound() {

  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  let now = audioCtx.currentTime;
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();

  osc.type = 'sine';
  
  osc.frequency.setValueAtTime(400, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.07);

  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.07);
}