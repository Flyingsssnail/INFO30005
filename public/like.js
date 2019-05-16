var favd = false;
var favElem = document.getElementById('fav');

favElem.addEventListener('mousedown', function(e) {
    favElem.className = 'fav favPress';
});

favElem.addEventListener('mouseup', function(e) {
    favd = !favd;

    var className = 'fav';
    if(favd) {
        className += ' favd';
    }
    favElem.className = className;
});

document.addEventListener("touchstart", function(){}, true);