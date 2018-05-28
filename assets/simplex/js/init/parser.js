function parse(type=null) {  // ф-я возвращает первую симплекс таблицу
    if (type === 'graph')
        return Forward.parse();  // Нужно для graph method
    if (localStorage.getItem('type') === 'artificial'){  // Если выбран метод искуственного базиса
        return Artificial.parse();  // Парсим данные для искусственного базиса
    } else if (localStorage.getItem('type') === 'forward') {  // Если выбран прямой симплекс-метод
        return Forward.parse();  // Парсим  даннные для прямого симплекс метода
    } else {  // Если ошибка
        toast('Произошла ошибка при чтении данных')
    }
}