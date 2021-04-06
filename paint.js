const container = document.getElementById("container");
const colorPicker = document.getElementById("color-picker");
const paintCanvas = document.getElementById("paintcanvas");
const paintCtx = paintCanvas.getContext("2d");
const paintCanvasWidth = 320;
const paintCanvasHeight = 320;
const gridSize = 10;
let isDrawing = isErasing = eraserActivated = isDrawn = false; 
let mouseX, mouseY, x, y;
let defaultImg = "flappybird.png"; // if user didn't draw anything, use this image
let yourBuddyImg; // Variable to assign the drawing user draws

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
        // else... when it's for painting
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

 // Draw or erase with squares
const drawSquare = () => {
    paintCanvas.addEventListener("mousedown", e => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if (!eraserActivated) { //When eraser button is not pressed
            isDrawing = isDrawn = true; // true to get ready to draw
        } else if (eraserActivated) { // When eraser button is pressed, eraserActivated gets true
            isErasing = true; // true to get ready to erase
        }
        getCoordinateOfEachGrid();
        makeSquare(x, y, gridSize, true); 
    });
    paintCanvas.addEventListener("mousemove", e => {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
        if ((isDrawing === true && isErasing === false) // For when drawing
        || (isDrawing === false && isErasing === true)) { // For when erasing
            getCoordinateOfEachGrid()
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

// Find each top-left coordinate of each square 
const getCoordinateOfEachGrid = () => {
    let col = Math.floor(mouseX / gridSize);
    let row = Math.floor(mouseY / gridSize);

    // get top-left coordinate
    x = col * gridSize; 
    y = row * gridSize;
}

// delete painting
document.getElementById("trash-btn").addEventListener("click", () => {
    paintCtx.fillStyle = "white";
    paintCtx.fillRect(0, 0, paintCanvasWidth, paintCanvasHeight);
    makeGrid(paintCanvasWidth, paintCanvasHeight);
    isDrawing = isErasing = eraserActivated = isDrawn = false; 
    document.getElementById("eraser-btn").classList.remove("activate-eraser");
    document.getElementById("pen-btn").classList.add("activate-pen");
    applyYourBuddy(); // This is for situation if user did not draw anything after deletion
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
    applyYourBuddy();
}

window.addEventListener("load", () => {
    makeGrid(paintCanvasWidth, paintCanvasHeight);
    drawSquare();
    activePen(); // Activate pen as a defalut
});