# MECHCALC

MECHCALC is a static HTML/CSS/JavaScript mechanical-engineering calculator website designed for B.Tech students, exam preparation and practical engineering calculations.

## Final integrated build

- **313 categorized calculators**
- **316 HTML pages** in total
- Engineering Unit Converter
- Engineering Resources page
- Search and subject filters on the homepage
- Firebase Email/Password Authentication
- Firestore Save Calculation / Calculation History support
- SEO metadata, canonical URLs, `robots.txt` and `sitemap.xml`
- GitHub Pages ready for `https://puttuv-hub.github.io/mechcalc/`

## Calculator coverage

| Category | Calculators |
|---|---:|
| Mechanics | 7 |
| Engineering Mechanics | 21 |
| Strength of Materials | 21 |
| Thermodynamics | 23 |
| Heat Transfer | 18 |
| Theory of Machines | 25 |
| Machine Design | 21 |
| Manufacturing / Production Engineering | 29 |
| Engineering Materials / Metallurgy | 29 |
| Industrial Engineering / Operations Research | 32 |
| IC Engines | 22 |
| Refrigeration & Air Conditioning | 27 |
| Fluid Machinery / Turbomachinery | 25 |
| Fluid Mechanics | 11 |
| Hydraulic & Pump | 2 |
| **Total** | **313** |

The project also contains `unit-converter.html` and `engineering-resources.html`, giving **316 HTML pages** including `index.html`.

## Design preservation

The established MECHCALC design is retained. The shared `style.css` and `calculator.css` remain the base design files. Subject-specific CSS files extend calculator diagrams and layouts without replacing the base design.

## Firebase / Firestore

The project uses Firebase Authentication and Firestore through:

- `firebase-config.js`
- `firebase-client.js`
- `auth.js`
- `saved-calculations.js`
- `account-history.js`

The existing Firebase project configuration is preserved. Email/Password Authentication and Firestore must stay enabled in the Firebase console, and `puttuv-hub.github.io` must remain an authorized domain.

## GitHub Pages deployment

Upload the **contents of this folder** to the root of the `puttuv-hub/mechcalc` repository. `index.html`, CSS, JavaScript and calculator HTML files should be at repository root level.

Publish GitHub Pages from:

- Branch: `main`
- Folder: `/(root)`

Live site target: `https://puttuv-hub.github.io/mechcalc/`

## Final validation

The final integration audit checks:

- calculator-card and subject-filter consistency
- duplicate homepage links/titles
- local HTML/CSS/JS references
- JavaScript syntax
- JSON-LD parsing
- canonical/meta coverage
- sitemap coverage
- Firebase/Firestore client dependencies
- HTTP loading of every HTML page

See `FINAL_AUDIT.md` for the final audit result and scope.
