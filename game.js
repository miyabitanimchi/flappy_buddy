//get DOM
const gameContainer = document.getElementById("game-container");
const accelerateBtn = document.getElementById("accelerate-btn");
const gameCanvas = document.getElementById("gamecanvas");
const gameCtx = gameCanvas.getContext("2d");

// Default buddy(img you drew), create a new Image() from the image class
let defaultBuddy = new Image();
defaultBuddy.src = defaultImg;

let yourBuddy;

// The buddy you created, create a new Image() from the image class, and delete defaultBuddy
const applyYourBuddy = () => {
    if (isDrawn === true) {  // If user drew something
        yourBuddy = new Image();
        yourBuddy.src = yourBuddyImg;
        defaultBuddy = "";
    } else { // If user didn't draw anything
        defaultBuddy = new Image();
        defaultBuddy.src = defaultImg;
        yourBuddy = "";
    }
}

// Set the initial values to zero (coordinate X Y for buddy and score/bestscore)
let buddyX = buddyDY = score = bestScore = bulletY = 0;

// Set buddy size and coordinate Y for tip of upper pipe
let yourBuddySize = topPipeBottomY = 20;

//pipe width 
let pipeWidth = 30;

// set coordinate Y for buddy and gap of pipe
let buddyY = pipeGap = 200;
let pipeX = canvasSizeX = bulletX = 500;
let canvasSizeY =  400;

// Define the gap between canvas top to bullet Y
let fromBottomToBulletY;

//Get y coordinate for the bottom of the image
let bottomOfImg;

// to see if game is being played
let isPlaying = false;

// Default screen
gameCtx.fillStyle = "lightblue";
gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);
gameCtx.fillStyle = "blue";
gameCtx.font = '25px sans-serif';
gameCtx.fillText("Click here to play", 140, 200);

// set up click event
gameCanvas.addEventListener("click", () => {
    if (isPlaying) {
    buddyDY = -7;
    } else {
        gameStarts();
    }
});

// main loop to begin the game
const gameStarts = () => {
    const renderGame = setInterval(() => {
        // to let you know that game is being played
        if (!isPlaying) {
            isPlaying = true;
         }

        // Set the background color 
        gameCtx.fillStyle = "white";

        // Draw the canvas 
        gameCtx.fillRect(0, 0, canvasSizeX, canvasSizeY);

        // Draw buddy
        if (isDrawn === true) { // User draws something
            gameCtx.drawImage(yourBuddy, buddyX, buddyY, yourBuddySize * 2, yourBuddySize * 2) 
        } else { // User didn't draw anything
            gameCtx.drawImage(defaultBuddy, buddyX, buddyY, yourBuddySize * 2, yourBuddySize * 2);
        }

        // Deal with gravity
        buddyY += buddyDY += 0.4;

        // Prepare pipe
        gameCtx.fillStyle = "blue";
        pipeX -= 8; //Move pipe
        pipeX < -pipeWidth && // Pipe out of screen
        ((pipeX = canvasSizeY), (topPipeBottomY = pipeGap * Math.random())); //Reset pipe and randomize gap

        // Prepare bullet
        bulletX -= 15; //Move bullet
        bulletX < -pipeWidth &&  // Bullet out of screen
        ((bulletX = canvasSizeY), (bulletY = 400 * Math.random())); //Reset bullet and randomize the position

        // get the data of the gap between the top to bullet
        fromBottomToBulletY = canvasSizeY - bulletY;

        //Get y coordinate for the bottom of the image
        bottomOfImg = buddyY + (yourBuddySize * 2);

        // create pipes
        gameCtx.fillRect(pipeX, 0, pipeWidth, topPipeBottomY);
        gameCtx.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSizeX);

         // Random color for bullet
        const colorArray = ["red", "blue", "orange", "lightgreen", "pink", "lightgreen", "purple"];
        let getRandomIndex = Math.floor(Math.random() * colorArray.length);
        gameCtx.fillStyle = `${colorArray[getRandomIndex]}`;
    
        // Create bullet
        gameCtx.fillRect(bulletX, bulletY, pipeWidth, 10);
        // start with other elements like score
        gameCtx.fillStyle = "black";
        gameCtx.font = '15px sans-serif';
        gameCtx.fillText(score++, 10, 25); // Increase and draw score

        bestScore = bestScore < score ? score : bestScore; // New best score

        gameCtx.fillText(`Best score : ${bestScore}`, 10, 45);

        // buddy hit pipe
        if (((buddyY < topPipeBottomY || (buddyY + yourBuddySize) > (topPipeBottomY + pipeGap)) && pipeX < yourBuddySize * 2)) {
            resetGame();
            clearInterval(renderGame);
        }
        // buddy hit bullet
        if (((buddyY <= bulletY) && (bulletY < bottomOfImg)) && (bulletX < yourBuddySize * 2)) {
            resetGame();
            clearInterval(renderGame);
        }

        // buddy falls
        if (buddyY > canvasSizeY) {
            resetGame();
            clearInterval(renderGame);
        }

        if (!isPlaying) {
            gameCtx.font = '20px sans-serif';
            gameCtx.fillText("Game Over... click here to play again!", 70, 170);
        }
    }, 25);    
}

 //function to reset the game
 const resetGame = () => {
    buddyDY = 0;
    buddyY = 200;
    pipeX = canvasSizeY;
    bulletX = canvasSizeY;
    bulletY = 0;
    score = 0;
    isPlaying = false;
 }