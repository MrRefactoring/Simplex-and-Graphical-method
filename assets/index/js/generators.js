function selectorsGenerator(container) {
    let html = `
    <div class="col s12">
        <div class="input-field col s6">
            <select id="variables">
    `;

    for (let i = 1; i <= variablesCount; i++){
        html += `<option value="${i}">${i}</option>`;
    }

    html += `
            </select>
            <label for="variables">${variablesSelect}</label>
        </div>
        <div class="input-field col s6">
            <select id="bounds">
    `;

    for (let i = 1; i <= boundsCount; i++){
        html += `<option value="${i}">${i}</option>`;
    }

    html += `
            </select>
            <label for="bounds">${boundsSelect}</label>
        </div>
    </div>
    `;

    container.html(html);  // Пишем результат в DOM
}

function functionGenerator(container) {
    let html = `
    <span class="text-opacity">Введите коэффициенты функции</span>
    <table id="table" class="centered">
        <thead>
            <tr>
    `;

    for (let i = 1; i <= parseInt(localStorage.getItem('variables')); i++){
        html += `<th>X<sub>${i}</sub></th>`;
    }

    html += `
            </tr>
        </thead>
        <tbody>
            <tr>
    `;

    for (let i = 0; i < parseInt(localStorage.getItem('variables')); i++){
        html += `<td id="f${i}">0</td>`;
    }

    html += `
            </tr>
        </tbody>
    </table>
    
    <div class="switch">
        <label>
            Минимизировать ф-ю
            <input id="maximization" type="checkbox">
            <span class="lever"></span>
            Максимизировать ф-ю
        </label>
    </div>
    
    `;

    container.html(html);
    $('#table').editableTableWidget();
}

function matrixGenerator(container){
    let html = `
    <span class="text-opacity">Введите коэффициенты функции</span>
    <table id="table" class="centered">
        <thead>
            <tr>
    `;

    for (let i = 1; i <= parseInt(localStorage.getItem('variables')); i++){
        html += `<th>X<sub>${i}</sub></th>`;
    }

    html += `
                <th>Свободный член</th>
            </tr>
        </thead>
        <tbody>
    `;

    for (let y = 0; y < parseInt(localStorage.getItem('bounds')); y++){
        html += '<tr>';
        for (let x = 0; x <= parseInt(localStorage.getItem('variables')); x++){
            html += `<td id="m_${y}_${x}">0</td>`;
        }
        html += '</tr>';
    }

    html += `
        </tbody>
    </table>
    `;

    container.html(html);
    $('#table').editableTableWidget();
}