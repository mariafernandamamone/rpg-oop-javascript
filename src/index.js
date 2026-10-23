import { Creature } from "./entities/Creature.js";
import { Monster, Orc, Goblin, Kobold } from "./entities/Monster.js";
import { Hero } from "./entities/Hero.js";
import { Game } from "./engine/Game.js";
import { Item } from "./items/Item.js";
import { Potion } from "./items/Potion.js";
import { Weapon } from "./items/Weapon.js";

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

// --- 7. Hero Inventory, Potion & Weapon Integration Tests ---
// Instantiate items
const healthPotion = new Potion("Health Potion", 20);
const ironSword = new Weapon("Iron Sword", 5);

// Add items to hero inventory
game.hero.addItem(healthPotion);
game.hero.addItem(ironSword);

// Simulate combat damage on hero
game.hero.health = 15;
console.log(`Hero state before items - Health: ${game.hero.health}/${game.hero.maxHealth}, Attack: ${game.hero.attackPower}`);

// Use potion via game engine (restores health)
game.useItem(healthPotion);

// Equip weapon via game engine (increases attack power)
game.useItem(ironSword);

// Try using an item that is not in inventory (triggers guard clause log)
const magicWand = new Weapon("Magic Wand", 10);
game.useItem(magicWand);

// Verify final state
console.log(`Remaining items in inventory: ${game.hero.inventory.length}`);
console.log(`Hero state after items - Health: ${game.hero.health}/${game.hero.maxHealth}, Attack: ${game.hero.attackPower}`);