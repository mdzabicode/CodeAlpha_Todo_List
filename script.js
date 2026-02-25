const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
renderTasks();

// Add task (CREATE)
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = taskInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();
  taskInput.value = "";
});

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks (READ)
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.text;

    // Toggle complete (UPDATE)
    span.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    const actions = document.createElement("div");
    actions.className = "actions";

    // Edit task (UPDATE)
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      const newText = prompt("Edit task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderTasks();
      }
    });

    // Delete task (DELETE)
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(t => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}