let addButton = document.getElementById("add-button");
let taskList = [];
let taskInput = document.getElementById("task-input");
let checkButton = document.getElementById("check-button");
let deleteButton = document.getElementById("delete-button");

addButton.addEventListener("click", addTask);
// checkButton.addEventListener("click", check);
// deleteButton.addEventListener("click", delet);



function addTask(){
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render()
}

function render(){
    let resultHTML = '';
    for(let i=0 ; i<taskList.length ; i++){
        resultHTML += `<div class="task">
                    <div>${taskList[i]}</div>   
                    <div>
                        <button id="check-button">Check</button>
                        <button id="delete-button">Delete</button>
                    </div>
                </div>`
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}