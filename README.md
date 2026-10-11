# MommiEnglish website

Static site (HTML/CSS/JS, no build step). Open `index.html` in a browser to view it.

## Files
- `index.html` top · `mama.html` moms' lessons · `smilingual.html` kids' school · `lounge.html` ME Lounge · `materials.html` materials · `activity.html` books/talks/events
- `css/style.css` all styles (brand colors are at the top in `:root`)
- `js/main.js` menu, buttons, fade-in
- `images/` all images

## Before launch
1. **LINE / Google Form links** — paste the URLs into `LINKS` at the top of `js/main.js`. Every button updates automatically. Until then, buttons show "ただいま準備中です".
2. **Company info & legal pages** — add to the footer (search for `会社情報` / `プライバシーポリシー` comments). A 特定商取引法 page is legally required for paid online services.
3. **Hidden sections** — content that wasn't confirmed is left out, with an HTML comment marking where it goes. Search the HTML for `ここに追加` to find them all (testimonials, founder name, curriculum, FAQ answers, plus age, event cards, etc.).
4. **Domain** — once decided, add the `canonical` and `og:image` tags (see the comment in each page's `<head>`).
5. **After 2027-01-31** — delete the campaign block in `smilingual.html` (marked `キャンペーン枠`).

## Shared parts
The header, side panels, contact block and footer are repeated in each of the 6 pages. When changing the menu or footer, update all 6 files.

## Publishing
Upload the whole `site` folder to any static host, e.g. Netlify (drag & drop at app.netlify.com/drop), Cloudflare Pages, or GitHub Pages.
