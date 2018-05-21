`
В случае, если симплекс таблица не дошла до оптимального решения, то возвращает массив индексов возможных опорных элементов и лучший элемент
В случае, если симплекс таблица дошла до оптимального решения, то возвращает ['solved']
В случае, если симплекс таблица уходит в бесконечность, то возвращает ['infinity']
`;
function validate(simplex) {
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
    for (let i = 0; i < simplex.footer.length; i++){
        if (simplex.footer[i].compare(0) < 0){  // Если хоть одно число меньше 0
            flag = false;
            break
        }
    }
    if (flag){  // Если выходит так, что это конечное решение, то
        if (simplex.artificial){  // Если получилось так, что это все еще искусственный базис
            let pivots = [[], 0];
            for (let y = 0; y < simplex.basic.length; y++){
                console.log(simplex.basic[y]);
                if (simplex.basic[y] > simplex.variables){  // Если это базисая переменная
                    for (let x = 0; x < simplex.matrix[y].length - 1; x++){
                        pivots[0].push([y, x])
                    }
                    return pivots;  // Возвращаем возможные базисные элементы в случае холостого хода
                }
            }
        } else  // Если нет, то все хорошо
            return ['solved']
    }
    // Проверка на ребро в бесконечность
    for (let x = 0; x < simplex.matrix[0].length; x++){
        let negative = true;
        for (let y = 0; y < simplex.matrix.length; y++){
            if (simplex.matrix[y][x].compare(0) > 0){
                negative = false;
                break
            }
        }
        if (negative && simplex.footer[x].compare(0) < 0){
            return ['infinity']
        }
    }
    // Ищем возможные опорные элементы
    let pivots = [[], 0];  // Все возможные опорные и индекс лучшего
    for (let x = 0; x < simplex.matrix[0].length - 1; x++) {
        if (simplex.footer[x].compare(0) >= 0) continue;  // Если низ таблицы не отрицательный
        let minimal = 100000000;  // Минимальное соотношение храним тут
        for (let y = 0; y < simplex.matrix.length; y++) {  // TODO это дикий костыль. Надо бы переписать
            if (simplex.matrix[y][x].compare(0) > 0) {
                if ((simplex.matrix[y][simplex.matrix[y].length - 1].div(simplex.matrix[y][x])).compare(minimal) < 0) {
                    minimal = (simplex.matrix[y][simplex.matrix[y].length - 1].div(simplex.matrix[y][x]));
                }
            }
        }
        for (let y = 0; y < simplex.matrix.length; y++) {
            if (simplex.matrix[y][x].compare(0) > 0)  // Если число (y, x) положительное
                if ((simplex.matrix[y][simplex.matrix[y].length - 1].div(simplex.matrix[y][x])).compare(minimal) === 0)  // Если тут выполняется минимальное соотношение
                    pivots[0].push([y, x]);
        }
    }

    let matrix = simplex.matrix;
    for (let i = 1; i < pivots[0].length; i++){
        if (matrix[pivots[0][i][0]][matrix[0].length - 1].div(matrix[pivots[0][i][0]][pivots[0][i][1]])
            < matrix[pivots[0][pivots[1]][0]][matrix[0].length - 1].div(matrix[pivots[0][pivots[1]][0]][pivots[0][pivots[1]][1]])){
            pivots[1] = i;
        }
    }
    return pivots;
}