const displayInput = document.querySelector('#input-data');
const displayResult = document.querySelector('#result');
const btnClearLast = document.querySelector('.clear-last');
const btnClearAll = document.querySelector('.clear-all');
const btnEqual = document.querySelector('.equal');
const btnNums = document.querySelectorAll('.num');
const btnOperators = document.querySelectorAll('.operator');

let num1 = '';
let operator = '';
let num2 = '';
let result = '';
let haveDot = false;
let feedbackInput = '';

//FUNCTIONS
function operation(n1, o, n2) {
    let a = parseFloat(n1);
    let b = parseFloat(n2);
    switch(o) {
        case '+': result = a + b;
        break;
        case '-': result = a - b;
        break;
        case '*': result = a * b;
        break;
        default: result = a / b;
        break;
    }
    result = (Math.round((result + Number.EPSILON) * 100) / 100).toString();
}

function noDot() {
    haveDot = false;
}

function resetVar() {
    noDot();
    num1 = '';
    operator = '';
    num2 = '';
    result = '';
    displayInput.innerText = '';
    displayResult.innerText = '';
}

function showInput(a) {
    displayInput.innerText = a;
}

function showResult() {
    displayResult.innerText = result;
}

function isOperator(a) {
    return a.includes('+' || '-' || '*' || '/'); //for some reason vsc does not accept \, so no .test(regex) here
}

//BUTTONS
btnNums.forEach (item => {
    item.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }

        num2 += e.target.innerText;

        if(num1 && num2){
            feedbackInput = num1 + operator + num2;
            showInput(feedbackInput);
        } else {
            feedbackInput = num2;
            showInput(feedbackInput);
        }
        })
});

btnOperators.forEach(item => {
    item.addEventListener('click', (e) => {
        if(!num2 && !num1) {return};
        noDot();

        if(num1 && num2 && operator){
            operation(num1, operator, num2);
            showResult();
            num1 = result;
            operator = e.target.innerText;
            num2 = '';
            result = '';
            noDot();
            feedbackInput = num1 + operator;
            showInput(feedbackInput);
            return;
        } else if (!num1) {
            operator = e.target.innerText;
            feedbackInput = num2 + operator;
            showInput(feedbackInput);
            num1 = num2;
            num2 = '';
            return;
        }
        operator = e.target.innerText;
        feedbackInput = num1 + operator;
        showInput(feedbackInput);
    })
});

btnClearAll.addEventListener('click', (e )=> {
    resetVar();
});

btnEqual.addEventListener('click', (e) => {
    if(!num1 || !operator || !num2) return;
    operation(num1, operator, num2);
    showResult();
    num1 = '';
    operator = '';
    num2 = result;
    result = '';
    noDot();
    feedbackInput = num2;
    showInput(feedbackInput);
});

btnClearLast.addEventListener('click', (e) => {
    if (displayInput.innerText = '') return;

    let lastInput = feedbackInput.slice(-1);
    if (isOperator(lastInput)) {
        operator = '';
        feedbackInput = feedbackInput.slice(0, -1);
        showInput(feedbackInput);
        console.log("num1" + ' ' + num1 + ', ' + 'operator' + ' ' + operator + ', ' + "num2" + '' + num2);
        return;
    } else if (!num2) {
        num1 = num1.slice(0, -1);
        feedbackInput = feedbackInput.slice(0, -1);
        showInput(feedbackInput);
        console.log("num1" + ' ' + num1 + ', ' + 'operator' + ' ' + operator + ', ' + "num2" + '' + num2);
        return;
    } else {
        num2 = num2.slice(0, -1);
        feedbackInput = feedbackInput.slice(0, -1);
        showInput(feedbackInput);
        console.log("num1" + ' ' + num1 + ', ' + 'operator' + ' ' + operator + ', ' + "num2" + '' + num2);
    }
});

//KEYBOARD
function clickButton(key) {
    btnNums.forEach((button) => {
      if (button.innerText === key) {
        button.click();
      }
    });
}

function clickOperator(key) {
    btnOperators.forEach((operation) => {
        if (operation.innerText === key) {
        operation.click();
        }
    });
}

function clickEqual() {
    btnEqual.click();
}

function clickClearLast() {
    btnClearLast.click();
}

function clickClearAll() {
    btnClearAll.click();
}
  

window.addEventListener('keydown', (e) => {
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '.'){
        clickButton(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        clickOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        clickEqual();
    } else if (e.key === 'Backspace') {
        clickClearLast();
    } else if (e.key === 'Delete') {
        clickClearAll();
    }
})
