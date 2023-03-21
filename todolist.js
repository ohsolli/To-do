let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button');
let taskList=[];
let mode = "all";
let filterList=[];
let underLine = document.getElementById("under-line");
let tabs =document.querySelectorAll(".task-tabs div");


tabs.forEach(menu=>menu.addEventListener("click",(e)=>horizontalIndicator(e)));
function horizontalIndicator(e){
    underLine.style.left=e.currentTarget.offsetLeft + "px";
    underLine.style.width=e.currentTarget.offsetWidth + "px";
    underLine. style.top = e.currentTarget.offsetTop + (e.currentTarget.offsetHeight-4) + "px";
}


for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",(e)=>{filter(e)})
}

// task 공백방지
addButton.addEventListener("click",(e)=>{
    if(taskInput.value.length==0){
        alert("할일을 입력해주세요.");
    }else{addTask()}
});

// 엔터시에 할일추가
taskInput.addEventListener("keyup",(e)=>{
    if(e.key==='Enter'){
        if(taskInput.value.length!==0){
            addTask();
        }else{alert("할일을 입력해주세요.")}
    }
})

// 현재 날짜 불러오기
document.getElementById('date').textContent = moment().format('YYYY-MM-DD');


// 할일추가하기
function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    }

    taskList.push(task);
    render();
    console.log("todo",task)
}



function render(){
    let list=[]
    if(mode=="all"){
        list=taskList
    }else if(mode=="ongoing"){
        list=filterList
    }else if(mode=="done"){
        list=filterList
    }
    let resultHTML = '';
    for(let i=0;i<list.length;i++){
    if(list[i].isComplete==true){
        resultHTML += `<div class="task task-done-box">
        <div class="task-done">${list[i].taskContent}</div>
        <div class="btn">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`
    }else{
        resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div class="btn">
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-regular fa-square"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
        </div>
        </div>`
    }
    taskInput.value=''
}



    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    // taskList[i].id
    console.log("체크인",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id===id){
            taskList[i].isComplete=!taskList[i].isComplete; 
            break;
        }
    }
    filter();
    console.log("체크리스트",taskList)
}

function deleteTask(id){
    console.log("삭제",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id===id){
            taskList.splice(i,1)
            break;
        }
    }
    filter();
}

// 탭 필터링
function filter(e){

    filterList=[]
    if(e){
        mode = e.target.id
    }
    if(mode=="all"){
        render();
    }else if(mode=="ongoing"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode=="done"){
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete==true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function randomIDGenerate(){
    return (performance.now().toString(36)+Math.random().toString(36)).replace(/\./g,"");
}