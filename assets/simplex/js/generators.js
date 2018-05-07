function determinant(matrix) {
    return Fraction((matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) / matrix[0][0]);
}

function checkArtificial(simplex) {
    let flag = false;
    for (let i = 0; i < simplex.basic.length; i++){
        if (simplex.basic[i] > simplex.variables)
            flag = true;

    }
    return flag;
}

function deleteArtificial(simplex) {
    let marker = [];
    for (let i = 0; i < simplex.head.length; i++){
        if (simplex.head[i] > simplex.variables){
            marker = [i];
            break;
        }
    }

    if (marker.length === 0)
        return simplex;
    marker = marker[0];

    simplex.head.splice(marker, 1);  // Удаляем из header
    simplex.footer.splice(marker, 1);  // Удаляем из footer

    for (let y = 0; y < simplex.matrix.length; y++){
        simplex.matrix[y].splice(marker, 1)  // Удаляем из matrix
    }

    return simplex;
}

function generateNewSimplexTable(simplex, pivot) {
    let s = $.extend(true, {}, simplex);  // Копируем simplex аргумент
    s.matrix[pivot[0]][pivot[1]] = simplex.matrix[pivot[0]][pivot[1]].inverse();  // Инвертируем опорный элемент
    for (let x = 0; x < s.matrix[pivot[0]].length; x++){
        if (x === pivot[1]) continue;
        s.matrix[pivot[0]][x] = Fraction(simplex.matrix[pivot[0]][x] / simplex.matrix[pivot[0]][pivot[1]])
    }

    for (let y = 0; y < s.matrix.length; y++){
        if (y === pivot[0]) continue;
        s.matrix[y][pivot[1]] = Fraction(simplex.matrix[y][pivot[1]] / -simplex.matrix[pivot[0]][pivot[1]])
    }

    for (let y = 0; y < s.matrix.length; y++){
        for (let x = 0; x < s.matrix[y].length; x++){
            if (y === pivot[0] || x === pivot[1]) continue;
            let m = [
                [
                    simplex.matrix[pivot[0]][pivot[1]],
                    simplex.matrix[pivot[0]][x]
                ],
                [
                    simplex.matrix[y][pivot[1]],
                    simplex.matrix[y][x]
                ]
            ];
            s.matrix[y][x] = determinant(m)
        }
    }

    s.footer[pivot[1]] = Fraction(simplex.footer[pivot[1]] * -simplex.matrix[pivot[0]][pivot[1]]);
    for (let x = 0; x < s.footer.length; x++){
        if (x === pivot[1]) continue;
        let m = [
            [
                simplex.matrix[pivot[0]][pivot[1]],
                simplex.matrix[pivot[0]][x],
            ],
            [
                simplex.footer[pivot[1]],
                simplex.footer[x]
            ]
        ];
        s.footer[x] = determinant(m);
    }

    // Меняем labels
    let temp = s.basic[pivot[0]];
    s.basic[pivot[0]] = s.head[pivot[1]];
    s.head[pivot[1]] = temp;

    if (s.artificial)  // Если все еще искуственный базис
        s = deleteArtificial(s);

    s.artificial = checkArtificial(s);  // Проверяем, все еще искусственный базис или нет
    if (!s.recounted && !s.artificial){  //  Если это этап пересчета
        let functions = [];
        for (let y = 0; y < s.basic.length; y++){
            let f = {parent: s.basic[y], free: s.matrix[y][s.matrix[y].length - 1]};
            for (let x = 0; x < s.matrix[y].length - 1; x++){
                f[s.head[x]] = Fraction(-s.matrix[y][x]);
            }
            functions.push(f);
        }
        let values = s.calculate(s, functions);
        for (let i = 0; i < s.head.length; i++){
            s.footer[i] = values.values[s.head[i] - 1]
        }
        s.footer[s.footer.length - 1] = values.free.neg();
        s.recounted = true;  // Ставим флаг, что пересчет симплекс таблицы выполнен
    }

    return s;
}

function generateHtml(simplex, valid){
    let html = `
    <thead>
        <tr>
            <th></th>
    `;

    for (let i = 0; i < simplex.head.length; i++){
        html += `<th>X<sub>${simplex.head[i]}</sub></th>`
    }

    html += `<th></th>
        </tr>
    </thead>
    <tbody>
    `;

    for (let y = 0; y < simplex.matrix.length; y++){
        html += `<tr><th>X<sub>${simplex.basic[y]}</sub></th>`;
        for (let x = 0; x < simplex.matrix[y].length; x++){
            let inkl = include(valid[0], [y, x]);
            if (inkl !== false){
                if (inkl === valid[1])  // Если это лучший опорный элемент
                    html += `<td id="p_${y}_${x}" class="best-pivot">${simplex.matrix[y][x]}</td>`;
                else
                    html += `<td id="p_${y}_${x}" class="pivot">${simplex.matrix[y][x]}</td>`
            }
            else
                html += `<td>${simplex.matrix[y][x]}</td>`;
        }
        html += '</tr>';
    }

    html += `<tr><td></td>`;
    for (let i = 0; i < simplex.footer.length; i++){
        html += `<td>${simplex.footer[i]}</td>`;
    }
    html += `
            <td></td>
        </tr>
    </tbody>
    `;

    return html;
}

function include(array, element) {
    for (let i = 0; i < array.length; i++){
        let f = true;
        for (let j = 0; j < array[i].length; j++){
            if (array[i][j] !== element[j]){
                f = false;
            }
        }
        if (f)
            return i
    }
    return false;
}