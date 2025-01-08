// declare canvas/board related variables
let canvasWidth = 600;
let canvasHeight = 500;
let hatImages: DraggableImage[] = [];
let context: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;
let baseFigure: HTMLImageElement;

let isDragging = false;
let imageIntersect: DraggableImage;
let intersectType: string;
let pointerAreas: CursorArea[];

const HEAD_TYPE = "HEAD";
const BODY_TYPE = "BODY";
const HEAD_DATA = {
  x: 250,
  y: 100,
  width: 100,
  height: 100,
};
const HAT_COLUMN_X = 75;
const HAT_COLUMN_Y = 75;

type DraggableImage = {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
};

type CursorArea = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
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
      y: 75 + image.height * i,
      width: image.width,
      height: image.height,
    };

    hatImages.push(hatImage);

    pointerAreas = designateCursorArea();
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
        intersectType = HEAD_TYPE;
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

    // change cursor to pointer if mouse over draggableimage
    changeCursor(e.clientX - rect.left, e.clientY - rect.top);

    if (isDragging) {
      imageIntersect.x += e.movementX;
      imageIntersect.y += e.movementY;
      pointerAreas = designateCursorArea();
    }
  };

  canvas.onmouseup = (e: MouseEvent) => {
    let rect = canvas.getBoundingClientRect();
    if (isDragging) {
      snapItemToFigure(
        imageIntersect,
        e.clientX - rect.left,
        e.clientY - rect.top,
        intersectType
      );
    }
    isDragging = false;
    imageIntersect = null;
    pointerAreas = designateCursorArea();
    changeCursor(e.clientX - rect.left, e.clientY - rect.top);
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

const snapItemToFigure = (
  elem: DraggableImage,
  x: number,
  y: number,
  itemType: string
) => {
  if (itemType == HEAD_TYPE) {
    // coordinates of head is fixed on canvas
    if (
      x >= HEAD_DATA.x &&
      x <= HEAD_DATA.x + HEAD_DATA.width &&
      y >= HEAD_DATA.y &&
      y <= HEAD_DATA.y + HEAD_DATA.height
    ) {
      elem.x = HEAD_DATA.x;
      elem.y = HEAD_DATA.y;

      // move all other images of same type back to their starting locations
      for (let i = 0; i < hatImages.length; i++) {
        if (elem !== hatImages[i]) {
          hatImages[i].x = HAT_COLUMN_X;
          hatImages[i].y = HAT_COLUMN_Y + elem.height * i;
        }
      }
    } else {
      // if the image isn't close enough to the head we can snap it back to its starting location
      elem.x = HAT_COLUMN_X;
      elem.y = HAT_COLUMN_Y + elem.height * hatImages.indexOf(elem);
    }
  }
};

const designateCursorArea = (): CursorArea[] => {
  let areas: CursorArea[] = [];

  // any clothing should have the cursor change to pointer
  for (let i = 0; i < hatImages.length; i++) {
    let hatImage = hatImages[i];
    let area: CursorArea = {
      startX: hatImage.x,
      startY: hatImage.y,
      endX: hatImage.x + hatImage.width,
      endY: hatImage.y + hatImage.height,
    };
    areas.push(area);
  }

  return areas;
};

const changeCursor = (x: number, y: number) => {
  // check if current cursor location is within pointer area
  // if true set to pointer else set to default (auto)
  let intersect = false;
  for (let i = 0; i < pointerAreas.length; i++) {
    let pointerArea = pointerAreas[i];
    if (
      x >= pointerArea.startX &&
      x <= pointerArea.endX &&
      y >= pointerArea.startY &&
      y <= pointerArea.endY
    ) {
      intersect = true;
      break;
    }
  }
  if (intersect) canvas.style.cursor = "pointer";
  else canvas.style.cursor = "auto";
};
