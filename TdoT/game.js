// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

// Game state
let gameState = 'start'; // start, playing, gameOver
let score = 0;
let lives = 3;
let animationId;
let selectedShip = null;

// Ship configurations
const shipTypes = {
    fighter: {
        speed: 6,
        shootDelay: 20,
        color: '#3700ffff',
        emoji: '🚀'
    },
    heavy: {
        speed: 3,
        shootDelay: 10,
        color: '#ff00ff',
        emoji: '🛸'
    },
    balanced: {
        speed: 4.5,
        shootDelay: 15,
        color: '#00ff00',
        emoji: '✈️'
    }
};

// Player class
class Player {
    constructor(shipType = 'balanced') {
        this.shipType = shipType;
        const config = shipTypes[shipType];
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - 80;
        this.speed = config.speed;
        this.bullets = [];
        this.shootCooldown = 0;
        this.shootDelay = config.shootDelay;
        this.color = config.color;
        this.emoji = config.emoji;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    draw() {
        // Draw spaceship (triangle)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw engine flames
        ctx.fillStyle = '#ff6600';
        ctx.beginPath();
        ctx.moveTo(this.x + 10, this.y + this.height);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width - 10, this.y + this.height);
        ctx.closePath();
        ctx.fill();
    }

    update() {
        // Apply velocity
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Keep player in bounds
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > canvas.height) this.y = canvas.height - this.height;

        // Update shoot cooldown
        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }

        // Update bullets
        this.bullets = this.bullets.filter(bullet => bullet.y > 0);
        this.bullets.forEach(bullet => bullet.update());
    }

    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2 - 2, this.y));
    }

    setVelocity(vx, vy) {
        this.velocityX = vx;
        this.velocityY = vy;
    }

    hit() {
        lives--;
        // Flash effect
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// Bullet class
class Bullet {
    constructor(x, y, speed = -8, color = '#ffff00', isEnemy = false) {
        this.x = x;
        this.y = y;
        this.width = 4;
        this.height = 12;
        this.speed = speed;
        this.color = color;
        this.isEnemy = isEnemy;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }

    update() {
        this.y += this.speed;
        this.draw();
    }
}

// Enemy class
class Enemy {
    constructor(x, y, type = 'basic') {
        this.type = type;
        this.width = 35;
        this.height = 35;
        this.x = x;
        this.y = y;
        this.speed = type === 'shooter' ? 1.5 : 2;
        this.health = type === 'shooter' ? 2 : 1;
        this.bullets = [];
        this.shootCooldown = Math.random() * 100 + 50;
        this.color = type === 'shooter' ? '#ff0066' : '#00ff00';
    }

    draw() {
        // Draw enemy ship (inverted triangle)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    update() {
        this.y += this.speed;

        // Shoot if shooter type
        if (this.type === 'shooter') {
            this.shootCooldown--;
            if (this.shootCooldown <= 0 && this.y > 50 && this.y < canvas.height - 100) {
                this.shoot();
                this.shootCooldown = Math.random() * 100 + 80;
            }
        }

        // Update bullets
        this.bullets = this.bullets.filter(bullet => bullet.y < canvas.height);
        this.bullets.forEach(bullet => bullet.update());
    }

    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2 - 2, this.y + this.height, 5, '#ff0066', true));
    }

    hit() {
        this.health--;
        return this.health <= 0;
    }
}

// Particle effect for explosions
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.size = Math.random() * 3 + 2;
        this.color = color;
        this.life = 30;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.size *= 0.95;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Stars background
class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 2 + 0.5;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Game objects
let player;
let enemies = [];
let particles = [];
let stars = [];
let enemySpawnTimer = 0;
let enemySpawnDelay = 60; // frames

// Initialize game
function init() {
    player = new Player(selectedShip || 'balanced');
    enemies = [];
    particles = [];
    stars = [];
    score = 0;
    lives = 3;
    enemySpawnTimer = 0;

    // Create stars
    for (let i = 0; i < 50; i++) {
        stars.push(new Star());
    }

    updateUI();
}

// Spawn enemies
function spawnEnemy() {
    const x = Math.random() * (canvas.width - 35);
    const type = Math.random() < 0.3 ? 'shooter' : 'basic';
    enemies.push(new Enemy(x, -35, type));
}

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Create explosion
function createExplosion(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle(x, y, color));
    }
}

// Update UI
function updateUI() {
    document.getElementById('score').textContent = `Score: ${score}`;
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('lives').textContent = `Lives: ${heartsDisplay}`;
}

