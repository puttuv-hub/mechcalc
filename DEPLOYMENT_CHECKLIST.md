# MECHCALC — Final GitHub Pages Deployment Checklist

## Before upload

- Use the final **MECHCALC GitHub Ready** package, not an older subject checkpoint.
- Keep `index.html`, `style.css`, `calculator.css`, JavaScript files and every calculator HTML file at repository root level.
- Do not place the website inside an extra nested folder in the GitHub repository.
- Keep `.nojekyll`, `robots.txt` and `sitemap.xml` at repository root.

## GitHub upload

1. Open the `puttuv-hub/mechcalc` repository.
2. Replace the old site files with the contents of the final GitHub-ready package.
3. Confirm `index.html` is visible at the repository root.
4. In **Settings → Pages**, publish from `main` and `/(root)`.
5. Wait for the GitHub Pages deployment to finish.

## Live-site verification

After deployment, open `https://puttuv-hub.github.io/mechcalc/` and verify:

- Homepage loads correctly.
- Search finds calculators by name/description.
- Every subject filter shows its calculators.
- Unit Converter and Engineering Resources open correctly.
- Login, Sign Up, Password Reset and Logout work.
- Saving a calculation works while signed in.
- Calculation History loads for the signed-in user.
- Mobile navigation/layout remains usable.
- `https://puttuv-hub.github.io/mechcalc/sitemap.xml` opens successfully.
- `https://puttuv-hub.github.io/mechcalc/robots.txt` opens successfully.

## Search Console

Ownership was previously verified. After the final deployment, submit or resubmit:

`https://puttuv-hub.github.io/mechcalc/sitemap.xml`

## Final package counts

- Categorized calculators: **313**
- HTML pages: **316**
- Sitemap URLs: **316**
- Homepage subject filters: **15 subject categories + All**

See `FINAL_AUDIT.md` for the static validation report.
