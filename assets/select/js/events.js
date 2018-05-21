let basicArray = [];

function simplexСhipClick() {
    if ($('#basic').prop('checked')) return;  // Запрещаем добавлять, если поле не активное
    let self = $(this);
    let id = parseInt(self.attr('id').split('_')[1]);
    if (self.attr('class').split(' ').includes(interfaceColor)){  // Если мы отключаем эту переменную
        if (basicArray.includes(id)){
            basicArray.splice(basicArray.indexOf(id), 1);
            self.toggleClass(interfaceColor)
        } else
            toast('Произошла внутренняя ошибка на сервере')
    } else {  // Если подключаем эту перменную
        if (basicArray.length < parseInt(localStorage.getItem('bounds'))){
            self.toggleClass(interfaceColor);
            basicArray.push(id)
        } else {
            toast('Вы уже выбрали максиамльное количество базисных перменных')
        }
    }
}

function openSimplexModal() {  // Открывает модальное окно
    let elems = document.querySelectorAll('#simplexModal');
    M.Modal.init(elems);
    M.Modal.getInstance(elems[0]).open();
}

function openGraphModal() {
    let elems = document.querySelectorAll('#graphModal');
    M.Modal.init(elems);
    M.Modal.getInstance(elems[0]).open();
}

function nextSimplexModal() {
    if ($('#basic').prop('checked')){  // Если выбран метод искусственного базиса
        localStorage.setItem('type', 'artificial');  // Указываем, что хотим использовать метод искусственного базиса
        window.location.href = simplexPage;  // Перебрасываем на страницу с симплекс методом
    } else {
        // Готово todo сделать кучу проверок
        // Готово todo проверка на кол-во выбранных переменных
        // Готово todo проверка на метод гаусса
        // Готово todo если метод гаусса с выбранными переменными дает нам ситуацию, когда
        // Готово todo свободный член < 0, то toast что что-то такие-себе переменные
        if (basicArray.length !== parseInt(localStorage.getItem('bounds'))){
            toast('Выберите все базисиные переменные');
            return;  // Выходим
        }

        let check = Gauss.simplexCheck(localStorage.getItem('matrix'), basicArray);
        if (check[0]){  // Если такие базисные переменные подходят
            localStorage.setItem('type', 'forward');  // Указываем, что хотим использовать прямой метод гаусса
            localStorage.setItem('forward', JSON.stringify(basicArray));  // Сохраняем базисные переменные
            window.location.href = simplexPage;
        } else if (check[1] === 'negative') {  // Если такие базисные переменные не подходят
            toast('Выбранные базисные перменные невозможно использовать для simplex-метода')
        } else if (check[1] === 'degeneracy'){  // Если получается вырожденная матрица
            toast('При таких базисных перменных получается вырожденный случай, выберите другие базисные перменные')
        }

    }
}