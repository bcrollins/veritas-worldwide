import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags } from '../lib/seo'

/* ─────────────────────────────────────────────
   THE BERNIE ROLLINS SHOW
   "Freedom Lies in Being Bold"
   ───────────────────────────────────────────── */

interface Episode {
  number: number
  title: string
  format: 'solo' | 'guest' | 'call-in'
  duration: string
  hook: string
  segments: { name: string; minutes: string; bullets: string[] }[]
}

interface Suggestion {
  id: number
  title: string
  bullets: [string, string, string]
}

const EPISODES: Episode[] = [
  {
    number: 1,
    title: 'Pilot — "Nobody Asked Me, But Here I Am"',
    format: 'solo',
    duration: '55–65 min',
    hook: 'Bernie introduces himself to the world — steel company owner turned truth-seeker, Jersey kid who built something real, father who taught his sons to think for themselves. This is the origin story episode: why now, why him, and why this show needs to exist.',
    segments: [
      {
        name: 'Cold Open — "Let Me Tell You Something"',
        minutes: '5 min',
        bullets: [
          'Open with the phrase that defines the show: "Freedom lies in being bold." Explain what it means to you — not a bumper sticker, but a way of living.',
          'Tell the audience exactly who you are: a retired steel guy from Jersey who moved south, raised kids, built a company, and never once kept his mouth shut when it mattered.',
          'Set the ground rules: this show has no sponsors to protect, no party to serve, no filter. You say what you think and back it up. If people disagree, good — that means they\'re thinking.',
        ],
      },
      {
        name: 'Segment 1 — "How I Got Here"',
        minutes: '15 min',
        bullets: [
          'The Jersey years: growing up in a working-class environment where you learned early that nobody gives you anything. Hard work, strong opinions, and the understanding that the system doesn\'t care about you unless you make it.',
          'Building the steel company in North Carolina: what running a real business teaches you about America that no political commentator sitting in a studio will ever understand. Payroll, regulations, the government showing up at your door.',
          'The Ron Paul moment (2008): how you saw through the two-party illusion before it was popular. What it felt like to support someone the media actively tried to erase, and how that confirmed everything you suspected about how this country actually works.',
        ],
      },
      {
        name: 'Segment 2 — "What I Taught My Kids"',
        minutes: '15 min',
        bullets: [
          'The philosophy: think for yourself, question everything, never assume you\'re not the one being fed propaganda. Explain why this isn\'t cynicism — it\'s responsibility.',
          'Raising sons who actually give a damn: how you balance being a father who protects his kids with being a father who prepares them for a world that isn\'t fair.',
          'The duty conversation: why you believe being an American citizen comes with obligations that most people ignore. Voting isn\'t enough. Understanding is the job.',
        ],
      },
      {
        name: 'Segment 3 — "Why This Show"',
        minutes: '15 min',
        bullets: [
          'The media landscape is broken. Left, right — it doesn\'t matter. Everyone is selling something. This show sells nothing except the idea that regular people with real experience have something worth saying.',
          'What retirement taught you: when you stop running a business and start watching, you see the patterns. The consolidation of power, the erosion of civic duty, the slow surrender of critical thinking.',
          'The ask: subscribe, share, tell someone. Not because you need the numbers, but because the conversation needs to get louder. The quiet majority needs a microphone.',
        ],
      },
      {
        name: 'Close — "Bold Thought of the Week"',
        minutes: '5 min',
        bullets: [
          'Recurring segment: one actionable thing listeners can do this week to be better citizens. Episode 1: read the actual text of one bill being debated in Congress right now. Not the headline — the bill.',
          'Sign off with the show\'s ethos: "Don\'t let anyone do your thinking for you. I\'ll see you next week."',
          'Tease Episode 2: "Next week, we\'re talking about the thing nobody wants to talk about — where your tax dollars actually go. Bring a drink."',
        ],
      },
    ],
  },
  {
    number: 2,
    title: '"Where Does the Money Go?" — Following Your Tax Dollars',
    format: 'solo',
    duration: '60–70 min',
    hook: 'Bernie breaks down federal spending like a business owner reading a balance sheet — because that\'s exactly what it is. No partisan spin, just the numbers, the waste, and the question nobody in Washington wants to answer: would any private business survive running books like this?',
    segments: [
      {
        name: 'Cold Open — "The Receipt"',
        minutes: '5 min',
        bullets: [
          'Read an actual breakdown of where $1 of federal tax goes. React in real time. "Sixty-five cents to the military and debt interest before we even get to roads?"',
          'Compare it to running a steel company: "If I spent money like this, I\'d be in prison. They do it and call it policy."',
          'Frame the episode: this isn\'t left vs. right. This is math. And the math doesn\'t lie.',
        ],
      },
      {
        name: 'Segment 1 — "The Big Buckets"',
        minutes: '20 min',
        bullets: [
          'Defense spending: what we\'re actually buying, where it goes, and the revolving door between Pentagon officials and defense contractors. Name names.',
          'Entitlements vs. discretionary: why politicians love to fight about 15% of the budget while ignoring the 85% that\'s on autopilot. Social Security isn\'t broke — it was raided.',
          'Foreign aid: the real numbers (less than 1% of the budget) vs. what people think. Why this is the ultimate distraction from the real fiscal problems.',
        ],
      },
      {
        name: 'Segment 2 — "The Steel Test"',
        minutes: '15 min',
        bullets: [
          'Apply basic business principles to government spending. Overhead ratio, ROI, accountability. "In my company, every dollar had a job. In Washington, dollars go to die."',
          'Real examples of waste: $2B on a website that didn\'t work, $80B to an agency that lost it, defense projects that are decades late and billions over budget.',
          'The accountability gap: in business, someone gets fired. In government, they get promoted. Why this matters more than any policy debate.',
        ],
      },
      {
        name: 'Segment 3 — "What You Can Do"',
        minutes: '15 min',
        bullets: [
          'Walk through USAspending.gov — teach listeners how to actually look up where federal money goes in their own community.',
          'Local budgets matter more: your city council spends money that affects you daily. Most people can\'t name their council members. That\'s the problem.',
          'The bold move: attend one local budget hearing. Just one. See how the sausage gets made. Then decide if you want to stay quiet.',
        ],
      },
      {
        name: 'Close — "Bold Thought of the Week"',
        minutes: '5 min',
        bullets: [
          'This week\'s action: look up your city or county\'s annual budget online. Find one line item that surprises you.',
          'Tease Episode 3: "Next week, we\'re having our first guest. A buddy of mine who\'s been in the trenches of local politics. You\'re gonna want to hear what he has to say about what really happens behind closed doors."',
          'Sign-off with the line.',
        ],
      },
    ],
  },
  {
    number: 3,
    title: '"Behind Closed Doors" — First Guest Episode',
    format: 'guest',
    duration: '70–80 min',
    hook: 'Bernie\'s first interview episode. Bring on someone from your real life — a local business owner, a former local politician, a veteran, someone with firsthand experience in a system that claims to serve the people. Raw, unscripted, two guys talking like they\'re at the kitchen table.',
    segments: [
      {
        name: 'Cold Open — Setting the Table',
        minutes: '5 min',
        bullets: [
          'Introduce the guest like you\'d introduce a friend: who they are, how you know them, and why their perspective matters. No PR-speak.',
          'Explain the format: "This isn\'t an interview. This is a conversation. I\'m gonna ask you things. You\'re gonna tell me the truth. If I think you\'re wrong, I\'ll say so. Same goes for you."',
          'Quick recap of the show\'s mission for new listeners who found this episode first.',
        ],
      },
      {
        name: 'Segment 1 — "Your Story"',
        minutes: '20 min',
        bullets: [
          'Let the guest tell their story — what they\'ve built, what they\'ve seen, what radicalized them (in the true sense of the word) against the status quo.',
          'Push on the details: "When did you realize the system wasn\'t working the way they told you it was?" Get the specific moment.',
          'Connect their experience to the broader theme: individual Americans who see the truth because they\'re living in it, not watching it on cable news.',
        ],
      },
      {
        name: 'Segment 2 — "The Hard Questions"',
        minutes: '20 min',
        bullets: [
          'This is where Bernie challenges the guest. Disagree with them on something. Show the audience that this isn\'t an echo chamber.',
          'Ask the question the audience is thinking: "So what do we actually do about it?" Don\'t let the guest give a politician answer.',
          'Dig into their area of expertise — whether it\'s business, military, local government — and extract the insider knowledge the public doesn\'t get.',
        ],
      },
      {
        name: 'Segment 3 — "If You Ran the Show"',
        minutes: '15 min',
        bullets: [
          'Give the guest 5 minutes to describe what they\'d change if they had real power. No constraints, no political reality — just their vision.',
          'Bernie reacts: what\'s realistic, what\'s fantasy, and what\'s actually brilliant but will never happen because the system won\'t allow it.',
          'Close the conversation with mutual respect: "We don\'t agree on everything, and that\'s exactly the point."',
        ],
      },
      {
        name: 'Close — "Bold Thought of the Week"',
        minutes: '5 min',
        bullets: [
          'This week\'s action: have a real political conversation with someone you disagree with. No social media. Face to face. Listen more than you talk.',
          'Tease Episode 4: "Next week, I\'m flying solo again. We\'re talking about the education system — what they\'re teaching your kids, what they\'re not teaching your kids, and why it matters more than any election."',
          'Sign-off.',
        ],
      },
    ],
  },
  {
    number: 4,
    title: '"What They Don\'t Teach Your Kids" — The Education Problem',
    format: 'solo',
    duration: '60–70 min',
    hook: 'Bernie tackles the education system not as a political football but as a father and business owner who hired people the system produced. Financial literacy, civic duty, critical thinking — the things that actually matter for a functioning republic, and the things conspicuously absent from most curricula.',
    segments: [
      {
        name: 'Cold Open — "The Job Interview"',
        minutes: '5 min',
        bullets: [
          'Tell a story from the steel company: interviewing someone with a degree who couldn\'t read a contract, balance a checkbook, or explain how a bill becomes a law.',
          '"We\'re producing employees, not citizens. And honestly, we\'re not even producing good employees."',
          'Frame: this isn\'t about bashing teachers. Teachers are underpaid soldiers in a broken system. The system is the target.',
        ],
      },
      {
        name: 'Segment 1 — "The Missing Curriculum"',
        minutes: '20 min',
        bullets: [
          'Financial literacy: how to read a loan agreement, what compound interest does to you, why credit card companies target 18-year-olds. "My dad taught me this. Schools don\'t."',
          'Civic mechanics: not just "the three branches of government" but how lobbying works, how bills actually get written (by lobbyists), how municipal bonds fund your roads.',
          'Critical thinking and media literacy: how to identify a primary source, how to spot propaganda, how to distinguish between news and opinion. "If I can teach my kids this at the dinner table, why can\'t a school?"',
        ],
      },
      {
        name: 'Segment 2 — "The Business Owner\'s View"',
        minutes: '15 min',
        bullets: [
          'What you actually needed from employees that school never gave them: problem-solving, accountability, the ability to have a difficult conversation without falling apart.',
          'The college question: the racket of student debt, the trades gap, and why a kid who can weld will outperform a kid with a communications degree for the next 30 years.',
          'Real talk about success: "I didn\'t get where I am because of a diploma. I got there because someone taught me to show up, shut up, and figure it out."',
        ],
      },
      {
        name: 'Segment 3 — "The Parent\'s Responsibility"',
        minutes: '15 min',
        bullets: [
          'Don\'t outsource your kid\'s education to an institution. The dinner table is a classroom. Current events, money, ethics — talk about all of it.',
          'How to teach a kid to question authority without creating a rebel: "Respect doesn\'t mean agreement. You can salute the flag and still demand better from the people who serve under it."',
          'The generational handoff: "I taught Brandon to question everything. Now he\'s building something. That\'s the whole point."',
        ],
      },
      {
        name: 'Close — "Bold Thought of the Week"',
        minutes: '5 min',
        bullets: [
          'This week\'s action: sit down with a young person in your life and explain one financial concept — APR, compound interest, how a mortgage works. Give them what school won\'t.',
          'Tease Episode 5: "Next week, we\'re talking about something personal. The American Dream — is it dead, is it different, or did we just stop earning it? I\'ve got thoughts."',
          'Sign-off.',
        ],
      },
    ],
  },
  {
    number: 5,
    title: '"The Dream Isn\'t Dead — You Just Stopped Working for It"',
    format: 'solo',
    duration: '60–70 min',
    hook: 'Bernie takes on the narrative that the American Dream is dead — not to dismiss the real obstacles, but to argue that the dream was never about comfort. It was about opportunity, and opportunity still exists for anyone bold enough to chase it. This is the episode that defines the show\'s soul.',
    segments: [
      {
        name: 'Cold Open — "The Steel Story"',
        minutes: '5 min',
        bullets: [
          'Tell the full story: Jersey kid, no silver spoon, built a steel company from nothing in North Carolina. "Nobody handed me anything. That\'s not a complaint — that\'s a point of pride."',
          'Acknowledge the reality: "Is it harder now? In some ways, yes. Housing costs, debt, the system is rigged in ways it wasn\'t before. But harder isn\'t impossible."',
          'The thesis: "The dream isn\'t a house and a car. The dream is the freedom to build something. And that freedom still exists if you\'re bold enough to use it."',
        ],
      },
      {
        name: 'Segment 1 — "What the Dream Actually Is"',
        minutes: '15 min',
        bullets: [
          'Reclaim the definition: it was never about material success. Read the actual phrase\'s origin — James Truslow Adams, 1931. It\'s about a social order where each person can attain their fullest potential.',
          'How consumerism hijacked the dream: "They turned \'life, liberty, and the pursuit of happiness\' into \'get a mortgage you can\'t afford and buy stuff you don\'t need.\' That\'s not the dream. That\'s the trap."',
          'The immigrant perspective: people still come here with nothing and build empires. What do they see that native-born Americans have stopped seeing?',
        ],
      },
      {
        name: 'Segment 2 — "The Real Obstacles"',
        minutes: '20 min',
        bullets: [
          'Be honest about what\'s broken: regulatory capture, the cost of housing, healthcare as financial ruin, student debt. Don\'t pretend bootstrapping solves systemic problems.',
          'But also be honest about what\'s not broken: the internet gave everyone a printing press, a storefront, and a broadcast studio. The barriers to entry for entrepreneurship have never been lower.',
          'The responsibility split: "The system owes you a fair shot. It doesn\'t owe you a comfortable life. The fair shot part — yeah, we need to fight for that. The comfortable life part — that\'s on you."',
        ],
      },
      {
        name: 'Segment 3 — "Bold Lives"',
        minutes: '15 min',
        bullets: [
          'Tell three stories of people who embody the real dream — not celebrities or billionaires, but regular people who built something from nothing by refusing to quit.',
          'Your own story as proof: "I\'m not special. I\'m stubborn. I showed up every day, I did what I said I was going to do, and I didn\'t quit when it got hard. That\'s the whole formula."',
          'The challenge: "If you\'re listening to this and you\'re not where you want to be — what are you doing about it? Not thinking about it. Doing about it. Because freedom lies in being bold, and bold means action."',
        ],
      },
      {
        name: 'Close — "Bold Thought of the Week"',
        minutes: '5 min',
        bullets: [
          'This week\'s action: identify one thing you\'ve been putting off — starting a business, making a call, having a conversation — and do it before the next episode drops.',
          'Announce what\'s coming: the show\'s future, the cadence, how listeners can submit questions and topic ideas.',
          'Final sign-off for the first arc: "Five episodes in. We\'re just getting started. Freedom lies in being bold. Now go be bold. I\'ll see you next week."',
        ],
      },
    ],
  },
]

