// Функция анализа дерева позиций и выбора хода
function AnalyzeTreePositions(tree) {
    var childPositions = tree.AllTreePositionsSheets();
    var rating = new Array();
    for (var i = 0; i < childPositions.length; i++) {
        rating[i] = 0;
        for (var j = 0; j < childPositions[i].length; j++) {
            rating[i] += childPositions[i][j].StepForPosition().length;
        }
        rating[i] /= childPositions[i].length;
    }
    var min = rating[0];
    for (var i = 0; i < childPositions.length; i++) {
        if (rating[i] < min) {
            min = rating[i];
        }
    }
    var mas = new Array();
    for (var i = 0; i < childPositions.length; i++) {
        if (rating[i] == min) {
           mas.push(tree.childPositions[i].pos);
        }
   }
   var reti = Math.floor(mas.length * Math.random());
   return mas[reti];
}