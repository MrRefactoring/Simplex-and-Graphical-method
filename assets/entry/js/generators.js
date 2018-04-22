function genFunctionTable(){
    let html = `
        <table id="table" class="centered">
            <thead>
            <tr>
    `;

    for (let i = 1; i <= inpVarsCount; i++){
        html += `<th>X<sub>${i}</sub></th>`;
    }
    html += `
            </tr>
        </thead>
        <tbody>
                <tr>`;

    for (let i = 0; i < inpVarsCount; i++){
        html += `<td id="f${i}">0</td>`;
    }

    html += `
            </tr>
        </tbody>
    </table>
    <div class="switch centered-text">
    <label>
      Минимизация
      <input id="min" type="checkbox">
      <span class="lever"></span>
      Максимизация
    </label>
  </div>
    `;
    return html;
}

function genMatrixTable() {
    let html = `
        <table id="table" class="centered">
            <thead>
                <tr>
    `;

    // Создаем шапку
    for (let i = 1; i <= inpVarsCount; i++){
        html += `<th>X<sub>${i}</sub></th>`;
    }
    html += `
                <th>result</th>
            </tr>
        </thead>
        <tbody>`;

    // Создаем тело матрицы
    for (let i = 0; i < inpConsCount; i++){
        html += '<tr>';
        for (let j = 0; j <= inpVarsCount; j++){
            html += `<td id="m_${i}_${j}">0</td>`;
        }
        html += '</tr>';
    }

    html += `
         </tbody>
     </table>
    `;

    return html;
}

function genSelect() {
    let html = '<div class="row">';

    if (inpVarsCount - inpConsCount === 2){
        html += '<a id="graph" class="waves-effect waves-light btn orange"><i class="material-icons left">visibility</i>Графический метод</a>';
    } else {
        html += '<a id="graph" class="waves-effect waves-light btn orange disabled"><i class="material-icons left">visibility</i>Графический метод</a>';
    }
    html += '<a id="simplex" class="waves-effect waves-light btn orange"><i class="material-icons right">unarchive</i>Симплекс метод</a></div>';
    return html;
}