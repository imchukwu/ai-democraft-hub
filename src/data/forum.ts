/**
 * Single source of truth for all AI and Democracy Forum (AIDF 2026) content.
 * Hosted by Yiaga Africa and partners.
 */

export const forumMeta = {
  name: "AIDF 2026",
  fullName: "AI and Democracy Forum",
  themeHeadline: "WILL ALGORITHMS DETERMINE THE 2027 VOTE?",
  themeSubtitle: "Safeguarding Nigeria's 2027 General Election in the Age of Artificial Intelligence",
  convener: "Yiaga Africa and partners",
  date: "7th – 9th October 2026",
  dateShort: "7–9 Oct 2026",
  location: "Abuja, Nigeria",
  venue: "International Conference Centre, Abuja",
  edition: "First Edition · Annual Convening",
  tagline:
    "A national multi-stakeholder platform examining how Nigeria can govern and harness AI to strengthen the credibility of the 2027 elections and the resilience of its democracy.",
  intro:
    "Hosted by Yiaga Africa and partners ahead of the 2027 general elections, the AI and Democracy Forum (AIDF 2026) brings together electoral commissions, political parties, civil society, technology platforms, journalists, and researchers to address AI-enabled threats to electoral integrity and establish actionable safeguards.",
  registrationUrl: "/register",
  contactEmail: "aidf@yiaga.org",
  heroImage: "/images/attached-1.jpg",
};

export const navLinks = [
  { label: "About", to: "/about" },
  { label: "Program", to: "/program" },
  { label: "Speakers", to: "/speakers" },
  { label: "Innovation & Exhibition", to: "/sandbox" },
  { label: "Participants", to: "/participants" },
] as const;

export const forumQuestions = [
  "Will the algorithm or the citizen decide the vote in Nigeria's 2027 elections?",
  "How can INEC and election management bodies deploy AI tools responsibly while protecting voter trust?",
  "How do we combat synthetic deepfakes and targeted electoral disinformation?",
  "What regulatory standards and platform accountability measures are required for technology companies?",
  "How can civil society and journalists audit AI systems and defend the information commons?",
  "How do we establish the Abuja Accord on AI and Democracy to secure multi-stakeholder commitments for 2027?",
];

export const statistics = [
  { value: "500+", label: "Delegates", description: "National multi-stakeholder representatives" },
  { value: "30+", label: "Speakers", description: "Electoral leaders, researchers & innovators" },
  { value: "₦ Grant", label: "Sandbox Grant", description: "Funding implementation of 2027 AI ideas" },
  { value: "4", label: "Innovation Tracks", description: "Disinformation, inclusion, observation & trust" },
  { value: "1", label: "Abuja Accord", description: "Landmark multi-stakeholder commitment" },
];

export type Theme = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
};

export const themes: Theme[] = [
  {
    id: "elections",
    index: "01",
    title: "AI & Electoral Integrity",
    description:
      "Safeguarding election administration, voter registration, results management, and political campaigning against AI threats.",
    tags: ["INEC Safeguards", "BVAS/IReV Evolution", "Electoral Security"],
  },
  {
    id: "disinformation",
    index: "02",
    title: "Synthetic Media & Disinformation",
    description:
      "Countering generative AI deepfakes, candidate impersonation, and coordinated online manipulation ahead of 2027.",
    tags: ["Deepfake Detection", "Content Integrity", "Media Provenance"],
  },
  {
    id: "governance",
    index: "03",
    title: "AI Governance & Platform Accountability",
    description:
      "Establishing transparency standards, platform safety commitments, and legal frameworks for technology companies in Nigeria.",
    tags: ["Platform Safety", "Abuja Accord", "Regulatory Standards"],
  },
  {
    id: "civic-tech",
    index: "04",
    title: "Civic Tech & Innovation Sandbox",
    description:
      "Surfacing and funding home-grown AI solutions that advance voter education, election observation, and citizen oversight.",
    tags: ["Implementation Grant", "Civic AI Tools", "Local Languages"],
  },
];

export const sessionTypes = [
  "All",
  "Keynotes",
  "Panels",
  "Fireside Chats",
  "Workshops",
  "Demonstrations",
  "Sandbox",
] as const;
export type SessionType = (typeof sessionTypes)[number];

