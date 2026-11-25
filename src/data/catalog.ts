import i18n from "@/i18n"

export const LOGO = {
  fileName: "borito-crispy-logo.svg",
  image: "borito-crispy-logo.svg",
  alt: "Borito Crispy logo",
  brandName: "Borito Crispy",
  phone: "0755741094",
  email: "BoritoCrispy@gmail.com",
} as const

export type HeroPhoto = {
  id: string
  slot: string
  title: string
  subtitle: string
  image: string
  ctaLabel: string
  productId: string
}

export const HERO_PHOTOS: HeroPhoto[] = [
  {
    id: "hero-1",
    slot: "Hero Image 1 - Main Feature",
    title: "Mexi Bowl",
    subtitle: "Freshly loaded bowl with seasoned rice, beans, corn, avocado and crispy toppings.",
    image: "mexi-bowl.png",
    ctaLabel: "Order Mexi Bowl",
    productId: "mexi-bowl",
  },
  {
    id: "hero-2",
    slot: "Hero Image 2 - Value Proposition",
    title: "Hot. Fast. Fresh. Delivered in 30 mins.",
    subtitle: "Bouri Crispy Burrito — golden, crunchy and cooked to order.",
    image: "bouri-crispy.png",
    ctaLabel: "Order Bouri Crispy",
    productId: "bouri-crispy",
  },
  {
    id: "hero-3",
    slot: "Hero Image 3 - Rice Bowl",
    title: "Bowl Crispy",
    subtitle: "Seasoned rice topped with golden crispy chicken and signature sauces.",
    image: "bowl-crispy.png",
    ctaLabel: "Order Bowl Crispy",
    productId: "bowl-crispy",
  },
]

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

export function getTagLabel(tag: TagId): string {
  return i18n.t(`catalog.tags.${tag}`)
}

export type CategoryId =
  | "salades"
  | "family"
  | "burritos"
  | "rice-bowls"
  | "cheesy-fries"
  | "tacos"
  | "half-half"
  | "twisters"
  | "sandwichs"
  | "extra"

export type Category = {
  id: CategoryId
  name: string
  blurb: string
  image: string
}

