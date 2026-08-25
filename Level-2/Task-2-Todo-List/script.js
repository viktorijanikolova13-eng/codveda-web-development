const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const addButton = document.getElementById("addButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const chooseDate = document.getElementById("chooseDate");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentView = "active";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    taskList.innerHTML = "";

    let list = tasks;

    if (currentView == "active") {
        list = list.filter(function (task) {
            return task.completed == false;
        });
    }

    if (currentView == "completed") {
        list = list.filter(function (task) {
            return task.completed == true;
        });
    }

    if (chooseDate.value != "") {
        list = list.filter(function (task) {
            return task.date == chooseDate.value;
        });
    }

    list.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
    });

    let lastDate = "";

    for (let task of list) {

        if (task.date != lastDate) {
            lastDate = task.date;

            let title = document.createElement("h2");

            let today = new Date().toISOString().split("T")[0];

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow = tomorrow.toISOString().split("T")[0];

            if (task.date == today) {
                title.textContent = "TODAY";
            } else if (task.date == tomorrow) {
                title.textContent = "TOMORROW";
            } else {
                let d = new Date(task.date);
                title.textContent = d.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                }).toUpperCase();
            }

            title.classList.add("date-title");
            taskList.appendChild(title);
        }

        let div = document.createElement("div");
        div.classList.add("task-item");

        let check = document.createElement("input");
        check.type = "checkbox";
        check.checked = task.completed;

        check.addEventListener("change", function () {
            task.completed = check.checked;
            saveTasks();
            showTasks();
        });

        let text = document.createElement("span");
        text.textContent = task.task;

        let del = document.createElement("button");
        del.textContent = "DELETE";

        del.addEventListener("click", function () {
            let index = tasks.indexOf(task);
            tasks.splice(index, 1);
            saveTasks();
            showTasks();
        });

        div.appendChild(check);
        div.appendChild(text);
        div.appendChild(del);

        taskList.appendChild(div);
    }
}

addButton.addEventListener("click", function () {

    let task = taskInput.value.trim();
    let date = taskDate.value;

    if (task == "" || date == "") {
        alert("Please enter a task and select a date.");
        return;
    }

    tasks.push({
        task: task,
        date: date,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";

    showTasks();
});

activeButton.addEventListener("click", function () {
    currentView = "active";
    showTasks();
});

completedButton.addEventListener("click", function () {
    currentView = "completed";
    showTasks();
});

chooseDate.addEventListener("change", function () {
    showTasks();
});

showTasks();