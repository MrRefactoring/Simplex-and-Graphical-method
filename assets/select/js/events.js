const bounds = parseInt(localStorage.getItem('bounds'));
let basic = [];

function simplexChipClick() {
    if ($('#type').prop('checked')) return;  // Если выбран метод искусственного базиса, то запрещаем добавлять / удалять базисные перменные
    let self = $(this);
    let id = parseInt(self.attr('id').split('_')[1]);  // Получаем id нажатой кнопки
    if (basic.includes(id)){   // Если переменная есть в базисных
        basic.splice(basic.indexOf(id), 1);  // Удаляем ее оттуда
        self.toggleClass(interfaceColor)  // Меняем цвет кнопки
    } else {  // ЕСли переменной нет в списке базисных
        if (basic.length < bounds){  //  Если можно еще добавить переменную в базисную
            basic.push(id);  // Добавляем в список базисных перменных
            self.toggleClass(interfaceColor)  // Меняем цвет кнопки
        } else {  // Если нет места для переменной
            toast(maxSelect)  // Говорим, что уже превышен лимит
        }
    }
}

function graphChipClick() {
    // todo
    let self = $(this);
    let id = parseInt(self.attr('id').split('_')[1]);  // Получаем id нажатой кнопки
    if (basic.includes(id)){   // Если переменная есть в базисных
        basic.splice(basic.indexOf(id), 1);  // Удаляем ее оттуда
        self.toggleClass(interfaceColor)  // Меняем цвет кнопки
    } else {  // ЕСли переменной нет в списке базисных
        if (basic.length < bounds){  //  Если можно еще добавить переменную в базисную
            basic.push(id);  // Добавляем в список базисных перменных
            self.toggleClass(interfaceColor)  // Меняем цвет кнопки
        } else {  // Если нет места для переменной
            toast(maxSelect)  // Говорим, что уже превышен лимит
        }
    }
}

function goToSimplex() {  // Метод для перехода к симплекс методу
    if ($('#type').prop('checked')){  // Если выбран метод искусственного базиса
        localStorage.setItem('type', 'artificial');  // Указываем, что хотим использовать метод искусственного базиса
        window.location.href = simplexPage  // Переходим на страницу симплекс метода
    } else {
        if (basic.length < bounds){  // Если выбраны не все базисные переменные
            toast(notAllSelected);  // Сообщаем, что не все базисные переменные выбраны
            return;  // Выходим
        }
        let matrix = JSON.parse(localStorage.getItem('matrix'));  // Загружаем матрицу
        for (let y = 0; y < matrix.length; y++)
            for (let x = 0; x < matrix[y].length; x++)
                matrix[y][x] = Fraction(matrix[y][x]);
        basic.sort();  // Сортируем список базисных переменных
        let check = Simplex.check({matrix: matrix, basic: basic});  // Делаем проверку. Подоходят ли эти переменные для симплекс метода или нет
        if (check.success){  // Если переменные подходят
            localStorage.setItem('type', 'forward');  // Задаем, что хотим использовать прямой симплекс метод
            localStorage.setItem('basic', JSON.stringify(basic));  // Сохраняем базисные переменные
            window.location.href = simplexPage;  // Перенаправляем на страницу симплекс метода
        } else {
            toast(check.error)  // Сообщаем об ошибке
        }
    }
}

function goToGraph() {  // Метод для перехода к графическому методу
    if (basic.length < bounds){
        toast(notAllSelected);
        return
    }
    let matrix = JSON.parse(localStorage.getItem('matrix'));  // Загружаем матрицу
    for (let y = 0; y < matrix.length; y++)
        for (let x = 0; x < matrix[y].length; x++)
            matrix[y][x] = Fraction(matrix[y][x]);
    basic.sort();  // Сортируем список базисных переменных
    let check = Simplex.check({matrix: matrix, basic: basic});  // Делаем проверку. Подоходят ли эти переменные для симплекс метода или нет
    if (check.success){  // Если переменные подходят
        localStorage.setItem('type', 'forward');  // Задаем, что хотим использовать прямой симплекс метод
        localStorage.setItem('basic', JSON.stringify(basic));  // Сохраняем базисные переменные
        window.location.href = graphPage;  // Перенаправляем на страницу графического метода
    } else {
        toast(check.error)  // Сообщаем об ошибке
    }
}

function openSimplexModal() {  // Открывает модальное окно
    basic = [];  // Сброс базисных переменных
    let elements = document.querySelectorAll('#simplexModal');
    M.Modal.init(elements);
    M.Modal.getInstance(elements[0]).open();
}

function openGraphModal() {
    basic = [];  // Сброс базисных переменных
    let elements = document.querySelectorAll('#graphModal');
    M.Modal.init(elements);
    M.Modal.getInstance(elements[0]).open();
}