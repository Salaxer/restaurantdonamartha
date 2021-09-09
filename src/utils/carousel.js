
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
    slides[i].style.display = 'none';
    dots[i].classList.remove('active-dot');
  }

  slides[slider_index].style.display = 'block';
  dots[slider_index].classList.add('active-dot');
}

const carrousell = (state) =>{
  debugger
  show_slide(slider_index);

  document.querySelector('#arrow-prev').addEventListener('click', () => {
    show_slide(--slider_index);
    IntervalSet(false);
    IntervalSet(true, 3000);
  });
  document.querySelector('#arrow-next').addEventListener('click', () => {
    show_slide(++slider_index);
    IntervalSet(false);
    IntervalSet(true, 3000);
  });


  document.querySelectorAll('.dot-nav').forEach((element) => {
  element.addEventListener('click', function () {
  var dots = Array.prototype.slice.call(this.parentElement.children),
    dot_index = dots.indexOf(element);
  show_slide(slider_index = dot_index);
  })
  });

  IntervalSet(state);
}
  
  export default carrousell;