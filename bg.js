const body = document.querySelector("body");

const image_number = 4;

function paintImage(number){
    const image = new Image();
    image.src = `images/background${number + 1}.jpg`;
    body.appendChild(image);  
    image.classList.add("bgImage"); //클래스이름 추가
}

function genRandom(){
    //floor:내림, ceil:올림
    const number = Math.floor(Math.random() * image_number) ;
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();