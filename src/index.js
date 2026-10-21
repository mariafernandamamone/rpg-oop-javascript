import { Creature } from "./entities/Creature.js";
import { Monster, Orc, Goblin, Kobold } from "./entities/Monster.js";
import { Hero } from "./entities/Hero.js";
import { Game } from "./engine/Game.js";

// --- 1. Successful Instantiation Tests ---
const hero = new Hero("Arthur", 100, 15);
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

// --- 5. Combat Test ---
// Attack until defeated or blocked
game.attack();
game.attack();
game.attack();
game.attack(); // Once defeated, this next attack should hit the guard clause

// Try to investigate again now that the monster is dead
game.investigate();
