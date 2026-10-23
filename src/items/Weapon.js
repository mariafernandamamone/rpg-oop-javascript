import { Item } from "./Item.js";

/**
 * Represents a weapon item that adds power target entity.
 * @extends Item
 */
export class Weapon extends Item {
    /**
     * Creates an instance of Weapon.
     * @param {string} name - The weapon name.
     * @param {number} attackPowerAmount - The attack power points added upon use.
     */
    constructor(name, attackPowerAmount) {
        super(name);
        this.attackPowerAmount = attackPowerAmount;
    }

    /**
     * Uses the weapon on a target entity to add attack power up to attackPower.
     * @param {Object} target - The entity receiving the attack power.
     * @returns {Object} Summary of the attacking power.
     */
    use(target) {
        target.attackPower += this.attackPowerAmount;

        return {
            itemName: this.name,
            attackPowerAmount: this.attackPowerAmount,
            targetAttackPower: target.attackPower
        };
    }
}