export type Session = {
  id: string;
  day: string;
  date: string;
  time: string;
  endTime: string;
  title: string;
  type: Exclude<SessionType, "All">;
  description: string;
  speakers: string[];
  location: string;
};

export const program: Session[] = [
  // Day 1 - Oct 7
  {
    id: "s1",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "09:00",
    endTime: "10:00",
    title: "Delegate Accreditation & Exhibition Opening",
    type: "Panels",
    description:
      "Delegates collect credentials and tour the AI & Democracy Exhibition featuring Microsoft, Meta, TikTok, and civic tech innovators.",
    speakers: [],
    location: "Exhibition Hall, Ground Floor",
  },
  {
    id: "s2",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "10:00",
    endTime: "12:00",
    title: "High-Level Opening Plenary: Will Algorithms Decide the 2027 Vote?",
    type: "Keynotes",
    description:
      "Framing presentations from Yiaga Africa, electoral commissions, security, civil society, media, and tech platform leaders on the stakes of AI for Nigeria's 2027 elections.",
    speakers: ["Samson Itodo", "INEC Leadership", "Hon. Lerato Mokoena", "Tech Platform Leads"],
    location: "Main Auditorium",
  },
  {
    id: "s3",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "13:30",
    endTime: "15:30",
    title: "Thematic Session 1: AI in Election Administration — Lessons from BVAS, IReV & Beyond",
    type: "Panels",
    description:
      "Examining how INEC and regional electoral commissions deploy AI in voter registration, results management, and cyberthreat detection while maintaining public trust.",
    speakers: ["Dr. Samuel Okonkwo", "ECONEC Secretariat", "Yiaga Africa Researchers"],
    location: "Main Auditorium",
  },
  {
    id: "s4",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "16:00",
    endTime: "17:30",
    title: "Masterclass: Detecting & Flagging Generative AI Deepfakes in Election Coverage",
    type: "Workshops",
    description:
      "Practical hands-on training for journalists, election observers, and party agents on verifying synthetic audio, video, and coordinated manipulation.",
    speakers: ["Nadia Haddad", "Fact-Checking Network Leads"],
    location: "Workshop Room A",
  },

  // Day 2 - Oct 8
  {
    id: "s5",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "09:30",
    endTime: "11:30",
    title: "Thematic Session 2: Platform Accountability, FIMI & Content Integrity Ahead of 2027",
    type: "Panels",
    description:
      "Technology platforms (Meta, TikTok, X, Microsoft) discuss rapid-response mechanisms, label transparency, and election safety measures for Nigeria.",
    speakers: ["Meta Policy Lead", "TikTok Safety Director", "Civil Society Watchdogs"],
    location: "Main Auditorium",
  },
  {
    id: "s6",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "12:00",
    endTime: "14:00",
    title: "The AI for Elections Innovation Sandbox: Live Grant Pitch Competition",
    type: "Sandbox",
    description:
      "Shortlisted innovators present live pitches before an expert jury competing for an implementation grant to deploy AI tools for the 2027 elections.",
    speakers: ["Sandbox Innovators Cohort", "Jury Panel"],
    location: "Demo Stage & Sandbox Arena",
  },
  {
    id: "s7",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "15:00",
    endTime: "17:00",
    title: "High-Level Policy Session: Drafting & Adopting the Abuja Accord on AI and Democracy",
    type: "Keynotes",
    description:
      "Multi-stakeholder signing of the Abuja Accord containing accountable pledges from INEC, political parties, tech platforms, civil society, and media.",
    speakers: ["Samson Itodo", "INEC Chairman", "Political Party Chairpersons", "Media Leads"],
    location: "Main Auditorium",
  },

  // Day 3 - Oct 9
  {
    id: "s8",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "09:00",
    endTime: "11:00",
    title: "Masterclasses & AI in Elections Academy: Hands-On Skills & Practical Tool Training",
    type: "Workshops",
    description:
      "Practical skills sessions providing hands-on training for election observers, journalists, party agents, and civil society actors on detecting and responding to AI-enabled electoral threats and deploying responsible AI tools.",
    speakers: ["Yiaga Africa Academy Leads", "Fact-Checking Experts", "Digital Rights Trainers"],
    location: "Workshop Rooms A & B",
  },
  {
    id: "s9",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "11:30",
    endTime: "13:30",
    title: "Thematic Session 3: Judicial Oversight of AI in Elections & Electoral Justice",
    type: "Panels",
    description:
      "Presenting the AEJN Toolkit on judicial oversight of AI in elections. Training judges, legal practitioners, and electoral tribunals on evaluating AI evidence and resolving technology-assisted electoral disputes.",
    speakers: ["Africa Electoral Justice Network Leads", "Judicial Officers", "Legal Tech Experts"],
    location: "Main Auditorium",
  },
  {
    id: "s10",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "14:30",
    endTime: "16:30",
    title: "Closing Plenary & Implementation Roadmap: Actioning the Abuja Accord for 2027",
    type: "Keynotes",
    description:
      "Announcement of the AI for Elections Innovation Sandbox Grant winner(s), presentation of the 2027 Electoral Integrity Roadmap, and official closing ceremony.",
    speakers: ["Samson Itodo", "INEC Leadership", "Sandbox Grant Winners", "Delegation Leads"],
    location: "Main Auditorium",
  },
];

