// Набор функций для получения координат мыши
function GetAbsoluteMouseXCoord(event) {
    return event.x;
}
function GetAbsoluteMouseYCoord(event) {
    return event.y;
}
function GetRelativeMouseXCoord(id, event) {
    var elem = document.getElementById(id);
    var br = elem.getBoundingClientRect();
    return event.clientX - br.left;
}
function GetRelativeMouseYCoord(id, event) {
    var elem = document.getElementById(id);
    var br = elem.getBoundingClientRect();
    return event.clientY - br.top;
}