let lineColors = shuffle([
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722'
]);  // Определяет, какими цветами будут линии графика (каждый раз массив перемешивается)

let lines, points;

function getLines(gauss) {
    let matrix = gauss.matrix;
    let lines = [];  // Массив из линий
    for (let i = 0; i < matrix.length; i++){
        let x = matrix[i][matrix.length];
        let y = matrix[i][matrix.length + 1];
        let result = matrix[i][matrix.length + 2];
        lines.push(new Line(x, y, result));
    }
    return lines;
}

function getData(gauss) {
    let labels = [];
    let datasets = [];

    lines = getLines(gauss);  // Получаем классы прямых
    let lines_data = [];  // Тут хранятся датасеты прямых

    points = gauss.collisionPoints();  // Точки пересечения прямых
    let max = 0;
    for (let i = 0; i < points.length; i++){
        if (points[i][0].s > 0 && points[i][0].n / points[i][0].n > max){
            max = points[i][0].n / points[i][0].d;
        }
    }
    max *= 2;  // Делаем ряд в 2 раза больше

    let step = max < 2 ? 0.1: 1;

    for (let i = 0; i <= max; i += step){
        labels.push(i);
        for (let j = 0; j < lines.length; j++){
            if (lines_data[j] === undefined) lines_data[j] = [];
            lines_data[j].push(lines[j].getY(i))
        }
    }

    for (let i = 0; i < lines.length; i++){
        datasets.push({
            lineTension: 0,
            label: lines[i].getName(),
            borderColor: lineColors.pop(),
            fill: lines[i].area(),
            backgroundColor: `rgba(255, 87, 34, ${1 / (lines.length + 1)})`,
            data: lines_data[i]
        })
    }

    function sol() {
        let a = [];
        for (let i = 0; i <= max; i += step){
            a.push(0)
        }
        return a;
    }

    datasets.push({
        lineTension: 0,
        label: 'Область решений',
        borderColor: lineColors.pop(),
        fill: 'top',
        backgroundColor: `rgba(255, 87, 34, ${1 / (lines.length + 1)})`,
        data: sol()
    });

    return {
        labels: labels,
        datasets: datasets
    };
}

function graph(gauss) {
    let ctx = $('#chart');  // canvas

    let config = {
        type: 'line',
        data: getData(gauss),
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Графический метод решения задачи линейного программирования'
            },
            scales: {
                xAxes: [{
                    display: true,
                }],
                yAxes: [{
                    display: true,
                }]
            }
        }
    };

    new Chart(ctx, config);
}