function nextEvent() {
    let table = tables[tables.length - 1];  // Берем текущюю таблицу
    let pivot = $('.best-pivot').attr('id').split('_').slice(1).map((el) => {return parseInt(el)});  // Получаем индекс выбранного опорного элемента
    table = Simplex.next({  // Генерируем следущюю симплекс таблицу
        table: table,
        pivot: pivot
    });
    tables.push(table);  // Добавляем эту таблицу в стек
    table.validate(table);  // Проверяем таблицу на разрешенность

    if (table.status !== 'unresolved'){  // Если система вышла из нерешенной
        switch (table.status){
            case ('solved'):{
                toast(resolved);
                break
            }
            case ('incompatible'):{
                toast(incompatible);  // Говорим, что система несовместна
                break
            }
            case ('infinity'):{
                toast(solutionNotExist);  // Говорим, что есть ребро в бесконечность
                break
            }
        }
        next.addClass('disabled');
        let final = table.getFinal(table);  // Получем ответ системы
        finalLayout.css('opacity', 1);  // Выводим поле с ответом
        finalAnswer.text(final.function);  // Выводим значение ф-и
        finalArray.text(final.vector);  // Выводим вектор решения
    }

    html.html(generateHtml(table));  // Генирируем новую симплекс таблицу
    back.removeClass('disabled');

    $('.pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы
    $('.best-pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы
}

function backEvent() {
    tables.pop();  // Удаляем последнюю симплекс таблицу
    if (tables.length <= 1)  // Если дальше удалять уже некуда
        back.addClass('disabled');
    html.html(generateHtml(tables[tables.length - 1]));
    $('.pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы
    $('.best-pivot').on('click', pivotEvent);  // Вешаем события на опорные элементы
    finalLayout.css('opacity', 0);
    next.removeClass('disabled')
}

function startEvent() {  // Событие для проверки изначальной симплекс таблицы на решенность
    let table = tables[tables.length - 1];  // Берем текущюю таблицу
    table.validate(table);  // Проверяем таблицу
    if (table.status !== 'unresolved'){  // Если статус таблицы не неразрешенная (решенная или есть ребро в бесконечность), то
        next.addClass('disabled');  // Блокируем кнопку далее
        let final = table.getFinal(table);  // Получем ответ системы
        finalLayout.css('opacity', 1);  // Выводим поле с ответом
        finalAnswer.text(final.function);  // Выводим значение ф-и
        finalArray.text(final.vector);  // Выводим вектор решения
    }
}

function pivotEvent() {  // Событие для выбора опорного элемента
    let self = $(this);
    let best = $('.best-pivot');
    best.removeClass('best-pivot');
    best.addClass('pivot');
    self.removeClass('pivot');
    self.addClass('best-pivot')
}