const SUGGESTIONS: Suggestion[] = [
  // ── THE POWER & MONEY BEAT (1–15) ──
  { id: 1, title: 'The Federal Reserve: Who Owns America\'s Money?', bullets: ['Break down how the Fed works in plain language — a private institution controlling public money. Ron Paul has been screaming about this for decades and Bernie can connect that history to today.', 'Interview a local business owner about how interest rate decisions made by unelected officials directly crushed or saved their business.', 'Challenge: ask listeners to find out who their regional Fed president is and what decisions they\'re making. Nobody knows. That\'s the problem.'] },
  { id: 2, title: 'Lobbying 101: How Laws Actually Get Written', bullets: ['Walk through a real bill\'s journey — show how lobbyists draft language that legislators copy-paste. Use a specific recent example with receipts.', 'The steel industry angle: tell a story from your own business about a regulation that made no sense until you realized who benefited from it.', 'Action item: teach listeners to use OpenSecrets.org to look up their own representatives\' donors. Knowledge is leverage.'] },
  { id: 3, title: 'The Military-Industrial Complex: Eisenhower Warned Us', bullets: ['Play Eisenhower\'s farewell address clip and react to it line by line. Show how every single warning came true, with current defense budget numbers.', 'Personal angle: did the steel company ever interact with defense contracts? What did that world look like from the inside?', 'Connect to the average listener: calculate how much of their personal tax contribution goes to defense vs. infrastructure they actually use.'] },
  { id: 4, title: 'Property Taxes: You Never Actually Own Your Home', bullets: ['The philosophical argument that shocks people: if you can lose your home for not paying property tax, you\'re renting from the government. You are a tenant, not an owner.', 'Break down where property tax money goes in a typical South Florida municipality. Schools, police, debt service — show the receipts.', 'Guest idea: bring on a local tax assessor or county commissioner to explain how property values get assessed and why your bill keeps going up.'] },
  { id: 5, title: 'The Pharmaceutical Machine', bullets: ['Why does the same drug cost $300 here and $30 in Canada? Follow the money: lobbying spend, FDA revolving door, patent manipulation.', 'Personal stories: healthcare costs as a business owner providing insurance. What it actually cost to keep employees covered and how it shaped business decisions.', 'Bold take: compare Big Pharma\'s lobbying budget to their R&D budget. The numbers tell the story better than any opinion.'] },
  { id: 6, title: 'Social Security: The Biggest Broken Promise in America', bullets: ['It\'s not an entitlement — you paid into it. Reframe the entire conversation from a working-class perspective. Show the math of what was taken vs. what\'s returned.', 'The trust fund raid: how Congress borrowed from Social Security to fund other spending and left IOUs. Explain it like a business partner embezzling from the company account.', 'What the fix actually looks like vs. what politicians propose. Cut through the fear-mongering on both sides with actual actuarial projections.'] },
  { id: 7, title: 'Eminent Domain: When the Government Takes Your Property', bullets: ['The Kelo v. New London case that let government take private homes and give the land to corporations. Explain why every property owner should know this case.', 'Local examples: find eminent domain cases in South Florida or North Carolina and tell the stories of the families affected.', 'Connect to the founding principles: the Fifth Amendment says "just compensation" but who decides what\'s just? Spoiler: not you.'] },
  { id: 8, title: 'The Two-Party Trap: Why Nothing Ever Changes', bullets: ['Ron Paul ran as a Republican but was treated as an outsider by his own party. Use that experience as a case study for how the duopoly maintains power.', 'The illusion of choice: show how both parties vote identically on surveillance, defense spending, and corporate bailouts. The disagreements are performative.', 'Bold suggestion: what if we treated political parties like what they are — private corporations that control public elections? Because that\'s exactly what they are.'] },
  { id: 9, title: 'The National Debt: A Bill Your Grandkids Can\'t Pay', bullets: ['Put the number in human terms: $34+ trillion. If you spent $1 per second, it would take over a million years. Make it visceral for the listener.', 'The business owner lens: "If my company\'s balance sheet looked like this, the bank would shut me down Monday morning. The government just prints more."', 'Interview a young person — maybe one of your kids\' friends — about whether they understand what they\'re inheriting. Their reaction is the content.'] },
  { id: 10, title: 'Corporate Bailouts: Socialism for the Rich', bullets: ['2008 bank bailouts, airline bailouts, auto bailouts — walk through the pattern: privatize profits, socialize losses. Every time.', 'The small business contrast: "When my company had a bad quarter, nobody showed up with a check. I had to figure it out or close. That\'s capitalism. What they do is something else."', 'Ask the audience: should any company be "too big to fail"? If yes, should it be publicly owned? If no, let it fail. There\'s no intellectually honest middle ground.'] },
  { id: 11, title: 'The Insurance Racket: Health, Home, and Auto', bullets: ['Break down how insurance companies collect premiums for decades, then fight every claim. Use real denial stories — everyone has one.', 'Florida-specific angle: hurricane insurance, flood zones, the collapse of Citizens Property Insurance. South Florida listeners will feel this in their bones.', 'The deeper question: when did we accept that a middleman between you and your doctor was normal? It\'s not normal. It\'s a business model we were sold.'] },
  { id: 12, title: 'Civil Asset Forfeiture: Legal Theft by Police', bullets: ['Explain how police can seize your cash, car, or property without charging you with a crime — and how you have to prove your innocence to get it back.', 'Real cases: people losing life savings at traffic stops, small businesses having accounts frozen. This affects everyone regardless of political affiliation.', 'The reform fight: which states have fixed this, which haven\'t, and why your state legislators\' silence on this issue tells you everything about their priorities.'] },
  { id: 13, title: 'Inflation: The Hidden Tax Nobody Voted For', bullets: ['Explain inflation as a tax on savings — your money loses value while you sleep. Connect it directly to money printing and the Fed\'s policies.', 'The grocery store test: compare what $100 bought in 2019 vs. today. Do it with real receipts. Visual, tangible, undeniable.', 'Why wages don\'t keep up: productivity has skyrocketed since the 1970s but real wages flatlined. Show the chart. Ask who captured the difference.'] },
  { id: 14, title: 'The Surveillance State: They\'re Watching and You Agreed to It', bullets: ['From the Patriot Act to your Ring doorbell — trace the normalization of surveillance. You didn\'t vote for most of it; you clicked "I Agree."', 'Edward Snowden revealed that the government collects everything. Nothing changed. Ask why and sit with the uncomfortable answer.', 'Practical segment: walk listeners through basic digital privacy steps — VPN, encrypted messaging, browser settings. Not paranoia, just hygiene.'] },
  { id: 15, title: 'Regulatory Capture: When the Referee Works for One Team', bullets: ['Define it simply: the agencies created to regulate industries get taken over by the industries they\'re supposed to regulate. EPA, FDA, SEC, FAA — the pattern is everywhere.', 'The steel angle: tell a story about a regulation that hurt small operators while big corporations wrote themselves exemptions. This is your lived experience.', 'Name the revolving door: specific people who went from industry to regulator and back. Make it personal, not abstract.'] },

  // ── CIVIC DUTY & CITIZENSHIP (16–30) ──
  { id: 16, title: 'Jury Nullification: The Power They Don\'t Want You to Know About', bullets: ['Explain that juries can acquit even when the law was technically broken — it\'s a constitutional check on unjust laws. Most Americans have no idea.', 'Historical examples: juries refusing to convict under the Fugitive Slave Act, Prohibition-era acquittals. This power has shaped American history.', 'Why judges and prosecutors hate it: they literally instruct juries NOT to consider it. Ask why a legal right is treated like a secret.'] },
  { id: 17, title: 'Your School Board Matters More Than the President', bullets: ['Break down the actual power of local school boards: curriculum, budgets, hiring. These decisions shape your kids\' minds daily. The president doesn\'t.', 'The turnout problem: school board elections have abysmal participation. Show the numbers. Then show how organized special interests exploit that apathy.', 'Challenge: attend one school board meeting before the next episode. Report back. Make it a community homework assignment.'] },
  { id: 18, title: 'How to Read a Ballot Like a Business Contract', bullets: ['Most people vote on vibes. Teach them to read ballot measures like contracts — who benefits, who pays, what the fine print actually says.', 'Walk through a real past ballot measure line by line. Show how the language is designed to confuse. "A yes vote means no" situations are real.', 'The Bernie method: "Before I sign anything in business, I read every word. Why would you treat your vote — the most powerful signature you have — any differently?"'] },
  { id: 19, title: 'The Sheriff: The Most Powerful Person You Don\'t Think About', bullets: ['The county sheriff is the highest constitutional law enforcement officer in their jurisdiction. They can theoretically refuse to enforce unconstitutional federal orders.', 'Interview your local sheriff or a constitutional sheriff from the CSPOA. Ask hard questions about the limits of their power and their oath.', 'Connect to the 10th Amendment: the tension between federal authority and local sovereignty is the oldest American debate, and your sheriff is on the front line.'] },
  { id: 20, title: 'Voting Isn\'t Enough: The Full Toolkit of Citizenship', bullets: ['Voting is the minimum. Lay out the full menu: attending hearings, filing FOIA requests, running for local office, serving on boards, testifying at public comment.', 'The ripple effect: one person at a city council meeting can shift a vote. Tell a real story of this happening — in your town or someone else\'s.', 'Weekly challenge: do one non-voting civic act per week for a month. Document it. Share it on the show\'s social channels.'] },
  { id: 21, title: 'FOIA: How to Make the Government Show You the Receipts', bullets: ['Walk listeners through filing a Freedom of Information Act request step by step. It\'s free, it\'s your right, and it\'s easier than people think.', 'Show examples of what FOIA requests have uncovered: local corruption, police misconduct records, government waste. These are the tools of accountability.', 'The bold move: file one live on the show. Pick a local agency, submit the request, and follow up on a future episode with the results.'] },
  { id: 22, title: 'The Constitution: Have You Actually Read It?', bullets: ['Read sections of the Constitution on air and react in real time. Most Americans haven\'t read the document their entire system is built on.', 'Focus on the Bill of Rights — go amendment by amendment and ask: "Is this being honored right now?" Be honest about where both parties fail.', 'The homework: read the whole thing. It\'s shorter than most Netflix terms of service. If you haven\'t read it, you can\'t defend it.'] },
  { id: 23, title: 'Nullification: When States Say No to the Feds', bullets: ['Historical and modern examples of states refusing federal mandates — marijuana legalization, sanctuary cities, Second Amendment sanctuaries. The principle is the same regardless of the issue.', 'The philosophical argument: the states created the federal government, not the other way around. Explain the compact theory in plain language.', 'Ask the uncomfortable question: if you cheer nullification when your side does it but condemn it when the other side does, do you actually believe in the principle?'] },
  { id: 24, title: 'The Art of Calling Your Representative (and Actually Being Heard)', bullets: ['Most people have never called their rep. Walk through exactly how to do it: what to say, who answers, how to follow up, why it works better than social media posts.', 'Insider knowledge: congressional staffers tally calls. Volume matters. Twenty calls about the same issue in one day gets noticed. Twenty tweets does not.', 'Role-play a call on the show. Make it normal, not intimidating. "You\'re calling YOUR employee. Act like it."'] },
  { id: 25, title: 'Community Over Politics: Building Something Local', bullets: ['The best civic act isn\'t arguing online — it\'s building something in your community. Coaching a team, starting a neighborhood watch, organizing a clean-up.', 'The social fabric argument: when communities are strong, government dependency drops. That\'s not conservative or liberal — it\'s just math.', 'Challenge: identify one thing in your neighborhood that needs fixing and organize three people to help fix it. Don\'t wait for permission.'] },
  { id: 26, title: 'The Grand Jury: Citizens as Prosecutors', bullets: ['Most people don\'t know grand juries exist or that they have the power to investigate anything — not just cases brought by prosecutors.', 'Historical "runaway grand juries" that investigated government corruption on their own initiative. This power still exists in many states.', 'Know your rights: if called for grand jury duty, you\'re not a rubber stamp. You can ask questions, demand evidence, and refuse to indict. That\'s the design.'] },
  { id: 27, title: 'Public Comment: The 3 Minutes That Can Change Everything', bullets: ['Every city council, county commission, and school board has a public comment period. Most go empty. Show up, speak for 3 minutes, and watch what happens.', 'Tips for effective public comment: be specific, cite the agenda item, state your ask clearly. Don\'t rant — persuade.', 'Bring a story from someone who changed a local policy through public comment alone. Proof that the system works when people actually use it.'] },
  { id: 28, title: 'The Militia Clause: What the Second Amendment Actually Says', bullets: ['Read the full text. Discuss "well regulated militia" honestly — not the NRA version, not the gun control version. The actual historical context.', 'The founders\' intent through their own letters and the Federalist Papers. Primary sources, not talking points.', 'Where Bernie stands and why — be honest, be bold, acknowledge the complexity. This is a show about thinking, not about confirming what you already believe.'] },
  { id: 29, title: 'Recall Elections: Firing Your Representatives Mid-Term', bullets: ['Most states allow recall elections for state and local officials. Walk through the process — signatures, thresholds, timelines.', 'Successful recalls: the Colorado gun law recalls, the Newsom attempt, local recalls that actually worked. What made them succeed or fail?', 'The principle: elected officials serve at the pleasure of the people. If they forget that, remind them. The mechanism exists — use it.'] },
  { id: 30, title: 'Teach Your Kids to Argue (Properly)', bullets: ['The lost art of civil debate: how to disagree without hating, how to change your mind without shame, how to steelman the other side\'s best argument.', 'Family dinner debates: how Bernie did it — pick a topic, assign positions (even ones you disagree with), argue the case. Make thinking a sport.', 'The payoff: kids who can argue well become adults who can\'t be manipulated. That\'s the goal.'] },

  // ── MEDIA, TRUTH & PROPAGANDA (31–45) ──
  { id: 31, title: 'How to Spot Propaganda in 60 Seconds', bullets: ['A practical framework: check the source, check the funding, check what\'s missing, check the emotional manipulation. Four questions, every time.', 'Live demonstration: take a headline from that day\'s news and run it through the framework on air. Show listeners the process in real time.', 'The hardest part: apply it to YOUR side\'s media too. "If you only fact-check the other team, you\'re not a critical thinker — you\'re a fan."'] },
  { id: 32, title: 'Operation Mockingbird and the CIA in Your Newsroom', bullets: ['The declassified history of CIA media infiltration. Not conspiracy theory — congressional testimony and FOIA documents. Primary sources only.', 'Ask the modern question: if they did it then, why would they stop? What does modern media capture look like? Intelligence community leaks as "journalism."', 'The antidote: support independent media. Subscribe to local journalists. The people without corporate backing are the ones most likely to tell you the truth.'] },
  { id: 33, title: 'The Algorithm: How Social Media Decides What You Think', bullets: ['Break down engagement-based algorithms in simple terms: they don\'t show you truth, they show you what makes you angry. Anger keeps you scrolling.', 'The radicalization pipeline: how someone goes from a cooking video to political extremism in five clicks. It\'s engineered, not organic.', 'Digital hygiene tips: curate your feeds intentionally, follow people you disagree with, set time limits. Take back control of your information diet.'] },
  { id: 34, title: 'Manufacturing Consent: The Chomsky Episode', bullets: ['Break down Chomsky\'s five filters of media in plain language: ownership, advertising, sourcing, flak, and common enemy. Apply each to current media examples.', 'You don\'t have to agree with Chomsky on everything to recognize the framework is devastating. Separate the tool from the toolmaker.', 'The business owner parallel: "When someone was trying to sell me something, I looked at their incentives first. Do the same with your news."'] },
  { id: 35, title: 'Primary Sources: Read It Yourself', bullets: ['The most radical act in modern media consumption: read the original document instead of someone\'s summary. Court filings, bills, studies, transcripts.', 'Live demo: pick a news story, find the primary source, compare what the source says to what the headline claims. The gap is always larger than you expect.', 'Build a primary source library: bookmark PACER, Congress.gov, FOIA reading rooms, state legislature sites. Become your own journalist.'] },
  { id: 36, title: 'The Death of Local Journalism (and Why It\'s Killing Democracy)', bullets: ['Since 2005, 2,500+ newspapers have closed. Local government corruption has spiked in areas that lost their paper. Coincidence? Not even close.', 'When nobody\'s watching the school board, the city council, the county commission — that\'s when the deals happen. Local news was the watchdog.', 'What to do: subscribe to your local paper or news site. Support independent local journalists on Patreon. It\'s cheaper than Netflix and more important.'] },
  { id: 37, title: 'Declassified: Things the Government Admitted After the Fact', bullets: ['MKUltra, Gulf of Tonkin, COINTELPRO, Iran-Contra — all "conspiracy theories" that turned out to be declassified facts. Review them with the actual documents.', 'The pattern: deny, ridicule, classify, wait 30 years, quietly declassify, nobody cares. Recognize the pattern and apply it to current claims.', 'The lesson isn\'t "everything is a conspiracy." The lesson is: skepticism of official narratives has been vindicated often enough to be rational, not paranoid.'] },
  { id: 38, title: 'The Overton Window: How "Extreme" Becomes "Normal"', bullets: ['Explain the concept: the range of ideas considered acceptable in public discourse. Show how it shifts — gay marriage went from radical to law in 15 years.', 'Who moves the window and how: think tanks, media framing, repetition. The ideas that become law started as ideas someone was mocked for suggesting.', 'For the show: Bernie\'s job is to push ideas into the window that the establishment wants to keep out. Ron Paul did it with the Fed. This show can do it with civic engagement.'] },
  { id: 39, title: 'Fact-Checkers: Who Checks the Checkers?', bullets: ['Examine the funding and methodology of major fact-checking organizations. Who pays them? What\'s their track record? Are they neutral or narrative-aligned?', 'Specific examples where fact-checkers got it wrong, changed ratings quietly, or applied different standards to similar claims from different political figures.', 'The real fact-check is you: primary sources, multiple perspectives, intellectual honesty. Outsourcing truth verification to a brand is lazy citizenship.'] },
  { id: 40, title: 'War Propaganda: How They Sell You a Conflict', bullets: ['From "Remember the Maine" to WMDs — the historical playbook for selling wars to the American public. Same template, every time.', 'Emotional manipulation: showing the baby incubator testimony (Kuwait), embedded journalism (Iraq), and how manufactured consent works in real time.', 'The citizen\'s test: before supporting any military action, demand answers to three questions — who profits, what\'s the exit strategy, and what aren\'t they telling us?'] },
  { id: 41, title: 'The Art of Asking the Right Question', bullets: ['Politicians are trained to answer the question they want, not the question asked. Teach listeners to spot the dodge and demand the answer.', 'Bernie\'s business method: "In a negotiation, the person asking questions controls the conversation. That applies to democracy too."', 'Practice segment: take a politician\'s recent press conference, identify the dodges, and rewrite the questions they should have been asked.'] },
  { id: 42, title: 'Book Club Episode: One Book That Changed Everything', bullets: ['Pick a book that shaped your worldview — "End the Fed," "1984," "The Creature from Jekyll Island," whatever it is — and break it down chapter by chapter.', 'Make it interactive: announce the book a month early, let listeners read along, take questions and reactions on the episode.', 'Recurring format: quarterly book club episodes. Build a reading community. An informed citizenry reads. Period.'] },
  { id: 43, title: 'The History They Don\'t Teach: Smedley Butler\'s "War Is a Racket"', bullets: ['The most decorated Marine in history wrote a book exposing war as a profit machine for corporations. Read key passages on air.', 'The Business Plot: Butler testified to Congress that wealthy industrialists tried to recruit him for a fascist coup in the 1930s. It\'s in the congressional record.', 'Apply Butler\'s framework to every conflict since. Does the shoe fit? Every single time.'] },
  { id: 44, title: 'Documentaries That Will Change How You See the World', bullets: ['Curate a list of 10 documentaries — not partisan propaganda, but genuine investigations. "The Corporation," "Citizenfour," "Inside Job," "The Power of Nightmares."', 'Watch one with the audience: pick a doc, announce it, watch it the same week, then react and discuss on the next episode.', 'The visual medium matters: some people learn by reading, some by listening, some by watching. Give your audience every tool.'] },
  { id: 45, title: 'Letters to the Editor: The Original Social Media', bullets: ['Before Twitter, citizens shaped public discourse through letters to the editor. The art isn\'t dead — local papers still publish them and officials still read them.', 'How to write an effective letter: 250 words, one clear point, local angle, call to action. Walk through the format and submit one live.', 'The amplification effect: one letter gets read by the entire circulation. That\'s more reach than 99% of social media posts, with more credibility.'] },

  // ── PERSONAL FINANCE & INDEPENDENCE (46–60) ──
  { id: 46, title: 'Financial Independence: The Only Real Freedom', bullets: ['True liberty starts with not being dependent on a paycheck. Break down the FIRE movement, passive income, and the math of freedom.', 'The steel company lesson: "I built a business so I could be free. Not rich — free. There\'s a difference most people never learn."', 'Practical steps anyone can start this week: track every dollar, eliminate one unnecessary expense, open an investment account. Start small, start now.'] },
  { id: 47, title: 'The Debt Trap: How They Keep You Working', bullets: ['Student loans, car payments, mortgages, credit cards — trace how the debt system creates compliant workers who can\'t afford to rock the boat.', 'The psychological angle: people in debt don\'t challenge their employer, their government, or the system. Debt is a control mechanism, not just a financial product.', 'The escape plan: the debt snowball vs. avalanche method, negotiation tactics, and the mindset shift from consumer to owner.'] },
  { id: 48, title: 'Why Your Kids Need to Understand Money Before College', bullets: ['By 18, most Americans can name every Avenger but can\'t explain compound interest. That\'s not an accident — it\'s a feature of the system.', 'The Bernie curriculum: what you taught your kids about money and when. Practical, age-appropriate financial lessons from allowance to first job.', 'Resources: books, apps, and exercises for parents to teach financial literacy at home. Because the school won\'t do it.'] },
  { id: 49, title: 'Starting a Business: What They Don\'t Tell You', bullets: ['The real story of starting the steel company: not the highlight reel, but the 3 AM panic, the close calls, the moments you almost quit.', 'The regulatory gauntlet: permits, licenses, insurance, compliance, taxes — walk through what a new business owner actually faces. It\'s designed to discourage you.', 'Despite all of it: "Starting a business was the best decision I ever made. Not because it was easy — because it made me free. And freedom lies in being bold."'] },
  { id: 50, title: 'The Housing Market: Rigged or Misunderstood?', bullets: ['Break down why housing is unaffordable: BlackRock buying neighborhoods, zoning laws restricting supply, the Fed\'s role in inflating asset prices.', 'The Florida perspective: insurance crisis, foreign buyers, condo assessments post-Surfside. Local, real, affecting listeners right now.', 'Honest advice: should young people buy or rent? When does each make sense? Cut through the "real estate always goes up" propaganda.'] },
  { id: 51, title: 'Cryptocurrency: Freedom Tool or Speculative Casino?', bullets: ['The philosophical case for crypto: money outside government control. Bitcoin as digital gold, as a hedge against inflation, as a protest against the Fed.', 'The honest risks: volatility, scams, the lack of consumer protection. Don\'t pretend it\'s all upside — that\'s what con artists do.', 'Where Bernie stands: "I like the idea of money the government can\'t print or seize. I don\'t like the idea of people losing their savings on meme coins. Both things are true."'] },
  { id: 52, title: 'The Trades: America\'s Most Undervalued Career Path', bullets: ['Electricians, plumbers, welders — the backbone of the country. They\'re making $80K+ with no student debt while college grads serve coffee.', 'The steel industry connection: the men and women who built things with their hands built America. That work has dignity that no cubicle job can match.', 'Message to young listeners: "You don\'t need a degree to be valuable. You need a skill. Go get one."'] },
  { id: 53, title: 'Negotiation: The Life Skill Nobody Teaches', bullets: ['Everything is a negotiation — salary, car price, contracts, even your cable bill. Most people accept the first number they\'re given. Stop doing that.', 'Lessons from the steel business: how to read people, when to walk away, why silence is your most powerful tool in any negotiation.', 'Role-play exercises: negotiate a scenario live on the show. Make it practical and immediately applicable.'] },
  { id: 54, title: 'Insurance You Need vs. Insurance They Sell You', bullets: ['Strip away the fear-based selling: what insurance do you actually need, what\'s overpriced garbage, and how to tell the difference?', 'The business owner\'s perspective: "I\'ve paid millions in premiums over my career. Here\'s what I learned about what\'s worth it and what\'s a racket."', 'Listener call-in potential: have people describe their coverage and do a live audit. Entertaining and genuinely useful.'] },
  { id: 55, title: 'Retirement: What They Don\'t Tell You Until It\'s Too Late', bullets: ['The 401(k) was never meant to replace pensions — it was a tax loophole that corporations exploited to offload retirement risk onto employees.', 'Bernie\'s retirement reality: what actually happened when the paychecks stopped. The financial, psychological, and identity aspects nobody warns you about.', 'The new playbook: why "retire and do nothing" is a death sentence and why building something in retirement — like this show — is the actual goal.'] },
  { id: 56, title: 'Taxes: What You\'re Legally Not Required to Pay', bullets: ['A CPA or tax attorney guest breaks down legal tax strategies that most W-2 employees never learn. Business deductions, retirement accounts, entity structuring.', 'The fairness question: why does a billionaire pay a lower effective rate than a teacher? Explain the mechanism — capital gains vs. income tax — in plain language.', 'Actionable: five things every listener should ask their accountant this year. Most people are overpaying because they don\'t ask.'] },
  { id: 57, title: 'The Side Hustle Economy: Building Your Plan B', bullets: ['Every employee should have income outside their job. Not for greed — for security. When you can walk away, you negotiate from strength.', 'Ideas that work with minimal startup cost: consulting, skilled trades, content creation, local services. Real options, not get-rich-quick scams.', 'The bold challenge: start something this month. Anything. A lawn care side job, a Substack, a handmade product. Just start.'] },
  { id: 58, title: 'Teaching Your Daughter About Money (Guest: A Woman in Business)', bullets: ['Financial literacy has a gender gap. Bring on a successful businesswoman to discuss how financial independence changes everything for women.', 'The cultural shift: from "marry well" to "build well." How fathers specifically can empower their daughters through financial education.', 'Practical: the same financial skills apply regardless of gender, but the societal pressures are different. Acknowledge that honestly.'] },
  { id: 59, title: 'The Emergency Fund: Why 6 Months Changes Everything', bullets: ['The psychology of having savings: when you\'re not living paycheck-to-paycheck, you make better decisions about everything — career, relationships, politics.', 'How to build it when you think you can\'t: the $50/week method, the found-money approach, the lifestyle audit. No judgment, just math.', '"When COVID hit, the people with savings had options. The people without savings had orders. Which do you want to be?"'] },
  { id: 60, title: 'Gold, Silver, and Hard Assets: Owning Something Real', bullets: ['The case for physical assets in a digital world: you can\'t print gold, you can\'t hack silver, and land doesn\'t disappear in a market crash.', 'Practical guide: where to buy, what premiums are reasonable, how to store it, what percentage of your portfolio makes sense.', 'The Ron Paul connection: sound money isn\'t a fringe idea — it\'s the foundation the country was built on before we abandoned it.'] },

  // ── FAMILY, CULTURE & VALUES (61–75) ──
  { id: 61, title: 'Raising Sons in a Confused World', bullets: ['What does it mean to be a good man today? Not the political version — the real one. Responsibility, integrity, strength with kindness.', 'How Bernie did it: the values, the conversations, the non-negotiables. "I didn\'t raise my boys to be liked. I raised them to be respected."', 'The father\'s role: presence matters more than perfection. Show up, be honest, and never stop teaching — even when they think they know everything.'] },
  { id: 62, title: 'The Lost Art of Disagreeing Without Hating', bullets: ['We\'ve lost the ability to disagree and remain friends. Diagnose why: social media, tribalism, the profit motive behind division.', 'The Jersey dinner table: "In my family, we argued about everything and loved each other through all of it. That\'s how it\'s supposed to work."', 'Practical: how to have a political conversation with someone you disagree with and both walk away smarter. It starts with listening.'] },
  { id: 63, title: 'What Retirement Actually Feels Like (Honest Edition)', bullets: ['Nobody talks about the identity crisis of retirement. You were a builder, a boss, a provider. Now what? Be brutally honest about it.', 'The solution: purpose doesn\'t retire. Find something to build, someone to mentor, a contribution to make. This show is proof of the concept.', 'Message to pre-retirees: start building your "what\'s next" before you leave. The day after your last day shouldn\'t be empty.'] },
  { id: 64, title: 'The Dinner Table as a Classroom', bullets: ['Some of the most important education happens over food. How to turn dinner into a daily lesson without turning it into a lecture.', 'The Rollins method: current events, ethical dilemmas, "what would you do?" scenarios. Make kids think before they can parrot anyone\'s talking points.', 'Tech-free meals: the case for putting phones away and actually talking. Revolutionary concept in 2026, apparently.'] },
  { id: 65, title: 'Jersey Tough: What Growing Up Working-Class Teaches You', bullets: ['The values you only learn when things aren\'t easy: resilience, resourcefulness, loyalty, the ability to read a room and know who\'s full of it.', 'Working-class culture vs. elite culture: different priorities, different definitions of success, different understanding of what matters.', 'Why it\'s an asset, not a limitation: "The people running this country went to the best schools and made the worst decisions. Maybe it\'s time to listen to the people who actually built something."'] },
  { id: 66, title: 'Moving South: What Changes and What Doesn\'t', bullets: ['The cultural shift from Northeast to Southeast: pace of life, community, politics, how neighbors treat each other.', 'What transplants get right and wrong about the South. Honest, respectful, and probably a little funny.', 'Building a new community: how to put down roots, get involved, and become a local — not just a resident.'] },
  { id: 67, title: 'The Man Cave Episode: Designing Your Podcast Studio', bullets: ['Take listeners through building your home studio — the gear, the setup, the learning curve. Relatable content for anyone thinking about starting a podcast.', 'The deeper message: the barrier to entry for having a voice has never been lower. A mic, an internet connection, and something to say. That\'s it.', 'Equipment recommendations, software, workflow — be the mentor for the next Bernie who\'s thinking about starting their own show.'] },
  { id: 68, title: 'Mentorship: Why Every Man Needs One (and Should Be One)', bullets: ['The mentors who shaped you: name them, honor them, explain what they taught you that you couldn\'t have learned any other way.', 'The crisis of fatherless homes: not a political statement, a statistical reality. Boys without mentors are exponentially more likely to struggle. Be the solution.', 'How to be a mentor: join Big Brothers, coach a team, hire a young person and actually teach them. The legacy that outlasts everything else.'] },
  { id: 69, title: 'The Stoic Father: Lessons from Marcus Aurelius for Modern Dads', bullets: ['Stoic philosophy isn\'t about being emotionless — it\'s about focusing on what you can control and accepting what you can\'t. Perfect framework for parenting.', 'Key meditations applied to fatherhood: "The impediment to action advances action. What stands in the way becomes the way."', 'The calm dad advantage: when your kids see you handle adversity with composure, they learn more than any speech could teach.'] },
  { id: 70, title: 'Friendship After 50: Why It Matters More Than You Think', bullets: ['Men are in a loneliness epidemic. After retirement, social circles shrink. Talk about it honestly — it\'s not weakness, it\'s biology and social structure.', 'How to build and maintain friendships in the second half of life: shared activities, regular commitment, vulnerability without mushiness.', 'The show itself as community: build something where listeners connect. Not just an audience — a network of like-minded people.'] },
  { id: 71, title: 'Legacy: What Do You Want Them to Say at Your Funeral?', bullets: ['Not morbid — clarifying. Work backwards from the eulogy you want. What do you need to do between now and then to earn those words?', 'The things that won\'t be mentioned: your net worth, your car, your square footage. The things that will: how you made people feel, what you built, who you helped.', '"I want them to say he told the truth, he showed up, and he never stopped fighting for what was right. Everything I do is in service of that."'] },
  { id: 72, title: 'The Immigrant\'s Hunger: Why Newcomers Outwork Everyone', bullets: ['No politics, just respect for the work ethic of people who came here with nothing and built something. What can native-born Americans learn from that drive?', 'Stories from the steel business: immigrant workers who ran circles around everyone because they understood the value of the opportunity.', 'The uncomfortable question: have we gotten so comfortable that we forgot what it feels like to be hungry?'] },
  { id: 73, title: 'Gratitude as a Weapon: The Mindset Reset', bullets: ['Not self-help fluff — a practical argument for gratitude as a strategic mindset. When you\'re grateful, you make better decisions. When you\'re resentful, you make reactive ones.', 'The morning practice: what are you grateful for today? Do it every day and watch how it changes your relationship with politics, money, and people.', 'The American context: "We live in a country where you can start a podcast in your house and reach the world. Some people would cross a desert for that privilege. Don\'t waste it."'] },
  { id: 74, title: 'Cooking as a Man: The Kitchen Is Not Optional', bullets: ['Lighthearted but meaningful: every adult should be able to feed themselves and others. It\'s self-sufficiency, it\'s community, it\'s love.', 'Bernie\'s go-to recipes, cooking stories, and why sharing a meal is the oldest form of human connection.', 'Guest potential: bring on a buddy and cook something together while talking about life. Joe Rogan meets Julia Child energy.'] },
  { id: 75, title: 'The Phone Call Episode: Live Listener Q&A', bullets: ['Open the lines (or voicemail box) and take questions from real listeners. Unscripted, unfiltered, whatever they want to ask.', 'This builds community and makes the audience feel invested. They\'re not just listening — they\'re participating.', 'Recurring format: do this quarterly. Let the audience shape the show. Their questions are often better than anything you\'d plan.'] },

  // ── THE BOLD 25: HIGH-IMPACT VIRAL POTENTIAL (76–100) ──
  { id: 76, title: 'If I Could Say One Thing to Every American', bullets: ['A short, powerful solo episode — under 30 minutes. One unified message delivered with everything you\'ve got. This is the "share this with everyone you know" episode.', 'The message: "You are not as powerless as they need you to believe. The system works when you work it. Stop watching. Start doing."', 'Film this one too — even just a phone recording in the studio. Video clips from this episode become the viral content that puts the show on the map.'] },
  { id: 77, title: 'An Open Letter to My Sons', bullets: ['Deeply personal. The things you want your boys to remember long after you\'re gone. Values, warnings, love, expectations.', 'Read it on air with no filter, no performance — just a father talking to his sons in front of the world. This is the episode that goes viral because it\'s real.', 'Permission for the audience to write their own letter. Provide the prompt: "What do you need your children to hear before it\'s too late to say it?"'] },
  { id: 78, title: 'The Bernie Rollins Drinking Game Debate Watch', bullets: ['Watch a presidential or gubernatorial debate live, react in real time, and create a drinking game for every dodge, lie, or talking point. Entertainment meets education.', 'Pause after each segment and break down what actually happened vs. what they wanted you to hear. The analysis layered with humor.', 'This is the episode format that brings in people who don\'t normally listen to political podcasts. The gateway drug to civic engagement.'] },
  { id: 79, title: 'The "Cancel Me" Episode: Every Opinion I\'m Not Supposed to Have', bullets: ['Lay it all out. Every position that would make you unelectable, unhireable, and un-invitable to dinner parties. Say them all with reasoning.', 'The point: "I can say these things because I answer to nobody. No employer, no sponsor, no party. That\'s what freedom sounds like."', 'Invite listeners to send their own "cancel-worthy" opinions — the things they believe but are afraid to say. Read the best ones on the next episode.'] },
  { id: 80, title: 'My Biggest Mistakes: What Failure Actually Taught Me', bullets: ['Be ruthlessly honest about business failures, personal regrets, and wrong beliefs you held. Vulnerability from a position of strength is magnetic.', 'The lessons: what each failure taught you that success never could. "Success teaches you nothing. Failure teaches you everything."', 'The message: "If you\'re not failing, you\'re not trying hard enough. Get comfortable being wrong. That\'s where growth lives."'] },
  { id: 81, title: 'The Day I Woke Up: My Political Awakening Story', bullets: ['Every politically aware person has the moment — the event, the conversation, the document that cracked the matrix. Tell yours in detail.', 'Was it Ron Paul? Was it 9/11? Was it something at the business? Trace the thread from comfortable ignorance to uncomfortable awareness.', 'Ask listeners to share theirs. Build an episode or series around audience awakening stories. Community through shared experience.'] },
  { id: 82, title: 'Interview Your Kids: A Cross-Generational Conversation', bullets: ['Bring Brandon or another son on the show. Ask them hard questions about their generation, their views, where they disagree with Dad.', 'The generational gap isn\'t a problem — it\'s a feature. Different perspectives from people who love each other. That\'s what America is supposed to look like.', 'This episode humanizes the host and shows that disagreement within a family is healthy, not threatening.'] },
  { id: 83, title: 'What I Learned From Employees Who Were Smarter Than Me', bullets: ['Humility episode: the people who worked for you who taught you more than you taught them. Name them, credit them.', 'The leadership lesson: hiring people smarter than you and getting out of their way. "My job was to set the direction and remove the obstacles. Their job was to be brilliant."', 'Connect to politics: the best leaders aren\'t the smartest people in the room. They\'re the ones smart enough to listen.'] },
  { id: 84, title: 'The Ron Paul Episode: What He Got Right Before Everyone Else', bullets: ['A dedicated deep-dive into Ron Paul\'s platform: audit the Fed, non-interventionist foreign policy, sound money, civil liberties. What\'s happened since 2008 has proved him right on nearly everything.', 'Personal story: how you found Ron Paul, what it felt like to support someone the system actively tried to suppress, and what it taught you about democracy.', 'The legacy: the Liberty Movement birthed a generation of independent thinkers. Trace the line from Ron Paul to the current populist movements on both sides.'] },
  { id: 85, title: 'Live From the Barber Shop: Man-on-the-Street Interviews', bullets: ['Take a portable mic to a barber shop, a diner, a hardware store — wherever regular men gather — and ask them what they think about the state of the country.', 'Unfiltered, unedited, real Americans saying what they actually think. This is the content that cable news will never produce because they can\'t control it.', 'Recurring format: "Bernie Goes to…" segments from different locations. Diners, VFW halls, fishing piers, mechanic shops.'] },
  { id: 86, title: 'The $100 Challenge: Making Government Transparency Personal', bullets: ['Challenge listeners to spend $100 and one weekend becoming informed citizens: buy a copy of the Constitution ($10), file a FOIA request ($0), attend a public meeting ($0), subscribe to a local paper ($20), and invest the rest in their community.', 'Track the results: have listeners report back. Create a community leaderboard. Make civic engagement competitive and fun.', 'The point: "An informed citizenry is the only thing standing between a republic and an empire. And it costs less than a night out."'] },
  { id: 87, title: 'When the Government Came to My Business', bullets: ['Tell the real stories of regulatory encounters at the steel company. OSHA visits, tax audits, compliance demands. What it actually feels like when the machinery of government touches your life.', 'Not anti-government per se — but pro-accountability. "I don\'t mind rules. I mind rules that exist to protect my competitor and were written by my competitor\'s lobbyist."', 'Every small business owner will relate. This is the episode that gets shared in entrepreneurship groups and trade associations.'] },
  { id: 88, title: 'The Veterans Episode: What We Owe and What We Don\'t Pay', bullets: ['Interview veterans — not about heroism, about what happens after. The VA system, the transition, the mental health crisis, the broken promises.', 'The disconnect: politicians wrap themselves in the flag but vote against veteran healthcare. Name them. Show the receipts.', 'Actionable: local veteran support organizations, what listeners can do beyond "thank you for your service." Put your money and time where your mouth is.'] },
  { id: 89, title: 'The Conspiracy Episode: What\'s Real, What\'s Crazy, and How to Tell', bullets: ['An honest framework for evaluating conspiracy theories: evidence quality, source reliability, falsifiability, and who benefits from you believing it.', 'Apply it fairly: some "conspiracies" are documented fact (MKUltra, Operation Northwoods). Some are garbage. Teach people to sort the pile.', '"The government lies. That doesn\'t mean everything is a lie. The skill is knowing which is which."'] },
  { id: 90, title: 'Florida Man: Why This State Is Ground Zero for Freedom (and Chaos)', bullets: ['A love letter and a roast of Florida — the state that\'s become the epicenter of libertarian-leaning politics, for better and worse.', 'No state income tax, constitutional carry, but also insurance nightmares and HOA tyranny. Florida is America concentrated.', 'Local focus: what makes South Florida specifically unique — the immigrant hustle, the cultural collision, the energy of a place where everyone came to start over.'] },
  { id: 91, title: 'The Things Men Don\'t Talk About (But Should)', bullets: ['Health — physical and mental. Prostate checks, depression, the way men process grief by not processing it. Break the silence without being preachy.', 'Bernie\'s own experiences: whatever you\'re comfortable sharing. The power is in a strong man admitting vulnerability. That\'s real strength.', 'Resources and encouragement: normalize the doctor visit, the conversation with a friend, the admission that you\'re not okay. "Tough" doesn\'t mean "silent."'] },
  { id: 92, title: 'Start Your Own Show: The Bernie Rollins Guide to Podcasting', bullets: ['A meta-episode about the process of creating this show. Gear, software, format, the fear of starting, the liberation of publishing.', 'The message: "If a retired steel guy from Jersey can do this, so can you. You have something to say. Say it."', 'Practical checklist: what you need to launch episode 1. Make it so simple that listeners have no excuse not to start.'] },
  { id: 93, title: 'The Small Town Episode: Why Local Communities Are the Last Defense', bullets: ['Small towns as the immune system of democracy: when everyone knows each other, corruption is harder to hide, community is stronger, and civic engagement is personal.', 'The tension: economic forces are killing small towns. What\'s the path forward? Remote work, local entrepreneurship, intentional community building.', 'Visit one: take the show on the road to a small Florida town. Talk to the mayor, the shop owner, the preacher. Tell their story.'] },
  { id: 94, title: 'The 50th Birthday Episode: Wisdom from Half a Century', bullets: ['Every decade taught something different. The twenties were for energy. The thirties for building. The forties for understanding. The fifties are for truth.', 'The list: 50 lessons in 50 minutes. One per year of life. Rapid-fire, personal, some funny, some heavy.', 'This is the kind of content that lives forever. People will share it on birthdays, at graduations, when they need perspective.'] },
  { id: 95, title: 'The Accountability Mirror: Things I Need to Fix About Myself', bullets: ['Turn the lens inward. What are you still working on? What hypocrisy do you carry? Where do you fall short of your own standards?', 'This isn\'t self-flagellation — it\'s modeling the behavior. "I expect you to be honest with yourself. Let me go first."', 'Challenge listeners to do the same: write down three things about yourself you know need to change. Then change one of them.'] },
  { id: 96, title: 'Father-Son Road Trip: Recording from the Road', bullets: ['Take a trip with one of your sons. Record conversations from the car, from diners, from wherever you end up. Unstructured, organic, real.', 'Some of the best conversations happen in transit. The road removes the formality. Let the audience ride along.', 'This is the content that builds an emotional connection with the audience. They\'re not just hearing opinions — they\'re sharing a moment.'] },
  { id: 97, title: 'What Would the Founders Think?: Judging Modern America by 1776 Standards', bullets: ['Read quotes from Jefferson, Adams, Franklin, and Paine about government, liberty, and civic duty. Then apply them to current events.', 'Where would they be proud? Where would they be horrified? Be honest about both.', 'The constitutional intent vs. modern reality: "They designed a system that required engaged citizens. We gave them couch potatoes. That\'s on us."'] },
  { id: 98, title: 'New Year\'s Episode: The Bold Resolution', bullets: ['Forget losing weight. This year\'s resolution: be a better citizen. Attend 12 public meetings (one per month), read 12 books, have 12 difficult conversations.', 'Share your own resolutions. Be specific. Come back to them on the show. Let the audience hold you accountable.', 'The audience resolution wall: listeners submit their bold resolutions. Read them on air. Check in quarterly. Build a community of people actually doing something.'] },
  { id: 99, title: 'The Marathon Episode: 3 Hours, No Breaks, No Filter', bullets: ['One long, unedited recording session. Whatever comes up, wherever the mind goes. This is the Joe Rogan format applied to a man with a lifetime of experience.', 'This is the episode for the ride-or-die fans — the ones who listen to everything and want more. Give them the full, unfiltered Bernie experience.', 'Timestamp it and clip it. A 3-hour episode produces 20+ short clips for social media. It\'s a content factory disguised as a conversation.'] },
  { id: 100, title: 'Season Finale: "Freedom Lies in Being Bold" — The Mission Statement', bullets: ['Look back at the season, the growth, the feedback, the moments that mattered. What worked, what didn\'t, and what\'s coming next.', 'Restate the mission with the weight of everything that\'s been said: "This show exists because regular people with real experience have something the professional commentators don\'t — the truth that comes from living it."', 'The call to action: "Don\'t just listen. Do. Build something. Question something. Show up somewhere. Freedom lies in being bold. Season 2 starts next week. Bring a friend."'] },
]


