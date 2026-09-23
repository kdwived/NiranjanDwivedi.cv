/**
 * All portfolio content lives here.
 * Edit this one file to update the site — the 3D world and the HTML
 * overlays both read from it.
 */

export const profile = {
  name: 'Niranjan Dwivedi',
  initials: 'ND',
  brand: 'Marketing × Technology × AI',
  tagline: 'Marketing meets technology, AI and automation.',
  intro:
    'I build growth-focused digital systems that connect marketing, sales, technology and automation into one practical ecosystem.',
  bio: [
    'I am a Marketing & Growth Professional with experience across digital marketing, performance marketing, lead generation, sales, CRM, analytics, technology and business development.',
    'My journey started with customer-facing sales roles and gradually evolved toward digital marketing, technology, AI and automation.',
    'Today, my focus is on building complete growth systems instead of treating marketing, sales and technology as separate functions.',
  ],
  philosophy: {
    line1: 'Marketing gets attention.',
    line2: 'Systems create growth.',
    body: 'My goal is to combine marketing, technology, AI and automation to create practical systems that help businesses acquire customers, improve conversions and scale.',
  },
  stats: [
    { value: '5+', label: 'Years experience' },
    { value: '4+', label: 'Core domains' },
    { value: '10', label: 'Certificates' },
    { value: '∞', label: 'Learning mindset' },
  ],
  location: 'Noida, Uttar Pradesh, India',
  origin: 'Bihar',
  email: 'dwivedin418@gmail.com',
  phone: '+91 9693675082',
  github: 'https://github.com/kdwived',
  facebook: 'https://www.facebook.com/kdwived',
  instagram: 'https://www.instagram.com/kdwived',
} as const

/**
 * Image slots.
 *
 * Drop the named file into the matching folder under `public/` and it appears —
 * no code change needed. Until then a labelled placeholder renders in its place,
 * so the layout is already built around the real thing.
 */
/**
 * SEO / AEO.
 *
 * `siteUrl` must be the live address with no trailing slash — it is used for
 * the canonical tag, the sitemap and every absolute URL in the structured data.
 * The FAQ below is rendered on the page AND emitted as FAQPage structured data,
 * which is what AI answer engines quote from.
 */
export const seo = {
  siteUrl: 'https://niranjandwivedi.cv',
  title: 'Niranjan Dwivedi — Marketing, Technology, AI & Automation',
  description:
    'Niranjan Dwivedi is a marketing and growth professional from Bihar, based in Noida, India. He builds growth systems that connect performance marketing, lead generation, CRM, AI automation and web development.',
  keywords: [
    'Niranjan Dwivedi',
    'Niranjan Dwivedi portfolio',
    'Niranjan Dwivedi marketing',
    'Niranjan Dwivedi Noida',
    'Superior Creative Creation',
    'performance marketing India',
    'lead generation specialist',
    'marketing automation consultant',
    'growth marketing portfolio',
  ],
  /** public/images/og-image.jpg — 1200 × 630, shown when the link is shared */
  ogImage: 'images/og-image.jpg',
  twitter: '',
} as const

export type Faq = { q: string; a: string }

/** Answers written the way a person would ask them — these feed FAQPage schema. */
export const faqs: Faq[] = [
  {
    q: 'Who is Niranjan Dwivedi?',
    a: 'Niranjan Dwivedi is a marketing and growth professional based in Noida, India, originally from Bihar. He works across digital marketing, performance marketing, lead generation, CRM, analytics, AI automation and web development, and is the founder of Superior Creative Creation.',
  },
  {
    q: 'What does Niranjan Dwivedi do?',
    a: 'He builds complete growth systems rather than isolated campaigns — connecting paid traffic on Google and Meta, landing pages, lead databases, WhatsApp and calling workflows, CRM follow-up and analytics into one measurable pipeline.',
  },
  {
    q: 'What tools and technologies does he work with?',
    a: 'Google Ads, Meta Ads, Google Analytics, SEO, WhatsApp marketing, CRM systems and Tata Dialer on the marketing side; React, JavaScript, TypeScript, Node.js, MongoDB, Tailwind CSS, GitHub and Vercel on the technology side; and n8n, Zapier and APIs for automation.',
  },
  {
    q: 'What is Superior Creative Creation?',
    a: 'Superior Creative Creation (SCC) is the marketing and technology practice Niranjan Dwivedi founded, covering digital growth, AI, automation, branding, websites and business systems.',
  },
  {
    q: 'How do I contact Niranjan Dwivedi?',
    a: 'Through the contact form on this site, by email at dwivedin418@gmail.com, or by phone on +91 9693675082. He is open to projects, collaborations and professional opportunities.',
  },
]

