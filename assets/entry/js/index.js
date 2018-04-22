function fillSelect(variables, constraints){
    for (let i = 1; i <= variablesCount; i++)
        variables.append(`<option value="${i}">${i}</option>`)
    for (let i = 1; i <= constraintsCount; i++)
        constraints.append(`<option value="${i}">${i}</option>`)
}

function getFunction() {
    let f = [];
    for (let i = 0; i < inpFunction.length; i++){
        console.log(inpFunction[i]);
        f[i] = inpFunction[i].valueOf();
    }
    return f;
}

function getMatrix() {
    let m = [];
    for (let y = 0; y < inpMatrix.length; y++){
        m[y] = [];
        for (let x = 0; x < inpMatrix[y].length; x++){
            m[y][x] = inpMatrix[y][x].valueOf();
        }
    }
    return m;
}

$(document).ready(() => {
    let main = $('#main');

    let nextButton = $('#next_button');
    let step = 0;

    nextButton.on('click', () => {
        switch (step){
            case (0):{
                sizeInput();
                main.html(genFunctionTable());
                $('#table').editableTableWidget();
                step++;
                break
            }

            case (1):{
                if (functionInput()){
                    main.html(genMatrixTable());
                    $('#table').editableTableWidget();
                    step++;
                }
                break
            }

            case (2):{
                if (matrixInput()){
                    main.html(genSelect());
                    $('#next_field').html('');
                    $('#graph').on('click', () => {
                        for (let i = 0; i < inpFunction.length; i++){
                            inpFunction[i] = inpFunction[i].toString()
                        }

                        for (let y = 0; y < inpMatrix.length; y++){
                            for (let x = 0; x < inpMatrix[y].length; x++){
                                inpMatrix[y][x] = inpMatrix[y][x].toString();
                            }
                        }

                        localStorage.setItem('function', JSON.stringify(getFunction()));
                        localStorage.setItem('max', inpMax.toString());
                        localStorage.setItem('matrix', JSON.stringify(getMatrix()));
                        localStorage.setItem('vars', inpVarsCount.toString());
                        localStorage.setItem('cons', inpConsCount.toString());
                        window.location.replace('assets/graph/index.html');
                    });
                    $('#simplex').on('click', () => {
                        for (let i = 0; i < inpFunction.length; i++){
                            inpFunction[i] = inpFunction[i].toString()
                        }

                        for (let y = 0; y < inpMatrix.length; y++){
                            for (let x = 0; x < inpMatrix[y].length; x++){
                                inpMatrix[y][x] = inpMatrix[y][x].toString();
                            }
                        }

                        localStorage.setItem('function', JSON.stringify(getFunction()));
                        localStorage.setItem('max', inpMax.toString());
                        localStorage.setItem('matrix', JSON.stringify(getMatrix()));
                        localStorage.setItem('vars', inpVarsCount.toString());
                        localStorage.setItem('cons', inpConsCount.toString());
                        window.location.replace('assets/simplex/index.html')
                    });

                    step++;
                }
                break
            }
        }
    });

    let attach = $('#attach');
    attach.on('change', () => {
        let reader = new FileReader();

        reader.onload = function(){
            if(load(this.result)){  // Если загрузка удалась
                main.html(genSelect());
                $('#next_field').html('');
                $('#graph').on('click', () => {
                    for (let i = 0; i < inpFunction.length; i++){
                        inpFunction[i] = inpFunction[i].toString()
                    }

                    for (let y = 0; y < inpMatrix.length; y++){
                        for (let x = 0; x < inpMatrix[y].length; x++){
                            inpMatrix[y][x] = inpMatrix[y][x].toString();
                        }
                    }

                    localStorage.setItem('function', JSON.stringify(getFunction()));
                    localStorage.setItem('max', inpMax.toString());
                    localStorage.setItem('matrix', JSON.stringify(getMatrix()));
                    localStorage.setItem('vars', inpVarsCount.toString());
                    localStorage.setItem('cons', inpConsCount.toString());
                    window.location.replace('assets/graph/index.html');
                });
                $('#simplex').on('click', () => {
                    for (let i = 0; i < inpFunction.length; i++){
                        inpFunction[i] = inpFunction[i].toString()
                    }

                    for (let y = 0; y < inpMatrix.length; y++){
                        for (let x = 0; x < inpMatrix[y].length; x++){
                            inpMatrix[y][x] = inpMatrix[y][x].toString();
                        }
                    }

                    localStorage.setItem('function', JSON.stringify(getFunction()));
                    localStorage.setItem('max', inpMax.toString());
                    localStorage.setItem('matrix', JSON.stringify(getMatrix()));
                    localStorage.setItem('vars', inpVarsCount.toString());
                    localStorage.setItem('cons', inpConsCount.toString());
                    window.location.replace('assets/simplex/index.html')
                });
            } else {
                console.log(this.result);
                M.toast({html: 'Произошла ошибка при чтении файла', classes: 'rounded'});
            }
        };
        reader.onerror = function(){M.toast({html: 'Произошла ошибка при чтении файла', classes: 'rounded'})};

        reader.readAsText(attach.prop('files')[0])
    });


    fillSelect($('#variables'), $('#constraints'));
    $('select').formSelect();  // Делаем select рабочими

});