# Amped Electrical Solutions — Website

A 4-page static site (Home, Services, About, Contact) built with plain HTML/CSS/JS — no build step, no framework, works on any basic web host.

## Before you launch — placeholder content to replace

Everything below currently uses **placeholder values**. Search each file for these and replace them (a find-and-replace across all `.html` files works well):

| Placeholder | Found in | Replace with |
|---|---|---|
| `(307) 267-3299` / `+13072673299` | every page, header + footer + call bar | Your real business phone number (keep the `tel:+1XXXXXXXXXX` format in `href`) |
| `info@ampedelectricalsolutions.com` | footer, contact page | Your real business email |
| "Wheatland, WY & All of Platte County" | header badges, footer, contact page | Your real service area, if different |
| "Mon–Fri 8am–5pm · Emergency Service 24/7" | footer, contact page | Your real hours |
| "Our Story" paragraphs on `about.html` | about page | Your own background/story |
| `1155 South St, Wheatland, WY 82201` | footer (all pages), `about.html`, `contact.html` | Your real business address, if it changes |

## Adding your logo

Save your two logo files into `assets/images/`:

- `logo-main.png` — the full badge logo (used in the header and footer)
- `logo-icon.png` — the lightning-bolt circle mark (used as the favicon and hero graphic)

The site already references these exact filenames — once the files exist at that path, they'll appear automatically. If a file is missing, the header/footer gracefully falls back to a plain text version of the name instead of showing a broken image.

## Updating the map

`about.html` and `contact.html` both embed a live Google Map pinned to `1155 South St, Wheatland, WY 82201` — no API key required, using Google's `output=embed` URL format. If the business address ever changes, update it in two places per file:

1. The visible address link (`https://www.google.com/maps/search/?api=1&query=...`)
2. The map `<iframe src="https://www.google.com/maps?q=...&output=embed">`

Just swap the address in both URLs (keep spaces as `+`). The same address link also appears in the footer of every page.

## Connecting the contact form

The contact form on `contact.html` currently points to a **placeholder** Formspree endpoint and will not deliver messages until you connect a real one:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form and copy the form endpoint it gives you (looks like `https://formspree.io/f/abc123xyz`).
3. In `contact.html`, find this line and replace `YOUR_FORM_ID` with your real ID:
   ```html
   <form id="contact-form" class="form-grid" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. Formspree will email you a confirmation link the first time someone submits — click it to activate the form.

Until this is set up, the form will still validate input client-side, but submissions won't reach an inbox — that's intentional (the site doesn't fake a "sent" confirmation for a form that isn't wired up).

**Alternative:** if you'd rather not use Formspree, any similar "form backend" service (Netlify Forms if hosting on Netlify, Basin, GetForm, etc.) works the same way — just swap the `action` URL.

## Deploying the site

The site is already built assuming it will live at **ampedelectricalsolutions.com** — every canonical link tag, Open Graph image, and `sitemap.xml`/`robots.txt` entry points there.

Simplest option — **Netlify**:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `amped-electrical` folder onto the page
3. Netlify gives you a temporary URL immediately; go to Site settings → Domain management → Add a domain, and follow Netlify's instructions to point `ampedelectricalsolutions.com` at it (this means updating DNS records with whoever the domain is registered through)

Alternative — any basic web host: upload the contents of this folder (not the folder itself) to your host's root/`public_html` directory via FTP or their file manager, and make sure the domain's DNS points to that host.

If the site ever moves to a different domain, update the `https://ampedelectricalsolutions.com/...` URLs in each page's `<head>` (canonical + Open Graph tags), plus `sitemap.xml` and `robots.txt`.

## Notes on design decisions

- **18px base body text** (larger than the typical 16px default) for easier reading — this was a deliberate choice for an older audience, not an oversight.
- **Sticky "Call Now" bar** appears at the bottom of the screen on mobile devices, so the phone number is always one tap away.
- **No dark mode** — kept to a single, high-contrast light theme since that's generally easiest for older users and simplest to maintain.
- **No animations beyond subtle hover/press states**, and all motion respects `prefers-reduced-motion`.
