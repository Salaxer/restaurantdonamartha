import header from './headerOpenClose';

const globalEvents = () =>{
    window.addEventListener('scroll' , (evt) =>  {
        let altura = window.scrollY / 2;
        let slide_to = document.getElementById('welcome');
        slide_to == undefined ? slide_to = slide_to : slide_to.style.top = `${0-altura}px`;
        header(false, window.scrollY)
      })
    window.addEventListener('resize', (ev) =>{
      const sizeImage = document.getElementById('welcome');
      if (sizeImage) {
        console.log(sizeImage);
        document.getElementById("main").style.marginTop = `${sizeImage.clientHeight + 75}px`;
      }
    })
    window.addEventListener('click',(ev)=>{
      header(ev, false);
    })
}

export default globalEvents;