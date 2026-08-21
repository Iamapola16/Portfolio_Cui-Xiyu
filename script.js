const filters=document.querySelectorAll('[data-filter]');
const cards=document.querySelectorAll('.project');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('selected'));button.classList.add('selected');const type=button.dataset.filter;cards.forEach(card=>{card.style.display=(type==='all'||card.classList.contains(type))?'block':'none'})}));
const nav=document.querySelector('.nav');
window.addEventListener('scroll',()=>nav.style.mixBlendMode='normal');
document.querySelectorAll('video').forEach(video=>video.addEventListener('error',()=>video.closest('.video-player')?.classList.add('playback-error')));

// Treat every top-level section as its own screen: visitors enter on Home,
// then use the navigation or a project card to reveal the next interface.
const screens=[...document.querySelectorAll('main > section')];
const showScreen=(id,updateUrl=true)=>{
  const target=document.getElementById(id)||document.getElementById('home');
  const workScreenIds=['wechat-one','wechat-two','memory','heterotopia','password','comfort-women','love-not-here','family-day'];
  const navigationId=workScreenIds.includes(target.id)?'work':target.id;
  nav.dataset.screen=target.id;
  screens.forEach(screen=>screen.classList.toggle('is-active-screen',screen===target));
  document.querySelectorAll('.nav nav a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${navigationId}`));
  if(updateUrl) history.pushState(null,'',`#${target.id}`);
  window.scrollTo({top:0,behavior:'instant'});
};
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const id=link.getAttribute('href').slice(1);
  if(document.getElementById(id)){event.preventDefault();showScreen(id);}
}));
window.addEventListener('popstate',()=>showScreen(location.hash.slice(1)||'home',false));
showScreen('home',false);
