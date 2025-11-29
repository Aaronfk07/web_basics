// Game State
const gameState = {
    selectedCharacter: null,
    selectedLevel: null,
    characters: [],
    levels: [],
    isPlaying: false,
    canvas: null,
    ctx: null,
    player: null,
    currentLevelData: null,
    animationId: null,
    keys: {}
};

// Load characters and levels
async function loadGameData() {
    try {
        const [charactersResponse, levelsResponse] = await Promise.all([
            fetch('./characters/characters.json'),
            fetch('./levels/levels.json')
        ]);
        
        gameState.characters = await charactersResponse.json();
        gameState.levels = await levelsResponse.json();
        
        renderCharacters();
        renderLevels();
    } catch (error) {
        console.error('Error loading game data:', error);
        alert('Fehler beim Laden der Spieldaten!');
    }
}

// Render character selection
function renderCharacters() {
    const container = document.getElementById('character-selection');
    container.innerHTML = '';
    
    gameState.characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <div class="character-icon">${character.icon}</div>
            <div class="character-name">${character.name}</div>
            <div class="character-stats">
                Speed: ${character.speed} | Jump: ${character.jumpPower}
            </div>
        `;
        
        card.addEventListener('click', () => selectCharacter(character, card));
        container.appendChild(card);
    });
}

// Render level selection
function renderLevels() {
    const container = document.getElementById('level-selection');
    container.innerHTML = '';
    
    gameState.levels.forEach(level => {
        const card = document.createElement('div');
        card.className = 'level-card';
        card.innerHTML = `
            <div class="level-number">${level.id}</div>
            <div class="level-name">${level.name}</div>
            <div class="level-difficulty">${level.difficulty}</div>
        `;
        
        card.addEventListener('click', () => selectLevel(level, card));
        container.appendChild(card);
    });
}

// Select character
function selectCharacter(character, card) {
    document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    gameState.selectedCharacter = character;
    updateStartButton();
}

// Select level
function selectLevel(level, card) {
    document.querySelectorAll('.level-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    gameState.selectedLevel = level;
    updateStartButton();
}

// Update start button state
function updateStartButton() {
    const startBtn = document.getElementById('start-game');
    startBtn.disabled = !(gameState.selectedCharacter && gameState.selectedLevel);
}

// Start game
function startGame() {
    if (!gameState.selectedCharacter || !gameState.selectedLevel) return;
    
    document.getElementById('menu-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');
    document.getElementById('current-level').textContent = gameState.selectedLevel.id;
    document.getElementById('current-character').textContent = gameState.selectedCharacter.name;
    
    initGame();
}

// Initialize game
function initGame() {
    gameState.canvas = document.getElementById('game-canvas');
    gameState.ctx = gameState.canvas.getContext('2d');
    
    // Set canvas size
    gameState.canvas.width = 800;
    gameState.canvas.height = 600;
    
    // Initialize player
    gameState.player = {
        x: 50,
        y: 450,
        width: 40,
        height: 40,
        velocityX: 0,
        velocityY: 0,
        isJumping: false,
        onGround: false,
        character: gameState.selectedCharacter
    };
    
    gameState.currentLevelData = gameState.selectedLevel;
    gameState.isPlaying = true;
    
    // Start game loop
    gameLoop();
}

// Game loop
function gameLoop() {
    if (!gameState.isPlaying) return;
    
    update();
    render();
    
    gameState.animationId = requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    const player = gameState.player;
    const gravity = 0.8;
    const friction = 0.85;
    
    // Apply gravity
    player.velocityY += gravity;
    
    // Handle horizontal movement
    if (gameState.keys['ArrowLeft'] || gameState.keys['a']) {
        player.velocityX = -player.character.speed;
    } else if (gameState.keys['ArrowRight'] || gameState.keys['d']) {
        player.velocityX = player.character.speed;
    } else {
        player.velocityX *= friction;
    }
    
    // Handle jumping
    if ((gameState.keys['ArrowUp'] || gameState.keys['w'] || gameState.keys[' ']) && player.onGround) {
        player.velocityY = -player.character.jumpPower;
        player.isJumping = true;
        player.onGround = false;
    }
    
    // Update position
    player.x += player.velocityX;
    player.y += player.velocityY;
    
    // Reset on ground status
    player.onGround = false;
    
    // Platform collision detection
    gameState.currentLevelData.platforms.forEach(platform => {
        if (checkCollision(player, platform)) {
            // Landing on platform from above
            if (player.velocityY > 0 && player.y + player.height - player.velocityY <= platform.y) {
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.onGround = true;
                player.isJumping = false;
            }
            // Hit platform from below
            else if (player.velocityY < 0 && player.y - player.velocityY >= platform.y + platform.height) {
                player.y = platform.y + platform.height;
                player.velocityY = 0;
            }
            // Side collision
            else {
                if (player.velocityX > 0) {
                    player.x = platform.x - player.width;
                } else if (player.velocityX < 0) {
                    player.x = platform.x + platform.width;
                }
                player.velocityX = 0;
            }
        }
    });
    
    // Check obstacle collision
    gameState.currentLevelData.obstacles.forEach(obstacle => {
        if (checkCollision(player, obstacle)) {
            gameOver(false);
        }
    });
    
    // Check goal collision
    if (checkCollision(player, gameState.currentLevelData.goal)) {
        gameOver(true);
    }
    
    // Keep player in bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > gameState.canvas.width) {
        player.x = gameState.canvas.width - player.width;
    }
    
    // Fall off screen = game over
    if (player.y > gameState.canvas.height) {
        gameOver(false);
    }
}

// Render game
function render() {
    const ctx = gameState.ctx;
    const canvas = gameState.canvas;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw sky
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#E0F6FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw platforms
    ctx.fillStyle = '#8B4513';
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    gameState.currentLevelData.platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
        ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
        
        // Add grass on top
        ctx.fillStyle = '#228B22';
        ctx.fillRect(platform.x, platform.y - 5, platform.width, 5);
        ctx.fillStyle = '#8B4513';
    });
    
    // Draw obstacles
    gameState.currentLevelData.obstacles.forEach(obstacle => {
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        // Draw triangle spike
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();
    });
    
    // Draw goal
    const goal = gameState.currentLevelData.goal;
    ctx.fillStyle = '#FFD700';
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 3;
    ctx.fillRect(goal.x, goal.y, goal.width, goal.height);
    ctx.strokeRect(goal.x, goal.y, goal.width, goal.height);
    
    // Draw star in goal
    ctx.fillStyle = '#FFA500';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', goal.x + goal.width / 2, goal.y + goal.height / 2);
    
    // Draw player
    const player = gameState.player;
    ctx.fillStyle = player.character.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw character icon on player
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(player.character.icon, player.x + player.width / 2, player.y + player.height / 2);
}

// Check collision
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Game over
function gameOver(won) {
    gameState.isPlaying = false;
    cancelAnimationFrame(gameState.animationId);
    
    const gameOverDiv = document.getElementById('game-over');
    const message = document.getElementById('game-over-message');
    
    if (won) {
        message.textContent = '🎉 Herzlichen Glückwunsch! Level geschafft! 🎉';
    } else {
        message.textContent = '💥 Game Over! Versuch es nochmal! 💥';
    }
    
    gameOverDiv.classList.remove('hidden');
}

// Restart game
function restartGame() {
    document.getElementById('game-over').classList.add('hidden');
    initGame();
}

// Back to menu
function backToMenu() {
    gameState.isPlaying = false;
    if (gameState.animationId) {
        cancelAnimationFrame(gameState.animationId);
    }
    
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('menu-screen').classList.add('active');
    document.getElementById('game-over').classList.add('hidden');
}

// Keyboard event listeners
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key] = true;
    
    // Prevent default for arrow keys and space
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', (e) => {
    gameState.keys[e.key] = false;
});

// Button event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('back-to-menu').addEventListener('click', backToMenu);
document.getElementById('restart-btn').addEventListener('click', restartGame);
document.getElementById('menu-btn').addEventListener('click', backToMenu);

// Initialize
loadGameData();
