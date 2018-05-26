class Artificial{

    constructor(){
        this.simplex = {artificial: true, solved: false, recounted: false, calculate: Artificial.functionCalculator, getAnswerArray: Artificial.getAnswerArray, valid: Artificial.validate};
    }

    parse(){
        this.__sizeParse();
        this.__functionParse();
        this.__matrixParse();
        this.__footerParse();
        this.__labelsParse();
        console.log(this.simplex);
        return this.simplex;
    }

    __sizeParse() {
        this.simplex.variables = parseInt(localStorage.getItem('variables'));
        this.simplex.bounds = parseInt(localStorage.getItem('bounds'))
    }

    __functionParse() {
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
        this.simplex.function = f;
    }

    __matrixParse() {
        let matrix = JSON.parse(localStorage.getItem('matrix'));
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][matrix[y].length - 1] < 0)  // Если свободный член отрицателен
                    matrix[y][x] = Fraction(matrix[y][x]).neg();
                else
                    matrix[y][x] = Fraction(matrix[y][x])
            }
        }
        this.simplex.matrix = matrix;
    }

    __footerParse(){
        let footer = [];
        for (let x = 0; x < this.simplex.matrix[0].length; x++){
            footer[x] = Fraction(0);
            for (let y = 0; y < this.simplex.matrix.length; y++){
                footer[x] = footer[x].sub(this.simplex.matrix[y][x])
            }
        }
        this.simplex.footer = footer
    }

    __labelsParse(){
        let head = [], basic = [];
        for (let i = 1; i <= this.simplex.variables; i++){
            head.push(i);
        }
        for (let i = 1; i <= this.simplex.matrix.length; i++){
            basic.push(head[head.length - 1] + i)
        }
        this.simplex.head = head;
        this.simplex.basic = basic
    }

    static validate(table) {
        // TODO учесть что в столбике может быть только минимальный опорный элемент
        // TODO если есть одинаковые минимальные опорные элементы, то тогда можно выбрать любой

        // TODO написать холостой ход симплекс таблицы
        // TODO в последнем ходе симплекс метода мы можем попасть в ситуацию, когда
        // TODO метод искуственного базиса не окончился, а симплекс таблица уже решилась
        // TODO Тогда надо предоставить пользователю возможность выбрать в качестве опорного
        // TODO элемента любой элемент таблицы, который в строке с искусственной переменой
        // TODO дальше делаем обычную симплекс итерацию

        // Проверка на конечное решение
        let flag = true;
        for (let i = 0; i < table.footer.length; i++){
            if (table.footer[i].compare(0) < 0){  // Если хоть одно число меньше 0
                flag = false;
                break
            }
        }
        if (flag){  // Если выходит так, что это конечное решение, то
            if (table.artificial){  // Если получилось так, что это все еще искусственный базис
                let pivots = [[], 0];
                for (let y = 0; y < table.basic.length; y++){
                    console.log(table.basic[y]);
                    if (table.basic[y] > table.variables){  // Если это базисая переменная
                        for (let x = 0; x < table.matrix[y].length - 1; x++){
                            pivots[0].push([y, x])
                        }
                        return pivots;  // Возвращаем возможные базисные элементы в случае холостого хода
                    }
                }
            } else  // Если нет, то все хорошо
                return ['resolved']
        }
        // Проверка на ребро в бесконечность
        for (let x = 0; x < table.matrix[0].length; x++){
            let negative = true;
            for (let y = 0; y < table.matrix.length; y++){
                if (table.matrix[y][x].compare(0) > 0){
                    negative = false;
                    break
                }
            }
            if (negative && table.footer[x].compare(0) < 0){
                return ['infinity']
            }
        }
        // Ищем возможные опорные элементы
        let pivots = [[], 0];  // Все возможные опорные и индекс лучшего
        for (let x = 0; x < table.matrix[0].length - 1; x++) {
            if (table.footer[x].compare(0) >= 0) continue;  // Если низ таблицы не отрицательный
            let minimal = 100000000;  // Минимальное соотношение храним тут
            for (let y = 0; y < table.matrix.length; y++) {  // TODO это дикий костыль. Надо бы переписать
                if (table.matrix[y][x].compare(0) > 0) {
                    if ((table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x])).compare(minimal) < 0) {
                        minimal = (table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x]));
                    }
                }
            }
            for (let y = 0; y < table.matrix.length; y++) {
                if (table.matrix[y][x].compare(0) > 0)  // Если число (y, x) положительное
                    if ((table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x])).compare(minimal) === 0)  // Если тут выполняется минимальное соотношение
                        pivots[0].push([y, x]);
            }
        }

        let matrix = table.matrix;
        for (let i = 1; i < pivots[0].length; i++){
            if (matrix[pivots[0][i][0]][matrix[0].length - 1].div(matrix[pivots[0][i][0]][pivots[0][i][1]])
                < matrix[pivots[0][pivots[1]][0]][matrix[0].length - 1].div(matrix[pivots[0][pivots[1]][0]][pivots[0][pivots[1]][1]])){
                pivots[1] = i;
            }
        }
        return pivots;
    }

    static functionCalculator(simplex, functions){
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

    static getAnswerArray(simplex) {
        let array = [];
        for (let i = 0; i < simplex.basic.length; i++) {
            array[simplex.basic[i] - 1] = simplex.matrix[i][simplex.matrix[i].length - 1]
        }
        for (let i = 0; i < simplex.head.length; i++) {
            array[simplex.head[i] - 1] = 0
        }

        return array.toString().split(',').join(', ');
    }

}