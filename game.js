const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const gameCanvas = document.getElementById("gamecanvas");
const gameCtx = gameCanvas.getContext("2d");

// Your buddy(img you drew), create a new Image() from the image class
let yourBuddy = new Image();
let yourBuddyImg; //yourbuddy.src

yourBuddy.src = "flappybird.jpeg";
// Set the initial values to zero (coodinate X Y for bird and score/bestscore)
let birdX = birdDY = score = bestScore = 0;

// Set bird size and coodinate Y for tip of upper pipe
let birdSize = topPipeBottomY = 20;

//pipe width 
let pipeWidth = 30;

// set coodinate Y for bird and gap of pipe
let birdY = pipeGap = 200;
let pipeX = canvasSizeX = triangleX = 500;
let canvasSizeY =  400;

// to see if game is being played
let isPlaying = false;

// Default screen
gameCtx.fillStyle = "darkgray";
gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);
gameCtx.fillStyle = "white";
gameCtx.font = '30px sans-serif';
gameCtx.fillText("Click here to play", 120, 150);

// set up click event
gameCanvas.addEventListener("click", () => {
    if (isPlaying) {
    birdDY = 9;
    console.log("canvas clicked");
    } else {
        gameStarts();
    }
});

// main loop to begin the game!
const gameStarts = () => {
    const gameLoop = setInterval(() => {
        // to let you know that game is being played
        if (!isPlaying) {
            isPlaying = true;
            }
        // Set the background color 
        gameCtx.fillStyle = "skyblue"

        // Draw the canvas 
        gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);
        // Deal with gravity
        birdY -= birdDY -= 0.5;

        // Draw bird
        gameCtx.drawImage(yourBuddy, birdX, birdY, birdSize * 2, birdSize * 2);

        // Random color for pipes
        const colorArray = ["red", "blue", "green", "yellow", "pink", "purple", "orange"];
        let getRandomIndex = Math.floor(Math.random() * colorArray.length);

        // Prepare pipe
        gameCtx.fillStyle = `${colorArray[getRandomIndex]}`;
        // gameCtx.fillStyle = "green";
        pipeX -= 8; //Move pipe
        pipeX < -pipeWidth && // Pipe off screen
        ((pipeX = canvasSizeY), (topPipeBottomY = pipeGap * Math.random())); //Reset pipe and randomize gap

        // // Prepare triangle
        // triangleX -= 5;


        // create pipes
        gameCtx.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
        gameCtx.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSizeX);
        gameCtx.beginPath();
        gameCtx.moveTo(75, 50);
        gameCtx.lineTo(100, 75);
        gameCtx.lineTo(100, 25);
        gameCtx.fill();

        // start with other elements like score
        gameCtx.fillStyle = "black";
        gameCtx.font = '15px sans-serif';
        gameCtx.fillText(score++, 10, 25); // Increase and draw score

        bestScore = bestScore < score ? score : bestScore; // New best score

        gameCtx.fillText(`Best score : ${bestScore}`, 10, 45);

        (((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < birdSize * 3) // bird hit pipe
        || birdY > canvasSizeY) && //or bird falls
        ((birdDY = 0), (birdY = 200), (pipeX = canvasSizeY), (score = 0), (isPlaying = false), (clearInterval(gameLoop))); // bird died

        if (!isPlaying) {
            gameCtx.font = '20px sans-serif';
            gameCtx.fillText("Game Over... click here to play again!", 70, 170);
        }
    }, 25);

    
}