export const CATEGORIES: Category[] = [
  { id: "salades", name: "Salades", blurb: "Fresh Nicoise bowls with your choice of topping", image: "niswaz-avocado.png" },
  { id: "family", name: "Family", blurb: "Generous sharing feast for the whole table", image: "family-feast-pack.png" },
  { id: "burritos", name: "Burritos", blurb: "Loaded grilled & crispy burritos", image: "bouri-crispy.png" },
  { id: "rice-bowls", name: "Rice Bowls", blurb: "Hearty seasoned rice bowls", image: "bowl-crispy.png" },
  { id: "cheesy-fries", name: "Cheesy Fries", blurb: "Loaded cheesy fries and crispy burger", image: "frite-crispy.png" },
  { id: "tacos", name: "Tacos", blurb: "French-style grilled tacos served with fries", image: "tacos-mix.png" },
  { id: "half-half", name: "Half Half", blurb: "The best of both worlds in one bowl", image: "chicken-bowl.png" },
  { id: "twisters", name: "Twisters", blurb: "Crispy rolled wraps served with fries", image: "bouri-crispy.png" },
  { id: "sandwichs", name: "Sandwichs", blurb: "Crispy stacked Zinger sandwich", image: "zinger-gambo.png" },
  { id: "extra", name: "Extra", blurb: "Golden crispy fries on the side", image: "frita-crispy.png" },
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

const ONE: SizeOption[] = [{ id: "regular", label: "Standard", extra: 0 }]

export const PRODUCTS: Product[] = [
  // Salades[cite: 37]
  {
    id: "nicoise-avocado",
    name: "Nicoise Avocado",
    category: "salades",
    price: 40,
    image: "niswaz-avocado.png",
    summary: "Fresh sliced avocado, guacamole, sweetcorn, beans and mixed greens.",
    description:
      "A vibrant Nicoise salad bowl topped with ripe sliced avocado, guacamole, sweetcorn, kidney beans, cherry tomatoes, cucumber, red cabbage and creamy dressing over fresh greens.",
    ingredients: ["Avocado", "Guacamole", "Sweetcorn", "Kidney beans", "Cherry tomatoes", "Cucumber", "Red cabbage"],
    calories: 490,
    prepMinutes: 10,
    tags: ["vegetarian", "chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 215,
    createdAt: 1,
  },
  {
    id: "nicoise-kefta",
    name: "Nicoise Kefta",
    category: "salades",
    price: 40,
    image: "nicoise-kofta.png",
    summary: "Seasoned grilled kefta over crisp Nicoise vegetables, potatoes and beans.",
    description:
      "Spiced grilled beef kefta served atop a colourful bed of mixed greens, kidney beans, roasted potatoes, cherry tomatoes, red cabbage, cucumber and house dressing.",
    ingredients: ["Grilled kefta", "Mixed greens", "Kidney beans", "Roasted potatoes", "Red cabbage", "Cherry tomatoes", "Cucumber"],
    calories: 580,
    prepMinutes: 12,
    tags: ["high-protein", "gluten-free"],
    sizes: ONE,
    rating: 4.7,
    likes: 184,
    createdAt: 2,
  },
  {
    id: "nicoise-bahja",
    name: "Nicoise Bahja",
    category: "salades",
    price: 35,
    image: "niswaz-bahja.png",
    summary: "Classic Nicoise with boiled eggs, tuna, olives, sweetcorn and crisp veggies.",
    description:
      "A traditional, refreshing Nicoise bowl loaded with halved boiled eggs, tuna, green olives, sweetcorn, kidney beans, red cabbage, cherry tomatoes and cucumber.",
    ingredients: ["Boiled egg", "Tuna", "Olives", "Sweetcorn", "Kidney beans", "Red cabbage", "Cherry tomatoes", "Cucumber"],
    calories: 440,
    prepMinutes: 9,
    tags: ["high-protein", "gluten-free"],
    sizes: ONE,
    rating: 4.6,
    likes: 149,
    createdAt: 3,
  },
  {
    id: "nicoise-crispy",
    name: "Nicoise Crispy",
    category: "salades",
    price: 40,
    image: "niswaz-crispy.png",
    summary: "Crunchy golden chicken tenders over fresh Nicoise salad with jalapenos.",
    description:
      "Crispy breaded chicken strips served warm over a fresh salad of sweetcorn, cherry tomatoes, red cabbage, cucumber, kidney beans, jalapenos and sauce.",
    ingredients: ["Crispy chicken", "Sweetcorn", "Kidney beans", "Red cabbage", "Cherry tomatoes", "Cucumber", "Jalapenos"],
    calories: 560,
    prepMinutes: 12,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.8,
    likes: 268,
    createdAt: 4,
  },

  // Family[cite: 37]
  {
    id: "family-pack",
    name: "Family",
    category: "family",
    price: 130,
    image: "family-feast-pack.png",
    summary: "Sharing bowls, basket of golden fries and a Coca-Cola bottle.",
    description:
      "Built for sharing: includes assorted bowls, a generous basket of golden fries and a bottle of Coca-Cola.",
    ingredients: ["Assorted bowls", "Golden fries", "Coca-Cola"],
    calories: 2450,
    prepMinutes: 22,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.9,
    likes: 412,
    createdAt: 5,
  },

  // Burritos[cite: 37, 38]
  {
    id: "bouri-kefta",
    name: "Bouri Kefta",
    category: "burritos",
    price: 45,
    image: "burrito-kafta.png",
    summary: "Grilled flour tortilla stuffed with spiced kefta, potatoes, rice and sauce.",
    description:
      "A warm toasted tortilla packed with seasoned grilled kefta, golden potatoes, fluffy spiced rice, crisp greens and creamy signature sauces.",
    ingredients: ["Flour tortilla", "Grilled kefta", "Potatoes", "Seasoned rice", "Lettuce", "Signature sauces"],
    calories: 780,
    prepMinutes: 14,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 230,
    createdAt: 6,
  },
  {
    id: "burrito-avocado",
    name: "Burrito Avocado",
    category: "burritos",
    price: 45,
    image: "burrito-avocado.png",
    summary: "Creamy avocado, tender chicken, seasoned rice and melted cheese.",
    description:
      "Grilled tortilla loaded with fresh avocado, tender marinated chicken, seasoned rice, crisp veggies and rich house sauce.",
    ingredients: ["Flour tortilla", "Avocado", "Chicken", "Seasoned rice", "Cheese", "House sauce"],
    calories: 740,
    prepMinutes: 14,
    tags: ["chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 274,
    createdAt: 7,
  },
  {
    id: "bouri-poulet",
    name: "Bouri Poulet",
    category: "burritos",
    price: 45,
    image: "burrito-avocado.png",
    summary: "Marinated chicken, spiced rice, cheese and house sauce in a toasted wrap.",
    description:
      "Tender marinated chicken wrapped in a warm tortilla with seasoned rice, crisp veggies and signature sauce.",
    ingredients: ["Flour tortilla", "Marinated chicken", "Seasoned rice", "Cheese", "House sauce"],
    calories: 730,
    prepMinutes: 14,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 210,
    createdAt: 8,
  },
  {
    id: "bouri-crispy",
    name: "Bouri Crispy",
    category: "burritos",
    price: 45,
    image: "bouri-crispy.png",
    summary: "Deep-fried golden breaded burrito stuffed with crispy chicken, rice and cheese.",
    description:
      "Our crunchy breaded burrito fried to golden perfection, filled with crispy chicken tenders, seasoned rice, melted cheese and served with dipping sauces.",
    ingredients: ["Breaded tortilla", "Crispy chicken", "Seasoned rice", "Melted cheese", "Dipping sauces"],
    calories: 890,
    prepMinutes: 16,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.9,
    likes: 518,
    createdAt: 9,
  },

  // Rice Bowls[cite: 6, 27, 37]
  {
    id: "bowl-crispy",
    name: "Bowl Crispy",
    category: "rice-bowls",
    price: 50,
    image: "bowl-crispy.png",
    summary: "Seasoned rice topped with sliced crispy chicken and signature sauces.",
    description:
      "A hearty bowl of spiced rice crowned with golden crispy chicken strips and a generous drizzle of creamy and dark house sauces.",
    ingredients: ["Spiced rice", "Crispy chicken", "White sauce", "Dark house sauce"],
    calories: 810,
    prepMinutes: 15,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.8,
    likes: 342,
    createdAt: 10,
  },
  {
    id: "bowl-poulet",
    name: "Bowl Poulet",
    category: "rice-bowls",
    price: 50,
    image: "chicken-bowl.png",
    summary: "Marinated grilled chicken chunks over seasoned rice with roasted wedges.",
    description:
      "Juicy chicken pieces served over seasoned rice with potato wedges and creamy house sauce.",
    ingredients: ["Seasoned rice", "Grilled chicken", "Potato wedges", "House sauce"],
    calories: 760,
    prepMinutes: 15,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 219,
    createdAt: 11,
  },
  {
    id: "bowl-kafta",
    name: "Bowl Kafta",
    category: "rice-bowls",
    price: 50,
    image: "bowl-kafta.png",
    summary: "Grilled spiced kefta patties over seasoned rice, pickles and herbs.",
    description:
      "Chargrilled spiced kefta patties topped with pickles and fresh herbs over warm seasoned rice, served with dipping sauces.",
    ingredients: ["Spiced rice", "Grilled kefta", "Pickles", "Fresh herbs", "Dipping sauces"],
    calories: 820,
    prepMinutes: 15,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 205,
    createdAt: 12,
  },
  {
    id: "bowl-mixte",
    name: "Bowl Mixte",
    category: "rice-bowls",
    price: 50,
    image: "mixibo.png",
    summary: "Mixed bowl with crispy chicken, grilled kefta and seasoned rice.",
    description:
      "A loaded mixed bowl combining crispy chicken and grilled kefta over seasoned rice, finished with pickles and house sauces.",
    ingredients: ["Seasoned rice", "Crispy chicken", "Grilled kefta", "Pickles", "House sauces"],
    calories: 860,
    prepMinutes: 16,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.9,
    likes: 376,
    createdAt: 13,
  },
  {
    id: "mexi-bowl",
    name: "Mexi Bowl",
    category: "rice-bowls",
    price: 45,
    image: "mexi-bowl.png",
    summary: "Mexican-style bowl with seasoned rice, beans, corn, guacamole and chicken.",
    description:
      "A colourful Mexican-inspired bowl loaded with herbed rice, black beans, sweetcorn, guacamole, diced salsa, grilled chicken and creamy drizzle.",
    ingredients: ["Herbed rice", "Black beans", "Sweetcorn", "Guacamole", "Tomato salsa", "Grilled chicken"],
    calories: 840,
    prepMinutes: 16,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.9,
    likes: 376,
    createdAt: 14,
  },

  // Cheesy Fries[cite: 15, 17, 37, 38]
  {
    id: "burger-crispy",
    name: "Burger Crispy",
    category: "cheesy-fries",
    price: 40,
    image: "burger-crispy.png",
    summary: "Double crispy chicken burger with cheddar, sauce, lettuce and fries.",
    description:
      "Two crunchy fried chicken fillets stacked with melted cheddar, creamy sauce, fresh lettuce and sesame bun, served with golden fries and sauces.",
    ingredients: ["Crispy chicken fillets", "Sesame bun", "Cheddar", "Creamy sauce", "Lettuce", "Fries"],
    calories: 960,
    prepMinutes: 15,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.8,
    likes: 390,
    createdAt: 15,
  },
  {
    id: "frite-kefta",
    name: "Frite Kefta",
    category: "cheesy-fries",
    price: 35,
    image: "frite-crispy.png",
    summary: "Golden fries loaded with seasoned kefta, melted cheese and sauce.",
    description:
      "Crispy fries topped with seasoned kefta, melted cheese sauce and house drizzle.",
    ingredients: ["French fries", "Seasoned kefta", "Cheese sauce", "House drizzle"],
    calories: 840,
    prepMinutes: 12,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 245,
    createdAt: 16,
  },
  {
    id: "frite-poulet",
    name: "Frite Poulet",
    category: "cheesy-fries",
    price: 35,
    image: "potato-and-chicken.png",
    summary: "Crispy fries topped with savoury chicken, cheese and house sauce.",
    description:
      "Hot golden fries loaded with seasoned chicken bites, melted cheese and creamy house sauce.",
    ingredients: ["French fries", "Seasoned chicken", "Cheese", "House sauce"],
    calories: 820,
    prepMinutes: 12,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 238,
    createdAt: 17,
  },
  {
    id: "frite-crispy",
    name: "Frite Crispy",
    category: "cheesy-fries",
    price: 35,
    image: "frite-crispy.png",
    summary: "Loaded fries with chopped crispy chicken, pickles, cheese and sauces.",
    description:
      "Crispy fries piled high with bite-sized golden crispy chicken, pickles, melted cheese sauce, herbs and dark house drizzle.",
    ingredients: ["French fries", "Crispy chicken", "Pickles", "Cheese sauce", "Herbs", "House drizzle"],
    calories: 880,
    prepMinutes: 12,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.9,
    likes: 435,
    createdAt: 18,
  },
  {
    id: "frita-crispy",
    name: "Frita Crispy",
    category: "cheesy-fries",
    price: 35,
    image: "frita-crispy.png",
    summary: "Crispy fries loaded with crispy chicken, pickles, herbs and sauces.",
    description:
      "A generous bowl of golden fries loaded with crispy chicken bites, pickles, herbs and rich sauces.",
    ingredients: ["French fries", "Crispy chicken", "Pickles", "Herbs", "Sauces"],
    calories: 870,
    prepMinutes: 12,
    tags: ["bestseller"],
    sizes: ONE,
    rating: 4.8,
    likes: 312,
    createdAt: 19,
  },

  // Tacos[cite: 38]
  {
    id: "tacos-kefta",
    name: "Tacos Kefta",
    category: "tacos",
    price: 40,
    image: "tacos-kefte.png",
    summary: "Grilled French tacos filled with spiced kefta, fries and cheese sauce.",
    description:
      "Pressed and toasted flour tortilla packed with grilled kefta, crispy fries and melted cheese sauce, served with extra fries and dipping sauces.",
    ingredients: ["Tortilla", "Grilled kefta", "Fries", "Cheese sauce", "Dipping sauces"],
    calories: 920,
    prepMinutes: 14,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 310,
    createdAt: 20,
  },
  {
    id: "tacos-poulet",
    name: "Tacos Poulet",
    category: "tacos",
    price: 40,
    image: "tacos-mix.png",
    summary: "Toasted French tacos with marinated chicken, fries and cheese sauce.",
    description:
      "Golden-pressed tortilla stuffed with tender marinated chicken, french fries and rich cheese sauce, served alongside extra fries and dip.",
    ingredients: ["Tortilla", "Marinated chicken", "Fries", "Cheese sauce", "Dipping sauce"],
    calories: 890,
    prepMinutes: 14,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 280,
    createdAt: 21,
  },
  {
    id: "tacos-crispy",
    name: "Tacos Crispy",
    category: "tacos",
    price: 40,
    image: "tacos-crispy.png",
    summary: "Grilled tacos packed with crunchy chicken tenders, fries and cheese sauce.",
    description:
      "Pressed tortilla loaded with crispy breaded chicken strips, fries and creamy cheese sauce, plated with a side of golden fries and dips.",
    ingredients: ["Tortilla", "Crispy chicken", "Fries", "Cheese sauce", "Dipping sauces"],
    calories: 950,
    prepMinutes: 14,
    tags: ["bestseller"],
    sizes: ONE,
    rating: 4.8,
    likes: 382,
    createdAt: 22,
  },
  {
    id: "tacos-mixte",
    name: "Tacos Mixte",
    category: "tacos",
    price: 40,
    image: "tacos-mix.png",
    summary: "Mixed meat French tacos with kefta, chicken, fries and cheese sauce.",
    description:
      "A hearty mix of spiced kefta and tender chicken wrapped with fries and molten cheese sauce in a pressed tortilla, served with fries and sauces.",
    ingredients: ["Tortilla", "Grilled kefta", "Chicken", "Fries", "Cheese sauce", "Dipping sauces"],
    calories: 980,
    prepMinutes: 15,
    tags: ["bestseller", "high-protein"],
    sizes: ONE,
    rating: 4.9,
    likes: 419,
    createdAt: 23,
  },

  // Half Half[cite: 38]
  {
    id: "half-kefta",
    name: "Half Kefta",
    category: "half-half",
    price: 40,
    image: "nicoise-kofta.png",
    summary: "Half fresh Nicoise salad, half fries topped with grilled kefta.",
    description:
      "A balanced combo bowl pairing fresh Nicoise greens with fries and grilled kefta, finished with house sauces.",
    ingredients: ["Nicoise salad", "French fries", "Grilled kefta", "House sauces"],
    calories: 760,
    prepMinutes: 13,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 224,
    createdAt: 24,
  },
  {
    id: "half-crispy",
    name: "Half Crispy",
    category: "half-half",
    price: 40,
    image: "frite-crispy.png",
    summary: "Half fresh Nicoise salad, half fries loaded with crispy chicken.",
    description:
      "A combo bowl combining fresh Nicoise salad and golden fries topped with crispy chicken bites and house sauce.",
    ingredients: ["Nicoise salad", "French fries", "Crispy chicken", "House sauce"],
    calories: 790,
    prepMinutes: 13,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.8,
    likes: 298,
    createdAt: 25,
  },
  {
    id: "haf-poulet",
    name: "Haf Poulet",
    category: "half-half",
    price: 40,
    image: "chicken-bowl.png",
    summary: "Half fresh salad, half fries topped with marinated chicken.",
    description:
      "Half crisp vegetable salad and half golden fries, finished with seasoned chicken and creamy sauce.",
    ingredients: ["Fresh salad", "French fries", "Chicken", "Creamy sauce"],
    calories: 740,
    prepMinutes: 13,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 212,
    createdAt: 26,
  },

  // Twisters[cite: 38]
  {
    id: "twi-kefta",
    name: "Twi-Kefta",
    category: "twisters",
    price: 40,
    image: "burrito-kafta.png",
    summary: "Crispy rolled wrap filled with spiced kefta, cheese and fries on the side.",
    description:
      "A crunchy golden twister roll stuffed with seasoned kefta, melted cheese and creamy sauce, served with crispy fries and dips.",
    ingredients: ["Crispy wrap", "Spiced kefta", "Melted cheese", "Fries", "Dipping sauces"],
    calories: 860,
    prepMinutes: 15,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 195,
    createdAt: 27,
  },
  {
    id: "twi-poulet",
    name: "Twi-Poulet",
    category: "twisters",
    price: 40,
    image: "burrito-avocado.png",
    summary: "Golden crunchy wrap stuffed with tender chicken, cheese and fries.",
    description:
      "Crisp rolled wrap filled with marinated chicken, cheese and signature sauce, accompanied by golden fries and dips.",
    ingredients: ["Crispy wrap", "Marinated chicken", "Cheese", "Fries", "Dipping sauces"],
    calories: 830,
    prepMinutes: 15,
    tags: ["high-protein"],
    sizes: ONE,
    rating: 4.7,
    likes: 228,
    createdAt: 28,
  },
  {
    id: "twi-crispy",
    name: "Twi-Crispy",
    category: "twisters",
    price: 40,
    image: "bouri-crispy.png",
    summary: "Crunchy rolled wrap loaded with crispy chicken, cheese and fries.",
    description:
      "Golden crunchy rolled wrap packed with crispy chicken tenders, melted cheese and creamy sauce, served with fries and dips.",
    ingredients: ["Crispy wrap", "Crispy chicken", "Melted cheese", "Fries", "Dipping sauces"],
    calories: 910,
    prepMinutes: 15,
    tags: ["bestseller", "chefs-pick"],
    sizes: ONE,
    rating: 4.9,
    likes: 334,
    createdAt: 29,
  },

  // Sandwichs[cite: 38]
  {
    id: "zinger-gambo",
    name: "Zinger Gambo",
    category: "sandwichs",
    price: 40,
    image: "zinger-gambo.png",
    summary: "Jumbo sub loaded with crispy Zinger chicken, cheese, tomato, lettuce and fries.",
    description:
      "A long toasted sesame sub packed with crunchy Zinger chicken fillets, melted cheese, fresh tomato slices and crisp lettuce, served with fries and sauces.",
    ingredients: ["Long sesame sub", "Crispy Zinger chicken", "Cheese", "Tomato", "Lettuce", "Fries", "Sauces"],
    calories: 870,
    prepMinutes: 14,
    tags: ["bestseller", "spicy", "high-protein"],
    sizes: ONE,
    rating: 4.8,
    likes: 367,
    createdAt: 30,
  },

  // Extra[cite: 38]
  {
    id: "frite",
    name: "Frite",
    category: "extra",
    price: 7,
    image: "frita-crispy.png",
    summary: "Portion of hot, crispy golden french fries.",
    description:
      "A basket of golden, crispy french fries—the perfect addition to any order.",
    ingredients: ["Potatoes", "Sea salt"],
    calories: 340,
    prepMinutes: 6,
    tags: ["vegan", "gluten-free"],
    sizes: ONE,
    rating: 4.6,
    likes: 180,
    createdAt: 31,
  },
]

export const getProduct = (id: string) => {
  const product = PRODUCTS.find((p) => p.id === id)
  if (!product) return undefined
  const translatedIngredients = i18n.t(`catalog.products.${id}.ingredients`, { returnObjects: true }) as string[] | undefined
  return {
    ...product,
    name: i18n.t(`catalog.products.${id}.name`, { defaultValue: product.name }),
    summary: i18n.t(`catalog.products.${id}.summary`, { defaultValue: product.summary }),
    description: i18n.t(`catalog.products.${id}.description`, { defaultValue: product.description }),
    ingredients: translatedIngredients && Array.isArray(translatedIngredients) ? translatedIngredients : product.ingredients,
    sizes: product.sizes.map((s) => ({ ...s, label: i18n.t(`common.${s.id === "regular" ? "standard" : s.id}`, { defaultValue: s.label }) })),
  }
}
export const getCategory = (id: string) => {
  const category = CATEGORIES.find((c) => c.id === id)
  if (!category) return undefined
  return {
    ...category,
    name: i18n.t(`catalog.categories.${id}.name`, { defaultValue: category.name }),
    blurb: i18n.t(`catalog.categories.${id}.blurb`, { defaultValue: category.blurb }),
  }
}

/** Local image URL for a renamed dish asset. */
export function imageUrl(fileName: string, _width?: number, _height?: number) {
  return `/${fileName}`
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
  ["Tasty, smaller than expected", "Delicious, though I'd go for a larger portion next time to be properly full."],
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