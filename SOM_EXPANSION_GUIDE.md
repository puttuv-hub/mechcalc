# MECHCALC — Strength of Materials Visual Expansion

This update expands the Strength of Materials category from 3 calculators to 21 calculators.

## New calculators

1. Axial Deformation — `axial-deformation.html`
2. Thermal Stress — `thermal-stress.html`
3. Poisson's Ratio — `poissons-ratio.html`
4. Elastic Constants — `elastic-constants.html`
5. Section Properties — `section-properties.html`
6. Bending Stress — `bending-stress.html`
7. Beam Shear Stress — `beam-shear-stress.html`
8. Circular Shaft Torsion — `torsion-shaft.html`
9. Principal Stress & Mohr's Circle — `principal-stress.html`
10. Thin Cylinder Stress — `thin-cylinder.html`
11. Thin Spherical Shell — `thin-spherical-shell.html`
12. Euler Column Buckling — `euler-buckling.html`
13. Rankine Column Load — `rankine-column.html`
14. Axial Strain Energy — `strain-energy.html`
15. Direct Shear Stress — `direct-shear-stress.html`
16. Simply Supported Beam Reactions — `beam-reactions.html`
17. Beam Deflection — `beam-deflection.html`
18. SFD & BMD Visualizer — `sfd-bmd.html`

The existing Stress, Strain and Young's Modulus calculators remain unchanged.

## Shared file added

- `som.css` — styles only the new Strength of Materials diagrams/visual components. It does not redesign the existing MECHCALC site.

## Existing files updated

- `index.html` — adds the new calculator cards and formulas.
- `sitemap.xml` — adds all new public calculator URLs.
- `README.md` — notes the Strength of Materials expansion.

## GitHub upload

Upload every file from the update ZIP to the root of the existing `mechcalc` repository. Allow `index.html`, `sitemap.xml`, and `README.md` to replace the older versions. All new HTML files and `som.css` should be added.

## Firestore

All new calculator pages load the existing `saved-calculations.js`, so signed-in users can save completed results to their existing MECHCALC calculation history.
