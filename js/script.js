/* ---------------- custom cursor ---------------- */
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
window.addEventListener('mousemove', e=>{
  dot.style.left = e.clientX+'px'; dot.style.top = e.clientY+'px';
  ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px';
});
document.querySelectorAll('a, button, input, .flip-card').forEach(el=>{
  el.addEventListener('mouseenter', ()=>document.body.classList.add('cursor-hot'));
  el.addEventListener('mouseleave', ()=>document.body.classList.remove('cursor-hot'));
});

/* ---------------- matrix rain ---------------- */
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
let w,h,cols,drops;
function sizeCanvas(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cols = Math.floor(w/16);
  drops = new Array(cols).fill(0).map(()=>Math.random()*-50);
}
sizeCanvas();
window.addEventListener('resize', sizeCanvas);
const glyphs = "01ABCDEFISO27001HEX{}<>/*-";
function drawRain(){
  ctx.fillStyle = "rgba(5,7,13,0.14)";
  ctx.fillRect(0,0,w,h);
  ctx.font = "14px 'Share Tech Mono', monospace";
  for(let i=0;i<cols;i++){
    const text = glyphs[Math.floor(Math.random()*glyphs.length)];
    const x = i*16;
    const y = drops[i]*16;
    const grad = Math.random() > 0.965 ? '#ff3ec8' : (Math.random()>0.9 ? '#ffb62b' : '#39ff8a');
    ctx.fillStyle = grad;
    ctx.fillText(text, x, y);
    if(y > h && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawRain, 55);

/* ---------------- boot terminal typing ---------------- */
const bootLines = [
  {t:"initializing sentinel core...", cls:"muted"},
  {t:"loading ISO/IEC 27002 control set [5.16 - 5.20]", cls:"cyan"},
  {t:"identity lifecycle .......... OK", cls:""},
  {t:"authentication vault ........ OK", cls:""},
  {t:"access rights matrix ........ OK", cls:""},
  {t:"supplier trust chain ........ OK", cls:""},
  {t:"welcome, INTERN_2169. clearance verified.", cls:"cyan"},
];
const termBody = document.getElementById('bootTerminal');
let li = 0, ci = 0;
function typeBoot(){
  if(li >= bootLines.length){
    termBody.innerHTML += '<div><span class="terminal-cursor"></span></div>';
    return;
  }
  const line = bootLines[li];
  if(ci === 0){ termBody.innerHTML += `<div class="line${li} ${line.cls}"></div>`; }
  const lineEls = termBody.querySelectorAll(`.line${li}`);
  const el = lineEls[lineEls.length-1];
  el.textContent = line.t.slice(0, ci+1);
  ci++;
  if(ci <= line.t.length){
    setTimeout(typeBoot, 14);
  } else {
    li++; ci = 0;
    setTimeout(typeBoot, 160);
  }
}
setTimeout(typeBoot, 500);

/* ---------------- 3D tilt on flip cards ---------------- */
document.querySelectorAll('.flip-card').forEach(card=>{
  const inner = card.querySelector('.flip-inner');
  card.addEventListener('mousemove', e=>{
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - .5;
    const y = (e.clientY - r.top)/r.height - .5;
    inner.style.setProperty('--tx', x);
    card.style.transform = `rotateX(${y*-10}deg) rotateY(${x*10}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = 'rotateX(0) rotateY(0)'; });
});

/* ---------------- reveal on scroll ---------------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------------- password strength lab ---------------- */
const pwInput = document.getElementById('pwInput');
const pwMeter = document.getElementById('pwMeter');
const pwVerdict = document.getElementById('pwVerdict');
pwInput.addEventListener('input', ()=>{
  const v = pwInput.value;
  let score = 0;
  if(v.length >= 8) score += 20;
  if(v.length >= 12) score += 20;
  if(/[A-Z]/.test(v)) score += 15;
  if(/[a-z]/.test(v)) score += 15;
  if(/[0-9]/.test(v)) score += 15;
  if(/[^A-Za-z0-9]/.test(v)) score += 15;
  score = Math.min(score,100);
  pwMeter.style.width = score+'%';
  let verdict = '// awaiting input...';
  if(v.length===0) verdict = '// awaiting input...';
  else if(score < 40) verdict = '⚠ WEAK — clause 5.17 says: mix cases, digits, symbols, 12+ chars.';
  else if(score < 75) verdict = '~ MODERATE — getting there. Add length or a symbol.';
  else verdict = '✓ STRONG — would pass a Tech Solutions privileged-account check.';
  pwVerdict.textContent = verdict;
});

/* ---------------- fake sentinel console ---------------- */
const out = document.getElementById('consoleOut');
const cmdInput = document.getElementById('cmdInput');
function printLine(text, cls){
  const d = document.createElement('div');
  if(cls) d.className = cls;
  d.textContent = text;
  out.appendChild(d);
  out.scrollTop = out.scrollHeight;
}
const clauseMap = {
  "5.16": "Identity lifecycle: unique IDs, shared-account approval, prompt deprovisioning.",
  "5.17": "Authentication info: random temp passwords, no default creds, secure delivery only.",
  "5.18": "Access rights: least privilege, segregation of duties, regular review.",
  "5.19": "Supplier security: risk-based evaluation and monitored access.",
  "5.20": "Supplier agreements: classification, incident duties, secure termination terms."
};
function runCommand(){
  const raw = cmdInput.value.trim();
  if(!raw) return;
  printLine('root@sentinel:~$ '+raw, 'sys');
  const cmd = raw.toLowerCase();
  if(cmd === 'help'){
    printLine('available: help, scan, status, clear, clause <5.16-5.20>', 'ok');
  } else if(cmd === 'scan'){
    printLine('scanning perimeter...', '');
    setTimeout(()=>printLine('0 open threats. 5 controls enforced. all clear.', 'ok'), 500);
  } else if(cmd === 'status'){
    printLine('SENTINEL STATUS: ONLINE | INTERN_2169 | CLEARANCE: GRANTED', 'ok');
  } else if(cmd === 'clear'){
    out.innerHTML = '';
  } else if(cmd.startsWith('clause')){
    const key = raw.split(' ')[1];
    if(key && clauseMap[key]) printLine(clauseMap[key], 'ok');
    else printLine('unknown clause. try 5.16, 5.17, 5.18, 5.19, or 5.20', 'warn');
  } else if(cmd === 'sudo make me admin'){
    printLine('nice try. segregation of duties says no. (clause 5.18)', 'warn');
  } else {
    printLine('command not recognized. type "help".', 'warn');
  }
  cmdInput.value = '';
}
cmdInput.addEventListener('keydown', e=>{ if(e.key === 'Enter') runCommand(); });

/* ---------------- konami easter egg ---------------- */
const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let pos = 0;
window.addEventListener('keydown', e=>{
  pos = (e.key === seq[pos]) ? pos+1 : 0;
  if(pos === seq.length){
    pos = 0;
    document.getElementById('easter-toast').classList.add('show');
    document.body.style.filter = 'hue-rotate(140deg)';
    setTimeout(()=>{
      document.getElementById('easter-toast').classList.remove('show');
      document.body.style.filter = '';
    }, 3200);
  }
});

/* orbit dot around shield */
let orbitAngle = 0;
function animateOrbit(){
  orbitAngle += 0.03;
  const r = 130;
  const x = Math.cos(orbitAngle)*r;
  const z = Math.sin(orbitAngle)*r;
  document.getElementById('orbitDot').style.transform = `translate3d(${x}px, 0px, ${z}px)`;
  requestAnimationFrame(animateOrbit);
}
animateOrbit();
