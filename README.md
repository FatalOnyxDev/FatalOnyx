# FatalOnyx Premium Portfolio

A responsive, premium Obsidian Black, Graphite & Champagne portfolio built with plain HTML, CSS, and JavaScript. It runs without a build step or package installation, so it is easy to preview and deploy on static hosting.

## Brand palette

- Obsidian Black: `#090A0C`
- Graphite: `#1A1B1E`
- Champagne Gold: `#B99A62`
- Soft Platinum: `#EAD9B5`

Gold is reserved for key accents, calls to action, and small interface details to keep the overall look restrained and professional.

## Run locally

1. Extract the ZIP.
2. Open the `fatalonyx-portfolio` folder.
3. Double-click `index.html`, or serve the folder with a local static server.

Optional local server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Edit your portfolio

Open `config.js`. This is the central content file.

- `availability`: the short status shown in the hero.
- `technologies`: list only technologies you actually use.
- `contact`: add your real Discord username/link, email, GitHub URL, and other confirmed links. Empty values are intentionally hidden.
- `projects`: add genuine projects and screenshots.
- `experience`: reserved for verified timeline content; no fabricated experience is displayed.
- `testimonials`: reserved for genuine feedback with permission.
- `formEndpoint`: leave blank until you have a real endpoint.

### Add a project

Add an object to the `projects` array:

```js
{
  title: "Your real project name",
  category: "plugin", // plugin | server | discord | event
  description: "A short, accurate description of what you built.",
  image: "assets/my-project.webp",
  imageAlt: "Screenshot of the project",
  technologies: ["Java", "Paper API"],
  url: "https://example.com"
}
```

Place the screenshot inside `assets/`. Do not add projects that are not yours or that you cannot substantiate.

### Configure contact

Example:
```js
contact: {
  discordUsername: "your_username",
  discordUrl: "https://discord.com/users/your-id",
  email: "you@example.com",
  github: "https://github.com/your-account",
  otherLinks: []
}
```

Replace all examples with your actual details. The site intentionally does not invent contact information.

### Connect the contact form

The form currently runs in honest demo mode. It validates the required fields and attempts to copy the enquiry summary, but it does not claim to send anything.

To enable real submissions:
1. Set up a form provider or your own backend endpoint that accepts JSON POST requests.
2. Configure CORS and server-side spam protection / rate limiting.
3. Set `formEndpoint` in `config.js` to the real HTTPS endpoint.
4. Test successful and failed submissions before publishing.

Do not put private API keys or secrets in `config.js`; it is a public client-side file.

## Build and deploy

There is no build command because this is a static site.

Upload the contents of this folder to any static web host (for example, GitHub Pages, Netlify, Cloudflare Pages, or your own web server). Configure the deployed domain in your hosting provider. If you later add a canonical URL or sitemap, use your real domain.

## Included features

- Sticky navigation and working mobile menu
- Smooth in-page navigation and active section state
- Responsive layouts for desktop, tablet, and mobile
- Reduced-motion support
- Scroll reveal effects
- Editable service and skills content
- Project category filters and data-driven project cards
- Empty states instead of fabricated projects, experience, or testimonials
- Configurable contact details
- Required-field and email validation
- Honest contact form demo mode, with optional real endpoint integration
- SEO title, description, Open Graph basics, and favicon

## Notes

Google Fonts are loaded remotely. If you prefer fully offline operation, download and self-host the fonts and update the font declarations in `styles.css` and `index.html`.

## Admin panel (no coding required for common edits)

1. Open `admin.html` in your browser.
2. Edit your brand details, availability, technologies, Discord/contact details, projects, experience, and testimonials.
3. For Projects, Experience, and Testimonials, enter valid JSON arrays. The panel includes the current content as examples.
4. Click **Download config.js**.
5. Replace the existing `config.js` in the `fatalonyx-portfolio` folder with the downloaded file.
6. Refresh `index.html` to see the changes.

This is a local static-site editor, not a hosted secure admin system. It exports a replacement configuration file; it does not directly write files or publish changes to a web host. Do not expose it as a password-protected online admin panel without adding a real authenticated backend.


### Project screenshot uploads
Open `admin.html`, then use **Projects & screenshot uploader** to add a project and select up to 8 PNG/JPG/WEBP screenshots (4 MB each). The first image is used as the project cover; visitors can scroll through the screenshot strip on the project card. Click **Download config.js**, replace the existing `config.js`, and refresh `index.html`. Uploaded images are embedded as data URLs in `config.js`, so no separate assets-folder copy is required. Large images increase the config file size; resize screenshots before uploading for best performance.
