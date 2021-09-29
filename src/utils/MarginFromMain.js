
const MarginFromMain = (e)=>{
    const kk = document.getElementById('welcome');
    // kk.scrollHeight
    const size = e.target.clientHeight;
    console.log(size);
    if (size !== 0) {
        document.getElementById("main").style.marginTop = `${size + 75}px`;
    }
}

export default MarginFromMain; 