document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskAssignee = document.getElementById('task-assignee').value;
    const taskDeadline = document.getElementById('task-deadline').value;

    if (taskName && taskAssignee && taskDeadline) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ name: taskName, assignee: taskAssignee, deadline: taskDeadline, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        document.getElementById('task-name').value = '';
        document.getElementById('task-assignee').value = '';
        document.getElementById('task-deadline').value = '';
    } else {
        alert('Please fill all the fields');
    }
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>
                ${task.name} - ${task.assignee} - ${task.deadline}
            </span>
            <div class="task-controls">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})" />
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    updateProgress();
}

function toggleTask(taskIndex) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
function deleteTask(taskIndex) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function updateProgress() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const progressPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    const progressBarFill = document.getElementById('progress');
    progressBarFill.style.width = `${progressPercentage}%`;

    const progressText = document.getElementById('progress-text');
    progressText.textContent = `${Math.round(progressPercentage)}% Completed`;
    if(tasks.length && completedTasks===totalTasks){
        blast();
    }
}
const blast=()=>{
    const defaults = {
        spread: 360,
        ticks: 40,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["stars"],
        colors: ["red", "pink", "E89400", "FFCA6C", "FDFFB8"],
    };
    function shoot() {
        confetti({
        ...defaults,
        particleCount: 30,
        scalar: 0.8,
        shapes: ["star"],
        });

        confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.5,
            shapes: ["circle"],
        });
    }
    setTimeout(shoot, 0);
    setTimeout(shoot, 80);
    setTimeout(shoot, 180);
};