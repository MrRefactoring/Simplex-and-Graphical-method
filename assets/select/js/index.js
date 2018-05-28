let graphEnable = false;

$(document).ready(() => {

    let body = $('body');
    let simplexChips = $('#simplexChips');
    let graphChips = $('#graphChips');

    let variables = parseInt(localStorage.getItem('variables'));
    let bounds = parseInt(localStorage.getItem('bounds'));

    if (variables - bounds === 2){
        body.append(graphHtmlGenerator());
        graphEnable = true;

        for (let i = 1; i <= variables; i++)
            graphChips.append(`<div id="c_${i - 1}" class="chip center-margin graphChip">X<sub>${i}</sub></div>`)
        $('.graphChip').on('click', graphChipClick);

    }
    body.append(simplexHtmlGenerator());

    for (let i = 1; i <= variables; i++)
        simplexChips.append(`<div id="c_${i - 1}" class="chip center-margin simplexChip">X<sub>${i}</sub></div>`)
    $('.simplexChip').on('click', simplexChipClick);

    $('#save').on('click', saveEvent);
    fill();
});