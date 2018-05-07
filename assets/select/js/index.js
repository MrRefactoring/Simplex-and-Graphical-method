$(document).ready(() => {

    let body = $('body');

    let variables = parseInt(localStorage.getItem('variables'));
    let bounds = parseInt(localStorage.getItem('bounds'));

    let close = $('#close');
    let next = $('#next');

    // Всплывающее окно
    let elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
    let instance = M.Modal.getInstance(elems[0]);

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

        $('#graph').on('click', () => {
            // todo написать выбор базисных переменных
            window.location.href = graphPage
        });
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

    fill();
    $('#simplex').on('click', () => {window.location.href = simplexPage});

    $('#save').on('click', saveEvent);

});