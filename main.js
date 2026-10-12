const taskManager = new TaskManager();
const loadTasksBtn = document.getElementById("loadTasksBtn");
const statusMessage = document.getElementById("statusMessage");
const taskList = document.getElementById("taskList");

function renderTasks(){
    taskList.innerHTML = "";
    taskManager.tasks.forEach(task => {
        const div = document.createElement("div");
        div.classList.add("task");
        if (task.completed) {
            div.classList.add("completed");
        }
        const span = document.createElement("span");
        span.textContent = task.title;

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Toggle";
        toggleBtn.addEventListener("click" , () => {
            taskManager.toggleTask(task.id);
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent= "Delete" ;
        deleteBtn.addEventListener("click" , () => {
            taskManager.removeTask(task.id);
            renderTasks();
        });

        div.appendChild(span);
        div.appendChild(toggleBtn);
        div.appendChild(deleteBtn);
        taskList.appendChild(div);
    });
}
async function loadTasks(){
    try{
        statusMessage.textContent = "loading tasks...";
        const rawTasks = await fetchTasks();
        const json = JSON.stringify (rawTasks);
        const parsed = JSON.parse(json);
        const tasks = parsed.map(obj => new Task(obj.id , obj.title , obj.completed));
        taskManager.setTasks(tasks);
        renderTasks();
        statusMessage.textContent = "";
    } catch (error){
        statusMessage.textContent = "Error loading tasks";
    }
}
loadTasksBtn.addEventListener("click" , loadTasks);