export type Speaker = {
  id: string;
  name: string;
  position: string;
  organization: string;
  country: string;
  session: string;
  bio: string;
  expertise: string[];
  imageUrl: string;
  links: { label: string; url: string }[];
};

export const speakers: Speaker[] = [
  {
    id: "samson-itodo",
    name: "Samson Itodo",
    position: "Executive Director",
    organization: "Yiaga Africa",
    country: "Nigeria",
    session: "Opening Plenary & Abuja Accord",
    bio: "Samson Itodo is a leading democracy advocate and Executive Director of Yiaga Africa. He has pioneered election observation methodologies, youth political participation, and the flagship AI for Democracy workstream in Africa.",
    expertise: ["Electoral Reform", "Democracy Advocacy", "AI Governance"],
    imageUrl: "/images/speaker-amara.jpg",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "X (Twitter)", url: "https://x.com" },
    ],
  },
  {
    id: "lerato-mokoena",
    name: "Hon. Lerato Mokoena",
    position: "Chairperson, Pan-African Digital Ethics Commission",
    organization: "African Union Tech Taskforce",
    country: "South Africa",
    session: "Opening Plenary",
    bio: "Hon. Mokoena is a former parliamentarian and digital policy strategist advocating for sovereign African data infrastructure, algorithmic transparency, and ethical AI deployment in elections.",
    expertise: ["Policy & Regulation", "Sovereign Tech", "Data Rights"],
    imageUrl: "/images/speaker-lerato.jpg",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com" },
    ],
  },
  {
    id: "ify-balogun",
    name: "Ify Balogun",
    position: "Lead Election Tech Researcher",
    organization: "Yiaga Africa AI Workstream",
    country: "Nigeria",
    session: "AI in Election Administration",
    bio: "Ify leads Yiaga Africa's continental research mapping AI adoption across African election management bodies and evaluating counter-disinformation tech safeguards.",
    expertise: ["Election Tech", "Disinformation", "EMB Readiness"],
    imageUrl: "/images/speaker-ify.jpg",
    links: [
      { label: "X (Twitter)", url: "https://x.com" },
    ],
  },
  {
    id: "samuel-okonkwo",
    name: "Dr. Samuel Okonkwo",
    position: "Senior Electoral Technology Consultant",
    organization: "Independent National Electoral Commission (INEC)",
    country: "Nigeria",
    session: "AI in Election Administration",
    bio: "Dr. Okonkwo brings over 20 years of experience in electoral administration, voting technology verification (BVAS/IReV), and AI-driven voter registry auditing.",
    expertise: ["Electoral Administration", "BVAS/IReV Verification", "Legal Frameworks"],
    imageUrl: "/images/speaker-samuel.jpg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "nadia-haddad",
    name: "Nadia Haddad",
    position: "Senior Fellow for Media Freedom",
    organization: "Global Rights Observatory",
    country: "Tunisia",
    session: "Masterclass: Generative AI Deepfakes",
    bio: "Nadia is an investigative media researcher specializing in synthetic deepfake analysis, AI-assisted fact-checking tools, and press freedom protection during elections.",
    expertise: ["Synthetic Media", "Deepfake Detection", "Journalism Protection"],
    imageUrl: "/images/speaker-nadia.jpg",
    links: [
      { label: "X (Twitter)", url: "https://x.com" },
    ],
  },
  {
    id: "kwame-mensah",
    name: "Kwame Mensah",
    position: "Lead Architect",
    organization: "OpenDemocracy AI Labs",
    country: "Ghana",
    session: "Innovation Sandbox Jury",
    bio: "Kwame builds open-source natural language processing engines for African local languages to democratize access to public election information and voter education.",
    expertise: ["Open Source AI", "NLP", "Local Languages"],
    imageUrl: "/images/speaker-kwame.jpg",
    links: [
      { label: "GitHub", url: "https://github.com" },
    ],
  },
];

