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
     * Executes a single combat turn including hero attack and monster counterattack.
     * @returns {Object} Turn summary including damage dealt, updated health statuses, and defeat flags.
     */
    executeTurn() {
        // Deduct hero damage and enforce minimum health limit of 0 for monster
        this.monster.health -= this.hero.attackPower;
        if (this.monster.health < 0) {
            this.monster.health = 0;
        }

        let monsterDamage = 0;

        // Monster counterattack if still alive
        if (this.monster.health > 0 && this.hero.health > 0) {
            monsterDamage = this.monster.attackPower;
            this.hero.health -= monsterDamage;

            // Enforce minimum health limit of 0 for hero
            if (this.hero.health <= 0) {
                this.hero.health = 0;
            }
        }

        // Return structured summary of the turn results
        return {
            damage: this.hero.attackPower,
            monsterName: this.monster.name,
            monsterHealth: this.monster.health,
            monsterMaxHealth: this.monster.maxHealth,
            isDefeated: this.monster.health === 0,
            heroName: this.hero.name,
            monsterDamage: monsterDamage,
            heroHealth: this.hero.health,
            heroMaxHealth: this.hero.maxHealth,
            isHeroDefeated: this.hero.health === 0
        };
    }
}