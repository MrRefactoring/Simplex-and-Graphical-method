`
В случае, если симплекс таблица не дошла до оптимального решения, то возвращает массив индексов возможных опорных элементов и лучший элемент
В случае, если симплекс таблица дошла до оптимального решения, то возвращает ['solved']
В случае, если симплекс таблица уходит в бесконечность, то возвращает ['infinity']
`;
function validate(simplex) {
    // Проверка на конечное решение
    let flag = true;
    for (let i = 0; i < simplex.footer.length; i++){
        if (simplex.footer[i].compare(0) < 0){  // Если хоть одно число меньше 0
            flag = false;
            break
        }
    }
    if (flag){
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
    for (let x = 0; x < simplex.matrix[0].length - 1; x++){
        if (simplex.footer[x].compare(0) >= 0) continue;  // Если низ таблицы не отрицательный
        for (let y = 0; y < simplex.matrix.length; y++){
            if (simplex.matrix[y][x].compare(0) > 0){  // Если число (y, x) положительное
                pivots[0].push([y, x]);
            }
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