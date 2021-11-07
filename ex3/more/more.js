"use strict";

function main() {
    const A = [1, 2, 3, 4, 5, 50];
    console.log(contains50(A));
    console.log(hasSum50(A));
    console.log(toAdd(A));

    let str = "asdasdasddddaa";
    console.log(mostCommon(str));

    console.log(longestStreak(str));

    console.log(daysToChristmas());

}

Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b);
}

function contains50(arr) {
    return arr.some(x => x === 50);
}

function hasSum50(arr) {
    return arr.sum() === 50;
}

function toAdd(arr) {
    return 50 - arr.sum();
}

function mostCommon(str) {
    let matches = {};

    str.split('').forEach(letter => {
        if (!matches[letter]) matches[letter] = 1;
        else matches[letter] += 1;
    });

    const max_val = Math.max(...Object.values(matches));
    return Object.entries(matches).filter(([k, v]) => v == max_val).map(([k, v]) => k);
}

function daysToChristmas() {
    const factor = 1000 * 60 * 60 * 24; // ms * sec * min * hr

    const currentDate = new Date();
    const christmas = new Date(currentDate.getFullYear(), 12, 25);
    return Math.floor((christmas - currentDate) / factor);
}

function longestStreak(arr) {
    let streak = 1;

    let max_elem = arr[0];
    let max_streak = 1;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] != arr[i]) {
            if (streak >= max_streak) {
                max_streak = streak;
                max_elem = arr[i - 1];
            }
            streak = 1;
        } else streak += 1;
    }

    return max_elem;
}

function prefix_text(text) {
    return text.split(' ').map(word => (word[0] == 'n' || word[0] == 'N') ? word : 'n' + word).join('');
}