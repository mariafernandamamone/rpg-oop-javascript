/**
 * Abstract class representing a general item.
 */
export class Item {
    /**
     * Creates an instance of Item.
     * @param {string} name - The item name.
     */
    constructor(name) {
        if (new.target === Item) {
            throw new Error("Cannot instantiate abstract class Item directly.");
        }
        this.name = name;
    }

    /**
     * Uses the item on a target entity.
     * @param {Object} target - The entity receiving the item effect.
     */
    use(target) {
        throw new Error("Method 'use()' must be implemented by subclasses.");
    }
}