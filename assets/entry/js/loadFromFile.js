function load(data) {
    try {
        data = data.split('\n');
        loadSize(data);
        loadFunction(data);
        loadMax(data);
        loadMatrix(data);
    } catch (e) {
        return false;
    }
    return true;
}

function loadSize(data) {
    inpConsCount = parseInt(data[0].split(' ')[0]);
    inpVarsCount = parseInt(data[0].split(' ')[1]);
}

function loadFunction(data) {
    inpFunction = JSON.parse(data[1]);
    for (let i = 0; i < inpFunction.length; i++){
        inpFunction[i] = Fraction(inpFunction[i]);
    }
}

function loadMax(data) {
    inpMax = JSON.parse(data[2]);
}

function loadMatrix(data){
    inpMatrix = JSON.parse(data[3]);
    for (let y = 0; y < inpMatrix.length; y++){
        for (let x = 0; x < inpMatrix[y].length; x++){
            inpMatrix[y][x] = Fraction(inpMatrix[y][x])
        }
    }
}