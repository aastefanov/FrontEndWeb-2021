"use strict";

function main() {
    const A = [10, 5, 13, 18, 51];

    console.log(A);
    console.log(double(A));
    console.log(even(A));
    console.log(hasElemLessThan10(A));
    console.log(hasElemLessThan10(double(A)));
    console.log(by3(A));
    console.log(last2(A));
}

function mul(arr, val) {
    return arr.map(x => x * val);
}

function double(arr) {
    return mul(arr, 2);
}

function even(arr) {
    return arr.filter(x => x % 2 === 0);
}

function hasElemLessThan(arr, val) {
    return arr.some(x => x < val);
}

function hasElemLessThan10(arr) {
    return hasElemLessThan(arr, 10);
}

function by3(arr) {
    return mul(arr, 3);
}

function sum(arr) {
    return arr.reduce((p, c) => p + c, 0);
}

function last2(arr) {
    return arr.splice(arr.length - 2);
}