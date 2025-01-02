// declare canvas/board related variables
let canvasWidth = 600;
let canvasHeight = 600;

window.onload = () => {
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  let context = canvas.getContext("2d");

  let baseFigure = new Image();
  baseFigure.src = "base_figure.png";
  baseFigure.addEventListener("load", () => {
    context?.drawImage(baseFigure, 200, 100);
  });

  // TODO: draw hats
  // TODO: draw
};
