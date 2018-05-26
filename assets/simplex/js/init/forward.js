class Forward extends Common{

    static parse(){
        let table = {
            artificial: false,
            status: 'unresolved',  // Статус системы - нерешенная (изначально)
            getPivots: Common.getPivots,
            validate: Common.validate,
            calcCoefficients: Common.calcCoefficients,
            getFinal: Common.getFinal  // Возвращает ответ системы
        };

        Forward.__sizeParse(table);
        Forward.__functionParse(table);
        Forward.__dataParse(table);

        return table;
    }

    static __sizeParse(table){
        table.variables = parseInt(localStorage.getItem('variables'));
        table.bounds = parseInt(localStorage.getItem('bounds'));
    }

    static __functionParse(table){
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
        table.function = f;
    }

    static __dataParse(table){
        let matrix = JSON.parse(localStorage.getItem('matrix'));  // Загружаем матрицу
        let basic = JSON.parse(localStorage.getItem('basic'));  // Загружаем базисные переменные
        for (let y = 0; y < matrix.length; y++)
            for (let x = 0; x < matrix[y].length; x++)
                matrix[y][x] = Fraction(matrix[y][x]);
        basic.sort();  // Сортируем список базисных переменных
        let check = Simplex.check({matrix: matrix, basic: basic});  // Делаем проверку. Подоходят ли эти переменные для симплекс метода или нет
        table.matrix = check.matrix;
        // Задаем labels
        table.basic = check.basic;
        for (let i = 0; i < table.basic.length; i++){
            table.basic[i]++;
        }
        table.head = [];
        for (let i = 1; i <= table.variables; i++)
            if (!table.basic.includes(i))
                table.head.push(i);
        // Задаем footer
        table.footer = [];
        let functions = [];  // Тут храним ф-и для пересчета
        for (let y = 0; y < table.basic.length; y++){
            let f = {parent: table.basic[y], free: table.matrix[y][table.matrix[y].length - 1]};
            for (let x = 0; x < table.matrix[y].length - 1; x++){
                f[table.head[x]] = Fraction(-table.matrix[y][x]);
            }
            functions.push(f);
        }
        let values = table.calcCoefficients({table: table, functions: functions});  // Получем коэффициенты
        console.log(values);
        for (let i = 0; i < table.head.length; i++)
            table.footer[i] = values.values[table.head[i] - 1];
        table.footer[table.footer.length] = values.free.neg();

    }

}