/**
 * Represents a health potion that restores target entity health.
 */
export class Potion {
    /**
     * Creates a new Potion instance.
     * @param {string} name - The item name.
     * @param {number} healAmount - The health points restored upon use.
     */
    constructor(name, healAmount) {
        this.name = name;
        this.healAmount = healAmount;
    }

    /**
     * Uses the potion on a target entity.
     * @param {Object} target - The entity receiving the heal.
     * @returns {Object} Summary of the healing effect.
     */
    use(target) {
        // Increase target health by potion heal amount
        target.health += this.healAmount;

        // Cap health at maximum allowed limit
        if (target.health > target.maxHealth) {
            target.health = target.maxHealth;
        }

        // Return summary of the healing effect
        return {
            itemName: this.name, 
            healAmount: this.healAmount, 
            targetHealth: target.health, 
            targetMaxHealth: target.maxHealth
        }
    }    
}
