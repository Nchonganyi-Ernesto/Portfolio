import bloodlinkImg from '../assets/BLOODLINK.jpeg';
import pharmaScoutImg from '../assets/pharma-scout-image.PNG';
import ksearchImg from '../assets/ads-hero.PNG';
import foodbistroImg from '../assets/restaurant-image.PNG';

export const projectsData = [
  {
    id: 'bloodlink',
    name: 'BloodLink',
    year: '2025',
    category: 'Healthcare',
    projectType: 'Real Project',
    shortSummary: 'Life-saving blood donor network connecting patients across Cameroon.',
    leadStatement: 'BloodLink is a critical emergency platform in Cameroon connecting hospitals and patients directly to volunteer blood donors. We engineered a real-time matching system from the ground up.',
    briefChallenge: 'Severe blood shortages in local hospitals, fragmented communications, and life-threatening delays relying on unorganized social media forwards.',
    briefApproach: 'A lightweight, low-bandwidth React interface paired with Supabase geolocation queries and automated Baileys WhatsApp dispatch pings.',
    briefOutcome: 'Reduced emergency donor dispatch response time to under 15 minutes during local pilot testing in Buea.',
    title: 'BloodLink - Life-Saving Blood Donor Network',
    badge: 'REAL PROJECT',
    tagline: 'A mission-critical healthcare platform bridging the gap between urgent blood requests and volunteer donors across Cameroon.',
    image: bloodlinkImg,
    link: 'https://bloodlink0.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Lead Frontend Developer & System Architect',
    roleLeadStatement: 'As Lead Frontend Developer & System Architect, I steered the core application architecture, secure health data models, and automated donor alert systems.',
    roleHighlights: [
      {
        label: 'APPLICATION ARCHITECTURE',
        text: 'Engineered the single-page application using React 19 and Vite with modular CSS for sub-second emergency response on 3G connections.'
      },
      {
        label: 'DATA & PATIENT PRIVACY',
        text: 'Architected Supabase Auth and PostgreSQL Row Level Security to strictly protect donor medical data and contact channels.'
      },
      {
        label: 'DISPATCH & AUTOMATION',
        text: 'Integrated browser Geolocation queries with Baileys WhatsApp Cloud hooks to automatically alert off-grid donors within minutes.'
      }
    ],
    timeline: '2025',
    status: 'Live & Operational',
    client: 'Healthcare / Community Emergency',
    description:
      'An innovative platform connecting blood donors to patients in critical need across Africa through simple profile setups, GPS-based location matching, and automated calling mechanisms to nearby donors.',
    tags: ['React (Vite)', 'Modular CSS', 'Supabase', 'PostgreSQL', 'Baileys WhatsApp Cloud', 'Geolocation API'],
    overview:
      'Blood shortages and fragmented communication in sub-Saharan healthcare centers lead to critical treatment delays. BloodLink was created to solve this urgent crisis by digitizing donor registries and connecting patients to compatible donors in minutes rather than hours.',
    challenge:
      'In emergency hospital situations, families traditionally broadcast frantic voice notes across social groups hoping a compatible donor responds in time. Blood banks lack real-time digital registries, and donors had no automated notification channel when compatible patients in their vicinity were in critical condition.',
    solution:
      'We engineered a lightweight, high-performance web platform paired with Baileys WhatsApp Cloud automated dispatching. The app leverages the browser Geolocation API and PostgreSQL spatial queries to locate the closest registered volunteer donors and initiate automated calls and WhatsApp alert pings with patient details.',
    myRole: [
      'Architected the responsive single-page application using React 19 and Vite with modular CSS for zero-latency mobile browsing.',
      'Integrated Supabase Auth and PostgreSQL Row Level Security (RLS) to safeguard sensitive donor health and contact records.',
      'Designed an emergency one-tap SOS broadcast pipeline that queries compatible blood group donors within a custom radius.',
      'Built the Baileys WhatsApp Cloud webhook connector for automated notification dispatches to off-grid volunteer donors.',
      'Conducted usability field tests with medical students and local volunteers in Buea to refine the high-stress emergency UI flow.'
    ],
    keyFeatures: [
      {
        title: 'Emergency Blood SOS Dispatch',
        description: 'Patients or medical staff can create urgent blood requests specifying blood group, units, hospital location, and urgency status.'
      },
      {
        title: 'GPS Radius Donor Matching',
        description: 'Spatial query engine calculates compatible donors within customizable radius boundaries, ensuring responders are physically near the hospital.'
      },
      {
        title: 'Baileys WhatsApp Notification Hook',
        description: 'Bypasses expensive SMS costs by automating verified emergency notification alerts directly to donors’ WhatsApp inboxes.'
      },
      {
        title: 'Donor Health & Eligibility Tracker',
        description: 'Includes an automated 56-day donation cooldown timer, health checklist screening, and donation history milestone records.'
      },
      {
        title: 'Privacy-Preserving Contact Channels',
        description: 'Protects donor phone numbers and private records through tokenized request links until a donor explicitly accepts dispatch.'
      },
      {
        title: 'Zero-Lag Offline Resilience',
        description: 'Engineered for sub-Saharan low-bandwidth networks with minimal asset footprints and aggressive client-side caching.'
      }
    ],
    architecture: {
      frontend: 'React 19, Vite, Modular CSS, HTML5 Geolocation API',
      backend: 'Supabase Serverless Functions, Baileys WhatsApp API',
      database: 'PostgreSQL with Row Level Security & Spatial Indexing',
      deployment: 'Netlify Automated CI/CD, HTTPS Edge CDN'
    },
    challengesSolved: [
      {
        title: 'Low-Bandwidth Mobile Network Optimization',
        solution: 'Stripped heavy UI libraries and built custom pure CSS components. Reduced initial bundle to under 65KB gzipped, allowing emergency requests to load in under 1.2s on 3G connections.'
      },
      {
        title: 'Real-Time Notification Delivery',
        solution: 'Implemented Supabase Realtime WebSocket subscriptions combined with a resilient Baileys WhatsApp Cloud background runner that guarantees delivery even if the recipient is not actively browsing the web app.'
      }
    ]
  },
  {
    id: 'pharmascout',
    name: 'Pharma-Scout',
    year: '2025',
    category: 'Healthcare',
    projectType: 'Real Project',
    shortSummary: 'Smart drug inventory broker connecting patients with verified pharmacies.',
    leadStatement: 'Pharma-Scout is a digital healthcare broker linking patients to registered pharmacies with verified drug stock. We designed a unified real-time inventory discovery network.',
    briefChallenge: 'Exhausting manual searches across pharmacies for out-of-stock prescription medication, with zero visibility into live shelf inventories.',
    briefApproach: 'A dual-portal web architecture connecting patients to live Firestore inventory trackers and verified prescription uploads via Cloudinary.',
    briefOutcome: 'Eliminated pharmacy hopping friction with real-time stock lookup and automated 3-hour medication pickup holds.',
    title: 'Pharma-Scout - Smart Health & Drug Inventory Broker',
    badge: 'REAL PROJECT',
    tagline: 'An intelligent healthcare inventory platform connecting patients directly to verified registered pharmacies with real-time stock levels.',
    image: pharmaScoutImg,
    link: 'https://pharma-scout.online/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Frontend Developer & UI/UX Specialist',
    roleLeadStatement: 'As Frontend Developer & UI/UX Specialist, I led the end-to-end interface design, pharmacy back-office ergonomics, and real-time inventory synchronization.',
    roleHighlights: [
      {
        label: 'PORTAL UX & ERGONOMICS',
        text: 'Designed and built dual-portal interfaces for patients and pharmacists, simplifying medicine searches and batch stock updates.'
      },
      {
        label: 'REAL-TIME DATA INTEGRATION',
        text: 'Engineered live Cloud Firestore synchronization and atomic inventory hold locks to eliminate medication reservation conflicts.'
      },
      {
        label: 'PRESCRIPTION & DISPATCH PIPELINE',
        text: 'Integrated Cloudinary client-side compression for high-res prescriptions and Resend email hooks for pickup security PINs.'
      }
    ],
    timeline: '2024 - 2025',
    status: 'Live & Deployed',
    client: 'HealthTech / Digital Pharmacy Broker',
    description:
      'A dedicated healthcare platform eliminating medicine search exhaustion by connecting patients directly to registered pharmacies with verified, real-time drug inventories.',
    tags: ['React', 'CSS3', 'Firebase', 'Firestore', 'Cloudinary', 'Resend API'],
    overview:
      'Pharma-Scout eliminates pharmacy-hopping exhaustion. By aggregating licensed pharmacy inventories into a centralized, live searchable database, patients find their required prescriptions instantly, check pricing, and reserve drugs before traveling.',
    challenge:
      'Patients in Cameroon frequently endure physical exhaustion walking from pharmacy to pharmacy searching for out-of-stock medication, often during urgent illness. Pharmacies on the other hand lacked simple digital tools to publish real-time inventory updates without complex enterprise software.',
    solution:
      'Developed an intuitive two-sided web portal: a patient-facing search engine with fuzzy medication matching and reservation pipelines, and a pharmacist back-office inventory dashboard for instant stock updates and prescription verification via Cloudinary and Resend.',
    myRole: [
      'Engineered the end-to-end user experience, from interactive medication query interfaces to pharmacy management portals.',
      'Designed real-time Firestore synchronization for drug availability status, preventing double-reservations of limited medications.',
      'Integrated Cloudinary media pipelines for secure prescription image upload and compression.',
      'Configured Resend transactional email workflows to deliver confirmation receipts and reservation pickup PIN codes.',
      'Refined accessibility and mobile ergonomics to ensure patients can easily order prescriptions on any smartphone.'
    ],
    keyFeatures: [
      {
        title: 'Fuzzy Prescription Medication Search',
        description: 'Allows patients to search by generic active molecule or brand name with instant autocomplete and inventory status.'
      },
      {
        title: 'Verified Pharmacy Inventory Portal',
        description: 'Enables pharmacy staff to update stock quantities, price changes, and batch expirations with simple toggle controls.'
      },
      {
        title: 'Secure Prescription Upload Pipeline',
        description: 'Patients upload doctor prescription photos, optimized through Cloudinary CDN with pharmacist verification.'
      },
      {
        title: 'Automated Reservation & Pickup PIN',
        description: 'Holds reserved medications for up to 3 hours with a unique security PIN sent via transactional email through Resend.'
      },
      {
        title: 'Location & Operating Hours Matrix',
        description: 'Displays 24/7 duty status, address directions, and real-time open/closed badges.'
      }
    ],
    architecture: {
      frontend: 'React, CSS3 Modern Flex/Grid Layouts, Cloudinary SDK',
      backend: 'Firebase Cloud Functions, Resend API',
      database: 'Cloud Firestore Realtime NoSQL Database',
      deployment: 'Custom Domain (pharma-scout.online), Netlify / Cloudflare'
    },
    challengesSolved: [
      {
        title: 'Preventing Phantom Stock & Double Reservations',
        solution: 'Architected Firestore atomic transactions (runTransaction) when a reservation is placed, temporarily locking inventory units for 180 minutes to avoid race conditions.'
      },
      {
        title: 'Rapid Prescription Media Compression',
        solution: 'Configured automated client-side canvas pre-compression before upload to Cloudinary, ensuring users on slow 3G connections can upload high-resolution prescription photos in seconds.'
      }
    ]
  },
  {
    id: 'ksearch',
    name: 'KSearch',
    year: '2024',
    category: 'Advertising',
    projectType: 'Exploration',
    shortSummary: 'Targeted advertising and campaign submission platform prototype.',
    leadStatement: 'KSearch is an interactive digital advertising prototype built to streamline local campaign creation and placement. We engineered an intuitive submission pipeline with real-time budget forecasting.',
    briefChallenge: 'Overly complex, opaque ad dashboards that alienate emerging local businesses and community event promoters.',
    briefApproach: 'A guided 3-step campaign wizard, real-time impression calculations, and responsive ad placement previews built with vanilla ES6+.',
    briefOutcome: 'Demonstrated a zero-bloat campaign submission pipeline with sub-second form feedback and live multi-device ad mockups.',
    title: 'KSearch - Targeted Advertising & Campaign Platform',
    badge: 'EXPLORATION',
    tagline: 'An interactive advertising web prototype engineered for submitting, verifying, and managing targeted promotional campaigns.',
    image: ksearchImg,
    link: 'https://intern-board2.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Frontend Developer',
    roleLeadStatement: 'As Frontend Developer, I architected the modular vanilla JavaScript pipeline, dynamic budget calculation algorithms, and live ad preview engines.',
    roleHighlights: [
      {
        label: 'VANILLA ES6+ ARCHITECTURE',
        text: 'Crafted a zero-framework modular application structure with pure JavaScript and semantic HTML5 for blazingly fast interaction.'
      },
      {
        label: 'CALCULATION LOGIC',
        text: 'Programmed live client-side budget estimation algorithms that instantly compute forecasted impressions upon slider adjustments.'
      },
      {
        label: 'RESPONSIVE PREVIEW SYSTEM',
        text: 'Built interactive preview containers showing live creative asset placements across billboard and mobile viewports.'
      }
    ],
    timeline: '2024',
    status: 'Live Prototype',
    client: 'AdTech & Business Growth Exploration',
    description:
      'A clean advertising web prototype engineered for submitting, verifying, and managing targeted promotional campaigns with interactive submission pipelines.',
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Firebase', 'Firestore'],
    overview:
      'A modern digital ad management portal designed to streamline campaign submissions for local businesses, creators, and community initiatives.',
    challenge:
      'Creating digital ad campaigns often requires navigating bloated, opaque ad platforms with confusing configuration settings that discourage local and emerging businesses from running targeted promotions.',
    solution:
      'Engineered an accessible, lightweight advertising prototype featuring a clear 3-step campaign wizard, live placement mockup generator, and real-time campaign moderation status.',
    myRole: [
      'Developed modular frontend code architecture in vanilla JavaScript and semantic HTML5.',
      'Built custom form validation and budget calculation algorithms that update metrics live as target impressions change.',
      'Implemented Firestore database hooks to persist submitted campaigns and moderation statuses.',
      'Engineered the multi-format responsive ad preview container showing banner renders across devices.'
    ],
    keyFeatures: [
      {
        title: 'Multi-Step Campaign Builder',
        description: 'Intuitive workflow guiding the user through campaign goals, creative assets, targeting demographic, and budget.'
      },
      {
        title: 'Real-Time Dynamic Cost Calculator',
        description: 'Instant algorithmic cost and impression estimation responding dynamically to date range and placement choices.'
      },
      {
        title: 'Live Responsive Creative Preview',
        description: 'Real-time previewer illustrating how promotional assets will appear on desktop billboards vs mobile feeds.'
      },
      {
        title: 'Moderation Pipeline Tracker',
        description: 'Status badges (Submitted, Under Review, Active) synced with Firebase Firestore.'
      }
    ],
    architecture: {
      frontend: 'Semantic HTML5, CSS3 Custom Properties, Vanilla ES6+ JavaScript',
      backend: 'Firebase BaaS Backend Services',
      database: 'Cloud Firestore',
      deployment: 'Netlify Static Hosting'
    },
    challengesSolved: [
      {
        title: 'Zero-Dependency Vanilla Architecture',
        solution: 'Demonstrated high performance by building complex stateful wizard steps, dynamic calculations, and form validation using clean native ES6+ without third-party frameworks.'
      }
    ]
  },
  {
    id: 'foodbistro',
    name: 'FoodBistro',
    year: '2024',
    category: 'Food & Dining',
    projectType: 'Exploration',
    shortSummary: 'Modern culinary UI experience with interactive dining reservations.',
    leadStatement: 'FoodBistro is an artisanal culinary dining platform showcasing interactive menus and fluid table bookings. We crafted an appetizing, high-performance digital dining experience.',
    briefChallenge: 'Sluggish, non-responsive PDF menus and rigid reservation forms that degraded the guest dining discovery flow.',
    briefApproach: 'A responsive culinary design system featuring instant dish filtering, dietary tags, and interactive reservation modals.',
    briefOutcome: 'Sub-second menu load times, zero layout shifts, and an intuitive multi-guest table booking experience.',
    title: 'FoodBistro - Modern Restaurant Digital UI Experience',
    badge: 'EXPLORATION',
    tagline: 'A culinary web application showcasing interactive dining menus, smooth reservation flows, and aesthetic dining UI/UX.',
    image: foodbistroImg,
    link: 'https://bistro-f.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'UI/UX Designer & Frontend Engineer',
    roleLeadStatement: 'As UI/UX Designer & Frontend Engineer, I directed the gastronomic brand identity, fluid dish filtering interactions, and responsive table booking workflows.',
    roleHighlights: [
      {
        label: 'GASTRONOMIC DESIGN SYSTEM',
        text: 'Developed the rich typographic hierarchy, sensory palette, and responsive component library tailored for culinary storytelling.'
      },
      {
        label: 'FLUID MENU INTERACTION',
        text: 'Engineered instant menu category filtering utilizing hardware-accelerated CSS transforms to guarantee 60fps mobile transitions.'
      },
      {
        label: 'RESERVATION MODAL FLOW',
        text: 'Created an intuitive booking sequence with party size counters, date validation, and immediate confirmation feedback.'
      }
    ],
    timeline: '2024',
    status: 'Live Prototype',
    client: 'Culinary Brand Experience',
    description:
      'A production-level frontend web application showcasing interactive dining menus, smooth reservation user flows, and aesthetic culinary UI/UX design.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX Design', 'Responsive Motion'],
    overview:
      'A digital dining showcase designed to transform how guests discover artisanal culinary offerings and reserve private dining tables online.',
    challenge:
      'Many restaurant websites rely on unreadable mobile PDF menus, lack responsive reservation pipelines, and suffer from poor sensory visual storytelling that fails to convert diners.',
    solution:
      'Created a modern, appetizing web experience with fluid menu category filtering, dietary tag indexing, rich culinary micro-animations, and an interactive reservation confirmation modal.',
    myRole: [
      'Conceived and designed the warm gastronomic brand identity, typographic hierarchy, and layout system.',
      'Coded the smooth category filtering interface with instant DOM filtering and subtle scale transitions.',
      'Engineered the reservation scheduling workflow with date verification and party size selection.',
      'Optimized image loading and layout shifts to achieve perfect visual fidelity across high-DPI smartphone displays.'
    ],
    keyFeatures: [
      {
        title: 'Dynamic Dish & Menu Filtering',
        description: 'Seamlessly switch between Chef Specials, Starters, Mains, and Artisan Drinks with zero page reloads.'
      },
      {
        title: 'Dietary & Allergen Badges',
        description: 'Clear visual indicators for Vegan, Gluten-Free, Organic, and Chef-recommended pairings.'
      },
      {
        title: 'Interactive Table Reservation Engine',
        description: 'Guided booking form with guest count counter, date/time pickers, and instant reservation confirmation state.'
      },
      {
        title: 'Appetizing Micro-Interactions',
        description: 'Delightful hover elevations, fluid price tag animations, and responsive touch gestures for mobile diners.'
      }
    ],
    architecture: {
      frontend: 'Semantic HTML5, Advanced CSS Grid & Flexbox, Vanilla JavaScript',
      design: 'Custom Gastronomic Design System & Typography Hierarchy',
      deployment: 'Netlify Global Edge Hosting'
    },
    challengesSolved: [
      {
        title: 'Fluid Category Transition Without Layout Jitter',
        solution: 'Utilized CSS hardware-accelerated transforms (transform: scale() & opacity) with coordinated display transitions to keep the menu grid buttery smooth when toggling categories.'
      }
    ]
  }
];
