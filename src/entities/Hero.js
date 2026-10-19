import { Creature } from "./Creature.js";

/**
 * Class representing the main hero controlled by the player.
 */
export class Hero extends Creature {
    constructor(name, maxHealth, attackPower) {
        super(name, maxHealth, attackPower);
    }
}