// ─── COMPONENT ──────────────────────────────

function EpisodeCard({ ep, isOpen, toggle }: { ep: Episode; isOpen: boolean; toggle: () => void }) {
  return (
    <div className="border border-border rounded-sm overflow-hidden bg-white">
      <button
        onClick={toggle}
        className="w-full text-left px-6 py-5 flex items-start gap-4 hover:bg-parchment/50 transition-colors"
      >
        <span className="flex-shrink-0 w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-sans text-sm font-bold">
          {ep.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`font-sans text-[0.55rem] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-sm ${
              ep.format === 'solo' ? 'bg-ink/10 text-ink' :
              ep.format === 'guest' ? 'bg-amber-100 text-amber-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {ep.format === 'solo' ? 'Solo' : ep.format === 'guest' ? 'Guest' : 'Call-In'}
            </span>
            <span className="font-sans text-[0.55rem] text-ink-faint">{ep.duration}</span>
          </div>
          <h3 className="font-display text-lg font-bold text-ink leading-snug">{ep.title}</h3>
          <p className="font-body text-sm text-ink-muted mt-1 leading-relaxed">{ep.hook}</p>
        </div>
        <svg className={`w-5 h-5 flex-shrink-0 text-ink-faint mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-border/50">
          {ep.segments.map((seg, i) => (
            <div key={i} className="mt-5">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-sans text-xs font-bold tracking-[0.05em] uppercase text-ink">{seg.name}</h4>
                <span className="font-sans text-[0.55rem] text-ink-faint">({seg.minutes})</span>
              </div>
              <ul className="space-y-2">
                {seg.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2 text-sm text-ink-muted leading-relaxed">
                    <span className="flex-shrink-0 text-ink/30 mt-0.5">&bull;</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SuggestionRow({ s }: { s: Suggestion }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-parchment/30 transition-colors"
      >
        <span className="flex-shrink-0 font-mono text-xs text-ink-faint w-8 text-right">{s.id}.</span>
        <span className="font-body text-sm text-ink flex-1">{s.title}</span>
        <svg className={`w-4 h-4 text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-4 pb-4 pl-16">
          <ul className="space-y-2">
            {s.bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-muted leading-relaxed">
                <span className="flex-shrink-0 text-ink/30 mt-0.5">&bull;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const CATEGORIES = [
  { label: 'Power & Money', range: [1, 15] as const },
  { label: 'Civic Duty & Citizenship', range: [16, 30] as const },
  { label: 'Media, Truth & Propaganda', range: [31, 45] as const },
  { label: 'Personal Finance & Independence', range: [46, 60] as const },
  { label: 'Family, Culture & Values', range: [61, 75] as const },
  { label: 'The Bold 25: High-Impact Episodes', range: [76, 100] as const },
]

export default function BernieShowPage() {
  const [openEp, setOpenEp] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    setMetaTags({
      title: 'The Bernie Rollins Show | Veritas Press',
      description: 'Freedom Lies in Being Bold. A podcast by Bernie Rollins.',
      url: 'https://veritasworldwide.com/bernie',
    })
    // Set noindex
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
    return () => {
      clearMetaTags()
      if (robots) robots.setAttribute('content', 'index, follow')
    }
  }, [])

  const catSuggestions = SUGGESTIONS.filter(
    s => s.id >= CATEGORIES[activeCategory].range[0] && s.id <= CATEGORIES[activeCategory].range[1]
  )

  return (
    <>
      {/* SEO — noindex private page */}

      {/* ── HERO ── */}
      <section className="relative bg-ink text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)',
        }} />
        <div className="relative max-w-5xl mx-auto px-6 py-16 sm:py-24 text-center">
          {/* Mic icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-white/20 mb-6">
            <svg className="w-10 h-10 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a3 3 0 00-3 3v7a3 3 0 006 0V4a3 3 0 00-3-3z" />
            </svg>
          </div>
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.25em] uppercase text-white/40 mb-4">
            A Veritas Press Production
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
            The Bernie Rollins Show
          </h1>
          <p className="font-serif text-xl sm:text-2xl italic text-white/60 mb-8">
            &ldquo;Freedom Lies in Being Bold&rdquo;
          </p>
          <div className="flex items-center justify-center gap-6 text-white/40 font-sans text-xs tracking-[0.1em] uppercase">
            <span>Podcast</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>Weekly</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>No Filter</span>
          </div>
        </div>
      </section>

      {/* ── ABOUT THE HOST ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0 w-32 h-32 rounded-full bg-ink/5 border-2 border-ink/10 flex items-center justify-center">
            <span className="font-display text-4xl font-bold text-ink/20">BR</span>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-ink mb-3">Meet Your Host</h2>
            <p className="font-body text-base text-ink-muted leading-relaxed mb-4">
              Bernie Rollins is a retired steel company owner, born and raised in New Jersey, who built his business in North Carolina before settling in South Florida with his family. A father, an entrepreneur, and a citizen who believes the documentary record belongs to the people — not the powerful.
            </p>
            <p className="font-body text-base text-ink-muted leading-relaxed mb-4">
              An early Ron Paul supporter in 2008, Bernie saw through the two-party illusion before it was fashionable. He taught his sons to think for themselves, question everything, and never assume they aren't the ones being given the propaganda.
            </p>
            <p className="font-body text-base text-ink-muted leading-relaxed">
              He's the first to tell you he could never run for office — <em>"I've said too much shit"</em> — but that's exactly why people listen. No sponsors to protect. No party to serve. No filter. Just a man with a lifetime of experience and a microphone.
            </p>
          </div>
        </div>
      </section>

      {/* ── SHOW FORMAT ── */}
      <section className="bg-parchment border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-ink mb-8 text-center">The Format</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', title: 'Solo Episodes', desc: 'Bernie breaks down a topic with the directness of a man who\'s signed both sides of a paycheck. No teleprompter. No script. Just preparation and truth.' },
              { icon: '🤝', title: 'Guest Conversations', desc: 'Kitchen-table interviews with real people — business owners, veterans, local officials, everyday Americans with firsthand experience in the systems that shape our lives.' },
              { icon: '📞', title: 'Listener Call-Ins', desc: 'Open the lines. Whatever you want to ask, whatever you want to say. Unscripted, unfiltered, and occasionally unpredictable.' },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-border rounded-sm p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-sans text-sm font-bold tracking-[0.05em] uppercase text-ink mb-2">{f.title}</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-ink/5 border border-ink/10 rounded-sm text-center">
            <p className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink/50 mb-2">Production Setup</p>
            <p className="font-body text-sm text-ink-muted leading-relaxed max-w-2xl mx-auto">
              Record from a home podcast studio in South Florida. All Bernie needs to do is hit record, have the conversation, and send the file. Production, editing, publishing, and distribution across all platforms are handled by the Veritas Press team.
            </p>
          </div>
        </div>
      </section>

      {/* ── FIRST 5 EPISODES ── */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-2">Launch Arc</p>
          <h2 className="font-display text-3xl font-bold text-ink mb-3">The First Five Episodes</h2>
          <p className="font-body text-base text-ink-muted max-w-xl mx-auto">
            A five-episode arc that introduces the host, establishes the tone, and proves why this show needs to exist. Each episode builds on the last — from origin story to manifesto.
          </p>
        </div>
        <div className="space-y-3">
          {EPISODES.map(ep => (
            <EpisodeCard
              key={ep.number}
              ep={ep}
              isOpen={openEp === ep.number}
              toggle={() => setOpenEp(openEp === ep.number ? null : ep.number)}
            />
          ))}
        </div>
      </section>

      {/* ── 100 SUGGESTIONS ── */}
      <section className="bg-parchment border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-ink-faint mb-2">Episode Vault</p>
            <h2 className="font-display text-3xl font-bold text-ink mb-3">100 Episode Ideas</h2>
            <p className="font-body text-base text-ink-muted max-w-xl mx-auto">
              Two years of content, organized by theme. Each idea includes three detailed bullet points — enough to build a full episode. Click any title to expand.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(i)}
                className={`font-sans text-xs tracking-[0.05em] px-4 py-2 rounded-sm border transition-colors ${
                  activeCategory === i
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-ink-muted border-border hover:border-ink/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Suggestion list */}
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            {catSuggestions.map(s => (
              <SuggestionRow key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="font-display text-3xl font-bold text-ink mb-4">
          This Is What It Could Be, Dad.
        </h2>
        <p className="font-body text-lg text-ink-muted leading-relaxed mb-6 max-w-lg mx-auto">
          A microphone. A lifetime of experience. No filter, no sponsors, no permission needed. Just you, saying what needs to be said — the way only you can say it.
        </p>
        <p className="font-serif text-xl italic text-ink/60">
          &ldquo;Freedom lies in being bold.&rdquo;
        </p>
        <p className="font-sans text-sm text-ink-faint mt-8">
          All you have to do is hit record. We handle the rest.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-ink-muted hover:text-ink transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Veritas Press
          </Link>
        </div>
      </section>
    </>
  )
}
