const headerOpenClose = () =>{
    let menu = document.getElementById('header_nav');    
    let checkBox = document.getElementById('check');
    let max_width = window.innerWidth;
    checkBox.addEventListener('change', ()=>{
        checkBox.checked ? menu.style.left = '0px' : menu.style.left = `-${max_width*0.6}px`;
    })
    window.addEventListener('click',(ev)=>{
        if (ev.target !== menu && ev.target !== checkBox) {
            menu.style.left = `-${max_width*0.6}px`;
            checkBox.checked = false;
        }
    })
}

export default headerOpenClose;