function toast(message) {
    M.toast({html: message, classes: 'rounded'})
}

// Цвет интерфейса
const interfaceColor = 'orange';

function fill(color = interfaceColor) {  // Функция заливки интерфейса
    $('.color').addClass(color);
}

// Условные константы
const variablesCount = 16;  // Максимальное количество переменных в задаче
const boundsCount = 16;  // Максимальное количество ограничений в задаче

// Ссылки на страницы
const selectPage = '/assets/select/index.html';
const graphPage = '/assets/graph/index.html';
const simplexPage = '/assets/simplex/index.html';

// Строковые константы
const variablesSelect = 'Количество переменных';
const boundsSelect = 'Количество ограничений';
const saveToast = 'Файл сохранен';

const graphTitle = 'Графический метод решения';
const graphDescription = 'В линейном программировании используется графический метод, с помощью которого определяют выпуклые множества (многогранник решений). Если основная задача линейного программирования имеет оптимальный план, то целевая функция принимает значение в одной из вершин многогранника решений';

const simplexTitle = 'Решение симплекс-методом';
const simplexDescription = 'Данный метод является методом целенаправленного перебора опорных решений задачи линейного программирования. Он позволяет за конечное число шагов либо найти оптимальное решение, либо установить, что оптимальное решение отсутствует.';

const invalidDataFormat = 'Ошибка в формате данных';
const fileReadError = 'Произошла ошибка при чтении файла';

const functionInputError = 'При вводе функции произошла ошибка. Проверьте правильность данных';
const matrixInputError = 'При вводе матрицы, Вы, скорее всего, допустили ошибку. Проверьте правильность данных';

const maxSelect = 'Вы уже выбрали максиамльное количество базисных перменных';
const notAllSelected = 'Выберите все базисные переменные';

const degeneracyMatrix = 'При таких базисных перменных получается вырожденный случай, выберите другие базисные перменные';
const negativeElement = 'Выбранные базисные перменные невозможно использовать для simplex-метода';

const resolved = 'Решение найдено';
const incompatible = 'Система линейных ограничений несовместна';
const solutionNotExist = 'Решения не существует!';

let options = {  // Настройки для chart
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
                stepSize: 1
            }
        }],
        xAxes: [{
            ticks: {
                beginAtZero:true,
                stepSize: 100
            }
        }]
    }
};