class Artificial extends Common{

    static parse(){
        let table = {
            artificial: true,
            status: 'unresolved',  // Статус системы - нерешенная (изначально)
            getPivots: Common.getPivots,
            validate: Common.validate,
            calcCoefficients: Common.calcCoefficients,
            getFinal: Common.getFinal  // Возвращает ответ системы
        };
        Artificial.__sizeParse(table);
        Artificial.__functionParse(table);
        Artificial.__matrixParse(table);
        Artificial.__footerParse(table);
        Artificial.__labelParse(table);
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

    static __matrixParse(table){
        let matrix = JSON.parse(localStorage.getItem('matrix'));
        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix[y].length; x++) {
                if (matrix[y][matrix[y].length - 1] < 0)  // Если свободный член отрицателен
                    matrix[y][x] = Fraction(matrix[y][x]).neg();
                else
                    matrix[y][x] = Fraction(matrix[y][x])
            }
        }
        table.matrix = matrix;
    }

    static __footerParse(table){
        let footer = [];
        for (let x = 0; x < table.matrix[0].length; x++){
            footer[x] = Fraction(0);
            for (let y = 0; y < table.matrix.length; y++){
                footer[x] = footer[x].sub(table.matrix[y][x])
            }
        }
        table.footer = footer
    }

    static __labelParse(table){
        let head = [], basic = [];
        for (let i = 1; i <= table.variables; i++){
            head.push(i);
        }
        for (let i = 1; i <= table.matrix.length; i++){
            basic.push(head[head.length - 1] + i)
        }
        table.head = head;
        table.basic = basic
    }

}