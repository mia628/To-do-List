let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");
let horizontalTabs = document.querySelectorAll(
  ".task-tabs div:not(#under-line)"
);

document.addEventListener("DOMContentLoaded", function () {
  let firstTab = document.getElementById("all");
  underLine.style.left = firstTab.offsetLeft + "px";
  underLine.style.width = firstTab.offsetWidth + "px";
  underLine.style.bottom = "0px";
});

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

addButton.addEventListener("click", addTask);

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  if (taskInput.value == "") {
    alert("할 일을 입력해 주세요.");
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  taskInput.value = "";
  render();
}

function render() {
  // 1. 내가 선택한 탭에 따라서
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }

  // 2. 리스트를 달리 보여준다
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task" style="background-color: lightgray;">
                    <div class="task-done" style="padding: 1em;">${list[i].taskContent}</div>
                    <div class="icons">
                        <img class="icon" src="images/return.png" onclick="toggleComplete('${list[i].id}')"><span class="gap"></span>
                        <img class="icon" src="images/delete.png" onclick="deleteTask('${list[i].id}')">
                    </div>
                </div>`;
    } else {
      resultHTML += `<div class="task">
            <div style="padding: 1em;">${list[i].taskContent}</div>
            <div class="icons">
                <img class="icon" src="images/check.png" onclick="toggleComplete('${list[i].id}')"><span class="gap"></span>
                <img class="icon" src="images/delete.png" onclick="deleteTask('${list[i].id}')">
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filterList = taskList.filter((task) => {
    if (mode === "ongoing") {
      return !task.isComplete;
    } else if (mode === "done") {
      return task.isComplete;
    }
  });
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  filterList = taskList.filter((task) => {
    if (mode === "ongoing") {
      return !task.isComplete;
    } else if (mode === "done") {
      return task.isComplete;
    }
  });

  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    // 진행중인 아이템을 보여준다
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "done") {
    // 끝나는 케이스
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

horizontalTabs.forEach((menu) =>
  menu.addEventListener("click", (e) => horizontalIndicator(e))
);

function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.bottom = "0px";
}
