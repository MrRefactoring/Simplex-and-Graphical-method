class Simplex {

    static next(data){
        let table = data.table;
        let pivot = data.pivot;

        let newTable = $.extend(true, {}, table);
        newTable.matrix[pivot[0]][pivot[1]] = table.matrix[pivot[0]][pivot[1]].inverse();  // Инвертируем опорный элемент
        // Формируем опорную строку и опорный столбец
        for (let x = 0; x < newTable.matrix[pivot[0]].length; x++){
            if (x === pivot[1]) continue;
            newTable.matrix[pivot[0]][x] = Fraction(table.matrix[pivot[0]][x] / table.matrix[pivot[0]][pivot[1]])
        }
        for (let y = 0; y < table.matrix.length; y++){
            if (y === pivot[0]) continue;
            newTable.matrix[y][pivot[1]] = Fraction(table.matrix[y][pivot[1]] / -table.matrix[pivot[0]][pivot[1]])
        }

        // Пересчитываем матрицу
        for (let y = 0; y < newTable.matrix.length; y++){
            for (let x = 0; x < newTable.matrix[y].length; x++){
                if (y === pivot[0] || x === pivot[1]) continue;
                let m = [
                    [
                        table.matrix[pivot[0]][pivot[1]],
                        table.matrix[pivot[0]][x]
                    ],
                    [
                        table.matrix[y][pivot[1]],
                        table.matrix[y][x]
                    ]
                ];
                newTable.matrix[y][x] = Simplex.determinant(m)
            }
        }

        // Пересчитываем подвал
        newTable.footer[pivot[1]] = Fraction(table.footer[pivot[1]] * -table.matrix[pivot[0]][pivot[1]]);
        for (let x = 0; x < newTable.footer.length; x++){
            if (x === pivot[1]) continue;
            let m = [
                [
                    table.matrix[pivot[0]][pivot[1]],
                    table.matrix[pivot[0]][x]
                ],
                [
                    table.footer[pivot[1]],
                    table.footer[x]
                ]
            ];
            newTable.footer[x] = Simplex.determinant(m)
        }

        // Пересчитываем labels
        let temp = newTable.basic[pivot[0]];
        newTable.basic[pivot[0]] = newTable.head[pivot[1]];
        newTable.head[pivot[1]] = temp;

        if (table.artificial) {
            Simplex.deleteArtificialColumn(newTable);  // Если это еще метод искуственного базиса, то удаляем столбцы с искуственным базисом
            if (!Simplex.artificialVerification(newTable)){  // Если мы перешли от метода искусственного базиса к обычному симплекс методу
                // Проверка на то, что значение ф-и == 0
                if (newTable.footer[newTable.footer.length - 1].compare(0) > 0)  // Если значение ф-и больше 0, то говорим, что система несовместа
                    newTable.status = 'incompatible';
                else if (newTable.footer[newTable.footer.length - 1].compare(0) === 0){  // Если значение ф-и == 0
                    let functions = [];  // Тут храним ф-и для пересчета
                    for (let y = 0; y < newTable.basic.length; y++){
                        let f = {parent: newTable.basic[y], free: newTable.matrix[y][newTable.matrix[y].length - 1]};
                        for (let x = 0; x < newTable.matrix[y].length - 1; x++){
                            f[newTable.head[x]] = Fraction(-newTable.matrix[y][x]);
                        }
                        functions.push(f);
                    }
                    let values = newTable.calcCoefficients({table: newTable, functions: functions});  // Получем коэффициенты
                    for (let i = 0; i < newTable.head.length; i++)
                        newTable.footer[i] = values.values[newTable.head[i] - 1];
                    newTable.footer[newTable.footer.length - 1] = values.free.neg();
                }
            }
        }

        console.log(newTable);

        return newTable;
    }

    static determinant(matrix){
        return Fraction((matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) / matrix[0][0]);
    }

    static deleteArtificialColumn(table){  // Метод удаляет столбик с искусственным базисом
        let marker = [];
        for (let i = 0; i < table.head.length; i++)
            if (table.head[i] > table.variables){
                marker = [i];
                break;
            }

        if (marker.length === 0)
            return table;
        marker = marker[0];

        table.head.splice(marker, 1);  // Удаляем из header
        table.footer.splice(marker, 1);  // Удаляем из footer

        for (let y = 0; y < table.matrix.length; y++)
            table.matrix[y].splice(marker, 1)  // Удаляем из matrix
        return table;
    }

    static artificialVerification(table){  // Метод делает проверку на искусственный базис
        let flag = false;
        for (let i = 0; i < table.basic.length; i++)
            if (table.basic[i] > table.variables)
                flag = true;
        table.artificial = flag;  // Задаем, искусственный базис или нет
        return flag;  // Возвращаем значение
    }

    static check(data){  // Метод реализует проверку на возможность использования симплекс метода с basic переменными
        let method = new Gauss(data).lead();  // Выполняем метод гаусса
        if (method.success){  // Если метод гаусса успешно выполнился (матрица приведена к единичному виду)
            for (let y = 0; y < method.matrix.length; y++){  // Делаем проверку на отриацтельный элемент
                if (method.matrix[y][method.matrix.length - 1] < 0){  // Если хотя бы один свободный член отрицателен
                    return {success: false, error: negativeElement}  // Возвращаем ошибку о том, что негативный элемент существует
                }
            }

            // Отрезаем ненужную часть матрицы
            for (let y = 0; y < method.matrix.length; y++){
                method.matrix[y] = method.matrix[y].slice(method.matrix.length);
            }
            return {  // Если все проверки пройдены, то возвращаем нужные данные
                success: true,
                matrix: method.matrix,
                basic: method.basic,
                move: method.move,
                error: ''
            }
        } else  // Если не удалось выполнить преобразование матрицы
            return {success: false, error: method.error}  // Возвращаем ошибку

    }

}