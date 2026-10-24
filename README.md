# ⚔️ RPG Battle Game Engine

An object-oriented, modular turn-based RPG battle engine built with modern JavaScript (ES6+), clean architecture principles, and interactive game mechanics.

---

## 🚀 Key Features

- **Entity Inheritance Hierarchy:** Base `Creature` class with specialized `Hero` and `Monster` subtypes (`Orc`, `Goblin`, `Kobold`).
- **Encapsulated Inventory System:** Dedicated `Inventory` manager handling item storage, usage (`Potion`, `Weapon`), and list formatting.
- **World & Exploration Engine:** Dynamic `Area` system supporting stateful exploration (monsters, items, or peaceful spaces).
- **Turn-Based Combat Controller:** Isolated `Combat` engine managing turn cycles, damage calculations, and guard clauses.
- **Rest & Fatigue Mechanics:** Dynamic hero state where resting recovers health in cleared areas, and taking damage causes fatigue.
- **Action History Logging:** Unified log recorder tracking all gameplay events chronologically.

---

## 🛠️ Project Structure

```text
src/
├── engine/
│   ├── Combat.js
│   └── Game.js
├── entities/
│   ├── Creature.js
│   ├── Hero.js
│   └── Monster.js
├── items/
│   ├── Item.js
│   ├── Potion.js
│   └── Weapon.js
├── world/
│   ├── Area.js
│   └── Inventory.js
└── index.js
```

---

## 💻 Installation & Usage

### 1. Clone the repository:

```
git clone [https://github.com/mariafernandamamone/rpg-battle-engine.git](https://github.com/mariafernandamamone/rpg-battle-engine.git)
```

### 2. Navigate into the directory:

```
cd rpg-battle-engine
```

### 3. Run the test suite runner:

```
npm start
```

---

## 📄 License

### This project is open-source and available under the MIT License.