// Game loop
function gameLoop() {
    if (gameState !== 'playing') return;

    // Clear canvas
    ctx.fillStyle = '#000428';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    // Update and draw player
    player.update();
    player.draw();

    // Draw player bullets
    player.bullets.forEach(bullet => bullet.draw());

    // Spawn enemies
    enemySpawnTimer--;
    if (enemySpawnTimer <= 0) {
        spawnEnemy();
        enemySpawnTimer = enemySpawnDelay;
        // Gradually increase difficulty
        if (enemySpawnDelay > 30) {
            enemySpawnDelay -= 0.1;
        }
    }

    // Update and draw enemies
    enemies.forEach((enemy, eIndex) => {
        enemy.update();
        enemy.draw();

        // Check collision with player bullets
        player.bullets.forEach((bullet, bIndex) => {
            if (checkCollision(bullet, enemy)) {
                player.bullets.splice(bIndex, 1);
                if (enemy.hit()) {
                    enemies.splice(eIndex, 1);
                    score += enemy.type === 'shooter' ? 20 : 10;
                    updateUI();
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                }
            }
        });

        // Check collision with player
        if (checkCollision(player, enemy)) {
            enemies.splice(eIndex, 1);
            player.hit();
            updateUI();
            createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#ff0000');
            
            if (lives <= 0) {
                endGame();
            }
        }

        // Check enemy bullets hitting player
        enemy.bullets.forEach((bullet, bIndex) => {
            if (checkCollision(bullet, player)) {
                enemy.bullets.splice(bIndex, 1);
                player.hit();
                updateUI();
                
                if (lives <= 0) {
                    endGame();
                }
            }
        });
    });

    // Handle off-screen enemies: if enemy escapes past bottom, player loses a life
    const remainingEnemies = [];
    enemies.forEach((enemy) => {
        if (enemy.y >= canvas.height) {
            lives--;
            updateUI();
            if (lives <= 0) {
                endGame();
            }
        } else {
            remainingEnemies.push(enemy);
        }
    });
    enemies = remainingEnemies;

    // Update and draw particles
    particles = particles.filter(p => p.life > 0);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    animationId = requestAnimationFrame(gameLoop);
}

// End game
function endGame() {
    gameState = 'gameOver';
    cancelAnimationFrame(animationId);
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').classList.remove('hidden');
}

// Pause game
function pauseGame() {
    gameState = 'paused';
    cancelAnimationFrame(animationId);
    document.getElementById('pauseMenu').classList.remove('hidden');
}

// Resume game
function resumeGame() {
    gameState = 'playing';
    document.getElementById('pauseMenu').classList.add('hidden');
    gameLoop();
}

// Return to main menu
function returnToMenu() {
    gameState = 'start';
    cancelAnimationFrame(animationId);
    document.getElementById('gameOver').classList.add('hidden');
    document.getElementById('pauseMenu').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
    
    // Reset ship selection
    const shipCards = document.querySelectorAll('.ship-card');
    shipCards.forEach(c => c.classList.remove('selected'));
    selectedShip = null;
    document.getElementById('startBtn').disabled = true;
    document.getElementById('startBtn').textContent = 'Wähle ein Raumschiff';
}

// WASD Keyboard controls
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    
    // ESC key for pause menu
    if (e.key === 'Escape') {
        if (gameState === 'playing') {
            pauseGame();
        } else if (gameState === 'paused') {
            resumeGame();
        }
        return;
    }
    
    // Spacebar for shooting
    if (e.key === ' ' && gameState === 'playing') {
        if (player.shootCooldown <= 0) {
            player.shoot();
            player.shootCooldown = player.shootDelay;
        }
        e.preventDefault(); // Prevent page scroll
        return;
    }
    
    if (gameState === 'playing') {
        updatePlayerVelocity();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    
    if (gameState === 'playing') {
        updatePlayerVelocity();
    }
});

function updatePlayerVelocity() {
    let vx = 0;
    let vy = 0;
    
    if (keys['w']) vy -= player.speed;
    if (keys['s']) vy += player.speed;
    if (keys['a']) vx -= player.speed;
    if (keys['d']) vx += player.speed;
    
    // Normalize diagonal movement
    if (vx !== 0 && vy !== 0) {
        const length = Math.sqrt(vx * vx + vy * vy);
        vx = (vx / length) * player.speed;
        vy = (vy / length) * player.speed;
    }
    
    player.setVelocity(vx, vy);
}

// Ship selection
const shipCards = document.querySelectorAll('.ship-card');
const startBtn = document.getElementById('startBtn');

shipCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected class from all cards
        shipCards.forEach(c => c.classList.remove('selected'));
        // Add selected class to clicked card
        card.classList.add('selected');
        // Set selected ship
        selectedShip = card.getAttribute('data-ship');
        // Enable start button
        startBtn.disabled = false;
        startBtn.textContent = 'Spiel Starten';
    });
});

// Start game
startBtn.addEventListener('click', () => {
    if (!selectedShip) return;
    document.getElementById('startScreen').classList.add('hidden');
    gameState = 'playing';
    init();
    gameLoop();
});

// Restart game
document.getElementById('restartBtn').addEventListener('click', () => {
    document.getElementById('gameOver').classList.add('hidden');
    gameState = 'playing';
    init();
    gameLoop();
});

// Back to menu from game over
document.getElementById('backToMenuBtn').addEventListener('click', () => {
    returnToMenu();
});

// Resume from pause
document.getElementById('resumeBtn').addEventListener('click', () => {
    resumeGame();
});

// Exit to menu from pause
document.getElementById('exitToMenuBtn').addEventListener('click', () => {
    returnToMenu();
});

// Initialize on load
init();
