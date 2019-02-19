//Initialize everything & put it into variables

const display = document.querySelector('#display');
const topButtons = document.querySelectorAll('#top-button');
const numButtons = document.querySelectorAll('#num-button');
const opButtons = document.querySelectorAll('#op-button');
const eqButton = document.querySelector('#eq-button');
const floatButton = document.querySelector('#float-button');
const backButton = document.querySelector('#back-button');
const displayString = document.createElement('h1');
//More variable initialization
const operationsep = ['-', '\\\+', '·', '÷'];
const operations = ['-', '+', '·', '÷', '.'];
let result = 0;
//All of the basic math functions
function addition(num1, num2) {
    return num1 + num2;
}
function subt(num1, num2) {
    return num1 - num2;
}
function mult(num1, num2) {
    return num1 * num2;
}
function div(num1, num2) {
    return num1 / num2;
}
function operate(num1, num2, choice) { //Function for controlling math operations.
    if (choice == 1) {
        return addition(parseFloat(num1), parseFloat(num2));
    }
    else if (choice == 2) {
        return subt(parseFloat(num1), parseFloat(num2));
    }
    else if (choice == 3) {
        return mult(parseFloat(num1), parseFloat(num2));
    }
    else {
        return div(parseFloat(num1), parseFloat(num2));
    }
}
function fullOperation() { //The function that makes the whole thing work. This function runs when the Equal button is pressed.
    let x = displayString.textContent;
    let numbers = x.split(new RegExp('[-+÷·.]', 'g'));
    let operationsList = [];
    //Get a list of all operations
    for (let i = 0; i < displayString.textContent.length; i++) {
        if (operations.includes(displayString.textContent[i])) {
            operationsList.push(displayString.textContent[i]);
        }
    }
    //Insert all operations into the list of numbers, to get ready for functions.
    for (let i = 1; i < numbers.length; i += 2) {
        numbers.splice(i, 0, operationsList[0]);
        operationsList.splice(0, 1);
    }
    for (let i = 0; i < numbers.length; i++) { //Go through list of numbers. If floating point number is found, combine it with other stuff.
        if (numbers[i] === '.') {
            let float = '';
            float += parseInt(numbers[i - 1]);
            float += '.';
            float += parseInt(numbers[i + 1]);
            numbers.splice(i - 1, 3);
            let num = i - 1;
            numbers.splice(num, 0, float);
            i -= 1;
        }
    }
    let divideCount = 0;
    let multipleCount = 0;
    //Figure out the amount of division operators & multiplication operators in the equation.
    for (let i = 0; i < numbers.length; i++) {
        switch (numbers[i]) {
            case '÷':
                divideCount++;
                break;
            case '·':
                multipleCount++;
                break;
            default:
                break;
        }
    }
    /* Perform all of the multiplication and
    division operations first, then put them
    back in the equation so that addition &
    subtraction can be performed. */
    let totalCount = divideCount + multipleCount;
    while (totalCount !== 0) {
        for (let i = 1; i < numbers.length; i += 2) {
            if (numbers[i] === '÷') {
                result = operate(numbers[i - 1], numbers[i + 1], 4);
                let num = i;
                numbers.splice([i - 1], 3);
                numbers.splice(num - 1, 0, result);
                totalCount--;
                break;
            }
            else if (numbers[i] === '·') {
                result = operate(numbers[i - 1], numbers[i + 1], 3);
                let num = i;
                numbers.splice([i - 1], 3);
                numbers.splice(num - 1, 0, result);
                totalCount--;
                break;
            }
        }
    }
    /*Perform addition and subtraction. */
    while (numbers.length !== 1) {
        for (let i = 1; i < numbers.length; i += 2) {
            if (numbers[i] === '+') {
                result = operate(numbers[i - 1], numbers[i + 1], 1);
                let num = i;
                numbers.splice(i - 1, 3);
                numbers.splice(num - 1, 0, result)
            }
            else {
                result = operate(numbers[i - 1], numbers[i + 1], 2);
                let num = i;
                numbers.splice(i - 1, 3);
                numbers.splice(num - 1, 0, result)
            }
        }
    }
    if (numbers[0] === Infinity) {
        displayString.textContent = 'Divide by 0 error';
    }
    else if (numbers[0] !== numbers[0]) {
        displayString.textContent = 'Syntax error. Check your equation';
    }
    else {
        displayString.textContent = result;
    }
}
/*Initialize each button. The if statement
is to allow the display to update while the user
is putting in numbers. It removes the element that's
currently there and replaces it with an updated
element. */
function initializeButtons(button) {
    displayString.textContent += button.value;
    if (display.firstChild) {
        display.removeChild(display.firstChild);
        display.appendChild(displayString);
    }
    else {
        display.appendChild(displayString);
    }
}


topButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        while (display.firstChild) {
            display.removeChild(display.firstChild);
            result = 0;
        }
        displayString.textContent = '';
    });
});
backButton.addEventListener('click', (e) => {
    let text = displayString.textContent.substring(0, displayString.textContent - 1);
    displayString.textContent = text;
    display.removeChild(display.firstChild);
    display.appendChild(displayString);
});
/*Loop through each button & initialize. */
numButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        initializeButtons(button);
    });
});
opButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        initializeButtons(button);
    });
});
eqButton.addEventListener('click', (e) => {
    fullOperation();
});
floatButton.addEventListener('click', (e) => {
    initializeButtons(floatButton);
});

