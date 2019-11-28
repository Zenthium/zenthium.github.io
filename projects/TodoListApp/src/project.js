import {todoItem} from "./todoitem";

const project = (name) => {
    let todos = [];
    //add a new todo object to the list
    const addNewTodo = (name, dueDate, priority, formattedDate) => {
        let todo = todoItem(name, dueDate, priority, formattedDate);
        todos.push(todo);
    }
    return {todos, addNewTodo, name};
};

export {project};