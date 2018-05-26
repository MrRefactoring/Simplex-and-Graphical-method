let graphEnable = false;

$(document).ready(() => {

    let body = $('body');
    let chips = $('.chips');

    let variables = parseInt(localStorage.getItem('variables'));
    let bounds = parseInt(localStorage.getItem('bounds'));

    if (variables - bounds === 2){
        body.append(graphHtmlGenerator());
        graphEnable = true;
    }
    body.append(simplexHtmlGenerator());

    for (let i = 1; i <= variables; i++)
        chips.append(`<div id="c_${i - 1}" class="chip center-margin simplexChip">X<sub>${i}</sub></div>`)
    $('.simplexChip').on('click', simplexChipClick);

    $('#save').on('click', saveEvent);
    fill();
});