/**
 * Web3Forms — paste the access key from web3forms.com here and the contact
 * form posts straight to your inbox. Leave it empty and the form falls back to
 * opening the visitor's mail client instead, so it always works.
 */
export const web3formsKey = 'a4ad8834-9eaa-4e7a-8f3c-0df808e0ff64'

export const media = {
  /** public/images/portrait.jpg — the main hero photo */
  portrait: 'portrait.jpg',
  /** public/images/<file> — the small stack beside the portrait */
  heroGallery: ['work-1.jpg', 'work-2.jpg', 'work-3.jpg'],
  /** public/images/<file> — wide shot used in the About section */
  aboutShot: 'about.jpg',
} as const

export const growthFlow = [
  'Traffic',
  'Lead',
  'Qualification',
  'Sales',
  'Conversion',
  'Scale',
] as const

export const systemFlow = [
  { n: '01', label: 'TRAFFIC' },
  { n: '02', label: 'LEAD' },
  { n: '03', label: 'CRM' },
  { n: '04', label: 'AI' },
  { n: '05', label: 'GROWTH' },
] as const

export type Capability = {
  n: string
  title: string
  body: string
  accent: string
  /** brand names — resolved to real logos by src/lib/brand.ts */
  tools: string[]
}

export const capabilities: Capability[] = [
  {
    n: '01',
    title: 'Digital Marketing',
    body: 'Digital marketing, performance campaigns, Google Ads, Meta Ads, social media and growth strategy.',
    accent: '#22d3ee',
    tools: ['Google Ads', 'Meta Ads', 'Google Analytics'],
  },
  {
    n: '02',
    title: 'Lead Generation',
    body: 'Lead generation, landing pages, qualification, nurturing, databases and conversion-focused campaigns.',
    accent: '#38bdf8',
    tools: ['Lead Generation', 'Landing Pages', 'WhatsApp Marketing'],
  },
  {
    n: '03',
    title: 'AI & Automation',
    body: 'AI workflows, automation, CRM systems, n8n, Zapier, APIs and connected business processes.',
    accent: '#8b5cf6',
    tools: ['n8n', 'Zapier', 'APIs'],
  },
  {
    n: '04',
    title: 'Web & Technology',
    body: 'Modern web development using React, JavaScript, TypeScript, Tailwind CSS, GitHub and Vercel.',
    accent: '#e879f9',
    tools: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    n: '05',
    title: 'CRM & Sales',
    body: 'CRM management, sales operations, follow-ups, customer relationships and performance reporting.',
    accent: '#34d399',
    tools: ['CRM', 'Tata Dialer', 'Google Sheets'],
  },
  {
    n: '06',
    title: 'Creative & Branding',
    body: 'Creative design, Canva, UI/UX, social media creatives, branding and digital presentation.',
    accent: '#fbbf24',
    tools: ['Canva', 'Figma', 'UI/UX'],
  },
]

export const approach = [
  { n: '01', title: 'Understand', body: 'Business, audience and market.' },
  { n: '02', title: 'Acquire', body: 'Build traffic and acquisition.' },
  { n: '03', title: 'Convert', body: 'Create conversion experiences.' },
  { n: '04', title: 'Automate', body: 'Connect AI, CRM and workflows.' },
  { n: '05', title: 'Measure', body: 'Track KPIs and ROI.' },
  { n: '06', title: 'Scale', body: 'Optimize repeatable systems.' },
] as const

