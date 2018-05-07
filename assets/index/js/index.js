$(document).ready(() => {

    let container = $('#container');
    let next = $('#next');
    let attach = $('#attach');

    let step = 'selectors';
    next.on('click', () => {
        switch (step) {
            case ('selectors'):{  // Если мы на шаге ввода размерности
                sizeInput(container);
                step = 'function';
                break
            }
            case ('function'):{  // Если мы на шаге ввода ф-и
                if (functionInput(container))  // Если ф-я введена
                    step = 'matrix';
                else
                    toast(functionInputError);  // Говорим, что при вводе произошла ошибка
                break
            }
            case ('matrix'):{
                if (matrixInput())  // Если матрица введена
                    window.location.href = selectPage;
                else
                    toast(matrixInputError)
            }
        }
    });

    attach.on('change', (e) => {  // Когда пользователь выбирает загрузку данных из файла
        let r = new FileReader();

        r.onload = function (){
            if (load(this.result))  // Если загрузка из файла удалась
                window.location.href = selectPage;
            else
                toast(invalidDataFormat)
        };
        r.onerror = () => toast(fileReadError);

        r.readAsText(attach.prop('files')[0]);  // Читаем файл
        e.stopPropagation()
    });

    fill();  // Заливаем интерфейс
    selectorsGenerator(container);  // Генерируем selector'ы
    $('select').formSelect();  // Делаем select рабочими

});