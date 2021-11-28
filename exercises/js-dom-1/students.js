"use strict";

function padded(number, places) {
    return String(number).padStart(places, '0');
}

Date.prototype.shanoFormat = function () {
    return `${padded(this.getFullYear(), 4)}-${padded(this.getMonth(), 2)}-${padded(this.getDate(), 2)}` +
        ` ${padded(this.getHours(), 2)}:${padded(this.getMinutes(), 2)}:${padded(this.getSeconds(),2)}.${padded(this.getMilliseconds(), 3)}`;
}

function tdWithText(val) {
    const td = document.createElement('td');
    td.textContent = val;
    return td;
}

function validateCallback(firstName, lastName, facultyNumber, averageGrade, onSuccess, onFail) {
    const errors = {};
    if (!firstName) errors['firstName'] = 'First name is required';
    if (!lastName) errors['lastName'] = 'Last name is required';
    if (facultyNumber < 10000 || facultyNumber > 50000) errors['facultyNumber'] = 'Faculty number must be between 10000 and 50000';
    if (averageGrade < 2 || averageGrade > 6) errors['averageGrade'] = 'Average grade must be between 2 and 6';
    return Object.keys(errors).length == 0 ? onSuccess() : onFail(errors);
}

window.onload = function () {
    document.getElementById('input-form').onsubmit = onAddStudent;
    document.getElementById('btn-only-with').onclick = onOnlyWith;
    document.getElementById('btn-only-without').onclick = onOnlyWithout;
    document.getElementById('btn-show-all').onclick = onShowAll;
}

function onShowAll() {
    Array.of(...document.getElementById('student-data').children)
        .forEach(x => x.classList.remove('hidden'));
}

function onOnlyWith() {
    Array.of(...document.getElementById('student-data').children)
        .forEach(x => x.classList.toggle('hidden', !x.classList.contains('has-money')));
}

function onOnlyWithout() {
    Array.of(...document.getElementById('student-data').children)
        .forEach(x => x.classList.toggle('hidden', x.classList.contains('has-money')));
}

function onAddStudent(e) {
    e.preventDefault();
    const formElement = document.getElementById('input-form');

    Array.of(...formElement.children).forEach(x => x.classList.remove('error'));

    if (!formElement.reportValidity()) return;

    const firstName = formElement['firstName'].value;
    const lastName = formElement['lastName'].value;
    const facultyNumber = formElement['facultyNumber'].value;
    const averageGrade = Number(formElement['averageGrade'].value);
    console.log(firstName, lastName, facultyNumber, averageGrade);

    // let's assume it calls a server
    validateCallback(firstName, lastName, facultyNumber, averageGrade, () => {
        addToTable(firstName, lastName, facultyNumber, averageGrade, new Date());
        formElement.reset();
    }, (errors) => {
        for (const [k, v] of errors) {
            formElement[k].classList.add('error');
        }
    })
}

function sortTable() {
    const studentData = document.getElementById('student-data');

    let children = Array.of(...studentData.children)
        .sort((x, y) => Number(y.children[3].textContent) - Number(x.children[3].textContent));

    studentData.replaceChildren(...children);
}

function addToTable(firstName, lastName, facultyNumber, averageGrade, inputDate) {
    const studentData = document.getElementById('student-data');

    const rowElement = document.createElement('tr');

    if (averageGrade >= 5.50) rowElement.classList.add('has-money');


    rowElement.replaceChildren(
        tdWithText(firstName),
        tdWithText(lastName),
        tdWithText(facultyNumber),
        tdWithText(Number(averageGrade).toFixed(2)),
        tdWithText(inputDate.shanoFormat())
    );

    studentData.appendChild(rowElement);

    sortTable();
}
