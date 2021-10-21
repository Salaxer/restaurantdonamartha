
const MarginFromMain = (e)=>{
    const size = e.target.clientHeight;
    if (size !== 0) {
        let main = document.getElementById("MenuFoodMain");
        if (main) {
            main.style.marginTop = `${size + 75}px`;
        }
    }
}

export default MarginFromMain; 