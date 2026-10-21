/**
 * Class responsible for managing combat mechanics between a hero and a monster.
 */

export class Combat {
    /**
     * Creates a new combat session.
     * @param {Object} hero - The hero instance.
     * @param {Object} monster - The target monster instance.
     */
    constructor(hero, monster) {
        this.hero = hero;
        this.monster = monster;
    }

    /**
     * Executes a single combat turn where the hero attacks the monster.
     * @returns {Object} Turn summary including damage, monster status, and defeat flag.
     */
    executeTurn() {
        // Deduct damage and enforce minimum health limit of 0
        this.monster.health -= this.hero.attackPower;
        if (this.monster.health < 0) {
            this.monster.health = 0;
        }

        // Return structured summary of the turn results
        return {
            damage: this.hero.attackPower,
            monsterName: this.monster.name,
            monsterHealth: this.monster.health,
            monsterMaxHealth: this.monster.maxHealth,
            isDefeated: this.monster.health === 0
        };
    }
}