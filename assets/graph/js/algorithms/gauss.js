class Gauss{

    constructor(matrix, basic){
        this.matrix = matrix;
        this.basic = basic;

        this.can = false;  // Переменная, отвечающая, является ли матрица невырожденной
        this.move = {};  // Словарь, содержащий перемещение прямых

        this.__sort();
        this.__check();
    }

    collisionPoints(){  // Метод возвращает точки пересечения прямых
        let points = [];
        for (let i = 0; i < this.matrix.length; i++){
            for (let j = i; j < this.matrix.length; j++) {
                if (j === i) continue;
                let g = new Gauss(
                    [
                        [this.matrix[i][this.matrix.length], this.matrix[i][this.matrix.length + 1], this.matrix[i][this.matrix.length + 2]],
                        [this.matrix[j][this.matrix.length], this.matrix[j][this.matrix.length + 1], this.matrix[j][this.matrix.length + 2]]
                    ],
                    [0, 1]
                );
                if (!isNaN(g.matrix[0][0])){
                    points.push([g.matrix[0][2], g.matrix[1][2]]);
                }
            }
        }
        return points;
    }

    __check(){
        // Прямой ход
        for(let k = 1; k < this.basic.length; k++){
            for (let j = k; j < this.basic.length; j++){
                let m = this.matrix[j][k - 1].div(this.matrix[k - 1][k - 1]);
                for (let i = 0; i < this.matrix[0].length; i++){
                    this.matrix[j][i] = this.matrix[j][i].sub(this.matrix[k - 1][i].mul(m));
                }
            }
        }
        // Обратный ход
        this.__div(0, this.matrix[0][0]);
        for (let y = this.matrix.length - 1; y > 0; y--){
            this.__div(y, this.matrix[y][y]);  // Приводим остальные строки к еденичному виду
            for (let i = 0; i < y; i++){
                this.__sub(i, y, this.matrix[i][y]);
            }
        }
        if (!isNaN(this.matrix[0][0])){
            this.can = true;
        }
    }

    __div(lineIndex, divider){
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[lineIndex][x] = this.matrix[lineIndex][x].div(divider);
        }
    }

    __sub(from, to, multiplier = 1){
        for (let x = 0; x < this.matrix[0].length; x++){
            this.matrix[from][x] = this.matrix[from][x].sub(this.matrix[to][x].mul(multiplier));
        }
    }

    __sort(){
        this.basic.sort();
        for (let i = 0; i < this.basic.length; i++){
            if (this.basic[i] < this.basic.length) continue;  // Если базисная перменная уже в начале (подходит нам)
            for (let j = 0; j < this.basic.length; j++){  // Пытаемся найти место в начале матрицы
                if (!this.basic.includes(j)){  // Если место вакантно
                    for (let y = 0; y < this.matrix.length; y++){  // Меняем столбцы в матрице местами
                        let temp = this.matrix[y][this.basic[i]];
                        this.matrix[y][this.basic[i]] = this.matrix[y][j];
                        this.matrix[y][j] = temp;
                    }
                    this.move[this.basic[i]] = j;  // Запоминаем перемещение
                    this.basic.splice(this.basic.indexOf(this.basic[i]), 1);  //Удаляем заменненый элемент из базисных переменных
                    this.basic.push(j);  // Добавляем новое место базисной переменной
                    this.basic.sort();  // Сортируем базисные переменные
                    break;  // Выходим из цикла и переходим к следующей базисной переменной
                }
            }
        }
    }

}