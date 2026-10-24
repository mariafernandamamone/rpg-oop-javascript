import { Creature } from "./entities/Creature.js";
import { Monster, Orc, Goblin, Kobold } from "./entities/Monster.js";
import { Hero } from "./entities/Hero.js";
import { Game } from "./engine/Game.js";
import { Item } from "./items/Item.js";
import { Potion } from "./items/Potion.js";
import { Weapon } from "./items/Weapon.js";

console.log("==================================================");
console.log("          RPG ENGINE - TEST SUITE RUNNER         ");
console.log("==================================================\n");

// --- 1. Successful Instantiation Tests ---
console.log("==================================================");
console.log("1. TESTING CONCRETE ENTITY INSTANTIATION");
console.log("==================================================");
const hero = new Hero("Arthur", 50, 10);
const orc = new Orc();

console.log("Hero instance created successfully:", hero.name);
console.log("Orc instance created successfully:", orc.name);


// --- 2. Abstraction Constraint Tests ---
console.log("\n==================================================");
console.log("2. TESTING ABSTRACT CLASS CONSTRAINTS");
console.log("==================================================");

try {
  console.log("Attempting to instantiate Creature directly...");
  const creature = new Creature("Generic", 50, 5);
} catch (error) {
  console.log("✔ Caught expected error:", error.message);
}

try {
  console.log("Attempting to instantiate Monster directly...");
  const monster = new Monster("Generic Monster", 40, 4);
} catch (error) {
  console.log("✔ Caught expected error:", error.message);
}

try {
  console.log("Attempting to instantiate Item directly...");
  const item = new Item("Generic Item");
} catch (error) {
  console.log("✔ Caught expected error:", error.message);
}


// --- 3. Game Engine & Investigation Tests ---
console.log("\n==================================================");
console.log("3. TESTING GAME ENGINE & INVESTIGATION");
console.log("==================================================");
const game = new Game(hero);

console.log("--- First Investigation (Spawns a Monster) ---");
game.investigate();

console.log("\n--- Second Investigation Guard Clause (Blocked: Monster Alive) ---");
game.investigate();


// --- 4. History Logging Test ---
console.log("\n==================================================");
console.log("4. TESTING HISTORY LOGGING");
console.log("==================================================");
console.log("Current Game History Log:");
console.log(game.history);


// --- 5. Refactored Combat Engine Tests ---
console.log("\n==================================================");
console.log("5. TESTING COMBAT ENGINE & GUARD CLAUSES");
console.log("==================================================");
console.log("--- Attacking until monster is defeated ---");
game.attack();
game.attack();
game.attack();

console.log("\n--- Attack Guard Clause (Blocked: Monster Defeated) ---");
game.attack();

console.log("\n--- Investigating after defeating monster ---");
game.investigate();


// --- 6. Hero Defeat & Game Restart Tests ---
console.log("\n==================================================");
console.log("6. TESTING HERO DEFEAT & RESTART");
console.log("==================================================");
console.log("Simulating hero defeat (Health = 0)...");
hero.health = 0;

console.log("\n--- Actions Blocked During Defeat ---");
game.investigate();
game.attack();

console.log("\n--- Restarting Game & Resuming Journey ---");
game.restart();
game.investigate();
game.attack();
game.attack();


// --- 7. Hero Inventory & Item Tests ---
console.log("\n==================================================");
console.log("7. TESTING INVENTORY CLASS & ITEM USAGE");
console.log("==================================================");

// 1. Instantiate various items
const healthPotion = new Potion("Health Potion", 20);
const manaPotion = new Potion("Mana Potion", 15);
const ironSword = new Weapon("Iron Sword", 5);
const woodenShield = new Weapon("Wooden Shield", 2);

// 2. Add items to hero inventory
console.log("Adding items to hero inventory...");
game.hero.addItem(healthPotion);
game.hero.addItem(manaPotion);
game.hero.addItem(ironSword);
game.hero.addItem(woodenShield);

// 3. Verify list after additions
console.log("\n--- Initial Inventory List ---");
console.log(game.hero.inventory.getItems());

// 4. Test removeItem() method
console.log("\n--- Testing removeItem() ---");
const wasRemoved = game.hero.inventory.removeItem(manaPotion);
console.log(`Mana Potion removed successfully: ${wasRemoved}`);
console.log(game.hero.inventory.getItems());

// 5. Test using items via game controller
console.log("\n--- Testing Item Usage ---");
game.hero.health = 15; // Simulate damage on hero
console.log(`Hero state before items - Health: ${game.hero.health}/${game.hero.maxHealth}, Attack: ${game.hero.attackPower}`);

game.useItem(healthPotion);
game.useItem(ironSword);

// 6. Verify list after usage
console.log("\n--- Inventory List After Usage ---");
console.log(game.hero.inventory.getItems());

// 7. Use remaining item and verify empty state
console.log("\n--- Using Remaining Item ---");
game.useItem(woodenShield);

console.log("\n--- Final Inventory State ---");
console.log(game.hero.inventory.getItems());

console.log("\n==================================================");
console.log("            ALL TESTS COMPLETED SUCCESSFULLY       ");
console.log("==================================================");