import { Creature } from "./Creature.js";
import { Item } from "../items/Item.js";

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
    // Initialize empty inventory array
    this.inventory = [];
  }

  /**
   * Adds an item to the hero inventory.
   * @param {Object} item - The item instance to add.
   */
  addItem(item) {
    // Push item into inventory
    this.inventory.push(item);
  }

  /**
   * Uses a specific item from the inventory on the hero.
   * @param {Item} item - The item instance to use.
   * @returns {Object|null} Summary of the item effect or null if item is not found in inventory.
   */
  useItem(item) {
    // Find index of the specified item in inventory
    const index = this.inventory.indexOf(item);

    // Guard clause: Return null if item is not found
    if (index === -1) {
        return null;
    }

    // Remove item from inventory and apply its effect on the hero
    const [usedItem] = this.inventory.splice(index, 1);
    return usedItem.use(this);
  }
}
