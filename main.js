const container = document.getElementById("container");
const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const paintCanvas = document.getElementById("paintcanvas");
const paintContext = paintCanvas.getContext("2d");
const gameCanvas = document.getElementById("gamecanvas");
const gameCtx = gameCanvas.getContext("2d");
let defaultGamePiece;
let isDrawing = false;
let mouseX = 0;
let mouseY = 0;

// const startGame = () => {
//     defaultGamePiece = new component(30, 30, "blue", 80, 80);
//     myGameArea.start();
// }

// const makePixelGrid = () => {
//    for (let gridRowLength = 0; gridRowLength <= 32; gridRowLength++) {
//         let gridRow = document.createElement("tr");
//         paintCanvas.appendChild(gridRow);
//         for (let y = 0; y <= 32; y++) {
//             let gridCol = document.createElement("td");
//             gridRow.appendChild(gridCol);
//         }
//    }
//    paintCanvas.addEventListener("mousedown", () => {
//        const gridColor = document.querySelector("#color-picker").value;
//        paintCanvas.style.backgroundColor = gridColor;
//    });

//    paintCanvas.addEventListener("mousemove", (event) => {
//         console.log(event.offsetX, event.offsetY);
//    })
// }

const drawSquare = (x, y, width) => {
    paintContext.beginPath();
    paintContext.strokeStyle = "gray";
    paintContext.lineWitdh = 1;
    paintContext.moveTo(x, y);
    paintContext.lineTo(x + width, y);
    paintContext.lineTo(x + width, y + width);
    paintContext.lineTo(x, y + width);
    paintContext.lineTo(x, y);
    paintContext.stroke();
    paintContext.closePath();
    // console.log(x, y, width);
}

const makeGrid = (width, height) => {
    let countX = 0;   
    let countY = 0;
    for (let x = 0; x <= width; x = x + 10) {
            for (let y = 0; y <= height; y = y + 10) {
                drawSquare(x, y, 10);
                console.log(`will draw square, x: ${x}, y: ${y}`);     
                countY ++;
            }
            countX ++;
    }

    // const makeGrid = () => {
    //     // paintContext.beginPath();
    //     for (let i = 10; i <= 310; i = i + 11) {
    //         //vertical lines
    //         paintContext.moveTo(i, 10);
    //         paintContext.lineTo(i, 310);

    //         //horizontal lines
    //         paintContext.moveTo(10, i);
    //         paintContext.lineTo(310, i);

    //         paintContext.strokeStyle = "black";
    //         console.log(i);
    //     }
    //     // paintContext.closePath();


    paintCanvas.addEventListener("mousedown", e => {
        console.log("mouse is down");
        isDrawing = true;
    });

    paintCanvas.addEventListener("mousemove", e => {
        if (isDrawing === true) {
            // console.log("you are drawing");
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        //  console.log(event.offsetX, event.offsetY);
    });

    paintCanvas.addEventListener("mouseup", e => {
        // console.log("mouse is up");
        isDrawing = false;
        drawSquare(mouseX, mouseY, 20);
    });
 }

// const myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function () {
//         this.canvas.width = 600;
//         this.canvas.height = 400;
//         this.context = this.canvas.getContext("2d");
//         container.insertBefore(this.canvas, accelerateBtn);
//     }
// } 

// const myGameArea = {
//     stop : function() {
//         clearInterval(this.interval);
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
//     }
// } 

// const component = (width, height, color, x, y, type) => {
//     this.type = type;
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.gravity = 0.05;
//     this.update = function() {
//         let ctx = gameCanvas.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

const showTestCharOnGameCanvas = () => {
    if (gameCanvas.getContext) {

        gameCtx.fillStyle = "#618685"
        // gameCtx.fillRect (20, 185, 30, 30);
        makeGravity(185);
    }
}

const makeGravity = (gravityY) => {
    //  gravityY = gameCtx.fillRect(x, y++, width, height);
    for (let i = gravityY; i < 370; i++) {
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        gameCtx.fillRect(20, i, 30, 30);
    }
}

window.addEventListener("load", () => {
    makeGrid(320, 320);
    // startGame();
    showTestCharOnGameCanvas();
    // makeGravity(185);
})