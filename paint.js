//get DOM
const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const paintCanvas = document.getElementById("paintcanvas");
const paintCtx = paintCanvas.getContext("2d");
const paintCanvasWidth = 320;
const paintCanvasHeight = 320;
const gridSize = 10;
let isDrawing = isErasing = eraserActivated = false; 
let mouseX, mouseY;
let x, y; 
let drawnArray = [];
let defaultImg = "flappybird.png"; // if user didn't write anything
let yourBuddyImg;
let isDrawn = false;

// Border for paint canvas
paintCanvas.style.border = "1px solid lightgray";

// function to create squares for canvas grids and pixel art
const makeSquare = (x, y, width, isFilled) => {
    paintCtx.beginPath();
    // if false(= make grid), make line
    if (isFilled === false || isErasing === true) {
        paintCtx.strokeStyle = "rgba(244, 244, 244, 0.5)"; 
        paintCtx.lineWitdh = 0.1;
    }
    // make square shape
    paintCtx.moveTo(x, y);
    paintCtx.lineTo(x + width, y);
    paintCtx.lineTo(x + width, y + width);
    paintCtx.lineTo(x, y + width);
    paintCtx.lineTo(x, y);
    paintCtx.stroke();
    if (isFilled) {
        if (isErasing) {
            // If it's for eraser
            paintCtx.fillStyle = "white";
            paintCtx.fill(); // make white square first to overwhite painting
            // then put line on the white square
            paintCtx.strokeStyle = "rgba(244, 244, 244, 0.5)"; 
            paintCtx.lineWitdh = 0.1;
            paintCtx.moveTo(x, y);
            paintCtx.lineTo(x + width, y);
            paintCtx.lineTo(x + width, y + width);
            paintCtx.lineTo(x, y + width);
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
        } else {
        // when it's to paint
        paintCtx.fillStyle = `${colorPicker.value}`;
        paintCtx.fill();
        }
    }
}

// function to arrange canvas grids
const makeGrid = (width, height) => {
    for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
            makeSquare(x, y, gridSize, false);
        }
    }
 }

 // Draw or erase
const drawSquare = () => {
    paintCanvas.addEventListener("mousedown", e => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if (!eraserActivated) {
            isDrawing = true;
        } else if (eraserActivated) {
            isErasing = true;
        }
        fillGrid();
        makeSquare(x, y, gridSize, true);
        console.log(x, y);
        
    });
    paintCanvas.addEventListener("mousemove", e => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if ((isDrawing === true && isErasing === false) 
        || (isDrawing === false && isErasing === true)) {
            console.log(x, y);
            fillGrid()
            makeSquare(x, y, gridSize, true);
        } else {
            return;
        }    
    });
    paintCanvas.addEventListener("mouseup", e => {
        isDrawing = false;
        isErasing = false;
    });
}

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
    isDrawing = isErasing = eraserActivated = false; 
    document.getElementById("eraser-btn").classList.remove("activate-eraser");
    document.getElementById("pen-btn").classList.add("activate-pen");
})

// eraser
const activateEraser = () => {
    eraserActivated = true;
    isDrawing = false;
    drawSquare();
    document.getElementById("pen-btn").classList.remove("activate-pen");
    document.getElementById("eraser-btn").classList.add("activate-eraser");
}

// Pen (for when load and reactivate)
const activePen = () => {
    eraserActivated = isErasing = false;
    document.getElementById("eraser-btn").classList.remove("activate-eraser");
    document.getElementById("pen-btn").classList.add("activate-pen");
}

// Get buddy data 
const getBuddyData = () => {
    
    yourBuddyImg = paintCanvas.toDataURL();
    console.log(yourBuddyImg);
    isDrawn = true;
    replaceBuddy();
}

window.addEventListener("load", () => {
    makeGrid(paintCanvasWidth, paintCanvasHeight);
    drawSquare();
    activePen();
});