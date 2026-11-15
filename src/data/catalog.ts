export type TagId =
  | "bestseller"
  | "new"
  | "vegan"
  | "vegetarian"
  | "spicy"
  | "gluten-free"
  | "chefs-pick"
  | "high-protein"

export const TAGS: Record<TagId, { label: string }> = {
  bestseller: { label: "Bestseller" },
  new: { label: "New" },
  vegan: { label: "Vegan" },
  vegetarian: { label: "Vegetarian" },
  spicy: { label: "Spicy" },
  "gluten-free": { label: "Gluten-free" },
  "chefs-pick": { label: "Chef's pick" },
  "high-protein": { label: "High protein" },
}

export type CategoryId =
  | "pizza-pasta"
  | "burgers"
  | "bowls-salads"
  | "world-kitchen"
  | "grill"
  | "breakfast"
  | "desserts"
  | "drinks"
  | "soups-bakery"

export type Category = {
  id: CategoryId
  name: string
  blurb: string
  image: string
}

export const CATEGORIES: Category[] = [
  { id: "pizza-pasta", name: "Pizza & Pasta", blurb: "Stone-baked and hand-rolled", image: "1574071318508-1cdbab80d002" },
  { id: "burgers", name: "Burgers", blurb: "Smashed, stacked, unforgettable", image: "1568901346375-23c9450c58cd" },
  { id: "bowls-salads", name: "Bowls & Salads", blurb: "Fresh, colourful, filling", image: "1512621776951-a57141f2eefd" },
  { id: "world-kitchen", name: "World Kitchen", blurb: "Sushi, ramen and street tacos", image: "1579871494447-9811cf80d66c" },
  { id: "grill", name: "Grill", blurb: "Fire-cooked mains", image: "1555939594-58d7cb561ad1" },
  { id: "breakfast", name: "Breakfast", blurb: "Slow mornings, served all day", image: "1567620905732-2d1ec7ab7445" },
  { id: "desserts", name: "Desserts", blurb: "Something sweet to finish", image: "1578985545062-69928b1d9587" },
  { id: "drinks", name: "Drinks", blurb: "Coffee, juices and coolers", image: "1495474472287-4d71bcdd2085" },
  { id: "soups-bakery", name: "Soups & Bakery", blurb: "Warm bowls and fresh bread", image: "1555507036-ab1f4038808a" },
]

export type SizeOption = { id: string; label: string; extra: number }

export type Product = {
  id: string
  name: string
  category: CategoryId
  price: number
  compareAt?: number
  image: string
  summary: string
  description: string
  ingredients: string[]
  calories: number
  prepMinutes: number
  tags: TagId[]
  sizes: SizeOption[]
  /** Seed rating (1-5) and review count used before any user reviews. */
  rating: number
  likes: number
  createdAt: number
}

const STD: SizeOption[] = [
  { id: "regular", label: "Regular", extra: 0 },
  { id: "large", label: "Large", extra: 4 },
]
const ONE: SizeOption[] = [{ id: "regular", label: "Standard", extra: 0 }]
const DRINK: SizeOption[] = [
  { id: "regular", label: "300 ml", extra: 0 },
  { id: "large", label: "500 ml", extra: 1.5 },
]

