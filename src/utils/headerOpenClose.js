const headerOpenClose = () =>{
    let menu = document.getElementById('header_nav');    
    let checkBox = document.getElementById('check');
    checkBox.addEventListener('change', ()=>{
        let max_width = window.innerWidth;
        if (checkBox.checked) {
            menu.style.left = '0px';
        }else{
            menu.style.left = `-${max_width*0.6}px`
            console.log(`-${max_width*0.6}px`);
        }
    })
}

export default headerOpenClose;