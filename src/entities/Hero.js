import { Creature } from "./Creature.js";
import { Potion } from "../items/Potion.js";

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
   * Uses the first available potion from the inventory on the hero.
   * @returns {Object|null} Summary of the potion effect or null if no potion is available.
   */
  usePotion() {
    // Find first potion in inventory
    const index = this.inventory.findIndex((item) => item instanceof Potion);

    // Guard clause: Return null if no potion found
    if (index === -1) {
      return null;
    }

    // Remove potion from inventory and apply effect to hero
    const [potion] = this.inventory.splice(index, 1);
    return potion.use(this);
  }
}
