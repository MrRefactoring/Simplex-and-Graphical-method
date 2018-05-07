function saveEvent(){
    let file = new File([
            `${localStorage.getItem('bounds')} ${localStorage.getItem('variables')}\n${localStorage.getItem('function')}\n${localStorage.getItem('maximization')}\n${localStorage.getItem('matrix')}`
        ],
        'task.task',
        {type: "text/plain;charset=utf-8"});
    saveAs(file);
    toast(saveToast)
}