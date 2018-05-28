function fractionToNumber(fraction) {  // Преобразует fraction в numbers
    return fraction.s * fraction.n / fraction.d
}

class Lines{

    static getData(data){

        let matrix = data.table.matrix;
        let point = data.point;

        data = [];

        // todo top and bottom

        for (let line of matrix){
            if (line[0].n === 0){  // Если x == 0 (Горизонтальная прямая)
                let y = line[2].div(line[1]);  // Находим константу по y
                y = fractionToNumber(y);  // Переводим из fraction в number

                data.push({
                    fn: `y - ${y}`,
                    fnType: 'implicit',
                    closed: line[1].mul(-1).mul(y - 1).add(line[2]).compare(0) >= 0 ? 'bottom': 'top',  //  Смотрим, в какую сторону закрашивать,
                    count: matrix.length + 1
                });
            } else if (line[1].n === 0){  // Если y == 0
                let x = line[2].div(line[0]);  // Находим константу по x
                x = fractionToNumber(x);  // Переводим из fraction в number
                data.push({
                    fn: x >= 0 ? `x - ${Math.abs(x)}`: `x + ${Math.abs(x)}`,
                    fnType: 'implicit',
                    count: matrix.length + 1
                });
            } else {  // Если уравнение имеет обычную форму

                let r = fractionToNumber(line[2]);  // Преобразуем fraction type to number type
                let y = fractionToNumber(line[1]);  // Преобразуем fraction type to number type
                let x = fractionToNumber(line[0]);  // Преобразуем fraction type to number type

                let formula = `(${r} - x * ${x}) / ${y}`;
                let closed;

                let value = (line[2].mul(line[0])).div(line[1]);  // Значение ф-и в точке (0, 0)

                if (value.compare(0) === 0){  // Если график пересекает эту точку

                } else {  // Если график не проходит через эту точку
                    if (line[1].compare(0) > 0)  // Если график выше оси абсцисс
                        closed = 'bottom';
                    else
                        closed = 'top'
                }

                data.push({
                    fn: formula,
                    closed: closed,
                    count: matrix.length + 1
                })
            }
        }

        data.push({
            points: [point],
            fnType: 'points',
            graphType: 'scatter',
            attr: {r: 10}
        });

        return data

    }

}