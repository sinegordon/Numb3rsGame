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
    var x0 = treePos.canvas.width / 10;
    var y0 = 9 * treePos.canvas.height / 10;
    if (treePos.pos.length > 0) {
        var x = treePos.canvas.width * treePos.netCoords[treePos.pos[0] - 1][0];
        var y = treePos.canvas.height * treePos.netCoords[treePos.pos[0] - 1][1];
        var dx = 0.3 * radius * (x - x0) / treePos.canvas.width;
        var dy = 0.3 * radius * (y - y0) / treePos.canvas.height;
        treePos.context.beginPath();
        treePos.context.arc(x, y, radius, 0.0, 2 * Math.PI, true);
        treePos.context.closePath();
        var g = treePos.context.createRadialGradient(x - dx, y - dy, 0, x, y, radius);
        g.addColorStop(0, "#FFB7B7");
        g.addColorStop(1, "#FF0A12");
        treePos.context.fillStyle = g;
        treePos.context.fill();
    }
    for (var i = 1; i < treePos.pos.length; i++) {
        var x = treePos.canvas.width * treePos.netCoords[treePos.pos[i] - 1][0];
        var y = treePos.canvas.height * treePos.netCoords[treePos.pos[i] - 1][1];
        var dx = 0.3 * radius * (x - x0) / treePos.canvas.width;
        var dy = 0.3 * radius * (y - y0) / treePos.canvas.height;
        treePos.context.beginPath();
        treePos.context.arc(x, y, radius, 0.0, 2 * Math.PI, true);
        treePos.context.closePath();
        var g = treePos.context.createRadialGradient(x - dx, y - dy, 0, x, y, radius);
        g.addColorStop(0, "#C0C0C0");
        g.addColorStop(1, "#000000");
        treePos.context.fillStyle = g;
        treePos.context.fill();
    }
}