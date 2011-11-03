// Функция, вызываемая после каждого хода красной фишки (просчет и перерисовка)
function SolveAndDraw() {
    treePos.BuildTreePositions(7);
    pos = AnalyzeTreePositions(treePos);
    treePos = new Position(canvas, 'red', pos, netLinks, netCoords);
    mode = 1;
    PlayBackGround();
    DrawPosition(treePos);
    if (treePos.StepForChip(0).length == 0) {
        alert("Вы проиграли!");
    }
}

PlayBackGround = function () {
    if (mode == 1) {
        up = (up + 1) % canvas.height;
        context.drawImage(img1, 0, -up);
        context.drawImage(img1, 0, canvas.height - up);
        setTimeout("PlayBackGround(); DrawPosition(treePos);", 50);
    }
}

SetBackGround = function () {
    if (mode == 3) {
        up = (up + 1) % canvas.height;
        context.drawImage(img3, 0, -up);
        context.drawImage(img3, 0, canvas.height - up);
        setTimeout("SetBackGround(); DrawPosition(treePos);", 50);
    }
}

ThinkBackGround = function () {
    if (mode == 2) {
        up += 1;
        context.drawImage(img2, 0, -up);
        context.drawImage(img2, 0, canvas.height - up);
        setTimeout("ThinkBackGround(); DrawPosition(treePos);", 50);
        context.strokeText("Думаю...", canvas.width / 2 - 10, canvas.height / 30);
    }
}

// Изменить режим с "игра" на "установка позиции" и наоборот
ChangeMode = function () {
    var elem = document.getElementById("setPosition");
    if (elem.textContent == "Установить позицию") {
        mode = 3;
        pos1 = pos.slice();
        pos = [];
        SetBackGround();
        treePos = new Position(canvas, "red", pos, netLinks, netCoords);
        DrawPosition(treePos);
        elem.textContent = "Отменить установку позиции";
    }
    else {
        mode = 1;
        pos = pos1.slice();
        pos1 = [];
        PlayBackGround();
        treePos = new Position(canvas, "red", pos, netLinks, netCoords);
        DrawPosition(treePos);
        elem.textContent = "Установить позицию";
    };
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
            mode = 1;
            PlayBackGround();
            DrawPosition(treePos);
        }
    }
    else {
        var flag = treePos.ChipMove(0, x, y);
        if (flag == false) {
            alert("Такой ход запрещен!\nХодить красной фишкой можно только на соседние\nнезанятые узлы сетки.");
        }
        else {
            mode = 2;
            ThinkBackGround();
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
var img1 = new Image();
img1.onload = function () { PlayBackGround(); DrawPosition(treePos); alert("Ходя красной фишкой не дайте себя зажать!"); };
img1.src = "Back1.png";
var img2 = new Image();
img2.src = "Back2.png";
var img3 = new Image();
img3.src = "Back3.png";
var up = 0;
var mode = 1;
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
PlayBackGround();
DrawPosition(treePos);