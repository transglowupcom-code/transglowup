# Blog + AdSense Content Build — Manifest

**Built:** November 6, 2026 · **Staged only in `~/workspace/rebuild` — nothing deployed, live site untouched.**
**What this is:** F5 (Transition 101 guides expanded + 13 standalone articles) + F6 (real pages + sitemap) + the new daily Glow Blog (index + first post). All pages share `/shared-subpage.css` (soft pastel palette matching the live site) and the accessibility-prefs script.

## Changed files

### `index.html` (1,131,004 → 1,137,943 bytes)
- **Transition 101 — Trans Women** (`#t101-women`): 653 → **1,051 words**. Added intro paragraph, 2 new tips per card (8 total), 2 checklist items (now 12).
- **Transition 101 — Trans Men** (`#t101-men`): 607 → **1,011 words**. Same pattern: intro, 8 new tips, 2 checklist items (now 12).
- **Home hub grid:** new Blog hub card #14 ("The Glow Blog" → `/blog/`), placed after the podcast card.
- **`#news` section:** new "Want fresh stories every day?" card linking to `/blog/`.
- **New CSS rule:** `.t101-intro` for the guide intro paragraphs.
- Untouched: header/nav, crisis page, Get Help button, ad slots, all other sections (verified by diff — only the expected regions changed).

### `sitemap.xml` (rewritten)
- All `#fragment` URLs removed. Now 17 real URLs: home, `/theglowreport/`, `/blog/`, the first blog post, and all 13 guide pages. `lastmod` 2026-11-06 for every new page.

### `shared-subpage.css` (new, 5,622 bytes)
- One shared stylesheet for every `/guides/` and `/blog/` page: pastel palette, jump-bar nav, article cards, tip/note boxes, sources, footer, mobile rules, dark-mode respect.

## New pages (word counts = body `<p>` + `<li>` text, verified programmatically)

| Page | Words |
|---|---|
| `guides/makeup-basics/` — Makeup Basics: A Gentle Start | 1,656 |
| `guides/beard-shadow-cover/` — Covering Beard Shadow | 1,460 |
| `guides/color-correction/` — Color Correction, Plainly Explained | 1,622 |
| `guides/wigs/` — Wigs: Your First One, Start to Finish | 1,952 |
| `guides/body-shape-dressing/` — Dressing for Your Body Shape | 1,820 |
| `guides/safe-binding/` — Safe Binding: What to Know First | 2,182 |
| `guides/recovery-first-steps/` — Recovery First Steps After Gender-Affirming Surgery | 2,065 |
| `guides/name-and-id-changes/` — Changing Your Name and ID Documents | 2,626 |
| `guides/finding-affirming-care/` — Finding Affirming Care Near You | 2,261 |
| `guides/pre-hrt-questions/` — Questions to Ask Before Starting HRT | 2,525 |
| `guides/voice-training-basics/` — Voice Training Basics | 2,982 |
| `guides/tucking-safely/` — Tucking Safely | 2,430 |
| `guides/first-affirming-care-visit/` — What to Ask at Your First Affirming-Care Visit | 2,510 |
| `blog/2026-11-06-rainbow-wave/` — The Rainbow Wave (first blog post) | 1,767 |
| `blog/` — Blog index (listing page, newest first) | — |
| **Total new body copy (13 guides + first post)** | **29,858** |

## QA passed on every new page
- 0 HTML tag errors, 0 unclosed tags (parser-checked).
- 0 leftover `{{PLACEHOLDER}}`s; canonical URLs match file paths.
- "dolls" appears nowhere in new content; blog addresses the audience as "loves".
- No invented prices, testimonials, user numbers, or AdSense-approval claims; no merch push in guides.
- Every sitemap URL resolves to a file on disk.

## Sources used (linked on each page)

### Makeup Basics
- Revlon — How to Match Foundation to Your Skin Tone — https://www.revlon.com/blogs/makeup/how-to-match-foundation
- FaceCutie — The Complete Guide to Color-Matching Your Foundation — https://facecutie.com/blog/foundation-match-guide.html
- GFACEMD — The Ultimate Guide to Gentle Makeup Removal — https://gfacemd.com/skin-friendly-solutions-the-ultimate-guide-to-gentle-makeup-removal/
- Necole Bitchie — How to Easily Remove Makeup? A Dermatologist's Guide — https://necolebitchie.com/how-to-easily-remove-makeup/
- L'Oréal Paris — Color Corrector Guide — https://www.lorealparisusa.com/beauty-magazine/makeup/face-makeup/guide-to-color-correction

