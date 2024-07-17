document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const tasksList = document.getElementById("tasks-list");

  // Load tasks from localStorage
  loadTasks();

  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText, true); // true indicates the task should be saved to localStorage
      taskInput.value = ""; // Clear input field
    }
  });

  tasksList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-task-btn")) {
      const taskItem = event.target.parentElement;
      const taskText = taskItem.textContent.slice(0, -1); // Remove the 'X' from the text
      removeTaskFromLocalStorage(taskText);
      taskItem.remove();
    } else if (event.target.classList.contains("task-item")) {
      event.target.classList.toggle("completed");
      // Update the task's completed state in localStorage
      updateTaskInLocalStorage(
        event.target.textContent.slice(0, -1),
        event.target.classList.contains("completed")
      );
    }
  });

  function addTask(text, save = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.textContent = text;

    const removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.classList.add("remove-task-btn");
    taskItem.appendChild(removeButton);

    tasksList.appendChild(taskItem);

    if (save) {
      saveTaskToLocalStorage(text);
    }
  }

  function saveTaskToLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text);
      if (task.completed) {
        // Mark the task as completed
        const lastAddedTask = tasksList.lastElementChild;
        lastAddedTask.classList.add("completed");
      }
    });
  }

  function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function updateTaskInLocalStorage(taskText, isCompleted) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex((task) => task.text === taskText);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = isCompleted;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
