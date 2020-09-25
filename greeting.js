const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

//display : block;  처음엔 모두 display none 으로 되어 있다.
const css_showing = "css-showing";

//로컬저장소에 이름 저장하기
function setUserName(user_name) {
  localStorage.setItem("user_localStorage", user_name);
}

//submit 이벤트 발생시
function handleSubmit(event) {
  event.preventDefault(); //새로고침 현상 막기
  const user_name = input.value;
  paintGreeting(user_name);
  setUserName(user_name);
}

//input 활성화
function askForName() {
  form.classList.add(css_showing); //display : block
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(userName) {
  form.classList.remove(css_showing); //display : none
  greeting.classList.add(css_showing); //display : block
  greeting.innerText = `Hello ,  ${userName}`;
}

function loadName() {
  const userName = localStorage.getItem("user_localStorage");

  if (userName === null) {
    //로컬저장소가 비어있으면
    askForName();
  } else {
    //로컬저장소에 자료가 있으면
    paintGreeting(userName);
  }
}

function init() {
  loadName();
}

init();
