import { Monster, Orc, Goblin, Kobold } from "../entities/Monster.js";
import { Hero } from "../entities/Hero.js";
import { Combat } from "./Combat.js";

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
     * Only allowed if there is no active monster or the current one is dead and if hero isn't defeated yet.
     */
    investigate() {
        // Guard clause: Prevent investigation if hero is defeated
        if (this.hero.health <= 0) {
            this.log("You cannot investigate because your hero has been defeated!");
            return;
        }

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
     * Allows the hero to attack the active monster using the Combat engine.
     */
    attack() {
        // Guard clause: Prevent attacking if there is no alive monster
        if (!this.monster || this.monster.health <= 0) {
            this.log("There is no active monster to attack!");
            return;
        }

        // Guard clause: Prevent attack if hero is defeated
        if (this.hero.health <= 0) {
            this.log("You cannot attack because your hero has been defeated!");
            return;
        }

        // Delegate combat mechanics to the Combat class
        const combat = new Combat(this.hero, this.monster);
        const result = combat.executeTurn();

        // Log formatted hero attack result
        this.log(`You attack ${result.monsterName} dealing ${result.damage} damage! (${result.monsterName} health: ${result.monsterHealth}/${result.monsterMaxHealth})`);

        // Check if monster was defeated or if counterattack occurs
        if (result.isDefeated) {
            this.log(`You defeated the ${result.monsterName}!`);
        } else {
            this.log(`${result.monsterName} counterattacked you dealing ${result.monsterDamage} damage! (${result.heroName} health: ${result.heroHealth}/${result.heroMaxHealth})`);
        }

        // Log Game Over message if hero health reaches 0
        if (result.isHeroDefeated) {
            this.log("Game Over");
        }
    }

    /**
     * Resets the game state and restores the hero health.
     */
    restart() {
        // Restore hero health to maximum and clear active monster
        this.hero.health = this.hero.maxHealth;
        this.monster = null;

        // Log restart event
        this.log(`${this.hero.name} has been restored. The journey begins anew!`);
    }

    /**
     * Executes potion usage for the hero and logs the outcome.
     */
    usePotion() {
        const result = this.hero.usePotion();
        
        if (!result) {
            this.log(`${this.hero.name} has no potions left in inventory!`);
            return;
        }

        this.log(`${this.hero.name} used ${result.itemName} and restored health to ${result.targetHealth}/${result.targetMaxHealth}!`);
    }
}