export type PartnerCategory =
  | "Host & Convener"
  | "Strategic Partners"
  | "Technology Exhibitors"
  | "Knowledge & Judicial Partners"
  | "Organizers"
  | "Supporting Partners"
  | "Technology Partners"
  | "Knowledge Partners"
  | "Media Partners";

export type Partner = {
  id: string;
  name: string;
  category: PartnerCategory;
  logoPlaceholder: string;
  website: string;
};

export const partners: Partner[] = [
  {
    id: "p1",
    name: "Yiaga Africa",
    category: "Host & Convener",
    logoPlaceholder: "YIAGA AFRICA",
    website: "https://yiaga.org",
  },
  {
    id: "p2",
    name: "Independent National Electoral Commission (INEC)",
    category: "Strategic Partners",
    logoPlaceholder: "INEC NIGERIA",
    website: "https://inecnigeria.org",
  },
  {
    id: "p3",
    name: "ECOWAS Network of Electoral Commissions (ECONEC)",
    category: "Strategic Partners",
    logoPlaceholder: "ECONEC WEST AFRICA",
    website: "https://ecowas.int",
  },
  {
    id: "p4",
    name: "Africa Electoral Justice Network (AEJN)",
    category: "Knowledge & Judicial Partners",
    logoPlaceholder: "AEJN JUDICIAL TOOLKIT",
    website: "https://example.org",
  },
  {
    id: "p5",
    name: "Microsoft",
    category: "Technology Exhibitors",
    logoPlaceholder: "MICROSOFT ELECTION SAFETY",
    website: "https://microsoft.com",
  },
  {
    id: "p6",
    name: "Meta (Facebook / Instagram / WhatsApp)",
    category: "Technology Exhibitors",
    logoPlaceholder: "META CONTENT INTEGRITY",
    website: "https://meta.com",
  },
  {
    id: "p7",
    name: "TikTok",
    category: "Technology Exhibitors",
    logoPlaceholder: "TIKTOK ELECTION CENTRE",
    website: "https://tiktok.com",
  },
];

export type SandboxTrack = {
  id: string;
  title: string;
  lookingFor: string;
};

export const sandboxTracks: SandboxTrack[] = [
  {
    id: "t1",
    title: "Countering Disinformation",
    lookingFor: "Tools to detect, catch, flag or debunk deepfakes, synthetic media and coordinated manipulation in real time.",
  },
  {
    id: "t2",
    title: "Voter Education & Inclusion",
    lookingFor: "Accessible, multilingual civic information and turnout tools, including for underserved groups.",
  },
  {
    id: "t3",
    title: "Election Observation & Data",
    lookingFor: "Innovations that strengthen citizen or institutional oversight, results analysis and verification.",
  },
  {
    id: "t4",
    title: "Transparency & Trust",
    lookingFor: "Tech solutions that make electoral processes and information more visible, verifiable and trustworthy.",
  },
];

