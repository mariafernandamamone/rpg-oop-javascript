import { Orc, Goblin, Kobold } from "../entities/Monster.js";
import { Combat } from "./Combat.js";
import { Potion } from "../items/Potion.js";
import { Weapon } from "../items/Weapon.js";
import { Area } from "../world/Area.js";

/**
 * Class representing the main game engine and state manager.
 */
export class Game {
  constructor(hero) {
    this.hero = hero;
    this.currentArea = new Area();
    this.history = [];
  }

  /**
   * Logs a message to the console and pushes it to the game history.
   * @param {string} message - The game event message to record.
   */
  log(message) {
    this.history.push(message);
    console.log(message);
  }

  /**
   * Investigates the current area to discover monsters, items, or empty spaces.
   * Prevents exploration if the hero is defeated or if an active monster is alive.
   */
  investigate() {
    // Guard clause: Prevent investigation if hero is defeated
    if (this.hero.health <= 0) {
      this.log("You cannot investigate because your hero has been defeated!");
      return;
    }

    // Guard clause: Prevent investigation if a monster is still alive
    if (this.monster && this.monster.health > 0) {
      this.log("Cannot investigate while a monster is alive!");
      return;
    }

    // Delegate investigation to the current area
    const result = this.currentArea.investigate();

    // Handle area outcome based on discovery type
    if (result.type === "already_investigated") {
      this.log(`${this.currentArea.name} has already been investigated.`);
      return;
    }

    if (result.type === "monster") {
      this.monster = result.entity;
      this.log(
        `An ambush! You encountered a ${this.monster.name} in ${this.currentArea.name}!`,
      );
      return;
    }

    if (result.type === "item") {
      this.hero.addItem(result.entity);
      this.log(
        `${this.hero.name} found a ${result.entity.name} in ${this.currentArea.name} and added it to inventory.`,
      );
      return;
    }

    if (result.type === "empty") {
      this.log(
        `${this.currentArea.name} was investigated. Nothing was found...`,
      );
    }
  }

  /**
   * Changes the current area to a new one if conditions allow.
   * @param {Area} newArea - The new area instance to move to.
   */
  move(newArea) {
    // Guard clause: Prevent movement if hero is defeated
    if (this.hero.health <= 0) {
      this.log(`${this.hero.name} is defeated and cannot change area.`);
      return;
    }

    // Guard clause: Prevent movement if engaged in active combat
    if (this.monster && this.monster.health > 0) {
      this.log(
        `The monster ${this.monster.name} is still alive, cannot change area!`,
      );
      return;
    }

    // Update active area and reset active monster context
    this.currentArea = newArea;
    this.monster = null;
    this.log(`${this.hero.name} moved to a new area: ${newArea.name}.`);
  }

  /**
   * Allows the hero to attack the active monster using the Combat engine.
   */
  attack() {
    // Guard clause: Prevent attacking if there is no alive monster
    if (!this.monster || this.monster.health <= 0) {
      this.log("There is no active monster to attack!");
      return;
    }

    // Guard clause: Prevent attack if hero is defeated
    if (this.hero.health <= 0) {
      this.log("You cannot attack because your hero has been defeated!");
      return;
    }

    // Delegate combat mechanics to the Combat class
    const combat = new Combat(this.hero, this.monster);
    const result = combat.executeTurn();

    // Log formatted hero attack result
    this.log(
      `You attack ${result.monsterName} dealing ${result.damage} damage! (${result.monsterName} health: ${result.monsterHealth}/${result.monsterMaxHealth})`,
    );

    // Check if monster was defeated or if counterattack occurs
    if (result.isDefeated) {
      this.log(`You defeated the ${result.monsterName}!`);
    } else {
      this.log(
        `${result.monsterName} counterattacked you dealing ${result.monsterDamage} damage! (${result.heroName} health: ${result.heroHealth}/${result.heroMaxHealth})`,
      );
    }

    // Log Game Over message if hero health reaches 0
    if (result.isHeroDefeated) {
      this.log("Game Over");
    }
  }

  /**
   * Resets the game state and restores the hero health.
   */
  restart() {
    // Restore hero health to maximum and clear active monster
    this.hero.health = this.hero.maxHealth;
    this.monster = null;

    // Log restart event
    this.log(`${this.hero.name} has been restored. The journey begins anew!`);
  }

  /**
   * Executes item usage for the hero and logs the outcome.
   * @param {Item} item - The item to be used.
   */
  useItem(item) {
    const result = this.hero.useItem(item);

    if (!result) {
      this.log(`${this.hero.name} has no ${item.name} in inventory!`);
      return;
    }

    // Check item type using instanceof
    if (item instanceof Potion) {
      this.log(
        `${this.hero.name} used ${result.itemName} and restored health to ${result.targetHealth}/${result.targetMaxHealth}!`,
      );
    } else if (item instanceof Weapon) {
      this.log(
        `${this.hero.name} equipped ${result.itemName}! Attack power increased to ${result.targetAttackPower}.`,
      );
    }
  }

  /**
   * Rests the hero to recover health, provided the current area is clear and investigated.
   */
  rest() {
    // Guard clause: Cannot rest if hero is defeated
    if (this.hero.health <= 0) {
      this.log(`${this.hero.name} is defeated and cannot rest.`);
      return;
    }

    // Guard clause: Cannot rest during active combat
    if (this.monster && this.monster.health > 0) {
      this.log("You cannot rest while a monster is alive!");
      return;
    }

    // Guard clause: Area must be investigated first
    if (!this.currentArea || !this.currentArea.isInvestigated) {
      this.log("You can only rest in an area that has been investigated.");
      return;
    }

    // Guard clause: Must be an empty area (no monster or pending items discovered)
    if (this.currentArea.monster || this.currentArea.item) {
      this.log("You can only rest in an area where nothing was discovered!");
      return;
    }

    // Attempt to rest the hero
    const restedSuccessfully = this.hero.rest();

    if (!restedSuccessfully) {
      this.log(
        `${this.hero.name} is already rested and cannot rest again yet.`,
      );
      return;
    }

    this.log(
      `${this.hero.name} rested peacefully. Current Health: ${this.hero.health}/${this.hero.maxHealth}.`,
    );
  }
}
