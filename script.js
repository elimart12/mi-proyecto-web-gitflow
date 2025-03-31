// Modelo de datos
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Referencias DOM
const taskInput = document.getElementById('taskInput');
const taskId = document.getElementById('taskId');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const tasksList = document.getElementById('tasksList');

// Función para mostrar tareas
function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name}</span>
            <div class="actions">
                <button class="edit" onclick="editTask(${index})">Editar</button>
                <button class="delete" onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
    // Guardar en localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Añadir tarea
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName });
        taskInput.value = '';
        renderTasks();
    } else {
        alert('Por favor ingresa una tarea');
    }
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Inicializar la aplicación
renderTasks();