export const PRODUCTS: Product[] = [
  {
    id: "bbq-chicken-pizza",
    name: "Smoky BBQ Chicken Pizza",
    category: "pizza-pasta",
    price: 16.5,
    image: "1565299624946-b28f40a0ae38",
    summary: "Pulled chicken, smoked mozzarella, charred pineapple.",
    description:
      "A 12-inch hand-stretched pizza on a 48-hour cold-fermented dough, brushed with house BBQ sauce and finished with smoked mozzarella, sweet red onion and charred pineapple. Baked on a hot stone for a blistered, chewy crust.",
    ingredients: ["Cold-ferment dough", "BBQ sauce", "Pulled chicken", "Smoked mozzarella", "Pineapple", "Red onion", "Coriander"],
    calories: 820,
    prepMinutes: 20,
    tags: ["bestseller"],
    sizes: STD,
    rating: 4.7,
    likes: 312,
    createdAt: 7,
  },
  {
    id: "margherita-pizza",
    name: "Neapolitan Margherita",
    category: "pizza-pasta",
    price: 13,
    image: "1574071318508-1cdbab80d002",
    summary: "San Marzano tomato, fior di latte, fresh basil.",
    description:
      "The classic, done properly: San Marzano tomatoes crushed by hand, creamy fior di latte, basil picked that morning and a drizzle of extra-virgin olive oil. Thin in the middle, puffed and leopard-spotted at the edge.",
    ingredients: ["Tipo 00 dough", "San Marzano tomatoes", "Fior di latte", "Fresh basil", "Olive oil"],
    calories: 690,
    prepMinutes: 18,
    tags: ["vegetarian", "chefs-pick"],
    sizes: STD,
    rating: 4.8,
    likes: 428,
    createdAt: 3,
  },
  {
    id: "shrimp-spaghetti",
    name: "Garlic Shrimp Spaghetti",
    category: "pizza-pasta",
    price: 18,
    image: "1563379926898-05f4575a45d8",
    summary: "Tiger prawns, cherry tomatoes, chilli and white wine.",
    description:
      "Al dente spaghetti tossed in a glossy garlic and white-wine sauce with juicy tiger prawns, blistered cherry tomatoes and a gentle kick of chilli. Finished with lemon zest and parsley.",
    ingredients: ["Spaghetti", "Tiger prawns", "Cherry tomatoes", "Garlic", "Chilli", "White wine", "Parsley"],
    calories: 740,
    prepMinutes: 22,
    tags: ["spicy", "new"],
    sizes: STD,
    rating: 4.6,
    likes: 187,
    createdAt: 20,
  },
  {
    id: "penne-arrabbiata",
    name: "Penne Arrabbiata",
    category: "pizza-pasta",
    price: 12.5,
    image: "1621996346565-e3dbc646d9a9",
    summary: "Bronze-cut penne in a fiery tomato and garlic sauce.",
    description:
      "Bronze-cut penne holds on to a slow-cooked sauce of tomato, garlic and dried chilli. Simple, punchy and deeply satisfying, with a snow of aged pecorino on top.",
    ingredients: ["Penne rigate", "Tomato", "Garlic", "Dried chilli", "Pecorino", "Basil"],
    calories: 610,
    prepMinutes: 15,
    tags: ["vegetarian", "spicy"],
    sizes: STD,
    rating: 4.4,
    likes: 96,
    createdAt: 11,
  },
  {
    id: "pesto-farfalle",
    name: "Pesto Farfalle Salad",
    category: "pizza-pasta",
    price: 11.5,
    image: "1473093295043-cdd812d0e601",
    summary: "Basil pesto, tomatoes, rocket and toasted pine nuts.",
    description:
      "Butterfly pasta served warm-to-room-temperature with a bright basil pesto, sweet cherry tomatoes, peppery rocket and toasted pine nuts. Great for lunch or on the go.",
    ingredients: ["Farfalle", "Basil pesto", "Cherry tomatoes", "Rocket", "Pine nuts", "Parmesan"],
    calories: 540,
    prepMinutes: 12,
    tags: ["vegetarian"],
    sizes: STD,
    rating: 4.3,
    likes: 74,
    createdAt: 15,
  },
  {
    id: "double-smash-burger",
    name: "Double Smash Burger",
    category: "burgers",
    price: 14.5,
    compareAt: 16.5,
    image: "1568901346375-23c9450c58cd",
    summary: "Two smashed patties, melted cheddar, house sauce.",
    description:
      "Two crisp-edged smashed beef patties, melted American cheddar, pickles, shaved onion and our tangy house sauce on a toasted potato bun. Messy in the best possible way.",
    ingredients: ["Beef patties", "Cheddar", "Pickles", "Shaved onion", "House sauce", "Potato bun"],
    calories: 910,
    prepMinutes: 14,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.9,
    likes: 604,
    createdAt: 1,
  },
  {
    id: "crispy-chicken-burger",
    name: "Crispy Chicken Burger & Fries",
    category: "burgers",
    price: 15,
    image: "1551782450-a2132b4ba21d",
    summary: "Buttermilk fried chicken, lettuce, aioli, skin-on fries.",
    description:
      "Buttermilk-marinated chicken fried to a shattering crunch, crisp lettuce and garlic aioli in a brioche bun, served with a basket of skin-on fries and sea salt.",
    ingredients: ["Buttermilk chicken", "Brioche bun", "Lettuce", "Garlic aioli", "Skin-on fries"],
    calories: 980,
    prepMinutes: 16,
    tags: ["bestseller"],
    sizes: ONE,
    rating: 4.6,
    likes: 351,
    createdAt: 4,
  },
  {
    id: "brunch-burger",
    name: "Hollandaise Brunch Burger",
    category: "burgers",
    price: 16.5,
    image: "1565299507177-b0ac66763828",
    summary: "Beef patty, ham, fried egg and hollandaise.",
    description:
      "Breakfast meets burger: a juicy beef patty, thick-cut ham, a runny fried egg and a ladle of warm hollandaise, all held together by a toasted brioche bun.",
    ingredients: ["Beef patty", "Ham", "Fried egg", "Hollandaise", "Brioche"],
    calories: 1040,
    prepMinutes: 17,
    tags: ["new", "chefs-pick"],
    sizes: ONE,
    rating: 4.5,
    likes: 142,
    createdAt: 24,
  },
  {
    id: "protein-power-bowl",
    name: "Protein Power Bowl",
    category: "bowls-salads",
    price: 14,
    image: "1546069901-ba9599a7e63c",
    summary: "Salmon, egg, sweetcorn, red cabbage and greens.",
    description:
      "A rainbow bowl built for energy: flaked salmon, jammy egg, sweetcorn, shredded red cabbage, cucumber and crisp greens with a lemon-tahini dressing.",
    ingredients: ["Salmon", "Egg", "Sweetcorn", "Red cabbage", "Cucumber", "Mixed greens", "Lemon tahini"],
    calories: 520,
    prepMinutes: 10,
    tags: ["high-protein", "gluten-free"],
    sizes: STD,
    rating: 4.7,
    likes: 233,
    createdAt: 6,
  },
  {
    id: "buddha-bowl",
    name: "Rainbow Buddha Bowl",
    category: "bowls-salads",
    price: 13,
    image: "1512621776951-a57141f2eefd",
    summary: "Avocado, chickpeas, sweet potato and radish.",
    description:
      "Roasted sweet potato, crispy chickpeas, creamy avocado, watermelon radish and tomatoes over crisp lettuce, finished with a cashew-lime dressing. Entirely plant-based.",
    ingredients: ["Sweet potato", "Chickpeas", "Avocado", "Radish", "Cherry tomato", "Lettuce", "Cashew dressing"],
    calories: 480,
    prepMinutes: 10,
    tags: ["vegan", "gluten-free", "chefs-pick"],
    sizes: STD,
    rating: 4.8,
    likes: 289,
    createdAt: 9,
  },
  {
    id: "crunchy-kale-salad",
    name: "Crunchy Kale Salad",
    category: "bowls-salads",
    price: 10.5,
    image: "1540189549336-e6e99c3679fe",
    summary: "Massaged kale, seeds, carrot and sharp vinaigrette.",
    description:
      "Tender massaged kale with shaved carrot, red onion, toasted seeds and a sharp mustard vinaigrette. Light, crunchy and surprisingly satisfying.",
    ingredients: ["Kale", "Carrot", "Red onion", "Toasted seeds", "Mustard vinaigrette"],
    calories: 320,
    prepMinutes: 8,
    tags: ["vegan", "gluten-free"],
    sizes: STD,
    rating: 4.2,
    likes: 58,
    createdAt: 17,
  },
  {
    id: "sushi-platter",
    name: "Salmon Sushi Platter",
    category: "world-kitchen",
    price: 22,
    image: "1579871494447-9811cf80d66c",
    summary: "Twelve pieces of salmon nigiri and rolls.",
    description:
      "Twelve pieces made to order: salmon nigiri, avocado-salmon rolls and a spicy tuna roll, with pickled ginger, wasabi and soy.",
    ingredients: ["Sushi rice", "Salmon", "Avocado", "Nori", "Pickled ginger", "Wasabi", "Soy sauce"],
    calories: 640,
    prepMinutes: 25,
    tags: ["high-protein", "chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 391,
    createdAt: 5,
  },
  {
    id: "shrimp-ramen",
    name: "Soft-Egg Shrimp Ramen",
    category: "world-kitchen",
    price: 16,
    image: "1569718212165-3a8278d5f624",
    summary: "Rich broth, prawns, snap peas and a jammy egg.",
    description:
      "A 12-hour savoury broth, springy noodles, tiger prawns, snap peas and a marinated soft-boiled egg. Warm, deep and comforting.",
    ingredients: ["Ramen noodles", "Pork-miso broth", "Prawns", "Snap peas", "Marinated egg", "Spring onion"],
    calories: 710,
    prepMinutes: 18,
    tags: ["spicy", "new"],
    sizes: STD,
    rating: 4.6,
    likes: 204,
    createdAt: 22,
  },
  {
    id: "chickpea-tacos",
    name: "Crispy Chickpea Tacos",
    category: "world-kitchen",
    price: 12,
    image: "1565299585323-38d6b0865b47",
    summary: "Spiced chickpeas, avocado and lime in warm tortillas.",
    description:
      "Three warm corn tortillas filled with crisp spiced chickpeas, smashed avocado, pickled onion and a squeeze of fresh lime. Plant-based and packed with flavour.",
    ingredients: ["Corn tortillas", "Chickpeas", "Avocado", "Pickled onion", "Lime", "Coriander"],
    calories: 450,
    prepMinutes: 12,
    tags: ["vegan", "spicy"],
    sizes: ONE,
    rating: 4.5,
    likes: 129,
    createdAt: 19,
  },
  {
    id: "street-tacos",
    name: "Loaded Street Tacos",
    category: "world-kitchen",
    price: 13.5,
    image: "1551504734-5ee1c4a1479b",
    summary: "Three tacos: carnitas, slaw and salsa verde.",
    description:
      "Slow-braised carnitas, crunchy slaw, salsa verde and crumbled queso fresco piled on a trio of fresh tortillas. Street-food energy, plated.",
    ingredients: ["Carnitas", "Tortillas", "Slaw", "Salsa verde", "Queso fresco", "Lime"],
    calories: 560,
    prepMinutes: 13,
    tags: ["bestseller", "spicy"],
    sizes: ONE,
    rating: 4.7,
    likes: 266,
    createdAt: 8,
  },
  {
    id: "mixed-grill",
    name: "Mixed Fire Grill",
    category: "grill",
    price: 26,
    image: "1555939594-58d7cb561ad1",
    summary: "Chicken, lamb and sausage skewers, charred peppers.",
    description:
      "A sharing platter of chicken thigh, spiced lamb and house sausage skewers cooked over open flame, with charred peppers, roast potatoes, garlic yoghurt and hot sauce.",
    ingredients: ["Chicken", "Lamb", "Sausage", "Peppers", "Potatoes", "Garlic yoghurt"],
    calories: 1120,
    prepMinutes: 30,
    tags: ["high-protein", "gluten-free"],
    sizes: ONE,
    rating: 4.7,
    likes: 177,
    createdAt: 12,
  },
  {
    id: "steak-greens",
    name: "Sliced Steak & Greens",
    category: "grill",
    price: 24,
    image: "1504674900247-0877df9cc836",
    summary: "Rare sirloin, crisp lettuce, cashews, chilli.",
    description:
      "Seared sirloin sliced thin and served with crisp lettuce cups, toasted cashews, fresh chilli and a savoury pan jus.",
    ingredients: ["Sirloin", "Lettuce", "Cashews", "Chilli", "Pan jus"],
    calories: 680,
    prepMinutes: 22,
    tags: ["high-protein", "gluten-free"],
    sizes: ONE,
    rating: 4.6,
    likes: 118,
    createdAt: 16,
  },
  {
    id: "glazed-salmon",
    name: "Glazed Salmon & Greens",
    category: "grill",
    price: 21,
    image: "1467003909585-2f8a72700288",
    summary: "Miso-glazed salmon, wilted greens, lime.",
    description:
      "Skin-crisp salmon with a sweet-salty miso glaze, served over wilted greens with a charred lime wedge.",
    ingredients: ["Salmon", "Miso glaze", "Spinach", "Greens", "Lime"],
    calories: 590,
    prepMinutes: 20,
    tags: ["high-protein", "gluten-free", "chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 254,
    createdAt: 10,
  },
  {
    id: "apple-pork-chop",
    name: "Roast Apple Pork Chop",
    category: "grill",
    price: 22.5,
    image: "1432139555190-58524dae6a55",
    summary: "Thick-cut chop, roast apple and tender broccoli.",
    description:
      "A thick-cut, bone-in pork chop roasted with caramelised apple and rosemary, served on tender-stem broccoli and crushed potatoes.",
    ingredients: ["Pork chop", "Apple", "Rosemary", "Broccoli", "Potatoes"],
    calories: 760,
    prepMinutes: 28,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.4,
    likes: 83,
    createdAt: 21,
  },
  {
    id: "bbq-ribs",
    name: "Sticky BBQ Ribs",
    category: "grill",
    price: 23,
    image: "1544025162-d76694265947",
    summary: "Slow-cooked ribs, fries and heirloom tomatoes.",
    description:
      "Pork ribs slow-cooked for six hours until they fall off the bone, glazed in sticky BBQ sauce and served with fries and sliced heirloom tomatoes.",
    ingredients: ["Pork ribs", "BBQ sauce", "Fries", "Heirloom tomatoes"],
    calories: 1180,
    prepMinutes: 25,
    tags: ["bestseller", "spicy"],
    sizes: ONE,
    rating: 4.8,
    likes: 342,
    createdAt: 2,
  },
  {
    id: "buttermilk-pancakes",
    name: "Buttermilk Pancake Stack",
    category: "breakfast",
    price: 11,
    image: "1567620905732-2d1ec7ab7445",
    summary: "Fluffy stack, maple syrup and fresh herbs.",
    description:
      "Five fluffy buttermilk pancakes stacked high, with whipped butter and warm maple syrup poured at the table.",
    ingredients: ["Buttermilk", "Flour", "Egg", "Butter", "Maple syrup"],
    calories: 640,
    prepMinutes: 12,
    tags: ["vegetarian", "bestseller"],
    sizes: ONE,
    rating: 4.7,
    likes: 298,
    createdAt: 13,
  },
  {
    id: "berry-french-toast",
    name: "Blueberry French Toast",
    category: "breakfast",
    price: 12.5,
    image: "1484723091739-30a097e8f929",
    summary: "Brioche, banana, blueberries and icing sugar.",
    description:
      "Thick brioche soaked in vanilla custard, griddled until golden, then loaded with sliced banana, blueberries and a dusting of sugar.",
    ingredients: ["Brioche", "Custard", "Banana", "Blueberries", "Icing sugar"],
    calories: 720,
    prepMinutes: 14,
    tags: ["vegetarian", "chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 211,
    createdAt: 14,
  },
  {
    id: "avocado-egg-toast",
    name: "Avocado & Egg Toast",
    category: "breakfast",
    price: 10,
    image: "1482049016688-2d3e1b311543",
    summary: "Sourdough, smashed avocado, soft-boiled egg.",
    description:
      "Toasted sourdough, smashed avocado, a halved soft-boiled egg, baby spinach and chilli flakes.",
    ingredients: ["Sourdough", "Avocado", "Egg", "Spinach", "Chilli flakes"],
    calories: 410,
    prepMinutes: 9,
    tags: ["vegetarian"],
    sizes: ONE,
    rating: 4.5,
    likes: 165,
    createdAt: 18,
  },
  {
    id: "brunch-board",
    name: "Sharing Brunch Board",
    category: "breakfast",
    price: 28,
    image: "1493770348161-369560ae357d",
    summary: "Waffles, granola bowls, fruit and pastries for two.",
    description:
      "A generous table-spread for two: crisp waffles, berry granola bowls, seasonal fruit, mini pastries and a pot of hot chocolate.",
    ingredients: ["Waffles", "Granola", "Yoghurt", "Berries", "Pastries", "Hot chocolate"],
    calories: 1450,
    prepMinutes: 20,
    tags: ["vegetarian", "new"],
    sizes: ONE,
    rating: 4.6,
    likes: 97,
    createdAt: 23,
  },
  {
    id: "raspberry-cake",
    name: "Raspberry Pistachio Cake",
    category: "desserts",
    price: 8.5,
    image: "1565958011703-44f9829ba187",
    summary: "Layered sponge, pistachio cream, fresh raspberries.",
    description:
      "Three layers of light vanilla sponge with pistachio cream and crushed raspberries, topped with fresh fruit.",
    ingredients: ["Sponge", "Pistachio cream", "Raspberries", "Cream"],
    calories: 460,
    prepMinutes: 5,
    tags: ["vegetarian", "new"],
    sizes: ONE,
    rating: 4.6,
    likes: 137,
    createdAt: 25,
  },
  {
    id: "chocolate-drip-cake",
    name: "Triple Chocolate Cake",
    category: "desserts",
    price: 9,
    image: "1578985545062-69928b1d9587",
    summary: "Dark chocolate sponge with ganache and buttercream.",
    description:
      "Three layers of dark chocolate sponge, whipped ganache and silky chocolate buttercream. Served by the generous slice.",
    ingredients: ["Cocoa sponge", "Ganache", "Chocolate buttercream"],
    calories: 590,
    prepMinutes: 5,
    tags: ["vegetarian", "bestseller"],
    sizes: ONE,
    rating: 4.9,
    likes: 512,
    createdAt: 26,
  },
  {
    id: "sprinkle-donuts",
    name: "Sprinkle Donut Trio",
    category: "desserts",
    price: 7.5,
    image: "1551024601-bec78aea704b",
    summary: "Three glazed donuts with sprinkles and chocolate.",
    description:
      "A trio of freshly fried yeast donuts: vanilla glaze with sprinkles, chocolate drizzle and double-chocolate dip.",
    ingredients: ["Yeast dough", "Vanilla glaze", "Chocolate", "Sprinkles"],
    calories: 780,
    prepMinutes: 5,
    tags: ["vegetarian"],
    sizes: ONE,
    rating: 4.4,
    likes: 202,
    createdAt: 27,
  },
  {
    id: "strawberry-panna-cotta",
    name: "Strawberry Panna Cotta",
    category: "desserts",
    price: 6.5,
    image: "1488477181946-6428a0291777",
    summary: "Silky vanilla cream, macerated strawberries.",
    description:
      "Set cream scented with real vanilla, topped with strawberries macerated in sugar and lemon. Light and cool.",
    ingredients: ["Cream", "Vanilla", "Strawberries", "Lemon"],
    calories: 320,
    prepMinutes: 3,
    tags: ["vegetarian", "gluten-free"],
    sizes: ONE,
    rating: 4.5,
    likes: 88,
    createdAt: 28,
  },
  {
    id: "flat-white",
    name: "Latte Art Flat White",
    category: "drinks",
    price: 4.5,
    image: "1495474472287-4d71bcdd2085",
    summary: "Double ristretto with silky steamed milk.",
    description:
      "A double shot of single-origin espresso with velvety microfoam milk. Add oat or almond milk at no extra cost.",
    ingredients: ["Single-origin espresso", "Steamed milk"],
    calories: 120,
    prepMinutes: 4,
    tags: ["vegetarian", "bestseller"],
    sizes: DRINK,
    rating: 4.7,
    likes: 270,
    createdAt: 29,
  },
  {
    id: "fresh-orange-juice",
    name: "Fresh-Pressed Orange Juice",
    category: "drinks",
    price: 5,
    image: "1600271886742-f049cd451bba",
    summary: "Cold-pressed to order, no added sugar.",
    description:
      "Sweet Valencia oranges pressed to order and served over ice with a lemon slice. Nothing added, nothing taken away.",
    ingredients: ["Valencia oranges", "Lemon"],
    calories: 110,
    prepMinutes: 3,
    tags: ["vegan", "gluten-free"],
    sizes: DRINK,
    rating: 4.6,
    likes: 120,
    createdAt: 30,
  },
  {
    id: "berry-lime-cooler",
    name: "Strawberry Lime Cooler",
    category: "drinks",
    price: 5.5,
    image: "1497534446932-c925b458314e",
    summary: "Muddled strawberries, lime, mint and sparkling water.",
    description:
      "Strawberries muddled with lime and mint, topped with sparkling water and plenty of ice. Bright, tart and refreshing.",
    ingredients: ["Strawberries", "Lime", "Mint", "Sparkling water"],
    calories: 90,
    prepMinutes: 4,
    tags: ["vegan", "new"],
    sizes: DRINK,
    rating: 4.5,
    likes: 99,
    createdAt: 31,
  },
  {
    id: "butter-croissant",
    name: "All-Butter Croissant",
    category: "soups-bakery",
    price: 3.5,
    image: "1555507036-ab1f4038808a",
    summary: "Laminated for 72 hours, baked every morning.",
    description:
      "Seventy-two hours of lamination yields a shatteringly crisp shell and an airy, honeycomb centre. Baked fresh each morning.",
    ingredients: ["Flour", "French butter", "Yeast", "Sea salt"],
    calories: 270,
    prepMinutes: 2,
    tags: ["vegetarian", "bestseller"],
    sizes: ONE,
    rating: 4.8,
    likes: 330,
    createdAt: 32,
  },
  {
    id: "seeded-sourdough",
    name: "Seeded Sourdough Loaf",
    category: "soups-bakery",
    price: 6.5,
    image: "1509440159596-0249088772ff",
    summary: "Slow-fermented, stone-ground, crackling crust.",
    description:
      "Naturally leavened over 36 hours with stone-ground wholemeal and a mix of sunflower, flax and pumpkin seeds.",
    ingredients: ["Wholemeal flour", "Sourdough starter", "Mixed seeds", "Sea salt"],
    calories: 220,
    prepMinutes: 2,
    tags: ["vegan"],
    sizes: ONE,
    rating: 4.6,
    likes: 71,
    createdAt: 33,
  },
  {
    id: "roast-tomato-soup",
    name: "Roast Tomato Soup",
    category: "soups-bakery",
    price: 8,
    image: "1547592166-23ac45744acd",
    summary: "Slow-roasted tomato, basil oil and pumpkin seeds.",
    description:
      "Tomatoes roasted until sweet and jammy, blended with onion and garlic, finished with basil oil and toasted pumpkin seeds. Served with sourdough.",
    ingredients: ["Roast tomatoes", "Onion", "Garlic", "Basil oil", "Pumpkin seeds"],
    calories: 260,
    prepMinutes: 8,
    tags: ["vegan", "gluten-free"],
    sizes: STD,
    rating: 4.5,
    likes: 102,
    createdAt: 34,
  },
  {
    id: "pumpkin-soup",
    name: "Spiced Pumpkin Soup",
    category: "soups-bakery",
    price: 8,
    image: "1476718406336-bb5a9690ee2a",
    summary: "Velvety squash, warm spices and feta crumble.",
    description:
      "Roast pumpkin blended with ginger and warm spices into a velvety soup, finished with feta crumble and toasted seeds.",
    ingredients: ["Pumpkin", "Ginger", "Warm spices", "Feta", "Seeds"],
    calories: 280,
    prepMinutes: 8,
    tags: ["vegetarian", "gluten-free"],
    sizes: STD,
    rating: 4.4,
    likes: 66,
    createdAt: 35,
  },
]

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id)
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id)

/** Unsplash image URL with sizing / format params. */
export function imageUrl(photoId: string, width: number, height?: number) {
  const h = height ? `&h=${height}` : ""
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&crop=entropy&q=75&w=${width}${h}`
}

export type Review = {
  id: string
  productId: string
  author: string
  rating: number
  title: string
  body: string
  date: number
  helpful: number
  seed?: boolean
}

const NAMES = ["Amélie R.", "Youssef B.", "Sofia M.", "Daniel K.", "Lina H.", "Marcus T.", "Nora A.", "Elias P.", "Chloé D.", "Omar S."]
const POSITIVE: [string, string][] = [
  ["Worth every bite", "Arrived hot, beautifully presented and tasted even better than it looked. Ordering again this week."],
  ["New favourite", "Generous portion, perfectly seasoned. I've already recommended it to three friends."],
  ["So fresh", "You can really tell the ingredients are good quality. Light but still very filling."],
  ["Great value", "Very good for the price. Packaging kept everything intact and at the right temperature."],
  ["Comfort food done right", "Exactly what I was craving. Big flavours and nothing felt greasy or heavy."],
  ["Chef's kiss", "Texture, seasoning, balance — everything was spot on. Easily the best on the menu."],
]
const MIXED: [string, string][] = [
  ["Very good, a touch salty", "Loved the flavours overall. I'd ask for a bit less salt next time, but I'd still order it."],
  ["Tasty, smaller than expected", "Delicious, though I'd go for the large size next time to be properly full."],
]

/** Deterministic seed reviews so the page is lively on first visit. */
export function seedReviews(): Review[] {
  const out: Review[] = []
  PRODUCTS.forEach((p, pi) => {
    const count = 2 + (pi % 3)
    for (let i = 0; i < count; i++) {
      const pool = p.rating < 4.5 && i === count - 1 ? MIXED : POSITIVE
      const [title, body] = pool[(pi + i * 2) % pool.length]
      const rating = pool === MIXED ? 4 : p.rating >= 4.7 ? 5 : i % 3 === 2 ? 4 : 5
      out.push({
        id: `seed-${p.id}-${i}`,
        productId: p.id,
        author: NAMES[(pi * 3 + i * 4) % NAMES.length],
        rating,
        title,
        body,
        date: 1731000000000 - (pi * 5 + i * 11 + 3) * 86400000,
        helpful: ((pi * 7 + i * 5) % 19) + 1,
        seed: true,
      })
    }
  })
  return out
}
