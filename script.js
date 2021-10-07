const inputData = document.querySelector('#input-data');
const result = document.querySelector('#result');
const clearLast = document.querySelector('.clear-last');
const clearAll = document.querySelector('.clear-all');
const equal = document.querySelector('.equal');
const nums = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');

let num1El = '';
let num2El = '';
let resultEl = null;
let lastOperation = '';
let haveDot = false;

function clearVar(name =''){
    num1El += num2El + ' ' + name + ' ';
    inputData.innerText = num1El;
    num2El = '';
    result.innerText = resultEl;
}

function mathOperation() {

    if(lastOperation === '+') {
        resultEl = parseFloat(resultEl) + parseFloat(num2El);
    } else if(lastOperation === '-') {
        resultEl = parseFloat(resultEl) - parseFloat(num2El);
    } else if(lastOperation === '*') {
        resultEl = parseFloat(resultEl) * parseFloat(num2El);
    } else if(lastOperation === '/') {
        resultEl = parseFloat(resultEl) / parseFloat(num2El);
    }
}

nums.forEach (num => {
    num.addEventListener('click', (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        num2El += e.target.innerText;
        inputData.innerText = num2El;
    })
});

operators.forEach(operator => {
    operator.addEventListener('click', (e) => {
        if(!num2El) return;
        haveDot = false;
        const operatorName = e.target.innerText;
        if(num1El && num2El && lastOperation){
            mathOperation();
        } else {
            resultEl = parseFloat(num2El);
        }
        clearVar(operatorName);
        lastOperation = operatorName;
    })
});

equal.addEventListener('click', (e) => {
    if(!num1El || !num2El) return;
    haveDot = false;
    mathOperation();
    clearVar();
    result.innerText = resultEl;
    num2El = '';
    num1El = '';
});

clearAll.addEventListener('click', (e )=> {
    result.innerText = '';
    inputData.innerText = '';
    let num1El = '';
    let num2El = '';
    let resultEl = null;
    let lastOperation = '';
    let haveDot = false;
});

clearLast.addEventListener('click', (e) => {
    inputData.innerText = '';
    num2El = '';
});

function clickButton(key) {
    nums.forEach(btn => {
        if(btn.innerText === key) {
            btn.click();
        }
    })
}

function clickOperator(key) {
    operators.forEach(btn => {
        if (btn.innerText === key){
            btn.click();
        }
    })
}

function clickEqual() {
    equal.click();
}

window.addEventListener('keydown', (e) => {
    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '.'){
        clickButtonEl(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        clickOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        clickEqual();
    }
})