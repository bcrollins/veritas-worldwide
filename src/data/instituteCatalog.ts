export type InstituteTrackId =
  | 'ai-automation'
  | 'trades'
  | 'healthcare'
  | 'tech'
  | 'business'
  | 'money'
  | 'home-repair'
  | 'food-self-reliance'
  | 'preparedness'
  | 'communication'

export type InstituteArchetype =
  | 'ai-income'
  | 'career'
  | 'service-business'
  | 'money-system'
  | 'diy'
  | 'resilience'
  | 'communication'

export interface InstituteTrack {
  id: InstituteTrackId
  label: string
  shortLabel: string
  description: string
  demandSignal: string
  methodology: string
}

export interface InstituteTopicSeed {
  id: string
  slug: string
  track: InstituteTrackId
  archetype: InstituteArchetype
  skill: string
  courseTitle: string
  articleTitle: string
  summary: string
  whyNow: string
  firstAction: string
  keywords: string[]
  institutions: string[]
  timeToFirstResult: string
  difficulty: 'Foundational' | 'Moderate' | 'Advanced'
  outcome: string
  warning: string
  related: string[]
  tools: string[]
}

export interface InstituteTopic extends InstituteTopicSeed {
  trackMeta: InstituteTrack
}

export interface InstituteModule {
  title: string
  summary: string
  deliverable: string
  lessons: string[]
}

export interface InstituteStep {
  title: string
  detail: string
}

export interface InstituteFaq {
  question: string
  answer: string
}

export interface InstituteHighlight {
  title: string
  detail: string
}

export interface InstituteSprintWeek {
  title: string
  objective: string
  tasks: string[]
}

export interface InstituteCourseBundle {
  title: string
  llmSummary: string
  searchIntent: string
  idealFor: string[]
  prerequisites: string[]
  outcomes: string[]
  demandSignals: InstituteHighlight[]
  proofFramework: InstituteHighlight[]
  officialCheckpoints: InstituteHighlight[]
  modules: InstituteModule[]
  actionPlan: InstituteStep[]
  sprint: InstituteSprintWeek[]
  commonMistakes: string[]
  faq: InstituteFaq[]
  relatedQueries: string[]
}

export interface InstituteGuideBundle {
  title: string
  llmSummary: string
  quickAnswer: string
  searchIntent: string
  idealFor: string[]
  prerequisites: string[]
  officialCheckpoints: InstituteHighlight[]
  steps: InstituteStep[]
  commonMistakes: string[]
  faq: InstituteFaq[]
  relatedQueries: string[]
}

export interface InstituteBookSection {
  title: string
  summary: string
  quickAnswer: string
  steps: InstituteStep[]
  warning: string
  institutions: string[]
  proofFramework: InstituteHighlight[]
}

export interface InstituteFieldManualEntry {
  id: string
  category: string
  title: string
  summary: string
  whenToUse: string
  quickAnswer: string
  doNow: string[]
  avoid: string[]
  sourceAnchors: string[]
  relatedTopicSlug?: string
}

export const instituteTracks: InstituteTrack[] = [
  {
    id: 'ai-automation',
    label: 'AI, Automation, and Digital Leverage',
    shortLabel: 'AI & Automation',
    description: 'Search-intent around AI now converges on two questions: how to use it for work and how to use it to earn.',
    demandSignal: 'Grounded in OECD AI skill-demand data, Google upskilling patterns, and practical small-business adoption.',
    methodology: 'Earning claims stay cautious. Tactics are treated as circumstantial until they can be tied to disclosed outcomes or repeatable field evidence.',
  },
  {
    id: 'trades',
    label: 'Skilled Trades and Field Careers',
    shortLabel: 'Trades',
    description: 'Hands-on careers remain one of the fastest ways to convert training into income without a four-year reset.',
    demandSignal: 'Built from current U.S. labor-market demand and occupation pathways surfaced by the Bureau of Labor Statistics and apprenticeship systems.',
    methodology: 'Licensing, safety, and code constraints outrank speed. The institute never treats hazardous work as casual DIY.',
  },
  {
    id: 'healthcare',
    label: 'Healthcare and Care Careers',
    shortLabel: 'Healthcare',
    description: 'Healthcare-adjacent roles keep ranking high because they offer clear training pathways and durable demand.',
    demandSignal: 'Structured around public healthcare workforce demand, credential pathways, and stackable role transitions.',
    methodology: 'Clinical instruction is introductory only. High-stakes care always points back to accredited programs and supervised practice.',
  },
  {
    id: 'tech',
    label: 'Tech, Data, Cyber, and Cloud',
    shortLabel: 'Tech & Data',
    description: 'Employers continue to ask for practical tooling, troubleshooting, and applied AI-adjacent skills, not just credentials.',
    demandSignal: 'Informed by OECD AI skill-demand data, employer skill clusters, and current entry-level technical pathways.',
    methodology: 'Tool stacks change quickly, so the emphasis stays on portable workflows, proof of work, and diagnostic thinking.',
  },
  {
    id: 'business',
    label: 'Microbusiness, Freelancing, and the Creator Economy',
    shortLabel: 'Business',
    description: 'Search demand is clustering around low-overhead businesses and solo-operator service models that can start small.',
    demandSignal: 'Synthesized from small-business formation patterns, creator monetization behavior, and repeatable service-business models.',
    methodology: 'Revenue promises stay restrained. Cash flow, insurance, legal setup, and fulfillment discipline matter more than hype.',
  },
  {
    id: 'money',
    label: 'Money Systems, Career Leverage, and Financial Basics',
    shortLabel: 'Money Systems',
    description: 'People do not just search for more income. They search for ways to survive irregular income, debt pressure, and weak systems.',
    demandSignal: 'Aligned to persistent search demand around debt, budgeting, investing, raises, and career navigation.',
    methodology: 'This is educational, not individualized financial advice. Rules, tradeoffs, and official source ladders stay visible.',
  },
  {
    id: 'home-repair',
    label: 'Home Repair, Vehicles, and Practical Maintenance',
    shortLabel: 'Repair',
    description: 'Repair literacy is a cost-of-living skill. People search it because every ignored failure compounds.',
    demandSignal: 'Grounded in constant consumer demand for maintenance, repair, and household cost control.',
    methodology: 'Safety and code boundaries stay explicit. Readers are told when a licensed trade or inspection is the right move.',
  },
  {
    id: 'food-self-reliance',
    label: 'Food, Garden, and Self-Reliance',
    shortLabel: 'Food & Garden',
    description: 'The most durable resilience skills are the ones that reduce dependence before a crisis begins.',
    demandSignal: 'Built from ongoing search demand for gardening, food storage, preservation, backyard food systems, and household resilience.',
    methodology: 'Food safety outranks novelty. Preservation, storage, and animal-care guidance stays anchored to official extension and health guidance.',
  },
  {
    id: 'preparedness',
    label: 'Preparedness, Medical Readiness, and Grid-Down Resilience',
    shortLabel: 'Preparedness',
    description: 'Preparedness content wins trust only when it rejects fear-bait and focuses on systems, drills, and recovery.',
    demandSignal: 'Mapped to public readiness guidance, emergency planning demand, and repeated household search behavior during disasters.',
    methodology: 'Preparedness is a discipline of redundancy and rehearsal, not apocalyptic theater. Medical and safety claims stay conservative.',
  },
  {
    id: 'communication',
    label: 'Communication, Learning, and Human Core Skills',
    shortLabel: 'Core Skills',
    description: 'The highest-leverage skill stack in 2026 still includes writing, explaining, negotiating, and learning quickly.',
    demandSignal: 'Informed by employer demand for communication, problem-solving, research, and management-adjacent skills.',
    methodology: 'The focus stays on transferable practice systems rather than personality myths or charisma marketing.',
  },
]

const trackMap = new Map(instituteTracks.map((track) => [track.id, track]))

function topic(seed: InstituteTopicSeed): InstituteTopicSeed {
  return seed
}

