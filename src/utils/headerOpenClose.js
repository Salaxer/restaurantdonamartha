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
}

export default headerOpenClose;