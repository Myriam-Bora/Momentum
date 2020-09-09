 //문서 내 해당하는 첫번 째 선택자(태그,class,id..)를 찾는다
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const getDay = new Date();
    const hours = getDay.getHours();
    const minutes = getDay.getMinutes();
    const seconds = getDay.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(getTime,1000);    //일정시간마다 반복하여 동작
}

init();


// getTime() : 바로 동작
// getTime   : 원할 때 동작