/* 1. Scroll reveal */
(function(){
var els=document.querySelectorAll('section h2,section .lead,.card,.steps div,.skills span,.contact p');
els.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=((i%4)*90)+'ms'});
if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
els.forEach(function(e){io.observe(e)});
})();

/* 2. Skills parallax */
(function(){
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var sec=document.getElementById('skills');if(!sec)return;
var rows=sec.querySelectorAll('[data-speed]'),layers=sec.querySelectorAll('[data-depth]'),tick=false;
function update(){
tick=false;
var vh=window.innerHeight,r=sec.getBoundingClientRect();
if(r.bottom<-100||r.top>vh+100)return;
var p=(r.top+r.height/2)-vh/2,k=window.innerWidth<600?0.7:1.9;
rows.forEach(function(el){el.style.transform='translate3d('+(p*parseFloat(el.dataset.speed)*k).toFixed(1)+'px,0,0)'});
layers.forEach(function(el){el.style.transform='translate3d(0,'+(p*parseFloat(el.dataset.depth)*2).toFixed(1)+'px,0) rotate('+(p*0.09).toFixed(1)+'deg)'});
}
function onScroll(){if(!tick){tick=true;requestAnimationFrame(update)}}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',onScroll);
update();
})();

/* 3. Section animation variants, progress bar, hero parallax, process line */
(function(){
function add(s,c){document.querySelectorAll(s).forEach(function(e){e.classList.add(c)})}
add('#services .card','v-flip');
add('#work .card:nth-child(odd)','v-left');
add('#work .card:nth-child(even)','v-right');
add('.steps div','v-left');
add('#about .lead','v-blur');
add('#contact .wrap > *','v-zoom');
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var bar=document.getElementById('bar'),hw=document.getElementById('heroWrap'),hl=document.querySelectorAll('.hero-layer'),hdr=document.getElementById('top'),steps=document.querySelector('.steps'),t=false;
function frame(){
t=false;
var y=window.scrollY||document.documentElement.scrollTop,vh=window.innerHeight,H=document.documentElement.scrollHeight-vh;
bar.style.transform='scaleX('+(H>0?Math.min(y/H,1):0)+')';
var hh=hdr.offsetHeight;
if(y<hh+100){
hw.style.transform='translate3d(0,'+(y*0.4).toFixed(1)+'px,0)';
hw.style.opacity=Math.max(0,1-y/(hh*0.85)).toFixed(2);
hl.forEach(function(l){l.style.transform='translate3d(0,'+(y*parseFloat(l.dataset.hd)).toFixed(1)+'px,0) scale('+(1+y/900).toFixed(3)+')'});
}
if(steps){var r=steps.getBoundingClientRect();var p=Math.min(1,Math.max(0,(vh*0.8-r.top)/r.height));steps.style.setProperty('--p',p.toFixed(3))}
}
function on(){if(!t){t=true;requestAnimationFrame(frame)}}
addEventListener('scroll',on,{passive:true});addEventListener('resize',on);frame();
})();

/* 4. Typing, cursor glow, magnetic buttons, spotlight, nav highlight, counters, marquee skew, particles */
(function(){
var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var words=['websites','brand identities','automations','AI security tools'];
var tEl=document.getElementById('typed');
if(rm){return}
var wi=0,ci=0,del=false;
function type(){var w=words[wi];ci+=del?-1:1;tEl.textContent=w.slice(0,ci);var d=del?45:90;if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=350}setTimeout(type,d)}
tEl.textContent='';type();
var glow=document.getElementById('glow');
addEventListener('mousemove',function(e){glow.style.opacity='.13';glow.style.transform='translate3d('+e.clientX+'px,'+e.clientY+'px,0)'});
document.addEventListener('mouseleave',function(){glow.style.opacity='0'});
document.querySelectorAll('.card').forEach(function(c){c.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
document.querySelectorAll('.btn,nav a.logo').forEach(function(b){
b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();var x=(e.clientX-r.left-r.width/2)*0.3,y=(e.clientY-r.top-r.height/2)*0.4;b.style.translate=x.toFixed(1)+'px '+y.toFixed(1)+'px'});
b.addEventListener('mouseleave',function(){b.style.translate='0 0'});
});
var links={};document.querySelectorAll('nav a[href^="#"]').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
var sio=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){Object.keys(links).forEach(function(k){links[k].classList.remove('active')});if(links[e.target.id])links[e.target.id].classList.add('active')}})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section[id]').forEach(function(s){sio.observe(s)});
var cio=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;cio.unobserve(e.target);var b=e.target.querySelector('b'),to=+b.dataset.to,suf=b.dataset.suf||'',t0=performance.now();(function step(n){var p=Math.min(1,(n-t0)/1400),v=Math.round(to*(1-Math.pow(1-p,3)));b.textContent=v+(p<1?'':suf);if(p<1)requestAnimationFrame(step)})(t0)})},{threshold:.5});
document.querySelectorAll('.stat').forEach(function(s){s.querySelector('b').textContent='0';cio.observe(s)});
var mq=document.getElementById('mq'),last=window.scrollY,cur=0,tgt=0,run=false;
function loop(){cur+=(tgt-cur)*0.12;tgt*=0.9;mq.style.setProperty('--sk',cur.toFixed(2)+'deg');if(Math.abs(cur)>0.03||Math.abs(tgt)>0.03)requestAnimationFrame(loop);else{run=false;mq.style.setProperty('--sk','0deg')}}
addEventListener('scroll',function(){var y=window.scrollY,v=y-last;last=y;tgt=Math.max(-9,Math.min(9,-v*0.35));if(!run){run=true;requestAnimationFrame(loop)}},{passive:true});
var cv=document.getElementById('net'),hdr=document.getElementById('top'),cx=cv.getContext('2d'),W=0,H=0,pts=[],m={x:-999,y:-999},vis=true,col='#7c9cff',fc=0;
function size(){W=cv.width=hdr.offsetWidth;H=cv.height=hdr.offsetHeight;var n=Math.min(70,Math.round(W*H/14000));pts=[];for(var i=0;i<n;i++)pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.5,vy:(Math.random()-0.5)*0.5})}
size();addEventListener('resize',size);
hdr.addEventListener('mousemove',function(e){var r=hdr.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
hdr.addEventListener('mouseleave',function(){m.x=-999;m.y=-999});
new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(hdr);
function draw(){requestAnimationFrame(draw);if(!vis)return;if(fc++%60===0){col=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||col}
cx.clearRect(0,0,W,H);cx.fillStyle=col;cx.strokeStyle=col;
for(var i=0;i<pts.length;i++){var p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
cx.globalAlpha=0.6;cx.beginPath();cx.arc(p.x,p.y,2,0,6.283);cx.fill();
for(var j=i+1;j<pts.length;j++){var q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=dx*dx+dy*dy;if(d<12100){cx.globalAlpha=(1-d/12100)*0.35;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
var mx=p.x-m.x,my=p.y-m.y,md=mx*mx+my*my;if(md<24000){cx.globalAlpha=(1-md/24000)*0.7;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke();p.x+=mx*0.004;p.y+=my*0.004}}
cx.globalAlpha=1}
draw();
})();
