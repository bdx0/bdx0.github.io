# Project Plan - Blog



## Tasks

### Completed Tasks:

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


### Upcoming Tasks:

## Notes
- This plan will be updated regularly to reflect ongoing development.
- **[2025-11-08] Verified fix for low contrast for unordered list markers in Markdown content.
- **[2025-11-08] Merged .gitignore_1 into .gitignore and removed .gitignore_1.**
- **[2025-11-08] Merged README_1.md into README.md and removed README_1.md.**

**
