# Reham's Baby Bites

Act as an expert UI/UX designer and full-stack engineer. Build a complete, multi-page, modern, and highly interactive web application for "Baby Food Essentials" (associated with the Reham Emam Kids Clinic brand identity). 

The platform is a medical-grade, highly engaging recipe, feeding, and pediatric developmental nutrition website. The design inspiration is the clean, visual structure and ease of navigation of Yummy Little Belly, elevated with a trustworthy, pediatrician-backed aesthetic and modern interactive micro-components. Ensure full routing between all pages.

---

### PART 1: VISUAL IDENTITY & DESIGN SYSTEM (Extracted from Logo)

- Logo Asset: Integrate the uploaded logo in the header and footer with high-DPI scaling and clean padding.

- Color Palette:

  - Primary Accent (Rose/Pink): `#F89CAE` (for CTAs, badges, heart/favorite buttons, primary highlights)

  - Secondary Accent (Sage Green): `#5C9A68` (for nutritional/health tags, age markers, freshness badges, success states)

  - Highlight / Accent (Golden Star Yellow): `#F6C358` (for star ratings, tips, important developmental callouts, highlight ribbons)

  - Background Neutral: `#FAFAF7` (warm off-white) with pure white `#FFFFFF` for content cards and surface containers.

  - Typography Colors: Deep charcoal `#263238` for primary text; muted slate `#607274` for subheadings and metadata.

- Typography: Rounded, approachable, premium sans-serif headings (Quicksand / Fredoka / Poppins) paired with crisp body typography (Inter).

- UI Style: Soft 16px corner radiuses, subtle drop shadows (`shadow-sm` and `shadow-md` on hover), rounded pill tags, and clean hairline borders (`border-stone-100`).

---

### PART 2: GLOBAL HEADER, NAVIGATION & FOOTER

- Left Header: Brand Logo + Clinic sub-brand mark ("Baby Food Essentials by Dr. Reham Emam").

- Center Navigation Links (Route to respective pages):

  - Home

  - Recipes Hub

  - The Feeding Journal (Blog)

  - E-Books & Guides

  - About Dr. Reham

- Right Utility Bar:

  - Instant live search modal (`Cmd/Ctrl + K` trigger)

  - Bookmarks / Favorites drawer trigger with item count badge

  - Instagram & Pinterest direct links

  - CTA Button: "Get Free Meal Planner" (using Primary Rose `#F89CAE` background).

- Footer: 4-column layout (About clinic/brand, quick links, medical disclaimer: "Content is educational and does not replace personalized clinical advice", social handles, and copyright).

---

### PART 3: HOMEPAGE ARCHITECTURE

1. Hero Section: Split layout. 

   - Left: Headline: "Doctor-Backed, Wholesome & Delicious Meals for Growing Smiles". Subheading: "Evidence-based infant nutrition, speech-friendly textures, and easy parent-tested recipes..."

   - Fast Filter Chips: [🌿 4-6m Purees] [🥑 Finger Foods] [🧠 Brain & Iron Boosters] [⚡ 3-Ingredient] [🥛 Dairy-Free].

   - Right: Floating dynamic hero card showcase of featured recipes.

2. Browse by Stage Grid: Custom icon cards for First Purees (4–6m), Textures & Mashes (6–9m), Finger Foods & BLW (9–12m), Toddler Plates (12m+).

3. "Trending & Doctor's Picks" Carousel: Responsive recipe cards with high-res images, age indicator pill (`#5C9A68`), interactive bookmark button.

4. Developmental Feature Spot: Educational split banner (e.g., "Texture Transition & Chewing Development") with Golden Star callout box.

5. "As Seen on Instagram" Grid: 4-column video/reel thumbnail mockups.

6. Lead Magnet Newsletter Box: Card container with Sage Green border. "Download the Ultimate 100 First Foods Checklist." Email input and download trigger.

---

### PART 4: RECIPES HUB & INTERACTIVE ARCHIVE PAGE

1. Page Header: "Wholesome, Doctor-Backed Recipes for Every Feeding Stage". Live search input with instant result counter.

2. Multi-Tier Filter System (Horizontal/Sidebar):

   - By Age: [All Stages] [4–6m] [6–8m] [8–12m] [12m+] [Family Friendly]

   - By Meal Type: [Breakfast] [Lunches] [Snacks & Teethers] [Smoothies] [No-Sugar Treats]

   - By Dietary Needs: [Dairy-Free] [Egg-Free] [Gluten-Free] [Nut-Free] [Vegan]

   - By Prep/Nutrition: [⚡ Under 15 Min] [🥣 3-5 Ingredients] [❄️ Freezer-Friendly] [🧠 Iron Boosters] [💩 Gut Relief]

3. Recipe Grid (3-4 Columns): 

   - Hover zoom effect (1.03x). Top badges for Age (`#5C9A68`) and Save-to-Favorites.

   - Meta info: Prep time, Yield, Star Rating, Nutritional Highlight Tag (`#F6C358`).

4. "Doctor’s Feeding Tip" Ribbon: Inserted mid-grid (e.g., "💡 Dr. Reham's Texture Tip: Cut foods into adult index finger sizes...").

