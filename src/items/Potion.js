import { Item } from "./Item.js";

/**
 * Represents a health potion item that restores health to a target entity.
 * @extends Item
 */
export class Potion extends Item {
    /**
     * Creates an instance of Potion.
     * @param {string} name - The potion name.
     * @param {number} healAmount - The health points restored upon use.
     */
    constructor(name, healAmount) {
        super(name);
        this.healAmount = healAmount;
    }

    /**
     * Uses the potion on a target entity to restore health up to maxHealth.
     * @param {Object} target - The entity receiving the heal.
     * @returns {Object} Summary of the healing effect.
     */
    use(target) {
        target.health += this.healAmount;

        if (target.health > target.maxHealth) {
            target.health = target.maxHealth;
        }

        return {
            itemName: this.name,
            healAmount: this.healAmount,
            targetHealth: target.health,
            targetMaxHealth: target.maxHealth
        };
    }
}