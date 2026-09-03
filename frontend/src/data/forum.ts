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
  venue: "Congress Hall, Transcorp Hilton, Abuja",
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
  // Pre-Day / Day 1 - Oct 7
  {
    id: "s0",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "All day",
    endTime: "",
    title: "Arrival and Delegates Accreditation",
    type: "Panels",
    description:
      "Delegates collect credentials and register at the accreditation desk.",
    speakers: [],
    location: "Exhibition Hall, Ground Floor",
  },
  {
    id: "s1",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "09:00",
    endTime: "09:15",
    title: "Opening Session: Welcome Remarks",
    type: "Panels",
    description:
      "Official welcome remarks opening the AI and Democracy Forum 2026.",
    speakers: ["INEC", "Yiaga Africa"],
    location: "Main Auditorium",
  },
  {
    id: "s2",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "09:15",
    endTime: "09:30",
    title: "Goodwill Messages",
    type: "Panels",
    description:
      "Opening goodwill messages from key institutional, legal, technology, and donor partners.",
    speakers: ["Political parties", "Tech companies", "Judiciary", "Donors"],
    location: "Main Auditorium",
  },
  {
    id: "s3",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "09:30",
    endTime: "10:00",
    title: "Keynote Address",
    type: "Keynotes",
    description:
      "Keynote presentation on electoral integrity and AI governance in Africa.",
    speakers: [
      "Mr. Erastus Ethekon (Chairperson, Independent Electoral and Boundaries Commission - IEBC, Kenya)",
    ],
    location: "Main Auditorium",
  },
  {
    id: "s4",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "10:00",
    endTime: "11:30",
    title:
      'High-Level Opening Plenary: "Will Algorithms Decide the 2027 Vote?" (Framing the Stakes of AI for 2027)',
    type: "Keynotes",
    description:
      "This plenary brings together the highest level of leadership to discuss electoral credibility, AI-enabled risks, and the safeguards required of all stakeholders. (Moderator: TBD)",
    speakers: [
      "Prof. Joash Amupitan SAN (Chairman, INEC)",
      "Dr. Bosun Tijani (Minister of Communications and Digital Economy)",
      "Hon. Justice Monica Dongban Memsen (President, Court of Appeal)",
      "Tech company representative (TBD)",
    ],
    location: "Main Auditorium",
  },
  {
    id: "s5",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "11:30",
    endTime: "12:00",
    title:
      "Tea Break & Official Launch of the Exhibition (Ribbon-Cutting + Walkthrough)",
    type: "Demonstrations",
    description:
      "Official ribbon-cutting ceremony and exhibition walkthrough showcasing AI tools for election integrity.",
    speakers: [],
    location: "Exhibition Hall, Ground Floor",
  },
  {
    id: "s6",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "12:00",
    endTime: "13:00",
    title:
      "Artificial Intelligence in Elections: Emerging Use Cases, Lessons Learned, and Critical Issues for Electoral Integrity",
    type: "Panels",
    description:
      "This session examines how AI may shape voter registration, results management, cybersecurity, and misinformation, sharing lessons learned and critical issues around bias, transparency, and trust.",
    speakers: ["Electoral Management Bodies", "Civic Tech Innovators", "AI Researchers"],
    location: "Main Auditorium",
  },
  {
    id: "s7",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "13:00",
    endTime: "14:00",
    title: "LUNCH & Networking Break",
    type: "Panels",
    description: "Delegate lunch and networking in the exhibition arena.",
    speakers: [],
    location: "Dining Hall & Exhibition Arena",
  },
  {
    id: "s8",
    day: "Day 1",
    date: "Wednesday, 7 October",
    time: "14:00",
    endTime: "15:30",
    title:
      "AI in Elections Academy Parallel Masterclasses: Election Managers and INEC Staff",
    type: "Workshops",
    description:
      "This practical masterclass session equips election management bodies and INEC staff with clear safeguards and operational AI guidelines, drawing on comparative international experience.",
    speakers: ["Yiaga Africa Academy Leads", "INEC Staff Trainers", "International Electoral Experts"],
    location: "Workshop Room A",
  },

  // Day 2 - Oct 8
  {
    id: "s-d2-1",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "09:00",
    endTime: "09:15",
    title: "Recap of Day One",
    type: "Panels",
    description:
      "Summary of key takeaways, consensus points, and high-level insights from Day One of the AI and Democracy Forum.",
    speakers: ["Yiaga Africa Rapporteur Team"],
    location: "Main Auditorium",
  },
  {
    id: "s-d2-2",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "09:15",
    endTime: "10:45",
    title:
      "The War for Reality: Deepfakes, Synthetic Media and Foreign Information Manipulation in Nigeria's 2027 Elections",
    type: "Panels",
    description:
      "This session examines how AI-generated content, synthetic media, candidate impersonation, and deepfakes can suppress voter turnout and distort Nigeria's 2027 elections. It analyzes threats, detection mechanisms, strategic communications by electoral bodies, and coordinated actions required of media, fact-checkers, and tech platforms to safeguard electoral integrity.",
    speakers: [
      "Fact-Checkers & Media Integrity Coalition Leads",
      "Synthetic Media & Forensic AI Researchers",
      "Digital Rights Observers",
    ],
    location: "Main Auditorium",
  },
  {
    id: "s-d2-3",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "10:45",
    endTime: "12:15",
    title:
      "Governing AI in Nigeria’s 2027 Elections: Safeguards, Accountability, and Electoral Integrity",
    type: "Keynotes",
    description:
      "This session examines regulatory and supervisory frameworks, institutional responsibilities, platform accountability, oversight mechanisms, and legal enforcement for governing AI in elections.",
    speakers: [
      "Prof. Okechukwu Ibeanu (Former National Commissioner, INEC)",
      "Dr. Lisa Poggaili (Chief AI Advisor, International Foundation for Electoral Systems - IFES)",
      "Electoral & Technology Governance Experts",
    ],
    location: "Main Auditorium",
  },
  {
    id: "s-d2-4",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "12:15",
    endTime: "17:00",
    title:
      "AI in Elections Academy II Parallel Masterclass: The AI Detection Lab",
    type: "Workshops",
    description:
      "This technical masterclass equips observers, journalists, and electoral staff to detect synthetic audio/video media and verify content during the 2027 electoral cycle. (Lunch break: 1:00pm – 2:00pm).",
    speakers: ["Digital Rights Trainers", "Forensic AI Experts", "Media Integrity Leads"],
    location: "Workshop Room A",
  },
  {
    id: "s-d2-5",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "12:15",
    endTime: "17:00",
    title:
      "AI in Elections Academy II Parallel Masterclass: EMB Playbook for Responsible AI Governance in Elections",
    type: "Workshops",
    description:
      "This masterclass provides Election Management Bodies (EMBs) with actionable intelligence and frameworks for robust governance, ethical standards, and accountability in AI deployment. The EMB Playbook provides practical guidelines for deploying, auditing, and regulating electoral AI tools while maintaining trust and technological sovereignty. (Lunch break: 1:00pm – 2:00pm).",
    speakers: ["INEC Governance Trainers", "IFES Electoral Specialists", "Yiaga Africa Academy Leads"],
    location: "Workshop Room B",
  },
  {
    id: "s-d2-6",
    day: "Day 2",
    date: "Thursday, 8 October",
    time: "12:15",
    endTime: "17:00",
    title:
      "AI in Elections Academy II Parallel Masterclass: Who Guards the Digital Gatekeepers? Platform Accountability in the 2027 Elections",
    type: "Workshops",
    description:
      "This session evaluates platform integrity operations and collaboration between technology companies, election commissions, and civil society for elections. It addresses rapid response, information provenance, and countering emerging threats ahead of 2027. (Lunch break: 1:00pm – 2:00pm).",
    speakers: [
      "Tech Platform Integrity Directors",
      "Media Regulators & Civil Society Watchdogs",
    ],
    location: "Demo Stage & Sandbox Arena",
  },

  // Day 3 - Oct 9
  {
    id: "s-d3-1",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "09:00",
    endTime: "09:15",
    title: "Recap of Day Two",
    type: "Panels",
    description:
      "Summary of key takeaways, consensus points, and masterclass insights from Day Two of the AI and Democracy Forum.",
    speakers: ["Yiaga Africa Rapporteur Team"],
    location: "Main Auditorium",
  },
  {
    id: "s-d3-2",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "09:15",
    endTime: "10:30",
    title: "Panel Session: Abuja Accord on AI and Democracy",
    type: "Keynotes",
    description:
      "The panel session will outline shared principles, commitments, and priority actions to promote the ethical, transparent, accountable, and secure use of AI in elections and democratic governance. The Accord is intended to serve as a roadmap for collaboration ahead of the 2027 general elections, strengthening coordination among key stakeholders while safeguarding electoral integrity, information integrity, and public trust in democratic processes.",
    speakers: [
      "Electoral Commissioners & INEC Leadership",
      "Technology Platform Policy Leads",
      "Civil Society & Media Signatories",
    ],
    location: "Main Auditorium",
  },
  {
    id: "s-d3-3",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "10:30",
    endTime: "13:00",
    title: "AI for Elections Sandbox — Grand Finale",
    type: "Sandbox",
    description:
      "The AI for Elections Sandbox – Grand Finale showcases the most promising AI-powered solutions addressing challenges in Nigeria's electoral process. Shortlisted innovators will pitch their ideas live before an expert jury comprising election administrators, technology leaders, investors, civil society, and democracy practitioners.",
    speakers: [
      "Shortlisted Innovation Pitchers",
      "Expert Jury Panel (Election Administrators, Tech Leaders, Investors)",
    ],
    location: "Demo Stage & Sandbox Arena",
  },
  {
    id: "s-d3-4",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "13:00",
    endTime: "14:00",
    title: "LUNCH",
    type: "Panels",
    description: "Delegate lunch break and informal networking.",
    speakers: [],
    location: "Dining Hall & Exhibition Arena",
  },
  {
    id: "s-d3-5",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "14:00",
    endTime: "14:30",
    title: "AI for Elections Sandbox - Award & Grant Presentation",
    type: "Sandbox",
    description:
      "The session celebrates the winners of the AI for Elections Innovation Sandbox, recognizing outstanding AI-driven solutions with the potential to strengthen electoral integrity and democratic participation ahead of Nigeria's 2027 general elections.",
    speakers: ["Grant Award Winners", "Yiaga Africa Leadership", "GIZ Representative"],
    location: "Main Auditorium",
  },
  {
    id: "s-d3-6",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "14:30",
    endTime: "15:30",
    title: "Closing Plenary",
    type: "Keynotes",
    description:
      "Partners closing remarks and official summary of commitments from conveners, electoral authorities, and international partners.",
    speakers: ["Partners Closing Remarks (Yiaga Africa, INEC, GIZ, Partner Leaders)"],
    location: "Main Auditorium",
  },
  {
    id: "s-d3-7",
    day: "Day 3",
    date: "Friday, 9 October",
    time: "15:30",
    endTime: "",
    title: "Closing",
    type: "Panels",
    description: "Official adjournment and conclusion of the AI and Democracy Forum (AIDF 2026).",
    speakers: [],
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
    id: "speaker-erastus",
    name: "Mr. Erastus Ethekon",
    position: "Chairperson",
    organization: "Independent Electoral and Boundaries Commission (IEBC), Kenya",
    country: "Kenya",
    session: "Keynote Address (Day 1)",
    bio: "Mr. Erastus Ethekon is the Chairperson of the Independent Electoral and Boundaries Commission (IEBC), Kenya. He is a prominent electoral leader advocating for electoral technology governance, institutional independence, and regional cooperation across African election management bodies.",
    expertise: ["Electoral Governance", "Election Administration", "Regional Cooperation"],
    imageUrl: "/images/speakers/erastus.jpeg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "speaker-joash",
    name: "Prof. Joash Amupitan SAN",
    position: "Chairman",
    organization: "Independent National Electoral Commission (INEC)",
    country: "Nigeria",
    session: "High-Level Opening Plenary (Day 1)",
    bio: "Prof. Joash Amupitan SAN is the Chairman of the Independent National Electoral Commission (INEC). He is a Senior Advocate of Nigeria and leading legal scholar specializing in constitutional law, electoral administration, and safeguarding democratic processes.",
    expertise: ["Electoral Administration", "Constitutional Law", "Electoral Safeguards"],
    imageUrl: "/images/speakers/joash.jpeg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "speaker-bosun",
    name: "Dr. Bosun Tijani",
    position: "Minister of Communications and Digital Economy",
    organization: "Federal Ministry of Communications, Innovation and Digital Economy",
    country: "Nigeria",
    session: "High-Level Opening Plenary (Day 1)",
    bio: "Dr. Bosun Tijani is Nigeria's Minister of Communications, Innovation and Digital Economy. A pioneer in Africa's tech ecosystem, he leads national digital transformation strategies, AI governance policy, and tech infrastructure expansion.",
    expertise: ["Digital Economy", "AI Policy", "Tech Innovation", "Governance"],
    imageUrl: "/images/speakers/bosun.jpeg",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "X (Twitter)", url: "https://x.com" },
    ],
  },
  {
    id: "speaker-monica",
    name: "Hon. Justice Monica Dongban-Mensem",
    position: "President",
    organization: "Court of Appeal of Nigeria",
    country: "Nigeria",
    session: "High-Level Opening Plenary (Day 1)",
    bio: "Hon. Justice Monica Dongban-Mensem is the President of the Court of Appeal of Nigeria. She is a distinguished jurist guiding judicial oversight, election petition tribunals, and legal frameworks for evaluating technology evidence in Nigeria.",
    expertise: ["Electoral Justice", "Judicial Oversight", "Legal Evidence"],
    imageUrl: "/images/speakers/monica.jpeg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "speaker-ibeanu",
    name: "Prof. Okechukwu Ibeanu",
    position: "Former National Commissioner",
    organization: "Independent National Electoral Commission (INEC)",
    country: "Nigeria",
    session: "Governing AI in Nigeria's 2027 Elections (Day 2)",
    bio: "Prof. Okechukwu Ibeanu is a distinguished professor of political science and former National Commissioner of the Independent National Electoral Commission (INEC). He has extensively researched electoral processes, technology governance, and institutional reforms across Africa.",
    expertise: ["Electoral Administration", "Political Science", "Electoral Integrity"],
    imageUrl: "/images/speakers/okechukwu.jpg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "speaker-lisa",
    name: "Dr. Lisa Poggiali",
    position: "Chief AI Advisor",
    organization: "International Foundation for Electoral Systems (IFES)",
    country: "United States",
    session: "Governing AI in Nigeria's 2027 Elections (Day 2)",
    bio: "Dr. Lisa Poggiali is Chief AI Advisor at the International Foundation for Electoral Systems (IFES), advising election management bodies globally on navigating AI risks, synthetic media threats, and ethical technology adoption in democratic processes.",
    expertise: ["AI Policy", "Electoral Tech Safeguards", "Synthetic Media Risk"],
    imageUrl: "/images/speakers/lisa.jpeg",
    links: [{ label: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: "speaker-samson",
    name: "Samson Itodo",
    position: "Executive Director",
    organization: "Yiaga Africa",
    country: "Nigeria",
    session: "Opening Plenary & Abuja Accord (Day 1 & Day 3)",
    bio: "Samson Itodo is a leading democracy advocate and Executive Director of Yiaga Africa. He has pioneered election observation methodologies, youth political participation, and the flagship AI for Democracy workstream in Africa.",
    expertise: ["Electoral Reform", "Democracy Advocacy", "AI Governance"],
    imageUrl: "/images/speakers/samson.jpg",
    links: [
      { label: "LinkedIn", url: "https://linkedin.com" },
      { label: "X (Twitter)", url: "https://x.com" },
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
  logoUrl?: string;
};

export const partners: Partner[] = [
  {
    id: "p1",
    name: "Yiaga Africa",
    category: "Host & Convener",
    logoPlaceholder: "YIAGA AFRICA",
    website: "https://yiaga.org",
    logoUrl: "/images/partners/yiaga.png",
  },
  {
    id: "p2",
    name: "Independent National Electoral Commission (INEC)",
    category: "Strategic Partners",
    logoPlaceholder: "INEC NIGERIA",
    website: "https://inecnigeria.org",
    logoUrl: "/images/partners/inec.png",
  },
  {
    id: "p3",
    name: "GiZ (Deutsche Gesellschaft für Internationale Zusammenarbeit)",
    category: "Strategic Partners",
    logoPlaceholder: "GIZ GERMANY",
    website: "https://giz.de",
    logoUrl: "/images/partners/giz.svg",
  },
  {
    id: "p4",
    name: "CJID (Centre for Journalism Innovation and Development)",
    category: "Knowledge Partners",
    logoPlaceholder: "CJID AFRICA",
    website: "https://thecjid.org",
    logoUrl: "/images/partners/cjid.jpg",
  },
  {
    id: "p5",
    name: "Dataphyte",
    category: "Media Partners",
    logoPlaceholder: "DATAPHYTE",
    website: "https://dataphyte.com",
    logoUrl: "/images/partners/dataphyte.jpg",
  },
  {
    id: "p6",
    name: "TechCabal",
    category: "Media Partners",
    logoPlaceholder: "TECHCABAL",
    website: "https://techcabal.com",
    logoUrl: "/images/partners/techcabal.jpg",
  },
  {
    id: "p7",
    name: "Microsoft Democracy Forward",
    category: "Technology Partners",
    logoPlaceholder: "MICROSOFT",
    website: "https://microsoft.com",
    logoUrl: "/images/partners/microsoft.svg",
  },
  {
    id: "p8",
    name: "Meta Election Integrity",
    category: "Technology Partners",
    logoPlaceholder: "META",
    website: "https://meta.com",
    logoUrl: "/images/partners/meta.jpg",
  },
  {
    id: "p9",
    name: "TikTok Safety & Civics",
    category: "Technology Partners",
    logoPlaceholder: "TIKTOK",
    website: "https://tiktok.com",
    logoUrl: "/images/partners/tiktok.jpg",
  },
];

export const exhibitionFocusAreas = [
  {
    id: "efa-1",
    title: "Synthetic Media & Content Labelling",
    description: "Detection and labelling of synthetic media and AI-generated content.",
  },
  {
    id: "efa-2",
    title: "Content Integrity & Platform Safety",
    description: "Content integrity, provenance and platform election-safety measures.",
  },
  {
    id: "efa-3",
    title: "Voter Information & Civic Accessibility",
    description: "Voter information, civic education and accessibility tools.",
  },
  {
    id: "efa-4",
    title: "Election Observation & Data Verification",
    description: "Election observation, results analysis and data-verification technologies.",
  },
  {
    id: "efa-5",
    title: "Fact-Checking & Rapid-Response",
    description: "Fact-checking, monitoring and rapid-response systems.",
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
