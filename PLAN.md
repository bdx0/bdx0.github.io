# Project Plan - Blog



## Tasks

### Completed Tasks:

- **[2025-11-11] Integrated 'Tektur' font globally and removed SVG inline style.**
  - **Details:** Added 'Tektur' font import to `app/layout.tsx` using `next/font/google` and removed the `<style>` block from `public/bdx0-logo.svg` to leverage global font loading.
- **[2025-11-11] Fixed SVG rendering error.**
  - **Details:** Escaped an ampersand in the Google Fonts URL within `public/bdx0-logo.svg` to resolve an XML parsing error.
- **[2025-11-08] Reviewed and improved contrast for UI elements.**
  - **Details:** Updated `--ui-line` color from `#2B2E34` to `#444954` in `blog/app/globals.css` to increase contrast for table borders, meeting WCAG AA for non-text contrast.
- **[2025-11-08] Ensured all text elements meet WCAG AA standards.**
  - **Details:** Reviewed all text colors and font sizes in `blog/app/globals.css` and confirmed that they meet the WCAG AA contrast requirements.
- **[2025-11-08] Optimized font loading and rendering for better performance.**
  - **Details:** Replaced Google Fonts `<link>` with `next/font/google` in `app/layout.tsx` and updated `tailwind.config.js` to use the new font variables.
- **[2025-11-08] Implemented a mechanism for users to report accessibility issues.**
  - **Details:** Added a "mailto" link to the footer in `app/layout.tsx` to allow users to easily report accessibility issues.
- **[2025-11-08] Verified contrast on running application.**
  - **Details:** Navigated to http://localhost:4000/ and visually confirmed that text and UI element contrasts are satisfactory based on previous analysis and changes.
- **[2025-11-08] Addressed "two titles" feedback.**
  - **Details:** Changed the "Blog Posts" HUDTitle level from h1 to h2 in `app/page.tsx` to reduce its prominence and avoid redundancy with the site's main title.
- **[2025-11-08] Fixed duplicate titles on blog post pages.**
  - **Details:** Removed the explicit h1 and p tags for the title and date from `app/[slug]/page.tsx` to prevent duplicate content, as the title and date are already rendered from the MDX content.


- **[2025-11-12] Created a new blog post about Kubernetes analysis.**
  - **Details:** Wrote a detailed analysis of Kubernetes, including its architecture, benefits, and challenges, and saved it as `content/blog/phan-tich-kubernetes.md`.


- **[2025-11-12] Created a new blog post about Kubernetes Master Node analysis.**
  - **Details:** Wrote a detailed analysis of the Kubernetes Master Node, including its components and their roles, and saved it as `content/blog/phan-tich-master-node-kubernetes.md`.


- **[2025-11-12] Made blog post tags clickable and created tag-specific pages.**
  - **Details:** Modified `app/[slug]/page.tsx` to wrap tags in `next/link` components, and created `app/tags/[tag]/page.tsx` to display filtered blog posts for each tag.
  - **Fixes:** Resolved `TypeError` by ensuring `post.tags` is an array, explicitly decoded URL `tag` parameter, and fixed `ReferenceError` by using `decodedTag` for display. Ensured case-insensitive tag matching.
  - **UI Improvement:** Modified `app/tags/[tag]/page.tsx` to display posts in a more minimalist/compact way by changing the title variant to "h6", reducing the bottom margin, and displaying the `publish_date` instead of the description.


### Upcoming Tasks:

## Notes
- This plan will be updated regularly to reflect ongoing development.
- **[2025-11-08] Verified fix for low contrast for unordered list markers in Markdown content.

**
## DEV NOTES

The user asked if it's possible to display post lists in a minimalist or compact size. I've demonstrated this by modifying the project listing page (app/projects/page.tsx) to make the project cards more compact and minimalist.

Changes made to app/projects/page.tsx:
- Reduced the gap between project cards from 'gap-4' to 'gap-2'.
- Changed the Card component to use 'variant="outlined"' and a subtle hover effect ('borderColor: primary.main') instead of a box shadow.
- Reduced padding within CardContent using 'sx={{ py: 1, px: 2 }}'.
- Adjusted Typography variants for title (h5 to h6) and description (body1 to body2) for smaller text.

This provides a concrete example of how to achieve a minimalist/compact display.

