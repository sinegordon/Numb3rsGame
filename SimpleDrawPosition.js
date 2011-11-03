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