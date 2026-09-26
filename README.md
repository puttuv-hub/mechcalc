# MECHCALC

Mechanical engineering calculator website built as a static HTML/CSS/JavaScript project.

## GitHub Pages readiness

This package is arranged so `index.html` is at the repository root and can be published directly with GitHub Pages.

### Included

- Finalized `style.css` homepage/site design
- Shared `calculator.css`
- 252 categorized mechanical engineering calculators across thirteen subject groups
- Engineering Unit Converter
- Engineering Resources page
- `robots.txt`
- `sitemap.xml`
- `.nojekyll`
- `.gitignore`
- Deployment checklist
- Site audit report

## Validation completed

- All expected MECHCALC pages are present.
- No missing local HTML/CSS links were found.
- All inline JavaScript passed syntax checking.
- All JSON-LD blocks parsed successfully.
- Accidental Markdown code fences were removed from previously affected HTML files.
- The original design files were preserved; no redesign was applied.

## Calculator coverage

- Mechanics: 7
- Engineering Mechanics: 21
- Strength of Materials: 21
- Thermodynamics: 23
- Heat Transfer: 18
- Theory of Machines: 25
- Machine Design: 21
- IC Engines: 22
- Refrigeration & Air Conditioning: 27
- Fluid Machinery / Turbomachinery: 25
- Manufacturing / Production Engineering: 29
- Fluid Mechanics: 11
- Hydraulic & Pump: 2

Total categorized calculators: **252**.

The project also includes the Engineering Unit Converter and Engineering Resources pages.

## GitHub Pages deployment

Upload the **contents of this folder** to the root of your GitHub repository. Keep `index.html`, `style.css`, `calculator.css`, and all calculator pages at the top level.

Then configure GitHub Pages to publish the `main` branch from `/(root)`.

## SEO note

`robots.txt` and `sitemap.xml` are included. Once the final public GitHub Pages URL or custom domain is known, update the sitemap/robots URLs to the final absolute public URLs before submitting the sitemap to a search engine.

## Live Website

https://puttuv-hub.github.io/mechcalc/

## Authentication

MECHCALC includes a Firebase Authentication front end for Email/Password Sign Up, Login, Logout, and Password Reset.

The Firebase web configuration is already connected through `firebase-config.js` and `firebase-client.js`. Email/Password Authentication and Firestore must remain enabled in the Firebase project.


## Strength of Materials visual expansion
Added 18 B.Tech-focused Strength of Materials problem solvers with step-by-step calculations and engineering diagrams, including beam reactions, deflection, SFD/BMD, torsion, principal stress/Mohr's circle, columns and pressure vessels.


## Thermodynamics expansion
Added 23 B.Tech Thermodynamics calculators with step-by-step solutions and visual process/device diagrams.


## Heat Transfer expansion
Added 18 B.Tech Heat Transfer calculators covering conduction, convection, radiation, fins, heat exchangers, transient conduction and thermal resistance networks.

## Theory of Machines expansion
Added 25 B.Tech Theory of Machines problem solvers covering mechanisms, slider-crank/four-bar kinematics, gears, belts, cams, flywheels, governors, balancing, gyroscopic effects and mechanical vibration. Every new page includes a visual engineering diagram and step-by-step result output.


## Machine Design expansion
Added 21 interactive Machine Design calculators in the current offline checkpoint.

## IC Engines Expansion
Added 22 dedicated IC-engine problem-solving calculators. See `IC_ENGINES_EXPANSION_GUIDE.md`.


## Refrigeration & Air Conditioning expansion
Added 27 interactive RAC calculators in the current offline checkpoint.


## Fluid Machinery / Turbomachinery expansion
Added 25 visual, step-by-step calculators in the offline build.


## Manufacturing / Production Engineering expansion
Added 29 new interactive calculators. See `MANUFACTURING_EXPANSION_GUIDE.md`.


## Engineering Mechanics expansion
Added 21 visual, step-by-step Engineering Mechanics calculators covering statics, force systems, friction, trusses, centroids, kinematics, work-energy, impulse-momentum, collisions and pulley dynamics.


## Engineering Materials / Metallurgy Expansion

Added 29 interactive materials calculators covering crystal structure, mechanical testing, hardness, strengthening, fracture/fatigue, creep, diffusion, phase diagrams, composites, thermal expansion and corrosion.

All pages preserve the existing MECHCALC design and load `saved-calculations.js` for authenticated Firestore saving.
