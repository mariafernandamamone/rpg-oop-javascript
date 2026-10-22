import { Creature } from "./entities/Creature.js";
import { Monster, Orc, Goblin, Kobold } from "./entities/Monster.js";
import { Hero } from "./entities/Hero.js";
import { Game } from "./engine/Game.js";
import { Potion } from "./items/potion.js";

// --- 1. Successful Instantiation Tests ---
const hero = new Hero("Arthur", 50, 10);
const orc = new Orc();

console.log("Hero created:", hero);
console.log("Orc created:", orc);

// --- 2. Abstraction Constraint Tests ---
try {
  const creature = new Creature("Generic", 50, 5);
} catch (error) {
  console.log("Caught expected error:", error.message);
}

try {
  const monster = new Monster("Generic Monster", 40, 4);
} catch (error) {
  console.log("Caught expected error:", error.message);
}

// --- 3. Game Engine & Investigation Tests ---
const game = new Game(hero);

// Test first investigation (should spawn a monster)
game.investigate();

// Test second investigation guard clause (should block since monster is alive)
game.investigate();

// --- 4. History Logging Test ---
console.log("Game History Log:", game.history);

// --- 5. Refactored Combat Engine Tests ---
// Attack until monster is defeated
game.attack();
game.attack();
game.attack();
game.attack(); // Blocked by guard clause (monster defeated)

// Verify area investigation after battle
game.investigate();

// --- 6. Hero Defeat & Game Restart Tests ---
// Force hero defeat to test guard clauses
hero.health = 0;

// Verify actions blocked when hero is defeated
game.investigate();
game.attack();

// Reset game state and verify journey resumes
game.restart();
game.investigate();
game.attack();
game.attack();

// --- 7. Potion Item Tests ---
// Instantiate a health potion with 20 heal points
const healthPotion = new Potion("Health Potion", 20);

// Reduce hero health to simulate combat damage
hero.health = 30;
console.log(`Hero health before potion: ${hero.health}/${hero.maxHealth}`);

// Test use() method directly on hero entity
const potionResult = healthPotion.use(hero);
console.log(`Used ${potionResult.itemName}! Restored health: ${potionResult.targetHealth}/${potionResult.targetMaxHealth}`);

// Test maximum health limit constraint (over-healing)
healthPotion.use(hero);
console.log(`Hero health after second potion (capped): ${hero.health}/${hero.maxHealth}`);