export type SandboxProject = {
  id: string;
  name: string;
  organization: string;
  description: string;
  category:
    | "Countering Disinformation"
    | "Voter Education & Inclusion"
    | "Election Observation & Data"
    | "Transparency & Trust";
  country: string;
  demoStatus: "Implementation Grant Candidate" | "Live Prototype" | "Deployed System";
  imageUrl: string;
};

export const sandboxProjects: SandboxProject[] = [
  {
    id: "sb1",
    name: "VeriVote Monitor Pipeline",
    organization: "Civic Watch Alliance",
    description:
      "Automated election results verification using multimodal computer vision to audit polling unit results sheets against IReV data streams.",
    category: "Election Observation & Data",
    country: "Nigeria",
    demoStatus: "Implementation Grant Candidate",
    imageUrl: "/images/sandbox-verivote.jpg",
  },
  {
    id: "sb2",
    name: "Sauti AI: Multilingual Election Bot",
    organization: "OpenGov Africa",
    description:
      "Voice-first conversational AI interface in Hausa, Yoruba, Igbo, and Swahili enabling citizens to access verified voter education.",
    category: "Voter Education & Inclusion",
    country: "Nigeria & Kenya",
    demoStatus: "Deployed System",
    imageUrl: "/images/attached-1.jpg",
  },
  {
    id: "sb3",
    name: "DeepTrace Disinfo Observatory",
    organization: "Digital Rights Lab",
    description:
      "Real-time synthetic media detection toolkit helping newsrooms and observers verify viral candidate video and audio clips.",
    category: "Countering Disinformation",
    country: "Nigeria",
    demoStatus: "Implementation Grant Candidate",
    imageUrl: "/images/attached-2.jpg",
  },
  {
    id: "sb4",
    name: "PublicAudit AI Procurement Tracker",
    organization: "Transparent Futures",
    description:
      "Open-source machine learning model auditing electoral procurement data and identifying data privacy compliance vectors.",
    category: "Transparency & Trust",
    country: "Nigeria",
    demoStatus: "Live Prototype",
    imageUrl: "/images/attached-3.png",
  },
];

export type Exhibitor = {
  id: string;
  name: string;
  country: string;
  description: string;
  sector: "Technology Platform" | "Civic Tech" | "Research Institute" | "Startup";
  booth: string;
  website: string;
  logoPlaceholder: string;
};

export const exhibitors: Exhibitor[] = [
  {
    id: "ex1",
    name: "Microsoft Democracy Forward",
    country: "Global",
    description:
      "Demonstrating deepfake provenance tools, election safety measures, and AI threat intelligence for electoral commissions.",
    sector: "Technology Platform",
    booth: "Booth A-01",
    website: "https://microsoft.com",
    logoPlaceholder: "MICROSOFT",
  },
  {
    id: "ex2",
    name: "Meta Election Integrity Centre",
    country: "Global",
    description:
      "Showcasing AI content labelling, WhatsApp voter information channels, and rapid-response safety tools for 2027.",
    sector: "Technology Platform",
    booth: "Booth A-02",
    website: "https://meta.com",
    logoPlaceholder: "META",
  },
  {
    id: "ex3",
    name: "TikTok Content Safety & Civics",
    country: "Global",
    description:
      "Exhibiting TikTok Election Centre moderation tools, fact-checking partnerships, and synthetic media tags.",
    sector: "Technology Platform",
    booth: "Booth A-03",
    website: "https://tiktok.com",
    logoPlaceholder: "TIKTOK",
  },
  {
    id: "ex4",
    name: "Yiaga Africa AI for Democracy Lab",
    country: "Nigeria",
    description:
      "Exhibiting the EMB AI Guidelines, Judicial Toolkit, and continental research mapping AI across African election bodies.",
    sector: "Civic Tech",
    booth: "Booth B-01",
    website: "https://yiaga.org",
    logoPlaceholder: "YIAGA AFRICA",
  },
];

