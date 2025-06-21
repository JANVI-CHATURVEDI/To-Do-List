const addButton = document.querySelector(".input-box button");
const inputBox = document.querySelector(".input-box input");
const taskList = document.querySelector(".task-list");

// We'll keep every task as an object here (with text + completed status). This is our main data.
let tasks = []; // 💾 our array to store tasks

// Runs code everytime when the browser finishes loading the page.
window.addEventListener("load", () => {
  // Gets the string value stored in browser's localStorage under the key "tasks".
  const saved = localStorage.getItem("tasks")
  // Checks if anything was actually saved.
  if (saved) {
    //  JSON.parse() is used to convert the string from localStorage back into an array. This is important because localStorage can only store data as strings, but your app needs an array to manage tasks using methods like .push(), .forEach(), and .splice(). Since strings are immutable and don't support these array operations, converting the string into an array makes the data usable again in your app.
    tasks = JSON.parse(saved)
   
    // Loops through all saved tasks and shows them on screen.
    tasks.forEach(task => {
      addTaskToDOM(task);
    });
  }
})

// Runs code when the Add button is clicked.
addButton.addEventListener("click", () => {
  // Takes the input value, and removes extra spaces from start & end.
  const taskText = inputBox.value.trim()
// Checks if the input is empty.
  if (taskText === "") {
    alert("Enter a task");
    return;
  }
// Checks if task is longer than 100 characters.
  if (taskText.length > 100) {
    alert("Task is too long! Keep it under 100 characters.");
    return;
  }
  // Creates an object with two properties
  const newTaskObj = {
    text: taskText,
    completed: false
  };
 //  Adds the new task object to the tasks array.
  tasks.push(newTaskObj);
  // Calls function to display the task on screen.
  addTaskToDOM(newTaskObj);
  // Clears the input field.
  inputBox.value = "";
  // Calls function to save tasks array to localStorage.
  saveTasks();


})


// Function to add task to DOM
// Defines a function to create and show the task in HTML.
function addTaskToDOM(taskObj) {
  // Creates an empty <li> element.
  const newTask = document.createElement("li");
  // Adds a class for styling.
  newTask.classList.add("task");
    //  this checked is attribute of type="checkbox"  
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
  // when we mark a task check ,this function is called
  checkbox.addEventListener("change", () => {
   // checkbox.checked is a property of input tag type="checkbox"  if you check the task  checkbox.checked=true  and then in this line  taskObj.completed=true
   // how does this taskObj has same task which is checked ? ->  Each checkbox is created inside addTaskToDOM(taskObj), so it remembers its own taskObj using closures.
   // addTaskToDOM(taskObj1); // creates checkbox A, bound to taskObj1
   // addTaskToDOM(taskObj2); // creates checkbox B, bound to taskObj2
   // so closure remember it all
    taskObj.completed = checkbox.checked;
    // savetask function is called again to save the the new  obj with  completed= true now
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
    // closure remember which newtask is being talked about 
    newTask.remove();
    // The filter() method creates a new array by keeping only the items that return true from the condition. In tasks.filter(t => t !== taskObj), it means: “keep all tasks except the one that matches taskObj.” So, the matching task gets removed from the array.
    tasks = tasks.filter(t => t !== taskObj);
    saveTasks();
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



 /*  How does checkbox appear instead of circle

 If the task is completed (taskObj.completed === true) then <input type="checkbox" class="task-checkbox" checked>
 
 Hide real checkbox:
 .task-checkbox {
   display: none;
 }
 
 Show empty circle before span:
 .check-circle::before {
   content: "○";
   color: gray;
 }
 
 Change to tick when checkbox is checked:
 .task-checkbox:checked + .check-circle::before {
   content: "✅";
   color: green;
 }
 
 How it works:
 input is hidden.
 span.check-circle shows custom symbol.
 When checkbox is checked, + selector targets the next .check-circle and updates the symbol. */


 
 

