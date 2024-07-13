function goToMainPage() {
    window.location.href = "main.html";
}

function toggleSections() {
    const thirdSec = document.getElementById('third-area');
    thirdSec.classList.toggle('show');

    const secondSec = document.getElementById('second-area');
    secondSec.classList.toggle('shrunk');
}

document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
});

document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get input values
    const mainTask = document.getElementById('maintask').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskDate = document.getElementById('taskDate').value;

    // Create new task object
    const newTask = {
        mainTask: mainTask,
        taskDescription: taskDescription,
        taskDate: taskDate
    };

    // Add task to the DOM
    addTaskToDOM(newTask);

    // Save task to local storage
    saveTaskToLocalStorage(newTask);

    // Clear the form inputs
    document.getElementById('taskForm').reset();

        // Hide the add task section
        const thirdSec = document.getElementById('third-area');
        const secondSec = document.getElementById('second-area');
        thirdSec.className = '';
        secondSec.className = '';
});

function addTaskToDOM(task) {
    const newTaskItem = document.createElement('li');
    newTaskItem.classList.add('list-num');
    newTaskItem.innerHTML = `
        <button class="task-item">
            <div class="inside-task">
                <p>${task.mainTask}</p>
                <div class="extras">
                    <ul>
                        <li class="date-sct"><i class="fas fa-calendar-day"></i> ${task.taskDate}</li>
                        <li class="subtasks-sct">${task.taskDescription}</li>
                        <li class="list-type"></li>
                    </ul>
                </div>
            </div>
        </button>
    `;
    document.getElementById('taskList').appendChild(newTaskItem);
}

function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
    } else {
        tasks = [];
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        tasks = tasks.filter(task => task.taskDate >= currentDate); // Remove tasks that are past their due date
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Update local storage with valid tasks
    }
}



