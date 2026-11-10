# MAE. website

Plain HTML, CSS and JavaScript. No build step.

## Run it

```bash
python3 -m http.server 5178 --directory "/Users/maebrymagilke/MAE./site"
```

Then open http://localhost:5178. Double-clicking `index.html` also works.

## Pages

| Page | File |
|---|---|
| Home (magazine cover, fit tiles, sports map, Judges 8:4) | `index.html` |
| Our Why | `our-why.html` |
| Shop | `shop.html` |
| Court & Field (basketball, soccer, tennis, volleyball) | `court-field.html` |
| Run & Lift (running, lifting) | `run-lift.html` |
| Community / The 300 | `community.html` |
| Drop 01. The plan. | `drop-01.html` |
| Checkout + pre-order confirmation | `checkout.html` |

## Change things

- **Prices, product names, colors:** `PRODUCTS` at the top of `js/mae.js`. The Drop 01 price row is typed in `drop-01.html`.
- **Real payments:** set `CONFIG.checkoutUrl` in `js/mae.js` to a Stripe Payment Link or Shopify checkout URL. Until then, checkout reserves a pre-order and charges nothing.
- **"Why it's made this way" lines:** `FITS` in `js/mae.js`.
- **Map pins (sport, place, which fit):** `SPORTS` in `js/mae.js`.
- **Hero video:** swap `assets/video/court-hero.mp4` (keep it short, muted, under about 6 MB).
- **Colors and fonts:** the tokens at the top of `css/mae.css`.

## Placeholders to replace

- Product images are sketches labeled `[Mockup]`. "Close-up coming" squares sit inside each "why" line.
- The hero video and court stills are filler from a streetball screen recording. Replace them before the site goes public.
- Email sign-ups (Join The 300, Notify me) save only in the visitor's browser. Connect a real list (Mailchimp, ConvertKit, Shopify) before launch.
