
var interval = 0;
let slider_index = 0;
const IntervalSet = (state, time = 0) =>{
  
  let setTime = 5000 + time;
  if (state) {
    interval = setInterval(() => {
      show_slide(++slider_index)
      }, setTime); 
  } else {
    clearInterval(interval);
  }
  time = 0;
}
const show_slide = (index) =>{
  
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot-nav');
  
  if (index >= slides.length){
    slider_index = 0;
  }

  if (slider_index < 0) { 
    slider_index = slides.length - 1;
  };

  for (let i = 0; i < slides.length; i++) {
    slides[i] == undefined ? slides : slides[i].style.display = 'none';
    dots[i].classList.remove('active-dot');
  }

  slides[slider_index] == undefined ? slides : slides[slider_index].style.display = 'block';
  dots[slider_index] == undefined ? dots : dots[slider_index].classList.add('active-dot');
}

const carrousell = (state) =>{
  show_slide(slider_index);
  
  const arrow_prev = document.querySelector('#arrow-prev');
  const arrow_next = document.querySelector('#arrow-next');
  const dots = document.querySelectorAll('.dot-nav');

  if(arrow_prev){
    arrow_prev.addEventListener('click', () => {
      show_slide(++slider_index);
      IntervalSet(false);
      IntervalSet(true, 3000);
    });
  }
  if (arrow_next) {
    arrow_next.addEventListener('click', () => {
      show_slide(--slider_index);
      IntervalSet(false);
      IntervalSet(true, 3000);
    });
  }
  if (dots) {
    dots.forEach((element) => {
      element.addEventListener('click', function () {
      var dots = Array.prototype.slice.call(this.parentElement.children),
        dot_index = dots.indexOf(element);
      show_slide(slider_index = dot_index);
      })
    });
  }

  window.addEventListener('scroll' , (evt) =>  {
    let altura = window.scrollY / 2;
    let slide_to = document.getElementById('welcome');
    slide_to == undefined ? slide_to = slide_to : slide_to.style.top = `${0-altura}px`;
    // let transparencia = window.scrollY / window.innerHeight * 2
    // transparencia = transparencia < 1 ? transparencia : 1;
    // let header = document.getElementById('welcome');
    // header.style.opacity = 1 - transparencia;
  })

  IntervalSet(state);
}
  
  export default carrousell;