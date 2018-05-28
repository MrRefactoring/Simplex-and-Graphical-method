$(document).ready(() => {

    // todo написать перебор всех точек ( или не всех кек )
    // todo как написать перебор всех точеек

    let table = parse('graph');
    table.validate(table);

    let deep = $.extend(true, {}, table);

    while (table.status === 'unresolved'){  // Пока система не решена
        let pivots = table.getPivots(table);  // Получаем опорные элементы
        table = Simplex.next({table: table, pivot: pivots.pivots[pivots.best]});
        table.validate(table);
    }

    let answer = table.getFinal(table);

    draw(deep, answer.vector);  //  Рисуем график (асинхронно)

    $('#finalAnswer').text(answer.function);
    $('#finalArray').text(answer.vector);
    $('.absolute').css('opacity', 1);

    $(this).on('resize', function () {
        window.location.reload();  // Перезагружаем страницу, если ее размер поменялся
    });

    $('#save').on('click', saveEvent);
    $('#reload').on('click', () => {window.location.replace('/index.html')});

    fill();

});