const addButton = document.querySelector(".input-box button");
const inputBox = document.querySelector(".input-box input");
const taskList = document.querySelector(".task-list");

let tasks = []; // 💾 our array to store tasks

window.addEventListener("load", () => {
  const saved = localStorage.getItem("tasks")
  if (saved) {
    tasks = JSON.parse(saved)
    tasks.forEach(task => {
      addTaskToDOM(task);
    });
  }
})

addButton.addEventListener("click", () => {
  const taskText = inputBox.value.trim()

  if (taskText === "") {
    alert("Enter a task");
    return;
  }

  if (taskText.length > 100) {
    alert("Task is too long! Keep it under 100 characters.");
    return;
  }

  const newTaskObj = {
    text: taskText,
    completed: false
  };

  tasks.push(newTaskObj);
  addTaskToDOM(newTaskObj);
  inputBox.value = "";
  saveTasks();


})


// Function to add task to DOM
function addTaskToDOM(taskObj) {
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.innerHTML = `
    <label class="task-label">
      <input type="checkbox" class="task-checkbox" ${taskObj.completed ? "checked" : ""}>
      <span class="check-circle"></span>
      <p>${taskObj.text}</p>
      <button class="delete">✖</button>
    </label>
  `;


  taskList.appendChild(newTask);

  const checkbox = newTask.querySelector(".task-checkbox");
  const deleteBtn = newTask.querySelector(".delete");

  // ✅ Update completed status on check
  checkbox.addEventListener("change", () => {
    taskObj.completed = checkbox.checked;
    saveTasks();

    // 🎉 Show Good Job message when task is marked completed
    const msg = document.getElementById("message");
    if (checkbox.checked) {
      msg.textContent = "🎉 Good job!";
      msg.style.display = "block"; // 👀 Show it

      setTimeout(() => {
        msg.style.display = "none"; // 🫣 Hide it completely
      }, 2000);
    }


  });

  // ❌ Delete task
  deleteBtn.addEventListener("click", () => {
    newTask.remove();
    tasks = tasks.filter(t => t !== taskObj);
    saveTasks();
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}