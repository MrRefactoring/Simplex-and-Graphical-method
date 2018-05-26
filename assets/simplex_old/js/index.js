let table;
let next;
let back;
let finalAnswer;
let finalArray;
let tableStack;

$(document).ready(() => {

    table = $('#table');  // Таблица
    next = $('#next');  // Кнопка вперед
    back = $('#back');  // Кнопка назад

    finalAnswer = $('#finalAnswer');  // Тут выводится значение ф-и
    finalArray = $('#finalArray');  // Тут выводится вектор

    tableStack = [parse()];  // Стек из симплекс таблиц
    console.log(tableStack);

    next.on('click', nextEvent);
    back.on('click', backEvent);

    table.html(generateHtml(tableStack[tableStack.length - 1]));

    $('.pivot').on('click', pivotEvent);
    $('.best-pivot').on('click', pivotEvent);

    $('#save').on('click', saveEvent);

    fill()

});