### Beard-Shadow Cover
- GenderGP — How To Cover Beard Shadow: MTF Makeup Techniques — https://www.gendergp.com/blog/cover-beard-shadow-mtf-makeup-trans-women/
- MyHirsutism — How to Hide Stubble with Makeup — https://myhirsutism.com/how-to-hide-stubble-with-makeup/
- Crossdressed.co.uk — Crossdresser Makeup Tutorial — https://crossdressed.co.uk/for-crossdressers/crossdresser-makeup-tips/
- ClubCrossDressing — Managing Beard Shadow for Crossdressers — https://www.clubcrossdressing.com/blog/managing-beard-shadow-crossdressers
- SmartShave — Razor Burn After Shaving? 9 Proven Ways Men Can Prevent It — https://smartshave.co.uk/razor-burn-after-shaving-9-proven-ways-men-can-prevent-it-instantly/
- JustShaver — Shaving Irritation and Razor Burn — https://justshaver.com/5-effective-tips-to-alleviate-shaving-irritation/

### Color Correction
- L'Oréal Paris — Color Corrector Guide — https://www.lorealparisusa.com/beauty-magazine/makeup/face-makeup/guide-to-color-correction
- NYX Cosmetics UK — The Ultimate Colour Corrector Guide — https://www.nyxcosmetics.co.uk/blog/colour-corrector-guide.html
- Melo-Match — Color Theory for Makeup — https://www.melo-match.com/en/articles/color-theory-for-makeup-using-the-color-wheel-to-neutralize-redness-and-dark-circles
- GlamGeek — How to Use Colour Corrector for Dark Circles & Redness — https://www.glamgeek.com/ca/articles/how-to-use-colour-corrector-dark-circles-redness
- GenderGP — How To Cover Beard Shadow — https://www.gendergp.com/blog/cover-beard-shadow-mtf-makeup-trans-women/

### Wigs
- ElegantWigs — Wig Size Guide — https://elegantwigs.com/blogs/news/wig-size-guide
- Wig Studio 1 — Synthetic vs. Human Hair Wigs — https://www.wigstudio1.com/blogs/strands-of-knowledge/synthetic-vs-human-hair-wigs
- Wig Superstore — Synthetic Wig vs. Human Hair Wig — https://wigsuperstore.com/human-hair-wigs-versus-synthetic-hair-wigs/
- ElegantWigs — Wig Care & Repair — https://elegantwigs.com/pages/wig-care-and-repair
- Godiva's Secret Wigs — How to Wash a Synthetic Wig Step-by-Step — https://godivassecretwigs.com/blogs/wig-maintenance-and-care/how-to-wash-a-synthetic-wig-step-by-step
- Simply Wigs — Human Hair vs Synthetic Wigs — https://www.simplywigs.co.uk/blog/human-hair-wigs-vs-synthetic-hair-wigs/

### Body Shape & Dressing
- WhatToWears — How to Dress for Your Body Type — https://whattowears.com/body-type/how-to-dress-for-your-body-type/
- Sportconn — How to Dress for an Athletic Body Type — https://go.sportconn.com/how-to-dress-for-an-athletic-body-type/
- Alromaizan — Inverted Triangle Outfits — https://stg.alromaizan.com/easy-stream/inverted-triangle-outfits-style-tips-and-ideas-1767648976
- KixSzn — Can Men Wear Women's Shoes? Size Chart & Fit Guide — https://kixszn.com/can-men-wear-womens-shoes/
- FitVille — Men's to Women's Shoe Size Conversion — https://thefitville.com/blogs/blog/mens-to-womens-shoe-size-conversion
- OrdersAndReturns — Men and Women Shoe Size Chart — https://www.ordersandreturns.com/shoe-size-chart-men-women

### Safe Binding
- Point of Pride — Binding 101: Tips to Bind Your Chest Safely — https://www.pointofpride.org/blog/binding-101-tips-to-bind-your-chest-safely?hs_amp=true
- Point of Pride — Binding: Resources & info about safer chest binding — https://www.pointofpride.org/binding
- CHEST Physician — Chest binding and respiratory health in transgender and gender-diverse patients — https://www.chestphysician.org/chest-binding-and-respiratory-health-in-transgender-and-gender-diverse-patients/
- Anchor Health — All About Chest Binding — https://anchorhealthct.org/all-about-chest-binding/
- Stand With Trans / Trans Lifeline Library — Healthcare: Binding — https://standwithtrans.org/trans-lifeline-library-healthcare-binding/

