import { Monster, Orc, Goblin, Kobold } from "../entities/Monster.js";
import { Hero } from "../entities/Hero.js";

/**
 * Class representing the main game engine and state manager.
 */
export class Game {
    constructor(hero) {
        this.hero = hero;
        this.monster = null;
        this.history = []
    }

    /**
     * Logs a message to the console and pushes it to the game history.
     * @param {string} message - The game event message to record.
     */
    log(message) {
        this.history.push(message);
        console.log(message);
    }

    /**
     * Investigates the area to discover a random monster.
     * Only allowed if there is no active monster or the current one is dead.
     */
    investigate() {
        // Guard clause: Prevent investigation if a monster is still alive
        if (this.monster && this.monster.health > 0) {
            this.log("Cannot investigate while a monster is alive!");
            return;
        }

        // Select and instantiate a random monster class
        const monsters = [Orc, Goblin, Kobold];
        const randomIndex = Math.floor(Math.random() * monsters.length);
        const SelectedMonster = monsters[randomIndex];

        this.monster = new SelectedMonster();
        this.log(`You investigated the area and encountered a ${this.monster.name}!`);
    }

    /**
     * Allows the hero to attack the active monster.
     */
    attack() {
        // Guard clause: Prevent attacking if the monster is dead
        if (!this.monster || this.monster.health <= 0) {
            this.log("There is no active monster to attack!");
            return;
        }

        // Deduct hero attack power from monster health
        this.monster.health -= this.hero.attackPower;
        this.log(`You attack ${this.monster.name} dealing ${this.hero.attackPower} damage! (${this.monster.name} health: ${this.monster.health}/${this.monster.maxHealth})`);
        
        // Check for monster defeat if health reaches 0
        if (this.monster.health <= 0) {
            this.monster.health = 0;
            this.log(`You defeated the ${this.monster.name}!`);
        }
    }
}
