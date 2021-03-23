const container = document.getElementById("container");
const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");

const startGame = () => {
    myGameArea.start();
}

const myGameArea = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 480;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        container.insertBefore(this.canvas, accelerateBtn);
    }
}

// document.body.addEventListener("keypress", (event) => {
//     if (event.keyCode == 13) {
//         startGame();
//     } 
//     });