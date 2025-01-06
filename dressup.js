// declare canvas/board related variables
var canvasWidth = 600;
var canvasHeight = 600;
var hatImages = [];
var context;
var canvas;
var baseFigure;
var isDragging = false;
var imageIntersect;
window.onload = function () {
    canvas = document.getElementById("canvas");
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    context = canvas.getContext("2d");
    baseFigure = new Image();
    baseFigure.src = "base_figure.png";
    baseFigure.addEventListener("load", function () {
        context === null || context === void 0 ? void 0 : context.drawImage(baseFigure, 200, 100);
    });
    // TODO: draw hats
    // TODO: draw outfits
    var hatArray = ["hat_orange.png", "hat_green.png", "hat_propeller.png"];
    var _loop_1 = function (i) {
        var image = new Image();
        image.setAttribute("id", "hat" + i);
        // hatImage.addEventListener("load", () => {
        //   context?.drawImage(hatImage, 75, 75 + 100 * i);
        // });
        image.src = hatArray[i];
        var hatImage = {
            image: image,
            x: 75,
            y: 75 + 100 * i,
            width: image.width,
            height: image.height,
        };
        hatImages.push(hatImage);
        // make hats draggable
        hatImage.image.onmousedown = function (e) {
            hatImage.x = e.clientX;
            hatImage.y = e.clientY;
            animate();
        };
        hatImage.image.onmouseup = function (e) { };
    };
    for (var i = 0; i < hatArray.length; i++) {
        _loop_1(i);
    }
    canvas.onmousedown = function (e) {
        console.log("in canvas mousedown");
        var rect = canvas.getBoundingClientRect();
        for (var i = hatImages.length - 1; i >= 0; i--) {
            if (testImageIntersect(hatImages[i], e.clientX - rect.left, e.clientY - rect.top)) {
                imageIntersect = hatImages[i];
                break;
            }
        }
        if (imageIntersect) {
            isDragging = true;
        }
    };
    canvas.onmousemove = function (e) {
        var rect = canvas.getBoundingClientRect();
        if (isDragging) {
            console.log(imageIntersect);
            imageIntersect.x += e.movementX;
            imageIntersect.y += e.movementY;
        }
    };
    canvas.onmouseup = function (e) {
        isDragging = false;
        imageIntersect = null;
    };
    animate();
};
var animate = function () {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(baseFigure, 200, 100);
    for (var i = 0; i < hatImages.length; i++) {
        var hatImage = hatImages[i];
        context === null || context === void 0 ? void 0 : context.drawImage(hatImage.image, hatImage.x, hatImage.y);
    }
};
// x = mouse x position
// y = mouse y position
var testImageIntersect = function (elem, x, y) {
    // if x is in range of width of image
    // and y is in range of height of image
    if (x <= elem.x + elem.width &&
        x >= elem.x &&
        y <= elem.y + elem.height &&
        y >= elem.y) {
        return true;
    }
    return false;
};
