document.addEventListener('DOMContentLoaded',()=>{
// force fullscreen on first click
const goFS=()=>{
const el=document.documentElement;
if(el.requestFullscreen)el.requestFullscreen();
else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();
else if(el.msRequestFullscreen)el.msRequestFullscreen();
document.removeEventListener('click',goFS);
};
document.addEventListener('click',goFS);
dellSplash();
});
