class Line{

    constructor(x, y, result){
        this.x = x;
        this.y = y;
        this.result = result;
    }

    getY(x){
        if (this.y.n === 0){  // Если это вертикальная прямая
            return null;
        } else if (this.x.n === 0){  // Если это горизонтальная прямая
            let y = this.result.div(this.y);
            return y.n / y.d * y.s;
        }

        let r = (this.result.sub(this.x.mul(x))).div(this.y);
        return (r.n / r.d) * r.s
    }

    area(){  // Возвращает top, если закрасить надо сверху ф-и, bottom иначе
        if (this.result.n === 0){  // Если прямая проходит через точку 0, 0
            let r = this.y.add(this.x).sub(this.result);
            if (r.s > 0){
                return 'top'
            } else {
                return 'bottom'
            }
        } else {
            if (this.result.s * this.y.s > 0){
                return 'bottom'
            } else {
                return 'top'
            }
        }
    }

    getName(){  // Метод возвращает формулу
        if (this.y.n === 0){
            return `x = ${this.result.toString()} / ${this.x.toString()}`
        } else if (this.x.n === 0){
            return `y = ${this.result.toString()} / ${this.y.toString()}`
        }

        if (this.x.s > 0){
            if (this.y.n / this.y.d !== 1){
                return `y = (${this.result.toString()} - ${this.x.toString()}x) / ${this.y.toString()}`
            } else {
                return `y = ${this.result.toString()} - ${this.x.toString()}x`
            }
        } else {
            if (this.y.n / this.y.d !== 1){
                return `y = (${this.result.toString()} + ${(-this.x).toString()}x) / ${this.y.toString()}`
            } else {
                return `y = ${this.result.toString()} + ${(-this.x).toString()}x`
            }
        }
    }

}