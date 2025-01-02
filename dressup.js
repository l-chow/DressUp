// declare canvas/board related variables
var canvasWidth = 600;
var canvasHeight = 600;
window.onload = function () {
    var canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    var context = canvas.getContext("2d");
    var baseFigure = new Image();
    baseFigure.src = "base_figure.png";
    baseFigure.addEventListener("load", function () {
        context === null || context === void 0 ? void 0 : context.drawImage(baseFigure, 200, 100);
    });
};
