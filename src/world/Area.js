/**
 * Class representing a world area for exploration.
 */
export class Area {
    /**
     * Creates an instance of Area.
     * @param {string} name - The name of the area.
     * @param {Object|null} [monster=null] - The monster present in this area.
     * @param {Object|null} [item=null] - The item present in this area.
     */
    constructor(name, monster = null, item = null) {
        this.name = name;
        this.isInvestigated = false;
        this.monster = monster;
        this.item = item;
    }

    /**
     * Investigates the area to discover monsters, items, or nothing.
     * @returns {Object} Summary outcome of the investigation.
     */
    investigate() {
        if (this.isInvestigated) {
            return { type: "already_investigated", message: "This area was already investigated." };
        }

        this.isInvestigated = true;

        if (this.monster) {
            return { type: "monster", entity: this.monster };
        }

        if (this.item) {
            return { type: "item", entity: this.item };
        }

        return { type: "empty", message: "This area is empty." };
    }
}