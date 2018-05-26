let finalLayout;
let finalAnswer;
let finalArray;

let next;
let back;

let html;

let tables = [parse()];  // Стек из симплекс таблиц (сразу генерируем первую симплекс таблицу)

$(document).ready(() => {

    finalLayout = $('#finalLayout');
    finalAnswer = $('#finalAnswer');
    finalArray = $('#finalArray');

    html = $('#table');

    next = $('#next');
    back = $('#back');

    next.on('click', nextEvent);
    back.on('click', backEvent);

    html.html(generateHtml(tables[tables.length - 1]));  // Генерируем разметку для первой симплекс таблицы
    $('.pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы
    $('.best-pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы

    startEvent();  // Вызываем начальную проверку первой симплекс таблицы
    fill();

    $('#save').on('click', saveEvent);

});