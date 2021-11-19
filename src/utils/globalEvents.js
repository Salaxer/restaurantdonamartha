import header from './headerOpenClose';

const globalEvents = (dataMax) =>{
    window.addEventListener('scroll' , (evt) =>  {
        let altura = window.scrollY / 2;
        let slide_to = document.getElementById('welcome');
        let greeting = document.getElementById('greeting');
        slide_to == undefined ? slide_to = slide_to : slide_to.style.top = `${0-altura}px`;
        greeting == undefined ? greeting = greeting : greeting.style.top = `${altura}px`;
        if(dataMax){
          const top = document.documentElement.scrollTop;
          const footer = document.getElementById('Footer');
          const maxTopFooter = footer.offsetTop;
          const heightFooter = footer.offsetHeight + 50;
          if (maxTopFooter - heightFooter < top) {
            dataMax(true);
          }
        }
      })
    window.addEventListener('resize', (ev) =>{
      const sizeImage = document.getElementById('welcome');
      if (sizeImage) {
        let size = document.getElementById("MenuFoodMain");
        if(size){
          size.style.marginTop = `${sizeImage.clientHeight + 75}px`;
        }
      }
    })
    window.addEventListener('click',(ev)=>{
        header(ev);
    })
}

export default globalEvents;