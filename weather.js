const coords = "coords";
const api_key = "d45bf6735ce8bdf5295a8165b553133a";//openweatherma에서 얻은 키
const weather = document.querySelector(".js-weather");

function getWeather(latitude,longitude){
    //fetch : 정보가져오기
    //then : 자바스크립트가 처리를 다 할 때까지 기다림.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}&units=metric`
    ).then(function(response){
        return response.json();  //JSON 데이터를 받아오기
    }).then(function(date){
        console.log(date);
        const temperature = date.main.temp;
        const name = date.name;
        
        weather.innerText = `${temperature}🌡 @ ${name}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem("coords", JSON.stringify(coordsObj));
}

//성공한 경우
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
        /*
        latitude : latitude,
        longitude : longitude
        와 같은 코드이다
        */
    };

    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

//실패한 경우
function handleGeoError(){
    console.log("정보를 읽을 수 없습니다.");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(coords);
    if(loadedCoords === null){
        askForCoords();
    }else{  //이미 위치정보를 가지고 로컬에 저장된 경우
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();