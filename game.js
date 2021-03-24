const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const gameCanvas = document.getElementById("gamecanvas");
const gameCtx = gameCanvas.getContext("2d");
let defaultGamePiece;

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
        gameCtx.fillRect (20, 185, 30, 30);
        // makeGravity(185);
    }
}

// const makeGravity = (gravityY) => {
//     //  gravityY = gameCtx.fillRect(x, y++, width, height);
//     for (let i = gravityY; i < 370; i++) {
//         gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
//         gameCtx.fillRect(20, i, 30, 30);
//     }
// }