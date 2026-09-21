# CODE SMITHS

> A polished project-delivery landing page for BCA and BTech students, built with vanilla HTML, CSS and JavaScript and connected to Firebase for lead capture, visitor tracking and configurable WhatsApp contact.

## 🌐 Overview

**CODE SMITHS** is a responsive service website designed around student project requirements. It presents services, pricing plans, delivery workflow, testimonials, FAQs and a contact flow in a single modern landing page.

The site is built as a lightweight frontend application with no framework or build step.

## ✨ Features

- 🎨 Responsive, modern landing-page UI
- 📱 Mobile navigation and responsive layouts
- 💼 Services section for project websites, source code, documentation and presentations
- 💰 Pricing plans with interactive plan-selection dialog
- 📝 Project enquiry form
- 🔥 Firebase Firestore integration for enquiry/lead storage
- 📊 Firebase Analytics integration when supported by the browser
- 👥 Visitor and unique-reach tracking using a browser device ID
- 💬 Configurable WhatsApp contact link
- ❓ Interactive FAQ accordion
- ⚡ Lightweight vanilla JavaScript implementation
- 🎯 Smooth hover and entrance animations
- ♿ Semantic HTML, labels and keyboard-friendly dialog controls

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and semantic content |
| CSS3 | Responsive design, layout, animations and styling |
| JavaScript (ES Modules) | Interactions, form handling and Firebase integration |
| Firebase Firestore | Lead/enquiry storage and site statistics |
| Firebase Analytics | Website analytics |
| WhatsApp | Customer enquiry/contact flow |
| Google Fonts | Syne and DM Sans typography |

## 📂 Project Structure

```text
CODE-SMITHS/
├── index.html      # Main website and page sections
├── style.css       # Responsive UI and visual styling
├── script.js       # Firebase, form, WhatsApp and UI logic
└── README.md       # Project documentation
```

## 🚀 Run Locally

Because this project uses JavaScript modules and Firebase, serve it through a local web server rather than opening `index.html` directly.

### Option 1 — VS Code Live Server

1. Clone the repository.
2. Open the folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

### Option 2 — Python

From the project directory:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## 🔥 Firebase Setup

The frontend currently initializes Firebase directly from `script.js`.

The application uses:

- **Firestore** collection: `planLeads` for project enquiries
- **Firestore** document: `siteStats/traffic` for visit statistics
- **Firestore** document: `siteConfig/contact` for the configurable WhatsApp number
- **Firebase Analytics** when browser support is available

### Recommended production setup

Before deploying publicly:

1. Create/use your Firebase project.
2. Enable Firestore.
3. Enable Analytics if required.
4. Configure appropriate Firestore security rules.
5. Store only the minimum personal information required for enquiries.
6. Review Firebase configuration and production access rules before launch.

> **Security note:** Firebase web configuration values are designed to be present in client-side applications. Security should come from Firebase Authentication/Firestore Security Rules and proper backend access controls, not from hiding the web configuration object.

## 💬 WhatsApp Configuration

The website attempts to load the WhatsApp number from:

```text
siteConfig/contact
└── whatsappNumber
```

If that configuration cannot be loaded, the frontend falls back to the number configured in `script.js`.

For production, keep the contact number in your Firebase configuration document and make sure the corresponding Firestore rules allow only the access you actually need.

## 📝 Enquiry Flow

When a visitor chooses a paid plan:

1. The selected plan opens in an enquiry dialog.
2. The visitor enters their name, phone, email, project topic, deadline and notes.
3. JavaScript validates and collects the form values.
4. The enquiry is stored in Firestore under `planLeads`.
5. A success/error status is shown to the visitor.

## 📊 Visitor Tracking

The website tracks:

- Total visits
- Unique reach
- Per-device visit count
- First-seen and last-seen timestamps

A browser-generated ID is stored in `localStorage` and used to distinguish returning browsers from new ones.

This is a simple client-side metric and should not be treated as a fully reliable analytics or unique-user measurement.

## 🎨 Design

The interface uses:

- Editorial-style typography
- Warm neutral visual palette
- Rounded cards and pill controls
- Responsive CSS Grid/Flexbox layouts
- Mobile navigation
- Animated hero elements
- Interactive pricing and FAQ components

## 📌 Current Pages / Sections

The current single-page site contains:

- Hero / value proposition
- Services
- Pricing
- Process
- Student reviews
- FAQ
- Call-to-action
- Footer
- Project enquiry dialog

## 🔧 Possible Next Improvements

For a production-ready version, consider adding:

- [ ] Custom domain
- [ ] Real project portfolio/case studies
- [ ] Admin dashboard for enquiries
- [ ] Firebase Authentication for admin access
- [ ] Stronger Firestore Security Rules
- [ ] Form spam/rate-limit protection
- [ ] SEO metadata and Open Graph preview
- [ ] Favicon and branded social preview image
- [ ] Privacy policy and terms
- [ ] Deployment through GitHub Pages, Netlify or Firebase Hosting
- [ ] Automated tests and CI checks

## 👨‍💻 Author

**Arpit Maurya**

GitHub: [@ArpitMaurya0CODE](https://github.com/ArpitMaurya0CODE)

## 📄 License

No license is currently specified for this repository. If you plan to allow others to reuse, modify or distribute the code, add an appropriate open-source license.

---

Made with HTML, CSS, JavaScript and Firebase.
