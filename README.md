# FutureLearn Coaching Website Demo

A responsive, multi-page coaching-class website built with plain HTML, CSS and JavaScript.

## Pages
- `index.html` — home page
- `about.html` — about and teaching approach
- `courses.html` — sample course cards with working category filters
- `faculty.html` — faculty profile layout
- `gallery.html` — image gallery layout
- `reviews.html` — ethical review/achievement placeholder (no invented testimonials)
- `contact.html` — enquiry form, contact details and Google Maps embed

## Run locally
1. Extract the ZIP file.
2. Open the `futurelearn-coaching-demo` folder.
3. Double-click `index.html`, or open the folder in VS Code and use the Live Server extension.
4. An internet connection is needed for Google Fonts, stock images and the embedded Google Map. The site layout itself is local.

## Customize before showing to a real coaching institute
Open `js/config.js` and replace:
- `brandName` and `tagline`
- `whatsappNumber` — digits only with country code, e.g. India: `91` + 10-digit number
- `phoneDisplay` and `phoneLink`
- `email`
- `address`
- `mapQuery`

Then update each page's course list, faculty names, course details, fee/schedule details and images as appropriate. Search for `FutureLearn`, `Faculty Member`, and `placeholder` in the project to find demo content.

## Enquiry form behaviour
This is a front-end-only demo:
- Browser validation runs on required fields.
- If a real WhatsApp number is configured, submitting prepares an enquiry message and opens WhatsApp.
- The visitor must press Send in WhatsApp.
- No data is sent to or saved by this website, and no backend is included.
- For email/database submissions, connect a trusted backend or form service and add appropriate privacy/security handling.

## Important content notes
- Counter values are illustrative.
- Stock images are for demonstration and are loaded from Unsplash.
- Faculty names, contact details, location and achievements are placeholders.
- The review page intentionally contains no fabricated testimonials.
- Replace all placeholders with accurate, permissioned information before a real client launch.

## Deployment
You can deploy the static folder to GitHub Pages, Netlify, Vercel or standard static hosting. Upload the contents of this folder while preserving the `css` and `js` directories.
