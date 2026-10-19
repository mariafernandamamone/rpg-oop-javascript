/**
 * Class representing the main hero controlled by the player.
 */

import { Creature } from "./Creature.js";

export class Hero extends Creature {
    constructor(name, maxHealth, attackPower) {
        super(name, maxHealth, attackPower);
    }
}