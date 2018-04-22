function chipsInit(){

    let chips = $('#chips');
    for (let i = 0; i < parseInt(localStorage.getItem('vars')); i++){
        chips.append(`<div class="chip">X<sub>${i + 1}</sub></div>`);
    }

}

function toast(message){
    M.toast({html: message, classes: 'rounded'});
}

function loadMatrix(){
    let matrix = JSON.parse(localStorage.getItem('matrix'));  // Загружаем матрицу
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            matrix[y][x] = Fraction(matrix[y][x]);
        }
    }
    return matrix;
}

$(document).ready(() => {

    let main = $('#main');

    chipsInit();  // Предоставляем выбор базисных переменных

    let basic = [];  // Сюда сохраняем базисные переменные
    let max = parseInt(localStorage.getItem('cons'));

    $('.chip').on('click', (e) => {
        let id = parseInt(e.target.innerText.split('X')[1]) - 1;
        if (!e.target.classList.contains(color) && e.target.tagName === 'DIV' && !basic.includes(id) && basic.length < max){  // Если такого элемента нет в basic
            basic.push(id);
            e.target.classList.toggle(color);
        } else if (e.target.classList.contains(color) && e.target.tagName === 'DIV' && basic.includes(id)){  // Если такой элемент есть в basic
            basic.splice(basic.indexOf(id), 1);  // Удаляем элемент из массива
            e.target.classList.toggle(color);
        } else if (basic.length >= max){
            toast('Вы уже выбрали максимальное количество переменных');
        }
    });

    $('#next_button').on('click', () => {
        if (basic.length === max){  // Если выбраны все переменные
            let gauss = new Gauss(loadMatrix(), basic);  // Запускам гаусса
            if (gauss.can){  // gauss success
                $('#control').remove();  // Удаляем панель управления
                main.html('<canvas id="chart" class="max" ></canvas>');
                graph(gauss);  // Инициализируем график
                solver(gauss);  // Решаем задачу
            } else {  // if gauss is not success
                toast('Базисные переменные дают вырожденную матрицу. Выберите другие базисные переменные')
            }
        } else {  // Если выбраны не все перменные
            toast('Выберите все базисные переменные')
        }
    });

    $('#save').on('click', () => {
        let file = new File([
            `${localStorage.getItem('cons')} ${localStorage.getItem('vars')}\n${localStorage.getItem('function')}\n${localStorage.getItem('max')}\n${localStorage.getItem('matrix')}`
        ],
            'task.txt',
            {type: "text/plain;charset=utf-8"});
        saveAs(file);
        toast('Файл сохранен в папку \'Загрузки\'')
    })

});