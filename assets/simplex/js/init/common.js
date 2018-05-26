// Общий функционал для искусственного базиса и для прямого метода искуственного базиса
class Common{

    static validate(table){  // Метод, который выясняет, решена ли симплекс таблица или нет
        // Выполняем проверку на ребра, уходящие в бесконечность
        for (let x = 0; x < table.footer.length; x++){
            let negative = true;  // Предполагаем, что все элементы столбца - отрицательные
            for (let y = 0; y < table.matrix.length; y++)
                if (table.matrix[y][x] > 0)  // Если все таки не все элементы столбца отрицательные
                    negative = false;  // Меняем свое мнение
            if (negative && table.footer[x] < 0){  // Если не нашли позитивных элементов
                table.status = 'infinity';  // Ставим статус бесконечного ребра в статус таблицы
                return false;  // Возвращаем, что валидация не прошла
            }
        }
        // Выполняем проверку на решенность системы
        for (let x = 0; x < table.footer.length; x++)
            if (table.footer[x] < 0)  // Если найден отрицательный элемент
                return false;
        // Если проверки не дали результатов - значит система решилась
        table.status = 'resolved';  // Говорим, что система решилась
        return true;  // Возвращаем, что система решилась
    }

    static getPivots(table){
        let best = 0;  // Лучший опорный элемент
        let pivots = [];  // Список из возможных опорных элементов
        // Находим опорные элементы
        for (let x = 0; x < table.footer.length - 1; x++){  // Проходим каждый столбик, кроме последнего (столбик свободных членов)
            if (table.footer[x] >= 0) continue;  // Если элемент в подвале неотрицательный, то пропускаем этот столбик
            let minimal = Number.POSITIVE_INFINITY;  // Минимальное соотношение свободного члена и элемента столбца
            // Находим минимальное соотношение
            for (let y = 0; y < table.matrix.length; y++)
                if (
                    table.matrix[y][x] > 0 &&  // Если элемент потенциально может быть опорным
                    table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x]) < minimal  // И если соотношение меньше, чем минимальное
                )
                    minimal = table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x]);  // Тогда присваиваем новое минимальное соотношение
            // Находим возможные опорные элементы
            for (let y = 0; y < table.matrix.length; y++)
                if (
                    table.matrix[y][x] > 0 &&  // Если это потенциально опорный элемент
                    table.matrix[y][table.matrix[y].length - 1].div(table.matrix[y][x]).compare(minimal) === 0  // Если минимальное соотношение выполняется
                )
                    pivots.push([y, x])  // Тогда добавляем его в список опорных элементов
        }
        // Находим лучший опорный элемент
        for (let i = 0; i < pivots.length; i++)
            if (table.matrix[pivots[i][0]][table.matrix[0].length - 1].div(table.matrix[pivots[i][0]][pivots[i][1]])
                < table.matrix[pivots[best][0]][table.matrix[0].length - 1].div(table.matrix[pivots[best][0]][pivots[best][1]]))  // Если этот опорный элемент удовлетворяет условию лучшего
                best = i;  // Назначаем новый опорный элемент лучшим
        // todo если искусственный базис и нет опорных элементов - тогда холостой ход симплекс метода
        return {
            exists: pivots.length > 0,  // Существуют ли опорные элементы
            pivots: pivots,  // Список из индексов опорных элементов
            best: best  // Лучший опорный элемент
        }
    }

    static calcCoefficients(data){
        let table = data.table;
        let functions = data.functions;

        let values = $.extend(true, [], table.function);  // deep copy
        let free = Fraction(0);  // Свободный член ф-и

        for (let i = 0; i < functions.length; i++){
            let multiplier = values[functions[i].parent - 1];  // Множитель
            values[functions[i].parent - 1] = Fraction(0);  // Обнуляем базисную перменную
            free = free.add(functions[i].free * multiplier);
            for (let key in functions[i]){
                if (key === 'parent' || key === 'free') continue;
                values[key - 1] = values[key - 1].add(Fraction(functions[i][key] * multiplier))
            }
        }

        return {
            free: free,  // Значение свободного члена ф-и
            values: values
        }
    }

    static getFinal(table){
        // function - значение функции (вовращаемое значение)
        // vector - вектор ответа (возвращаемое значение)
        if (table.status === 'resolved'){  // Если таблица пришла к решению
            let vector = [];  // Вектор ответов
            for (let i = 0; i < table.basic.length; i++)
                vector[table.basic[i] - 1] = table.matrix[i][table.matrix[i].length - 1];  // Заполняем вектор
            for (let i = 0; i < table.head.length; i++)
                vector[table.head[i] - 1] = 0;  // Ставим на место свободных переменных нули
            return {
                function: table.footer[table.footer.length - 1],  // Возвращаем значение ф-и
                vector: vector.join(', ')
            }
        } else if (table.status === 'infinity') {  // Если таблица имеет ребро в бесконечность
            return {function: 'Ø', vector: 'Ø'}  // Возвращаем, что решения нет
        } else if (table.status === 'unresolved'){  // Если таблица не решена (странно, что в этом случае вообще вызван этот метод, но все же, вдруг)
            let vector = '';
            for (let i = 0; i < table.variables; i++)
                vector += 'NaN, ';
            return {function: NaN.toString(), vector: vector.split(0, vector.length - 2)}
        }
    }

}