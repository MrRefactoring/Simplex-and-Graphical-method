class Gauss{

    constructor(matrix, basic){
        this.matrix = matrix;
        this.basic = basic;
        this.move = {};
    }

    lead(){
        // Метод приводит систему к единичному виду и возвращает ее (если матрица вырожденная, то возвратит false)
        let sorted = Gauss.__sort({matrix:this.matrix, basic:this.basic});
        this.move = sorted['move'];
        this.matrix = sorted['matrix'];

        // Прямой ход
        for (let k = 1; k < this.matrix.length; k++){
            for (let j = k; j < this.matrix.length; j++){
                let m = Fraction(this.matrix[j][k - 1] / this.matrix[k - 1][k - 1]);
                for (let i = 0; i < this.matrix[0].length; i++){
                    this.matrix[j][i] = Fraction(this.matrix[j][i] - m * this.matrix[k - 1][i])
                }
            }
        }

        // Обратный ход
        this.__divLine(0, this.matrix[0][0]);
        for (let y = this.matrix.length - 1; y > 0; y--){
            this.__divLine(y, this.matrix[y][y]);  // Приводим остальные строки к еденичному виду
            for (let i = 0; i < y; i++){
                this.__subLine(i, y, this.matrix[i][y])
            }
        }

        // Проверка матрицы на вырожденность
        if (isNaN(this.matrix[0][0])){
            return false;
        }
        return this.matrix;  // Возвращаем матрицу

    }

    __divLine(lineIndex, divider){
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[lineIndex][x] = Fraction(this.matrix[lineIndex][x] / divider)
        }
    }

    __subLine(from, to, multiplier=1){
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[from][x] = Fraction(this.matrix[from][x] - this.matrix[to][x] * multiplier)
        }
    }

    static simplexCheck(matrix, basic) {
        // Метод реализует проверку на возможность использования симплекс метода с basic переменными
        // Если можно, то возвращает [true, матрицу с коэффициентами]
        // Если нельзя, потому что матрица вырожденная, то возвращает [false, degeneracy]
        // Если нельзя, потому что отрицательные элементы, то возвращает [false, negative]
        if (typeof matrix === 'string')
            matrix = JSON.parse(matrix);
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                matrix[y][x] = Fraction(matrix[y][x])
            }
        }
        let unit = new Gauss(matrix, basic).lead();  // Единичная матрица
        if (unit === false)  // Если матрица получатся вырожденной
            return [false, 'degeneracy'];  // Возвращаем информацию об этом
        for (let y = 0; y < unit.length; y++){
            if (unit[y][unit[y].length - 1] < 0){  // Если свободный член отрицательный
                return [false, 'negative'];  // Возвращаем информацию об этом
            }
        }

        let result = [];  // Результирующая матрица
        for (let y = 0; y < unit.length; y++){
            let array = [];
            for (let x = unit.length; x < unit[y].length; x++){
                array.push(unit[y][x])
            }
            result.push(array)
        }

        return [true, result];  // Возвращаем матрицу с коэффициентами

    }


    static __sort(data){
        // Метод производит сортировку матрицы
        // Если basic != undefined, то производим прямую сортировку
        // Если move != undefined, то производим обратную сортировку
        let matrix = data['matrix'];
        let basic = data['basic'];
        let move = data['move'];

        let movement = {};  // Тут храним историю пермещение
        if (basic !== undefined){
            basic.sort();  // Сортируем массив из базисных переменных
            for (let i = 0; i < basic.length; i++){
                if (basic[i] < matrix.length) continue;  // Если базисная перменная уже в начале (подходит нам)
                for (let j = 0; j < matrix.length; j++){  // Пытаемся найти место в начале матрицы
                    if (!basic.includes(j)) {  // Если место вакантно
                        for (let y = 0; y < matrix.length; y++){  // Меняем столбцы в матрице местами
                            let temp = matrix[y][basic[i]];
                            matrix[y][basic[i]] = matrix[y][j];
                            matrix[y][j] = temp;
                        }
                        movement[basic[i]] = j;  // Делаем запись о том, куда мы перенесли столбики
                        basic.splice(basic[i], 1);  //Удаляем заменненый элемент из базисных переменных
                        basic.push(j);  // Сортируем базисные переменные
                        basic.sort();  // Сортируем базисные переменные
                        break;  // Выходим из цикла и переходим к следующей базисной переменной
                    }
                }
            }
            return {matrix: matrix, move: movement}
        }
        if (move !== undefined){
            // Приводим матрицу к первозданному виду
            for (let key in move){
                for (let y = 0; y < matrix.length; y++){
                    let temp = matrix[y][move[key]];
                    matrix[y][move[key]] = matrix[y][key];
                    matrix[y][key] = temp;
                }
            }
            return {matrix: matrix}
        }
    }

}