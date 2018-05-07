let __simplex = {artificial: true, solved: false, recounted: false,
    calculate: functionCalculator, getAnswerArray: getAnswerArray};  // Тут будет храниться структура

function parse() {
    __sizeParse();
    __functionParse();
    __matrixParse();
    __footerParse();
    __generateLabels();
    return __simplex;
}

function __sizeParse() {
    __simplex.variables = parseInt(localStorage.getItem('variables'));
    __simplex.bounds = parseInt(localStorage.getItem('bounds'))
}

function __functionParse() {
    let f = JSON.parse(localStorage.getItem('function'));
    if (localStorage.getItem('maximization') === 'true'){  // Если функция максимизируется, то меняем знаки
        for (let i = 0; i < f.length; i++){
            f[i] = Fraction(f[i]).neg();  // Инвертируем значение
        }
    } else {
        for (let i = 0; i < f.length; i++){
            f[i] = Fraction(f[i]);
        }
    }
    __simplex.function = f;
}

function __matrixParse() {
    let matrix = JSON.parse(localStorage.getItem('matrix'));
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            if (matrix[y][matrix[y].length - 1] < 0)  // Если свободный член отрицателен
                matrix[y][x] = Fraction(matrix[y][x]).neg();
            else
                matrix[y][x] = Fraction(matrix[y][x])
        }
    }
    __simplex.matrix = matrix;
}

function __footerParse(){
    let footer = [];
    for (let x = 0; x < __simplex.matrix[0].length; x++){
        footer[x] = Fraction(0);
        for (let y = 0; y < __simplex.matrix.length; y++){
            footer[x] = footer[x].sub(__simplex.matrix[y][x])
        }
    }
    __simplex.footer = footer
}

function __generateLabels(){
    let head = [], basic = [];
    for (let i = 1; i <= __simplex.variables; i++){
        head.push(i);
    }
    for (let i = 1; i <= __simplex.matrix.length; i++){
        basic.push(head[head.length - 1] + i)
    }
    __simplex.head = head;
    __simplex.basic = basic
}

`
Струкрута functions - [{patent: вместо чего вставляется, coefficients: {номер_на_замену: коэффициент}} ... ]
`;
function functionCalculator(simplex, functions){
    let f = $.extend(true, [], simplex.function);  // deep copy функции
    let free_element = Fraction(0);  // Свободный член ф-и
    for (let i = 0; i < functions.length; i++){
        let mult = f[functions[i].parent - 1];  // Множитель
        f[functions[i].parent - 1] = Fraction(0);  // Обнуляем базисную перменную
        free_element = free_element.add(functions[i].free * mult);
        for (let key in functions[i]){
            if (key === 'parent' || key === 'free') continue;
            f[key - 1] = f[key - 1].add(Fraction(functions[i][key] * mult))
        }
    }
    return {free: free_element, values: f};
}

function getAnswerArray(simplex){
    let array = [];
    for (let i = 0; i < simplex.basic.length; i++){
        array[simplex.basic[i] - 1] = simplex.matrix[i][simplex.matrix[i].length - 1]
    }
    for (let i = 0; i < simplex.head.length; i++){
        array[simplex.head[i] - 1] = 0
    }

    return array.toString().split(',').join(', ');
}