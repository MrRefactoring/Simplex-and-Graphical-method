function compare(pivots, element) {
    for (let i = 0; i < pivots.length; i++){
        if (pivots[i].every((value, index) => value === element[index]))  // Если элемент входит в список опорных элементов
            return {result: true, index: i};  // Говорим, что элемент входит в список опорных
    }
    return {result: false}  // Говорим, что элемент не входит в список опорных
}

function generateHtml(table) {
    let pivots = table.getPivots(table);

    let html = `
    <thead>
        <tr>
            <th></th>
    `;
    // Генерируем названия свободных переменных
    for (let i = 0; i < table.head.length; i++){
        html += `<th>X<sub>${table.head[i]}</sub></th>`
    }
    html += `<th></th>
        </tr>
    </thead>
    <tbody>
    `;

    // Генерируем названия базисных переменных и сразу выводим коэффициенты
    for (let y = 0; y < table.matrix.length; y++){
        html += `<tr><th>X<sub>${table.basic[y]}</sub></th>`;  //  Добавляем название базисной переменной
        for (let x = 0; x < table.matrix[y].length; x++){
            let including = compare(pivots.pivots, [y, x]);  // Проверяем вхождение [y, x] в список опорных элементов
            if (including.result){  // Если это опорный элемент
                if (including.index === pivots.best)  // Если это лучший опорный элемент
                    html += `<td id="p_${y}_${x}" class="best-pivot">${table.matrix[y][x]}</td>`;  // Генерируем разметку, как для лучшего опорного элемента
                else
                    html += `<td id="p_${y}_${x}" class="pivot">${table.matrix[y][x]}</td>`  // Генерируем разметку, как для обычного опорного элемента
            } else  // Если это не опорный элемент
                html += `<td>${table.matrix[y][x]}</td>`;  // Генерируем простую разметку
        }
        html += '</tr>';  // Закрываем строку
    }
    // Генерируем разметку для подвала
    html += `<tr><td></td>`;
    for (let i = 0; i < table.footer.length; i++){
        html += `<td>${table.footer[i]}</td>`;
    }
    html += `
            <td></td>
        </tr>
    </tbody>
    `;

    return html;
}