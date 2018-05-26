function generateHtml(simplex){
    let valid = simplex.valid(simplex);
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
