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
// Añadir estas funciones al final del script.js existente

// Editar tarea
function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.name;
    taskId.value = index;
    addBtn.style.display = 'none';
    updateBtn.style.display = 'inline-block';
}

// Actualizar tarea
function updateTask() {
    const index = parseInt(taskId.value);
    const taskName = taskInput.value.trim();
    
    if (taskName) {
        tasks[index].name = taskName;
        taskInput.value = '';
        taskId.value = '';
        addBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';
        renderTasks();
    } else {
        alert('Por favor ingresa una tarea');
    }
}

// Event listener para actualizar
updateBtn.addEventListener('click', updateTask);
// Añadir esta función al final del script.js existente

// Eliminar tarea
function deleteTask(index) {
    if (confirm('¿Estás seguro de eliminar esta tarea?')) {
        tasks.splice(index, 1);
        renderTasks();
    }
}