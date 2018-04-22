function lF() {  // loadFunction
    let f = JSON.parse(localStorage.getItem('function'));
    for (let i = 0; i < f.length; i++){
        f[i] = Fraction(f[i]);
    }
    return f;
}

function solver(gauss) {
    // Получаем точки пересечения прямых с осями
    let can = true;
    for (let i = 0; i < lines.length; i++){
        let g = new Gauss(
            [
                [lines[i].x, lines[i].y, lines[i].result],
                [Fraction(0), Fraction(1), Fraction(0)]
            ],
            [0, 1]
        );
        if (g.can)  // Если матрица не вырожденная
            points.push([g.matrix[0][2], g.matrix[1][2]]);
        g = new Gauss(
            [
                [lines[i].x, lines[i].y, lines[i].result],
                [Fraction(1), Fraction(0), Fraction(0)]
            ],
            [0, 1]
        );
        if (g.can)  // Если матрица не вырожденная
            points.push([g.matrix[0][2], g.matrix[1][2]]);
        if (lines[i].result.s < 0)
            can = false
    }

    if (can)  // Если можем добавить точку 0, 0
        points.push([Fraction(0), Fraction(0)]);

    let f = lF();  // Загружаем ф-ю
    for(let move in gauss.move){  // Для каждого перемещения в списке перемещений делаем перемещение
        let temp = f[move];
        f[move] = f[gauss.move[move]];
        f[gauss.move[move]] = temp;
    }

    let matrix = gauss.matrix.slice();  // Копируем матрицу
    for (let y = 0; y < matrix.length; y++){
        let multiplier = f[y];  // Выделяем множитель строки
        for (let x = 0; x < matrix[y].length; x++){
            matrix[y][x] = matrix[y][x].mul(multiplier)
        }
        matrix[y] = matrix[y].slice(matrix.length);
        for (let x = 0; x < matrix[y].length - 1; x++){
            matrix[y][x] = matrix[y][x].neg()
        }
    }

    f = f.slice(matrix.length);
    f.push(Fraction(0));

    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++){
            f[x] = f[x].add(matrix[y][x]);
        }
    }

    let answer = 0;

    if (localStorage.getItem('max') === 'true'){  // Если задача максимизации
        let max = Number.NEGATIVE_INFINITY;
        for (let i = 0; i < points.length; i++){
            let v = f[0].mul(points[i][0]).add(f[1].mul(points[i][1])).add(f[2]);
            if (v.n / v.d * v.s > max){
                max = v.n / v.d * v.s;
            }

        }
        answer = max;
    } else {  // Если задача минимизации
        let min = Number.POSITIVE_INFINITY;
        for (let i = 0; i < points.length; i++){
            let v = f[0].mul(points[i][0]).add(f[1].mul(points[i][1])).add(f[2]);
            if (v.n / v.d * v.s < min){
                min = v.n / v.d * v.s;
            }

        }
        answer = min;
    }

    console.log(answer);

    $('#answer').html(
        `<span style="padding: 20px;">ƒ(X<sup>*</sup>) = ${answer}</span>`
    );

}