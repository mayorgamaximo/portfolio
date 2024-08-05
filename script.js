/*proyectos*/
let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
prev.style.display="none";
let active = 0;

function loadShow(){
  let stt=0;
    items[active].style.transform = `none`; 
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

  for(var i=active + 1; i < items.length; i++){
    stt++;
    items[i].style.transform = `translateX(${120*stt}px) scale(${1-0.2*stt}) perspective(5vh) rotateY(-1deg)`; 
    items[active].style.zIndex = stt+1;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt=0;
  for(var i=active-1; i>=0; i--){
    stt++;
    items[i].style.transform = `tranlateX(${120*stt}px) scale(${1 - 0.5*stt}) perspective(5vh)  rotateY(-1deg)`; 
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt>  2 ? 0 : 0.6;
  }
}


next.onclick = function(){
  active = active + 1 < items.length ? active + 1 : active;
  
  if(active==3){
    let next = document.getElementById('next');
    next.style.display = "none";
  }

  let prev = document.getElementById('prev');
  if(prev.style.display==="none"){
    prev.style.display = "flex";
  }

  loadShow()
}


prev.onclick = function(){
  active = active - 1 >= 0 ? active - 1 : active;

  if(active==0){
    let prev = document.getElementById('prev');
    prev.style.display = "none";
  }
  
  if(next.style.display==="none"){
    next.style.display = "flex";
  }
  loadShow()
}


loadShow();

/*observers*/ 
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target); 
      animateProgressBars();
    }
  });
}, {
  threshold: 1
});
hiddenElements.forEach((el) => observer.observe(el));


function animateProgressBars() {
  const progressBars = document.querySelectorAll('.mis-habilidades progress:not(.animated)');
    
  progressBars.forEach(bar => {
    bar.classList.add('animated');
    const value = bar.value;
    bar.value = 0;

    let start = 0;
    const increment = value / 100;

    const interval = setInterval(() => {
      start += increment;
      bar.value = start;

      if (start >= value) {
        clearInterval(interval);
        bar.value = value; 
      }
    }, 10);
  });
}



/*estrellas*/
const COLORS = ["#fff2", "#fff4", "#fff7", "#fffc"];

const generateSpaceLayer = (size, selector, totalStars, duration) => {
  const layer = [];
  for (let i = 0; i < totalStars; i++) {
    const color = COLORS[~~(Math.random() * COLORS.length)];
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    layer.push(`${x}vw ${y}vh 0 ${color}, ${x}vw ${y + 100}vh 0 ${color}`);
  }
  const container = document.querySelector(selector);
  container.style.setProperty("--size", size);
  container.style.setProperty("--duration", duration);
  container.style.setProperty("--space-layer", layer.join(","));
}

generateSpaceLayer(".3vh", ".space-1", 250, "25s");
generateSpaceLayer(".3vh", ".space-2", 100, "20s");
generateSpaceLayer(".3vh", ".space-3", 25, "15s");