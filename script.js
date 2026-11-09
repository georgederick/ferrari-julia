const NOME = "campeã"; // troque pelo nome dela
document.getElementById("nome").textContent = NOME;
document.querySelectorAll(".n").forEach(e => e.textContent = NOME);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* estrelas */
const cv = document.getElementById("stars"), cx = cv.getContext("2d");
let stars = [];
function size(){ cv.width = innerWidth; cv.height = innerHeight; stars = Array.from({length:Math.min(140,innerWidth/4)},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*1.4+.3,p:Math.random()*6})); }
function draw(t){ cx.clearRect(0,0,cv.width,cv.height); for(const s of stars){ cx.globalAlpha = .4+.6*Math.abs(Math.sin(t/1200+s.p)); cx.fillStyle="#fff"; cx.beginPath(); cx.arc(s.x,s.y,s.r,0,7); cx.fill(); } if(!reduce) requestAnimationFrame(draw); }
addEventListener("resize",size); size(); requestAnimationFrame(draw);

/* largada */
const intro = document.getElementById("intro"), it = document.getElementById("introTxt");
const lts = [...document.querySelectorAll(".lt")]; let done = false, timers = [];
function end(){ if(done) return; done = true; timers.forEach(clearTimeout); lts.forEach(l=>l.classList.remove("on")); it.textContent="Lights out! Boa noite!"; setTimeout(()=>intro.classList.add("gone"), reduce?100:900); }
lts.forEach((l,i)=>timers.push(setTimeout(()=>l.classList.add("on"), 700+i*800)));
timers.push(setTimeout(end, 700+5*800+1200));
intro.addEventListener("click", end);
intro.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" ") end(); });

/* cartinha */
const env = document.getElementById("env"), letter = document.getElementById("letter");
env.addEventListener("click", ()=>{
  const open = env.classList.toggle("open");
  letter.classList.toggle("show", open);
  env.setAttribute("aria-expanded", open);
  document.getElementById("envHint").textContent = open ? "toque de novo para fechar" : "toque no envelope para abrir";
  if(open) setTimeout(()=>letter.scrollIntoView({behavior:reduce?"auto":"smooth",block:"center"}), 500);
});

/* voltas */
const trk = document.getElementById("trk"), car = document.getElementById("car"), total = trk.getTotalLength();
function place(f){ const p = trk.getPointAtLength((f*total)%total); car.setAttribute("cx",p.x); car.setAttribute("cy",p.y); }
place(0.17);
const msgs = ["Volta 1: respira fundo e solta os ombros.","Volta 2: lembra de uma coisa boa que aconteceu hoje.","Volta 3: o dia ficou lá atrás, só tem pista livre.","Volta 4: os olhos já estão ficando pesados…","Volta 5: bandeira quadriculada. Missão cumprida, campeã. 🏁"];
let lap = 0, busy = false;
const lapbtn = document.getElementById("lapbtn");
lapbtn.addEventListener("click", ()=>{
  if(busy || lap>=5) return; busy = true;
  const start = performance.now(), dur = reduce?100:1800;
  (function step(t){ const f = Math.min(1,(t-start)/dur); place(0.17+f); if(f<1) requestAnimationFrame(step); else{
    lap++; busy = false; document.getElementById("lapn").textContent = lap; document.getElementById("lapmsg").textContent = msgs[lap-1];
    if(lap===5){ lapbtn.disabled = true; lapbtn.textContent = "Dorme bem"; document.getElementById("flag").classList.add("on"); document.body.classList.add("sleep"); }
  }})(start);
});

/* rádio */
const radio = ["“Box, box! Hora de parar pro pit stop de sono.”","“Pneus macios na troca: o travesseiro está liberado.”","“Seu ritmo hoje foi incrível. Pode desacelerar.”","“Safety car na pista: modo descanso ativado.”","“Amanhã a gente volta pra largada. Agora, câmbio, desligo.”"];
let ri = 0;
document.getElementById("radiobtn").addEventListener("click", ()=>{ document.getElementById("radiotxt").textContent = radio[ri++ % radio.length]; });