export const engine = [
  { title: 'Attract', body: 'Ads, SEO, social media and content.' },
  { title: 'Convert', body: 'Landing pages, leads and sales systems.' },
  { title: 'Scale', body: 'Analytics, automation and optimization.' },
] as const

export const toolkit = [
  'Google Ads',
  'Meta Ads',
  'Google Analytics',
  'SEO',
  'WhatsApp Marketing',
  'CRM',
  'Tata Dialer',
  'Excel',
  'Google Sheets',
  'React',
  'JavaScript',
  'TypeScript',
  'Tailwind CSS',
  'GitHub',
  'Vercel',
  'n8n',
  'Zapier',
  'APIs',
  'Canva',
  'UI/UX',
] as const

export type SkillCategory = {
  category: string
  color: string
  items: { name: string; level: number }[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Programming',
    color: '#22d3ee',
    items: [
      { name: 'JavaScript', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'TypeScript', level: 75 },
    ],
  },
  {
    category: 'Frameworks',
    color: '#8b5cf6',
    items: [
      { name: 'React.js', level: 88 },
      { name: 'Redux Toolkit', level: 78 },
      { name: 'Node.js', level: 74 },
      { name: 'Express.js', level: 72 },
    ],
  },
  {
    category: 'Web Technologies',
    color: '#e879f9',
    items: [
      { name: 'HTML5', level: 92 },
      { name: 'CSS3', level: 88 },
      { name: 'Tailwind CSS', level: 86 },
    ],
  },
  {
    category: 'Databases',
    color: '#34d399',
    items: [
      { name: 'MongoDB', level: 76 },
      { name: 'SQL Server', level: 70 },
    ],
  },
  {
    category: 'Tools',
    color: '#fbbf24',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Visual Studio Code', level: 92 },
      { name: 'Postman', level: 78 },
      { name: 'Figma', level: 80 },
    ],
  },
]

export type Project = {
  n: string
  kind: string
  category: string
  title: string
  body: string
  tags: string[]
  accent: string
  /** optional outward link shown on the detail card */
  link?: string
  /** what the project actually moved — shown in the detail view */
  highlights: string[]
  /** file names under public/projects/ — placeholders render until you add them */
  images: string[]
}

