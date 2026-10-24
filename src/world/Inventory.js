/**
 * Class representing an inventory container to manage items.
 */
export class Inventory {
    /**
     * Creates an instance of Inventory with an empty list of items.
     */
    constructor() {
        this.items = [];
    }

    /**
     * Adds an item to the inventory.
     * @param {Object} item - The item to add.
     */
    addItem(item) {
        this.items.push(item);
    }

    /**
     * Uses a specific item from the inventory on the target.
     * @param {Object} item - The item instance to use.
     * @param {Object} target - The subject receiving the item effect.
     * @returns {Object|null} Summary of the item effect or null if item is not found.
     */
    useItem(item, target) {
        const index = this.items.indexOf(item);

        if (index === -1) {
            return null;
        }

        const [usedItem] = this.items.splice(index, 1);
        return usedItem.use(target);
    }

    /**
     * Removes an item from the inventory without using it.
     * @param {Object} item - The item to remove.
     * @returns {boolean} True if the item was removed, false otherwise.
     */
    removeItem(item) {
        const index = this.items.indexOf(item);

        if (index === -1) {
            return false;
        }

        this.items.splice(index, 1);
        return true;
    }

    /**
     * Gets a formatted list of all items currently in the inventory.
     * @returns {string} Text listing item names or indicating the inventory is empty.
     */
    getItems() {
        if (this.items.length === 0) {
            return "The inventory is empty.";
        }

        const itemNames = this.items.map((item) => item.name).join(", ");
        return `Items in inventory: ${itemNames}`;
    }
}