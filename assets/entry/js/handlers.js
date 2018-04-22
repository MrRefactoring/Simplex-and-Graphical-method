function toast(message){
    // M.toast(message, timeout, 'rounded');
    M.toast({html: message, classes: 'rounded'});
}

function sizeInput() {
    inpVarsCount = parseInt($('#variables').val());
    inpConsCount = parseInt($('#constraints').val());
}

function functionInput(){
    for (let i = 0; i <= inpVarsCount; i++){
        try {
            inpFunction[i] = Fraction(eval($(`#f${i}`).text()));
        } catch (e) {
            toast('Введены некорректные данные');
            return false;
        }
    }
    inpMax = $('#min').is(':checked');  // Устанавливаем, минимизация ф-и или максимизация
    return true;
}

function matrixInput(){
    for (let i = 0; i < inpConsCount; i++){
        inpMatrix[i] = [];
        for (let j = 0; j <= inpVarsCount; j++){
            try{
                inpMatrix[i][j] = Fraction(eval($(`#m_${i}_${j}`).text()));
            } catch (e) {
                toast('Введены некорректные данные');
                return false
            }
        }
    }
    return true;
}