export const abujaAccordPledges = [
  {
    stakeholder: "Independent National Electoral Commission (INEC)",
    commitment: "Commitment to transparency and clear safeguards in any deployment of AI, protecting the integrity of voter registries, results management, and electoral infrastructure.",
  },
  {
    stakeholder: "Political Parties & Candidates",
    commitment: "Pledge to reject the malicious use of deepfakes, synthetic media, and AI-enabled disinformation campaigns, maintaining truthful political messaging.",
  },
  {
    stakeholder: "Technology Platforms (Meta, Microsoft, TikTok, X)",
    commitment: "Commitment to rapid-response election safety measures, content provenance, AI synthetic labelling, and proactive counter-manipulation ahead of 2027.",
  },
  {
    stakeholder: "Civil Society & Media",
    commitment: "Commitment to independent monitoring, systematic fact-checking, civic voter education, and holding institutional actors accountable across the 2027 election cycle.",
  },
];

export const participationCategories = [
  {
    title: "Election Management Bodies (INEC & ECONEC)",
    description: "Electoral commissioners, IT auditors, and election administration practitioners.",
  },
  {
    title: "Political Parties & Candidates",
    description: "Party leadership, campaign managers, and digital strategy teams.",
  },
  {
    title: "Technology Platforms & Developers",
    description: "Meta, Microsoft, TikTok, X, and civic tech startups building election tools.",
  },
  {
    title: "Civil Society & Human Rights Advocates",
    description: "NGO directors, digital rights defenders, and democracy watchdogs.",
  },
  {
    title: "Journalists & Media Professionals",
    description: "Reporters, fact-checkers, media executives, and investigation leads.",
  },
  {
    title: "Researchers & Academics",
    description: "Scholars, policy analysts, computer scientists, and ethics researchers.",
  },
];

export type Showcase = {
  id: string;
  title: string;
  category: string;
  organization: string;
  description: string;
  demonstrator: string;
  imageUrl: string;
  featured?: boolean;
};

export const showcases: Showcase[] = [
  {
    id: "sc1",
    title: "Auditing Electoral Disinformation at Scale: Lessons for 2027",
    category: "Election Technology",
    organization: "Yiaga Africa AI Workstream",
    description:
      "A comprehensive retrospective analyzing how automated monitoring detected synthetic media operations during recent elections.",
    demonstrator: "Yiaga Africa Research Team",
    imageUrl: "/images/showcase-elections.jpg",
    featured: true,
  },
];

export type Resource = {
  id: string;
  title: string;
  type: "Reports" | "Briefs" | "Research" | "Videos" | "Presentations" | "Publications";
  date: string;
  author: string;
  description: string;
  downloadUrl: string;
};

export const resources: Resource[] = [
  {
    id: "r1",
    title: "Mapping AI in Election Administration Across Africa",
    type: "Reports",
    date: "August 2026",
    author: "Yiaga Africa",
    description:
      "A landmark continental study mapping how election management bodies adopt AI, for what purposes, and with what safeguards.",
    downloadUrl: "#download",
  },
  {
    id: "r2",
    title: "Guidelines for Election Management Bodies on Responsible AI Deployment",
    type: "Briefs",
    date: "July 2026",
    author: "Yiaga Africa & ECONEC",
    description:
      "Actionable recommendations for electoral commissions navigating AI threats and deploying AI tools responsibly.",
    downloadUrl: "#download",
  },
  {
    id: "r3",
    title: "Judicial Oversight of Artificial Intelligence in Elections Toolkit",
    type: "Research",
    date: "June 2026",
    author: "Yiaga Africa & Africa Electoral Justice Network",
    description:
      "A specialized toolkit training judges and judicial officers on evaluating AI evidence and resolving technology election disputes.",
    downloadUrl: "#download",
  },
];

export type NewsArticle = {
  id: string;
  title: string;
  category: "Announcement" | "Speaker Update" | "Program Highlight" | "Sandbox News";
  date: string;
  summary: string;
  imageUrl: string;
  featured?: boolean;
};

export const newsArticles: NewsArticle[] = [
  {
    id: "n1",
    title: "Yiaga Africa Convenes Landmark AI and Democracy Forum Ahead of 2027 Polls",
    category: "Announcement",
    date: "25 August 2026",
    summary:
      "National platform launched in Abuja to establish multi-stakeholder safeguards against AI threats ahead of Nigeria's 2027 general election.",
    imageUrl: "/images/hero-forum.jpg",
    featured: true,
  },
];
