const addTaskBtn = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const inputTitle = document.getElementById("input-title");
let taskStatusCheck = document.getElementById("task-finished");



let todolist = new ToDoList();
let dom = new DOM();

addTaskBtn.addEventListener("click", function () {
  if (inputTask.value == "" || inputTitle.value == "") {
    alert("Please enter both title and description");
  } else {
    let status = taskStatusCheck.checked;
    let element = createTaskElement(inputTitle.value, inputTask.value, status);
    addAndPostTask(element, status);
    inputTask.value = "";
    inputTitle.value = "";
    taskStatusCheck.checked = false;
  }
});

function createTaskElement(title, desc, taskStatus) {
  let task = document.createElement("div");
  task.classList.add("task");

  let li = document.createElement("div");
  li.classList.add("task-title");
  li.innerText = `${title}`;

  let description = document.createElement("div");
  description.classList.add("task-name");
  description.innerText = `${desc}`;

  let completeButton = document.createElement("button");
  completeButton.innerText = "Завершить";
  completeButton.setAttribute("onclick", `completeTask(event)`);
  completeButton.classList.add("complete-task");

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Удалить";
  deleteButton.setAttribute("onclick", `removeTask(event)`);
  deleteButton.classList.add("delete-task");

  let status = document.createElement("div");
  status.classList.add("task-status");
  status.classList.add('status');
  
  if (taskStatus) status.innerText = "Finished";
  let elements = [li, description, status, completeButton, deleteButton];
  for (let element of elements) task.appendChild(element);

  return task;
}

function removeTask(event) {
  let id = dom.findParentId(event.target);
  let targetElement = dom.getParentElementbyId(id);
  removeFromServer(id);
  targetElement.remove();
}

function completeTask(event) {
  let id = dom.findParentId(event.target);
  let targetParentElement = dom.getParentElementbyId(id);
  dom.completeToggle(targetParentElement);
  updateServer(id, targetParentElement);
  return targetParentElement;
}

function currentTime() {
  return new Date().toLocaleString();
}