### Recovery First Steps
- Cleveland Clinic — Schedule Gender-Affirming Surgery: What To Expect After Adult Gender-Affirming Surgery — https://my.clevelandclinic.org/services/schedule-gender-affirming-surgery
- University of Iowa Health Care — Top surgery for transmen — https://uihc.org/health-topics/top-surgery-transmen
- Callen-Lorde TransAtlas — Top Surgery: Chest Reduction & Reconstruction — https://transatlas.callen-lorde.org/sites/default/files/attachments/2022-11/ChestReconstruction.pdf
- ShareCare / Mount Sinai — A guide to gender-affirming surgery for transmasculine people — https://askmd.sharecare.com/learn/transgender-health/transmasculine-gender-affirming-surgery/
- Cleveland Clinic — Breast Augmentation: What is involved in recovery? — https://my.clevelandclinic.org/cosmetic-plastic-surgery/procedures/breast-augmentation

### Name & ID Changes
- Advocates for Trans Equality — ID Documents Center: Minnesota Identity Documents — https://transequality.org/documents/minnesota-identity-documents
- U.S. Department of State — Name Change for U.S. Passport — https://travel.state.gov/namechange
- U.S. Department of State — Change or Correct a Passport — https://travel.state.gov/en/passports/renew-replace/change-correct-passport.html
- LegalClarity — Does My Passport Name Have to Match My Driver's License? — https://legalclarity.org/does-my-passport-name-have-to-match-my-drivers-license/
- CryoChoice — How to Change Your Name as a Transgender Woman — http://cryochoice.com/blogs/news/a-comprehensive-guide-to-legally-changing-your-name-as-a-transgender-woman

### Finding Affirming Care
- Fenway Health — Trans and Gender Diverse Care — https://fenwayhealth.org/care/medical/transgender-health/youth/
- Fenway Health — Trans and Gender Diverse Care: Answers to Common Questions — https://fenwayhealth.org/wp-content/uploads/TH-163_TGD-Care-Answers-to-Common-Questions-Brochure-1.pdf
- Get Me Giddy — How to Find an LGBTQ-Friendly Family Doctor — https://getmegiddy.com/find-LGBTQIA-friendly-family-doctor
- Sesame Care — How to Find LGBTQ-Friendly Health Care — https://sesamecare.com/blog/how-to-find-an-lgbtq-friendly-healthcare-provider
- The Guide LGBT — Finding an LGBTQ+ Affirming Therapist — https://help.theguide.lgbt/finding-an-affirming-therapist/
- Bi Resource Center — A Bi+ Guide to Navigating Healthcare — http://biresource.org/a-bi-guide-to-navigating-healthcare/

### Pre-HRT Questions
- Planned Parenthood — Gender-Affirming Care — https://www.plannedparenthood.org/planned-parenthood-southern-new-england/patient-resources/our-services/gender-affirming-care
- Planned Parenthood — What to Expect on Your First Visit and Beyond — https://www.plannedparenthood.org/planned-parenthood-central-western-new-york/patient-resources/our-services/gender-affirming-care/what-to-expect-on-your-first-visit-and-beyond
- Planned Parenthood — Blood Work — https://www.plannedparenthood.org/planned-parenthood-central-western-new-york/patient-resources/our-services/gender-affirming-care/blood-work
- UCSF Transgender Care — Information on Estrogen Hormone Therapy — https://transcare.ucsf.edu/article/information-estrogen-hormone-therapy
- UCSF Transgender Care — Information on Testosterone Hormone Therapy — https://transcare.ucsf.edu/article/information-testosterone-hormone-therapy?ref=genderbent.co.uk
- Fenway Health — Gender Affirming Hormone Therapy — https://fenwayhealth.org/wp-content/uploads/Friday-Session-5a.pdf
- Planned Parenthood — Gender Affirming Care (informed consent model) — https://www.plannedparenthood.org/planned-parenthood-north-central-states/campaigns/gender-affirming-care

### Voice Training Basics
- Cleveland Clinic — Schedule Voice Therapy — https://my.clevelandclinic.org/services/schedule-voice-therapy
- Cleveland Clinic — Voice Center & Clinic — https://my.clevelandclinic.org/departments/head-neck/depts/voice-center
- Cleveland Clinic via Speech Therapy N Beyond — Transgender Voice Therapy — https://www.speechtherapynbeyond.com/about-4
- Planned Parenthood — Gender-Affirming Care (estrogen and voice) — https://www.plannedparenthood.org/planned-parenthood-southern-new-england/patient-resources/our-services/gender-affirming-care
- NIDCD — Taking Care of Your Voice — https://www.nidcd.nih.gov/health/taking-care-your-voice
- Connected Speech Pathology — How to Strengthen Vocal Cords — https://connectedspeechpathology.com/blog/effective-techniques-to-strengthen-your-vocal-cords
- Gender Voice Centre — Top 5 Exercises We Use in MTF Voice Training — https://www.gendervoicecentre.com.au/post/top-5-exercises-we-use-in-mtf-voice-training-that-you-can-try-at-home

