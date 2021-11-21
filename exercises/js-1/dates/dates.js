"use strict";

// a bit ugly, ngl
Date.prototype.lastDayOfMonth = function() {
    return new Date(this.getFullYear(), this.getMonth(), 0).getDate();
}

Array.prototype.zip = function(b) {
    return this.map((k, i) => [k, b[i]])
}


function main() {
    const weekdays = {
        0: 'неделя',
        1: 'понеделник',
        2: 'вторник',
        3: 'сряда',
        4: 'четвъртък',
        5: 'петък',
        6: 'събота'
    };


    let dateArray = [new Date()];

    dateArray.push(new Date('2018-08-12'));
    dateArray[1].setHours(21, 0, 0);

    let array1 = dateArray.map(date => [date.lastDayOfMonth(), date.getDay()]);

    let array2 = dateArray.zip(array1).map(x => 
        'Дата ' + x[0].toLocaleDateString() + ', час ' + x[0].toLocaleTimeString() + ', ' +
        weekdays[x[1][1]] + ', ' + x[1][0] + ' дни');

    console.log(dateArray);

    console.log(array1);
    console.log(array2);
}




