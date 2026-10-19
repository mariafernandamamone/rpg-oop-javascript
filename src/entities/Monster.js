import { Creature } from "./Creature.js";
import { NotInstantiableError } from "../errors/CustomErrors.js";

/**
 * Abstract class representing a generic monster.
 */
export class Monster extends Creature {
  constructor(name, maxHealth, attackPower) {
    super(name, maxHealth, attackPower);

    if (this.constructor === Monster) {
      throw new NotInstantiableError(Monster.name);
    }
  }
}

/**
 * Concrete class representing an Orc.
 */
export class Orc extends Monster {
  constructor(name = "Orc") {
    super(name, 50, 10);
  }
}

/**
 * Concrete class representing a Goblin.
 */
export class Goblin extends Monster {
  constructor(name = "Goblin") {
    super(name, 30, 6);
  }
}

/**
 * Concrete class representing a Kobold.
 */
export class Kobold extends Monster {
  constructor(name = "Kobold") {
    super(name, 20, 4);
  }
}