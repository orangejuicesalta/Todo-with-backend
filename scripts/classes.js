class ToDoList {
  constructor() {
    this.items = [];
    // this.ids = [];
  }

  add(title, desc, status) {
    let item = new Item(title, desc, status);
    if (this.items.find((obj) => obj.id === item.id)) return this.add(title, desc, status);
    this.items.push(item);
    return item;
  }

  complete(id) {
    let task = this.findIndexById(id);
    task.completedAt = currentTime();
    task.status = true;
    return task;
  }

  uncomplete(id) {
    let task = this.findIndexById(id);
    task.completedAt = null;
    task.status = false;
    return task;
  }

  remove(id) {
    let task = this.findIndexById(id);
    let index = this.items.indexOf(task);
    return this.items.splice(index, 1)[0];
  }

  getCompHistory(id) {
    let task = this.findIndexById(id);
    return task.getCompHistory();
  }

  findIndexById(id) {
    let foundTask = this.items.filter((task) => task.id === id);
    return foundTask[0];
  }

}

class Item {
  constructor(title, desc, status) {
    this.title = title;
    this.completionHistory = [];
    this.id = Math.floor(Math.random() * 1e5);
    this.description = desc;
    this.createdAt = currentTime();
    this.completedAt = null;
    this.status = status;
    this.completeHistory = [];
  }

  complete() {
    let now = currentTime();
    this.completedAt = now;
    this.status = true;
    this.completionHistory.push(now);
    return this;
  }

  uncomplete() {
    this.completedAt = null;
    this.status = false;
    return this;
  }

  getCompHistory() {
    return this.completionHistory;
  }
}

class DOM {

  findParentId(target) {
    let parentId = target.parentElement.getAttribute("data-id");
    return parentId;
  }

  getParentElementbyId(id) {
    let tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
      if (id === tasks[i].getAttribute("data-id")) {
        return tasks[i];
      }
    }
  }

  completeToggle(targetParentElement) {
    const status = targetParentElement.childNodes[2];
    if (status.innerText === '') {
      targetParentElement.childNodes[2].innerText = "Finished";
      targetParentElement.childNodes[2].classList.add("task-status");
    } else {
      targetParentElement.childNodes[2].innerText = "";
      targetParentElement.childNodes[2].classList.remove("task-status");
    }
    return targetParentElement;
  }
}
