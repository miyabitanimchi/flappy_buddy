const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const paintCanvas = document.getElementById("paintcanvas");
const paintCtx = paintCanvas.getContext("2d");
let isDrawing = false;
let mouseX = 0;
let mouseY = 0;
let drawnArray = [];




const drawSquare = (x, y, width) => {
    paintCtx.beginPath();
    paintCtx.strokeStyle = "lightgray";
    paintCtx.lineWitdh = 0.1;
    paintCtx.moveTo(x, y);
    paintCtx.lineTo(x + width, y);
    paintCtx.lineTo(x + width, y + width);
    paintCtx.lineTo(x, y + width);
    paintCtx.lineTo(x, y);
    paintCtx.stroke();
    paintCtx.closePath();
    // console.log(x, y, width);
}

const makeGrid = (width, height) => {
    let countX = 0;   
    let countY = 0;
    for (let x = 0; x <= width; x = x + 10) {
        for (let y = 0; y <= height; y = y + 10) {
            drawSquare(x, y, 10);
            // console.log(`will draw square, x: ${x}, y: ${y}`);     
            countY ++;
        }
        countX ++;
    }
    paintCanvas.addEventListener("mousedown", e => {
        console.log("mouse is down");
        isDrawing = true;
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        paintCtx.beginPath();
        // paintCtx.strokeStyle = colorPicker.value;
        // paintCtx.lineWitdh = 5;
        // paintCtx.moveTo(mouseX, mouseY);
        // console.log(mouseX, mouseY);
        // console.log(colorPicker.value);
    });
    paintCanvas.addEventListener("mousemove", e => {
        if (isDrawing === true) {
            console.log("you are drawing");
            // mouseX = e.offsetX;
            // mouseY = e.offsetY;
            // console.log(`xx: ${e.offsetX}, yy: ${e.offsetY}`);
            paintCtx.strokeStyle = colorPicker.value;
            paintCtx.lineWidth = 5;
            paintCtx.lineTo(e.offsetX, e.offsetY);
            paintCtx.stroke();
            // paintCtx.moveTo(mouseX, mouseY);
            console.log(mouseX, mouseY);
            console.log(colorPicker.value);
            console.log(`x: ${event.offsetX}, y: ${event.offsetY}`);
        } else {
            return;
        }    
    });
    paintCanvas.addEventListener("mouseup", e => {
        // console.log("mouse is up");
        isDrawing = false;
        paintCtx.beginPath();
        // drawSquare(mouseX, mouseY, 20);
    });
 }

 // Function to make background transparent
 const showImgWithTransparentBG = (imgSrc) => {
    // Your buddy(img you drew), create a new Image() from the image class
    let yourBuddy = new Image();
    yourBuddy.src = imgSrc;

     const transparentColor = {
         r : 255,
         g : 255,
         b : 255
     };

     // Draw bird
     gameCtx.drawImage(yourBuddy, birdX, birdY, birdSize * 2, birdSize * 2);

     let pixels = gameCtx.getImageData(birdX, birdY, yourBuddy.width, yourBuddy.height);
     for (let i = 0; i < pixels.data.length; i += 4) {
         let r = pixels.data[i];
         let g = pixels.data[i+1];
         let b = pixels.data[i+2];

         if (r == transparentColor.r && g== transparentColor.g && b == transparentColor.b) {
             pixels.data[i+3] = 0;
         }
     }
     gameCanvas.putImsgeData(pixels, 0, 0);
 }

window.addEventListener("load", () => {
    makeGrid(320, 320);
})