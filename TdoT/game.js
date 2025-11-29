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
let level = 1;
let kills = 0;
let killTarget = 30; // enemies to defeat before boss
let bossFight = false;
let boss = null;

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

// Boss class
class Boss {
    constructor(level = 1) {
        this.level = level;
        this.width = 140;
        this.height = 90;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = -120;
        this.targetY = 70;
        this.speed = 1.2;
        this.healthMax = 400 + (level - 1) * 150;
        this.health = this.healthMax;
        this.bullets = [];
        this.shootCooldown = 120;
        this.patternCooldown = 240;
        this.color = '#dd1e42';
        this.horizontalPhase = 0;
    }

    draw() {
        // Boss body (rounded rectangle)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        const r = 18;
        ctx.moveTo(this.x + r, this.y);
        ctx.lineTo(this.x + this.width - r, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + r);
        ctx.lineTo(this.x + this.width, this.y + this.height - r);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - r, this.y + this.height);
        ctx.lineTo(this.x + r, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - r);
        ctx.lineTo(this.x, this.y + r);
        ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Windows / details
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 4; i++) {
            ctx.fillRect(this.x + 20 + i * 25, this.y + 25, 16, 20);
        }
    }

    update() {
        // Move down to target then horizontal oscillation
        if (this.y < this.targetY) {
            this.y += this.speed;
        } else {
            this.horizontalPhase += 0.02;
            this.x = canvas.width / 2 - this.width / 2 + Math.sin(this.horizontalPhase) * 90;
        }

        // Shooting logic
        this.shootCooldown--;
        if (this.shootCooldown <= 0) {
            this.shootTargeted();
            this.shootCooldown = 90 - Math.min(40, (level - 1) * 10);
        }

        this.patternCooldown--;
        if (this.patternCooldown <= 0) {
            this.shootSpread();
            this.patternCooldown = 240 - Math.min(80, (level - 1) * 20);
        }

        // Update bullets
        this.bullets = this.bullets.filter(b => b.y < canvas.height + 40);
        this.bullets.forEach(b => b.update());
    }

    shootTargeted() {
        // Aim at player center
        const px = player.x + player.width / 2;
        const py = player.y + player.height / 2;
        const sx = this.x + this.width / 2;
        const sy = this.y + this.height;
        const dx = px - sx;
        const dy = py - sy;
        const len = Math.sqrt(dx*dx + dy*dy);
        const vx = (dx / len) * 5;
        const vy = (dy / len) * 5;
        // Special bullet object with velocity
        this.bullets.push(new BossBullet(sx - 4, sy, vx, vy, '#ff3b3b'));
    }

    shootSpread() {
        // Radial spread
        const centerX = this.x + this.width / 2;
        const centerY = this.y + this.height;
        const count = 14;
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const vx = Math.cos(angle) * 3.2;
            const vy = Math.sin(angle) * 3.2;
            this.bullets.push(new BossBullet(centerX, centerY, vx, vy, '#ff6b6b'));
        }
    }

    hit() {
        this.health -= 10; // boss takes fixed damage per bullet
        updateBossHealthBar();
        return this.health <= 0;
    }
}

class BossBullet extends Bullet {
    constructor(x, y, vx, vy, color) {
        super(x, y, 0, color, true);
        this.vx = vx;
        this.vy = vy;
        this.width = 8;
        this.height = 8;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.draw();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
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
    kills = 0;
    bossFight = false;
    boss = null;
    killTarget = 30;
    document.getElementById('bossHealthContainer').classList.add('hidden');
    updateBossHealthBar(0, 1);

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
    document.getElementById('level').textContent = `Level: ${level}`;
}

function updateBossHealthBar() {
    if (!boss) return;
    const bar = document.getElementById('bossHealthBar');
    const pct = Math.max(0, boss.health) / boss.healthMax;
    bar.style.width = (pct * 100) + '%';
}

function spawnBoss() {
    bossFight = true;
    boss = new Boss(level);
    document.getElementById('bossHealthContainer').classList.remove('hidden');
    updateBossHealthBar();
}

function bossDefeated() {
    bossFight = false;
    document.getElementById('bossHealthContainer').classList.add('hidden');
    document.getElementById('clearedLevel').textContent = level;
    gameState = 'victory';
    cancelAnimationFrame(animationId);
    document.getElementById('victoryScreen').classList.remove('hidden');
}

function startNextLevel() {
    level++;
    kills = 0;
    killTarget += 10; // higher requirement
    boss = null;
    bossFight = false;
    document.getElementById('victoryScreen').classList.add('hidden');
    gameState = 'playing';
    enemySpawnDelay = Math.max(25, 60 - level * 5); // harder spawn rate
    updateUI();
    gameLoop();
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

    // Spawn enemies only if not in boss fight
    if (!bossFight) {
        enemySpawnTimer--;
        if (enemySpawnTimer <= 0) {
            spawnEnemy();
            enemySpawnTimer = enemySpawnDelay;
            if (enemySpawnDelay > 30) {
                enemySpawnDelay -= 0.1;
            }
        }
    }

    // Update and draw enemies (skip if boss fight ended them spawning but still clear leftovers)
    enemies.forEach((enemy, eIndex) => {
        enemy.update();
        enemy.draw();

        // Check collision with player bullets
        player.bullets.forEach((bullet, bIndex) => {
            if (checkCollision(bullet, enemy)) {
                player.bullets.splice(bIndex, 1);
                if (enemy.hit()) {
                    enemies.splice(eIndex, 1);
                    kills++;
                    score += enemy.type === 'shooter' ? 20 : 10;
                    updateUI();
                    createExplosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.color);
                    if (!bossFight && kills >= killTarget) {
                        // Spawn boss; clear remaining normal enemies for clarity
                        enemies = [];
                        spawnBoss();
                    }
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
    if (!bossFight) {
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
    }

    // Boss logic
    if (bossFight && boss) {
        boss.update();
        boss.draw();
        // Boss bullets collision with player
        boss.bullets.forEach((b, i) => {
            if (checkCollision({x: b.x-6, y: b.y-6, width:12, height:12}, player)) {
                boss.bullets.splice(i,1);
                player.hit();
                updateUI();
                if (lives <= 0) endGame();
            }
        });
        // Player bullets hitting boss
        player.bullets.forEach((bullet, bi) => {
            if (bullet.y < boss.y + boss.height && bullet.y + bullet.height > boss.y && bullet.x > boss.x && bullet.x < boss.x + boss.width) {
                player.bullets.splice(bi,1);
                createExplosion(bullet.x, bullet.y, '#ff3b3b');
                if (boss.hit()) {
                    // Boss defeated
                    createExplosion(boss.x + boss.width/2, boss.y + boss.height/2, '#ff3b3b');
                    bossDefeated();
                }
            }
        });
    }

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

// Victory screen buttons
document.getElementById('nextLevelBtn').addEventListener('click', () => {
    startNextLevel();
});
document.getElementById('victoryToMenuBtn').addEventListener('click', () => {
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
