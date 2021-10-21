const headerOpenClose = (ev, scrol) =>{
    let lateral_menu = document.getElementById('header_nav');    
    let checkBox = document.getElementById('check');
    let open = document.getElementById('header__mobile--open');
    let close = document.getElementById('header__mobile--close');
    checkBox.addEventListener('change', ()=>{
        checkBox.checked ? lateral_menu.style.left = '0px' : lateral_menu.style.left = `-461px`;
    })
    if (ev) {
        if (ev.target !== lateral_menu && ev.target !== checkBox && ev.target !== open && ev.target !== close) {
            lateral_menu.style.left = `-461px`;
            checkBox.checked = false;
        }
    }
    const arrow_prev = document.querySelector('#arrow-prev');
    if (arrow_prev == null) {
        if (scrol || window.location.pathname == "/") {
            if(scrol >= 200){
                document.getElementById('header').style.backgroundColor = "#0B3247";
            }else{
                document.getElementById('header').style.backgroundColor = "rgba(0, 0, 0, 0.04)";
            }
        }
    }else{
        document.getElementById('header').style.backgroundColor = "#0B3247";
    }
}

export default headerOpenClose;