import { project } from "./project";
import { displayTodoItems, displayProjects } from "./display";
import { format } from "date-fns";
import {todoItem} from "./todoitem";

let projectsList = [];
if (localStorage.projects) {
  projectsList = JSON.parse(localStorage.projects);
}

function createTodoForm(edit, project, index) {
  const documentContainer = document.querySelector("#content");
  let createTodoForm = document.createElement("form");
  createTodoForm.id = "itemForm";
  // createTodoForm.onsubmit = "return false";
  let nameLabel = document.createElement("label");
  nameLabel.htmlFor = "name";
  nameLabel.innerHTML = "Task Name";
  let lineBreak0 = document.createElement("br");
  createTodoForm.appendChild(nameLabel);
  createTodoForm.appendChild(lineBreak0);
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  createTodoForm.appendChild(nameInput);
  let lineBreak1 = document.createElement("br");
  createTodoForm.appendChild(lineBreak1);
  let lineBreak2 = document.createElement("br");
  createTodoForm.appendChild(lineBreak2);
  let dateLabel = document.createElement("label");
  dateLabel.htmlFor = "date";
  dateLabel.innerHTML = "Due Date <br />(please enter in <br />mm-dd-yyyy)";
  createTodoForm.appendChild(dateLabel);
  let dateInput = document.createElement("input");
  dateInput.type = "text";
  dateInput.id = "date";
  createTodoForm.appendChild(dateInput);
  let lineBreak3 = document.createElement("br");
  createTodoForm.appendChild(lineBreak3);
  let lineBreak4 = document.createElement("br");
  createTodoForm.appendChild(lineBreak4);
  let priorityLabel = document.createElement("label");
  priorityLabel.htmlFor = "priority";
  priorityLabel.innerHTML = "Priority";
  createTodoForm.appendChild(priorityLabel);
  let lineBreak8 = document.createElement("br");
  createTodoForm.appendChild(lineBreak8);
  let priorityInput = document.createElement("input");
  priorityInput.type = "number";
  priorityInput.id = "priority";
  createTodoForm.appendChild(priorityInput);
  let lineBreak5 = document.createElement("br");
  createTodoForm.appendChild(lineBreak5);
  let lineBreak6 = document.createElement("br");
  createTodoForm.appendChild(lineBreak6);
  let lineBreak7 = document.createElement("br");
  createTodoForm.appendChild(lineBreak7);
  let confirmButton = document.createElement("button");
  confirmButton.innerHTML = "Confirm";
  // confirmButton.type = "button";
  confirmButton.addEventListener("click", e => {
    e.preventDefault();
    let nameValue = document.getElementById("name").value;
    let dateValue = document.getElementById("date").value;
    let dateArray = dateValue.split("-");
    if (!edit && dateArray.length != 3) {
      let errorMessage = document.createElement("p");
      errorMessage.style.color = "red";
      errorMessage.innerHTML =
        "Error in date. Please format it in the style mm-dd-yyyy";
      createTodoForm.appendChild(errorMessage);
    } else if (!edit && dateArray[2].length != 4) {
      let errorMessage = document.createElement("p");
      errorMessage.style.color = "red";
      errorMessage.innerHTML =
        "Error in date. Please format it in the style mm-dd-yyyy";
      createTodoForm.appendChild(errorMessage);
    } else {
      let priorityValue = document.getElementById("priority").value;
      const projectsContainer = document.querySelector("#projectDisplay");
      let currentProjectId = 0;
      for (let i = 0; i < projectsContainer.children.length; i++) {
        let currentChildClassList = projectsContainer.children[i].classList;
        if (projectsContainer.children[i].classList.contains("clicked")) {
          currentProjectId = i - 2;
          break;
        }
      }
      if (!edit) {
        projectsList[currentProjectId].todos.push(todoItem(
          nameValue,
          dateValue,
          priorityValue,
          format(
            new Date(dateArray[2], dateArray[0], dateArray[1]),
            "yyyy-MM-dd"
          ))
        );
      } else {
        if (nameValue) {
          let currentTodo = projectsList[currentProjectId].todos[index];
          console.log(currentTodo);
          currentTodo.name = nameValue;
        }
        if (dateValue) {
          projectsList[currentProjectId].todos[index].dueDate = dateValue;
          projectsList[currentProjectId].todos[index].formattedDate = format(
            new Date(dateArray[2], dateArray[0], dateArray[1]),
            "yyyy-MM-dd"
          );
        }
        if (priorityValue) {
          projectsList[currentProjectId].todos[index].priority = priorityValue;
        }
      }
      displayTodoItems(projectsList[currentProjectId]);
      displayProjects(projectsList);
      documentContainer.removeChild(createTodoForm);
    }
    // console.log( {nameValue, dateValue, priorityValue});
  });
  createTodoForm.appendChild(confirmButton);
  documentContainer.appendChild(createTodoForm);
}
let newTodoButton = document.querySelector("#newTaskButton");
newTodoButton.addEventListener("click", e => {
  createTodoForm(false);
});
let newProjectButton = document.querySelector(".newProjectButton");
newProjectButton.addEventListener("click", e => {
  const documentContainer = document.querySelector("#content");
  let createProjectForm = document.createElement("form");
  createProjectForm.id = "itemForm";
  let nameLabel = document.createElement("label");
  nameLabel.htmlFor = "name";
  nameLabel.innerHTML = "Name of the Project";
  createProjectForm.appendChild(nameLabel);
  let nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.id = "name";
  createProjectForm.appendChild(nameInput);
  let lineBreak = document.createElement("br");
  createProjectForm.appendChild(lineBreak);
  let confirmButton = document.createElement("button");
  confirmButton.innerHTML = "Confirm";
  confirmButton.addEventListener("click", e => {
    e.preventDefault();
    let theNewProject = project(nameInput.value);
    projectsList.push(theNewProject);
    displayProjects(projectsList);
    documentContainer.removeChild(createProjectForm);
  });
  createProjectForm.appendChild(confirmButton);
  documentContainer.appendChild(createProjectForm);
});

if (projectsList.length == 0) {
  let projectOne = project("Default");
  projectsList.push(projectOne);
}
displayProjects(projectsList);
displayTodoItems(projectsList[0]);

window.onbeforeunload = closingCode;
function closingCode() {
  localStorage.removeItem("projects");
  localStorage.setItem("projects", JSON.stringify(projectsList));
}

export { createTodoForm, projectsList };
