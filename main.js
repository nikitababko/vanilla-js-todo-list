const addTaskBtn = document.getElementById('add-task-btn');
const descTaskInput = document.getElementById('description-task');
const todosWrapper = document.getElementById('todos-wrapper');

let tasks;
const render = () => {
  if (!localStorage.tasks) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
};

render();

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
  <div class="todo-item ${task.completed ? 'checked' : ''}">
    <div class="description">${task.description}</div>
    <div class="buttons">
      <input onclick="completeTask(${index})" class="btn-completed" type="checkbox" ${
    task.completed ? 'checked' : ''
  } ${task.completed && 'disabled'} />
      <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
    </div>
  </div>
  `;
};

const filterTasks = () => {
  const activeTasks =
    tasks.length && tasks.filter((task) => task.completed == false);
  const completedTasks =
    tasks.length && tasks.filter((task) => task.completed == true);

  tasks = [...activeTasks, ...completedTasks];
};

const fillHtmlList = () => {
  todosWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((task, index) => {
      todosWrapper.innerHTML += createTemplate(task, index);
    });

    todoItemElems = document.querySelectorAll('.todo-item');
  } else if (!tasks) {
    todosWrapper.innerHTML = '';
  }
};

fillHtmlList();

const updateLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const changeTasks = () => {
  updateLocalStorage();
  fillHtmlList();
};

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(descTaskInput.value));
  changeTasks();
  descTaskInput.value = '';
});

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if (tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }

  changeTasks();
};

const deleteTask = (index) => {
  todoItemElems[index].classList.add('deletion');

  setTimeout(() => {
    tasks.splice(index, 1);
    changeTasks();
  }, 1000);
};

const deleteAllTask = () => {
  localStorage.removeItem('tasks');
  todoItemElems.forEach((el) => el.classList.add('deletion'));
  setTimeout(() => {
    render();
    fillHtmlList();
  }, 1000);
};
