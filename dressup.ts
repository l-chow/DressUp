// declare canvas/board related variables
let canvasWidth = 600;
let canvasHeight = 600;
let hatImages: DraggableImage[] = [];
let context: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;
let baseFigure: HTMLImageElement;

let isDragging = false;
let imageIntersect: DraggableImage;

type DraggableImage = {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById("canvas");
  canvas.height = canvasHeight;
  canvas.width = canvasWidth;

  context = canvas.getContext("2d");

  baseFigure = new Image();
  baseFigure.src = "base_figure.png";
  baseFigure.addEventListener("load", () => {
    context?.drawImage(baseFigure, 200, 100);
  });

  // TODO: draw hats
  // TODO: draw outfits
  let hatArray = ["hat_orange.png", "hat_green.png", "hat_propeller.png"];
  for (let i = 0; i < hatArray.length; i++) {
    let image = new Image();

    image.setAttribute("id", "hat" + i);
    // hatImage.addEventListener("load", () => {
    //   context?.drawImage(hatImage, 75, 75 + 100 * i);
    // });

    image.src = hatArray[i];
    let hatImage: DraggableImage = {
      image: image,
      x: 75,
      y: 75 + 100 * i,
      width: image.width,
      height: image.height,
    };

    hatImages.push(hatImage);
    // make hats draggable
    hatImage.image.onmousedown = (e: MouseEvent) => {
      hatImage.x = e.clientX;
      hatImage.y = e.clientY;
      animate();
    };

    hatImage.image.onmouseup = (e: MouseEvent) => {};
  }

  canvas.onmousedown = (e: MouseEvent) => {
    let rect = canvas.getBoundingClientRect();
    for (let i = hatImages.length - 1; i >= 0; i--) {
      if (
        testImageIntersect(
          hatImages[i],
          e.clientX - rect.left,
          e.clientY - rect.top
        )
      ) {
        imageIntersect = hatImages[i];
        break;
      }
    }
    if (imageIntersect) {
      isDragging = true;
    }
  };

  canvas.onmousemove = (e: MouseEvent) => {
    let rect = canvas.getBoundingClientRect();
    if (isDragging) {
      console.log(imageIntersect);
      imageIntersect.x += e.movementX;
      imageIntersect.y += e.movementY;
    }
  };

  canvas.onmouseup = (e: MouseEvent) => {
    isDragging = false;
    imageIntersect = null;
  };

  animate();
};

const animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(baseFigure, 200, 100);

  for (let i = 0; i < hatImages.length; i++) {
    let hatImage = hatImages[i];
    context?.drawImage(hatImage.image, hatImage.x, hatImage.y);
  }
};

// x = mouse x position
// y = mouse y position
const testImageIntersect = (
  elem: DraggableImage,
  x: number,
  y: number
): boolean => {
  // if x is in range of width of image
  // and y is in range of height of image
  if (
    x <= elem.x + elem.width &&
    x >= elem.x &&
    y <= elem.y + elem.height &&
    y >= elem.y
  ) {
    return true;
  }
  return false;
};
