import {format} from "date-fns";

const todoItem = (name, dueDate, priority, formattedDate) => {

  const editTodoInformation = (property, newValue) => {
    if (property == 1){
      this.name = newValue;
    }
    else if (property == 2){
      this.dueDate = newValue;
      let splitDate = newValue.split('-');
      this.formattedDate = format(new Date(splitDate[2], splitDate[0], splitDate[1]), 'yyyy-MM-dd');
    }
    else if (property == 3){
      this.priority = newValue;
    }
  }
  return { name, dueDate, priority, formattedDate, editTodoInformation};
};

export { todoItem };
