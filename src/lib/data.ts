import r1 from "@/assets/r1.jpg";
import r2 from "@/assets/r2.jpg";
import r3 from "@/assets/r3.jpg";
import r4 from "@/assets/r4.jpg";
import r5 from "@/assets/r5.jpg";
import r6 from "@/assets/r6.jpg";
import r7 from "@/assets/r7.jpg";
import r8 from "@/assets/r8.jpg";

export type Recipe = {
  id: string;
  title: string;
  image: string;
  age: string;
  ageGroups: string[];
  mealTypes: string[];
  dietary: string[];
  prepTags: string[];
  highlight: string;
  prep: string;
  minutes: number;
  yield: string;
  rating: number;
  summary: string;
  ingredients: string[];
  steps: string[];
  doctorNote: string;
};

export const recipes: Recipe[] = [
  {
    id: "sweet-potato-lentil-mash",
    title: "Sweet Potato & Red Lentil Iron Mash",
    image: r1,
    age: "6–8m",
    ageGroups: ["6-8m"],
    mealTypes: ["Lunches"],
    dietary: ["Dairy-Free", "Egg-Free", "Gluten-Free", "Nut-Free", "Vegan"],
    prepTags: ["Under 15 Min", "Freezer-Friendly", "Iron Boosters"],
    highlight: "High Iron",
    prep: "15 min",
    minutes: 15,
    yield: "4 portions",
    rating: 4.9,
    summary:
      "A silky, plant-iron rich mash that pairs lentils with vitamin C from sweet potato for better absorption.",
    ingredients: [
      "1 medium sweet potato, peeled and cubed",
      "3 tbsp red lentils, rinsed",
      "1 cup water or unsalted stock",
      "1 tsp olive oil",
      "Pinch of cumin (optional)",
    ],
    steps: [
      "Simmer the lentils and sweet potato in water until very soft, about 12 minutes.",
      "Drain, keeping a few spoonfuls of the cooking liquid.",
      "Mash or blend to the texture your baby handles best, adding liquid as needed.",
      "Stir in olive oil, cool to lukewarm, and serve.",
    ],
    doctorNote:
      "Pair plant iron with a vitamin C source at the same meal — it can multiply absorption several times over.",
  },
  {
    id: "avocado-banana-pops",
    title: "Avocado Banana Teething Frozen Pops",
    image: r2,
    age: "6m+",
    ageGroups: ["6-8m", "8-12m"],
    mealTypes: ["Snacks & Teethers"],
    dietary: ["Dairy-Free", "Egg-Free", "Gluten-Free", "Nut-Free", "Vegan"],
    prepTags: ["Under 15 Min", "3-5 Ingredients", "Freezer-Friendly"],
    highlight: "Healthy Fats",
    prep: "5 min",
    minutes: 5,
    yield: "6 pops",
    rating: 4.8,
    summary: "Cooling relief for sore gums with creamy healthy fats for brain growth.",
    ingredients: [
      "1 ripe avocado",
      "1 ripe banana",
      "2 tbsp full-fat yogurt or coconut yogurt",
    ],
    steps: [
      "Blend everything until completely smooth.",
      "Spoon into small silicone teething moulds.",
      "Freeze for at least 4 hours.",
      "Offer supervised, holding the handle for younger babies.",
    ],
    doctorNote: "Always offer frozen textures with the baby upright and fully supervised.",
  },
  {
    id: "apple-cinnamon-sticks",
    title: "Steamed Apple Cinnamon Finger Sticks",
    image: r3,
    age: "8–12m",
    ageGroups: ["8-12m"],
    mealTypes: ["Snacks & Teethers", "Breakfast"],
    dietary: ["Dairy-Free", "Egg-Free", "Nut-Free", "Vegan"],
    prepTags: ["Under 15 Min", "3-5 Ingredients"],
    highlight: "BLW Friendly",
    prep: "10 min",
    minutes: 10,
    yield: "8 sticks",
    rating: 4.7,
    summary: "Soft-but-grippable sticks sized for the early palmar grasp.",
    ingredients: ["2 apples, peeled", "Pinch of cinnamon", "Splash of water"],
    steps: [
      "Cut apples into finger-width sticks.",
      "Steam 6–8 minutes until they squash between your fingers.",
      "Dust lightly with cinnamon and cool.",
      "Serve on a flat plate so baby can self-feed.",
    ],
    doctorNote: "The right softness test: it should squash easily between your thumb and finger.",
  },
  {
    id: "spinach-ricotta-muffins",
    title: "Spinach & Ricotta Egg Muffins",
    image: r4,
    age: "9m+",
    ageGroups: ["8-12m", "12m+", "Family Friendly"],
    mealTypes: ["Breakfast", "Lunches"],
    dietary: ["Nut-Free", "Gluten-Free"],
    prepTags: ["Freezer-Friendly", "Iron Boosters"],
    highlight: "Protein Rich",
    prep: "20 min",
    minutes: 20,
    yield: "9 muffins",
    rating: 4.9,
    summary: "Batch-cook once, breakfast sorted for a week.",
    ingredients: [
      "4 eggs",
      "1/2 cup ricotta",
      "1 cup finely chopped spinach",
      "2 tbsp grated cheese",
    ],
    steps: [
      "Heat oven to 180°C / 350°F and grease a mini muffin tin.",
      "Whisk eggs, fold in ricotta, spinach and cheese.",
      "Fill cups three-quarters full.",
      "Bake 15–18 minutes until set. Cool before serving.",
    ],
    doctorNote: "Well-cooked egg from around 6 months helps reduce allergy risk — no need to delay.",
  },
  {
    id: "peach-oat-puree",
    title: "Creamy Peach & Oat Puree",
    image: r5,
    age: "4–6m",
    ageGroups: ["4-6m"],
    mealTypes: ["Breakfast"],
    dietary: ["Dairy-Free", "Egg-Free", "Nut-Free", "Vegan"],
    prepTags: ["Under 15 Min", "3-5 Ingredients", "Gut Relief"],
    highlight: "Gut Relief",
    prep: "10 min",
    minutes: 10,
    yield: "3 portions",
    rating: 4.6,
    summary: "Gentle soluble fibre from oats with naturally sweet peach for easier stools.",
    ingredients: ["2 ripe peaches, peeled", "2 tbsp baby oats", "1/2 cup water or milk"],
    steps: [
      "Simmer peaches for 5 minutes until soft.",
      "Cook oats in water until creamy.",
      "Blend together to a smooth, drop-off-the-spoon texture.",
      "Cool and serve lukewarm.",
    ],
    doctorNote: "First purees should slowly slide off a tilted spoon — not run off like liquid.",
  },
  {
    id: "banana-pancakes",
    title: "3-Ingredient Fluffy Banana Pancakes",
    image: r6,
    age: "8m+",
    ageGroups: ["8-12m", "12m+", "Family Friendly"],
    mealTypes: ["Breakfast", "No-Sugar Treats"],
    dietary: ["Dairy-Free", "Nut-Free"],
    prepTags: ["Under 15 Min", "3-5 Ingredients", "Freezer-Friendly"],
    highlight: "No Added Sugar",
    prep: "12 min",
    minutes: 12,
    yield: "8 small pancakes",
    rating: 5,
    summary: "Soft, grabbable pancakes sweetened only by ripe banana.",
    ingredients: ["1 ripe banana", "2 eggs", "3 tbsp oat flour"],
    steps: [
      "Mash the banana thoroughly.",
      "Whisk in eggs and oat flour until smooth.",
      "Cook small spoonfuls in a lightly oiled pan, 2 minutes per side.",
      "Cool and cut into strips for younger babies.",
    ],
    doctorNote: "Skip honey entirely under 12 months — ripe fruit is all the sweetness needed.",
  },
  {
    id: "beef-carrot-patties",
    title: "Iron-Packed Beef & Carrot Soft Patties",
    image: r7,
    age: "9–12m",
    ageGroups: ["8-12m", "12m+", "Family Friendly"],
    mealTypes: ["Lunches"],
    dietary: ["Dairy-Free", "Egg-Free", "Nut-Free"],
    prepTags: ["Freezer-Friendly", "Iron Boosters"],
    highlight: "High Iron",
    prep: "25 min",
    minutes: 25,
    yield: "10 patties",
    rating: 4.8,
    summary: "Heme iron in a soft, self-feeding shape babies can manage.",
    ingredients: [
      "250g lean minced beef",
      "1 carrot, finely grated",
      "2 tbsp fine breadcrumbs",
      "1 tbsp olive oil",
    ],
    steps: [
      "Mix beef, carrot and breadcrumbs until well combined.",
      "Shape into small flat patties.",
      "Pan-fry gently 4–5 minutes per side until cooked through.",
      "Rest, then slice into strips for younger eaters.",
    ],
    doctorNote: "Red meat twice a week from 6 months is one of the simplest iron insurance policies.",
  },
  {
    id: "chia-berry-pudding",
    title: "Chia Seed Berry Pudding Pouch",
    image: r8,
    age: "6m+",
    ageGroups: ["6-8m", "8-12m"],
    mealTypes: ["Snacks & Teethers", "Smoothies"],
    dietary: ["Gluten-Free", "Egg-Free", "Nut-Free"],
    prepTags: ["Under 15 Min", "3-5 Ingredients", "Gut Relief"],
    highlight: "Omega-3",
    prep: "5 min",
    minutes: 5,
    yield: "2 pouches",
    rating: 4.7,
    summary: "An omega-3 packed pudding that thickens itself overnight.",
    ingredients: ["2 tbsp chia seeds", "1/2 cup milk of choice", "1/3 cup mashed berries"],
    steps: [
      "Stir chia seeds into milk and rest 10 minutes.",
      "Stir again to break up clumps, then chill 2 hours or overnight.",
      "Swirl through mashed berries.",
      "Blend smooth for younger babies or serve as is.",
    ],
    doctorNote: "Blend chia puddings smooth before 9 months so the seeds don't cling to the palate.",
  },
];

