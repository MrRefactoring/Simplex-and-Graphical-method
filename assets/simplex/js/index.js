function pivotEvent(e){
    let best = $('.best-pivot');
    best.removeClass('best-pivot');
    best.addClass('pivot');
    $(e.target).removeClass('pivot');
    $(e.target).addClass('best-pivot');
}

$(document).ready(() => {

    let tableStack = [];  // Стек из таблиц (Нужно, чтобы делать откаты на шаг назад)
    let valid;  // Хранит значение валидации
    let table = $('#table');
    let next = $('#next');
    let back = $('#back');

    let answer = $('#function_value');
    let array = $('#array');

    tableStack.push(parse());  // Генерируем первую симплекс таблицу и сразу помещаем ее в стек
    valid = validate(tableStack[tableStack.length - 1]);

    next.on('click', () => {
        let selected = $('.best-pivot').attr('id').split('_').slice(1).map((el) => {return parseInt(el)});  // Индекс выбранного опорного элемента
        tableStack.push(generateNewSimplexTable(tableStack[tableStack.length - 1], selected));  // Генерируем новую симплекс таблицу
        valid = validate(tableStack[tableStack.length - 1]);

        if (valid[0] === 'solved'){
            toast('Найдено решение!');
            if (!next.attr('class').split(' ').includes('disabled'))
                next.addClass('disabled');
            let s = tableStack[tableStack.length - 1];
            answer.text(s.footer[s.footer.length - 1]);
            $('.answer').css('opacity', 1);
            array.text(s.getAnswerArray(s));
        } else if (valid[0] === 'infinity') {
            toast('Решения не существует!')
        }

        table.html(generateHtml(tableStack[tableStack.length - 1], valid));

        $('.pivot').on('click', pivotEvent);
        $('.best-pivot').on('click', pivotEvent);

        back.removeClass('disabled');
    });

    back.on('click', () => {
        tableStack.pop();  // Удаляем последнюю таблицу

        if (tableStack.length <= 1)  // Если дальше удалять уже некуда
            back.addClass('disabled');

        valid = validate(tableStack[tableStack.length - 1]);
        table.html(generateHtml(tableStack[tableStack.length - 1], valid));

        $('.pivot').on('click', pivotEvent);
        $('.best-pivot').on('click', pivotEvent);

        $('.answer').css('opacity', 0);
        next.removeClass('disabled')
    });

    table.html(generateHtml(tableStack[tableStack.length - 1], valid));

    $('.pivot').on('click', pivotEvent);
    $('.best-pivot').on('click', pivotEvent);

    $('#save').on('click', saveEvent);

    fill();

});