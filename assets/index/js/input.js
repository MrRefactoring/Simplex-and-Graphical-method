function sizeInput(container) {
    localStorage.setItem('variables', $('#variables').val());
    localStorage.setItem('bounds', $('#bounds').val());
    functionGenerator(container)
}

function functionInput(container) {
    let f = [];
    for (let i = 0; i < parseInt(localStorage.getItem('variables')); i++){
        try {
            f[i] = Fraction(eval($(`#f${i}`).text())).valueOf()
        } catch (e) {
            return false;
        }
    }
    localStorage.setItem('function', JSON.stringify(f));
    localStorage.setItem('maximization', $('#maximization').is(':checked').toString());
    matrixGenerator(container);
    return true
}

function matrixInput(){
    let matrix = [];
    for (let y = 0; y < parseInt(localStorage.getItem('bounds')); y++){
        matrix[y] = [];
        for (let x = 0; x < parseInt(localStorage.getItem('variables')); x++){
            try {
                matrix[y][x] = Fraction(eval($(`#m_${y}_${x}`).text())).valueOf()
            } catch (e) {
                return false;
            }
        }
    }
    localStorage.setItem('matrix', JSON.stringify(matrix));
    return true;
}