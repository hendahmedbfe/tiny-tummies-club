# Homepage, imagery, app promotion, and subscriber updates

## What will change

### Homepage
- Remove the “Featured today” overlay from the main image.
- Remove the entire feeding-category shortcut row, including “4–6m Purees.”
- Change “Get the free meal planner” into a smooth in-page link to the “Ultimate 100 First Foods Checklist” form.
- Replace “Browse by stage” with a simple “About Dr. Reham” section using the existing doctor photo, short introduction, and a link to the full About page.
- Add a “Best Seller Books” section above “Trending & Doctor’s Picks,” using polished placeholder book cards for now.
- Make every Trending card fill the same row height; retain the current four-column desktop layout.
- Add a Google Play promotional banner directly below Trending & Doctor’s Picks.
- Remove “As seen on Instagram” completely.

### Navigation and footer
- Remove the navbar “Get Free Meal Planner” action.
- Keep the logo fully transparent and visually flush with the header, without any surrounding fill.
- Add an official-style Google Play badge in the footer linked to the provided app listing.

### Images
- Enlarge and standardize book artwork areas across the shop, product detail page, and related-book cards; show full covers with `object-fit: contain` and consistent aspect ratios.
- Standardize recipe card images to a 16:9 frame. On large screens the image asset dimensions will be declared as 590×333px while retaining the requested four-column grid; CSS will scale the frame to each column. On small screens, every image will be centered and use the same responsive frame size.
- Use `object-fit: cover` for recipe images so they fill their frames without white gaps or borders.

### Checklist subscriptions
- Create a `subscribers` table with `id`, unique normalized `email`, and `created_at`.
- Allow public form submissions while preventing public reads, edits, and deletes.
- Validate and normalize email addresses in both the page and a server-side function before saving.
- Treat repeat submissions as a successful already-subscribed state rather than creating duplicates.
- Add submitting, success, duplicate, and error states to the form, with a clear success message and reset after a successful submission.

## Technical details
- Use Lovable Cloud for persistent subscriber storage.
- Submit through a TanStack server function with Zod validation; the browser will not receive broad database access.
- Preserve the existing visual tokens and reusable Button/Input components.
- Add `scroll-margin`/smooth behavior for the checklist anchor so the sticky header does not cover the section.

## Verification
- Check desktop and mobile homepage layouts, including section order, equal-height cards, logo, app links, and image framing.
- Submit a test email, confirm its stored row, and verify a duplicate submission is handled cleanly.
- Confirm the app builds without errors and all edited content routes retain complete page metadata.
