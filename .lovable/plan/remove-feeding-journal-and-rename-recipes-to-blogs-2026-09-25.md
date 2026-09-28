# Remove Feeding Journal and Rename Recipes to Blogs

## Scope

- Remove the Feeding Journal homepage content, navigation entries, search group, and both journal route files.
- Rename the Recipes Hub page to Blogs, move it from `/recipes` to `/blogs`, and update every site link and visible label.
- Update imported article links so they resolve to `/blogs` instead of the removed journal routes.
- Remove outer spacing and muted framing from homepage bestseller covers so each cover fills its image area edge to edge.
- On book detail pages, remove the “What’s inside” heading and filter imported descriptions to remove card/Apple Pay prompts and their linked payment buttons.

## Verification

- Confirm `/blogs` loads, `/journal` and journal article paths no longer exist, and no visible journal or Recipes Hub references remain.
- Check bestseller covers and book details on desktop and mobile.
- Confirm the app builds without route or type errors.

## Technical details

- Rename the TanStack route file itself so the generated route tree owns `/blogs`; do not edit the generated route tree.
- Sanitize product description HTML before rendering, targeting payment-callout headings and Lemon Squeezy/card-payment links without removing ordinary book content.