export const projects: Project[] = [
  {
    n: '01',
    kind: 'MARKETING SYSTEM',
    category: 'Performance Marketing',
    title: 'Performance Lead Generation System',
    body: 'Built and managed a performance-driven lead generation ecosystem combining paid advertising, landing pages, lead databases, WhatsApp communication, calling campaigns and structured sales follow-up to generate and convert business leads at scale.',
    tags: [
      'Meta Ads',
      'Google Ads',
      'Lead Generation',
      'Landing Pages',
      'WhatsApp API',
      'Tata Dialer',
    ],
    accent: '#22d3ee',
    link: '',
    highlights: [
      'Paid traffic on Meta and Google feeding a single qualified lead pool',
      'Landing pages and WhatsApp flows built for one action, not many',
      'Calling campaigns run off the same database the ads fill',
      'Follow-up structured by lead age — fresh, aged, interested',
    ],
    images: ['lead-gen-1.jpg', 'lead-gen-2.jpg'],
  },
  {
    n: '02',
    kind: 'AUTOMATION SYSTEM',
    category: 'CRM & Automation',
    title: 'Lead Management & Sales Automation',
    body: 'Designed a structured lead management workflow connecting marketing sources with sales operations. Fresh, aged and interested leads were organised into calling campaigns while tracking dispositions, follow-ups and campaign performance.',
    tags: [
      'CRM',
      'Tata Dialer',
      'Lead Management',
      'Sales Automation',
      'Google Sheets',
      'Data Management',
    ],
    accent: '#8b5cf6',
    link: '',
    highlights: [
      'Marketing sources mapped directly onto sales operations',
      'Leads bucketed into calling campaigns by state and intent',
      'Dispositions and follow-ups tracked per agent and per campaign',
      'Campaign performance readable from the same sheet the team works in',
    ],
    images: ['crm-1.jpg', 'crm-2.jpg'],
  },
  {
    n: '03',
    kind: 'GROWTH SYSTEM',
    category: 'Growth & Analytics',
    title: 'Marketing Performance & Growth System',
    body: 'Developed a data-driven marketing approach focused on reducing acquisition cost, improving lead quality, optimising campaigns and connecting digital marketing activity with measurable sales outcomes and business growth.',
    tags: [
      'Performance Marketing',
      'Data Analytics',
      'Campaign Optimization',
      'Conversion Strategy',
      'Automation',
    ],
    accent: '#e879f9',
    link: '',
    highlights: [
      'Acquisition cost tracked per source, not per platform',
      'Lead quality scored so spend follows what converts',
      'Campaigns optimised against sales outcomes, not clicks',
      'Reporting that ties marketing activity to business growth',
    ],
    images: ['growth-1.jpg', 'growth-2.jpg'],
  },
  {
    n: '04',
    kind: 'WEB PROJECT',
    category: 'Web & Personal Brand',
    title: 'Niranjan Dwivedi Portfolio',
    body: 'Designed and developed a premium personal portfolio combining personal branding, performance marketing, technology, AI, automation, projects, education and professional capabilities into a modern interactive digital experience.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'GitHub'],
    accent: '#34d399',
    link: 'https://niranjandwivedi.cv',
    highlights: [
      'Personal brand, capabilities and proof in one interactive experience',
      'Built with React, TypeScript and Vite, deployed on Vercel',
      'Content-driven — every section reads from a single typed data file',
      'Designed for recruiters and clients to scan in under a minute',
    ],
    images: ['portfolio-1.jpg', 'portfolio-2.jpg'],
  },
]

export const projectDNA = [
  {
    title: 'Marketing',
    body: 'Performance campaigns, lead generation and conversion systems.',
  },
  { title: 'Automation', body: 'Structured workflows connecting marketing, data and sales.' },
  {
    title: 'AI & Technology',
    body: 'Technology-led systems designed to improve productivity and scale.',
  },
  { title: 'Data', body: 'Lead data, campaign insights and performance-driven decision making.' },
] as const

export type Job = {
  n: string
  badge: string
  status: string
  role: string
  company: string
  period: string
  body: string
  tags: string[]
}

