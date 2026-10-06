# Module JS-07: Prototypes, Classes & Modern OOP

## 1. Prototype Chain Mental Model
In JavaScript, inheritance is based on **prototypes**, not classical classes. Every object has an internal link to another object called its prototype (`[[Prototype]]` or `__proto__`). When accessing a property, JavaScript searches the object itself, then its prototype, up until `Object.prototype`, and finally `null`.

```javascript
const animal = {
  eats: true,
  walk() {
    return 'Walking smoothly...';
  }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.jumps); // true (own property)
console.log(rabbit.eats);  // true (found on animal prototype)
console.log(rabbit.walk());// 'Walking smoothly...'
```

---

## 2. ES6 Classes & Inheritance
ES6 `class` syntax provides a clean, syntactic wrapper over prototypes.

```javascript
class BaseLearner {
  #secretKey; // Private field (ES2022)

  constructor(name, xp = 0) {
    this.name = name;
    this.xp = xp;
    this.#secretKey = Math.random().toString(36).slice(2);
  }

  // Method on Prototype
  gainXp(amount) {
    this.xp += amount;
    return `${this.name} gained ${amount} XP! Total: ${this.xp}`;
  }

  // Static Factory Method
  static createGuest() {
    return new BaseLearner('Guest User', 0);
  }

  // Getter
  get rank() {
    if (this.xp >= 1000) return '🥋 Black Belt Master';
    if (this.xp >= 500) return '⚡ Advanced Belt';
    return '🌱 White Belt';
  }
}

// Inheritance with extends & super
class NinjaWarrior extends BaseLearner {
  constructor(name, xp, specialSkill) {
    super(name, xp); // Calls parent constructor
    this.specialSkill = specialSkill;
  }

  attack() {
    return `${this.name} executed ${this.specialSkill}!`;
  }
}

const ninja = new NinjaWarrior('Kenshi', 750, 'Lightning Dash');
console.log(ninja.gainXp(300)); // Total: 1050
console.log(ninja.rank);        // '🥋 Black Belt Master'
console.log(ninja.attack());      // 'Kenshi executed Lightning Dash!'
```
