// Iteration 1: Declare variables required for this game
let timer = 60;
let lives = 5;
let score = 0;
let missedShots = 0;
let gameInterval;
let currentZombie;

// Iteration 1.2: Add shotgun sound
const shotgunSound = new Audio('./assets/shotgun.wav');

// Iteration 1.3: Add background sound
const backgroundSound = new Audio('./assets/bgm.mp3');
backgroundSound.loop = true;

// Iteration 1.4: Add lives
const livesElement = document.getElementById('lives');

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombie = document.createElement('img');
    zombie.src = './assets/zombie-1.png';
    zombie.className = 'zombie-image';
    zombie.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    zombie.style.bottom = '0px'; // Start from bottom of the screen
    zombie.style.position = 'absolute';
    zombie.onclick = function() {
        shotgunSound.play();
        destroyZombie(zombie);
        score++;
        missedShots = 0; // Reset missed shots counter
        createZombie();
    };
    document.body.appendChild(zombie);
    currentZombie = zombie;

    // Animate zombie movement
    animateZombie(zombie);
}

// Animate zombie movement upwards
function animateZombie(zombie) {
    let bottom = 0;
    const interval = setInterval(() => {
        bottom += 5; // Adjust speed as needed
        zombie.style.bottom = `${bottom}px`;
        if (parseInt(zombie.style.bottom) > window.innerHeight) {
            clearInterval(interval);
            checkMissedZombie();
        }
    }, 100);
}

// Iteration 3: Write a function to check if the player missed a zombie
function checkMissedZombie() {
    if (parseInt(currentZombie.style.bottom) > window.innerHeight) {
        destroyZombie(currentZombie);
        missedShots++;
        updateLives();
        if (missedShots >= 5) {
            gameOver();
        } else {
            createZombie();
        }
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    zombie.remove();
}

// Iteration 5: Creating timer
function startTimer() {
    gameInterval = setInterval(() => {
        timer--;
        document.getElementById('timer').innerText = timer;
        if (timer <= 0) {
            clearInterval(gameInterval);
            gameOver();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    backgroundSound.play();
    startTimer();
    createZombie();
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Helper function to update lives display
function updateLives() {
    livesElement.style.width = `${(lives / 5) * 100}%`;
}

// Function to handle game over
function gameOver() {
    backgroundSound.pause();
    alert('Game Over!'); // Show a message or redirect to game over page
    location.href = 'game-over.html';
}

// Start the game when the page loads
window.onload = startGame;
