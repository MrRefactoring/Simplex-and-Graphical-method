$(document).ready(() => {

    let type = $('#type');
    let simplexChips = $('#simplexChips');

    let simplexNext = $('#simplexNext');

    function changeEvent() {
        if (this.checked){
            for (let chip of simplexChips.children())
                $(chip).removeClass(interfaceColor)
            basic = [];  // Очищаем массив из выбранных переменных
        }
        simplexChips.toggleClass('disabled')
    }

    type.on('change', changeEvent);
    simplexNext.on('click', goToSimplex);

    $('#simplex').on('click', openSimplexModal);
    if (graphEnable)
        $('#graph').on('click', openGraphModal)

});