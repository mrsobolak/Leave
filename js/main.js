document.addEventListener('DOMContentLoaded',()=>{
// Demo disclaimer -> click ENTER to start boot
document.getElementById('demo-start').addEventListener('click',()=>{
// Go fullscreen
const el=document.documentElement;
if(el.requestFullscreen)el.requestFullscreen();
else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
else if(el.msRequestFullscreen)el.msRequestFullscreen();
// Hide demo, show dell splash, start boot
document.getElementById('demo-disclaimer').classList.add('hidden');
document.getElementById('scanlines').style.display='block';
document.getElementById('dell-splash').classList.remove('hidden');
dellSplash();
});
});
