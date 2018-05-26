function graphHtmlGenerator() {
    return `
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
    `
}

function simplexHtmlGenerator() {
    return `
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
    `
}