const aiAutomationTopics = [
  topic({
    id: 'ai-make-money',
    slug: 'how-to-use-ai-to-make-money',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI to make money',
    courseTitle: 'How to Use AI to Make Money in 2026',
    articleTitle: 'How to Use AI to Make Money in 2026: Services, Systems, and the First $1,000',
    summary: 'Turn AI from curiosity into revenue by packaging outcomes clients already pay for and enforcing real quality control.',
    whyNow: 'Search demand is shifting from AI novelty to AI usefulness. Businesses want operators who can shorten workflows without creating junk.',
    firstAction: 'Choose one painful workflow you already understand and rebuild it into a before-and-after service offer.',
    keywords: ['how to use ai to make money', 'ai side hustle', 'make money with ai', 'ai income ideas'],
    institutions: ['OECD AI skill-demand report', 'Grow with Google', 'Small Business Administration'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A monetized AI-assisted service or product workflow',
    warning: 'Do not sell magic. Sell one narrow result, disclose the human review layer, and price for responsibility.',
    related: ['how-to-become-an-ai-automation-freelancer', 'how-to-build-ai-chatbots-for-small-business'],
    tools: ['LLM of choice', 'spreadsheet tracker', 'proposal template', 'QA checklist'],
  }),
  topic({
    id: 'ai-automation-freelancer',
    slug: 'how-to-become-an-ai-automation-freelancer',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Become an AI automation freelancer',
    courseTitle: 'Become an AI Automation Freelancer',
    articleTitle: 'How to Become an AI Automation Freelancer in 2026: Offers, Tool Stack, and First Clients',
    summary: 'Learn how to sell workflow automation that reduces repetitive work for small teams without overpromising full autonomy.',
    whyNow: 'Businesses are experimenting with automation, but most still need humans who can scope, build, test, and document the system.',
    firstAction: 'Audit three repetitive tasks in one industry you know and write a one-page automation offer for each.',
    keywords: ['ai automation freelancer', 'how to become an ai automation freelancer', 'automation consulting'],
    institutions: ['OECD AI skill-demand report', 'Small Business Administration', 'state business filing portal'],
    timeToFirstResult: '14-45 days',
    difficulty: 'Moderate',
    outcome: 'A repeatable freelance offer tied to measurable operational savings',
    warning: 'Never promise hands-off automation in regulated or customer-facing workflows without a visible human fallback.',
    related: ['how-to-use-ai-to-make-money', 'how-to-start-an-ai-agency'],
    tools: ['automation platform', 'process map', 'client intake form', 'SOP template'],
  }),
  topic({
    id: 'ai-agency',
    slug: 'how-to-start-an-ai-agency',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Start an AI agency',
    courseTitle: 'Start an AI Agency Without Hype',
    articleTitle: 'How to Start an AI Agency in 2026: Positioning, Packaging, Delivery, and Retainers',
    summary: 'Build a lean agency around one narrow capability, one buyer profile, and disciplined delivery instead of trend-chasing.',
    whyNow: 'Agency demand exists, but the market is already flooded with generic “AI experts.” Narrow specialization wins faster.',
    firstAction: 'Pick one buyer, one painful process, and one concrete transformation you can explain in a sentence.',
    keywords: ['how to start an ai agency', 'ai agency business', 'ai consulting agency'],
    institutions: ['Small Business Administration', 'OECD AI skill-demand report', 'IRS small business resources'],
    timeToFirstResult: '21-60 days',
    difficulty: 'Moderate',
    outcome: 'A specialized AI service agency with a credible market position',
    warning: 'If you cannot scope implementation and QA yourself, you do not have an agency yet. You have a trend deck.',
    related: ['how-to-become-an-ai-automation-freelancer', 'how-to-use-ai-for-marketing'],
    tools: ['service ladder', 'case study template', 'onboarding checklist', 'weekly reporting cadence'],
  }),
  topic({
    id: 'ai-bookkeeping',
    slug: 'how-to-use-ai-for-bookkeeping-and-back-office-work',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI for bookkeeping and back-office work',
    courseTitle: 'AI for Bookkeeping and Back-Office Work',
    articleTitle: 'How to Use AI for Bookkeeping and Back-Office Work in 2026 Without Breaking the Numbers',
    summary: 'Apply AI to intake, categorization, reconciliation prep, and reporting drafts while protecting accuracy and audit trails.',
    whyNow: 'Finance teams want time savings, but financial workflows still punish hallucinations and undocumented changes.',
    firstAction: 'Map which bookkeeping tasks are judgment-light, repeatable, and safe to automate with review.',
    keywords: ['ai bookkeeping', 'how to use ai for bookkeeping', 'ai back office automation'],
    institutions: ['IRS', 'Small Business Administration', 'AICPA'],
    timeToFirstResult: '7-21 days',
    difficulty: 'Moderate',
    outcome: 'A controlled AI-assisted bookkeeping workflow with review gates',
    warning: 'Do not let AI finalize ledgers or tax positions without human review and source records.',
    related: ['how-to-use-ai-to-make-money', 'how-to-become-a-bookkeeper'],
    tools: ['bookkeeping platform', 'receipt workflow', 'review checklist', 'month-end close tracker'],
  }),
  topic({
    id: 'ai-marketing',
    slug: 'how-to-use-ai-for-marketing',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI for marketing',
    courseTitle: 'Use AI for Marketing Without Generic Slop',
    articleTitle: 'How to Use AI for Marketing in 2026: Research, Messaging, Content Systems, and QA',
    summary: 'Use AI to accelerate research, drafts, testing plans, and repurposing while keeping the brand voice, facts, and proof human.',
    whyNow: 'Teams need more output with less budget, but they also need credibility. AI helps only when the editor still exists.',
    firstAction: 'Choose one live campaign and define which steps AI can assist without touching proof, claims, or approvals.',
    keywords: ['how to use ai for marketing', 'ai marketing workflow', 'ai content systems'],
    institutions: ['Google Search guidance', 'OECD AI skill-demand report', 'Small Business Administration'],
    timeToFirstResult: '3-14 days',
    difficulty: 'Foundational',
    outcome: 'A defensible AI-assisted marketing workflow tied to real campaigns',
    warning: 'Never use AI to manufacture testimonials, performance claims, or expertise you cannot substantiate.',
    related: ['how-to-start-a-newsletter-business', 'how-to-use-ai-for-video-editing-and-content-repurposing'],
    tools: ['content calendar', 'brief template', 'voice guide', 'approval workflow'],
  }),
  topic({
    id: 'ai-chatbots',
    slug: 'how-to-build-ai-chatbots-for-small-business',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Build AI chatbots for small business',
    courseTitle: 'Build AI Chatbots for Small Business',
    articleTitle: 'How to Build AI Chatbots for Small Business in 2026: Use Cases, Knowledge Bases, and Guardrails',
    summary: 'Design customer-facing bots that reduce simple support load without inventing policies, prices, or legal answers.',
    whyNow: 'Search demand keeps rising because small businesses want 24/7 response coverage but cannot afford enterprise support stacks.',
    firstAction: 'Start with one narrow knowledge base such as FAQs, intake, or lead qualification rather than a universal bot.',
    keywords: ['how to build ai chatbots', 'ai chatbot for small business', 'business chatbot setup'],
    institutions: ['OECD AI skill-demand report', 'FTC business guidance', 'Small Business Administration'],
    timeToFirstResult: '14-30 days',
    difficulty: 'Moderate',
    outcome: 'A scoped chatbot service built around one reliable business use case',
    warning: 'A chatbot without human escalation paths is a liability, not a product.',
    related: ['how-to-become-an-ai-automation-freelancer', 'how-to-start-an-ai-agency'],
    tools: ['knowledge base outline', 'escalation workflow', 'testing prompts', 'failure log'],
  }),
  topic({
    id: 'ai-video-repurposing',
    slug: 'how-to-use-ai-for-video-editing-and-content-repurposing',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI for video editing and content repurposing',
    courseTitle: 'AI for Video Editing and Content Repurposing',
    articleTitle: 'How to Use AI for Video Editing and Content Repurposing in 2026 Without Losing Quality',
    summary: 'Turn one long recording into clips, transcripts, show notes, and short-form edits while keeping narrative control.',
    whyNow: 'Content teams need multi-format output, and creators need faster production cycles across channels.',
    firstAction: 'Choose one existing long-form asset and map the five derivatives you can publish from it this week.',
    keywords: ['ai video editing', 'content repurposing with ai', 'ai clip generation'],
    institutions: ['YouTube creator guidance', 'OECD AI skill-demand report', 'Google Search guidance'],
    timeToFirstResult: '3-10 days',
    difficulty: 'Foundational',
    outcome: 'A repeatable content-repurposing workflow that multiplies one source asset',
    warning: 'Automated clips still need human selection, fact review, and narrative judgment.',
    related: ['how-to-start-a-faceless-youtube-channel', 'how-to-use-ai-for-marketing'],
    tools: ['transcript editor', 'clip library', 'thumbnail checklist', 'distribution calendar'],
  }),
  topic({
    id: 'ai-grant-writing',
    slug: 'how-to-use-ai-for-grant-writing-and-proposals',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI for grant writing and proposals',
    courseTitle: 'AI for Grant Writing and Proposal Work',
    articleTitle: 'How to Use AI for Grant Writing and Proposals in 2026: Research, Drafting, and Compliance Checks',
    summary: 'Use AI to accelerate research, draft structure, and compliance review while keeping facts and program fit grounded in evidence.',
    whyNow: 'Nonprofits, consultants, and agencies want faster drafting, but proposal work still turns on precision, fit, and documented proof.',
    firstAction: 'Build a library of past winning language, required attachments, and funder priorities before touching the model.',
    keywords: ['ai for grant writing', 'ai proposals', 'proposal writing with ai'],
    institutions: ['Grants.gov', 'Small Business Administration', 'OECD AI skill-demand report'],
    timeToFirstResult: '7-21 days',
    difficulty: 'Moderate',
    outcome: 'A compliant AI-assisted grant or proposal workflow',
    warning: 'Never let AI invent budgets, partner commitments, evidence, or outcomes data.',
    related: ['how-to-use-ai-for-marketing', 'how-to-become-a-virtual-assistant'],
    tools: ['proposal matrix', 'compliance checklist', 'source folder', 'version tracker'],
  }),
  topic({
    id: 'ai-data-analysis',
    slug: 'how-to-use-ai-for-data-analysis-at-work',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Use AI for data analysis at work',
    courseTitle: 'Use AI for Data Analysis at Work',
    articleTitle: 'How to Use AI for Data Analysis at Work in 2026: Questions, QA, and Executive-Ready Outputs',
    summary: 'Pair AI with spreadsheets and SQL to accelerate analysis while preserving traceability, reproducibility, and judgment.',
    whyNow: 'Analytical workers are being asked to do more interpretation, more reporting, and more automation with less analyst headcount.',
    firstAction: 'Pick one weekly report and document the data sources, formulas, and questions before letting AI near the narrative.',
    keywords: ['ai for data analysis', 'how to use ai for analysis', 'ai spreadsheet workflow'],
    institutions: ['OECD AI skill-demand report', 'Google Sheets learning resources', 'BLS data resources'],
    timeToFirstResult: '5-21 days',
    difficulty: 'Moderate',
    outcome: 'A faster, reviewable analytics workflow built around evidence rather than guesswork',
    warning: 'If the source table is not clean and the question is not precise, AI will make bad analysis look polished.',
    related: ['how-to-become-a-data-analyst', 'how-to-use-spreadsheets-professionally'],
    tools: ['spreadsheet model', 'SQL editor', 'analysis brief', 'QA checklist'],
  }),
  topic({
    id: 'prompt-engineering',
    slug: 'how-to-learn-prompt-engineering-for-real-work',
    track: 'ai-automation',
    archetype: 'ai-income',
    skill: 'Learn prompt engineering for real work',
    courseTitle: 'Prompt Engineering for Real Work',
    articleTitle: 'How to Learn Prompt Engineering for Real Work in 2026: Better Inputs, Better Outputs, Better QA',
    summary: 'Treat prompting as workflow design, context control, and evaluation rather than magic phrases.',
    whyNow: 'Search demand remains high because workers know AI matters but still struggle to get reliable outputs from messy contexts.',
    firstAction: 'Take one recurring work task and rewrite it into a structured brief with goal, context, constraints, examples, and output format.',
    keywords: ['how to learn prompt engineering', 'prompt engineering course', 'prompting for work'],
    institutions: ['OECD AI skill-demand report', 'Google prompt guidance', 'public AI safety guidance'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A reusable prompting system tied to real workflows instead of prompt folklore',
    warning: 'Prompting is not a substitute for domain knowledge, data hygiene, or editorial review.',
    related: ['how-to-use-ai-for-data-analysis-at-work', 'how-to-use-ai-to-make-money'],
    tools: ['prompt library', 'examples bank', 'evaluation rubric', 'context template'],
  }),
]

const tradeTopics = [
  topic({
    id: 'welder-career',
    slug: 'how-to-become-a-welder',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a welder',
    courseTitle: 'How to Become a Welder in 2026',
    articleTitle: 'How to Become a Welder in 2026: Training, Certifications, Pay, and First Jobs',
    summary: 'Follow a source-backed path into welding through safety training, process basics, test pieces, and employer-recognized credentials.',
    whyNow: 'Fabrication, energy, maintenance, and infrastructure work continue to need welders who can prove skill under real test conditions.',
    firstAction: 'Map the local paths: community college, union apprenticeship, employer shop training, or an AWS-aligned program.',
    keywords: ['how to become a welder', 'welder training', 'welding certification', 'welder salary 2026'],
    institutions: ['U.S. Bureau of Labor Statistics', 'American Welding Society', 'state apprenticeship office'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Moderate',
    outcome: 'A first welding job or paid shop trial built on credible skills proof',
    warning: 'Welding is not casual maker content. PPE, ventilation, fire safety, and supervisor feedback are non-negotiable.',
    related: ['how-to-become-an-electrician', 'how-to-become-an-hvac-technician'],
    tools: ['safety PPE checklist', 'practice coupon log', 'blueprint basics', 'shop-ready resume'],
  }),
  topic({
    id: 'electrician-career',
    slug: 'how-to-become-an-electrician',
    track: 'trades',
    archetype: 'career',
    skill: 'Become an electrician',
    courseTitle: 'How to Become an Electrician in 2026',
    articleTitle: 'How to Become an Electrician in 2026: Apprenticeships, Licensing, Pay, and Career Ladders',
    summary: 'Build an electrician pathway through code literacy, math basics, apprenticeship structure, and supervised field hours.',
    whyNow: 'Residential, commercial, grid, and retrofit work continue to reward licensed electrical skill with a clear ladder.',
    firstAction: 'Identify the licensing path in your state and compare union, non-union, and contractor-sponsored apprenticeships.',
    keywords: ['how to become an electrician', 'electrician apprenticeship', 'electrician license'],
    institutions: ['U.S. Bureau of Labor Statistics', 'state licensing board', 'state apprenticeship office'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A documented path into apprenticeship and licensed electrical work',
    warning: 'Live electrical work is lethal. Training starts with theory, safety, and supervised field practice, not home experimentation.',
    related: ['how-to-become-a-welder', 'how-to-become-a-lineman'],
    tools: ['license map', 'apprenticeship tracker', 'math refresh sheet', 'application checklist'],
  }),
  topic({
    id: 'hvac-career',
    slug: 'how-to-become-an-hvac-technician',
    track: 'trades',
    archetype: 'career',
    skill: 'Become an HVAC technician',
    courseTitle: 'How to Become an HVAC Technician in 2026',
    articleTitle: 'How to Become an HVAC Technician in 2026: EPA 608, Field Skills, Pay, and First Jobs',
    summary: 'Move into HVAC through refrigeration basics, troubleshooting habits, safety training, and credentialed entry paths.',
    whyNow: 'Repair, install, and maintenance work remains durable because climate control systems fail in every economy.',
    firstAction: 'Compare short HVAC programs, employer-sponsored training, and apprenticeship-style field entry in your local market.',
    keywords: ['how to become an hvac technician', 'epa 608', 'hvac training', 'hvac pay'],
    institutions: ['U.S. Bureau of Labor Statistics', 'EPA Section 608 guidance', 'community college HVAC programs'],
    timeToFirstResult: '45-150 days',
    difficulty: 'Moderate',
    outcome: 'Entry into HVAC install, maintenance, or service work',
    warning: 'Refrigerants, electricity, ladders, and combustion systems create real risk. Training and supervision matter.',
    related: ['how-to-become-an-electrician', 'how-to-become-an-auto-mechanic'],
    tools: ['refrigeration cycle map', 'service call checklist', 'EPA study plan', 'tool acquisition list'],
  }),
  topic({
    id: 'plumber-career',
    slug: 'how-to-become-a-plumber',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a plumber',
    courseTitle: 'How to Become a Plumber in 2026',
    articleTitle: 'How to Become a Plumber in 2026: Apprenticeships, Licensing, Pay, and First Service Skills',
    summary: 'Enter plumbing through apprenticeship structure, code fundamentals, pipe systems literacy, and safe service habits.',
    whyNow: 'Water, drainage, retrofit, and service work keep plumbing one of the most dependable licensed trade paths.',
    firstAction: 'Find the state licensing ladder and list the contractors, unions, and trade schools that feed it locally.',
    keywords: ['how to become a plumber', 'plumber apprenticeship', 'plumbing license'],
    institutions: ['U.S. Bureau of Labor Statistics', 'state licensing board', 'state apprenticeship office'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A clear route into apprenticeship and licensed plumbing work',
    warning: 'Plumbing intersects sanitation, gas, code, and property damage. Unsupervised field shortcuts become expensive fast.',
    related: ['how-to-become-an-hvac-technician', 'how-to-start-a-handyman-business'],
    tools: ['state license map', 'service vocabulary list', 'apprenticeship tracker', 'application packet'],
  }),
  topic({
    id: 'cdl-career',
    slug: 'how-to-become-a-cdl-truck-driver',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a CDL truck driver',
    courseTitle: 'How to Become a CDL Truck Driver in 2026',
    articleTitle: 'How to Become a CDL Truck Driver in 2026: Training, Endorsements, Pay, and First Routes',
    summary: 'Understand CDL classes, ELDT requirements, endorsements, safety records, and the first employer choices that shape income.',
    whyNow: 'Driving remains one of the fastest paid pathways into logistics, but the best entry move depends on schedule tolerance and record discipline.',
    firstAction: 'Choose the license class and route type you actually want before paying for training.',
    keywords: ['how to become a cdl driver', 'cdl training', 'cdl endorsements', 'truck driver pay'],
    institutions: ['FMCSA', 'state DMV', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-90 days',
    difficulty: 'Foundational',
    outcome: 'A CDL path aligned to regional, local, or long-haul goals',
    warning: 'Do not choose a carrier based on headline pay alone. Training debt, schedule, and safety culture matter more.',
    related: ['how-to-become-a-heavy-equipment-operator', 'how-to-become-a-lineman'],
    tools: ['permit plan', 'endorsement map', 'carrier comparison sheet', 'logbook habits'],
  }),
  topic({
    id: 'auto-mechanic-career',
    slug: 'how-to-become-an-auto-mechanic',
    track: 'trades',
    archetype: 'career',
    skill: 'Become an auto mechanic',
    courseTitle: 'How to Become an Auto Mechanic in 2026',
    articleTitle: 'How to Become an Auto Mechanic in 2026: Diagnostics, Certifications, Tools, and Shop Pathways',
    summary: 'Start in automotive repair by learning inspection logic, diagnostics basics, tool progression, and the economics of shop work.',
    whyNow: 'Every vehicle fleet still needs maintenance, and good diagnostic thinkers stay valuable as systems become more electronic.',
    firstAction: 'Pick a path: dealership, independent shop, fleet maintenance, or specialty repair.',
    keywords: ['how to become an auto mechanic', 'auto mechanic training', 'ASE certification'],
    institutions: ['U.S. Bureau of Labor Statistics', 'ASE', 'community college auto programs'],
    timeToFirstResult: '45-150 days',
    difficulty: 'Moderate',
    outcome: 'An entry path into diagnostics, maintenance, or repair work',
    warning: 'Tool debt can bury beginners. Buy in stages and let the job prove what earns a permanent spot in the box.',
    related: ['how-to-maintain-a-car-yourself', 'how-to-change-your-own-brakes-safely'],
    tools: ['inspection checklist', 'tool staging plan', 'ASE study notes', 'work-order habits'],
  }),
  topic({
    id: 'wind-tech-career',
    slug: 'how-to-become-a-wind-turbine-technician',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a wind turbine technician',
    courseTitle: 'How to Become a Wind Turbine Technician',
    articleTitle: 'How to Become a Wind Turbine Technician in 2026: Training, Safety, Travel, and Job Demand',
    summary: 'Build a path into wind tech work by understanding the physical demands, safety systems, travel realities, and technical prerequisites.',
    whyNow: 'Wind remains a strong specialized field for mechanically minded workers comfortable with travel and height.',
    firstAction: 'Confirm whether you want utility-scale travel work or a local maintenance role before choosing training.',
    keywords: ['how to become a wind turbine technician', 'wind tech training', 'wind technician pay'],
    institutions: ['U.S. Bureau of Labor Statistics', 'technical colleges', 'OSHA training providers'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A realistic entry map into wind energy service work',
    warning: 'This is a height, rescue, and weather-exposed job. The lifestyle and safety demands are part of the career, not side notes.',
    related: ['how-to-become-a-solar-installer', 'how-to-become-an-electrician'],
    tools: ['height comfort checklist', 'safety training map', 'job market scan', 'travel tolerance audit'],
  }),
  topic({
    id: 'solar-installer-career',
    slug: 'how-to-become-a-solar-installer',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a solar installer',
    courseTitle: 'How to Become a Solar Installer in 2026',
    articleTitle: 'How to Become a Solar Installer in 2026: Training, Safety, Permits, and Career Paths',
    summary: 'Understand rooftop and ground-mount work, electrical coordination, fall protection, and the local installer market.',
    whyNow: 'Solar work sits at the intersection of construction, electrical coordination, and energy demand.',
    firstAction: 'Map whether local demand is residential retrofit, commercial install, or maintenance and inspection.',
    keywords: ['how to become a solar installer', 'solar installation training', 'solar jobs 2026'],
    institutions: ['U.S. Bureau of Labor Statistics', 'OSHA training providers', 'NABCEP'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'An entry route into solar installation and service work',
    warning: 'Roofing, electricity, weather, and lifting risks make safety systems central to the job.',
    related: ['how-to-install-solar-backup-power-at-home', 'how-to-become-an-electrician'],
    tools: ['fall protection checklist', 'credential map', 'permit vocabulary', 'crew-role guide'],
  }),
  topic({
    id: 'heavy-equipment-career',
    slug: 'how-to-become-a-heavy-equipment-operator',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a heavy equipment operator',
    courseTitle: 'How to Become a Heavy Equipment Operator',
    articleTitle: 'How to Become a Heavy Equipment Operator in 2026: Training, Safety, Licenses, and Hiring Paths',
    summary: 'Learn how to move toward civil, site, and infrastructure work through training, safety records, and operator readiness.',
    whyNow: 'Infrastructure, civil work, and industrial projects keep creating demand for operators who combine machine control with site discipline.',
    firstAction: 'List the operators, unions, and training schools in your region and study what machine families they hire for first.',
    keywords: ['how to become a heavy equipment operator', 'operator training', 'construction equipment jobs'],
    institutions: ['U.S. Bureau of Labor Statistics', 'state apprenticeship office', 'OSHA training providers'],
    timeToFirstResult: '45-150 days',
    difficulty: 'Moderate',
    outcome: 'A field-ready path into operator work with a clear entry strategy',
    warning: 'Machine operation is a safety system, not a thrill. Ground crews, sight lines, and site protocol matter as much as control skill.',
    related: ['how-to-become-a-cdl-truck-driver', 'how-to-become-a-lineman'],
    tools: ['site safety checklist', 'operator pathway sheet', 'logbook habits', 'machine family comparison'],
  }),
  topic({
    id: 'lineman-career',
    slug: 'how-to-become-a-lineman',
    track: 'trades',
    archetype: 'career',
    skill: 'Become a lineman',
    courseTitle: 'How to Become a Lineman in 2026',
    articleTitle: 'How to Become a Lineman in 2026: Apprenticeships, Safety Culture, Travel, and Pay',
    summary: 'Understand the apprenticeship pipeline, physical demands, storm work realities, and high-consequence safety culture of line work.',
    whyNow: 'Grid reliability, storm response, and transmission upgrades continue to keep line work in demand.',
    firstAction: 'Research union utility apprenticeships and the prerequisites they expect before you apply.',
    keywords: ['how to become a lineman', 'lineman apprenticeship', 'lineworker training'],
    institutions: ['U.S. Bureau of Labor Statistics', 'utility apprenticeship programs', 'OSHA training providers'],
    timeToFirstResult: '90-240 days',
    difficulty: 'Advanced',
    outcome: 'A realistic apprenticeship path into line work',
    warning: 'Line work is high-risk industrial labor. If you do not respect the safety culture, this is not the path for you.',
    related: ['how-to-become-an-electrician', 'how-to-become-a-heavy-equipment-operator'],
    tools: ['apprenticeship prerequisites', 'fitness audit', 'storm-work reality check', 'application calendar'],
  }),
]

const healthcareTopics = [
  topic({
    id: 'cna-career',
    slug: 'how-to-become-a-cna',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a CNA',
    courseTitle: 'How to Become a CNA in 2026',
    articleTitle: 'How to Become a CNA in 2026: Training, State Requirements, Pay, and First Shifts',
    summary: 'Build a clean route into nursing support work through approved training, exam prep, and employer fit.',
    whyNow: 'CNA pathways remain one of the fastest entry points into healthcare and can stack into higher credential ladders.',
    firstAction: 'Find the state-approved CNA programs, testing vendors, and hiring facilities in your region.',
    keywords: ['how to become a cna', 'cna training', 'cna classes near me', 'cna pay'],
    institutions: ['state nurse aide registry', 'community college health programs', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-90 days',
    difficulty: 'Foundational',
    outcome: 'A state-recognized nursing assistant entry path',
    warning: 'Healthcare support work is emotionally and physically demanding. Choose clinical settings with serious onboarding and supervision.',
    related: ['how-to-become-a-medical-assistant', 'how-to-become-an-lpn'],
    tools: ['program comparison sheet', 'exam prep plan', 'facility checklist', 'shift-readiness habits'],
  }),
  topic({
    id: 'phlebotomist-career',
    slug: 'how-to-become-a-phlebotomist',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a phlebotomist',
    courseTitle: 'How to Become a Phlebotomist in 2026',
    articleTitle: 'How to Become a Phlebotomist in 2026: Training, Certification, Pay, and First Clinical Roles',
    summary: 'Move into phlebotomy by understanding training requirements, clinical hours, patient interaction, and certification choices.',
    whyNow: 'Phlebotomy remains a practical entry point for people who want patient-facing work without a long degree cycle.',
    firstAction: 'Confirm whether your state or employers expect a national certification before choosing a training program.',
    keywords: ['how to become a phlebotomist', 'phlebotomy training', 'phlebotomy certification'],
    institutions: ['community college health programs', 'national certification bodies', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'A path into labs, hospitals, clinics, or donor centers',
    warning: 'Clinical precision and patient communication matter more than speed. You are working on real people, not reps.',
    related: ['how-to-become-a-medical-assistant', 'how-to-become-a-pharmacy-technician'],
    tools: ['program checklist', 'certification comparison', 'clinical readiness list', 'interview prep'],
  }),
  topic({
    id: 'medical-assistant-career',
    slug: 'how-to-become-a-medical-assistant',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a medical assistant',
    courseTitle: 'How to Become a Medical Assistant in 2026',
    articleTitle: 'How to Become a Medical Assistant in 2026: Clinical Skills, Administrative Work, and First Jobs',
    summary: 'Prepare for a blended clinical and administrative role by understanding employer expectations, program quality, and skill stacking.',
    whyNow: 'Medical assisting continues to offer a flexible entry point into outpatient healthcare settings.',
    firstAction: 'Choose whether you want a faster certificate route or a broader program with stronger externship support.',
    keywords: ['how to become a medical assistant', 'medical assistant training', 'medical assistant pay'],
    institutions: ['U.S. Bureau of Labor Statistics', 'community college health programs', 'accredited training programs'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Foundational',
    outcome: 'An outpatient care pathway with room to specialize or ladder upward',
    warning: 'Do not confuse speed with quality. Externship placement and employer recognition matter.',
    related: ['how-to-become-a-cna', 'how-to-become-a-phlebotomist'],
    tools: ['program rubric', 'externship checklist', 'administrative skills tracker', 'clinical prep notes'],
  }),
  topic({
    id: 'lpn-career',
    slug: 'how-to-become-an-lpn',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become an LPN',
    courseTitle: 'How to Become an LPN in 2026',
    articleTitle: 'How to Become an LPN in 2026: Program Paths, Licensing, Pay, and Real Work Conditions',
    summary: 'Understand what LPN programs demand, how licensure works, and how the role differs across settings.',
    whyNow: 'LPN pathways remain attractive for people who want a faster licensed role and a bridge toward RN options later.',
    firstAction: 'List the approved programs in your state and compare cost, NCLEX-PN outcomes, schedule, and support.',
    keywords: ['how to become an lpn', 'lpn programs', 'lpn license', 'lpn pay'],
    institutions: ['state board of nursing', 'U.S. Bureau of Labor Statistics', 'accredited nursing programs'],
    timeToFirstResult: '12-18 months',
    difficulty: 'Advanced',
    outcome: 'A licensed practical nursing path with clear academic and exam milestones',
    warning: 'This is clinical education, not a shortcut. Your program quality and exam readiness matter more than branding.',
    related: ['how-to-become-a-cna', 'how-to-become-an-emt'],
    tools: ['program scorecard', 'exam prep plan', 'clinical calendar', 'study system'],
  }),
  topic({
    id: 'emt-career',
    slug: 'how-to-become-an-emt',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become an EMT',
    courseTitle: 'How to Become an EMT in 2026',
    articleTitle: 'How to Become an EMT in 2026: Training, Certification, Shift Reality, and Career Progression',
    summary: 'Move toward emergency medical work with a realistic view of training, certification, stress tolerance, and field conditions.',
    whyNow: 'Emergency response work continues to attract career changers who want mission-driven healthcare entry paths.',
    firstAction: 'Validate your schedule, stress tolerance, and local training options before enrolling.',
    keywords: ['how to become an emt', 'emt certification', 'emt training near me'],
    institutions: ['NREMT', 'state EMS office', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '3-9 months',
    difficulty: 'Advanced',
    outcome: 'An entry route into emergency medical response or a launch pad into paramedic or fire paths',
    warning: 'This work has real trauma exposure. Emotional durability and supervised training matter as much as passing the exam.',
    related: ['how-to-become-a-sterile-processing-technician', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['program checklist', 'certification calendar', 'fitness plan', 'shift reality audit'],
  }),
  topic({
    id: 'sterile-processing-career',
    slug: 'how-to-become-a-sterile-processing-technician',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a sterile processing technician',
    courseTitle: 'How to Become a Sterile Processing Technician in 2026',
    articleTitle: 'How to Become a Sterile Processing Technician in 2026: Training, Certifications, and Hospital Pathways',
    summary: 'Enter a behind-the-scenes healthcare role by mastering process discipline, instrument handling, and employer-recognized credentials.',
    whyNow: 'Sterile processing stays in demand because safe surgical care depends on reliable, disciplined systems work.',
    firstAction: 'Research whether local employers train on the job or strongly prefer certification upfront.',
    keywords: ['how to become a sterile processing technician', 'sterile processing certification', 'spd jobs'],
    institutions: ['HSPA', 'hospital career pages', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'An entry point into hospital systems work with strong process discipline',
    warning: 'Precision matters. Instrument handling, documentation, and sterile workflow are not low-consequence tasks.',
    related: ['how-to-become-a-pharmacy-technician', 'how-to-become-a-medical-assistant'],
    tools: ['program rubric', 'credential checklist', 'hospital pathway scan', 'study plan'],
  }),
  topic({
    id: 'pharmacy-tech-career',
    slug: 'how-to-become-a-pharmacy-technician',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a pharmacy technician',
    courseTitle: 'How to Become a Pharmacy Technician in 2026',
    articleTitle: 'How to Become a Pharmacy Technician in 2026: Training, Certification, State Rules, and Career Fit',
    summary: 'Learn how to enter pharmacy support work through state rule mapping, certification planning, and workplace fit.',
    whyNow: 'Pharmacy tech roles continue to attract search demand because the pathway can be faster than other clinical tracks.',
    firstAction: 'Check the state board requirements first. Some states require registration, some expect certification, and employers vary.',
    keywords: ['how to become a pharmacy technician', 'pharmacy technician certification', 'pharmacy tech jobs'],
    institutions: ['state board of pharmacy', 'PTCB', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'A credible path into retail, hospital, or specialty pharmacy support',
    warning: 'Accuracy and patient safety matter. Do not treat medication workflows as low-risk clerical work.',
    related: ['how-to-become-a-medical-assistant', 'how-to-become-a-phlebotomist'],
    tools: ['state rule map', 'study schedule', 'job-setting comparison', 'application checklist'],
  }),
  topic({
    id: 'dental-assistant-career',
    slug: 'how-to-become-a-dental-assistant',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a dental assistant',
    courseTitle: 'How to Become a Dental Assistant in 2026',
    articleTitle: 'How to Become a Dental Assistant in 2026: Training, Certifications, X-Ray Rules, and First Jobs',
    summary: 'Understand the mix of chairside support, sterilization, patient flow, and state-specific requirements that shape this role.',
    whyNow: 'Dental assisting remains a fast healthcare-adjacent path with clear employer demand in many local markets.',
    firstAction: 'Check state-specific radiography and credential rules before choosing a program.',
    keywords: ['how to become a dental assistant', 'dental assistant training', 'dental assistant certification'],
    institutions: ['state dental board', 'DANB', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '45-180 days',
    difficulty: 'Foundational',
    outcome: 'A route into dental support work with room to specialize',
    warning: 'Do not assume every state treats this role the same. Local credential rules matter.',
    related: ['how-to-become-a-medical-assistant', 'how-to-become-a-phlebotomist'],
    tools: ['state rules sheet', 'program checklist', 'office workflow map', 'interview prep'],
  }),
  topic({
    id: 'home-health-aide-career',
    slug: 'how-to-become-a-caregiver-or-home-health-aide',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a caregiver or home health aide',
    courseTitle: 'How to Become a Caregiver or Home Health Aide',
    articleTitle: 'How to Become a Caregiver or Home Health Aide in 2026: Training, Boundaries, Pay, and Employer Fit',
    summary: 'Build a path into care work with attention to training, scheduling, documentation, and emotional durability.',
    whyNow: 'Caregiving search demand stays high because aging populations and family pressure keep this role urgent and visible.',
    firstAction: 'Decide whether you want agency work, private-pay work, or a route that ladders into certified care roles.',
    keywords: ['how to become a caregiver', 'how to become a home health aide', 'caregiver jobs'],
    institutions: ['state health department', 'Medicare home health guidance', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '14-90 days',
    difficulty: 'Foundational',
    outcome: 'A realistic care-work path with clearer boundaries and expectations',
    warning: 'Care work without boundaries burns people out. Training, documentation, and employer quality matter.',
    related: ['how-to-become-a-cna', 'how-to-become-a-behavioral-health-technician'],
    tools: ['role comparison sheet', 'boundary checklist', 'documentation habits', 'agency screening questions'],
  }),
  topic({
    id: 'behavioral-health-tech-career',
    slug: 'how-to-become-a-behavioral-health-technician',
    track: 'healthcare',
    archetype: 'career',
    skill: 'Become a behavioral health technician',
    courseTitle: 'How to Become a Behavioral Health Technician',
    articleTitle: 'How to Become a Behavioral Health Technician in 2026: Training, Settings, Boundaries, and Career Paths',
    summary: 'Understand the training, de-escalation skills, environment fit, and supervision needs behind behavioral health support work.',
    whyNow: 'Mental and behavioral health systems remain understaffed, and entry roles keep attracting search demand from career changers.',
    firstAction: 'Learn the settings first: inpatient, residential, crisis, youth, substance-use, or community support.',
    keywords: ['how to become a behavioral health technician', 'behavioral health tech jobs', 'mental health technician'],
    institutions: ['state behavioral health agencies', 'hospital career pages', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Moderate',
    outcome: 'An informed pathway into supervised behavioral health support roles',
    warning: 'This work requires boundaries, de-escalation, and strong supervision. Hero narratives are a bad fit here.',
    related: ['how-to-become-a-caregiver-or-home-health-aide', 'how-to-become-an-emt'],
    tools: ['setting comparison', 'boundary checklist', 'supervision questions', 'training plan'],
  }),
]

const techTopics = [
  topic({
    id: 'cybersecurity-analyst-career',
    slug: 'how-to-become-a-cybersecurity-analyst',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a cybersecurity analyst',
    courseTitle: 'How to Become a Cybersecurity Analyst in 2026',
    articleTitle: 'How to Become a Cybersecurity Analyst in 2026: Skills, Certifications, Labs, and First Roles',
    summary: 'Break into cybersecurity by building operating-system fluency, network basics, incident thinking, and visible lab work.',
    whyNow: 'Security remains one of the clearest technical paths where proof of work still matters as much as credentials.',
    firstAction: 'Set up a realistic study path that begins with systems, networking, and logs rather than hype around hacking.',
    keywords: ['how to become a cybersecurity analyst', 'cybersecurity analyst skills', 'security career path'],
    institutions: ['U.S. Bureau of Labor Statistics', 'NIST', 'public cybersecurity training resources'],
    timeToFirstResult: '90-270 days',
    difficulty: 'Advanced',
    outcome: 'A defensible entry path into security operations or security-adjacent roles',
    warning: 'Security is not just certification collecting. If you cannot explain systems and evidence, you are not ready yet.',
    related: ['how-to-become-a-help-desk-technician', 'how-to-become-a-cloud-support-engineer'],
    tools: ['lab environment', 'study roadmap', 'incident notebook', 'portfolio notes'],
  }),
  topic({
    id: 'data-analyst-career',
    slug: 'how-to-become-a-data-analyst',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a data analyst',
    courseTitle: 'How to Become a Data Analyst in 2026',
    articleTitle: 'How to Become a Data Analyst in 2026: SQL, Spreadsheets, Dashboards, and Portfolio Proof',
    summary: 'Enter analytics by learning to ask better questions, clean data, and present decisions rather than just charts.',
    whyNow: 'Data roles still reward people who can translate messy information into decisions the business can act on.',
    firstAction: 'Choose one domain and build three portfolio pieces that start with a real question, not a decorative dashboard.',
    keywords: ['how to become a data analyst', 'data analyst skills', 'data analyst portfolio'],
    institutions: ['U.S. Bureau of Labor Statistics', 'OECD AI skill-demand report', 'public data repositories'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A portfolio-led entry route into analytics work',
    warning: 'Dashboards without a decision question are noise. Start with the business problem.',
    related: ['how-to-use-ai-for-data-analysis-at-work', 'how-to-use-spreadsheets-professionally'],
    tools: ['portfolio rubric', 'SQL practice plan', 'analysis brief', 'storytelling checklist'],
  }),
  topic({
    id: 'help-desk-career',
    slug: 'how-to-become-a-help-desk-technician',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a help desk technician',
    courseTitle: 'How to Become a Help Desk Technician',
    articleTitle: 'How to Become a Help Desk Technician in 2026: Troubleshooting, Customer Communication, and First IT Roles',
    summary: 'Build the fastest realistic route into IT support through troubleshooting habits, customer communication, and visible practice.',
    whyNow: 'Help desk remains a strong entry point for people who want real systems exposure and a ladder into broader IT work.',
    firstAction: 'Start a troubleshooting journal and rebuild your own machines, accounts, and workflows with clean notes.',
    keywords: ['how to become a help desk technician', 'it support career', 'entry level it'],
    institutions: ['U.S. Bureau of Labor Statistics', 'CompTIA learning pathways', 'public IT support resources'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'An IT support path with room to move toward systems, cloud, or security',
    warning: 'Customer communication is part of the job. Pure tool obsession is not enough.',
    related: ['how-to-become-a-cybersecurity-analyst', 'how-to-become-a-cloud-support-engineer'],
    tools: ['ticket notes', 'troubleshooting journal', 'home lab', 'resume proof list'],
  }),
  topic({
    id: 'cloud-support-career',
    slug: 'how-to-become-a-cloud-support-engineer',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a cloud support engineer',
    courseTitle: 'How to Become a Cloud Support Engineer',
    articleTitle: 'How to Become a Cloud Support Engineer in 2026: Foundations, Certifications, Labs, and Hiring Signals',
    summary: 'Learn how cloud roles combine Linux, networking, IAM, logging, and calm troubleshooting under pressure.',
    whyNow: 'Cloud support remains a bridge between general IT and deeper infrastructure roles.',
    firstAction: 'Build one home or sandbox environment that forces you to use IAM, storage, compute, and logs together.',
    keywords: ['how to become a cloud support engineer', 'cloud support role', 'aws support engineer path'],
    institutions: ['OECD AI skill-demand report', 'AWS training resources', 'Microsoft Azure learning resources'],
    timeToFirstResult: '90-210 days',
    difficulty: 'Advanced',
    outcome: 'A lab-backed route into cloud support or infrastructure-adjacent roles',
    warning: 'Cloud without systems basics becomes memorization theater. Learn the underlying computers and networks.',
    related: ['how-to-become-a-help-desk-technician', 'how-to-become-a-cybersecurity-analyst'],
    tools: ['sandbox account', 'lab checklist', 'IAM map', 'incident notes'],
  }),
  topic({
    id: 'qa-tester-career',
    slug: 'how-to-become-a-qa-tester',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a QA tester',
    courseTitle: 'How to Become a QA Tester in 2026',
    articleTitle: 'How to Become a QA Tester in 2026: Test Thinking, Bug Reports, Automation Basics, and Portfolio Work',
    summary: 'Enter QA by learning how to observe systems, write reproducible bug reports, and think in edge cases.',
    whyNow: 'Teams still need people who can break assumptions and document failures clearly, even as tooling changes.',
    firstAction: 'Pick two live products you use weekly and start writing professional bug reports with repro steps and expected behavior.',
    keywords: ['how to become a qa tester', 'qa testing career', 'software testing jobs'],
    institutions: ['public software testing resources', 'U.S. Bureau of Labor Statistics', 'industry documentation'],
    timeToFirstResult: '30-120 days',
    difficulty: 'Foundational',
    outcome: 'A portfolio-backed route into quality assurance work',
    warning: 'Testing is not clicking randomly. It is structured observation plus clean communication.',
    related: ['how-to-become-a-web-developer', 'how-to-use-ai-for-data-analysis-at-work'],
    tools: ['bug report template', 'test matrix', 'portfolio tracker', 'browser dev tools'],
  }),
  topic({
    id: 'web-developer-career',
    slug: 'how-to-become-a-web-developer',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a web developer',
    courseTitle: 'How to Become a Web Developer in 2026',
    articleTitle: 'How to Become a Web Developer in 2026: Frontend Foundations, Portfolio Work, and Hiring Strategy',
    summary: 'Build a realistic web path through HTML, CSS, JavaScript, debugging, and proof of shipped work.',
    whyNow: 'The market is tighter, which makes clear fundamentals and visible shipping discipline more valuable than tutorial completion.',
    firstAction: 'Build one useful project for a real audience before you worry about the perfect stack.',
    keywords: ['how to become a web developer', 'web developer roadmap 2026', 'frontend portfolio'],
    institutions: ['public web standards resources', 'OECD AI skill-demand report', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '90-240 days',
    difficulty: 'Moderate',
    outcome: 'A shipped-work portfolio instead of a tutorial graveyard',
    warning: 'Do not hide weak fundamentals behind framework buzzwords. Browsers still run the work.',
    related: ['how-to-become-a-qa-tester', 'how-to-become-a-no-code-app-builder'],
    tools: ['project brief', 'debug checklist', 'deployment habit', 'portfolio rubric'],
  }),
  topic({
    id: 'sql-analyst-career',
    slug: 'how-to-become-a-sql-analyst',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a SQL analyst',
    courseTitle: 'How to Become a SQL Analyst in 2026',
    articleTitle: 'How to Become a SQL Analyst in 2026: Query Logic, Business Context, and Portfolio Proof',
    summary: 'Use SQL as a business skill by combining query fluency with reporting logic and decision context.',
    whyNow: 'SQL remains one of the clearest bridges into analytics, operations, and technical business roles.',
    firstAction: 'Practice translating five business questions into tables, joins, filters, and outputs.',
    keywords: ['how to become a sql analyst', 'sql analyst career', 'sql jobs'],
    institutions: ['OECD AI skill-demand report', 'public SQL training resources', 'U.S. Bureau of Labor Statistics'],
    timeToFirstResult: '45-150 days',
    difficulty: 'Moderate',
    outcome: 'A query-driven analytics path with portable value across roles',
    warning: 'Fast queries are useless if the business question is vague or the metric is wrong.',
    related: ['how-to-become-a-data-analyst', 'how-to-use-ai-for-data-analysis-at-work'],
    tools: ['schema map', 'query notebook', 'business question bank', 'result QA checklist'],
  }),
  topic({
    id: 'no-code-builder-career',
    slug: 'how-to-become-a-no-code-app-builder',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a no-code app builder',
    courseTitle: 'How to Become a No-Code App Builder',
    articleTitle: 'How to Become a No-Code App Builder in 2026: Use Cases, Workflows, and Client-Facing Delivery',
    summary: 'Build applications and internal tools quickly by focusing on process clarity, data structure, and operator usability.',
    whyNow: 'No-code demand rises when teams need internal tools faster than full engineering cycles can deliver.',
    firstAction: 'Choose one internal workflow with repetitive forms, handoffs, or tracking problems and redesign it first on paper.',
    keywords: ['how to become a no-code app builder', 'no-code career', 'build apps without coding'],
    institutions: ['Small Business Administration', 'public no-code learning resources', 'OECD AI skill-demand report'],
    timeToFirstResult: '21-90 days',
    difficulty: 'Foundational',
    outcome: 'A service or internal-tool pathway built on process clarity and delivery speed',
    warning: 'No-code still requires systems thinking. A messy process stays messy after software.',
    related: ['how-to-become-an-ai-automation-freelancer', 'how-to-start-an-ai-agency'],
    tools: ['process map', 'data model sketch', 'user testing notes', 'handoff checklist'],
  }),
  topic({
    id: 'gis-technician-career',
    slug: 'how-to-become-a-gis-technician',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a GIS technician',
    courseTitle: 'How to Become a GIS Technician',
    articleTitle: 'How to Become a GIS Technician in 2026: Mapping, Spatial Data, Portfolios, and Hiring Paths',
    summary: 'Enter GIS by learning spatial thinking, data hygiene, map communication, and the industries that hire for it.',
    whyNow: 'GIS remains a practical bridge between public infrastructure, utilities, planning, environment, and technical operations.',
    firstAction: 'Build one clean map project with a real question, clear legend, and written takeaways.',
    keywords: ['how to become a gis technician', 'gis career path', 'gis portfolio'],
    institutions: ['U.S. Bureau of Labor Statistics', 'public GIS learning resources', 'state GIS programs'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A map-and-data portfolio for GIS and spatial analysis work',
    warning: 'Pretty maps are not enough. Spatial reasoning and data quality are the real skill.',
    related: ['how-to-become-a-data-analyst', 'how-to-research-anything-fast'],
    tools: ['project rubric', 'data cleaning checklist', 'map critique notes', 'industry scan'],
  }),
  topic({
    id: 'salesforce-admin-career',
    slug: 'how-to-become-a-salesforce-admin',
    track: 'tech',
    archetype: 'career',
    skill: 'Become a Salesforce admin',
    courseTitle: 'How to Become a Salesforce Admin in 2026',
    articleTitle: 'How to Become a Salesforce Admin in 2026: Platform Basics, Practice Orgs, Certs, and Job Strategy',
    summary: 'Learn how to enter CRM operations work through platform fluency, process thinking, and stakeholder communication.',
    whyNow: 'Companies keep needing people who can keep revenue systems usable, clean, and connected to the real workflow.',
    firstAction: 'Use a practice environment to learn objects, permissions, automation, and reporting in one simple business scenario.',
    keywords: ['how to become a salesforce admin', 'salesforce admin career', 'salesforce administrator training'],
    institutions: ['Salesforce Trailhead', 'U.S. Bureau of Labor Statistics', 'public CRM admin resources'],
    timeToFirstResult: '60-180 days',
    difficulty: 'Moderate',
    outcome: 'A platform-operations path built on practice environments and process literacy',
    warning: 'Admin work is not button clicking. It is data governance, permissions discipline, and operator support.',
    related: ['how-to-become-a-no-code-app-builder', 'how-to-manage-projects-at-work'],
    tools: ['practice org plan', 'admin notebook', 'business process map', 'reporting checklist'],
  }),
]

const businessTopics = [
  topic({
    id: 'cleaning-business',
    slug: 'how-to-start-a-cleaning-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a cleaning business',
    courseTitle: 'How to Start a Cleaning Business in 2026',
    articleTitle: 'How to Start a Cleaning Business in 2026: Pricing, Equipment, Insurance, and First Clients',
    summary: 'Launch a cleaning business by validating local demand, setting service boundaries, and winning reliable recurring work.',
    whyNow: 'Search demand remains strong because cleaning can start lean and scale through routine, repeatable operations.',
    firstAction: 'Choose one market: residential recurring, move-out, office, Airbnb turnover, or post-construction.',
    keywords: ['how to start a cleaning business', 'cleaning business startup', 'cleaning business pricing'],
    institutions: ['Small Business Administration', 'IRS small business guidance', 'state business portal'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A lean service business with clearer pricing and operating discipline',
    warning: 'Margins disappear when scope creep, travel, supplies, and rework are not priced correctly.',
    related: ['how-to-start-a-mobile-detailing-business', 'how-to-start-a-pressure-washing-business'],
    tools: ['service menu', 'walkthrough checklist', 'quote template', 'supply tracker'],
  }),
  topic({
    id: 'detailing-business',
    slug: 'how-to-start-a-mobile-detailing-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a mobile detailing business',
    courseTitle: 'How to Start a Mobile Detailing Business',
    articleTitle: 'How to Start a Mobile Detailing Business in 2026: Equipment, Packages, Scheduling, and Upsells',
    summary: 'Build a detailing business around route density, clean packages, and repeatable before-and-after proof.',
    whyNow: 'Detailing remains a visible low-overhead service with strong referral and repeat potential when quality is consistent.',
    firstAction: 'Define three packages and the exact time, supplies, and upsells tied to each.',
    keywords: ['how to start a mobile detailing business', 'car detailing business', 'detailing business startup'],
    institutions: ['Small Business Administration', 'state business portal', 'IRS small business guidance'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A route-based detailing business with clearer unit economics',
    warning: 'If your package times are guesses, your pricing is fiction.',
    related: ['how-to-start-a-cleaning-business', 'how-to-maintain-a-car-yourself'],
    tools: ['package sheet', 'route planner', 'photo proof checklist', 'customer intake form'],
  }),
  topic({
    id: 'pressure-washing-business',
    slug: 'how-to-start-a-pressure-washing-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a pressure washing business',
    courseTitle: 'How to Start a Pressure Washing Business',
    articleTitle: 'How to Start a Pressure Washing Business in 2026: Equipment, Pricing, Safety, and First Jobs',
    summary: 'Move into exterior cleaning work through careful service selection, damage prevention, and local lead generation.',
    whyNow: 'Pressure washing stays attractive because it can launch quickly, but good operators win by avoiding damage and callbacks.',
    firstAction: 'Choose whether you want house wash, driveway, fence, deck, or commercial surface work before you buy equipment.',
    keywords: ['how to start a pressure washing business', 'pressure washing startup', 'pressure washing pricing'],
    institutions: ['Small Business Administration', 'state business portal', 'OSHA resources'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A safer, more disciplined exterior-cleaning business plan',
    warning: 'Surface damage, runoff issues, and liability claims can erase your margin fast.',
    related: ['how-to-start-a-lawn-care-business', 'how-to-start-a-cleaning-business'],
    tools: ['surface checklist', 'quote template', 'liability checklist', 'route board'],
  }),
  topic({
    id: 'lawn-care-business',
    slug: 'how-to-start-a-lawn-care-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a lawn care business',
    courseTitle: 'How to Start a Lawn Care Business',
    articleTitle: 'How to Start a Lawn Care Business in 2026: Equipment, Recurring Revenue, and Route Density',
    summary: 'Use route density, recurring scheduling, and simple service tiers to build a stronger lawn-care business model.',
    whyNow: 'Lawn care remains one of the clearest neighborhood service businesses for turning consistency into recurring revenue.',
    firstAction: 'Build a neighborhood-level route plan before you buy every machine you think you need.',
    keywords: ['how to start a lawn care business', 'lawn mowing business', 'lawn care pricing'],
    institutions: ['Small Business Administration', 'state business portal', 'IRS small business guidance'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A recurring-service lawn business built around route economics',
    warning: 'Fuel, repairs, travel, and no-shows quietly kill underpriced lawn routes.',
    related: ['how-to-start-a-pressure-washing-business', 'how-to-start-a-handyman-business'],
    tools: ['route map', 'service tiers', 'weather backup plan', 'equipment maintenance log'],
  }),
  topic({
    id: 'handyman-business',
    slug: 'how-to-start-a-handyman-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a handyman business',
    courseTitle: 'How to Start a Handyman Business',
    articleTitle: 'How to Start a Handyman Business in 2026: Scope, Legal Boundaries, Pricing, and First Clients',
    summary: 'Build a handyman business with careful scope control, faster quoting, and a clear line between legal work and licensed trade work.',
    whyNow: 'Repair demand stays constant, but the winners are the operators who know what they should not take on.',
    firstAction: 'Study your state and municipal limits on handyman work before writing a service list.',
    keywords: ['how to start a handyman business', 'handyman business startup', 'handyman pricing'],
    institutions: ['state contractor board', 'Small Business Administration', 'state business portal'],
    timeToFirstResult: '14-45 days',
    difficulty: 'Moderate',
    outcome: 'A handyman business with safer scope boundaries and clearer margins',
    warning: 'If you blur the line between handyman work and licensed trade work, you create legal and safety exposure.',
    related: ['how-to-fix-drywall', 'how-to-replace-a-faucet'],
    tools: ['service menu', 'scope exclusions list', 'quote checklist', 'client photo intake'],
  }),
  topic({
    id: 'etsy-business',
    slug: 'how-to-sell-on-etsy',
    track: 'business',
    archetype: 'service-business',
    skill: 'Sell on Etsy',
    courseTitle: 'How to Sell on Etsy in 2026',
    articleTitle: 'How to Sell on Etsy in 2026: Product Research, Listings, Pricing, and Repeatable Fulfillment',
    summary: 'Build a durable Etsy operation around demand proof, margins, listing clarity, and fulfillment discipline rather than trend spikes.',
    whyNow: 'People keep searching Etsy because it feels accessible, but accessible does not mean easy or margin-safe.',
    firstAction: 'Pick one product family with repeatable production and shipping before chasing dozens of listing ideas.',
    keywords: ['how to sell on etsy', 'etsy business', 'etsy shop startup'],
    institutions: ['Small Business Administration', 'IRS small business guidance', 'postal/shipping resources'],
    timeToFirstResult: '14-45 days',
    difficulty: 'Foundational',
    outcome: 'A more realistic marketplace business built on demand and margin control',
    warning: 'Do not confuse views with a business. Unit economics and fulfillment speed decide what survives.',
    related: ['how-to-start-a-print-on-demand-store', 'how-to-start-a-newsletter-business'],
    tools: ['margin sheet', 'listing checklist', 'shipping workflow', 'product research notes'],
  }),
  topic({
    id: 'faceless-youtube-business',
    slug: 'how-to-start-a-faceless-youtube-channel',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a faceless YouTube channel',
    courseTitle: 'How to Start a Faceless YouTube Channel',
    articleTitle: 'How to Start a Faceless YouTube Channel in 2026: Topics, Workflow, Monetization, and Realistic Timelines',
    summary: 'Use research, scripting, editing, and distribution systems to build a channel around useful information instead of empty volume.',
    whyNow: 'Search demand keeps rising because video remains one of the clearest routes into audience ownership and repurposed content.',
    firstAction: 'Pick a niche where you can answer the same kind of question 50 times without running out of real knowledge.',
    keywords: ['how to start a faceless youtube channel', 'youtube automation', 'faceless youtube'],
    institutions: ['YouTube creator guidance', 'Google Search guidance', 'Small Business Administration'],
    timeToFirstResult: '30-90 days',
    difficulty: 'Moderate',
    outcome: 'A channel strategy built around information quality and production discipline',
    warning: 'Most faceless-channel advice is volume theater. Research quality, consistency, and distribution matter more.',
    related: ['how-to-use-ai-for-video-editing-and-content-repurposing', 'how-to-start-a-newsletter-business'],
    tools: ['topic bank', 'production SOP', 'thumbnail checklist', 'repurposing plan'],
  }),
  topic({
    id: 'newsletter-business',
    slug: 'how-to-start-a-newsletter-business',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a newsletter business',
    courseTitle: 'How to Start a Newsletter Business',
    articleTitle: 'How to Start a Newsletter Business in 2026: Niche, Offer, Systems, and Audience Ownership',
    summary: 'Build a newsletter around recurring reader utility, editorial consistency, and direct audience ownership.',
    whyNow: 'Newsletter search demand stays high because creators and operators want a distribution channel they control.',
    firstAction: 'Define the repeated problem the newsletter solves before choosing the platform or brand voice.',
    keywords: ['how to start a newsletter business', 'newsletter business model', 'email newsletter startup'],
    institutions: ['Small Business Administration', 'email compliance guidance', 'Google Search guidance'],
    timeToFirstResult: '14-60 days',
    difficulty: 'Foundational',
    outcome: 'A direct-audience publication model with stronger ownership than social reach alone',
    warning: 'A newsletter with no repeated utility turns into a diary. Promise something concrete and keep it.',
    related: ['how-to-start-a-faceless-youtube-channel', 'how-to-use-ai-for-marketing'],
    tools: ['editorial calendar', 'promise statement', 'signup flow', 'archive structure'],
  }),
  topic({
    id: 'print-on-demand-business',
    slug: 'how-to-start-a-print-on-demand-store',
    track: 'business',
    archetype: 'service-business',
    skill: 'Start a print-on-demand store',
    courseTitle: 'How to Start a Print-on-Demand Store',
    articleTitle: 'How to Start a Print-on-Demand Store in 2026: Product Selection, Margins, Design Risk, and Distribution',
    summary: 'Enter POD without fantasy by focusing on niche, product economics, and differentiating distribution instead of generic designs.',
    whyNow: 'Search demand remains high because POD looks simple, but profitability still depends on distribution and brand clarity.',
    firstAction: 'Choose one niche with an audience you can actually reach before you upload anything.',
    keywords: ['how to start a print on demand store', 'print on demand business', 'pod startup'],
    institutions: ['Small Business Administration', 'IRS small business guidance', 'postal/shipping resources'],
    timeToFirstResult: '21-60 days',
    difficulty: 'Foundational',
    outcome: 'A more defensible POD business plan grounded in reach and margin math',
    warning: 'Uploading products is not a strategy. Audience access decides whether the store exists at all.',
    related: ['how-to-sell-on-etsy', 'how-to-start-a-faceless-youtube-channel'],
    tools: ['margin calculator', 'niche brief', 'distribution plan', 'fulfillment notes'],
  }),
  topic({
    id: 'virtual-assistant-career',
    slug: 'how-to-become-a-virtual-assistant',
    track: 'business',
    archetype: 'service-business',
    skill: 'Become a virtual assistant',
    courseTitle: 'How to Become a Virtual Assistant in 2026',
    articleTitle: 'How to Become a Virtual Assistant in 2026: Services, Positioning, Systems, and First Clients',
    summary: 'Build a VA business around operational reliability, specialized support, and clear deliverables rather than generic admin promises.',
    whyNow: 'Businesses still need operators who can keep workflows moving, and specialization beats “I can do anything.”',
    firstAction: 'Pick one support lane such as inbox, scheduling, research, CRM, proposals, or content operations.',
    keywords: ['how to become a virtual assistant', 'virtual assistant business', 'virtual assistant services'],
    institutions: ['Small Business Administration', 'IRS small business guidance', 'public business operations resources'],
    timeToFirstResult: '14-45 days',
    difficulty: 'Foundational',
    outcome: 'A specialized remote-support offer built around dependable delivery',
    warning: 'Being available is not the same as being valuable. Specialization and systems raise rates.',
    related: ['how-to-use-ai-for-grant-writing-and-proposals', 'how-to-start-a-newsletter-business'],
    tools: ['service list', 'SOP binder', 'client onboarding form', 'weekly reporting template'],
  }),
]

const moneyTopics = [
  topic({
    id: 'pay-off-debt',
    slug: 'how-to-pay-off-credit-card-debt',
    track: 'money',
    archetype: 'money-system',
    skill: 'Pay off credit card debt',
    courseTitle: 'How to Pay Off Credit Card Debt in 2026',
    articleTitle: 'How to Pay Off Credit Card Debt in 2026: Systems, Negotiation, Snowball vs Avalanche, and Burnout Prevention',
    summary: 'Replace shame and random effort with a repeatable debt-paydown system that can survive real life and irregular stress.',
    whyNow: 'High rates and fragile cash flow keep debt paydown at the top of practical search demand.',
    firstAction: 'List every balance, APR, minimum, and due date in one place before choosing a payoff strategy.',
    keywords: ['how to pay off credit card debt', 'credit card debt plan', 'debt avalanche vs snowball'],
    institutions: ['Consumer Financial Protection Bureau', 'FDIC consumer resources', 'Federal Trade Commission'],
    timeToFirstResult: '1-4 weeks',
    difficulty: 'Foundational',
    outcome: 'A debt-reduction system you can actually maintain',
    warning: 'Debt advice becomes dangerous when it ignores cash flow volatility, fees, or mental fatigue.',
    related: ['how-to-build-an-emergency-fund', 'how-to-budget-on-irregular-income'],
    tools: ['debt tracker', 'autopay map', 'spending freeze rules', 'negotiation script'],
  }),
  topic({
    id: 'emergency-fund',
    slug: 'how-to-build-an-emergency-fund',
    track: 'money',
    archetype: 'money-system',
    skill: 'Build an emergency fund',
    courseTitle: 'How to Build an Emergency Fund in 2026',
    articleTitle: 'How to Build an Emergency Fund in 2026: Targets, Accounts, Automation, and the First $1,000',
    summary: 'Design an emergency fund around job risk, household fragility, and cash accessibility rather than generic internet numbers.',
    whyNow: 'Economic instability keeps emergency savings as one of the highest-leverage practical skills people can learn quickly.',
    firstAction: 'Choose one dedicated savings container and set the first automatic transfer today, even if it is small.',
    keywords: ['how to build an emergency fund', 'first 1000 emergency fund', 'emergency savings plan'],
    institutions: ['Consumer Financial Protection Bureau', 'FDIC consumer resources', 'TreasuryDirect education'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A stable cash buffer that reduces crisis borrowing',
    warning: 'The point is resilience, not perfection. Start with accessibility and consistency before optimization.',
    related: ['how-to-pay-off-credit-card-debt', 'how-to-budget-on-irregular-income'],
    tools: ['savings target calculator', 'bank setup checklist', 'automation plan', 'expense shock list'],
  }),
  topic({
    id: 'irregular-income-budget',
    slug: 'how-to-budget-on-irregular-income',
    track: 'money',
    archetype: 'money-system',
    skill: 'Budget on irregular income',
    courseTitle: 'How to Budget on Irregular Income in 2026',
    articleTitle: 'How to Budget on Irregular Income in 2026: Base Pay, Buffering, and Smoothing the Chaos',
    summary: 'Budget around the floor, not the best month, so your plan survives seasonal, freelance, or commission-based work.',
    whyNow: 'More workers now juggle variable earnings, side income, and unstable schedules than the average budgeting advice admits.',
    firstAction: 'Use the lowest realistic monthly income, not the average, to build the first version of the plan.',
    keywords: ['how to budget on irregular income', 'freelance budget', 'budget for variable income'],
    institutions: ['Consumer Financial Protection Bureau', 'IRS withholding estimator', 'FDIC consumer resources'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A cash-flow system designed for lumpy income',
    warning: 'If you budget off optimistic income, the system will fail exactly when you need it most.',
    related: ['how-to-build-an-emergency-fund', 'how-to-negotiate-a-raise'],
    tools: ['base-pay budget', 'income smoothing rules', 'tax holdback rule', 'weekly check-in'],
  }),
  topic({
    id: 'credit-score',
    slug: 'how-to-improve-your-credit-score',
    track: 'money',
    archetype: 'money-system',
    skill: 'Improve your credit score',
    courseTitle: 'How to Improve Your Credit Score in 2026',
    articleTitle: 'How to Improve Your Credit Score in 2026: Utilization, Payment History, Errors, and Timeline Expectations',
    summary: 'Understand what moves credit scores, what takes time, and what is mostly marketing noise.',
    whyNow: 'Housing, vehicles, and borrowing costs keep credit literacy high on the list of practical life searches.',
    firstAction: 'Pull the reports, dispute obvious errors, and lower utilization before chasing any exotic tactic.',
    keywords: ['how to improve your credit score', 'raise credit score fast', 'credit score tips'],
    institutions: ['Consumer Financial Protection Bureau', 'AnnualCreditReport.com', 'Federal Trade Commission'],
    timeToFirstResult: '7-45 days',
    difficulty: 'Foundational',
    outcome: 'A cleaner, more realistic credit-improvement plan',
    warning: 'Anyone promising instant credit transformation usually wants your money more than your stability.',
    related: ['how-to-buy-a-house', 'how-to-pay-off-credit-card-debt'],
    tools: ['credit review worksheet', 'utilization tracker', 'dispute log', 'autopay checklist'],
  }),
  topic({
    id: 'start-investing',
    slug: 'how-to-start-investing',
    track: 'money',
    archetype: 'money-system',
    skill: 'Start investing',
    courseTitle: 'How to Start Investing in 2026',
    articleTitle: 'How to Start Investing in 2026: Accounts, Asset Allocation, Risk, and First Contributions',
    summary: 'Learn the basic account stack, risk rules, and contribution habits that matter before you chase exotic returns.',
    whyNow: 'Search demand stays high because inflation, retirement anxiety, and platform accessibility keep pulling new people in.',
    firstAction: 'Decide the goal first: emergency reserves, retirement, near-term purchase, or long-term compounding.',
    keywords: ['how to start investing', 'investing for beginners 2026', 'first investment account'],
    institutions: ['Investor.gov', 'SEC investor education', 'FINRA investor resources'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A first-principles investing setup that avoids beginner noise',
    warning: 'This is education, not individualized financial advice. Time horizon and risk tolerance actually matter.',
    related: ['how-to-build-an-emergency-fund', 'how-to-buy-a-house'],
    tools: ['goal worksheet', 'account checklist', 'asset allocation notes', 'contribution automation'],
  }),
  topic({
    id: 'buy-house',
    slug: 'how-to-buy-a-house',
    track: 'money',
    archetype: 'money-system',
    skill: 'Buy a house',
    courseTitle: 'How to Buy a House in 2026',
    articleTitle: 'How to Buy a House in 2026: Credit, Down Payment, Rates, Inspections, and True Monthly Cost',
    summary: 'Treat a house purchase as a full operating system decision rather than just a monthly payment guess.',
    whyNow: 'High rates and tight supply keep home-buying searches intense because the decision is harder and riskier than it looks.',
    firstAction: 'Calculate the true monthly cost using taxes, insurance, maintenance, and rate stress, not just principal and interest.',
    keywords: ['how to buy a house', 'first time home buyer 2026', 'home buying steps'],
    institutions: ['Consumer Financial Protection Bureau', 'HUD homebuyer resources', 'Fannie Mae education'],
    timeToFirstResult: '14-90 days',
    difficulty: 'Moderate',
    outcome: 'A clearer home-buying decision process with fewer blind spots',
    warning: 'A mortgage approval is not proof you can safely own the house.',
    related: ['how-to-improve-your-credit-score', 'how-to-build-an-emergency-fund'],
    tools: ['home budget model', 'inspection checklist', 'down payment plan', 'rate stress test'],
  }),
  topic({
    id: 'negotiate-raise',
    slug: 'how-to-negotiate-a-raise',
    track: 'money',
    archetype: 'money-system',
    skill: 'Negotiate a raise',
    courseTitle: 'How to Negotiate a Raise in 2026',
    articleTitle: 'How to Negotiate a Raise in 2026: Timing, Evidence, Scripts, and Fallback Options',
    summary: 'Negotiate from documented value, timing, and alternatives rather than vague deservingness.',
    whyNow: 'Wages are under pressure and workers are searching for leverage that does not require a full career reset.',
    firstAction: 'Write the business case first: what changed, what improved, and what replacing you would cost.',
    keywords: ['how to negotiate a raise', 'raise negotiation script', 'salary increase request'],
    institutions: ['U.S. Department of Labor resources', 'BLS wage data', 'public negotiation resources'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A stronger compensation conversation with proof and fallback moves',
    warning: 'If you cannot tie your case to outcomes, timing, and market context, the conversation stays emotional.',
    related: ['how-to-change-careers-without-starting-over', 'how-to-use-linkedin-to-get-a-job'],
    tools: ['impact inventory', 'market pay notes', 'meeting script', 'fallback options list'],
  }),
  topic({
    id: 'resume',
    slug: 'how-to-write-a-resume-that-gets-interviews',
    track: 'money',
    archetype: 'money-system',
    skill: 'Write a resume that gets interviews',
    courseTitle: 'Write a Resume That Gets Interviews',
    articleTitle: 'How to Write a Resume That Gets Interviews in 2026: Positioning, Metrics, ATS, and Proof',
    summary: 'Write a resume around relevance, evidence, and readability so hiring teams can place you fast.',
    whyNow: 'Search demand keeps climbing because hiring screens remain crowded and weak resumes quietly kill strong candidates.',
    firstAction: 'Choose one target role before editing the resume. Generalized resumes underperform generalized candidates.',
    keywords: ['how to write a resume that gets interviews', 'resume 2026', 'ats resume tips'],
    institutions: ['U.S. Department of Labor career resources', 'public hiring guidance', 'state workforce agencies'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A targeted resume that reads like evidence instead of a biography',
    warning: 'Do not let AI fill the page with abstractions. Hiring teams need proof, not adjectives.',
    related: ['how-to-use-linkedin-to-get-a-job', 'how-to-negotiate-a-raise'],
    tools: ['target role brief', 'achievement inventory', 'ATS checklist', 'proof bullets'],
  }),
  topic({
    id: 'linkedin-job-search',
    slug: 'how-to-use-linkedin-to-get-a-job',
    track: 'money',
    archetype: 'money-system',
    skill: 'Use LinkedIn to get a job',
    courseTitle: 'Use LinkedIn to Get a Job in 2026',
    articleTitle: 'How to Use LinkedIn to Get a Job in 2026: Profile Positioning, Outreach, Search, and Follow-Up',
    summary: 'Turn LinkedIn into a distribution and conversation channel rather than a static online resume.',
    whyNow: 'People keep searching this because the platform matters, but most users still treat it like a billboard instead of an operating system.',
    firstAction: 'Rewrite the headline and “about” section around the role you want next, not the job you happened to have last.',
    keywords: ['how to use linkedin to get a job', 'linkedin job search', 'linkedin profile strategy'],
    institutions: ['public workforce resources', 'LinkedIn public learning resources', 'U.S. Department of Labor career resources'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Foundational',
    outcome: 'A more active job-search channel with better signal and follow-up structure',
    warning: 'Posting without targeted outreach, role clarity, and follow-up is noise.',
    related: ['how-to-write-a-resume-that-gets-interviews', 'how-to-change-careers-without-starting-over'],
    tools: ['profile checklist', 'outreach script', 'search routine', 'follow-up tracker'],
  }),
  topic({
    id: 'career-change',
    slug: 'how-to-change-careers-without-starting-over',
    track: 'money',
    archetype: 'money-system',
    skill: 'Change careers without starting over',
    courseTitle: 'Change Careers Without Starting Over',
    articleTitle: 'How to Change Careers Without Starting Over in 2026: Skill Mapping, Transitional Roles, and Financial Runway',
    summary: 'Change careers by repackaging transferable capability, choosing transitional roles, and protecting your runway.',
    whyNow: 'Career-change searches remain high because people want higher leverage without erasing years of accumulated work.',
    firstAction: 'List the work you can already do for a new industry instead of focusing first on what you lack.',
    keywords: ['how to change careers without starting over', 'career pivot 2026', 'career change strategy'],
    institutions: ['U.S. Department of Labor career resources', 'public workforce agencies', 'BLS occupational outlook resources'],
    timeToFirstResult: '14-60 days',
    difficulty: 'Moderate',
    outcome: 'A transition plan that preserves prior leverage instead of discarding it',
    warning: 'A total reinvention is often financially and psychologically heavier than a strategic adjacent move.',
    related: ['how-to-negotiate-a-raise', 'how-to-become-a-data-analyst'],
    tools: ['transferable skills map', 'runway budget', 'adjacent role list', 'narrative rewrite'],
  }),
]

const homeRepairTopics = [
  topic({
    id: 'fix-drywall',
    slug: 'how-to-fix-drywall',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Fix drywall',
    courseTitle: 'How to Fix Drywall Cleanly',
    articleTitle: 'How to Fix Drywall in 2026: Tools, Patches, Finishing, and Paint-Ready Results',
    summary: 'Handle the most common drywall repairs with cleaner prep, better finishing sequence, and less sanding chaos.',
    whyNow: 'Drywall repair keeps ranking high because small wall damage is constant and overpriced when the skill is missing.',
    firstAction: 'Identify the damage type first: nail hole, dent, seam issue, water damage, or cutout patch.',
    keywords: ['how to fix drywall', 'drywall patch repair', 'repair hole in drywall'],
    institutions: ['public home repair guidance', 'manufacturer installation guides', 'building code resources'],
    timeToFirstResult: '1-2 days',
    difficulty: 'Foundational',
    outcome: 'Cleaner drywall repairs with fewer visible patches',
    warning: 'If there is active moisture, movement, or possible structural damage, stop and diagnose that first.',
    related: ['how-to-tile-a-bathroom-floor', 'how-to-repair-a-roof-leak'],
    tools: ['patch kit', 'knife sizes', 'sanding checklist', 'paint match notes'],
  }),
  topic({
    id: 'tile-bathroom',
    slug: 'how-to-tile-a-bathroom-floor',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Tile a bathroom floor',
    courseTitle: 'How to Tile a Bathroom Floor',
    articleTitle: 'How to Tile a Bathroom Floor in 2026: Layout, Prep, Waterproofing, and Clean Finishing',
    summary: 'Get better results by treating substrate prep and layout as the real work instead of rushing to the visible part.',
    whyNow: 'Bathroom tile searches stay high because the project sits at the intersection of aesthetics, water risk, and resale value.',
    firstAction: 'Check subfloor condition, movement, and height transitions before choosing tile or mortar.',
    keywords: ['how to tile a bathroom floor', 'bathroom tile diy', 'tile layout bathroom'],
    institutions: ['manufacturer installation guides', 'building code resources', 'public home repair guidance'],
    timeToFirstResult: '2-5 days',
    difficulty: 'Moderate',
    outcome: 'A better bathroom tile plan with fewer long-term failures',
    warning: 'Waterproofing and floor prep matter more than the tile pattern. Skip them and the job fails later.',
    related: ['how-to-fix-drywall', 'how-to-replace-a-faucet'],
    tools: ['layout plan', 'substrate checklist', 'spacer system', 'grout cleanup list'],
  }),
  topic({
    id: 'replace-faucet',
    slug: 'how-to-replace-a-faucet',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Replace a faucet',
    courseTitle: 'How to Replace a Faucet',
    articleTitle: 'How to Replace a Faucet in 2026: Shutoffs, Fittings, Leaks, and a Clean Install',
    summary: 'Replace a common faucet with better prep, fewer stripped fittings, and less under-sink frustration.',
    whyNow: 'It is one of the most common home repair searches because the task feels small but gets messy quickly.',
    firstAction: 'Confirm the shutoff valves work before you buy parts or disconnect anything.',
    keywords: ['how to replace a faucet', 'install new faucet', 'kitchen faucet replacement'],
    institutions: ['manufacturer installation guides', 'public plumbing guidance', 'building code resources'],
    timeToFirstResult: '2-4 hours',
    difficulty: 'Foundational',
    outcome: 'A safer, cleaner faucet replacement workflow',
    warning: 'If the shutoffs fail or the connections are corroded, the project scope just changed.',
    related: ['how-to-install-a-water-heater', 'how-to-start-a-handyman-business'],
    tools: ['basin wrench', 'supply line check', 'bucket and towels', 'leak test routine'],
  }),
  topic({
    id: 'water-heater',
    slug: 'how-to-install-a-water-heater',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Install a water heater',
    courseTitle: 'Understand Water Heater Installation',
    articleTitle: 'How to Install a Water Heater in 2026: Code, Safety, Fuel Type, and When to Call a Pro',
    summary: 'Understand the process, code boundaries, and hazard points before deciding whether this is a DIY job or licensed work.',
    whyNow: 'Water heater failures are common and expensive, which pushes this topic high in search and high in risk.',
    firstAction: 'Confirm the heater type, venting, local code rules, and permit requirements before touching the old unit.',
    keywords: ['how to install a water heater', 'replace water heater', 'water heater permit'],
    institutions: ['local building department', 'manufacturer installation guides', 'public plumbing and gas safety guidance'],
    timeToFirstResult: '1-2 days',
    difficulty: 'Advanced',
    outcome: 'A safer install decision with fewer hidden code mistakes',
    warning: 'Gas, venting, pressure relief, leaks, and code compliance make this a frequent “call a pro” threshold.',
    related: ['how-to-replace-a-faucet', 'how-to-repair-a-roof-leak'],
    tools: ['permit checklist', 'fuel-type checklist', 'leak and vent test notes', 'replacement decision tree'],
  }),
  topic({
    id: 'roof-leak',
    slug: 'how-to-repair-a-roof-leak',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Repair a roof leak',
    courseTitle: 'How to Diagnose and Repair a Roof Leak',
    articleTitle: 'How to Repair a Roof Leak in 2026: Diagnosis, Temporary Control, and Permanent Fix Planning',
    summary: 'Find the true leak path, control interior damage, and avoid the common mistake of patching the wrong spot.',
    whyNow: 'Roof leaks trigger urgent searches because water damage multiplies fast and the origin is often deceptive.',
    firstAction: 'Document where the water appears indoors, then trace the likely path upslope before climbing outside.',
    keywords: ['how to repair a roof leak', 'find roof leak', 'temporary roof leak fix'],
    institutions: ['public home repair guidance', 'manufacturer roofing guides', 'building code resources'],
    timeToFirstResult: '1 day',
    difficulty: 'Moderate',
    outcome: 'A better leak diagnosis and a safer repair decision',
    warning: 'Height, weather, and hidden water paths make roof work riskier than it looks.',
    related: ['how-to-fix-drywall', 'how-to-winterize-a-home'],
    tools: ['interior leak map', 'weather window plan', 'temporary tarp notes', 'repair photo log'],
  }),
  topic({
    id: 'electrical-troubleshooting',
    slug: 'how-to-do-basic-home-electrical-troubleshooting-safely',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Do basic home electrical troubleshooting safely',
    courseTitle: 'Basic Home Electrical Troubleshooting Safely',
    articleTitle: 'How to Do Basic Home Electrical Troubleshooting Safely in 2026: Symptoms, Breakers, and Call-a-Pro Thresholds',
    summary: 'Learn how to inspect symptoms, isolate circuits, and know when to stop before a minor issue becomes a dangerous one.',
    whyNow: 'People search this constantly because electrical problems feel urgent, but the real skill is knowing what not to touch.',
    firstAction: 'Start with symptoms, breaker map, and outlet behavior before opening boxes or replacing devices.',
    keywords: ['home electrical troubleshooting', 'outlet not working breaker fine', 'electrical troubleshooting safely'],
    institutions: ['local electrical code guidance', 'manufacturer device guides', 'public electrical safety resources'],
    timeToFirstResult: '30-90 minutes',
    difficulty: 'Moderate',
    outcome: 'A safer diagnostic routine for simple electrical issues',
    warning: 'This guide is about diagnosis and thresholds, not unlicensed electrical work.',
    related: ['how-to-become-an-electrician', 'how-to-winterize-a-home'],
    tools: ['breaker map', 'symptom log', 'voltage tester guidance', 'call-a-pro triggers'],
  }),
  topic({
    id: 'car-maintenance',
    slug: 'how-to-maintain-a-car-yourself',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Maintain a car yourself',
    courseTitle: 'How to Maintain a Car Yourself',
    articleTitle: 'How to Maintain a Car Yourself in 2026: Intervals, Fluids, Inspections, and Low-Cost Prevention',
    summary: 'Handle the recurring maintenance tasks that prevent bigger failures and teach you how the vehicle is aging.',
    whyNow: 'Vehicle costs keep rising, so maintenance literacy saves money and reduces panic repair decisions.',
    firstAction: 'Read the manual and create a maintenance schedule based on the actual vehicle, mileage, and driving conditions.',
    keywords: ['how to maintain a car yourself', 'car maintenance checklist', 'basic car maintenance'],
    institutions: ['manufacturer owner manuals', 'NHTSA', 'public vehicle maintenance guidance'],
    timeToFirstResult: '1 day',
    difficulty: 'Foundational',
    outcome: 'A lower-cost maintenance routine with better visibility into vehicle condition',
    warning: 'Maintenance is great until safety-critical work exceeds your tools, workspace, or confidence.',
    related: ['how-to-change-your-own-brakes-safely', 'how-to-buy-a-used-car-without-getting-burned'],
    tools: ['maintenance schedule', 'fluid checklist', 'inspection notes', 'repair history log'],
  }),
  topic({
    id: 'change-brakes',
    slug: 'how-to-change-your-own-brakes-safely',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Change your own brakes safely',
    courseTitle: 'How to Change Your Own Brakes Safely',
    articleTitle: 'How to Change Your Own Brakes Safely in 2026: Workspace, Torque, Wear Patterns, and Test Drive Discipline',
    summary: 'Learn the workflow, inspection points, and safety habits that separate a real brake job from a cosmetic parts swap.',
    whyNow: 'Brake work sits at the top of cost-saving repair searches because labor is expensive and failure is high consequence.',
    firstAction: 'Confirm you have the exact parts, safe jacking setup, torque specs, and enough time to do the job without rushing.',
    keywords: ['how to change brakes safely', 'diy brake job', 'replace brake pads and rotors'],
    institutions: ['manufacturer service information', 'NHTSA', 'public vehicle safety guidance'],
    timeToFirstResult: '4-8 hours',
    difficulty: 'Moderate',
    outcome: 'A safer brake-service workflow with better inspection habits',
    warning: 'If you cannot verify torque, rotor condition, fluid status, and test-drive behavior, stop and get qualified help.',
    related: ['how-to-maintain-a-car-yourself', 'how-to-become-an-auto-mechanic'],
    tools: ['torque spec sheet', 'jack and stand checklist', 'brake inspection notes', 'test-drive protocol'],
  }),
  topic({
    id: 'buy-used-car',
    slug: 'how-to-buy-a-used-car-without-getting-burned',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Buy a used car without getting burned',
    courseTitle: 'How to Buy a Used Car Without Getting Burned',
    articleTitle: 'How to Buy a Used Car Without Getting Burned in 2026: Inspection, History, Pricing, and Walk-Away Rules',
    summary: 'Use a disciplined inspection and negotiation process so urgency does not push you into someone else’s deferred maintenance.',
    whyNow: 'High car prices keep used-car searches intense, and rushed buyers still overpay for hidden problems.',
    firstAction: 'Set your walk-away rules before you shop: budget, total cost, must-have documents, and inspection standards.',
    keywords: ['how to buy a used car', 'used car checklist', 'used car inspection tips'],
    institutions: ['NHTSA', 'consumer auto buying guidance', 'state DMV'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A stronger used-car buying process with fewer emotional mistakes',
    warning: 'If the seller resists records or an inspection, that is information, not an inconvenience.',
    related: ['how-to-maintain-a-car-yourself', 'how-to-build-an-emergency-fund'],
    tools: ['inspection checklist', 'title and VIN check', 'pricing comps', 'walk-away rules'],
  }),
  topic({
    id: 'winterize-home',
    slug: 'how-to-winterize-a-home',
    track: 'home-repair',
    archetype: 'diy',
    skill: 'Winterize a home',
    courseTitle: 'How to Winterize a Home',
    articleTitle: 'How to Winterize a Home in 2026: Pipes, Air Leaks, Heat Loss, and Storm Readiness',
    summary: 'Protect a home against cold weather with a prioritized sequence that starts with damage prevention and heat retention.',
    whyNow: 'Weather volatility keeps winterization as a recurring high-stakes home skill, especially where outages and pipe failures cost real money.',
    firstAction: 'Walk the house and rank the weak points: exposed pipes, drafts, roof issues, heat systems, and exterior drainage.',
    keywords: ['how to winterize a home', 'winter home checklist', 'prevent frozen pipes'],
    institutions: ['Energy.gov home energy guidance', 'public weatherization guidance', 'local utility resources'],
    timeToFirstResult: '1-2 days',
    difficulty: 'Foundational',
    outcome: 'A more resilient house for cold weather and short outages',
    warning: 'Do not ignore combustion safety, venting, or failing heating equipment in the name of DIY thrift.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-repair-a-roof-leak'],
    tools: ['winter walkthrough', 'pipe checklist', 'draft map', 'storm prep bin'],
  }),
]

const foodSelfRelianceTopics = [
  topic({
    id: 'start-garden',
    slug: 'how-to-start-a-garden-that-actually-feeds-you',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Start a garden that actually feeds you',
    courseTitle: 'How to Start a Garden That Actually Feeds You',
    articleTitle: 'How to Start a Garden That Actually Feeds You in 2026: Planning, Soil, Crops, and Failure Recovery',
    summary: 'Design a food garden around calories, climate, season length, and maintenance capacity instead of aesthetics alone.',
    whyNow: 'People want food resilience, but most starter gardens fail because the design never matched the household or climate.',
    firstAction: 'Estimate sun, water, space, and the vegetables you truly eat before you buy seeds.',
    keywords: ['how to start a garden', 'vegetable garden for beginners', 'grow food at home'],
    institutions: ['USDA', 'state extension services', 'public gardening guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A more productive, lower-friction starter food garden',
    warning: 'A beautiful plan that exceeds your maintenance capacity is still a bad plan.',
    related: ['how-to-grow-food-in-small-spaces', 'how-to-build-long-term-food-storage'],
    tools: ['garden sketch', 'crop plan', 'watering plan', 'failure log'],
  }),
  topic({
    id: 'small-space-food',
    slug: 'how-to-grow-food-in-small-spaces',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Grow food in small spaces',
    courseTitle: 'How to Grow Food in Small Spaces',
    articleTitle: 'How to Grow Food in Small Spaces in 2026: Containers, Vertical Systems, Crop Choice, and Yield Strategy',
    summary: 'Use containers, vertical space, and crop selection to make limited square footage more productive.',
    whyNow: 'Urban and suburban search demand stays high because many people want food resilience without acreage.',
    firstAction: 'Match the crop to the sun and container depth before buying a dozen random seeds.',
    keywords: ['how to grow food in small spaces', 'container vegetable garden', 'balcony food garden'],
    institutions: ['USDA', 'state extension services', 'public gardening guidance'],
    timeToFirstResult: '1-10 days',
    difficulty: 'Foundational',
    outcome: 'A higher-yield small-space food setup',
    warning: 'Do not fight the sun map. Crop choice has to respect light, water, and heat reality.',
    related: ['how-to-start-a-garden-that-actually-feeds-you', 'how-to-build-long-term-food-storage'],
    tools: ['container plan', 'sun map', 'crop matching sheet', 'watering calendar'],
  }),
  topic({
    id: 'home-canning',
    slug: 'how-to-preserve-food-by-canning',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Preserve food by canning',
    courseTitle: 'How to Preserve Food by Canning Safely',
    articleTitle: 'How to Preserve Food by Canning in 2026: Water Bath vs Pressure, Safe Recipes, and Storage Rules',
    summary: 'Learn the decision points that make canning safe: acidity, pressure, tested recipes, and disciplined storage.',
    whyNow: 'Food prices and resilience planning keep canning highly searched, but unsafe shortcuts remain common.',
    firstAction: 'Start with tested recipes and the right canning method before you buy bulk produce.',
    keywords: ['how to preserve food by canning', 'home canning for beginners', 'pressure canning safety'],
    institutions: ['USDA Complete Guide to Home Canning', 'state extension services', 'public food safety guidance'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Moderate',
    outcome: 'A safer preservation workflow with fewer contamination risks',
    warning: 'Food preservation is not a vibes project. Tested recipes and method discipline matter.',
    related: ['how-to-build-long-term-food-storage', 'how-to-dehydrate-food-at-home'],
    tools: ['tested recipe list', 'jar inventory', 'processing log', 'storage labels'],
  }),
  topic({
    id: 'food-storage',
    slug: 'how-to-build-long-term-food-storage',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Build long-term food storage',
    courseTitle: 'How to Build Long-Term Food Storage',
    articleTitle: 'How to Build Long-Term Food Storage in 2026: Calories, Rotation, Packaging, and Waste Prevention',
    summary: 'Build a food reserve that matches household reality, shelf life, and rotation instead of panic buying.',
    whyNow: 'Economic instability and disaster planning keep long-term food storage as a permanent search category.',
    firstAction: 'Calculate what your household actually eats and store that before you chase theoretical survival menus.',
    keywords: ['how to build long term food storage', 'emergency food storage', 'food pantry rotation'],
    institutions: ['Ready.gov', 'USDA', 'public food safety guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A more durable household food reserve with lower waste',
    warning: 'Stored food you never rotate turns into expensive trash.',
    related: ['how-to-preserve-food-by-canning', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['calorie planner', 'rotation tracker', 'storage map', 'purchase priorities'],
  }),
  topic({
    id: 'backyard-chickens',
    slug: 'how-to-raise-backyard-chickens',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Raise backyard chickens',
    courseTitle: 'How to Raise Backyard Chickens',
    articleTitle: 'How to Raise Backyard Chickens in 2026: Local Rules, Coop Design, Feed, and Daily Systems',
    summary: 'Understand the local rules, housing, feeding, health, and routine demands behind backyard egg production.',
    whyNow: 'Search demand stays high because people want local egg resilience, but the animals turn a trend into a real system.',
    firstAction: 'Check local ordinances, predator pressure, and your daily routine before you buy chicks or build a coop.',
    keywords: ['how to raise backyard chickens', 'backyard chicken basics', 'how to start a chicken coop'],
    institutions: ['USDA backyard poultry guidance', 'state extension services', 'local ordinances'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Moderate',
    outcome: 'A more realistic backyard poultry setup plan',
    warning: 'Animals create daily obligations. If you cannot sustain the routine, do not romanticize the outcome.',
    related: ['how-to-start-a-garden-that-actually-feeds-you', 'how-to-build-long-term-food-storage'],
    tools: ['ordinance check', 'coop plan', 'feed schedule', 'health log'],
  }),
  topic({
    id: 'hunting-basics',
    slug: 'how-to-learn-hunting-basics-legally-and-safely',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Learn hunting basics legally and safely',
    courseTitle: 'Learn Hunting Basics Legally and Safely',
    articleTitle: 'How to Learn Hunting Basics Legally and Safely in 2026: Education, Seasons, Ethics, and Field Readiness',
    summary: 'Approach hunting as a regulated food and conservation skill with safety, law, ethics, and mentorship at the center.',
    whyNow: 'Interest rises whenever people start thinking seriously about self-reliance, but safe participation begins with law and education.',
    firstAction: 'Complete the hunter education requirements for your state before buying gear or planning a season.',
    keywords: ['how to hunt for beginners', 'hunter safety course', 'learn hunting legally'],
    institutions: ['state wildlife agency', 'hunter education program', 'public conservation resources'],
    timeToFirstResult: '14-90 days',
    difficulty: 'Moderate',
    outcome: 'A lawful, safer, and more ethical hunting entry path',
    warning: 'This guide is about legal preparation, safety, and field discipline, not weapon tactics.',
    related: ['how-to-fish-for-food', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['state season guide', 'hunter education checklist', 'field prep notes', 'ethics checklist'],
  }),
  topic({
    id: 'fish-for-food',
    slug: 'how-to-fish-for-food',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Fish for food',
    courseTitle: 'How to Fish for Food',
    articleTitle: 'How to Fish for Food in 2026: Licenses, Water, Gear, Processing, and Keeping It Simple',
    summary: 'Learn food fishing as a local, legal, low-complexity skill built around species, access, season, and processing.',
    whyNow: 'Fishing stays relevant because it offers one of the most accessible ways to connect food gathering with place-based knowledge.',
    firstAction: 'Choose one local species and one local water body before buying a pile of gear.',
    keywords: ['how to fish for food', 'beginner fishing for food', 'keep fish to eat'],
    institutions: ['state wildlife agency', 'public fisheries guidance', 'food safety resources'],
    timeToFirstResult: '1-30 days',
    difficulty: 'Foundational',
    outcome: 'A simpler, more local food-fishing plan',
    warning: 'Check licenses, contamination advisories, size limits, and cleaning safety before keeping fish.',
    related: ['how-to-learn-hunting-basics-legally-and-safely', 'how-to-build-long-term-food-storage'],
    tools: ['license checklist', 'species guide', 'cleaning setup', 'local water log'],
  }),
  topic({
    id: 'bread-basics',
    slug: 'how-to-bake-bread-with-basic-pantry-supplies',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Bake bread with basic pantry supplies',
    courseTitle: 'How to Bake Bread With Basic Pantry Supplies',
    articleTitle: 'How to Bake Bread With Basic Pantry Supplies in 2026: Flour, Fermentation, Heat, and Repeatable Results',
    summary: 'Use a simple process to turn pantry ingredients into dependable bread without chasing influencer complexity.',
    whyNow: 'Bread remains one of the most searched food self-reliance skills because it converts staple storage into real meals.',
    firstAction: 'Start with one basic loaf formula and make it three times before changing ingredients or methods.',
    keywords: ['how to bake bread', 'bread with pantry staples', 'simple bread recipe skill'],
    institutions: ['USDA food guidance', 'state extension services', 'public food safety guidance'],
    timeToFirstResult: '1 day',
    difficulty: 'Foundational',
    outcome: 'A repeatable homemade bread process you can scale or adapt',
    warning: 'Consistency comes from repetition and note-taking, not endless recipe switching.',
    related: ['how-to-build-long-term-food-storage', 'how-to-preserve-food-by-canning'],
    tools: ['baker notebook', 'timing log', 'heat checklist', 'ingredient conversion chart'],
  }),
  topic({
    id: 'compost-soil',
    slug: 'how-to-build-compost-and-soil-fertility',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Build compost and soil fertility',
    courseTitle: 'How to Build Compost and Soil Fertility',
    articleTitle: 'How to Build Compost and Soil Fertility in 2026: Inputs, Balance, Moisture, and Garden Payoff',
    summary: 'Treat compost as a system for soil improvement, waste reduction, and long-term garden productivity.',
    whyNow: 'Gardeners and self-reliance learners keep searching for cheaper fertility systems as input costs rise.',
    firstAction: 'Start with one manageable pile or bin and learn how moisture, greens, and browns actually balance.',
    keywords: ['how to compost', 'build soil fertility', 'garden compost basics'],
    institutions: ['USDA', 'state extension services', 'public compost guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A better soil-building system that improves garden resilience over time',
    warning: 'Compost is a biological process. Wrong inputs and unmanaged moisture create odor and pest problems.',
    related: ['how-to-start-a-garden-that-actually-feeds-you', 'how-to-grow-food-in-small-spaces'],
    tools: ['input list', 'moisture check', 'bin plan', 'garden application notes'],
  }),
  topic({
    id: 'solar-backup',
    slug: 'how-to-install-solar-backup-power-at-home',
    track: 'food-self-reliance',
    archetype: 'resilience',
    skill: 'Install solar backup power at home',
    courseTitle: 'Understand Solar Backup Power at Home',
    articleTitle: 'How to Install Solar Backup Power at Home in 2026: Load Planning, Batteries, Safety, and Realistic Expectations',
    summary: 'Design backup power around essential loads, storage limits, weather, and safe installation boundaries.',
    whyNow: 'Outage anxiety and energy costs keep solar-backup searches growing, but most households underestimate the planning.',
    firstAction: 'List the essential loads you truly need during an outage before sizing any hardware.',
    keywords: ['how to install solar backup power at home', 'solar battery backup', 'home backup power planning'],
    institutions: ['Energy.gov', 'local permitting guidance', 'manufacturer installation guides'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Advanced',
    outcome: 'A more realistic backup-power design and buying plan',
    warning: 'This topic crosses electrical, structural, and code boundaries. Many households should plan professionally even if they learn deeply.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-winterize-a-home'],
    tools: ['load sheet', 'outage priority map', 'battery sizing notes', 'permit checklist'],
  }),
]

const preparednessTopics = [
  topic({
    id: '72-hour-kit',
    slug: 'how-to-build-a-72-hour-emergency-kit',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Build a 72-hour emergency kit',
    courseTitle: 'How to Build a 72-Hour Emergency Kit',
    articleTitle: 'How to Build a 72-Hour Emergency Kit in 2026: Water, Food, Light, Documents, and Versioning',
    summary: 'Build a practical household-ready kit by thinking in systems, redundancy, and update cycles instead of random gadgets.',
    whyNow: 'Preparedness searches spike with every storm and outage, but a real kit wins by being boring, accessible, and current.',
    firstAction: 'Build one household inventory list before you buy duplicates of things you already own.',
    keywords: ['how to build a 72 hour emergency kit', 'emergency kit checklist', 'disaster kit basics'],
    institutions: ['Ready.gov', 'FEMA', 'CDC emergency preparedness guidance'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A more usable emergency kit with fewer blind spots',
    warning: 'Preparedness is maintenance. A neglected kit is not readiness.',
    related: ['how-to-purify-water-in-an-emergency', 'how-to-build-long-term-food-storage'],
    tools: ['inventory sheet', 'document pouch list', 'rotation calendar', 'household needs checklist'],
  }),
  topic({
    id: 'water-purification',
    slug: 'how-to-purify-water-in-an-emergency',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Purify water in an emergency',
    courseTitle: 'How to Purify Water in an Emergency',
    articleTitle: 'How to Purify Water in an Emergency in 2026: Storage, Filtration, Boiling, and Contamination Limits',
    summary: 'Understand what different water treatments can and cannot handle so you do not improvise past the limits.',
    whyNow: 'Water is one of the first fragilities people search during storms, outages, and contamination scares.',
    firstAction: 'Learn the difference between clear water, contaminated water, biological risk, and chemical risk before choosing a method.',
    keywords: ['how to purify water in an emergency', 'emergency water treatment', 'safe water storage'],
    institutions: ['CDC water guidance', 'Ready.gov', 'EPA drinking water resources'],
    timeToFirstResult: '1-3 days',
    difficulty: 'Foundational',
    outcome: 'A safer water plan for outages and short-term emergencies',
    warning: 'No single tool solves every contamination problem. Know the limits of filtration, boiling, and chemicals.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-build-long-term-food-storage'],
    tools: ['water storage plan', 'treatment comparison', 'household gallons calculator', 'container checklist'],
  }),
  topic({
    id: 'first-aid',
    slug: 'how-to-learn-basic-first-aid',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Learn basic first aid',
    courseTitle: 'Learn Basic First Aid',
    articleTitle: 'How to Learn Basic First Aid in 2026: Training, Kits, Decision Thresholds, and Practice',
    summary: 'Use first aid as a layered household skill rooted in training, scene safety, and clear escalation thresholds.',
    whyNow: 'Search demand never goes away because first aid is one of the few skills that immediately changes household resilience.',
    firstAction: 'Book a recognized first-aid class before buying a giant kit you do not know how to use.',
    keywords: ['how to learn first aid', 'basic first aid training', 'first aid for beginners'],
    institutions: ['American Red Cross', 'CDC emergency preparedness guidance', 'local first-aid training providers'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A better first-aid learning path with less panic and more preparedness',
    warning: 'This guide is educational, not a substitute for certified medical training or emergency care.',
    related: ['how-to-stop-bleeding-and-handle-trauma-until-help-arrives', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['training schedule', 'kit audit', 'household emergency contacts', 'practice drill notes'],
  }),
  topic({
    id: 'stop-bleeding',
    slug: 'how-to-stop-bleeding-and-handle-trauma-until-help-arrives',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Stop bleeding and handle trauma until help arrives',
    courseTitle: 'Bleeding Control and Trauma Readiness',
    articleTitle: 'How to Stop Bleeding and Handle Trauma Until Help Arrives in 2026: Training, Kits, and Decision Speed',
    summary: 'Understand why bleeding control training, kit placement, and scene judgment matter in the first minutes of an emergency.',
    whyNow: 'This remains one of the highest-value readiness skills because severe bleeding is time-sensitive and households are often unprepared.',
    firstAction: 'Take a recognized bleeding-control class and place a basic trauma kit where people actually are.',
    keywords: ['how to stop bleeding', 'bleeding control training', 'trauma kit basics'],
    institutions: ['Stop the Bleed', 'American Red Cross', 'CDC emergency preparedness guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Moderate',
    outcome: 'A faster, calmer response path during severe bleeding emergencies',
    warning: 'This guide is not a substitute for certified bleeding-control instruction.',
    related: ['how-to-learn-basic-first-aid', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['class finder', 'trauma kit placement', 'call-for-help script', 'after-action checklist'],
  }),
  topic({
    id: 'navigate-without-gps',
    slug: 'how-to-navigate-without-gps',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Navigate without GPS',
    courseTitle: 'How to Navigate Without GPS',
    articleTitle: 'How to Navigate Without GPS in 2026: Maps, Landmarks, Route Planning, and Failing Gracefully',
    summary: 'Build basic map, landmark, and route habits so a dead phone or weak signal does not become a bigger emergency.',
    whyNow: 'People increasingly rely on phones for every route, which makes navigation failure more common and more stressful.',
    firstAction: 'Carry a paper map for one familiar region and practice planning a route without the phone.',
    keywords: ['how to navigate without gps', 'read a map', 'route planning without phone'],
    institutions: ['Ready.gov', 'public land navigation guidance', 'state emergency management resources'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'Better orientation under low-tech conditions',
    warning: 'This is practical navigation literacy, not advanced backcountry survival instruction.',
    related: ['how-to-use-ham-radio-in-an-emergency', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['paper map', 'route card', 'landmark notes', 'battery backup plan'],
  }),
  topic({
    id: 'ham-radio',
    slug: 'how-to-use-ham-radio-in-an-emergency',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Use ham radio in an emergency',
    courseTitle: 'How to Use Ham Radio in an Emergency',
    articleTitle: 'How to Use Ham Radio in an Emergency in 2026: Licensing, Nets, Gear, and Practice',
    summary: 'Treat radio as a practice-based communication skill built on licensing, local networks, and repeat drills.',
    whyNow: 'Outage and disaster readiness keeps radio relevant whenever cellular assumptions become fragile.',
    firstAction: 'Find the local amateur radio club and licensing path before buying advanced gear.',
    keywords: ['how to use ham radio in an emergency', 'ham radio for beginners', 'emergency communications'],
    institutions: ['FCC amateur radio guidance', 'ARRL', 'local emergency management resources'],
    timeToFirstResult: '14-60 days',
    difficulty: 'Moderate',
    outcome: 'A more realistic emergency-communications skill path',
    warning: 'Equipment without licensing, practice, and local frequency knowledge is mostly theater.',
    related: ['how-to-navigate-without-gps', 'how-to-build-a-72-hour-emergency-kit'],
    tools: ['license plan', 'local net list', 'radio go-kit notes', 'contact card'],
  }),
  topic({
    id: 'grid-down-cooking',
    slug: 'how-to-heat-and-cook-when-the-grid-is-down',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Heat and cook when the grid is down',
    courseTitle: 'Heat and Cook When the Grid Is Down',
    articleTitle: 'How to Heat and Cook When the Grid Is Down in 2026: Fuel, Ventilation, Safety, and Household Planning',
    summary: 'Plan for safe heat and cooking options by starting with ventilation, fuel storage, and the real duration of the outage.',
    whyNow: 'Storms and grid instability keep this category highly searched because comfort, food, and safety collapse together during outages.',
    firstAction: 'List what you already own and identify which options are safe indoors, outdoors, or not safe at all.',
    keywords: ['how to cook when power is out', 'grid down cooking', 'emergency heating plan'],
    institutions: ['Ready.gov', 'CDC emergency preparedness guidance', 'manufacturer safety manuals'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A safer outage plan for cooking and staying warm',
    warning: 'Combustion, carbon monoxide, and fuel storage mistakes kill people every year.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-winterize-a-home'],
    tools: ['fuel map', 'ventilation checklist', 'cook plan', 'heater safety sheet'],
  }),
  topic({
    id: 'extreme-weather',
    slug: 'how-to-stay-safe-in-extreme-weather',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Stay safe in extreme weather',
    courseTitle: 'How to Stay Safe in Extreme Weather',
    articleTitle: 'How to Stay Safe in Extreme Weather in 2026: Alerts, Shelter, Supplies, and Decision Timing',
    summary: 'Use weather safety as a decision-timing skill: know when to prepare, when to shelter, and when to leave.',
    whyNow: 'Extreme weather is one of the clearest recurring drivers of household preparedness searches.',
    firstAction: 'Define your shelter plan and communication plan before the warning arrives.',
    keywords: ['how to stay safe in extreme weather', 'storm preparedness', 'weather emergency plan'],
    institutions: ['NOAA', 'Ready.gov', 'state emergency management resources'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A stronger household weather-readiness plan',
    warning: 'Preparedness fails when people wait for certainty. Decision timing is the skill.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-winterize-a-home'],
    tools: ['family plan', 'alert setup', 'shelter checklist', 'leave-now triggers'],
  }),
  topic({
    id: 'home-hardening',
    slug: 'how-to-strengthen-home-security-and-self-protection',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Strengthen home security and self-protection',
    courseTitle: 'Strengthen Home Security and Self-Protection',
    articleTitle: 'How to Strengthen Home Security and Self-Protection in 2026: Layers, Lighting, Habits, and Safer Households',
    summary: 'Focus on layered security, visibility, routines, and de-escalation rather than fantasies of total control.',
    whyNow: 'People search this because insecurity feels personal, but the highest-value fixes are usually boring environmental upgrades.',
    firstAction: 'Walk the property at night and list the easiest entries, sightline failures, and habit-based vulnerabilities.',
    keywords: ['how to improve home security', 'home hardening basics', 'safer home habits'],
    institutions: ['local police prevention guidance', 'Ready.gov', 'public home safety resources'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A more layered and realistic household security plan',
    warning: 'This guide emphasizes prevention, environment, and readiness, not violent tactics.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-stay-safe-in-extreme-weather'],
    tools: ['night walk checklist', 'entry-point map', 'lighting plan', 'family routines review'],
  }),
  topic({
    id: 'outage-sanitation',
    slug: 'how-to-handle-sanitation-during-an-outage',
    track: 'preparedness',
    archetype: 'resilience',
    skill: 'Handle sanitation during an outage',
    courseTitle: 'How to Handle Sanitation During an Outage',
    articleTitle: 'How to Handle Sanitation During an Outage in 2026: Water, Waste, Hygiene, and Disease Prevention',
    summary: 'Treat sanitation as a core outage system so a utilities problem does not become a health problem.',
    whyNow: 'Most households under-plan sanitation, even though it becomes urgent quickly during water or sewer disruptions.',
    firstAction: 'Map how your household handles toilet, handwashing, waste, and cleaning if running water fails.',
    keywords: ['how to handle sanitation during an outage', 'outage hygiene', 'emergency sanitation'],
    institutions: ['CDC water guidance', 'Ready.gov', 'public health department guidance'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A lower-risk sanitation plan for outages and shelter-in-place events',
    warning: 'Ignoring sanitation turns short disruptions into illness risk.',
    related: ['how-to-build-a-72-hour-emergency-kit', 'how-to-purify-water-in-an-emergency'],
    tools: ['sanitation kit list', 'water use plan', 'waste disposal notes', 'cleaning routine'],
  }),
]

const communicationTopics = [
  topic({
    id: 'public-speaking',
    slug: 'how-to-get-better-at-public-speaking',
    track: 'communication',
    archetype: 'communication',
    skill: 'Get better at public speaking',
    courseTitle: 'How to Get Better at Public Speaking in 2026',
    articleTitle: 'How to Get Better at Public Speaking in 2026: Structure, Reps, Fear Management, and Real Improvement',
    summary: 'Treat speaking as a trainable system built on structure, rehearsal, feedback, and exposure instead of charisma myths.',
    whyNow: 'Communication remains one of the top employer-demand skills, and speaking anxiety keeps the search demand perennial.',
    firstAction: 'Record a two-minute explanation of something you know well and study the playback without excuses.',
    keywords: ['how to get better at public speaking', 'public speaking tips', 'overcome speaking anxiety'],
    institutions: ['OECD AI skill-demand report', 'public speaking resources', 'workforce skill guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A more repeatable public-speaking practice system',
    warning: 'Confidence is usually a trailing indicator of preparation, not a prerequisite.',
    related: ['how-to-write-clearly-at-work', 'how-to-manage-projects-at-work'],
    tools: ['speech outline', 'recording habit', 'feedback rubric', 'rehearsal timer'],
  }),
  topic({
    id: 'learn-math',
    slug: 'how-to-teach-yourself-math-as-an-adult',
    track: 'communication',
    archetype: 'communication',
    skill: 'Teach yourself math as an adult',
    courseTitle: 'How to Teach Yourself Math as an Adult',
    articleTitle: 'How to Teach Yourself Math as an Adult in 2026: Foundations, Practice, Sequence, and Momentum',
    summary: 'Rebuild math by sequencing the foundations correctly and practicing consistently instead of collecting random resources.',
    whyNow: 'Adults keep searching for math rebuilds because technical, trades, and finance pathways still punish shaky fundamentals.',
    firstAction: 'Diagnose the last level you truly own rather than starting from the content you wish you already knew.',
    keywords: ['how to teach yourself math as an adult', 'learn math from scratch', 'math for adults'],
    institutions: ['public education resources', 'community college math support', 'workforce training resources'],
    timeToFirstResult: '7-30 days',
    difficulty: 'Moderate',
    outcome: 'A math rebuild plan that actually advances',
    warning: 'Math recovery fails when learners skip the gaps they are embarrassed about.',
    related: ['how-to-become-an-electrician', 'how-to-use-spreadsheets-professionally'],
    tools: ['skill diagnostic', 'practice calendar', 'error log', 'problem bank'],
  }),
  topic({
    id: 'learn-spanish',
    slug: 'how-to-learn-spanish-for-work',
    track: 'communication',
    archetype: 'communication',
    skill: 'Learn Spanish for work',
    courseTitle: 'How to Learn Spanish for Work in 2026',
    articleTitle: 'How to Learn Spanish for Work in 2026: Functional Vocabulary, Listening, Practice Systems, and Real Progress',
    summary: 'Learn job-useful Spanish by focusing on function, listening, repetition, and the words your actual role needs first.',
    whyNow: 'Language search demand stays strong because workers want practical communication gains, not endless app streaks.',
    firstAction: 'Write the fifty phrases your real work or daily life would most benefit from and learn those first.',
    keywords: ['how to learn spanish for work', 'spanish for beginners work', 'learn spanish fast'],
    institutions: ['public adult education resources', 'community college language programs', 'workforce training resources'],
    timeToFirstResult: '14-45 days',
    difficulty: 'Foundational',
    outcome: 'A practical language plan tied to real use instead of abstract fluency fantasies',
    warning: 'If the language never gets used in real context, it will not stick.',
    related: ['how-to-write-clearly-at-work', 'how-to-get-better-at-public-speaking'],
    tools: ['phrase deck', 'listening routine', 'work vocabulary list', 'weekly practice tracker'],
  }),
  topic({
    id: 'write-clearly',
    slug: 'how-to-write-clearly-at-work',
    track: 'communication',
    archetype: 'communication',
    skill: 'Write clearly at work',
    courseTitle: 'How to Write Clearly at Work',
    articleTitle: 'How to Write Clearly at Work in 2026: Structure, Brevity, Tone, and Decision-Ready Writing',
    summary: 'Write so the reader can understand, decide, and act without decoding your process.',
    whyNow: 'As AI floods the zone with average text, clear human writing becomes a sharper differentiator.',
    firstAction: 'Rewrite one recent message so the decision, action, deadline, and owner are obvious in the first screen.',
    keywords: ['how to write clearly at work', 'clear business writing', 'professional writing skills'],
    institutions: ['OECD AI skill-demand report', 'public writing guidance', 'workforce skill guidance'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A work-writing system that improves trust and speed',
    warning: 'Length is not clarity. Structure is clarity.',
    related: ['how-to-get-better-at-public-speaking', 'how-to-research-anything-fast'],
    tools: ['message template', 'editing checklist', 'decision-first outline', 'tone guide'],
  }),
  topic({
    id: 'project-management',
    slug: 'how-to-manage-projects-at-work',
    track: 'communication',
    archetype: 'communication',
    skill: 'Manage projects at work',
    courseTitle: 'How to Manage Projects at Work in 2026',
    articleTitle: 'How to Manage Projects at Work in 2026: Scope, Owners, Deadlines, Risk, and Calm Execution',
    summary: 'Use project management as a communication and risk-control skill, not just a software category.',
    whyNow: 'Cross-functional work keeps expanding, which pushes more people into project ownership without training.',
    firstAction: 'Reduce one current project to scope, owner, sequence, deadline, and top risk on a single page.',
    keywords: ['how to manage projects at work', 'project management basics', 'project workflow'],
    institutions: ['OECD AI skill-demand report', 'public project management resources', 'workforce skill guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'A calmer project rhythm with clearer ownership and fewer surprises',
    warning: 'Tools do not replace scope discipline. Many project problems are actually decision problems.',
    related: ['how-to-negotiate-contracts-for-freelance-and-client-work', 'how-to-lead-a-team-without-chaos'],
    tools: ['one-page plan', 'risk log', 'meeting cadence', 'owner tracker'],
  }),
  topic({
    id: 'lead-team',
    slug: 'how-to-lead-a-team-without-chaos',
    track: 'communication',
    archetype: 'communication',
    skill: 'Lead a team without chaos',
    courseTitle: 'How to Lead a Team Without Chaos',
    articleTitle: 'How to Lead a Team Without Chaos in 2026: Priorities, Feedback, Meetings, and Accountability',
    summary: 'Lead by clarifying priorities, removing ambiguity, and setting steady operating rhythms.',
    whyNow: 'Leadership search demand rises whenever teams are stretched, hybrid, or carrying too many unclear priorities.',
    firstAction: 'Define the top three outcomes, the actual owner of each, and the decision cadence that keeps them moving.',
    keywords: ['how to lead a team', 'team leadership basics', 'manage team without chaos'],
    institutions: ['OECD AI skill-demand report', 'public management resources', 'workforce skill guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Moderate',
    outcome: 'A more coherent team operating rhythm',
    warning: 'Leadership is not vibes. It is clarity, consistency, and accountability under pressure.',
    related: ['how-to-manage-projects-at-work', 'how-to-get-better-at-public-speaking'],
    tools: ['priority stack', 'meeting rules', 'feedback template', 'owner matrix'],
  }),
  topic({
    id: 'contracts',
    slug: 'how-to-negotiate-contracts-for-freelance-and-client-work',
    track: 'communication',
    archetype: 'communication',
    skill: 'Negotiate contracts for freelance and client work',
    courseTitle: 'Negotiate Contracts for Freelance and Client Work',
    articleTitle: 'How to Negotiate Contracts for Freelance and Client Work in 2026: Scope, Change Orders, Payment, and Risk',
    summary: 'Negotiate contracts by controlling scope, revisions, payment timing, ownership, and change behavior before problems start.',
    whyNow: 'Independent work keeps rising, and more operators are learning the hard way that bad terms erase good work.',
    firstAction: 'Identify the five terms that matter most before you start debating price.',
    keywords: ['how to negotiate freelance contracts', 'client contract basics', 'scope and change orders'],
    institutions: ['Small Business Administration', 'state small business legal resources', 'public contract guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Moderate',
    outcome: 'Stronger client agreements with fewer surprise disputes',
    warning: 'This is educational, not legal advice. Important agreements still deserve jurisdiction-specific review.',
    related: ['how-to-start-a-handyman-business', 'how-to-become-a-virtual-assistant'],
    tools: ['scope template', 'payment terms checklist', 'change-order rule', 'risk log'],
  }),
  topic({
    id: 'spreadsheets',
    slug: 'how-to-use-spreadsheets-professionally',
    track: 'communication',
    archetype: 'communication',
    skill: 'Use spreadsheets professionally',
    courseTitle: 'How to Use Spreadsheets Professionally',
    articleTitle: 'How to Use Spreadsheets Professionally in 2026: Structure, Formulas, QA, and Better Models',
    summary: 'Use spreadsheets as systems for truth, not cluttered parking lots for half-finished ideas.',
    whyNow: 'Spreadsheets remain one of the most universal work tools, and weak spreadsheet habits quietly damage decisions everywhere.',
    firstAction: 'Audit one messy workbook and separate inputs, logic, outputs, and notes into a clearer structure.',
    keywords: ['how to use spreadsheets professionally', 'spreadsheet skills', 'excel and sheets basics'],
    institutions: ['OECD AI skill-demand report', 'public spreadsheet training resources', 'workforce skill guidance'],
    timeToFirstResult: '1-14 days',
    difficulty: 'Foundational',
    outcome: 'Cleaner models that are easier to trust and hand off',
    warning: 'A spreadsheet nobody else can audit is a risk, not an asset.',
    related: ['how-to-become-a-data-analyst', 'how-to-use-ai-for-data-analysis-at-work'],
    tools: ['model structure checklist', 'formula QA sheet', 'handoff notes', 'naming conventions'],
  }),
  topic({
    id: 'research-fast',
    slug: 'how-to-research-anything-fast',
    track: 'communication',
    archetype: 'communication',
    skill: 'Research anything fast',
    courseTitle: 'How to Research Anything Fast',
    articleTitle: 'How to Research Anything Fast in 2026: Scope, Source Ladder, Public Records, and Synthesis',
    summary: 'Research quickly by reducing the question to a claim, checking public records first, and writing notes that preserve what each source can actually prove.',
    whyNow: 'AI summaries, reposted screenshots, and search-result noise make disciplined source hierarchy more valuable than raw speed.',
    firstAction: 'Write the exact claim, evidence threshold, and first public-record system before opening a general search tab.',
    keywords: ['how to research anything fast', 'research workflow', 'find reliable information quickly', 'public records research', 'source ladder'],
    institutions: ['National Archives', 'Congress.gov', 'Data.gov'],
    timeToFirstResult: '1-7 days',
    difficulty: 'Foundational',
    outcome: 'A faster research workflow with source hierarchy, citation discipline, and visible confidence labels',
    warning: 'Speed without source hierarchy produces confident junk. A screenshot is not a source until the original record is found.',
    related: ['how-to-fact-check-information-and-avoid-scams', 'how-to-write-clearly-at-work', 'how-to-use-spreadsheets-professionally'],
    tools: ['claim brief', 'source ladder', 'record log', 'confidence label', 'synthesis outline'],
  }),
  topic({
    id: 'fact-check',
    slug: 'how-to-fact-check-information-and-avoid-scams',
    track: 'communication',
    archetype: 'communication',
    skill: 'Fact-check information and avoid scams',
    courseTitle: 'Fact-Check Information and Avoid Scams',
    articleTitle: 'How to Fact-Check Information and Avoid Scams in 2026: Verification, Pattern Recognition, and Safer Decisions',
    summary: 'Use source discipline, fraud pattern recognition, and record-first verification to reduce preventable information and money losses.',
    whyNow: 'Search demand rises with every AI-content wave, scam cycle, impersonation attempt, and crisis rumor because people know the information environment is noisier.',
    firstAction: 'Slow the urgent ask, identify the original source, and verify the record or institution before clicking, paying, forwarding, or accusing.',
    keywords: ['how to fact check information', 'avoid scams online', 'verify information quickly', 'source verification', 'AI misinformation'],
    institutions: ['Federal Trade Commission', 'Consumer Financial Protection Bureau', 'FOIA.gov'],
    timeToFirstResult: '1-3 days',
    difficulty: 'Foundational',
    outcome: 'A safer personal verification system for claims, documents, decisions, and money',
    warning: 'Scams and false claims often win by urgency, isolation, and emotion. Slow down the frame before you answer the ask.',
    related: ['how-to-research-anything-fast', 'how-to-improve-your-credit-score', 'how-to-write-clearly-at-work'],
    tools: ['verification checklist', 'scam red-flag list', 'record lookup', 'reverse-search habit', 'pause protocol'],
  }),
]

export const instituteTopicSeeds: InstituteTopicSeed[] = [
  ...aiAutomationTopics,
  ...tradeTopics,
  ...healthcareTopics,
  ...techTopics,
  ...businessTopics,
  ...moneyTopics,
  ...homeRepairTopics,
  ...foodSelfRelianceTopics,
  ...preparednessTopics,
  ...communicationTopics,
]

export const instituteTopics: InstituteTopic[] = instituteTopicSeeds.map((seed) => {
  const trackMeta = trackMap.get(seed.track)

  if (!trackMeta) {
    throw new Error(`[institute] Missing track metadata for ${seed.track}`)
  }

  return {
    ...seed,
    trackMeta,
  }
})

if (instituteTopics.length !== 100) {
  throw new Error(`[institute] Expected 100 topics, found ${instituteTopics.length}`)
}

export function getInstituteTopicBySlug(slug: string) {
  return instituteTopics.find((topic) => topic.slug === slug)
}

export function getInstituteTopicsByTrack(track: InstituteTrackId | 'all') {
  if (track === 'all') return instituteTopics
  return instituteTopics.filter((topic) => topic.track === track)
}

export function getInstituteRelatedTopics(topic: InstituteTopic) {
  return topic.related
    .map((slug) => getInstituteTopicBySlug(slug))
    .filter((value): value is InstituteTopic => Boolean(value))
}

export function getInstituteTrackCounts() {
  return instituteTracks.map((track) => ({
    ...track,
    count: instituteTopics.filter((topic) => topic.track === track.id).length,
  }))
}

export const institutePracticalTrackIds: InstituteTrackId[] = [
  'trades',
  'home-repair',
  'preparedness',
  'food-self-reliance',
  'healthcare',
  'communication',
]

const institutePracticalTrackSet = new Set<InstituteTrackId>(institutePracticalTrackIds)

export const institutePracticalTopics = instituteTopics.filter((topic) => institutePracticalTrackSet.has(topic.track))

export function getInstitutePracticalTrackCounts() {
  return instituteTracks
    .filter((track) => institutePracticalTrackSet.has(track.id))
    .map((track) => ({
      ...track,
      count: institutePracticalTopics.filter((topic) => topic.track === track.id).length,
    }))
}

export const instituteFieldManualEntries: InstituteFieldManualEntry[] = [
  {
    id: 'berry-safety',
    category: 'Foraging',
    title: 'Dangerous berries vs edible berries',
    summary: 'This is a positive-identification problem, not a color trick. If you cannot identify the whole plant with certainty, you do not eat the berry.',
    whenToUse: 'You are foraging, hiking with children, or trying to confirm whether a wild berry is safe to eat.',
    quickAnswer: 'Only eat a berry after a region-specific positive ID based on the whole plant, not one visual cue. Color alone is never enough.',
    doNow: [
      'Photograph the whole plant: leaves, stem, berry cluster, and growth habit.',
      'Use a local field guide or extension resource that matches your exact region and season.',
      'If anyone has already eaten the berry and symptoms begin, keep a sample and call Poison Control immediately.',
    ],
    avoid: [
      'Do not trust bird activity, folklore, or one-app image guesses as proof of safety.',
      'Do not taste-test an unknown berry “just to see.”',
      'Do not let children forage unsupervised around ornamental shrubs or woodland edges.',
    ],
    sourceAnchors: ['State extension office', 'Poison Control', 'Regional plant identification guide'],
  },
  {
    id: 'jump-start-limited-supplies',
    category: 'Vehicle Recovery',
    title: 'Jump-start a car with limited supplies',
    summary: 'The safe workaround is a rated jump pack, booster, or power station with proper vehicle-start leads. Random household wire is not a workaround. It is a fire risk.',
    whenToUse: 'Your battery is dead, you are away from a shop, and you have limited but legitimate starting equipment.',
    quickAnswer: 'Use jumper cables, a battery booster, or a power station built for vehicle starting. Do not improvise with extension cords, speaker wire, or bare household copper.',
    doNow: [
      'Confirm the vehicle uses a standard 12-volt system and that the battery case is not cracked or leaking.',
      'Connect positive to the dead battery first, then to the live source; connect negative to a clean engine or chassis ground.',
      'Start the helper source, start the dead vehicle, then remove the leads in reverse order.',
    ],
    avoid: [
      'Do not connect improvised household wire to battery posts.',
      'Do not smoke or lean over the battery while making connections.',
      'Do not keep cranking if the battery is swollen, hissing, or the cables are heating up.',
    ],
    sourceAnchors: ['NHTSA roadside guidance', 'Owner manual', 'Jump-pack or booster manual'],
    relatedTopicSlug: 'how-to-maintain-a-car-yourself',
  },
  {
    id: 'stop-severe-bleeding',
    category: 'Emergency Medical',
    title: 'Stop severe bleeding until help arrives',
    summary: 'Heavy bleeding is a minutes problem. Pressure, packing, and tourniquet decisions need to happen fast and cleanly.',
    whenToUse: 'A person is bleeding heavily, blood is pooling or spurting, or clothing is soaking through quickly.',
    quickAnswer: 'Call emergency services, apply firm direct pressure immediately, pack deep wounds if trained and equipped, and use a tourniquet for life-threatening limb bleeding when pressure is not enough.',
    doNow: [
      'Call 911 or direct someone specific to call while you start pressure.',
      'Use gloved hands or the cleanest cloth available and press hard without lifting every few seconds to check.',
      'If a limb wound will not stop, apply a tourniquet high and tight and note the time.',
    ],
    avoid: [
      'Do not remove a well-placed dressing just to look unless you must repack the wound.',
      'Do not use a makeshift neck tourniquet or wrap around the chest or abdomen.',
      'Do not treat this guide as a replacement for Stop the Bleed or certified first-aid training.',
    ],
    sourceAnchors: ['Stop the Bleed', 'American Red Cross', 'EMS dispatcher instructions'],
    relatedTopicSlug: 'how-to-stop-bleeding-and-handle-trauma-until-help-arrives',
  },
  {
    id: 'shut-off-water-main',
    category: 'Household Utilities',
    title: 'Shut off a leaking house water line fast',
    summary: 'Small leaks become structural damage fast. The first skill is knowing where the main shutoff is and how it turns before you need it under pressure.',
    whenToUse: 'A pipe bursts, a fixture line fails, a toilet supply starts spraying, or water is spreading across floors or walls.',
    quickAnswer: 'Shut off the nearest fixture valve first if it works. If it does not, shut off the house main immediately and open a low faucet to relieve pressure.',
    doNow: [
      'Find the fixture shutoff and try that first; if it fails, go straight to the main.',
      'Turn the valve fully in the correct direction and verify the water flow drops at a nearby faucet.',
      'Photograph the failure, mop or extract standing water, and begin drying immediately.',
    ],
    avoid: [
      'Do not waste time searching for tools after the floor is already flooding.',
      'Do not assume the main valve works if you have never tested it before.',
      'Do not reopen the line until the failed fitting, hose, or pipe has been replaced or isolated.',
    ],
    sourceAnchors: ['Local water utility', 'Homeowner utility map', 'Licensed plumber emergency checklist'],
    relatedTopicSlug: 'how-to-replace-a-faucet',
  },
  {
    id: 'purify-water',
    category: 'Water',
    title: 'Make emergency water safer to drink',
    summary: 'Filtration, boiling, and chemical treatment solve different problems. The first job is understanding which contamination risk you are dealing with.',
    whenToUse: 'Storm outages, broken municipal service, boil notices, travel, or any case where your normal drinking water is not trustworthy.',
    quickAnswer: 'Start with the cleanest source you have, pre-filter sediment, then use the right treatment method for the actual risk. No single tool handles every contamination scenario.',
    doNow: [
      'Use stored tap water first if you have it; otherwise collect the clearest source available.',
      'Filter visible sediment through clean cloth first so the treatment method can work better.',
      'Boil for biological risk, use approved treatment chemicals as directed, and know when chemical contamination requires a different source entirely.',
    ],
    avoid: [
      'Do not assume a simple camp filter removes fuel, industrial chemicals, or every dissolved contaminant.',
      'Do not treat cloudy water once and call it safe without pre-filtering.',
      'Do not store treated water in dirty containers.',
    ],
    sourceAnchors: ['CDC water guidance', 'EPA drinking water resources', 'Ready.gov'],
    relatedTopicSlug: 'how-to-purify-water-in-an-emergency',
  },
  {
    id: 'gas-leak-response',
    category: 'Household Utilities',
    title: 'Respond to a gas smell inside the house',
    summary: 'Natural gas and propane are evacuate-first problems. The right first move is distance and reporting, not indoor troubleshooting.',
    whenToUse: 'You smell gas, hear a hiss near a gas line, or suspect an appliance leak.',
    quickAnswer: 'Do not switch lights, do not use devices, and do not hunt for the leak indoors. Get everyone out, move away from the structure, and call the gas utility or 911 from outside.',
    doNow: [
      'Evacuate immediately and warn everyone else on the way out.',
      'Leave doors open only if you can do it without delaying evacuation.',
      'Call the utility emergency line or fire department once you are at a safe distance.',
    ],
    avoid: [
      'Do not turn switches on or off.',
      'Do not start a car in an attached garage or near the leak zone.',
      'Do not re-enter until the utility or fire department says it is safe.',
    ],
    sourceAnchors: ['Gas utility emergency line', 'Local fire department', 'Appliance safety manual'],
  },
  {
    id: 'food-safety-outage',
    category: 'Food Safety',
    title: 'Know what food survives a power outage',
    summary: 'The mistake people make is trusting cold food after the clock has already run too long. Temperature and time matter more than optimism.',
    whenToUse: 'A refrigerator or freezer has lost power, you are cleaning out coolers, or you are deciding what to keep after an outage.',
    quickAnswer: 'Keep refrigerator food only if it stayed below 40°F and freezer food only if it still has ice crystals or stayed solid. When in doubt, throw it out.',
    doNow: [
      'Keep doors closed as much as possible to preserve cold air.',
      'Use a food thermometer if you have one and write down which items crossed the safe temperature line.',
      'Prioritize shelf-stable food and preserved water until cold storage is trustworthy again.',
    ],
    avoid: [
      'Do not taste food to decide whether it is safe.',
      'Do not refreeze thawed food that has clearly warmed into the danger zone.',
      'Do not overpack a weak cooler without enough ice or cold packs.',
    ],
    sourceAnchors: ['USDA FSIS', 'FDA food safety guidance', 'Ready.gov'],
    relatedTopicSlug: 'how-to-build-long-term-food-storage',
  },
  {
    id: 'heat-cook-grid-down',
    category: 'Outage Readiness',
    title: 'Heat and cook safely when the power is out',
    summary: 'The dangerous shortcut is treating any flame source as an indoor solution. Fuel, ventilation, and carbon monoxide discipline come first.',
    whenToUse: 'Extended outage, winter storm, or any event where your normal heating and cooking systems are down.',
    quickAnswer: 'Use only the heating or cooking devices rated for the space you are using. Outdoor stoves stay outdoors, and every indoor combustion source requires ventilation and carbon monoxide awareness.',
    doNow: [
      'Check what you already own and sort it into indoor-safe, outdoor-only, and not-safe-for-this-use.',
      'Set a carbon monoxide alarm or fresh battery before you rely on any combustion heat source.',
      'Plan one simple meal method and one warm-room strategy instead of trying to heat the whole house at once.',
    ],
    avoid: [
      'Do not run grills, camp stoves, or generators inside a house, garage, or enclosed porch.',
      'Do not sleep with unsafe heating sources running.',
      'Do not improvise fuel storage next to flame or heater surfaces.',
    ],
    sourceAnchors: ['CDC carbon monoxide guidance', 'Ready.gov', 'Manufacturer safety manuals'],
    relatedTopicSlug: 'how-to-heat-and-cook-when-the-grid-is-down',
  },
  {
    id: 'roof-leak-tarp',
    category: 'Storm Damage',
    title: 'Control a roof leak before the repair crew arrives',
    summary: 'A temporary tarp and water control plan buy you time. The real win is limiting interior damage until weather and labor allow a proper repair.',
    whenToUse: 'Rain is entering through the roof, shingles are missing, or you need a temporary exterior control measure after storm damage.',
    quickAnswer: 'Map the interior leak first, protect belongings, then tarp from a safe ladder position only if weather and height conditions are controlled. If not, stay inside and limit damage.',
    doNow: [
      'Catch water, move furniture, and relieve any ceiling bulge safely if it is filling with water.',
      'Photograph the damage for insurance and repair documentation.',
      'Tarp only if you have dry enough conditions, the right ladder setup, and a second person spotting.',
    ],
    avoid: [
      'Do not climb onto a wet, steep, or storm-active roof.',
      'Do not assume the visible drip is directly below the exterior failure point.',
      'Do not skip drying the interior while waiting for the exterior repair.',
    ],
    sourceAnchors: ['Roofing manufacturer guidance', 'Local building department', 'Weather service advisory'],
    relatedTopicSlug: 'how-to-repair-a-roof-leak',
  },
  {
    id: 'outage-sanitation',
    category: 'Household Health',
    title: 'Keep sanitation under control during an outage',
    summary: 'Outages become health problems when water, toilet, and handwashing systems fail at the same time. Sanitation needs a plan before people get tired and start improvising badly.',
    whenToUse: 'Running water is down, sewer function is uncertain, or the household is sheltering in place for more than a few hours.',
    quickAnswer: 'Plan toilet use, handwashing, and waste containment together. If the water system is compromised, separate clean water, gray water, and waste immediately.',
    doNow: [
      'Assign one toilet or backup sanitation method and make the household use it consistently.',
      'Set up a handwashing station with clean water, soap, and towels or sanitizer.',
      'Bag, label, and isolate waste materials so they do not migrate through the living area.',
    ],
    avoid: [
      'Do not let contaminated cleanup cloths mix with drinking-water containers or food surfaces.',
      'Do not wait until the first overflow or backup to decide the plan.',
      'Do not assume bleach solves every sanitation problem without correct dilution and clean-water separation.',
    ],
    sourceAnchors: ['CDC sanitation guidance', 'Local health department', 'Ready.gov'],
    relatedTopicSlug: 'how-to-handle-sanitation-during-an-outage',
  },
  {
    id: 'low-power-comms',
    category: 'Communications',
    title: 'Keep a phone alive and communications organized in an outage',
    summary: 'The simplest communications plan is usually the best one: low-power settings, agreed check-in windows, and one backup charging layer.',
    whenToUse: 'Power is unstable, the cell network is congested, or you need to stretch battery life through an outage or evacuation.',
    quickAnswer: 'Put the phone in low-power mode early, reduce screen use, preserve battery for messages and navigation, and centralize charging around one reliable backup source.',
    doNow: [
      'Lower brightness, disable nonessential radios, and close power-hungry apps immediately.',
      'Text instead of calling when the network is overloaded.',
      'Set a household contact plan so everyone is not draining batteries with constant check-ins.',
    ],
    avoid: [
      'Do not burn battery on entertainment, video, or constant app refreshing.',
      'Do not wait until 5 percent battery to find a charging plan.',
      'Do not assume cell data will stay stable even if signal bars look normal.',
    ],
    sourceAnchors: ['Ready.gov communications guidance', 'FEMA family plan resources', 'Backup battery manual'],
    relatedTopicSlug: 'how-to-use-ham-radio-in-an-emergency',
  },
  {
    id: 'winter-car-stuck',
    category: 'Vehicle Readiness',
    title: 'Get through a winter roadside stop without making it worse',
    summary: 'In cold weather, the first goal is staying visible, warm, and conservatively powered until you can move or help arrives.',
    whenToUse: 'You are stranded, spun out, or forced to stop in freezing conditions.',
    quickAnswer: 'Stay with the vehicle unless remaining there is clearly more dangerous, preserve engine fuel carefully, keep the exhaust path clear, and use layers and signaling before panic-driven movement.',
    doNow: [
      'Clear snow from the tailpipe before running the engine for heat.',
      'Use hazard lights, reflective gear, or flares if conditions allow.',
      'Run the engine in short cycles, keep a window cracked, and preserve fuel for the long wait.',
    ],
    avoid: [
      'Do not walk away in whiteout or low-visibility conditions unless you know exactly where warm shelter is.',
      'Do not let the exhaust pipe stay buried under drifting snow.',
      'Do not spin tires endlessly and burn traction or battery without a plan.',
    ],
    sourceAnchors: ['NHTSA winter driving guidance', 'State DOT winter advisory', 'Owner manual'],
    relatedTopicSlug: 'how-to-build-a-72-hour-emergency-kit',
  },
  {
    id: 'public-record-claim-chain',
    category: 'Evidence Work',
    title: 'Turn a claim into a public-record chain',
    summary: 'A research claim becomes usable only when it can be reduced to records, dates, custodians, and confidence labels.',
    whenToUse: 'You are building a dossier, checking a viral claim, preparing a source note, or deciding whether a claim is publishable.',
    quickAnswer: 'Write the narrow claim, identify the best original record system, capture the citation, and label exactly what the record proves before writing analysis.',
    doNow: [
      'Reduce the claim to one sentence with actor, action, date, record type, and evidence threshold.',
      'Search the original record system first: National Archives, Congress.gov, Federal Register, FEC, SEC EDGAR, USAspending, FOIA.gov, or court dockets.',
      'Record the source title, custodian, date, URL, access date, and what the record can and cannot prove.',
    ],
    avoid: [
      'Do not cite a screenshot when the original record can be found.',
      'Do not upgrade a pattern into intent unless the record chain supports causation or agreement.',
      'Do not merge similarly named people, companies, committees, or agencies without independent corroboration.',
    ],
    sourceAnchors: ['National Archives', 'Congress.gov', 'Federal Register', 'FEC data', 'SEC EDGAR', 'USAspending'],
    relatedTopicSlug: 'how-to-research-anything-fast',
  },
  {
    id: 'urgent-claim-scam-check',
    category: 'Information Safety',
    title: 'Check an urgent claim before acting',
    summary: 'False claims and scams often rely on speed. The first protective move is to slow the decision and verify the source path.',
    whenToUse: 'A message, headline, caller, email, payment request, or social post creates urgency, fear, anger, or pressure to act fast.',
    quickAnswer: 'Pause the ask, identify the original source, verify the institution through an independent channel, and refuse to act until the claim survives a record or authority check.',
    doNow: [
      'Write down what you are being asked to believe or do before clicking, paying, forwarding, or accusing.',
      'Open a separate browser path to the official agency, company, court, filing, or consumer-alert source.',
      'Preserve the message, link, sender, time, and payment details if fraud or impersonation may be involved.',
    ],
    avoid: [
      'Do not use contact details supplied inside the urgent message as the verification path.',
      'Do not let anger or fear replace source checking.',
      'Do not forward accusations about a person or group before the original record is identified.',
    ],
    sourceAnchors: ['Federal Trade Commission', 'Consumer Financial Protection Bureau', 'FOIA.gov', 'State attorney general consumer alerts'],
    relatedTopicSlug: 'how-to-fact-check-information-and-avoid-scams',
  },
]

function buildCourseModules(topic: InstituteTopic): InstituteModule[] {
  const skill = topic.skill.toLowerCase()

  if (topic.id === 'research-fast') {
    return [
      {
        title: 'Frame the Claim',
        summary: 'Turn a vague research need into one testable claim with a defined evidence threshold.',
        deliverable: 'A one-sentence claim brief with actor, action, date range, record type, and confidence threshold.',
        lessons: ['Write a claim that can be disproved', 'Separate question from conclusion', 'Set the evidence threshold before searching'],
      },
      {
        title: 'Build the Source Ladder',
        summary: 'Rank official records, institutional explanations, reporting, expert analysis, and commentary before tabs multiply.',
        deliverable: 'A source ladder that names the first three record systems to check.',
        lessons: ['Know which source type can prove what', 'Start with custodians', 'Avoid treating summaries as originals'],
      },
      {
        title: 'Search Public Records',
        summary: 'Use federal, archival, court, campaign-finance, corporate, spending, and open-data systems deliberately.',
        deliverable: 'A record log with URLs, access dates, document titles, and custodian names.',
        lessons: ['Search official systems first', 'Capture identifiers and dates', 'Save archive fallbacks'],
      },
      {
        title: 'Cross-Check the Record',
        summary: 'Compare names, dates, amounts, amended filings, later rulings, and disconfirming records before synthesis.',
        deliverable: 'A contradiction log showing what strengthens, weakens, or limits the claim.',
        lessons: ['Check for amendments and updates', 'Compare entity names carefully', 'Look for disconfirming material'],
      },
      {
        title: 'Write With Confidence Labels',
        summary: 'Convert evidence into language that preserves the boundary between verified record and analysis.',
        deliverable: 'A source-backed answer with verified, circumstantial, disputed, and open-question labels.',
        lessons: ['Use the lowest defensible certainty', 'Quote and paraphrase carefully', 'Do not confuse pattern with proof'],
      },
      {
        title: 'Maintain the Research File',
        summary: 'Leave behind notes another reader can audit instead of making the next pass reconstruct your path.',
        deliverable: 'A reusable research file with claim, sources, evidence labels, contradictions, and next checks.',
        lessons: ['Store records by claim', 'Track access dates', 'Write the next verification step'],
      },
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      {
        title: 'Slow the Ask',
        summary: 'Interrupt urgency, emotion, and isolation before the claim or scam controls the decision.',
        deliverable: 'A pause protocol for messages, headlines, payment requests, and accusations.',
        lessons: ['Name the requested action', 'Identify pressure tactics', 'Create a waiting rule'],
      },
      {
        title: 'Find the Original Source',
        summary: 'Trace the claim back to a record, filing, agency page, company notice, court document, or named source.',
        deliverable: 'An origin check that separates original evidence from reposts, excerpts, and commentary.',
        lessons: ['Avoid circular sourcing', 'Use independent navigation', 'Reject screenshot-only proof'],
      },
      {
        title: 'Verify the Institution',
        summary: 'Confirm agencies, companies, courts, banks, and consumer warnings through official channels you open yourself.',
        deliverable: 'An institution verification log with safe contact paths and source links.',
        lessons: ['Do not trust embedded contact details', 'Check domains and identifiers', 'Use official portals'],
      },
      {
        title: 'Check the Fraud Pattern',
        summary: 'Map urgency, payment method, impersonation, secrecy, and information-harvesting signals before responding.',
        deliverable: 'A red-flag checklist tied to the specific message or claim.',
        lessons: ['Spot urgency and secrecy', 'Check payment rails', 'Preserve evidence when needed'],
      },
      {
        title: 'Make the Safer Decision',
        summary: 'Escalate, report, ignore, correct, or share only after the claim survives verification.',
        deliverable: 'A decision note that explains what you did and why.',
        lessons: ['Use the lowest-risk action', 'Report credible fraud paths', 'Correct without amplifying falsehood'],
      },
      {
        title: 'Build a Verification Habit',
        summary: 'Turn one check into a repeatable personal operating system for claims, documents, and money decisions.',
        deliverable: 'A reusable checklist for future urgent asks and contested claims.',
        lessons: ['Template the repeat checks', 'Teach the household or team', 'Review misses without ego'],
      },
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return [
        {
          title: 'Map the Role',
          summary: `Translate ${skill} from vague interest into a real labor market, actual employer types, and the first reachable rung.`,
          deliverable: 'A role map with local employers, pay bands, and entry options.',
          lessons: ['Understand the actual workday', 'Audit local employers and pay bands', 'Choose the right entry path'],
        },
        {
          title: 'Training and Safety',
          summary: 'Build the knowledge floor that keeps the first year from turning into avoidable setbacks or unsafe improvisation.',
          deliverable: 'A training plan with the required safety, credential, and supervision checkpoints.',
          lessons: ['Learn the non-negotiable fundamentals', 'Map credentials and supervision', 'Build a study and practice cadence'],
        },
        {
          title: 'Proof of Work',
          summary: 'Turn practice into visible evidence so readiness is legible to employers instead of trapped in your own notes.',
          deliverable: 'A proof-of-readiness packet with labs, logs, shadowing notes, or supervised work evidence.',
          lessons: ['Document practice or lab work', 'Build a portfolio or readiness log', 'Translate training into evidence'],
        },
        {
          title: 'Get Hired',
          summary: 'Aim for the employer that trains well, compounds skill, and creates leverage rather than the first listing that answers back.',
          deliverable: 'A targeted hiring kit with resume, employer short list, and interview stories.',
          lessons: ['Target the right employers', 'Write a role-specific resume', 'Prepare for interviews and skill screens'],
        },
        {
          title: 'First 90 Days',
          summary: 'Use the first quarter to become reliable, teachable, and harder to replace without pretending you already know everything.',
          deliverable: 'A first-90-day operating plan built around habits, feedback, and visible reliability.',
          lessons: ['Handle feedback without ego', 'Learn the workflow and pace', 'Build repeatable field habits'],
        },
        {
          title: 'Advance the Ladder',
          summary: 'Protect the upside by choosing the next credential or specialty based on market value, not insecurity.',
          deliverable: 'A 12-month advancement map tied to earnings power and specialization.',
          lessons: ['Choose the next credential wisely', 'Track specialized pathways', 'Protect your long-term earning power'],
        },
      ]
    case 'ai-income':
      return [
        {
          title: 'Choose the Market',
          summary: `Frame ${skill} around a problem buyers already spend money to solve instead of around model novelty.`,
          deliverable: 'A narrow market thesis with one buyer, one pain point, and one measurable promise.',
          lessons: ['Define one paying problem', 'Pick one buyer profile', 'Set a grounded promise'],
        },
        {
          title: 'Build the Workflow',
          summary: 'Create a small, testable system with visible human QA so the offer survives contact with real work.',
          deliverable: 'A documented workflow with tools, QA gates, and revision rules.',
          lessons: ['Choose tools deliberately', 'Create the QA layer', 'Document the process'],
        },
        {
          title: 'Package the Offer',
          summary: 'Turn the workflow into a service or product buyers can understand quickly, scope safely, and compare against alternatives.',
          deliverable: 'A one-page offer with pricing logic, exclusions, timeline, and review boundaries.',
          lessons: ['Price the outcome, not the novelty', 'Write a one-page proposal', 'Clarify exclusions and review'],
        },
        {
          title: 'Win the First Client',
          summary: 'Use visible pain, specific proof, and disciplined discovery instead of broad “AI expert” positioning.',
          deliverable: 'A first-client system with outreach, discovery questions, and a pilot structure.',
          lessons: ['Prospect where pain is visible', 'Use case studies and examples', 'Run a structured discovery call'],
        },
        {
          title: 'Deliver Reliably',
          summary: 'Delivery is where most AI offers collapse. This module keeps communication, QA, and before-after evidence visible.',
          deliverable: 'A client delivery cadence with status updates, revision policy, and SOP capture.',
          lessons: ['Set communication rules', 'Show before-and-after value', 'Capture reusable SOPs'],
        },
        {
          title: 'Scale Without Hype',
          summary: 'Keep trust intact by expanding only after the system produces repeatable proof and documented oversight.',
          deliverable: 'A retention and scale plan tied to proof, not trend-chasing.',
          lessons: ['Keep human oversight visible', 'Choose retention over churn', 'Expand only after proof'],
        },
      ]
    case 'service-business':
      return [
        {
          title: 'Validate Demand',
          summary: 'Choose the exact service lane that is easiest to explain, easiest to buy, and hardest for local demand to ignore.',
          deliverable: 'A demand map with target jobs, local competitors, and the easiest first buyer.',
          lessons: ['Choose the exact service lane', 'Map competitors and gaps', 'Find the easiest first buyer'],
        },
        {
          title: 'Set Up the Business',
          summary: 'Handle the basics early so quoting, taxes, insurance, and legal exposure do not ambush the first good month.',
          deliverable: 'A simple operating baseline covering registration, pricing floor, and downside protection.',
          lessons: ['Handle the business basics', 'Price for labor and risk', 'Protect the downside'],
        },
        {
          title: 'Build the Operating Kit',
          summary: 'Use only the tools and checklists that improve delivery quality. Avoid gear hoarding disguised as preparation.',
          deliverable: 'A core operating kit with tools, service checklist, and scope definition.',
          lessons: ['Buy only the core tools', 'Define the service checklist', 'Document timing and scope'],
        },
        {
          title: 'Acquire the First Customers',
          summary: 'Win the first work through proof, clarity, and referrals instead of vague promises or underpriced desperation.',
          deliverable: 'A customer acquisition loop with quote language, referral asks, and before-after proof.',
          lessons: ['Use local proof and referrals', 'Write clearer quotes', 'Turn one job into five'],
        },
        {
          title: 'Run the Work Well',
          summary: 'Margin and reputation come from route density, clean handoffs, and fewer callbacks, not from heroic effort.',
          deliverable: 'A delivery rhythm for scheduling, margin tracking, and callback reduction.',
          lessons: ['Improve scheduling and route density', 'Track margins honestly', 'Reduce callbacks and chaos'],
        },
        {
          title: 'Stabilize and Expand',
          summary: 'Add recurring work, better systems, and stronger positioning before adding more chaos under the word “growth.”',
          deliverable: 'A stability plan for repeat work, price increases, and systemized expansion.',
          lessons: ['Add retainers or repeat work', 'Systematize the handoff', 'Raise price with evidence'],
        },
      ]
    case 'money-system':
      return [
        {
          title: 'See the Real Situation',
          summary: 'Name the actual problem with numbers, timing, and fragility instead of with abstract stress or productivity guilt.',
          deliverable: 'A full snapshot of balances, due dates, cash flow, and the real point of failure.',
          lessons: ['Inventory the numbers', 'Name the fragility', 'Choose the actual goal'],
        },
        {
          title: 'Design the Rules',
          summary: 'Choose the smallest set of rules that actually fits the constraints instead of stacking conflicting systems.',
          deliverable: 'A working money system with one core rule set and automated protections.',
          lessons: ['Pick the core system', 'Automate the important parts', 'Reduce decision fatigue'],
        },
        {
          title: 'Handle Tradeoffs',
          summary: 'A durable system survives volatility because the tradeoffs are explicit before the pressure hits.',
          deliverable: 'A priority order for debt, savings, cash flow shocks, and competing goals.',
          lessons: ['Sequence priorities correctly', 'Plan for volatility', 'Avoid false shortcuts'],
        },
        {
          title: 'Measure Weekly',
          summary: 'Review the few indicators that reveal whether the system is holding instead of chasing motivation.',
          deliverable: 'A weekly review dashboard with leading indicators and review prompts.',
          lessons: ['Use a small dashboard', 'Track the leading indicators', 'Review behavior, not vibes'],
        },
        {
          title: 'Protect the System',
          summary: 'Buffers, scripts, and reminders matter because systems fail in ordinary weeks, not just emergencies.',
          deliverable: 'A protection layer with reminders, fallback rules, and setback planning.',
          lessons: ['Build buffers and reminders', 'Plan for setbacks', 'Use scripts when needed'],
        },
        {
          title: 'Turn Stability Into Leverage',
          summary: 'Once the floor is stable, the system should increase optionality, negotiation power, and future decision quality.',
          deliverable: 'A leverage plan tied to raises, debt reduction, investing, or career repositioning.',
          lessons: ['Add negotiating power', 'Improve optionality', 'Know the next move'],
        },
      ]
    case 'diy':
      return [
        {
          title: 'Diagnose Before Acting',
          summary: 'The repair starts by identifying the actual failure and the hazard points, not by attacking the loudest symptom.',
          deliverable: 'A diagnosis sheet with failure cause, hazard boundaries, and DIY limits.',
          lessons: ['Identify the actual failure', 'Map the hazard points', 'Define the limits of DIY'],
        },
        {
          title: 'Plan the Job',
          summary: 'Slow setup is part of the repair. Staging the workspace well reduces mistakes, waste, and panic.',
          deliverable: 'A full job plan with tools, materials, isolation steps, and work sequence.',
          lessons: ['Stage the materials', 'Prepare the workspace', 'Sequence the work'],
        },
        {
          title: 'Do the Repair',
          summary: 'Use a safe order of operations and verify each move so the fix addresses the cause rather than merely covering it.',
          deliverable: 'A completed repair sequence with root-cause notes and verification steps.',
          lessons: ['Use the safest order of operations', 'Check the underlying cause', 'Work slowly enough to verify'],
        },
        {
          title: 'Inspect and Test',
          summary: 'Inspection is not optional. A visible test checklist prevents false confidence and repeat failures.',
          deliverable: 'A test log showing function, inspection points, and remaining uncertainty.',
          lessons: ['Use a visible checklist', 'Test the function', 'Watch for failure signs'],
        },
        {
          title: 'Know When to Escalate',
          summary: 'Good DIY means knowing when the risk profile has changed and a licensed pro becomes the responsible move.',
          deliverable: 'An escalation boundary for code, structure, gas, electrical, or other high-risk conditions.',
          lessons: ['Spot code and safety issues', 'Document for a pro if needed', 'Protect the property and people'],
        },
        {
          title: 'Prevent Repeat Failure',
          summary: 'Every repair should leave the system better documented, better maintained, and harder to break again.',
          deliverable: 'A maintenance note and prevention plan tied to the repaired system.',
          lessons: ['Set a maintenance habit', 'Document the fix', 'Improve the system around it'],
        },
      ]
    case 'resilience':
      return [
        {
          title: 'Start With the Principle',
          summary: 'Preparedness works when the system is clear: define the scenario, the dependency, and the exact failure you are trying to survive.',
          deliverable: 'A scenario map showing risks, dependencies, and the smallest workable response.',
          lessons: ['Understand the system', 'Define the threat or need', 'Avoid gear-first thinking'],
        },
        {
          title: 'Build the Base Setup',
          summary: 'Start with the smallest version that actually works. Fancy kits are useless if the basics are not coherent.',
          deliverable: 'A baseline setup with water, power, food, communication, or continuity redundancy.',
          lessons: ['Use the smallest workable version', 'Map dependencies', 'Create redundancy'],
        },
        {
          title: 'Practice the Routine',
          summary: 'Rehearsal reveals failure faster than shopping. Practice turns a plan into a habit you can trust under stress.',
          deliverable: 'A drill routine with notes on timing, friction, and weak links.',
          lessons: ['Run low-risk drills', 'Document what breaks', 'Refine the timing'],
        },
        {
          title: 'Protect Health and Safety',
          summary: 'Preparedness becomes dangerous when contamination, injury, or medical limits are hand-waved. This module keeps guardrails explicit.',
          deliverable: 'A safety checklist tied to contamination, injury, and escalation thresholds.',
          lessons: ['Use official safety guidance', 'Respect contamination and injury risk', 'Set escalation thresholds'],
        },
        {
          title: 'Store, Rotate, and Maintain',
          summary: 'Systems fail quietly when no one rotates, tracks, or maintains the parts that matter.',
          deliverable: 'A storage and rotation system for supplies, tools, and expiration-sensitive items.',
          lessons: ['Track supplies and failures', 'Rotate what expires', 'Keep tools where they matter'],
        },
        {
          title: 'Scale the System',
          summary: 'Depth comes after the basics work. Scale should add resilience, not complexity that no one can maintain.',
          deliverable: 'A next-layer plan for expanding the system across more time, people, or scenarios.',
          lessons: ['Add depth only after basics work', 'Train the household', 'Build the next layer deliberately'],
        },
      ]
    case 'communication':
      return [
        {
          title: 'Clarify the Target',
          summary: 'Communication improves fastest when you define the exact use case, audience, and performance standard you are aiming for.',
          deliverable: 'A target map with audience, use case, and the standard the work needs to meet.',
          lessons: ['Define the actual use case', 'Know the audience', 'Set the performance standard'],
        },
        {
          title: 'Build a Repeatable Practice',
          summary: 'Short daily reps with visible feedback loops outperform occasional heroic effort and vague confidence rituals.',
          deliverable: 'A repeatable practice cadence with feedback notes and measurable reps.',
          lessons: ['Use short daily reps', 'Log errors and patterns', 'Keep the loop visible'],
        },
        {
          title: 'Produce Visible Work',
          summary: 'Skill compounds when the output is visible enough to be judged, improved, and reused under real conditions.',
          deliverable: 'A bank of visible work samples that prove clarity and usefulness.',
          lessons: ['Ship examples publicly or internally', 'Measure usefulness', 'Ask for better feedback'],
        },
        {
          title: 'Improve the System',
          summary: 'Tight structure and clear language remove wasted motion. Better communication is often better editing and better sequencing.',
          deliverable: 'A communication system with templates, edits, and repeatable structure.',
          lessons: ['Tighten structure and language', 'Remove clutter and ambiguity', 'Increase decision speed'],
        },
        {
          title: 'Handle Pressure Better',
          summary: 'Pressure exposes preparation quality. This module trains for meetings, conflict, and public performance without theatrics.',
          deliverable: 'A pressure-performance plan with prep routines and recovery habits.',
          lessons: ['Use preparation to calm nerves', 'Build recovery habits', 'Improve under real conditions'],
        },
        {
          title: 'Turn the Skill Into Leverage',
          summary: 'The point is not self-expression alone. The point is leverage: clearer decisions, better leadership, stronger opportunities.',
          deliverable: 'A leverage map showing where the improved skill increases authority, opportunity, or earnings.',
          lessons: ['Use it in leadership and career moves', 'Tie it to higher-value work', 'Teach it forward'],
        },
      ]
  }
}

function lowerFirst(value: string) {
  return value.charAt(0).toLowerCase() + value.slice(1)
}

function dedupeStrings(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))]
}

function buildIdealFor(topic: InstituteTopic) {
  if (topic.id === 'research-fast') {
    return [
      'Readers who need to answer real questions quickly without letting search results decide the conclusion.',
      'Writers, analysts, students, operators, and editors who need public-record discipline and reusable source notes.',
      'Anyone building dossiers, reports, or decisions where a weak source chain would damage trust.',
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      'People who receive urgent messages, payment requests, public claims, or AI-generated summaries and need a safer decision process.',
      'Families and teams that want a shared method for scams, impersonation, false claims, and contested documents.',
      'Readers who want to challenge claims without becoming reckless, defamatory, or easier to manipulate.',
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return [
        'People who want a practical career path with a clear first rung instead of a four-year reset.',
        'Learners willing to follow licensing, safety, and supervision rules rather than improvising their way into risk.',
        'Readers who want visible proof of readiness they can show to an employer quickly.',
      ]
    case 'ai-income':
      return [
        'Operators who already understand one workflow, niche, or business problem well enough to improve it.',
        'Freelancers, solo operators, and small teams who need a narrow offer instead of broad “AI expert” positioning.',
        'Readers willing to keep a human QA layer visible and sell responsibility, not magic.',
      ]
    case 'service-business':
      return [
        'People who want a low-overhead local business they can explain, quote, and deliver clearly.',
        'Operators who care about repeat work, route density, and referrals more than startup theater.',
        'Readers willing to price for labor, risk, and callbacks instead of undercutting to win chaos.',
      ]
    case 'money-system':
      return [
        'Households under cash-flow pressure that need rules and buffers, not another motivation cycle.',
        'Workers with irregular income, debt pressure, or unstable expenses who need a durable floor.',
        'Readers who want a system they can review weekly in minutes.',
      ]
    case 'diy':
      return [
        'Homeowners and renters trying to reduce maintenance drift and repair costs without becoming reckless.',
        'Readers willing to diagnose the real failure before buying parts or tearing into the system.',
        'People who respect code, safety, and the point where a licensed pro becomes the right move.',
      ]
    case 'resilience':
      return [
        'Households building continuity for outages, cost pressure, weather, or fragile local systems.',
        'Readers who want calm redundancy and repeatable drills instead of survival cosplay.',
        'People who understand that maintenance and rotation matter more than dramatic gear piles.',
      ]
    case 'communication':
      return [
        'Professionals who need clearer writing, explanation, teaching, negotiation, or speaking under pressure.',
        'Readers willing to practice in visible reps rather than waiting to feel naturally confident.',
        'People building a portable skill that compounds across leadership, sales, research, and management.',
      ]
  }
}

function buildPrerequisites(topic: InstituteTopic) {
  if (topic.id === 'research-fast') {
    return [
      'A real claim or question narrow enough to test.',
      'A place to keep a record log with URLs, access dates, document titles, and confidence labels.',
      'A willingness to abandon or downgrade a claim when the source chain does not support it.',
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      'One urgent claim, message, payment request, or public allegation to slow down and inspect.',
      'A clean path to official websites, account portals, court records, public filings, or consumer-alert pages.',
      'A rule that you do not click, pay, forward, accuse, or disclose private information until verification survives.',
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return [
        'Know which local employers or training lanes actually hire into this path.',
        'Block time for supervised practice or credential work each week.',
        'Budget for the minimum safety gear, tuition, or exam costs the role requires.',
      ]
    case 'ai-income':
      return [
        'Choose one workflow you understand well enough to judge output quality.',
        'Set up a QA checklist before offering the work to anyone else.',
        'Be ready to show one before-and-after sample instead of promising abstract transformation.',
      ]
    case 'service-business':
      return [
        'Define the exact service boundary before naming the business.',
        'Know your minimum viable tool kit and the jobs it can safely handle.',
        'Understand the local registration, insurance, and quoting basics before chasing volume.',
      ]
    case 'money-system':
      return [
        'Gather balances, due dates, account access, and recurring expenses in one place.',
        'Pick one weekly review time you can actually keep.',
        'Stop layering competing systems until one baseline rule set is working.',
      ]
    case 'diy':
      return [
        'Know the shutoff, isolation, or safety boundary for the system you are touching.',
        'Confirm the exact tool and material list before starting the job.',
        'Decide in advance which conditions force an escalation to a licensed professional.',
      ]
    case 'resilience':
      return [
        'Define the actual scenario you are preparing for before buying anything.',
        'Use official safety guidance for water, food, medicine, sanitation, or power issues.',
        'Start with a small system you can maintain without constant friction.',
      ]
    case 'communication':
      return [
        'Pick one real audience or use case where the skill matters next.',
        'Set a short practice block you can repeat without negotiation.',
        'Choose a feedback source that will give concrete notes, not just encouragement.',
      ]
  }
}

function buildOutcomes(topic: InstituteTopic) {
  const common = [
    topic.outcome,
    `A clearer operating sequence for ${lowerFirst(topic.skill)} instead of a pile of disconnected advice.`,
  ]

  switch (topic.archetype) {
    case 'career':
      return [...common, 'Visible proof of readiness you can use with employers, apprenticeships, or credential programs.']
    case 'ai-income':
      return [...common, 'A narrow offer with a QA layer, a pricing logic, and a pilot-ready proof package.']
    case 'service-business':
      return [...common, 'A service operating kit that improves quoting, delivery quality, and repeat work.']
    case 'money-system':
      return [...common, 'A weekly review loop that protects the system when life gets noisy.']
    case 'diy':
      return [...common, 'A diagnosis, repair, and inspection routine that reduces repeat failure.']
    case 'resilience':
      return [...common, 'A rehearsed baseline system that still works when attention and infrastructure are thin.']
    case 'communication':
      return [...common, 'Visible work samples and a repeatable practice system that compound into leverage.']
  }
}

function buildDemandSignals(topic: InstituteTopic): InstituteHighlight[] {
  return [
    {
      title: 'Why this demand is durable',
      detail: topic.whyNow,
    },
    {
      title: 'Institutional signal',
      detail: topic.trackMeta.demandSignal,
    },
    {
      title: 'Time to first useful proof',
      detail: `The first credible signal usually arrives in ${topic.timeToFirstResult} when the path is narrowed and executed with visible proof instead of passive consumption.`,
    },
  ]
}

function buildProofFramework(topic: InstituteTopic): InstituteHighlight[] {
  if (topic.id === 'research-fast') {
    return [
      { title: 'Proof of source discipline', detail: 'A useful research answer includes the claim sentence, original source links, access dates, document titles, and the confidence label attached to each major fact.' },
      { title: 'Verified floor', detail: 'Start with National Archives, Congress.gov, Data.gov, FOIA.gov, FEC data, SEC EDGAR, Federal Register, USAspending, and court records before relying on commentary.' },
      { title: 'Leverage signal', detail: 'Progress means another reader can audit the path from question to source to conclusion without reconstructing your search history.' },
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      { title: 'Proof of verification', detail: 'A checked claim has an original source, an independent institution path, and a note explaining what the source can and cannot prove.' },
      { title: 'Verified floor', detail: 'Use FTC, CFPB, FOIA.gov, official agency pages, court records, company portals, and public filings instead of contact details supplied by the urgent message.' },
      { title: 'Leverage signal', detail: 'Progress means fewer rushed decisions, fewer forwarded false claims, and clearer escalation when fraud or public-risk claims appear credible.' },
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return [
        { title: 'Proof of readiness', detail: 'Show labs, supervised practice, certifications in progress, or shadowing evidence an employer can scan quickly.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} to verify entry requirements, safety rules, and role expectations.` },
        { title: 'Leverage signal', detail: 'Progress means getting closer to paid supervised work, not collecting disconnected credentials.' },
      ]
    case 'ai-income':
      return [
        { title: 'Proof of value', detail: 'A before-and-after sample, revision log, or pilot outcome matters more than polished AI jargon.' },
        { title: 'Verified floor', detail: `Ground the workflow against ${topic.institutions.slice(0, 2).join(' and ')} plus the buyer’s own operating constraints.` },
        { title: 'Leverage signal', detail: 'Progress means a client-safe workflow with visible QA, not more tool subscriptions.' },
      ]
    case 'service-business':
      return [
        { title: 'Proof of reliability', detail: 'Quotes, photos, checklists, and referrals that demonstrate the work can be delivered cleanly.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} to confirm registration, tax, insurance, or code realities.` },
        { title: 'Leverage signal', detail: 'Progress means better margins and repeat work, not simply busier days.' },
      ]
    case 'money-system':
      return [
        { title: 'Proof of progress', detail: 'A stable weekly dashboard, fewer emergencies, and consistent rule-following are the real milestones.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} to confirm the rules, fees, and official constraints that matter.` },
        { title: 'Leverage signal', detail: 'Progress means more optionality and less fragility, not aesthetic spreadsheet perfection.' },
      ]
    case 'diy':
      return [
        { title: 'Proof of repair', detail: 'Diagnosis notes, the correct material list, and a visible test procedure prove the repair is real.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} to confirm safety and code boundaries before acting.` },
        { title: 'Leverage signal', detail: 'Progress means fewer repeat failures and clearer escalation decisions.' },
      ]
    case 'resilience':
      return [
        { title: 'Proof of readiness', detail: 'A written plan, a functioning baseline kit, and drill notes prove the system is usable.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} to confirm health, storage, and emergency guidance.` },
        { title: 'Leverage signal', detail: 'Progress means the system works under stress without adding drama or maintenance debt.' },
      ]
    case 'communication':
      return [
        { title: 'Proof of skill', detail: 'Visible writing, speaking, teaching, or negotiation artifacts matter more than self-description.' },
        { title: 'Verified floor', detail: `Use ${topic.institutions.slice(0, 2).join(' and ')} as the anchor for what the audience or employer actually values.` },
        { title: 'Leverage signal', detail: 'Progress means clearer decisions, better feedback, and stronger opportunities attached to the skill.' },
      ]
  }
}

function buildOfficialCheckpoints(topic: InstituteTopic): InstituteHighlight[] {
  return [
    {
      title: 'Source floor',
      detail: `Before spending money, taking risk, or making promises, verify the baseline rules against ${topic.institutions.slice(0, 3).join(', ')}.`,
    },
    {
      title: 'Risk boundary',
      detail: topic.warning,
    },
    {
      title: 'Working definition of progress',
      detail: `Treat ${lowerFirst(topic.outcome)} as the signal that the system is working. Interest without proof does not count.`,
    },
  ]
}

function buildRelatedQueries(topic: InstituteTopic) {
  const relatedTitles = topic.related
    .map((slug) => getInstituteTopicBySlug(slug))
    .filter((value): value is InstituteTopic => Boolean(value))
    .map((relatedTopic) => relatedTopic.articleTitle)

  return dedupeStrings([...topic.keywords, ...relatedTitles]).slice(0, 6)
}

function buildSprint(topic: InstituteTopic, modules: InstituteModule[], actionPlan: InstituteStep[]): InstituteSprintWeek[] {
  return actionPlan.slice(0, 4).map((step, index) => {
    const module = modules[index]

    return {
      title: `Week ${index + 1}`,
      objective: step.title,
      tasks: dedupeStrings([
        index === 0 ? topic.firstAction : module?.deliverable ?? '',
        ...(module?.lessons.slice(0, 2) ?? []),
      ]).slice(0, 3),
    }
  })
}

function buildLlmSummary(topic: InstituteTopic) {
  if (topic.id === 'research-fast') {
    return 'Research anything fast by defining the claim first, choosing the correct public-record system, capturing audit-ready citations, checking contradictions, and writing the result with confidence labels instead of unsupported certainty.'
  }

  if (topic.id === 'fact-check') {
    return 'Fact-check information and avoid scams by slowing urgent asks, finding the original source, verifying institutions through independent channels, checking fraud patterns, and documenting the safest decision before acting.'
  }

  const framing = {
    career: 'a supervised skill path with visible proof of readiness',
    'ai-income': 'a narrow workflow offer with a human QA layer',
    'service-business': 'a local operating system built around clear scope and repeat work',
    'money-system': 'a rule-based stability system that reduces fragility',
    diy: 'a diagnosis-first repair workflow with clear safety boundaries',
    resilience: 'a calm redundancy system built for rehearsal and maintenance',
    communication: 'a repeatable practice system that turns clarity into leverage',
  }[topic.archetype]

  return `${topic.skill} works best when the first move is explicit: ${topic.firstAction} Treat it as ${framing}, verify the floor against ${topic.institutions[0] ?? 'official guidance'}, and aim for ${lowerFirst(topic.outcome)} within ${topic.timeToFirstResult}.`
}

function buildActionPlan(topic: InstituteTopic): InstituteStep[] {
  if (topic.id === 'research-fast') {
    return [
      { title: 'Write the claim brief', detail: 'State the exact claim, the record type that would prove it, and the confidence threshold before searching.' },
      { title: 'Choose the record system', detail: 'Pick the best first source: archive, legislature, regulator, court, campaign-finance database, corporate filing system, spending portal, or open-data catalog.' },
      { title: 'Capture audit-ready citations', detail: 'Save title, custodian, date, identifier, URL, access date, and archive fallback for every source you plan to rely on.' },
      { title: 'Log contradictions and limits', detail: 'Record amended filings, later rulings, missing documents, alternative explanations, and facts the source cannot prove.' },
      { title: 'Synthesize with labels', detail: 'Write the answer using verified, circumstantial, disputed, and open-question labels so confidence remains visible.' },
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      { title: 'Pause the urgent frame', detail: 'Name the action being demanded and slow the decision before emotion, scarcity, or fear sets the terms.' },
      { title: 'Find the original source', detail: 'Trace the claim to an original record, agency, company, court, filing, named source, or consumer warning.' },
      { title: 'Verify through a clean path', detail: 'Open the official site, known phone number, account portal, or public database yourself instead of using embedded links or contact details.' },
      { title: 'Check fraud and false-claim signals', detail: 'Look for impersonation, payment pressure, secrecy, mismatched domains, screenshot-only proof, and claims that skip the original record.' },
      { title: 'Decide and document', detail: 'Ignore, report, correct, preserve, or share only after the verification path supports the decision.' },
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return [
        { title: 'Choose the correct entry lane', detail: `Compare local training, apprenticeship, and employer-entry options for ${topic.skill.toLowerCase()}.` },
        { title: 'Learn the safety and baseline theory', detail: 'Get the foundational knowledge that keeps you from looking reckless on day one.' },
        { title: 'Build proof, not just notes', detail: 'Document practice, labs, shadowing, or supervised work in a way employers can understand quickly.' },
        { title: 'Target the first role strategically', detail: 'Aim for the employer type that will train you well, not just the first posting you see.' },
        { title: 'Use the first year to compound', detail: `Turn the first ${topic.skill.toLowerCase()} job into a stronger credential and income ladder.` },
      ]
    case 'ai-income':
      return [
        { title: 'Pick one expensive problem', detail: `Scope ${topic.skill.toLowerCase()} around a business problem people already pay to solve.` },
        { title: 'Build a tested workflow', detail: 'Use a small tool stack with a visible human QA layer and documented output standards.' },
        { title: 'Package the outcome clearly', detail: 'Write an offer that explains the result, timeline, inputs, exclusions, and review process.' },
        { title: 'Get proof before scale', detail: 'Use one pilot, one client, or one before-and-after case to validate the workflow.' },
        { title: 'Keep ethics and quality visible', detail: 'Disclose the review layer, avoid fabricated proof, and expand only after the system holds up.' },
      ]
    case 'service-business':
      return [
        { title: 'Narrow the service', detail: 'Choose the exact service category, buyer, and job type you want to win first.' },
        { title: 'Calculate the real price', detail: 'Include travel, materials, setup, callbacks, taxes, and your actual time.' },
        { title: 'Document the job sequence', detail: 'Turn the service into a checklist so quality does not depend on memory.' },
        { title: 'Win local proof', detail: 'Use before-and-after evidence, testimonials, referrals, and route density to lower acquisition cost.' },
        { title: 'Stabilize before expanding', detail: 'Add recurring work, better margins, and stronger systems before adding more service lines.' },
      ]
    case 'money-system':
      return [
        { title: 'See the numbers honestly', detail: 'Put the real balances, cash flow, due dates, and risks in one place.' },
        { title: 'Choose the core rule', detail: 'Pick one system that matches your actual constraints instead of collecting tips.' },
        { title: 'Automate the important part', detail: 'Use transfers, reminders, scripts, or default settings to protect the plan.' },
        { title: 'Review weekly, not emotionally', detail: 'Track the few indicators that reveal whether the system is actually holding.' },
        { title: 'Increase leverage over time', detail: 'Use stability to negotiate, invest, or reposition instead of reliving the same emergency.' },
      ]
    case 'diy':
      return [
        { title: 'Diagnose the actual problem', detail: 'Identify the root cause instead of attacking the most visible symptom.' },
        { title: 'Stage the workspace and tools', detail: 'A slow organized setup is safer than a rushed repair with missing materials.' },
        { title: 'Work in the safest sequence', detail: 'Move from isolation and prep into repair only after hazard points are controlled.' },
        { title: 'Test and inspect the fix', detail: 'Verify function, monitor for recurrence, and document anything still uncertain.' },
        { title: 'Escalate when the risk changes', detail: 'Call a licensed pro when the problem crosses code, structural, gas, or serious safety boundaries.' },
      ]
    case 'resilience':
      return [
        { title: 'Define the actual scenario', detail: 'Know whether you are preparing for cost pressure, short outages, weather, or longer disruptions.' },
        { title: 'Build the smallest working version', detail: 'Start with a functional baseline before adding depth or gear.' },
        { title: 'Rehearse the system', detail: 'Run drills or low-risk repetitions to see what fails under real use.' },
        { title: 'Fix the weak links', detail: 'Use notes, expiration tracking, and official guidance to improve the setup.' },
        { title: 'Scale with discipline', detail: 'Add capacity only after the basics are easy to use and maintain.' },
      ]
    case 'communication':
      return [
        { title: 'Aim the skill at one real use case', detail: 'Pick the meeting, role, project, or audience where this skill matters next.' },
        { title: 'Practice visibly and often', detail: 'Short, repeated reps beat occasional heroic effort.' },
        { title: 'Use feedback that changes the work', detail: 'Ask for examples, edits, and concrete notes instead of generic praise.' },
        { title: 'Build a reusable operating system', detail: 'Turn what works into templates, checklists, and habits.' },
        { title: 'Use the skill to earn leverage', detail: 'Apply the improved skill to better jobs, leadership, or clearer decision-making.' },
      ]
  }
}

function buildCommonMistakes(topic: InstituteTopic) {
  if (topic.id === 'research-fast') {
    return [
      'Opening too many tabs before defining the claim',
      'Using summaries when the original record is available',
      'Failing to capture access dates and document identifiers',
      'Treating a pattern as proof of motive',
      'Ignoring amended filings, later rulings, or disconfirming records',
    ]
  }

  if (topic.id === 'fact-check') {
    return [
      'Acting inside the urgent frame set by the message',
      'Using contact details supplied by the suspicious source',
      'Forwarding before finding the original record',
      'Treating a screenshot as proof',
      'Confusing a public allegation with a finding',
    ]
  }

  switch (topic.archetype) {
    case 'career':
      return ['Choosing the wrong entry path for the local market', 'Ignoring safety or licensing realities', 'Collecting credentials without proof of work', 'Applying too broadly instead of targeting the right employer', 'Mistaking enthusiasm for readiness']
    case 'ai-income':
      return ['Selling the tool instead of the outcome', 'Skipping the QA layer', 'Pretending automation is autonomous', 'Using vague niche positioning', 'Scaling before proof']
    case 'service-business':
      return ['Underpricing because the math is incomplete', 'Buying too much equipment too early', 'Taking every job instead of defining scope', 'Weak scheduling and route planning', 'No system for repeat work']
    case 'money-system':
      return ['Working from averages instead of the floor', 'Tracking too many numbers', 'Confusing motivation with systems', 'Ignoring fees, taxes, or timing', 'Resetting the whole plan after one bad week']
    case 'diy':
      return ['Skipping diagnosis', 'Rushing setup', 'Using the wrong materials', 'Ignoring code or safety boundaries', 'Failing to test the fix']
    case 'resilience':
      return ['Buying gear before understanding the system', 'Building for fantasy scenarios only', 'Not rehearsing', 'Ignoring expiration, maintenance, or rotation', 'Assuming one tool solves every problem']
    case 'communication':
      return ['Practicing only in private forever', 'Using vague language', 'Chasing confidence instead of preparation', 'Avoiding feedback that stings', 'Never building repeatable templates']
  }
}

function buildFaq(topic: InstituteTopic): InstituteFaq[] {
  return [
    {
      question: `What is the fastest realistic way to start ${topic.skill.toLowerCase()}?`,
      answer: `${topic.firstAction} The institute treats fast starts as structured starts: the first win is clarity and setup, not pretending the hard part disappeared.`,
    },
    {
      question: `What actually proves progress in ${topic.skill.toLowerCase()}?`,
      answer: `${lowerFirst(topic.outcome)} is the real milestone. The institute wants visible proof: a sample, a checklist, a log, a supervised result, or another artifact that shows the system works outside your head.`,
    },
    {
      question: `How does Veritas Institute handle evidence for ${topic.skill.toLowerCase()}?`,
      answer: `Official rules, public guidance, and credentialing pathways are treated as verified foundations. Market outcomes, earnings, and time-to-income claims are framed more cautiously unless the proof is strong and attributable.`,
    },
    {
      question: `What should I avoid while learning ${topic.skill.toLowerCase()}?`,
      answer: topic.warning,
    },
  ]
}

export function buildInstituteCourse(topic: InstituteTopic): InstituteCourseBundle {
  const modules = buildCourseModules(topic)
  const actionPlan = buildActionPlan(topic)

  return {
    title: topic.courseTitle,
    llmSummary: buildLlmSummary(topic),
    searchIntent: `People search for ${lowerFirst(topic.skill)} because they want a direct route to ${lowerFirst(topic.outcome)} without losing months to hype, vague advice, or bad sequencing.`,
    idealFor: buildIdealFor(topic),
    prerequisites: buildPrerequisites(topic),
    outcomes: buildOutcomes(topic),
    demandSignals: buildDemandSignals(topic),
    proofFramework: buildProofFramework(topic),
    officialCheckpoints: buildOfficialCheckpoints(topic),
    modules,
    actionPlan,
    sprint: buildSprint(topic, modules, actionPlan),
    commonMistakes: buildCommonMistakes(topic),
    faq: buildFaq(topic),
    relatedQueries: buildRelatedQueries(topic),
  }
}

export function buildInstituteGuide(topic: InstituteTopic): InstituteGuideBundle {
  const llmSummary = buildLlmSummary(topic)

  return {
    title: topic.articleTitle,
    llmSummary,
    quickAnswer: `To ${lowerFirst(topic.skill)}, make the first move explicit: ${topic.firstAction} This works best when you treat the path as a system with proof, safety, and documented next steps rather than a viral shortcut.`,
    searchIntent: `Most readers land here because they need the shortest reliable route into ${lowerFirst(topic.outcome)}. The guide answers the immediate question, then shows the safer next move.`,
    idealFor: buildIdealFor(topic),
    prerequisites: buildPrerequisites(topic),
    officialCheckpoints: buildOfficialCheckpoints(topic),
    steps: buildActionPlan(topic),
    commonMistakes: buildCommonMistakes(topic),
    faq: buildFaq(topic),
    relatedQueries: buildRelatedQueries(topic),
  }
}

export function buildInstituteBookSection(topic: InstituteTopic): InstituteBookSection {
  const guide = buildInstituteGuide(topic)
  const course = buildInstituteCourse(topic)

  return {
    title: topic.skill,
    summary: topic.summary,
    quickAnswer: guide.quickAnswer,
    steps: guide.steps,
    warning: topic.warning,
    institutions: topic.institutions,
    proofFramework: course.proofFramework,
  }
}

export const instituteResearchSources = [
  {
    label: 'U.S. Bureau of Labor Statistics',
    url: 'https://www.bls.gov/ooh/',
    note: 'Used to anchor practical trade, maintenance, logistics, and healthcare-support career paths in public labor data.',
  },
  {
    label: 'Ready.gov preparedness guidance',
    url: 'https://www.ready.gov/',
    note: 'Used to structure household readiness, kits, outage planning, and emergency communications.',
  },
  {
    label: 'CDC emergency preparedness guidance',
    url: 'https://www.cdc.gov/disasters/',
    note: 'Used for water, hygiene, carbon monoxide, and first-response safety guardrails.',
  },
  {
    label: 'USDA and extension guidance',
    url: 'https://nifa.usda.gov/',
    note: 'Used for food safety, preservation, gardening, and basic foraging discipline.',
  },
  {
    label: 'NHTSA vehicle safety guidance',
    url: 'https://www.nhtsa.gov/road-safety',
    note: 'Used for roadside safety, winter travel, battery recovery, and car-maintenance guardrails.',
  },
  {
    label: 'Energy.gov home energy guidance',
    url: 'https://www.energy.gov/energysaver/energy-saver',
    note: 'Used for weatherization, backup-power planning, and household resilience systems.',
  },
  {
    label: 'National Archives research tools',
    url: 'https://www.archives.gov/research',
    note: 'Used for archival research discipline, record-group discovery, declassified-material paths, and historical source retrieval.',
  },
  {
    label: 'Congress.gov API',
    url: 'https://api.congress.gov/',
    note: 'Used for legislative records, bill metadata, congressional actions, sponsors, committees, and official source paths.',
  },
  {
    label: 'Federal Register API documentation',
    url: 'https://www.federalregister.gov/developers/documentation/api/v1',
    note: 'Used for agency-rule discovery while preserving the requirement to verify legal precision against official editions.',
  },
  {
    label: 'FOIA.gov',
    url: 'https://www.foia.gov/',
    note: 'Used for request preparation, agency identification, and the rule that public research should come before broad FOIA filing.',
  },
  {
    label: 'FEC campaign finance data',
    url: 'https://www.fec.gov/data/',
    note: 'Used for federal campaign-finance lookup, committee records, receipts, spending, and filing discipline.',
  },
  {
    label: 'SEC EDGAR search filings',
    url: 'https://www.sec.gov/search-filings',
    note: 'Used for company filings, securities disclosures, issuer search, and entity-name verification.',
  },
  {
    label: 'USAspending API documentation',
    url: 'https://api.usaspending.gov/docs/',
    note: 'Used for federal award, recipient, agency, and spending-data workflows.',
  },
  {
    label: 'Data.gov',
    url: 'https://data.gov/',
    note: 'Used as a broad federal open-data catalog for research questions that do not begin in a single agency system.',
  },
  {
    label: 'CourtListener RECAP documentation',
    url: 'https://www.courtlistener.com/help/coverage/recap/',
    note: 'Used for court-record research context, RECAP coverage limits, and public PACER-document discovery paths.',
  },
]
