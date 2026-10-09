import bloodlinkImg from '../assets/BLOODLINK.jpeg';
import pharmaScoutImg from '../assets/pharma-scout-image.PNG';
import ksearchImg from '../assets/ads-hero.PNG';
import foodbistroImg from '../assets/restaurant-image.PNG';

export const projectsData = [
  {
    id: 'bloodlink',
    name: 'BloodLink',
    year: '2026',
    category: 'Healthcare',
    projectType: 'Real Project',
    shortSummary: 'Multi-page blood donor network connecting patients and donors across all 10 regions of Cameroon.',
    leadStatement: 'BloodLink is a mission-critical web application connecting patients to blood donors across all regions of Cameroon. Designed with an account-free donor model, instant calling, and an admin-moderated WhatsApp group broadcast dispatch.',
    briefChallenge: 'Critical blood shortages and chaotic hospital searches across Cameroon, where patients struggle to locate compatible donors quickly without exposing donor privacy.',
    briefApproach: 'A multi-page, low-bandwidth web app featuring instant GPS location donor search with direct phone calling, private account-free donor management links, and an admin-moderated SOS broadcast to registered WhatsApp community groups.',
    briefOutcome: 'Connected patients to local donors across all regions in minutes, protected donor anonymity without logins, and automated verified emergency broadcasts directly to community WhatsApp groups.',
    title: 'BloodLink - Nationwide Blood Donor & Emergency Broadcast Network',
    badge: 'REAL PROJECT',
    tagline: 'A nationwide healthcare platform bridging urgent blood requests and volunteer donors across all 10 regions of Cameroon with zero-friction donor profiles and admin-approved WhatsApp broadcasts.',
    image: bloodlinkImg,
    link: 'https://bloodlink0.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Lead Frontend Developer & System Architect',
    roleLeadStatement: 'As Lead Frontend Developer & System Architect, I engineered the multi-page application flows, location-based donor search engine, private tokenized donor management system, and admin broadcast pipeline.',
    roleHighlights: [
      {
        label: 'MULTI-PAGE FLOW & ARCHITECTURE',
        text: 'Engineered the multi-page application using React 19 and Vite with modular CSS, delivering instant loading and intuitive navigation for patients, donors, and administrators.'
      },
      {
        label: 'ACCOUNT-FREE DONOR PRIVACY',
        text: 'Designed a zero-friction donor system where donors register without passwords or account logins, managing their donation status and location via secure private links.'
      },
      {
        label: 'LOCATION SEARCH & CALL DISPATCH',
        text: 'Implemented location detection that displays compatible donors with instant direct calling, alongside an emergency SOS broadcast routed to WhatsApp groups upon admin verification.'
      }
    ],
    timeline: '2026',
    status: 'Live & Operational',
    client: 'Healthcare / Nationwide Emergency Network (Cameroon)',
    description:
      'Connects blood donors and patients across Cameroon with location-based search, direct calling, and admin-approved emergency broadcasts.',
    tags: ['React 19 (Vite)', 'Multi-Page Architecture', 'Modular CSS', 'Supabase', 'PostgreSQL', 'Baileys WhatsApp API', 'Geolocation API'],
    overview:
      'Blood shortages across hospitals in Cameroon cost precious lives daily. BloodLink replaces chaotic social media forwards with an organized, nationwide multi-page web application. Patients easily locate nearby compatible donors across all regions and call them immediately. Donors enjoy complete anonymity without needing accounts, updating their availability through private personalized links. When no direct donor is available, an emergency broadcast can be dispatched to registered WhatsApp groups following admin approval.',
    challenge:
      'Patients in emergency rooms faced two huge bottlenecks: finding compatible blood donors in their specific region within minutes, and getting help when immediate nearby donors were unavailable. Meanwhile, potential donors avoided registering on platforms that required tedious account passwords or exposed their personal numbers to the public.',
    solution:
      'We built an accessible multi-page web application optimized for all Cameroon regions. Patients enter their location, search compatible blood groups, and can call available donors directly. Donors sign up in seconds without accounts or passwords, receiving a private link to update their donation cooldown or location anytime. If no donor matches, patients initiate an SOS broadcast that administrators review and dispatch straight to registered community WhatsApp groups with verified patient details.',
    myRole: [
      'Architected the multi-page web application using React 19, Vite, and modular CSS for fluid multi-route navigation across all mobile devices.',
      'Engineered the recipient workflow: automated location capture, blood group compatibility queries, and direct one-tap telephone calling.',
      'Built the account-free donor architecture, generating secure, tokenized private links for donors to toggle availability (e.g. given blood / cooldown) or change their region without login friction.',
      'Designed the admin moderation workflow and Baileys WhatsApp API connector to review pending SOS requests and dispatch verified emergency alerts to registered WhatsApp groups.',
      'Optimized frontend assets and network queries for sub-Saharan mobile networks across all 10 regions of Cameroon.'
    ],
    keyFeatures: [
      {
        title: 'Instant Location-Based Donor Search & Direct Call',
        description: 'Detects patient location across all Cameroon regions and displays compatible donors with direct one-tap phone calling for immediate emergency response.'
      },
      {
        title: 'Account-Free Donor Profiles & Private Update Links',
        description: 'Donors create a profile without needing an account or password. They receive a private management link to update their donation status (given blood cooldown) or change location anytime.'
      },
      {
        title: 'Admin-Approved WhatsApp Group Broadcast',
        description: 'If no donor is found, patients trigger an SOS broadcast. Once reviewed and approved by the admin, the emergency request is automatically dispatched to registered community WhatsApp groups.'
      },
      {
        title: 'Privacy-Preserving Donor Anonymity',
        description: 'Protects donors from public data exposure and spam by avoiding public registry listings and keeping personal info confidential.'
      },
      {
        title: 'Coverage Across All 10 Cameroon Regions',
        description: 'Engineered to support regional filtering and location matching across all ten administrative regions of Cameroon.'
      },
      {
        title: 'Multi-Page Optimized Performance',
        description: 'Structured multi-page navigation built with pure modular CSS and minimal bundle size for ultra-fast response on 3G mobile connections.'
      }
    ],
    architecture: {
      frontend: 'React 19, Vite, Multi-Page Routing, Modular CSS, HTML5 Geolocation',
      backend: 'Supabase Serverless Functions, Baileys WhatsApp Cloud API, Admin Dispatch Hooks',
      database: 'PostgreSQL with Region & Spatial Indexing, Private Link Token Storage',
      deployment: 'Netlify Automated CI/CD, HTTPS Edge Network'
    },
    challengesSolved: [
      {
        title: 'Zero-Friction Donor Retention Without Logins',
        solution: 'Users rarely remember passwords during emergencies. We engineered secure, tokenized private URLs sent to donors, allowing them to instantly toggle their availability or update their location without ever creating or maintaining traditional user accounts.'
      },
      {
        title: 'Spam-Proof Emergency WhatsApp Broadcast Pipeline',
        solution: 'Direct open broadcasts to WhatsApp groups would quickly be spammed. We built an administrative review gateway where emergency SOS requests are verified before being dispatched to registered community WhatsApp groups, ensuring authentic alerts.'
      }
    ]
  },
  {
    id: 'pharmascout',
    name: 'Pharma-Scout',
    year: '2025',
    category: 'Healthcare',
    projectType: 'Real Project',
    shortSummary: 'Smart drug inventory finder eliminating pharmacy-hopping exhaustion for patients across Cameroon.',
    leadStatement: 'Pharma-Scout eliminates medicine search exhaustion for patients across Cameroon. Designed with zero-login search access, geolocation distance sorting, map navigation, and simple toggle stock updates for pharmacies.',
    briefChallenge: 'Exhausting pharmacy-hopping across Cameroon where patients with urgent prescriptions walk endlessly between pharmacies searching for out-of-stock medicine, wasting precious health and resources.',
    briefApproach: 'A zero-login healthcare search platform with geolocation distance sorting and map navigation, paired with Cloud Firestore real-time inventory toggles, Cloudinary storage, Resend alerts, and strict rate-limiting security.',
    briefOutcome: 'Empowered patients to instantly locate verified prescription drugs and navigate directly to the nearest stocked pharmacy, backed by automated rate limiting and secure input sanitization.',
    title: 'Pharma-Scout - Smart Medicine Inventory & Pharmacy Locator',
    badge: 'REAL PROJECT',
    tagline: 'An accessible healthcare discovery platform solving medicine search exhaustion with zero-login drug searches, distance-sorted pharmacy inventory, and live map navigation.',
    image: pharmaScoutImg,
    link: 'https://pharma-scout.online/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Frontend Developer & Security Architect',
    roleLeadStatement: 'As Frontend Developer & Security Architect, I built the account-free medicine search interface, geolocation distance-sorting engine, interactive map navigation, and multi-tier API rate limiting and data sanitization.',
    roleHighlights: [
      {
        label: 'ZERO-FRICTION PATIENT SEARCH',
        text: 'Engineered an account-free medicine search interface with automatic location detection, sorting pharmacies by distance with one-click map navigation.'
      },
      {
        label: 'PHARMACY INVENTORY CONTROLS',
        text: 'Designed intuitive stock toggle controls in Firestore allowing pharmacy staff to instantly update drug availability without complex software.'
      },
      {
        label: 'SECURITY & RATE LIMITING',
        text: 'Implemented strict input sanitization, multi-level query rate limiting, and secure Cloudinary/Resend pipelines to protect healthcare data and scale reliably.'
      }
    ],
    timeline: '2024 - 2025',
    status: 'Live & Deployed',
    client: 'Healthcare / Digital Pharmacy Discovery Network (Cameroon)',
    description:
      'Solves medicine search exhaustion with zero-login drug availability searches, distance sorting, and direct pharmacy map navigation.',
    tags: ['React', 'CSS3', 'Firebase', 'Cloud Firestore', 'Cloudinary', 'Resend API', 'Rate Limiting & Sanitization'],
    overview:
      'After receiving doctor prescriptions, patients in Cameroon face medicine search exhaustion—exhausting walks from one pharmacy to another searching for unavailable drugs, wasting critical time, money, and energy during acute illness. Pharma-Scout eliminates this physical and financial toll. With no account creation required, patients search for medications instantly, detect their location, view verified pharmacy stock sorted by proximity, and navigate directly using map coordinates. Pharmacists keep stock accurate via simple toggle controls, while backend security layers enforce input sanitization and rate limiting to prevent abuse.',
    challenge:
      'Patients dealing with urgent sickness or caring for sick relatives had no way to know which local pharmacy held their prescribed drugs in stock, forcing them into dangerous physical searches. Furthermore, platforms requiring account creation or passwords discourage sick users, while open public healthcare queries must be protected against malicious scraping, denial-of-service spikes, and unsanitized search payloads.',
    solution:
      'We engineered a friction-free healthcare web platform where patients search immediately without logins. The application captures the user’s location, queries verified pharmacies in Firestore, sorts results by geographic distance, and provides interactive map directions. Pharmacies manage live availability with lightweight toggle switches. Behind the scenes, the architecture enforces input sanitization, request rate limiting, Cloudinary prescription storage, and Resend transactional notification verification.',
    myRole: [
      'Built the responsive React frontend using modern CSS3 layouts optimized for rapid mobile search performance.',
      'Implemented the zero-friction patient flow: eliminated account barriers, enabling instant prescription searches with geolocation detection.',
      'Engineered proximity distance calculation algorithms and interactive map location routing to guide patients straight to the nearest stocked pharmacy.',
      'Created the streamlined pharmacy management interface with quick-toggle stock updates, avoiding complicated back-office software.',
      'Architected enterprise-grade security protocols: input sanitization against injection attacks, API rate limiting to thwart inventory scraping, and secure Cloudinary media pipelines.'
    ],
    keyFeatures: [
      {
        title: 'Zero-Login Medicine Search',
        description: 'Patients can search generic molecules or brand names instantly with zero registration or login requirements, removing friction during medical emergencies.'
      },
      {
        title: 'Geolocation & Proximity Distance Sorting',
        description: 'Captures user location and ranks pharmacies with confirmed drug stock by physical distance, ensuring patients locate the closest available medicine first.'
      },
      {
        title: 'Interactive Map Navigation',
        description: 'Provides direct map coordinates and route navigation to guide patients directly to the target pharmacy without getting lost.'
      },
      {
        title: 'One-Click Pharmacy Stock Toggles',
        description: 'Pharmacy staff can mark medications in stock or out of stock in seconds using lightweight toggle switches synced to Cloud Firestore.'
      },
      {
        title: 'Input Sanitization & Injection Defense',
        description: 'Rigorous sanitization filters on all query inputs protect the Firestore database from malicious search payloads and code injections.'
      },
      {
        title: 'API Rate Limiting & Scalability Controls',
        description: 'Multi-tier rate limiting defends inventory endpoints against automated scrapers and ensures consistent sub-second response times during traffic spikes.'
      }
    ],
    architecture: {
      frontend: 'React, CSS3 Modern Flex/Grid Layouts, Geolocation API, Map Integration',
      backend: 'Firebase Cloud Backend Services, Resend Email API',
      database: 'Cloud Firestore Realtime NoSQL with Security Rules',
      deployment: 'Custom Domain (pharma-scout.online), Cloudinary Storage, Netlify / Cloudflare'
    },
    challengesSolved: [
      {
        title: 'Mitigating Inventory Scraping & Endpoint Abuse With Rate Limiting',
        solution: 'Public search endpoints without logins risk automated competitor scraping and denial-of-service spikes. We engineered a token-bucket rate limiter that throttles repeated bursts while allowing legitimate patients to query stock freely and smoothly.'
      },
      {
        title: 'Input Sanitization & Secure Real-Time Inventory Sync',
        solution: 'Implemented comprehensive input sanitization routines on client and server boundaries to prevent malformed queries from degrading Firestore query performance, paired with atomic stock locks that prevent double-reservations.'
      }
    ]
  },
  {
    id: 'ksearch',
    name: 'KSearch',
    year: '2026',
    category: 'Advertising',
    projectType: 'Exploration',
    shortSummary: 'Google Ads prototype with keyword bidding, price-based search display, and click tracking.',
    leadStatement: 'KSearch is a Google Ads-style search advertising prototype where advertisers create accounts, submit keyword campaigns, complete payments, and have their ads showcased in search results based on price with real-time click tracking.',
    briefChallenge: 'Simulating a full Google Ads ecosystem—from advertiser account creation and ad billing to keyword matching, price-ranked ad display, and click tracking—without heavy enterprise overhead.',
    briefApproach: 'A modular web architecture combining advertiser account management, payment flows, a search engine results interface that showcases ads ranked by price/bid, and click-registration logging.',
    briefOutcome: 'Successfully built an interactive Google Ads simulation with keyword-triggered ad placements, price-based ranking, and live click tracking in the search console.',
    title: 'KSearch - Search Advertising & Keyword Bidding Prototype',
    badge: 'EXPLORATION',
    tagline: 'A Google Ads web prototype featuring advertiser accounts, ad campaign submission, payment processing, price-based search ad showcase, and click tracking.',
    image: ksearchImg,
    link: 'https://intern-board2.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Frontend Developer & AdTech Architect',
    roleLeadStatement: 'As Frontend Developer & AdTech Architect, I designed the advertiser campaign wizard, keyword matching search engine, price-based ranking logic, and real-time click tracking console.',
    roleHighlights: [
      {
        label: 'ADVERTISER PORTAL & PAYMENT',
        text: 'Engineered account creation, ad application workflows, and payment setup for campaign budgeting.'
      },
      {
        label: 'PRICE-BASED AD SHOWCASE',
        text: 'Built the search ranking algorithm that displays keyword-targeted ads prioritized by advertiser price/bid.'
      },
      {
        label: 'SEARCH CONSOLE & CLICK TRACKING',
        text: 'Implemented search console integration that registers user clicks live and visualizes campaign keyword performance.'
      }
    ],
    timeline: '2026',
    status: 'Live Prototype',
    client: 'AdTech & Search Engine Marketing Exploration',
    description:
      'Google Ads-style prototype featuring account creation, keyword ad bidding, price-based search display, and click tracking.',
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Firebase', 'Cloud Firestore', 'Ad Bidding Engine'],
    overview:
      'KSearch is an interactive web prototype modeling the core mechanics of Google Ads. Advertisers create accounts, submit ad creatives, specify targeted search keywords, and complete payments. When visitors query matching keywords in the search console, the system showcases ads ranked dynamically by their bidding price. Every click on a sponsored result is registered in real time to monitor engagement and campaign return.',
    challenge:
      'Designing a working search advertising system requires solving two interconnected sides: giving advertisers a straightforward way to create accounts, submit ads, and fund campaigns, while simultaneously powering a search console that matches user keyword queries, showcases top-bidding ads by price, and accurately tracks clicks without fraud or double-counting.',
    solution:
      'Developed an end-to-end prototype featuring a streamlined advertiser dashboard for campaign creation and payment, alongside an interactive search engine interface. Ads are mapped to specific keywords in Firestore; when a user searches, the engine queries matching ads and showcases them ranked by price. Clicks are logged instantly with real-time status updates.',
    myRole: [
      'Developed the advertiser onboarding flow: user account creation, campaign creative builder, and ad payment gateway.',
      'Built the search engine results page (SERP) with keyword matching that surfaces sponsored ads alongside organic results.',
      'Programmed the price-based ad showcase algorithm, ensuring ads with higher bids receive top visual priority.',
      'Engineered the click-registration pipeline that records user ad clicks and updates campaign analytics in the console.',
      'Styled the clean, high-contrast search interface using modern CSS with responsive layouts across mobile and desktop.'
    ],
    keyFeatures: [
      {
        title: 'Advertiser Account & Ad Application',
        description: 'Advertisers can create an account, configure new promotional campaigns, and submit headlines, descriptions, and destination URLs.'
      },
      {
        title: 'Campaign Payment & Budget Setup',
        description: 'Enables advertisers to set their ad spend and complete simulated payments to activate their campaigns.'
      },
      {
        title: 'Keyword-Targeted Search Display',
        description: 'When users search specific keywords in the search engine, the system retrieves and displays corresponding sponsored ads.'
      },
      {
        title: 'Price-Based Ad Ranking Showcase',
        description: 'Dynamic auction logic that ranks and showcases sponsored ads according to their bid price, giving priority to higher-value ads.'
      },
      {
        title: 'Real-Time Click Registration',
        description: 'Logs every visitor click on sponsored ad links, registering engagement metrics directly into the advertiser console.'
      },
      {
        title: 'Search Console Analytics',
        description: 'Displays campaign status, keyword impressions, and registered click counts in an intuitive moderation dashboard.'
      }
    ],
    architecture: {
      frontend: 'Semantic HTML5, CSS3 Custom Properties, Vanilla ES6+ JavaScript',
      backend: 'Firebase BaaS, Campaign Payment Simulation, Click Logger',
      database: 'Cloud Firestore (Keyword Indices, Ad Creatives, Click Logs)',
      deployment: 'Netlify Global Edge Hosting'
    },
    challengesSolved: [
      {
        title: 'Keyword Matching & Price-Ranked Ad Injection',
        solution: 'Built an efficient client-side query filter that matches search query tokens against active campaigns in Firestore, sorting results by price in milliseconds so sponsored ads appear instantly above organic results.'
      },
      {
        title: 'Reliable Click Tracking & Deduplication',
        solution: 'Implemented event-driven click registration that debounces rapid duplicate clicks and writes atomic click increments to Firestore before redirecting users to the target URL.'
      }
    ]
  },
  {
    id: 'foodbistro',
    name: 'FoodBistro',
    year: '2025',
    category: 'Food & Dining',
    projectType: 'Exploration',
    shortSummary: 'A 4-page restaurant website featuring interactive menus, add-to-cart ordering, and simulated checkout payment.',
    leadStatement: 'FoodBistro is a clean 4-page restaurant web application built with interactive dining menus, cart order management, and a seamless payment simulation flow.',
    briefChallenge: 'Creating an intuitive multi-page dining order experience with seamless cart state persistence and checkout simulation without heavy e-commerce overhead.',
    briefApproach: 'A lightweight 4-page architectural structure featuring interactive menu catalogs, dynamic cart calculations, and an instant payment simulation flow.',
    briefOutcome: 'Delivered a fluid, user-friendly 4-page restaurant web experience where visitors browse menus, add items to cart, and test complete checkout transactions.',
    title: 'FoodBistro - Restaurant Multi-Page App & Cart Checkout Prototype',
    badge: 'EXPLORATION',
    tagline: 'A 4-page restaurant web experience featuring curated dining menus, add-to-cart item management, and simulated payment checkout.',
    image: foodbistroImg,
    link: 'https://bistro-f.netlify.app/',
    github: 'https://github.com/Nchonganyi-Ernesto/',
    role: 'Frontend Developer & UI Designer',
    roleLeadStatement: 'As Frontend Developer & UI Designer, I crafted the 4-page restaurant architecture, interactive menu displays, client-side cart calculation engine, and simulated checkout flow.',
    roleHighlights: [
      {
        label: '4-PAGE RESTAURANT ARCHITECTURE',
        text: 'Structured a multi-page dining site covering home showcase, interactive food menus, cart review, and checkout pages.'
      },
      {
        label: 'ADD-TO-CART ENGINE',
        text: 'Engineered reactive cart state handling item additions, quantities, price subtotals, and persistent order lists.'
      },
      {
        label: 'PAYMENT SIMULATION',
        text: 'Built an intuitive checkout flow with payment method simulation and instantaneous order confirmation.'
      }
    ],
    timeline: '2025',
    status: 'Live Prototype',
    client: 'Restaurant & Food Service Exploration',
    description:
      'Simple 4-page restaurant website featuring curated food menus, dynamic add-to-cart ordering, and payment simulation.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Cart State Management', 'Payment Simulation'],
    overview:
      'FoodBistro is a streamlined 4-page restaurant web application designed for straightforward dining discovery and online ordering. Spanning four structured pages, the platform allows diners to explore appetizing menu selections, configure orders using an interactive add-to-cart system, review their basket, and walk through a realistic payment simulation for order completion.',
    challenge:
      'Many small restaurant sites either overwhelm users with cluttered single-page layouts or rely on static menu PDFs with no ordering capability. The goal was to build a clean 4-page restaurant experience that offers seamless menu browsing, reliable cart updates, and an authentic checkout payment simulation with zero friction.',
    solution:
      'Designed and implemented a clear 4-page navigation structure (Home, Menu, Cart, and Checkout). The application provides appetizing menu cards with one-click "Add to Cart" functionality, real-time quantity/subtotal calculations, and a simulated payment process with prompt order confirmation.',
    myRole: [
      'Architected the 4-page site hierarchy ensuring clean routing and responsive navigation between pages.',
      'Designed and styled modern restaurant menu layouts with clear item pricing and appetizing visual hierarchy.',
      'Programmed the add-to-cart shopping logic, managing cart item counters, subtotal math, and order modifications.',
      'Built the checkout payment simulation form with payment method selection and order confirmation feedback.',
      'Polished responsive mobile styling to ensure diners have a seamless ordering experience on smartphones.'
    ],
    keyFeatures: [
      {
        title: 'Structured 4-Page Site Flow',
        description: 'Clean multi-page setup organizing the dining experience across dedicated Home, Menu, Cart, and Checkout pages.'
      },
      {
        title: 'Interactive Menu Showcase',
        description: 'Appetizing food item cards displaying descriptions, prices, and high-quality imagery across various dish categories.'
      },
      {
        title: 'Dynamic Add-to-Cart System',
        description: 'Instant order additions with dynamic cart badge updates, item quantity adjusters, and live subtotal calculations.'
      },
      {
        title: 'Checkout & Payment Simulation',
        description: 'Realistic checkout form allowing users to select payment methods, input sample credentials, and trigger successful payment simulations.'
      },
      {
        title: 'Mobile-First Ordering Experience',
        description: 'Fully responsive layouts ensuring frictionless navigation, cart adjustments, and ordering on mobile devices.'
      }
    ],
    architecture: {
      frontend: 'Semantic HTML5, Advanced CSS Grid & Flexbox, Vanilla JavaScript',
      state: 'Client-Side Cart State & Order Calculation Engine',
      deployment: 'Netlify Edge Hosting'
    },
    challengesSolved: [
      {
        title: 'Synchronizing Multi-Page Cart State',
        solution: 'Implemented browser storage synchronization so that items added on the Menu page seamlessly carry over to the dedicated Cart and Checkout pages without state loss.'
      },
      {
        title: 'Simulating Realistic Payment Transactions',
        solution: 'Engineered a multi-step checkout modal that validates required billing fields, simulates payment processing latency, and presents a clear order receipt upon success.'
      }
    ]
  }
];
