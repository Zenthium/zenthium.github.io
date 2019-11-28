const numberButtonContainer = document.querySelector(".numberbuttons");
const display = document.querySelector(".display");
const operatorButtonContainer = document.querySelector(".opbuttons");
const topButtonContainer = document.querySelector(".topbuttons");
const operators = ["/", "*", "-", "+"];
let resultArray = []

//basic operation functions
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}
function divide(num1, num2) {
  if (num2 == 0){
    let numberDisplay = display.children[0];
    numberDisplay.innerHTML = "Divide by 0 error.";
    return;
  }
  return num1 / num2;
}

//operate function, takes operator and two numbers and carries out the requested operation
function operate(operator, num1, num2) {
  if (operator == "/") {
    return divide(num1, num2);
  } else if (operator == "*") {
    return multiply(num1, num2);
  } else if (operator == "-") {
    return subtract(num1, num2);
  } else if (operator == "+") {
    return add(num1, num2);
  }
}

//function to add number to display
function addNumberToDisplay(target) {
  let numberDisplay;
  if (display.children.length == 0) {
    numberDisplay = document.createElement("p");
    display.appendChild(numberDisplay);
    numberDisplay.style.fontSize = "24px";
    numberDisplay.style.fontFamily = "'Courier New', Courier, monospace";
  } else {
    numberDisplay = display.children[0];
  }
  numberDisplay.innerHTML = numberDisplay.innerHTML + String(target.value);
}

//initialize the number buttons
function activateNumberButtons() {
  let numbers = numberButtonContainer.children;
  for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", e => {
      addNumberToDisplay(e.target);
    });
  }
}

//function to add operator symbol to display
function addOperatorToDisplay(target) {
  let numberDisplay;
  if (display.children.length == 0) {
    numberDisplay = document.createElement("p");
    display.appendChild(numberDisplay);
    numberDisplay.style.fontSize = "24px";
    numberDisplay.style.fontFamily = "'Courier New', Courier, monospace";
  } else {
    numberDisplay = display.children[0];
  }

  numberDisplay.innerHTML = numberDisplay.innerHTML + String(target.value);
}

//initialize operator buttons
function activateOperatorButtons() {
  let buttons = operatorButtonContainer.children;
  for (i = 0; i < buttons.length; i++) {
    if (buttons[i].value == "equals") {
      buttons[i].addEventListener("click", (e) => {
        evaluateExpression();
      })
    } else {
      buttons[i].addEventListener("click", (e) => {
        addOperatorToDisplay(e.target);
      });
    }
  }

  let topButtons = topButtonContainer.children;
  topButtons[3].addEventListener("click", (e) => {
    addOperatorToDisplay(e.target);
  });
}

//go through resultArray and check for multiplication and division, do those first.
function doMultiplicationAndDivision(){
  for (i = 0; i < resultArray.length; i++){
    if ((resultArray[i] == "*") || (resultArray[i] == "/")){
      resultArray[i] = operate(resultArray[i], parseFloat(resultArray[i-1]), parseFloat(resultArray[i+1]));
      resultArray.splice(i-1, 1);
      resultArray.splice(i, 1);
      i = i - 1;
    }
  }
}

//do the addition and subtraction once done
function doAdditionAndSubtraction(){
  for (i = 0; i < resultArray.length; i++){
    if (operators.includes(resultArray[i])){
      resultArray[i] = operate(resultArray[i], parseFloat(resultArray[i-1]), parseFloat(resultArray[i+1]));
      resultArray.splice(i-1, 1);
      resultArray.splice(i, 1);
      i = i - 1;
    }
  }
}

//total it all up!
function evaluateExpression(){
  let numberDisplay;
  if (display.children.length == 0) {
    //just don't do anything
  } else {
    numberDisplay = display.children[0];
  }
  let mostRecentSplit = 0;
  if (numberDisplay.innerHTML.length > 0){
    for (i = 0; i < numberDisplay.innerHTML.length; i++){
      if (operators.includes(numberDisplay.innerHTML[i])){
        resultArray.push(numberDisplay.innerHTML.substring(mostRecentSplit, i));
        resultArray.push(numberDisplay.innerHTML.substring(i, i+1));
        mostRecentSplit = i + 1;
      }
    }
  }
  if (operators.includes(numberDisplay.innerHTML[0])){
    numberDisplay.innerHTML = "Error";
    return;
  }
  if (numberDisplay.innerHTML.length - 1 == mostRecentSplit){
    resultArray.push(numberDisplay.innerHTML.substring(mostRecentSplit));
  }

  if ((operators.includes(resultArray[0])) || (operators.includes(resultArray[resultArray.length - 1]))){
    numberDisplay.innerHTML = "Error"
    return;
  }

  doMultiplicationAndDivision();
  doAdditionAndSubtraction();

  numberDisplay.innerHTML = resultArray[0];
  resultArray = [];
}

//initialize clear button
function activateClearButton(){
  let clearButton = document.querySelector(".topbuttons").children[0];
  clearButton.addEventListener("click", (e) => {
    let numberDisplay;
    if (display.children.length > 0){
      display.children[0].innerHTML = "";
    }
  });
}

//initialize backspace button
function activateBackspaceButton(){
  let backspaceButton = document.querySelector(".topbuttons").children[1];
  backspaceButton.addEventListener("click", (e) => {
    let numberDisplay;
    if (display.children.length > 0){
      display.children[0].innerHTML = display.children[0].innerHTML.substring(0, display.children[0].innerHTML.length - 1);
    }
  })
}

activateNumberButtons();
activateOperatorButtons();
activateClearButton();
activateBackspaceButton();