5. Pre-Populate 8 Mock Recipes:

   - Sweet Potato & Red Lentil Iron Mash (6-8m, High Iron, 15m)

   - Avocado Banana Teething Frozen Pops (6m+, Dairy-Free, 5m)

   - Steamed Apple Cinnamon Finger Sticks (8-12m, BLW, 10m)

   - Spinach & Ricotta Egg Muffins (9m+, Freezer Friendly, 20m)

   - Creamy Peach & Oat Puree (4-6m, Gut Relief, 10m)

   - 3-Ingredient Fluffy Banana Pancakes (8m+, No Sugar, 12m)

   - Iron-Packed Beef & Carrot Soft Patties (9-12m, High Iron, 25m)

   - Chia Seed Berry Pudding Pouch (6m+, Gluten-Free, 5m)

6. Recipe Detail View (Modal/Page): Includes Servings Scaler (1x, 2x, 3x), checkable ingredients, numbered step-by-step instructions with progress boxes.

---

### PART 5: E-BOOKS & DIGITAL GUIDES SHOP PAGE

1. Page Header: "Doctor-Crafted Guides & Meal Planners for Stress-Free Feeding". Trust badges (Instant Download, Optimized for Mobile, Doctor-Reviewed).

2. Category Tabs: [All] [Recipe E-Books] [Meal Planners] [Starter Trackers] [Value Bundles].

3. Featured Bestseller Spotlight: 2-column layout. Left: 3D book mockup of "100 Delicious Meals for Babies Under One". Right: 4.9/5 stars, Price crossed out ($24.99 -> $14.99), Checklist of features, and large Rose CTA "Buy Now – Instant PDF Access".

4. Product Catalog Grid (3-Column):

   - "Toddler's First Words & Speech Feeding Log" ($9.99)

   - "200 Delicious Meals for Babies Under One" ($19.99)

   - "The 4-Week Starting Solids Starter Kit & Meal Planner" ($12.99)

   - "The Ultimate Feeding Bundle" ($29.99)

5. Value Matrix: 4-box grid explaining (📱 Read Anywhere, ⏱️ Quick & Easy, 🥦 Nutrient-Dense, ❄️ Batch Cooking).

6. Parent Reviews Carousel & Expandable FAQ Accordion.

7. Simulated Checkout Modal: Triggered on "Buy Now", simulates instant PDF download.

---

### PART 6: THE FEEDING JOURNAL (BLOG) PAGE

1. Header & Filters: "The Feeding & Development Journal". Filter pills: [All] [Starting Solids] [Oral Motor Skills] [Nutritional Science] [Picky Eating] [Allergens].

2. Featured Post Hero Card: Split layout with large image, "Doctor's Pick" badge, read time, date, and CTA.

3. Article Grid (3-Column): Featured thumbnail, category badge, title, summary, read time, and "Dr. Reham Emam" avatar.

4. Single Article View Template:

   - "Doctor's Key Takeaways" box at the top (soft green `#EAF2EC` with 3 bullet points).

   - "Doctor's Tip" callouts (`#F6C358`). Contextual "Related Recipes" inline carousel.

   - Author Bio box at the bottom.

5. Pre-Populate 4 Articles:

   - "When to Start Finger Foods: Oral Readiness vs. Baby's Age"

   - "Top 5 Iron-Rich Combinations to Maximize Infant Iron Absorption"

   - "Gagging vs. Choking: What Every Parent Needs to Know"

   - "How Food Textures Support Speech & Tongue Muscle Development"

---

### PART 7: ABOUT DR. REHAM (PROFILE PAGE)

1. Hero Section (2-Column): Left: "👋 Meet The Doctor". Main headline: "Hi, I'm Dr. Reham Emam — Physician, Pediatric Nutrition Specialist & Advocate for Happy Mealtimes." Two CTAs. Right: Large portrait placeholder with rounded edges and "★ Trusted by Thousands" badge overlay.

2. My Story & Mission: Warm narrative paragraphs. Blockquote with `#5C9A68` left border: "Starting solids shouldn't feel like a medical test..."

3. Clinical Philosophy Grid (3 interactive cards): "Evidence-Based Nutrition", "Oral Motor & Texture Readiness", "Parent-Friendly Simplicity".

4. Trust & Authority Bar: Stat counters [100+ Doctor-Approved Recipes] [10k+ Community] [100% Evidence-Based].

5. Instagram Follow Box & Bottom CTA Banner ("Start with our free 100 First Foods Checklist").

---

### PART 8: TECHNICAL & FUNCTIONAL REQUIREMENTS

- Framework: React (or preferred Lovable stack) with Tailwind CSS. Ensure comprehensive, working routing between Home, Recipes, Blog, E-Books, and About pages.

- State Management: Implement LocalStorage for the Favorites/Bookmark system so liked recipes persist.

- Real-Time Search: The Recipe Hub filter must work dynamically without page reloads.

- Mobile First: Sticky bottom navigation on mobile, horizontally scrollable filter tabs on small screens, and perfect touch targets.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://tiny-tummies-club.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/deeb19f2-4ca1-47b9-92ff-e769f643f844).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