export const experience: Job[] = [
  {
    n: '01',
    badge: 'MARKETING MANAGER',
    status: 'CURRENT',
    role: 'Founder / Marketing & Growth',
    company: 'Superior Creative Creation',
    period: 'Current',
    body: 'Building and developing SCC with a focus on marketing, business growth, technology, AI, automation and digital systems. Working across strategy, execution, lead generation, branding, technology and growth-oriented business solutions.',
    tags: [
      'Business Strategy',
      'Performance Marketing',
      'AI',
      'Automation',
      'Lead Generation',
      'Digital Growth',
    ],
  },
  {
    n: '02',
    badge: 'LEAD GENERATION',
    status: 'COMPLETED',
    role: 'Data Analyst',
    company: 'Enego Services Pvt. Ltd.',
    period: '2025',
    body: 'Worked across lead management, sales operations, customer acquisition, CRM workflows, MSME funding marketing and business-growth campaigns, using Meta and Google lead-generation platforms with a supporting database layer.',
    tags: ['Meta Ads / Google Ads', 'Data Scraping', 'MongoDB', 'JavaScript', 'Automation'],
  },
  {
    n: '03',
    badge: 'INTERNSHIP',
    status: 'COMPLETED',
    role: 'Web Developer Intern',
    company: 'Safe Your Web',
    period: '2024',
    body: 'Contributed to developing a "Security Captain Appointment" page and enhancing frontend functionality using ReactJS and Redux Toolkit.',
    tags: ['ReactJS', 'Redux Toolkit', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    n: '04',
    badge: 'INTERNSHIP',
    status: 'COMPLETED',
    role: 'Frontend Developer Intern',
    company: 'CodSoft',
    period: '2024',
    body: 'Contributed to various software development projects by creating responsive user interfaces, implementing interactive features and improving practical frontend development skills.',
    tags: ['React.js', 'CSS3', 'JavaScript', 'Figma', 'Git'],
  },
  {
    n: '05',
    badge: 'MARKETING',
    status: 'COMPLETED',
    role: 'Marketing Manager',
    company: 'Binding Bricks Buildtech',
    period: 'Professional experience',
    body: 'Handled digital marketing, lead generation, Google Ads, Meta campaigns, analytics, sales coordination and brand visibility.',
    tags: [
      'Digital Marketing',
      'Lead Generation',
      'Meta Ads',
      'Google Ads',
      'Campaign Management',
      'Growth',
    ],
  },
  {
    n: '06',
    badge: 'BUSINESS',
    status: 'COMPLETED',
    role: 'Sales Supervisor',
    company: 'Bajaj Magadh Auto Agency',
    period: '2022 — 2024',
    body: 'Managed sales teams, daily performance, DSR reporting, customer relationships, targets and team productivity.',
    tags: ['Business Operations', 'Sales', 'Marketing', 'Customer Relations', 'Business Development'],
  },
  {
    n: '07',
    badge: 'FINANCE',
    status: 'COMPLETED',
    role: 'Sales Executive',
    company: 'Bajaj Finance',
    period: '2021 — 2022',
    body: 'Handled customer financing, documentation, customer support, transactions and monthly sales targets.',
    tags: ['Finance', 'Customer Management', 'Sales', 'Financial Services', 'Operations'],
  },
  {
    n: '08',
    badge: 'BUSINESS',
    status: 'COMPLETED',
    role: 'Sales Associate',
    company: 'Magadh Iron Pvt. Ltd.',
    period: '2018 — 2020',
    body: 'Worked with customer requirements, order processing, payment coordination and customer service.',
    tags: ['Business Operations', 'Sales', 'Customer Relations', 'Industrial Business'],
  },
]

export const education = [
  {
    n: 'QUALIFICATION 01',
    degree: "Bachelor's Degree",
    institute: 'B.S. College, Danapur',
    sub: 'Affiliated to Magadh University',
    year: '2020',
    place: 'Patna, Bihar',
    body: 'Built a foundation in business studies and practical digital skills, developing an understanding of business operations, communication and technology-driven problem solving.',
  },
  {
    n: 'QUALIFICATION 02',
    degree: 'Bachelor of Computer Applications (BCA)',
    institute: 'Indira Gandhi National Open University (IGNOU)',
    sub: 'New Delhi',
    year: '2020 – 2022',
    place: 'New Delhi',
    body: 'Developed a strong foundation in computer applications, programming, databases, web technologies and digital systems — supporting my ability to combine marketing with technology, automation, AI and data.',
  },
] as const

export const schooling = [
  { name: "St. Xavier's High School", label: 'Intermediate' },
  { name: 'St. Michael High School', label: 'Matriculation' },
] as const

export const learningAreas = [
  'Business & Management',
  'Computer Applications',
  'Programming',
  'Web Technologies',
  'Databases',
  'Digital Systems',
  'Data & Analytics',
  'Technology-driven Problem Solving',
] as const

export type Certificate = {
  year: string
  category: string
  title: string
  issuer: string
  date: string
  body: string
  tags: string[]
  /** file name under public/certificates/ — a labelled slot renders until you add it */
  image: string
  /** optional link to the original credential */
  link?: string
}

export const certificates: Certificate[] = [
  {
    year: '2022',
    category: 'Artificial Intelligence',
    title: 'Elements of AI',
    issuer: 'University of Helsinki • MinnaLearn',
    date: 'June 2022',
    body: 'Completed the Elements of AI online course, covering fundamental concepts and applications of artificial intelligence.',
    tags: ['Artificial Intelligence', 'AI Fundamentals', 'Machine Learning', 'Digital Technology'],
    image: 'elements-of-ai.jpg',
  },
  {
    year: '2022',
    category: 'Digital Marketing',
    title: 'Social Media Marketing',
    issuer: 'Great Learning Academy',
    date: 'June 2022',
    body: 'Successfully completed a course in social media marketing covering digital communication, content marketing and audience engagement.',
    tags: ['Social Media Marketing', 'Digital Marketing', 'Content Marketing', 'Audience Growth'],
    image: 'social-media-marketing.jpg',
  },
  {
    year: '2022',
    category: 'Sales & Business',
    title: 'Sales Management',
    issuer: 'Great Learning Academy',
    date: 'June 2022',
    body: 'Successfully completed a course focused on sales management, customer-oriented selling and business development fundamentals.',
    tags: ['Sales Management', 'Business Development', 'Customer Management', 'Sales Strategy'],
    image: 'sales-management.jpg',
  },
  {
    year: '2022',
    category: 'Programming',
    title: 'Python Programming in Hindi',
    issuer: 'Great Learning Academy',
    date: 'June 2022',
    body: 'Successfully completed a Python programming course covering programming fundamentals and problem-solving concepts.',
    tags: ['Python', 'Programming', 'Problem Solving', 'Programming Fundamentals'],
    image: 'python-programming.jpg',
  },
  {
    year: '2022',
    category: 'Digital Marketing',
    title: 'Introduction to Digital Marketing',
    issuer: 'Great Learning Academy',
    date: 'June 2022',
    body: 'Completed an introductory digital marketing course covering the fundamentals of online marketing and digital channels.',
    tags: ['Digital Marketing', 'Online Marketing', 'Marketing Strategy', 'Digital Channels'],
    image: 'intro-digital-marketing.jpg',
  },
  {
    year: '2022',
    category: 'Marketing & Business',
    title: 'Facebook Business Manager',
    issuer: 'Great Learning Academy',
    date: 'June 2022',
    body: 'Completed a course covering Facebook Business Manager and the management of business assets for digital marketing activities.',
    tags: ['Facebook Business Manager', 'Meta', 'Digital Marketing', 'Business Assets'],
    image: 'facebook-business-manager.jpg',
  },
  {
    year: '2019',
    category: 'Recognition',
    title: 'Magadh Iron Pvt. Ltd.',
    issuer: 'Magadh TMT Bars',
    date: '13 August 2019',
    body: 'Certificate of participation and recognition presented during the Magadh TMT Bars Raj Mistri Samman event.',
    tags: ['Recognition', 'Participation', 'Professional Appreciation'],
    image: 'magadh-iron-recognition.jpg',
  },
  {
    year: '2017',
    category: 'School Achievement',
    title: "St. Xavier's High School, Patna",
    issuer: 'Rakhi Making Competition',
    date: '5 August 2017',
    body: 'Certificate of recognition for standing first in the Rakhi Making Competition in 2017.',
    tags: ['Creativity', 'Competition', 'Craft', 'Achievement'],
    image: 'rakhi-competition.jpg',
  },
  {
    year: '2010',
    category: 'Academic Achievement',
    title: 'Global Talent Search Examination',
    issuer: 'Amity Institute for Competitive Examinations',
    date: '23 November 2010',
    body: 'Certificate of participation in the Global Talent Search Examination organised by Amity Institute for Competitive Examinations.',
    tags: ['Academic', 'Talent Search', 'Competitive Examination'],
    image: 'global-talent-search.jpg',
  },
  {
    year: '—',
    category: 'Content & Design',
    title: 'Content Designer',
    issuer: 'BrainTrain Publication',
    date: 'Date not specified',
    body: 'Certificate of Appreciation recognising achievement in educational design and competency in content design.',
    tags: ['Content Design', 'Educational Design', 'Visual Communication', 'Creative Design'],
    image: 'content-designer.jpg',
  },
]

export const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'engine', label: 'Growth Engine' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof sections)[number]['id']
