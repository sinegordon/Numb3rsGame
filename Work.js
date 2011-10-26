// Функция, вызываемая после каждого хода красной фишки (просчет и перерисовка)
function SolveAndDraw() {
    treePos.BuildTreePositions(7);
    pos = AnalyzeTreePositions(treePos);
    treePos = new Position(canvas, 'red', pos, netLinks, netCoords);
    context.fillStyle = "rgb(127,127,127)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    DrawPosition(treePos);
    if (treePos.StepForChip(0).length == 0) {
        alert("Вы проиграли!");
    }
}
// Изменить режим с "игра" на "установка позиции" и наоборот
ChangeMode = function () {
    var elem = document.getElementById("setPosition");
    if (elem.textContent == "Установить позицию") {
        pos1 = pos.slice();
        pos = [];
        treePos.context.fillStyle = "rgb(187,187,187)";
        treePos.context.fillRect(0, 0, canvas.width, canvas.height);
        treePos = new Position(canvas, "red", pos, netLinks, netCoords);
        DrawPosition(treePos);
        elem.textContent = "Отменить установку позиции";
    }
    else {
        pos = pos1.slice();
        pos1 = [];
        treePos.context.fillStyle = "rgb(127,127,127)";
        treePos.context.fillRect(0, 0, canvas.width, canvas.height);
        treePos = new Position(canvas, "red", pos, netLinks, netCoords);
        DrawPosition(treePos);
        elem.textContent = "Установить позицию";
    };
}
// Функция отрисовки объекта дерева позиций на canvas
DrawPosition = function (treePos) {
    for (var i = 0; i < treePos.netCoords.length; i++) {
        for (var j = 0; j < treePos.netLinks[i].length; j++) {
            treePos.context.beginPath();
            treePos.context.moveTo(treePos.canvas.width * treePos.netCoords[i][0], treePos.canvas.height * treePos.netCoords[i][1]);
            treePos.context.lineTo(treePos.canvas.width * treePos.netCoords[treePos.netLinks[i][j] - 1][0], treePos.canvas.height * treePos.netCoords[treePos.netLinks[i][j] - 1][1]);
            treePos.context.stroke();
        }
    }
    if (treePos.pos.length > 0) {
        treePos.context.fillStyle = "rgb(255,0,0)";
        treePos.context.beginPath();
        treePos.context.arc(treePos.canvas.width * treePos.netCoords[treePos.pos[0] - 1][0], treePos.canvas.height * treePos.netCoords[treePos.pos[0] - 1][1], radius, 0.0, 2 * Math.PI, true);
        treePos.context.fill();
    }
    treePos.context.fillStyle = "rgb(0,0,0)";
    for (var i = 1; i < treePos.pos.length; i++) {
        treePos.context.beginPath();
        treePos.context.arc(treePos.canvas.width * treePos.netCoords[treePos.pos[i] - 1][0], treePos.canvas.height * treePos.netCoords[treePos.pos[i] - 1][1], radius, 0.0, 2 * Math.PI, true);
        treePos.context.fill();
    }
}
// Обработчик клика мыши на canvas
function CanvasClickHandler(event) {
    var elem = document.getElementById("setPosition");
    var x = GetRelativeMouseXCoord("gameCanvas", event);
    var y = GetRelativeMouseYCoord("gameCanvas", event);
    if (elem.textContent == "Отменить установку позиции") {
        for (var i = 0; i < netCoords.length; i++) {
            if (Math.abs(netCoords[i][0] * canvas.width - x) < radius && Math.abs(netCoords[i][1] * canvas.height - y) < radius) {
                if (pos.indexOf(i + 1) == -1) {
                    pos.push(i + 1);
                    treePos = new Position(canvas, "red", pos, netLinks, netCoords);
                    DrawPosition(treePos);
                }               
            }
        }
        if (pos.length == 4) {
            elem.textContent = "Установить позицию";
            treePos.context.fillStyle = "rgb(127,127,127)";
            treePos.context.fillRect(0, 0, canvas.width, canvas.height);
            DrawPosition(treePos);
        }
    }
    else {
        var flag = treePos.ChipMove(0, x, y);
        if (flag == false) {
            alert("Такой ход запрещен!");
        }
        else {
            context.fillStyle = "rgb(245,245,245)";
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.strokeText("Думаю...", canvas.width / 2 - 10, canvas.height / 30);
            DrawPosition(treePos);
            setTimeout("SolveAndDraw();", 100);
        };
    }
}

// Работа
var canvas = document.getElementById("gameCanvas");
canvas.width = 300;
canvas.height = 600;
var context = canvas.getContext('2d');
// Координаты вершин игрового графа в долях ширины и высоты канвы соответственно
var netCoords = [[0.5, 0.1], [0.1, 0.25], [0.5, 0.25], [0.9, 0.25], [0.1, 0.5], [0.5, 0.5], [0.9, 0.5], [0.1, 0.75], [0.5, 0.75], [0.9, 0.75], [0.5, 0.9]];
// Список смежности вершин netCoords
var netLinks = [[2, 3, 4], [1, 3, 5], [1, 2, 4, 6], [1, 3, 7], [2, 6, 8], [3, 5, 7, 9], [4, 6, 10], [5, 9, 11], [6, 8, 10, 11], [7, 9, 11], [8, 9, 10]];
// Начальная позиция (номера занятых вершин - вершины считаются с единицы сверху вниз слева направо)
var pos = [6, 1, 2, 4];
// Вспомогательная позиция (для установки)
var pos1 = [];
// Начальное дерево позиций
// Радиус фишки
var radius = 30.0;
var treePos = new Position(canvas, "red", pos, netLinks, netCoords);
context.fillStyle = "rgb(127,127,127)";
context.fillRect(0, 0, canvas.width, canvas.height);
DrawPosition(treePos);