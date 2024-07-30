const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
console.log(startBtn);
startBtn.addEventListener("click", onClick);
let timerId = null;
let isActive = false; 

function onClick(){
    
if (isActive){
        return;
}else{
    isActive = true;
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
        

    
}

stopBtn.addEventListener("click", () =>{
    clearInterval(timerId);
    isActive = false;
})

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

