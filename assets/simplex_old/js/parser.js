function parse() {
    if (localStorage.getItem('type') === 'artificial'){  // Если это метод исскуственного базиса
        return new Artificial().parse();  // Парсим входящие данные
    } else if (localStorage.getItem('type') === 'forward') {  // Если это прямой симплекс метод
        return new Forward().parse();  // Парсим входящие данные
    } else {
        console.log('Лол ну ты и лошара')
    }
}