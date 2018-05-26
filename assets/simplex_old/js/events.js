function nextEvent() {
    // Получаем индекс опорного элемента
    let bestPivot = $('.best-pivot');
    let pivot = bestPivot.attr('id').split('_').slice(1).map((el) => {return parseInt(el)});
    tableStack.push(Simplex.next(tableStack[tableStack.length - 1], pivot));  // Генерируем новую симплекс таблицу
    let valid = tableStack[tableStack.length - 1].valid();

    if (valid.status === 'resolved'){  // Если система решилась
        toast(resolved);  // Говорим, что нашли решение
        if (!next.attr('class').split(' ').includes('disabled'))
            next.addClass('disabled');
        let table = tableStack[tableStack.length - 1];
        finalAnswer.text(table.footer[table.footer.length - 1]);  // Выводим значение ф-и
        finalArray.text(table.getAnswerArray(table));  // Выводим вектор ответов
        $('.answer').css('opacity', 1);  // Делаем блок ответов видимым
    } else if (value.status === 'infinity')  // Если система уходит в бесконечность
        toast(solutionNotExist);

    table.html(generateHtml(tableStack[tableStack.length - 1]));

    $('.pivot').on('click', pivotEvent);
    bestPivot.on('click', pivotEvent);

    back.removeClass('disabled');
}

function backEvent() {
    tableStack.pop();  // Удаляем последнюю таблицу

    if (tableStack.length <= 1)  // Если дальше удалять уже некуда
        back.addClass('disabled');
    table.html(generateHtml(tableStack[tableStack.length - 1]));
    $('.pivot').on('click', pivotEvent);
    $('.best-pivot').on('click', pivotEvent);

    $('.answer').css('opacity', 0);
    next.removeClass('disabled')
}

function pivotEvent() {  // Событие для выбора опорного элемента
    let self = $(this);
    let best = $('.best-pivot');
    best.removeClass('best-pivot');
    best.addClass('pivot');
    self.removeClass('pivot');
    self.addClass('best-pivot')
}