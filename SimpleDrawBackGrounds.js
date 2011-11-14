// Функции отрисовки бэкграундов
PlayBackGround = function () {
    if (mode == 1) {
        up = (up + 1) % canvas.height;
        context.drawImage(img1, 0, -up, canvas.width, canvas.height);
        context.drawImage(img1, 0, canvas.height - up, canvas.width, canvas.height);
        setTimeout("PlayBackGround(); DrawPosition(treePos);", 50);
    }
}

SetBackGround = function () {
    if (mode == 3) {
        up = (up + 1) % canvas.height;
        context.drawImage(img3, 0, -up, canvas.width, canvas.height);
        context.drawImage(img3, 0, canvas.height - up, canvas.width, canvas.height);
        setTimeout("SetBackGround(); DrawPosition(treePos);", 50);
    }
}

ThinkBackGround = function () {
    if (mode == 2) {
        up += 1;
        context.drawImage(img2, 0, -up, canvas.width, canvas.height);
        context.drawImage(img2, 0, canvas.height - up, canvas.width, canvas.height);
        setTimeout("ThinkBackGround(); DrawPosition(treePos);", 50);
        context.strokeText("Думаю...", canvas.width / 2 - 10, canvas.height / 30);
    }
}