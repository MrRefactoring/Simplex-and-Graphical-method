function load(data) {
    try {
        data = data.split('\n');
        __size(data);
        __function(data);
        __maximization(data);
        __matrix(data);
    } catch (e) {
        return false;
    }
    return true;
}

function __size(data) {
    localStorage.setItem('variables', parseInt(data[0].split(' ')[1]).toString());
    localStorage.setItem('bounds', parseInt(data[0].split(' ')[0]).toString())
}

function __function(data) {
    let f = JSON.parse(data[1]);
    for (let i = 0; i < parseInt(localStorage.getItem('variables')); i++){
        f[i] = Fraction(f[i])
    }
    localStorage.setItem('function', data[1])
}

function __maximization(data){
    if (data[2] === 'true' || data[2] === 'false')
        localStorage.setItem('maximization', data[2]);
    else
        throw new Error('Value exception')

}

function __matrix(data){
    let matrix = JSON.parse(data[3]);
    for (let y = 0; y < parseInt(localStorage.getItem('bounds')); y++){
        for (let x = 0; x < parseInt(localStorage.getItem('variables')); x++){
            matrix[y][x] = Fraction(matrix[y][x])
        }
    }
    localStorage.setItem('matrix', data[3])
}