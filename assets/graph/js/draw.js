function computeYScale (width, height, xScale) {
    let xDiff = xScale[1] - xScale[0];
    let yDiff = height * xDiff / width;
    return [-yDiff / 2, yDiff / 2]
}

function draw(table, vector) {

    let layout = $('.layout');
    let width = layout.width() * .98;
    let height = layout.height() * .98;

    let xScale = [-40, 40];

    table.head[0]--;
    table.head[1]--;

    vector = vector.split(', ').map((el) => {return parseFloat(el)});
    let point = [vector[table.head[0]], vector[table.head[1]]];  // Точка, которая является ответом

    let plot = functionPlot({
        target: '#layout',
        title: 'Графическое решения задачи линейного программирования',
        grid: true,
        data: Lines.getData({table: table, point: point}),
        width: width,
        height: height,
        xDomain: xScale,
        yDomain: computeYScale(width, height, xScale),
        xAxis: {
            label: 'x - axis',
        },
        yAxis: {
            label: 'y - axis'
        },
    });

}