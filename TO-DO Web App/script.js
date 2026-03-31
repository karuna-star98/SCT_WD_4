
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* LOAD THEME */
if(localStorage.getItem("theme") === "light"){
    document.body.classList.add("light");
    document.getElementById("themeBtn").textContent = "☀️";
}

/* SAVE TASKS */
function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* RENDER */
function renderTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index)=>{
        let li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <div onclick="toggleTask(${index})">
                ${task.text}
                <small class="${task.priority}"> (${task.priority})</small>
            </div>
            <small>${task.time || "No date"}</small>
            <div class="actions">
                <span onclick="editTask(${index})">Edit</span>
                <span class="delete" onclick="deleteTask(${index})">Delete</span>
            </div>
        `;

        list.appendChild(li);
    });

    updateCounter();
    saveTasks();
}

/* ADD */
function addTask(){
    let text = document.getElementById("taskInput").value.trim();
    let time = document.getElementById("taskTime").value;
    let priority = document.getElementById("priority").value;

    if(text === "") return;

    tasks.push({text, time, priority, completed:false});
    renderTasks();

    document.getElementById("taskInput").value = "";
    document.getElementById("taskTime").value = "";
}

/* DELETE */
function deleteTask(index){
    tasks.splice(index,1);
    renderTasks();
}

/* TOGGLE */
function toggleTask(index){
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

/* EDIT */
function editTask(index){
    let newText = prompt("Edit task:", tasks[index].text);
    if(newText){
        tasks[index].text = newText;
        renderTasks();
    }
}

/* SORT */
function sortTasks(){
    tasks.sort((a,b)=> new Date(a.time) - new Date(b.time));
    renderTasks();
}

/* CLEAR */
function clearAll(){
    tasks = [];
    renderTasks();
}

/* SEARCH */
function searchTask(){
    let value = document.getElementById("search").value.toLowerCase();
    let items = document.querySelectorAll("li");

    items.forEach(item=>{
        item.style.display = item.textContent.toLowerCase().includes(value) ? "block" : "none";
    });
}

/* COUNTER */
function updateCounter(){
    let total = tasks.length;
    let completed = tasks.filter(t=>t.completed).length;

    document.getElementById("counter").textContent =
        `Total: ${total} | Completed: ${completed}`;
}

/* THEME TOGGLE (FIXED) */
function toggleTheme(){
    document.body.classList.toggle("light");

    let btn = document.getElementById("themeBtn");

    if(document.body.classList.contains("light")){
        btn.textContent = "☀️";
        localStorage.setItem("theme","light");
    } else {
        btn.textContent = "🌙";
        localStorage.setItem("theme","dark");
    }
}

/* INIT */
renderTasks();

