# Module BJS-08: Basic Objects & Key-Value Pairs

## 1. What is an Object?
An Object is an unordered collection of related data stored in **key-value pairs** inside curly braces `{ ... }`.

```javascript
const player = {
  username: 'ShadowNinja',
  level: 5,
  isOnline: true,
  rank: 'Green Belt'
};
```

---

## 2. Accessing and Modifying Properties

### Dot Notation (`object.key`):
```javascript
console.log(player.username); // "ShadowNinja"
player.level = 6;             // Update value
player.hp = 100;              // Add new property
```

### Bracket Notation (`object['key']`):
Required when property names contain spaces, special characters, or are dynamic variables.

```javascript
console.log(player['rank']); // "Green Belt"

const targetStat = 'level';
console.log(player[targetStat]); // 6
```

---

## 3. Deleting Properties & Checking Existence
```javascript
delete player.hp; // Removes property

console.log('username' in player); // true
console.log('gold' in player);     // false
```
