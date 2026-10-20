const products = [
  { name: 'Keyboard', price: 45 },
  { name: 'Monitor', price: 320 },
  { name: 'Mouse', price: 25 }
];

// 1. Destructuring: unpack name and price from the first product
const { name, price } = products[0];
console.log(name, price);

// 2. find: locate the item named 'Mouse' and log its price
const mouse = products.find(p => p.name === 'Mouse');
console.log(mouse.price);

// 3. filter: all products with a price strictly below 100
const cheap = products.filter(p => p.price < 100);
console.log(cheap);

// 4. Arrow function: returns a price discounted by 10%
const withDiscount = (p) => p * 0.9;
console.log(withDiscount(320));
