//get DOM
const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const paintCanvas = document.getElementById("paintcanvas");
const paintCtx = paintCanvas.getContext("2d");
const paintCanvasWidth = 320;
const paintCanvasHeight = 320;
const gridSize = 10;
let isDrawing = isErasing = false; 
let mouseX, mouseY;
let x, y; 
let drawnArray = [];
let buddyImg = "flappybird.png"; // if user didn't write anything

// function to create squares for canvas grids and pixel art
const drawSquare = (x, y, width, isFilled) => {
    paintCtx.beginPath();
    // if false(= make grid), make line
    if (isFilled === false) {
        paintCtx.strokeStyle = "lightgray"; 
        paintCtx.lineWitdh = 0.1;
    }
    paintCtx.moveTo(x, y);
    paintCtx.lineTo(x + width, y);
    paintCtx.lineTo(x + width, y + width);
    paintCtx.lineTo(x, y + width);
    paintCtx.lineTo(x, y);
    paintCtx.stroke();
    if (isFilled) {
        paintCtx.fillStyle = `${colorPicker.value}`;
        paintCtx.fill();
    } 
    paintCtx.closePath();
}

// function to arrange canvas grids
const makeGrid = (width, height) => {
    for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
            drawSquare(x, y, gridSize, false);
        }
    }
 }


paintCanvas.addEventListener("mousedown", e => {
    isDrawing = true;
    mouseX = e.offsetX;
    mouseY = e.offsetY;
    fillGrid();
    drawSquare(x, y, gridSize, true);
    console.log(x, y);
    
});
paintCanvas.addEventListener("mousemove", e => {
    if (isDrawing === true) {
        // console.log("you are drawing");
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        console.log(x, y);
        fillGrid()
        drawSquare(x, y, gridSize, true);
    } else {
        return;
    }    
});
paintCanvas.addEventListener("mouseup", e => {
    isDrawing = false;
});

const fillGrid = () => {
    let col = Math.floor(mouseX / gridSize);
    let row = Math.floor(mouseY / gridSize);
    // modified to detect (x, y) for each grid
    x = col * gridSize; 
    y = row * gridSize;
}

// delete painting
document.getElementById("trash-btn").addEventListener("click", () => {
    paintCtx.fillStyle = "white";
    paintCtx.fillRect(0, 0, paintCanvasWidth, paintCanvasHeight);
    makeGrid(paintCanvasWidth, paintCanvasHeight);
})

// eraser
const activateEraser = () => {
    isErasing = true;
    document.getElementById("eraser-btn").classList.add("activate-eraser");
}

// Get buddy data 
const getBuddyData = () => {
    dataURI = paintCanvas.toDataURL();

    console.log(dataURI);
}
//  const showImgWithTransparentBG = (imgSrc) => { 

//     let yourBuddy = new Image();
//     yourBuddy.src = imgSrc;

//     const transparentColor = {
//         r : 255,
//         g : 255,
//         b : 255
//     };

//     // create a source canvas. This is our pixel source
//     const srcCanvas = document.createElement("canvas");
//     srcCanvas.width = yourBuddy.width;
//     srcCanvas.height = yourBuddy.height;

//      // create a destination canvas. Here the altered image will be placed
//      const dstCanvas = document.createElement("canvas");
//      dstCanvas.width = yourBuddy.width;
//      dstCanvas.height = yourBuddy.height;

//      // append the canvas elements to the container
//      document.getElementById("paintcanvas-container2").appendChild(srcCanvas);
//     document.getElementById("paintcanvas-container2").appendChild(dstCanvas);

//      // get context to work with
//      const srcCtx = dstCanvas.getContext("2d");
//      const dstCtx = dstCanvas.getContext("2d");

//      // Draw bird
//      gameCtx.drawImage(yourBuddy, 0, 0);

//      let pixels = srcCtx.getImageData(0, 0, yourBuddy.width, yourBuddy.height);
//      for (let i = 0; i < pixels.data.length; i += 4) {
//          let r = pixels.data[i];
//          let g = pixels.data[i+1];
//          let b = pixels.data[i+2];

//          if (r == transparentColor.r && g== transparentColor.g && b == transparentColor.b) {
//              pixels.data[i+3] = 0;
//          }
//      }
//      gameCtx.putImageData(pixels, 0, 0);
//  }


window.addEventListener("load", () => {
    makeGrid(paintCanvasWidth, paintCanvasHeight);
})