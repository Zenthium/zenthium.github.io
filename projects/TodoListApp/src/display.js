import { createTodoForm, projectsList } from './index';

function displayProjects(projectList) {
  const projectContainer = document.querySelector('#projectDisplay');
  while (projectContainer.children[2]) {
    projectContainer.removeChild(projectContainer.children[2]);
  }
  for (let i = 0; i < projectList.length; i++) {
    const projectCard = document.createElement('div');
    projectCard.classList.add('projectButton');
    projectCard.innerHTML = `${projectList[i].name} (${projectList[i].todos.length})`;
    projectCard.addEventListener('click', e => {
      try {
        const currentlySelectedProject = document.getElementsByClassName(
          'projectButton clicked'
        );
        currentlySelectedProject[0].classList.remove('clicked');
        projectCard.classList.add('clicked');
      } catch (error) {
        projectCard.classList.add('clicked');
      }
      displayTodoItems(projectList[i]);
    });
    projectContainer.appendChild(projectCard);
  }
}
function displayTodoItems(project) {
  const todos = project.todos;
  todos.sort((value1, value2) => {
    //Sort by dates
    //If the first item has a lower (earlier) date, move it up
    //If it has a higher (later) date, move it down
    if (value1.formattedDate < value2.formattedDate) return -1;
    if (value1.formattedDate > value2.formattedDate) return 1;

    //If two items have the same date, sort by priority
    //If the first item has a lower (more important) priority, move it up
    //If the first item has a higher (less important) priority, move it down.
    if (parseInt(value1.priority) < parseInt(value2.priority)) return -1;
    if (parseInt(value1.priority) > parseInt(value2.priority)) return 1;
  });
  project.todos = todos;
  const todoItemContainer = document.querySelector('#todoItems');
  todoItemContainer.innerHTML = '';
  // while (todoItemContainer.firstChild) {
  //   todoItemContainer.removeChild(todoItemContainer.firstChild);
  // }
  for (let i = 0; i < todos.length; i++) {
    const todoCard = document.createElement('div');
    todoCard.classList.add('todoCard');
    todoCard.id = i;
    const checkboxDiv = document.createElement('div');
    checkboxDiv.id = 'checkbox';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkboxDiv.appendChild(checkbox);
    todoCard.appendChild(checkboxDiv);
    const nameDiv = document.createElement('p');
    nameDiv.innerHTML = `<strong>${todos[i].name}</strong>`;
    todoCard.appendChild(nameDiv);
    const dateCreated = document.createElement('p');
    dateCreated.innerHTML = `<strong>Due Date: </strong> ${
      todos[parseInt(todoCard.id)].dueDate
    }`;
    todoCard.appendChild(dateCreated);
    todoCard.addEventListener('click', e => {
      if (todoCard.classList.length > 1) {
        todoCard.removeChild(todoCard.childNodes[3]);
        todoCard.removeChild(todoCard.childNodes[3]);
        todoCard.removeChild(todoCard.childNodes[3]);
        todoCard.classList.remove(todoCard.classList.item(1));
      } else {
        todoCard.classList.add('expanded');
        const priority = document.createElement('p');
        priority.innerHTML = `<strong>Priority: </strong> ${
          todos[parseInt(i)].priority
        }`;
        todoCard.appendChild(priority);
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('controlButton', 'delete');
        deleteButton.innerHTML = 'Remove Task';
        deleteButton.addEventListener('click', e => {
          todoItemContainer.removeChild(todoItemContainer.children[i]);
          project.todos.splice(i, 1);
          displayTodoItems(project);
          displayProjects(projectsList);
        });
        todoCard.appendChild(deleteButton);
        const editButton = document.createElement('button');
        editButton.classList.add('controlButton', 'edit');
        editButton.innerHTML = 'Edit Task';
        editButton.addEventListener('click', e => {
          createTodoForm(true, project, i);
        });
        todoCard.appendChild(editButton);
      }
    });
    todoItemContainer.appendChild(todoCard);
  }
}

export { displayTodoItems, displayProjects };
