"use strict";


// a huuuuuuuuuge closure
function Calculator() {
    const input = document.getElementById('input-expression');
    const calculationList = document.getElementById('calculation-list');

    let savedValue = null;
    let savedOperation = null;
    let savedSymbol = null;
    let savedTarget = null;

    function saveOperation(e, op, template) {
        if (savedValue !== null) completeOperation();

        savedOperation = op;
        savedValue = input.value;
        savedSymbol = template;
        savedTarget = e.target;

        e.target.classList.add('saved');
    }

    function clearState() {
        savedValue = null;
        savedOperation = null;
        savedSymbol = null;
        savedTarget = null;
    }


    function completeOperation() {
        if (savedValue === null) return;

        if (savedTarget !== null) savedTarget.classList.remove('saved');

        const result = savedOperation(Number(savedValue), Number(input.value));
        addToHistory(`${savedSymbol.replace('c', savedValue).replace('d', input.value)} = ${result}`);
        input.value = result;
    }

    function finalizeCalculation() {
        completeOperation();
        clearState();
    }

    function clearInput() {
        clearState();
        input.value = '0';
    }

    function getExpressionItem(expr) {
        const li = document.createElement('li');
        li.innerHTML = expr;
        return li;
    }

    function clearHistory() {
        calculationList.innerHTML = '';
        window.localStorage.removeItem('history');
    }

    function getHistoryArray() {
        return JSON.parse(window.localStorage.getItem('history')) ?? [];
    }

    function loadHistory() {
        getHistoryArray().forEach(x => calculationList.appendChild(getExpressionItem(x)));
    }


    function addToHistory(expr) {
        window.localStorage.setItem('history',
            JSON.stringify([expr, ...getHistoryArray()])
        );

        calculationList.insertBefore(getExpressionItem(expr), calculationList.firstChild);
    }


    function addDigit(digit) {
        if (input.value === '0' || savedValue !== null) input.value = '';
        input.value += digit;
    }

    function calculateSingle(fn, template) {
        const result = fn(input.value);
        addToHistory(`${template.replace('d', input.value)} = ${result}`);
        input.value = result;
    }


    loadHistory();
    document.getElementById('btn-clear-history').onclick = () => clearHistory();

    //copy-paste
    for (let i = '0'; i <= '9'; i++) document.getElementById(`btn-${i}`).onclick = () => addDigit(i);

    document.getElementById('btn-decimal').onclick = () => addDigit('.');


    document.getElementById('btn-clear').onclick = () => clearInput();

    // lambdas and template strings
    document.getElementById('btn-sqrt').onclick = () => calculateSingle(Math.sqrt, '√d');
    document.getElementById('btn-square').onclick = () => calculateSingle(x => x * x, 'd<sup>2</sup>');

    document.getElementById('btn-plus').onclick = (e) => saveOperation(e, (a, b) => a + b, 'c + d');
    document.getElementById('btn-minus').onclick = (e) => saveOperation(e, (a, b) => a - b, 'c − d');
    document.getElementById('btn-times').onclick = (e) => saveOperation(e, (a, b) => a * b, 'c × d');
    document.getElementById('btn-divide').onclick = (e) => saveOperation(e, (a, b) => a / b, 'c ÷ d');


    document.getElementById('btn-equals').onclick = () => finalizeCalculation();
}

window.onload = function () {
    Calculator();

    document.getElementById('btn-expand').onclick = () => document.getElementById('wrapper').classList.toggle('expanded');
    document.getElementById('btn-minimize').onclick = () => document.getElementById('wrapper').classList.remove('expanded');
    document.getElementById('btn-close').onclick = () => document.getElementById('wrapper').classList.remove('expanded');

    document.getElementById('wrapper').ontransitionend = () => alert('Заслужавам си шестицата!');
}

