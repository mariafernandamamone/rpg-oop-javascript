import { Creature } from "./Creature.js";
import { Inventory } from "../world/Inventory.js";

/**
 * Class representing the Hero entity in the game.
 * @extends Creature
 */
export class Hero extends Creature {
  /**
   * Creates a new Hero instance.
   * @param {string} name - The name of the hero.
   * @param {number} maxHealth - The maximum health points.
   * @param {number} attackPower - The base attack power.
   */
  constructor(name, maxHealth, attackPower) {
    super(name, maxHealth, attackPower);
    // Initialize Inventory instance
    this.inventory = new Inventory();
  }

  /**
   * Adds an item to the hero's inventory.
   * @param {Object} item - The item to add.
   */
  addItem(item) {
    this.inventory.addItem(item);
  }

  /**
   * Uses an item from inventory on a target entity (defaults to self).
   * @param {Object} item - The item instance to use.
   * @param {Object} [target=this] - The target entity receiving the effect.
   * @returns {Object|null} Summary of the effect or null if item is not found.
   */
  useItem(item, target = this) {
    return this.inventory.useItem(item, target);
  }
}