### Tucking Safely
- Healthwise — Tucking for Gender Affirmation: What to know to stay safe — https://www.healthwise.net/healthpartners/Content/StdDocument.aspx?DOCHWID=custom.hp24697
- WebMD — Tucking: What Is It? — https://www.webmd.com/sex/tucking-what-is
- Trans Solidarity Project — Beginner's Tucking Guide — https://transsolidarityproject.org/tucking-guide/

### First Affirming-Care Visit
- Planned Parenthood — Gender Affirming Care (informed consent model) — https://www.plannedparenthood.org/planned-parenthood-north-central-states/campaigns/gender-affirming-care
- Planned Parenthood — What to Expect on Your First Visit and Beyond — https://www.plannedparenthood.org/planned-parenthood-central-western-new-york/patient-resources/our-services/gender-affirming-care/what-to-expect-on-your-first-visit-and-beyond
- Planned Parenthood — Gender-Affirming Care — https://www.plannedparenthood.org/planned-parenthood-southern-new-england/patient-resources/our-services/gender-affirming-care
- Planned Parenthood — Preparing for your Hormone Therapy Visit — https://www.plannedparenthood.org/planned-parenthood-western-pennsylvania/patients/introducing-hormone-therapy/preparing-your-hormone-therapy-visit
- The Guide — Finding an LGBTQ+ Affirming Therapist — https://help.theguide.lgbt/finding-an-affirming-therapist/
- Starlight Psychotherapy — How to Find a Trans-Affirming Therapist — https://starlightpsychotherapy.com/find-trans-affirming-therapist-pennsylvania/

### Blog: Rainbow Wave (Nov 6, 2026)
- Pride Source — Meet the Trans Lawmakers Who Made History This Week — https://pridesource.com/article/joanna-whaley-win
- Out — Rainbow Wave: See all the LGBTQ+ midterm election winners — https://www.out.com/politics/lgbtq-midterm-election-winners-2026
- Uncloseted Media — A Blue Tsunami and a Rainbow Wave — https://www.unclosetedmedia.com/p/a-blue-tsunami-and-a-rainbow-wave
- Seattle Gay News — Jaelynn Scott wins in a landslide — https://www.sgn.org/story/171841
- Out — Florida elects first openly transgender woman Quinnie Perez — https://www.out.com/politics/quinine-perez-florida
- El Paso Times — Democrats sweep Texas races — https://www.elpasotimes.com/story/news/politics/elections/2026/11/04/talarico-hinojosa-lead-democratic-win-across-texas-ballot/92609141007/
- Vote the Person — Gina Hinojosa: Positions, Voting Record and Sources — https://votetheperson.org/candidates/gina-hinojosa/
- KRPS — Missourians reject Amendment 3 — https://www.krps.org/missouri-news/2026-11-04/missourians-reject-amendment-3-keeping-abortion-legal-in-the-state
- Out — Missouri voters reject gender-affirming care & abortion ban — https://www.out.com/politics/missouri-transgender-abortion-care
- Medical Daily — Missouri Amendment 3 Fails — https://www.medicaldaily.com/missouri-voters-reject-amendment-3-abortion-rights-480852

## What was left out / could not be verified
- **Blog:** specific per-candidate vote-share percentages (each in only one source); DeShanna Neal and Abi Boatman/Alleria Stanley as winners (not corroborated strongly enough); any claim about what new lawmakers will do in office. One low-quality source that misspelled Hudgins as "Huggins" and misidentified Zooey Zephyr was not cited.
- **Guides:** a "23% more confident" styling statistic (single dubious source); wig price ranges (no-prices rule); hydrocortisone for razor burn (one weak source); name/ID fees, form numbers, wait times (kept general — states differ); surgery recovery timelines/lifting limits (sources conflicted by surgery type — framed as "follow your surgeon's instructions"); HRT doses, lab target numbers, voice pitch targets in Hz (forbidden/prescriptive — omitted); fertility-preservation specifics seen in only one source; named voice apps/products and voice-surgery guidance (not verified 2+ sources); DIY gaff construction details (kept to general safety terms).
- **Binding time limit:** sources ranged 8–12 hours; the articles use the conservative, widely cited under-8-hours rule, never sleep/exercise hard in a binder.

## Still open (not part of this build)
- **F8 (page-speed check):** not done here — needs a Lighthouse run via a non-PSI route and fixes for anything it flags.
- **Deploy:** nothing in this build has been deployed. The main repo's GitHub Pages builds have been failing since Nov 5 (`fc623fb0` errored); deploy only once builds recover, then verify live.
- **Daily blog cadence:** the first post and index are staged; the recurring daily-post workflow (cron + writer) still needs to be set up by the parent agent.
