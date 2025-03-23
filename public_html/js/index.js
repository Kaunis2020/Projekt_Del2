/* 
 * Larissa
 * Visar bilder
 */
var speed = 150;
var slider = new Array();
var start = 819;
var stop = 939;
var a = 0;

for (i = 0; i < 121; i++)
{
    if (start < stop)
    {
        slider[i] = 'bonzi/0' + String(++start) + '.bmp';
    }
}

var b = slider.length;
var loadedimg = new Array();

for (i = 0; i < b; i++) {
    loadedimg[i] = new Image(200, 160);
    loadedimg[i].src = slider[i];
}

function startSlider() {
    document.images.slidshow.src = loadedimg[a].src;
    a = a + 1;
    if (a > (b - 1))
        a = 0;
}
setInterval(startSlider, speed);