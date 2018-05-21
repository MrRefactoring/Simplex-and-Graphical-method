$(document).ready(() => {

    let switchField = $('#basic');
    let chips = $('#simplexChips');

    let nextSimplex = $('#nextSimplex');

    function changeEvent() {
        chips.toggleClass('disabled');
        if (this.checked){
            for (let chip of chips.children()){
                $(chip).removeClass(interfaceColor);  // Удаляем цвет
            }
            basicArray = [];  // Очищаем массив из выбранных переменных
        }
    }

    switchField.change(changeEvent);
    nextSimplex.click(nextSimplexModal);

    $('#simplex').on('click', openSimplexModal);
    if (graphEnable)
        $('#graph').on('click', openGraphModal);

});


// let closeSimplex = $('#closeSimplex');
// let nextSimplex = $('#nextSimplex');
//
// closeSimplex.on('click', closeSimplexEvent);
// nextSimplex.on('click', nextSimplexEvent);
//
// let closeGraph = $('#closeGraph');
// let nextGraph = $('#nextGraph');
//
// nextGraph.on('click', nextGraphEvent);
// closeGraph.on('click', closeGraphEvent);
//
// // Всплывающее окно
// let simplex = document.querySelectorAll('#simplexModal');
// M.Modal.init(simplex);
// let simplexModal = M.Modal.getInstance(simplex[0]);
// simplexModal.open();
//
// let graph = document.querySelectorAll('#graphModal');
// M.Modal.init(graph);
// let graphModal = M.Modal.getInstance(graph[0]);