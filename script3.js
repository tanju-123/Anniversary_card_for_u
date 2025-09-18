const revealBtn = document.getElementById('revealBtn');
const typed = document.getElementById('typed');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');

const fullMessage = `मेरी Aastha ❤️,\n
2 साल और 8 महीने का ये सफ़र, मेरी ज़िंदगी का सबसे खूबसूरत तोहफ़ा है।  
तेरी मुस्कान मेरी दुनिया की रोशनी है और तेरा साथ मेरी हर दुआ का जवाब।  

✨ शायरी ✨  
"Aastha, तू मेरी दुआओं का वो रंग है,  
मेरे दिल की हर धड़कन का संग है।  
तेरे बिना ये सफ़र अधूरा सा लगे,  
तू है तो लगता है सब कुछ रंगीन है।" 💖`;

function typeText(element, text, speed=40) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

revealBtn.addEventListener('click', () => {
  typed.innerHTML = "";
  typeText(typed, fullMessage);
  startConfetti();
});

// Copy
copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(fullMessage);
  alert("Message Copied! 💖");
});

// Share
shareBtn.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({
      title: "Anniversary Message",
      text: fullMessage
    });
  } else {
    alert("Sharing not supported in this browser.");
  }
});

// Save as file
saveBtn.addEventListener('click', () => {
  const blob = new Blob([fullMessage], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = "Anniversary_Message.txt";
  link.click();
});

// 🎉 Confetti
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let particles = [];
for (let i=0; i<150; i++) {
  particles.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 2,
    d: Math.random() * 150
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.beginPath();
  for (let i=0; i<particles.length; i++) {
    let p = particles[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
  }
  ctx.fill();
  update();
}

let angle = 0;
function update() {
  angle += 0.01;
  for (let i=0; i<particles.length; i++) {
    let p = particles[i];
    p.y += Math.cos(angle + p.d) + 1 + p.r/2;
    p.x += Math.sin(angle) * 2;

    if (p.y > confettiCanvas.height) {
      particles[i] = {x: Math.random()*confettiCanvas.width, y:0, r:p.r, d:p.d};
    }
  }
}

function startConfetti() {
  setInterval(drawConfetti, 20);
}
