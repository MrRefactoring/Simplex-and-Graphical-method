let __simplex = {solved: false, calculate: functionCalculator, getAnswerArray: getAnswerArray};  // Первая симплекс таблица

function parse() {
    if (localStorage.getItem('type') === 'forward'){  // Если это не метод искусственного базиса
        __simplex.artificial = false;
        __simplex.recounted = true;
        __sizeParse(true);
        __functionParse();
        __matrixParse(true);
        __generateLabels(true);
        __footerParse(true);
    } else {  // Если это метод искусственного базиса
        __simplex.artificial = true;
        __simplex.recounted = false;
        __sizeParse();
        __functionParse();
        __matrixParse();
        __footerParse();
        __generateLabels();
    }
    return __simplex;
}

function __sizeParse(forward=false) {
    if (forward){
        __simplex.variables = parseInt(localStorage.getItem('variables')) - parseInt(localStorage.getItem('bounds'));
        __simplex.bounds = parseInt(localStorage.getItem('bounds'))
    } else {
        __simplex.variables = parseInt(localStorage.getItem('variables'));
        __simplex.bounds = parseInt(localStorage.getItem('bounds'))
    }
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

function __matrixParse(forward=false){
    if (forward){
        let matrix = JSON.parse(localStorage.getItem('matrix'));
        let basic = JSON.parse(localStorage.getItem('forward'));
        for (let y = 0; y < matrix.length; y++){
            for (let x = 0; x < matrix[y].length; x++){
                matrix[y][x] = Fraction(matrix[y][x])
            }
        }
        __simplex.matrix = Gauss.simplexCheck(matrix, basic)[1];
    } else {
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
}

function __footerParse(forward=false){
    if (forward){
        let functions = [];
        __simplex.footer = [];
        for (let y = 0; y < __simplex.basic.length; y++){
            let f = {parent: __simplex.basic[y], free: __simplex.matrix[y][__simplex.matrix[y].length - 1]};
            for (let x = 0; x < __simplex.matrix[y].length - 1; x++){
                f[__simplex.head[x]] = Fraction(-__simplex.matrix[y][x]);
            }
            functions.push(f);
        }
        let values = __simplex.calculate(__simplex, functions);
        for (let i = 0; i < __simplex.head.length; i++){
            __simplex.footer[i] = values.values[__simplex.head[i] - 1]
        }
        __simplex.footer[__simplex.footer.length] = values.free.neg();
    } else {
        let footer = [];
        for (let x = 0; x < __simplex.matrix[0].length; x++){
            footer[x] = Fraction(0);
            for (let y = 0; y < __simplex.matrix.length; y++){
                footer[x] = footer[x].sub(__simplex.matrix[y][x])
            }
        }
        __simplex.footer = footer
    }
}

function __generateLabels(forward=false){
    if (forward){
        let head = [], basic = JSON.parse(localStorage.getItem('forward'));
        for (let i = 0; i < basic.length; i++){
            basic[i] = basic[i] + 1
        }
        for (let i = 1; i <= parseInt(localStorage.getItem('variables')); i++){
            if (!basic.includes(i))
                head.push(i)
        }
        __simplex.basic = basic;
        __simplex.head = head;
    } else {
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

function getAnswerArray(simplex) {
    let array = [];
    for (let i = 0; i < simplex.basic.length; i++) {
        array[simplex.basic[i] - 1] = simplex.matrix[i][simplex.matrix[i].length - 1]
    }
    for (let i = 0; i < simplex.head.length; i++) {
        array[simplex.head[i] - 1] = 0
    }

    return array.toString().split(',').join(', ');
}