const toDoForm = document.querySelector(".js_toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js_toDoList");

const local_toDoList = "ls_toDoList"; //localStorage key를 저장
let toDos = []; //비어있는 array. 삭제시 바꾸어야 하기 때문에 let.


function deleteToDo(event){
    const btn = event.target;  //target : 어떤 버튼을 눌렀는지
    const li = btn.parentNode; //parentNode : 버튼의 부모. 즉, li
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        //filter():forEach처럼 배열 하나씩 실행. 한 후 boolean을 리턴.
        //toDos에 있는 배열 하나씩을 toDo에 담아서 실행
        // 체크가 된 아이템들의 array를 준다

        //toDos에 있는 아이디들과 체크된 아이디가 같지 않은것만 return하여 해당 배열을 cleanToDos에 담는다
        return toDo.id !== parseInt(li.id)  //li.id는 문자열이기 때문에 정수로 형변환
    });

    toDos = cleanToDos;    //삭제한 리스트를 갱신!
    saveToDos(); 
}

//localStorage에 todo저장하기
function saveToDos(){
    //localStorage에 저장하거나 꺼낼땐 항상 String으로 처리 되므로 형변환을 해야한다
    localStorage.setItem(local_toDoList, JSON.stringify(toDos));
}

//리스트 만들기
function paintToDo(toDoValue){
    const li = document.createElement("li");  //태그 추가
    const deleteBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    deleteBtn.innerText = "❌";
    span.innerText = toDoValue;
    li.appendChild(deleteBtn);//부모태그에 자식태그 추가
    li.appendChild(span);  
    toDoList.appendChild(li);
    li.id = newId;          //각id를 통하여 어떤걸 삭제하는지 식별

    const toDoObj = {
        text : toDoValue,
        id : newId,
    };

    toDos.push(toDoObj);  //array안에 객체를 추가
    saveToDos();

    deleteBtn.addEventListener("click", deleteToDo);

}

//submit하면 발생하는 이벤트
function handleSubmit(event){
    event.preventDefault();
    const toDoValue = toDoInput.value;
    paintToDo(toDoValue);
    toDoInput.value = "";     //다시 빈칸으로
}

//프로그램시작시 로컬저장소에 있는 리스트 출력
function loadToDos(){
    const loadedToDos = localStorage.getItem(local_toDoList);
    if(loadedToDos != null){
        //localStorage자체는 문자열로 저장되어 있기 때문에 불러올때
        //객체로 형변환
        const parsedToDos = JSON.parse(loadedToDos);
         //배열 하나씩 돌릴때마다 그 인자를 toDo에 담고 함수 실행
         parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text); //array안에 있는 .text  , .id 
        });
    }
}

function init(){
    loadToDos();    
    toDoForm.addEventListener("submit", handleSubmit);
}

init();