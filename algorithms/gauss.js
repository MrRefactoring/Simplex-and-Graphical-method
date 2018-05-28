class Gauss {

    constructor(data){
        this.matrix = $.extend(true, [], data.matrix);  // deep copy
        this.basic = $.extend(true, [], data.basic);  // deep copy
        this.move = {};
    }

    lead(){
        let sort = Gauss.sort({matrix: this.matrix, basic: this.basic});  // Сортируем матрицу
        this.matrix = sort.matrix;
        this.basic = sort.basic;
        this.move = sort.move;
        let shadow = sort.shadow;

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

        // Проверка на вырожденность
        let degeneracy = false;
        for (let y = 0; y < this.matrix.length; y++){
            for (let x = 0; x < this.matrix[y].length; x++){
                if (isNaN(this.matrix[y][x])){
                    degeneracy = true;
                    break
                }
            }
        }
        if (degeneracy){  // Если матрица вырождена
            return {success: false, error: degeneracyMatrix}
        }

        return {
            success: true,
            matrix: this.matrix,
            basic: this.basic,
            shadow: shadow,
            move: this.move,
            //lines: matrixLines,
            error: ''
        }
    }

    __divLine(lineIndex, divider){  // Метод, который делит строку на делитель
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[lineIndex][x] = Fraction(this.matrix[lineIndex][x] / divider)
        }
    }

    __subLine(from, to, multiplier=1){  // Метод, который вычитает одну строку из другой
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[from][x] = Fraction(this.matrix[from][x] - this.matrix[to][x] * multiplier)
        }
    }

    static sort(data){
        let matrix = data.matrix;
        let basic = data.basic;

        let move = {};  // Словарь, в котором мы будем хранить перемещение базисных переменных
        let shadowsNames = {};

        basic.sort();  //  Сортируем массив с базисными переменными
        for (let i = 0; i < basic.length; i++){
            if (basic[i] < basic.length) continue;  // Если базисную переменную не надо перемещать то пропускаем ее
            for (let j = 0; j < basic.length; j++){
                if (!basic.includes(j)){  // Если место вакантно, то есть на это место можно поставить базисную переменную
                    for (let y = 0; y < matrix.length; y++){  // Меняем столбцы в матрице местами
                        let temp = matrix[y][basic[i]];
                        matrix[y][basic[i]] = matrix[y][j];
                        matrix[y][j] = temp;
                    }
                    move[basic[i]] = j;  // Делаем запись о том, куда переместили базисную переменную
                    shadowsNames[i] = basic[i];
                    basic.splice(i, 1);  // Удаляем старую переменную
                    basic.push(j);  // Добавляем новую переменную
                    basic.sort();  // Сортируем базисные переменные
                    break  // Выходим из цикла и переходим к следущей базисной переменной
                }
            }
        }
        for (let key in move){
            basic[move[key]] = parseInt(key);
        }
        return {move: move, basic: basic, matrix: matrix, shadow: shadowsNames}
    }

}