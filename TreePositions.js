// Класс для дерева позиций
var Position = function (_canvas, _next, _pos, _netLinks, _netCoords) {
    // Массив координат фишек (первый элемент массива - координата красной фишки)
    this.pos = _pos;
    // Ссылка на канву прорисовки для позиции
    this.canvas = _canvas;
    // Кто ходит следующий в этой позиции (значения - "red" и "black")
    this.next = _next;
    // Массив позиций, возникающих при ходе из данной позиции (вначале пустой)
    this.childPositions = [];
    // Графический контекст
    this.context = _canvas.getContext('2d');
    // Координаты вершин игрового графа в долях ширины и высоты канвы соответственно
    this.netCoords = _netCoords;
    // Список смежности вершин netCoords
    this.netLinks = _netLinks;
    // Радиус просмотра вокруг узла на предмет попадания клика по узлу
    this.radius = 30.0;
    // Метод добавления позиции в массив childPositions
    this.AddChildPosition = function (_child) {
        this.childPositions.push(_child)
    }
    // Метод, передвигающий  фишку c номером n в точку с координатами канвы X, Y (если это возможно т.е. точка достаточно близко от вершины 
    // игрового графа, не занята и доступна)
    this.ChipMove = function (n, x, y) {
        var flag = false;
        for (var i = 0; i < this.netLinks[this.pos[n] - 1].length; i++) {
            if (Math.abs(this.netCoords[this.netLinks[this.pos[n] - 1][i] - 1][0] * this.canvas.width - x) < this.radius &&
                Math.abs(this.netCoords[this.netLinks[this.pos[n] - 1][i] - 1][1] * this.canvas.height - y) < this.radius
            ) {
                flag = true;
                for (var k = 0; k < this.pos.length; k++) {
                    if (this.pos[k] == this.netLinks[this.pos[n] - 1][i]) {
                        flag = false;
                        break;
                    }
                }
                if (flag == true) {
                    this.pos[n] = this.netLinks[this.pos[n] - 1][i];
                    if (this.next == "red") {
                        this.next = "black";
                    }
                    else if (this.next == "black") {
                        this.next = "red";
                    };
                    break;
                }
            }
        }
        return flag;
    }
    // Метод, возвращающий массив позиций, возникающий из данной при ходе фишкой с индексом n в массиве pos
    this.StepForChip = function (n) {
        var ret = [];
        var flag = true;
        for (var i = 0; i < this.netLinks[this.pos[n] - 1].length; i++) {
            flag = true;
            for (var j = 0; j < this.pos.length; j++) {
                if (n == j) continue;
                if (this.pos[j] == this.netLinks[this.pos[n] - 1][i]) {
                    flag = false;
                    break;
                }
            }
            if (flag == true) {
                var mas = [];
                for (var k = 0; k < this.pos.length; k++) {
                    if (n == k) {
                        mas.push(this.netLinks[this.pos[n] - 1][i]);
                    }
                    else {
                        mas.push(this.pos[k]);
                    }
                }
                ret.push(mas);
            }
        }
        return ret;
    }
    // Метод, возвращающий массив объектов деревьев позиций, возникающий после хода из данной позиции
    this.StepForPosition = function () {
        var ret = [];
        if (this.next == "red") {
            var mas = this.StepForChip(0);
            for (var i = 0; i < mas.length; i++) {
                var p = new Position(this.canvas, "black", mas[i], this.netLinks, this.netCoords);
                ret.push(p);
            }
        }
        else if (this.next == "black") {
            for (k = 1; k < this.pos.length; k++) {
                var mas = this.StepForChip(k);
                for (var i = 0; i < mas.length; i++) {
                    var p = new Position(this.canvas, "red", mas[i], this.netLinks, this.netCoords);
                    ret.push(p);
                }
            }
        };
        return ret;
    }
    // Метод, возвращающий дерево объектов позиций, возникающий после n полуходов (т.е. без учета цвета) из данной позиции
    this.BuildTreePositions = function (n) {
        if (n > 0) {
            this.childPositions = [];
            var p = this.StepForPosition();
            for (var i = 0; i < p.length; i++) {
                this.AddChildPosition(p[i]);
                p[i].BuildTreePositions(n - 1);
            }
        }
    }
    // Метод, собирающий все листья дерева позиций по веткам первого хода
    this.AllTreePositionsSheets = function () {
        var ret = [];
        for (var i = 0; i < this.childPositions.length; i++) {
            ret[i] = [];
            if (this.childPositions[i].childPositions.length == 0) {
                ret[i] = ret[i].concat(this.childPositions[i]);
            }
            else {
                var mas = this.childPositions[i].AllTreePositionsSheets();
                for (var k = 0; k < mas.length; k++)
                    ret[i] = ret[i].concat(mas[k]);
            };
        }
        return ret;
    }
}