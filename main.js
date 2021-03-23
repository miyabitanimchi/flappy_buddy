const container = document.getElementById("container");
const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const paintCanvas = document.getElementById("paintcanvas");

const startGame = () => {
    myGameArea.start();
}

const makePixelGrid = () => {
   for (let gridRowLength = 0; gridRowLength <= 32; gridRowLength++) {
        let gridRow = document.createElement("tr");
        paintCanvas.appendChild(gridRow);
        for (let gridColLength = 0; gridColLength <= 32; gridColLength++) {
            let gridCol = document.createElement("td");
            gridRow.appendChild(gridCol);
        }
   }
   paintCanvas.addEventListener("mousedown", () => {
       const gridColor = document.querySelector("#color-picker").value;
       paintCanvas.style.backgroundColor = gridColor;
   });
}

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 600;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        container.insertBefore(this.canvas, accelerateBtn);
    }
}

// document.body.addEventListener("keypress", (event) => {
//     if (event.keyCode == 13) {
//         startGame();
//     } 
//     });

window.addEventListener("load", () => {
    makePixelGrid();
    startGame();
})