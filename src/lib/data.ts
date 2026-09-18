export type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  blurb: string;
  emoji: string;
};

export const products: Product[] = [
  {
    id: "100-meals",
    title: "100 Delicious Meals for Babies Under One",
    category: "Recipe E-Books",
    price: 14.99,
    oldPrice: 24.99,
    rating: 4.9,
    blurb: "The bestselling doctor-crafted recipe library for the whole first year.",
    emoji: "📗",
  },
  {
    id: "speech-log",
    title: "Toddler's First Words & Speech Feeding Log",
    category: "Starter Trackers",
    price: 9.99,
    rating: 4.8,
    blurb: "Track textures, sounds and milestones side by side.",
    emoji: "🗒️",
  },
  {
    id: "200-meals",
    title: "200 Delicious Meals for Babies Under One",
    category: "Recipe E-Books",
    price: 19.99,
    rating: 4.9,
    blurb: "Double the recipes, with allergen swaps for every single meal.",
    emoji: "📘",
  },
  {
    id: "starter-kit",
    title: "The 4-Week Starting Solids Starter Kit & Meal Planner",
    category: "Meal Planners",
    price: 12.99,
    rating: 4.7,
    blurb: "A day-by-day plan for the first month of solids.",
    emoji: "🗓️",
  },
  {
    id: "bundle",
    title: "The Ultimate Feeding Bundle",
    category: "Value Bundles",
    price: 29.99,
    oldPrice: 57.96,
    rating: 5,
    blurb: "Every guide, planner and tracker in one instant download.",
    emoji: "🎁",
  },
];

export const productCategories = [
  "All",
  "Recipe E-Books",
  "Meal Planners",
  "Starter Trackers",
  "Value Bundles",
];