export const ageFilters = ["All Stages", "4-6m", "6-8m", "8-12m", "12m+", "Family Friendly"];
export const mealFilters = [
  "Breakfast",
  "Lunches",
  "Snacks & Teethers",
  "Smoothies",
  "No-Sugar Treats",
];
export const dietFilters = ["Dairy-Free", "Egg-Free", "Gluten-Free", "Nut-Free", "Vegan"];
export const prepFilters = [
  "⚡ Under 15 Min",
  "🥣 3-5 Ingredients",
  "❄️ Freezer-Friendly",
  "🧠 Iron Boosters",
  "💩 Gut Relief",
];
export const stripEmoji = (s: string) => s.replace(/^[^A-Za-z0-9]+/, "").trim();

export type Article = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  takeaways: string[];
  body: { heading: string; text: string }[];
  tip: string;
  relatedRecipes: string[];
};

export const articles: Article[] = [
  {
    slug: "when-to-start-finger-foods",
    title: "When to Start Finger Foods: Oral Readiness vs. Baby's Age",
    category: "Starting Solids",
    readTime: "6 min read",
    date: "12 Aug 2026",
    excerpt:
      "The calendar is a starting point, not a green light. Here are the oral-motor signs that actually matter.",
    image: r3,
    takeaways: [
      "Sitting steadily with minimal support matters more than the exact month.",
      "A fading tongue-thrust reflex signals readiness for thicker textures.",
      "Raking and early pincer grasp predict successful self-feeding.",
    ],
    body: [
      {
        heading: "Age is a guide, readiness is the rule",
        text: "Most babies show readiness for finger foods between 8 and 10 months, but the window is wide. Look at what your baby's body is doing rather than the number of months on the calendar.",
      },
      {
        heading: "The four readiness signs",
        text: "Steady trunk control, a reduced tongue-thrust reflex, active munching of a spoon, and the ability to bring objects deliberately to the mouth. When three of the four are present, soft finger foods are usually appropriate.",
      },
      {
        heading: "Start with the right shape",
        text: "Long, soft sticks roughly the size of an adult index finger are easiest to grip when the pincer grasp is still developing. Small round pieces come later, once thumb-finger precision appears.",
      },
    ],
    tip: "If your baby pushes food out with the tongue every single time, wait two weeks and re-offer. Refusal is data, not failure.",
    relatedRecipes: ["apple-cinnamon-sticks", "banana-pancakes", "beef-carrot-patties"],
  },
  {
    slug: "iron-rich-combinations",
    title: "Top 5 Iron-Rich Combinations to Maximize Infant Iron Absorption",
    category: "Nutritional Science",
    readTime: "7 min read",
    date: "28 Jul 2026",
    excerpt:
      "Iron stores run low around six months. These pairings make every spoonful count.",
    image: r1,
    takeaways: [
      "Vitamin C alongside plant iron can multiply absorption.",
      "Heme iron from meat is absorbed far more efficiently than plant iron.",
      "Offer milk between meals rather than with iron-rich meals.",
    ],
    body: [
      {
        heading: "Why six months is the turning point",
        text: "Babies are born with iron stores that begin to run down at around six months, exactly when solids begin. Iron becomes the single most important nutrient to plan for.",
      },
      {
        heading: "The five pairings",
        text: "Lentils with sweet potato, beef with tomato, fortified oats with berries, spinach with citrus-dressed avocado, and beans with bell pepper. In every pairing a vitamin C source unlocks the iron.",
      },
      {
        heading: "What blocks absorption",
        text: "Large volumes of cow's milk, tea and excess calcium at the same sitting reduce iron uptake. Keep dairy as a between-meal snack rather than the drink at an iron-focused meal.",
      },
    ],
    tip: "A squeeze of lemon or a few berries beside a lentil meal is the cheapest iron boost in your kitchen.",
    relatedRecipes: ["sweet-potato-lentil-mash", "beef-carrot-patties", "spinach-ricotta-muffins"],
  },
  {
    slug: "gagging-vs-choking",
    title: "Gagging vs. Choking: What Every Parent Needs to Know",
    category: "Oral Motor Skills",
    readTime: "5 min read",
    date: "14 Jul 2026",
    excerpt: "One is loud, red-faced and protective. The other is silent. Learn the difference.",
    image: r4,
    takeaways: [
      "Gagging is noisy and protective; choking is silent and needs immediate action.",
      "A forward-sensitive gag reflex naturally moves back over the first year.",
      "Upright seating and undistracted mealtimes reduce real risk.",
    ],
    body: [
      {
        heading: "Gagging is a skill being learned",
        text: "A gag pushes food forward and away from the airway. It looks alarming — coughing, watery eyes, a red face — but it means the protective system is doing exactly its job.",
      },
      {
        heading: "Choking looks quiet",
        text: "Silence, a bluish tinge, and ineffective coughing are the warning signs. This is an emergency requiring immediate back blows and chest thrusts.",
      },
      {
        heading: "Lowering the risk",
        text: "Always seat baby fully upright, never feed in a moving car or while walking, and modify high-risk shapes: quarter grapes lengthwise, flatten nuts into butters, and cut round sausage into strips.",
      },
    ],
    tip: "Take an infant first-aid course before starting solids. Confidence at the table changes how you feed.",
    relatedRecipes: ["apple-cinnamon-sticks", "avocado-banana-pops", "chia-berry-pudding"],
  },
  {
    slug: "textures-and-speech",
    title: "How Food Textures Support Speech & Tongue Muscle Development",
    category: "Oral Motor Skills",
    readTime: "8 min read",
    date: "02 Jul 2026",
    excerpt:
      "The same muscles that chew a soft stick shape the first words. Texture progression is speech practice.",
    image: r6,
    takeaways: [
      "Chewing builds the lateral tongue movement that speech sounds depend on.",
      "Staying on smooth purees past 9 months can delay texture tolerance.",
      "Varied textures each week keep oral-motor skills progressing.",
    ],
    body: [
      {
        heading: "Chewing is speech rehearsal",
        text: "Moving food from the centre of the tongue to the molars trains lateral tongue movement — the same control needed later for sounds like k, g and r.",
      },
      {
        heading: "The texture ladder",
        text: "Smooth puree, thick mash, soft lumps, soft finger foods, then mixed textures. Aim to move up a rung roughly every four to six weeks based on how your baby copes.",
      },
      {
        heading: "When to seek help",
        text: "Persistent refusal of all lumps beyond 10 months, frequent loss of food from the lips, or prolonged mealtimes are worth a paediatric feeding assessment.",
      },
    ],
    tip: "Offer one slightly harder texture at the start of a meal, when your baby is most alert and motivated.",
    relatedRecipes: ["banana-pancakes", "spinach-ricotta-muffins", "apple-cinnamon-sticks"],
  },
];

export const blogCategories = [
  "All",
  "Starting Solids",
  "Oral Motor Skills",
  "Nutritional Science",
  "Picky Eating",
  "Allergens",
];

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
