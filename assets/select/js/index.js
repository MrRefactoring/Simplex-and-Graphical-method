let graphEnable = false;

$(document).ready(() => {

    let body = $('body');
    let chips = $('.chips');

    let variables = parseInt(localStorage.getItem('variables'));
    let bounds = parseInt(localStorage.getItem('bounds'));

    if (variables - bounds === 2){  // Если задачу удастся преобразовать к графической
        body.append(`
        <div class="row">
            <div class="col s12 m12">
                <div class="card">
                    <div class="card-image">
                        <img src="../../content/graph.png">
                        <span class="card-title black-text">${graphTitle}</span>
                        <a id="graph" class="btn-floating btn-large halfway-fab waves-effect waves-light color"><i class="material-icons">touch_app</i></a>
                    </div>
                    <div class="card-content">
                        <p>${graphDescription}</p>
                    </div>
                </div>
            </div>
        </div>
        `);
        graphEnable = true;
    }

    body.append(`
    <div class="row">
        <div class="col s12 m12">
            <div class="card">
                <div class="card-image">
                    <img src="../../content/simplex.png">
                    <span class="card-title black-text">${simplexTitle}</span>
                    <a id="simplex" class="btn-floating btn-large halfway-fab waves-effect waves-light color"><i class="material-icons">touch_app</i></a>
                </div>
                <div class="card-content">
                    <p>${simplexDescription}</p>
                </div>
            </div>
        </div>
    </div>
    `);

    for (let i = 1; i <= parseInt(localStorage.getItem('variables')); i++){
        chips.append(`<div id="c_${i - 1}" class="chip center-margin">X<sub>${i}</sub></div>`);
    }

    $('.chip').on('click', simplexСhipClick);

    fill();
    $('#save').on('click', saveEvent);

});