/**
 * Abstract base class representing a creature in the game.
 */

import { NotInstantiableError } from "../errors/CustomErrors.js";

export class Creature {
    constructor(name, maxHealth, attackPower) {
        if (this.constructor === Creature) {
            throw new NotInstantiableError(Creature.name);
        }

        this.name = name;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.attackPower = attackPower;
    }
}