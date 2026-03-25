import { useState, useEffect } from 'react'
import { setMetaTags, clearMetaTags } from '../lib/seo'

/* ─────────────────────────────────────────────
   THE BERNIE ROLLINS SHOW
   "Freedom Lies in Being Bold"
   ─ World-class podcast landing page ─
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

// ── Password Gate ──────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === 'rosie2010') {
      sessionStorage.setItem('bernie-auth', '1')
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className={`max-w-md w-full text-center transition-transform ${shake ? 'animate-pulse' : ''}`}>
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Private Access</h1>
          <p className="text-neutral-400 text-sm">Enter the password to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white text-center text-lg tracking-widest placeholder-neutral-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
          />
          {error && <p className="text-red-400 text-sm">Incorrect password. Try again.</p>}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all duration-200 tracking-wide"
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Episode Data ───────────────────────────────────────────
const EPISODES: Episode[] = [
  {
    number: 1,
    title: 'Pilot — "Nobody Asked Me, But Here I Am"',
    format: 'solo',
    duration: '55–65 min',
    hook: 'Bernie introduces himself to the world — steel company owner turned truth-seeker, Jersey kid who built something real, father who taught his sons to think for themselves. The origin story: why now, why him, and why this show needs to exist.',
    segments: [
      {
        name: 'Cold Open — "Let Me Tell You Something"',
        minutes: '5 min',
        bullets: [
          'Open with the phrase that defines the show: "Freedom lies in being bold." What it means — not a bumper sticker, but a way of living.',
          'Who Bernie Rollins is: a retired steel guy from Jersey who moved south, raised kids, built a company, and never once kept his mouth shut when it mattered.',
          'Ground rules: no sponsors to protect, no party to serve, no filter. He says what he thinks and backs it up.',
        ],
      },
      {
        name: 'Segment 1 — "How I Got Here"',
        minutes: '15 min',
        bullets: [
          'The Jersey years: growing up in a blue-collar family where opinions were loud and loyalty was everything.',
          'Building a steel company from nothing — what the business world actually teaches you about how America works.',
          'Retirement and the realization that sitting still isn\'t an option when the country is going sideways.',
        ],
      },
      {
        name: 'Segment 2 — "What I Believe"',
        minutes: '15 min',
        bullets: [
          'The core pillars: free speech, individual liberty, government accountability, and the idea that regular people deserve the truth.',
          'Why both parties have failed working Americans — and why Bernie doesn\'t play the left-right game.',
          'The moment that radicalized him: a specific story about watching the system protect itself at the expense of ordinary people.',
        ],
      },
      {
        name: 'Segment 3 — "The Boldness Test"',
        minutes: '10 min',
        bullets: [
          'Introducing the recurring segment: one topic that everyone is afraid to say out loud, handled in 10 minutes flat.',
          'Episode 1 topic: "Why your neighbor who disagrees with you isn\'t your enemy — the machine that profits from your division is."',
          'Closing philosophy: boldness isn\'t being loud, it\'s refusing to be silenced.',
        ],
      },
      {
        name: 'Sign-Off — "That\'s My Take"',
        minutes: '5 min',
        bullets: [
          'Signature closing: Bernie\'s personal challenge to the listener — one thing to think about, look up, or do before next episode.',
          'Preview of Episode 2: "Your Money Is a Lie" — a deep dive into the Federal Reserve.',
          'Call to action: share the show, leave a review, and "tell someone something bold today."',
        ],
      },
    ],
  },
  {
    number: 2,
    title: 'Your Money Is a Lie — The Federal Reserve Episode',
    format: 'solo',
    duration: '60–70 min',
    hook: 'Most Americans have no idea how money actually works in this country. Bernie breaks down the Federal Reserve — who runs it, who profits, and why your purchasing power has been stolen in broad daylight for over a century.',
    segments: [
      {
        name: 'Cold Open — "Follow the Money"',
        minutes: '5 min',
        bullets: [
          'Start with a receipt: what $100 bought in 1970 vs. today. Let the numbers do the talking.',
          'Ask the audience: "Who do you think decides what your dollar is worth? Because it\'s not Congress, and it\'s not the President."',
          'Set up the episode as a journey: "By the end of this hour, you\'ll understand the biggest legal scam in American history."',
        ],
      },
      {
        name: 'Segment 1 — "1913: The Year They Took Your Money"',
        minutes: '20 min',
        bullets: [
          'The creation of the Federal Reserve: Jekyll Island, the bankers\' secret meeting, and the legislation that changed everything.',
          'How the Fed works in plain English — money creation, interest rates, and the debt spiral that funds the machine.',
          'Who owns the Fed: the member banks, the revolving door between Wall Street and the Board of Governors, and why "federal" is the most misleading word in the name.',
        ],
      },
      {
        name: 'Segment 2 — "Inflation Is a Tax They Don\'t Vote On"',
        minutes: '15 min',
        bullets: [
          'How inflation works as a hidden tax — and why it hits retirees, savers, and working families hardest.',
          'The 2008 bailout: $700 billion to the banks, nothing to the people who lost their homes.',
          'COVID money printing: $4 trillion created in 18 months and where it actually went (hint: not your stimulus check).',
        ],
      },
      {
        name: 'Segment 3 — "The Boldness Test"',
        minutes: '10 min',
        bullets: [
          'This week\'s bold topic: "The national debt will never be repaid — and they know it. The question is who holds the bag when the music stops."',
          'Break down the $34 trillion debt in terms a regular person can understand.',
          'What it means for your grandchildren — the generational theft nobody wants to talk about.',
        ],
      },
      {
        name: 'Sign-Off — "That\'s My Take"',
        minutes: '5 min',
        bullets: [
          'Challenge: look up how much interest the U.S. pays on its debt per day (spoiler: over $2 billion).',
          'Preview of Episode 3: "They Want You Divided" — how media, big tech, and politicians manufacture outrage.',
          '"The system isn\'t broken — it\'s working exactly as designed. For them, not for you."',
        ],
      },
    ],
  },
  {
    number: 3,
    title: 'They Want You Divided',
    format: 'solo',
    duration: '60–70 min',
    hook: 'Left vs. right. Black vs. white. Vaxxed vs. unvaxxed. Every fight you\'ve been told to have is a distraction from the one fight that matters: the people vs. the machine. Bernie dismantles the division industry.',
    segments: [
      {
        name: 'Cold Open — "The Algorithm Knows"',
        minutes: '5 min',
        bullets: [
          'Open with a personal story: a Facebook argument that made Bernie realize the platform was designed to make him angry.',
          'The business model of outrage: attention = money, and anger gets more clicks than truth.',
          'The setup: "Tonight I\'m going to show you who profits every time you hate your neighbor."',
        ],
      },
      {
        name: 'Segment 1 — "Manufacturing Consent 2.0"',
        minutes: '20 min',
        bullets: [
          'How legacy media went from reporting news to programming narratives — and the six corporations that own 90% of what Americans see and hear.',
          'Big Tech\'s role: algorithmic radicalization, shadow banning, and the illusion of organic conversation.',
          'Case study: how the same event gets reported by CNN, Fox, and independent media — three completely different realities from the same facts.',
        ],
      },
      {
        name: 'Segment 2 — "The Uniparty"',
        minutes: '15 min',
        bullets: [
          'Why the two-party system is one party with two marketing departments.',
          'Follow the donor money: the same defense contractors, pharmaceutical companies, and banks fund both sides.',
          'The revolving door: Congress to lobbying to corporate boards — the career path of people who are supposed to serve you.',
        ],
      },
      {
        name: 'Segment 3 — "The Boldness Test"',
        minutes: '10 min',
        bullets: [
          'Bold topic: "Your political identity is a brand loyalty program — and you\'re not the customer, you\'re the product."',
          'Challenge listeners to name three things they agree with the "other side" on.',
          'The antidote to division: local community, face-to-face conversation, and refusing to let a screen tell you who your enemy is.',
        ],
      },
      {
        name: 'Sign-Off — "That\'s My Take"',
        minutes: '5 min',
        bullets: [
          'Challenge: turn off all news for 48 hours. See how you feel. See what you actually miss.',
          'Preview of Episode 4: "The Sons of Steel" — guest episode with both of Bernie\'s sons.',
          '"They can\'t divide people who refuse to be sorted."',
        ],
      },
    ],
  },
  {
    number: 4,
    title: 'The Sons of Steel',
    format: 'guest',
    duration: '75–90 min',
    hook: 'Bernie sits down with both of his sons for an unscripted, no-holds-barred conversation about family, legacy, and what it means to raise men who think for themselves in an age of conformity.',
    segments: [
      {
        name: 'Cold Open — "My Greatest Achievement"',
        minutes: '5 min',
        bullets: [
          'Bernie opens solo: "I built a steel company. I\'ve shaken hands with powerful people. But the only thing I ever made that mattered is sitting across from me right now."',
          'Set the tone: this isn\'t a soft family segment. This is three men who disagree, push back, and respect each other enough to do it on mic.',
          'Frame the episode: what does it look like when a father raises sons to think — not to obey?',
        ],
      },
      {
        name: 'Segment 1 — "Lessons From the Old Man"',
        minutes: '25 min',
        bullets: [
          'The sons share the lessons that stuck — and the ones they had to learn the hard way on their own.',
          'Stories from the steel business: what it taught them about work, integrity, and dealing with people who have more power than you.',
          'The moment each son realized their dad wasn\'t just opinionated — he was usually right. And the times he wasn\'t.',
        ],
      },
      {
        name: 'Segment 2 — "Where We Disagree"',
        minutes: '20 min',
        bullets: [
          'The generational divide: where the sons see things differently than their father — and why that\'s the point.',
          'Technology, social media, and the future: the sons push back on Bernie\'s skepticism, and he pushes back harder.',
          'The one issue where all three of them align completely — and why it gives them hope.',
        ],
      },
      {
        name: 'Segment 3 — "What We\'re Building"',
        minutes: '15 min',
        bullets: [
          'Each Rollins shares what they\'re working on — professional, personal, and philosophical.',
          'The family legacy question: what does the Rollins name mean in 2025, and what should it mean in 2050?',
          'A challenge to listeners: have this conversation with your own family. Record it. Send it in.',
        ],
      },
      {
        name: 'Sign-Off — "That\'s Our Take"',
        minutes: '5 min',
        bullets: [
          'A rare moment: each Rollins tells the other two something they\'ve never said on mic before.',
          'Preview of Episode 5: "Call-In Night" — the audience gets the mic for the first time.',
          '"Steel doesn\'t bend easy. Neither do we."',
        ],
      },
    ],
  },
  {
    number: 5,
    title: 'Call-In Night — "America, You\'re On"',
    format: 'call-in',
    duration: '60–75 min',
    hook: 'No script. No plan. Just Bernie, a phone line, and the American people. Callers bring the topics — immigration, guns, healthcare, the price of eggs — and Bernie gives every single one a straight answer.',
    segments: [
      {
        name: 'Cold Open — "Your Turn"',
        minutes: '5 min',
        bullets: [
          'Bernie explains the format: "I\'ve been talking for four episodes. Now it\'s your turn. Call in, tell me what\'s on your mind, and I\'ll tell you what I think. Fair?"',
          'Rules of engagement: be respectful, be honest, and don\'t waste the audience\'s time with talking points you got from a cable news chyron.',
          'Set expectations: "I might agree with you. I might not. But I\'ll never lie to you, and I\'ll never hang up on you for having a different opinion."',
        ],
      },
      {
        name: 'Segment 1 — Open Phones',
        minutes: '25 min',
        bullets: [
          'First callers: a mix of pre-screened and live calls covering 4–5 different topics.',
          'Bernie engages each caller directly — no soundboard, no producer filter. Just two people talking.',
          'Highlight moments: a caller who changes Bernie\'s mind on something small, and a caller Bernie challenges to think bigger.',
        ],
      },
      {
        name: 'Segment 2 — "The Hot Seat"',
        minutes: '15 min',
        bullets: [
          'A caller puts Bernie on the hot seat: asks him the hardest question of the night. Bernie has to answer without deflecting.',
          'The audience votes (live poll) on whether Bernie answered or dodged.',
          'If the audience says he dodged, he has to try again. No ego protection.',
        ],
      },
      {
        name: 'Segment 3 — "Last Call"',
        minutes: '10 min',
        bullets: [
          'Final caller of the night gets the extended treatment — a full 10-minute conversation on whatever matters most to them.',
          'Bernie reflects on what he heard tonight: patterns, surprises, and what it tells him about where America\'s head is at.',
          'Announce next week\'s topic and challenge the audience to submit questions via social media.',
        ],
      },
      {
        name: 'Sign-Off — "That\'s My Take"',
        minutes: '5 min',
        bullets: [
          'Recap the best moments from the calls.',
          'Preview Season 1 arc: what\'s coming in episodes 6–10.',
          '"You called. I listened. That\'s how this works. Talk to you next week."',
        ],
      },
    ],
  },
]

const CATEGORIES = [
  { key: 'government', label: 'Government & Power', icon: '🏛️' },
  { key: 'money', label: 'Money & Economy', icon: '💰' },
  { key: 'culture', label: 'Culture & Society', icon: '🎭' },
  { key: 'media', label: 'Media & Tech', icon: '📡' },
  { key: 'personal', label: 'Life & Legacy', icon: '🔥' },
  { key: 'global', label: 'Global & Foreign Policy', icon: '🌍' },
] as const

type CategoryKey = typeof CATEGORIES[number]['key']

const SUGGESTIONS: (Suggestion & { category: CategoryKey })[] = [
  { id: 1, category: 'government', title: 'The Deep State Isn\'t a Theory — It\'s an Org Chart', bullets: ['Expose the unelected bureaucrats who outlast every president', 'How career officials in the DOJ, CIA, and FBI shape policy behind closed doors', 'The classification system: how they hide what they don\'t want you to see'] },
  { id: 2, category: 'money', title: 'Why Your 401(k) Is a Trap', bullets: ['The illusion of retirement security in a rigged market', 'How Wall Street skims your savings through hidden fees', 'What the wealthy actually do with their money (hint: not index funds)'] },
  { id: 3, category: 'culture', title: 'When Did We Stop Raising Adults?', bullets: ['The participation trophy generation and the crisis of resilience', 'How overprotection became the most dangerous thing you can do to a kid', 'What blue-collar America still gets right about raising children'] },
  { id: 4, category: 'media', title: 'Your Phone Is a Surveillance Device You Paid For', bullets: ['How your data is harvested, packaged, and sold — every single day', 'The apps that listen, track, and predict your behavior', 'What happens when the government can buy what it can\'t legally surveil'] },
  { id: 5, category: 'personal', title: 'What Retirement Actually Feels Like', bullets: ['The identity crisis nobody warns you about when the work stops', 'Finding purpose when the thing that defined you is gone', 'Why the best chapter might be the one you haven\'t written yet'] },
  { id: 6, category: 'global', title: 'Why America Funds Both Sides of Every War', bullets: ['The defense industry business model: perpetual conflict', 'How foreign aid becomes weapons contracts becomes campaign donations', 'The countries making billions while Americans argue about the border'] },
  { id: 7, category: 'government', title: 'Congressional Insider Trading Is Legal — Let That Sink In', bullets: ['How members of Congress beat the market every single year', 'The STOCK Act and why it has no teeth', 'Names, dates, and trades: the receipts nobody shows you on cable news'] },
  { id: 8, category: 'money', title: 'The Housing Market Was Stolen From Your Kids', bullets: ['How BlackRock and institutional investors bought up American neighborhoods', 'Zoning laws written to keep regular people out of the market', 'What the American Dream actually costs now vs. when Bernie bought his first house'] },
  { id: 9, category: 'culture', title: 'The Death of the Neighborhood', bullets: ['How suburbs, screens, and Amazon killed community', 'Why your grandfather knew 50 neighbors and you know 3', 'The case for front porches, block parties, and giving a damn about the person next door'] },
  { id: 10, category: 'media', title: 'Fact-Checkers Are the New Censors', bullets: ['Who funds the fact-checking industry and what they\'re protecting', 'How "context" became the new way to bury inconvenient truths', 'The stories that were "misinformation" until they weren\'t'] },
  { id: 11, category: 'personal', title: 'Lessons From the Steel Yard', bullets: ['What building things with your hands teaches you about life', 'The dying art of physical work and why it matters more than a degree', 'Stories from 30 years of running a business that makes real things'] },
  { id: 12, category: 'global', title: 'China Owns More of America Than You Think', bullets: ['Farmland, ports, tech companies, and politicians: the Chinese investment map', 'How TikTok became the most effective intelligence tool in history', 'The fentanyl pipeline: China\'s undeclared chemical war on American streets'] },
  { id: 13, category: 'government', title: 'Executive Orders: How Presidents Became Kings', bullets: ['The constitutional power grab nobody stopped', 'How EOs bypass Congress and rewrite law overnight', 'The most dangerous executive orders in the last 20 years'] },
  { id: 14, category: 'money', title: 'The Student Loan Scam', bullets: ['How universities became $50,000-a-year diploma mills', 'The government-university-banking pipeline that enslaves graduates', 'Why a plumber makes more than most PhDs — and what that tells you'] },
  { id: 15, category: 'culture', title: 'Men Are Not Broken — The System Is', bullets: ['The war on masculinity and who profits from weak men', 'Why boys are failing in school, work, and relationships', 'Reclaiming what it means to be a man without apology'] },
  { id: 16, category: 'media', title: 'The Joe Rogan Effect: Why Podcasts Beat Cable', bullets: ['How long-form conversation destroyed the 3-minute soundbite', 'Why trust in independent media is skyrocketing while CNN and Fox bleed viewers', 'The blueprint: what makes a podcast actually matter'] },
  { id: 17, category: 'personal', title: 'What I\'d Tell My 25-Year-Old Self', bullets: ['The mistakes that shaped everything — and the ones that almost broke it', 'Advice on money, marriage, and the courage to bet on yourself', 'Why the best things in life came from the moments he was most afraid'] },
  { id: 18, category: 'global', title: 'The UN Is a Country Club for Dictators', bullets: ['How the United Nations became a toothless institution that enables tyranny', 'The Human Rights Council: Saudi Arabia, China, and the joke that writes itself', 'Why America keeps funding an organization that votes against it'] },
  { id: 19, category: 'government', title: 'The IRS: Your Government\'s Collection Agency', bullets: ['How the tax code was written to protect the rich and punish the middle class', 'The 87,000 new agents: who they\'re actually coming for', 'A flat tax, a fair tax, or burn it down: what actually works'] },
  { id: 20, category: 'money', title: 'Cryptocurrency: Freedom or Trap?', bullets: ['The promise of decentralized money vs. the reality of regulation', 'CBDCs: the government\'s plan to track every dollar you spend', 'What Bitcoin actually is and why they\'re afraid of it'] },
  { id: 21, category: 'culture', title: 'The Veteran Betrayal', bullets: ['22 veterans a day: the suicide crisis nobody fixed', 'How the VA became a bureaucratic hellscape that fails the people it exists to serve', 'What we owe the men and women who wrote a blank check to this country'] },
  { id: 22, category: 'media', title: 'Operation Mockingbird Never Ended', bullets: ['The CIA\'s documented history of planting stories in American media', 'Modern equivalents: intelligence community "leaks" that always serve an agenda', 'How to identify a planted story vs. actual journalism'] },
  { id: 23, category: 'personal', title: 'Marriage in America: What Went Wrong', bullets: ['Why the divorce rate reflects a culture that forgot what commitment means', 'The economic incentives that punish marriage and reward single parenthood', 'What 40+ years of marriage actually looks like — the real version'] },
  { id: 24, category: 'global', title: 'The Petrodollar Is Dying — Here\'s What Comes Next', bullets: ['How the deal with Saudi Arabia made the dollar king of the world', 'BRICS, de-dollarization, and the countries building an exit ramp from American financial dominance', 'What happens to your savings when the world stops using dollars'] },
  { id: 25, category: 'government', title: 'FISA Courts: Secret Justice in America', bullets: ['How a classified court system issues surveillance warrants with almost zero oversight', 'The 99.97% approval rate: a rubber stamp on your Fourth Amendment rights', 'The cases they got wrong — and the Americans whose lives were destroyed'] },
  { id: 26, category: 'money', title: 'Why Groceries Cost Twice What They Did in 2019', bullets: ['Supply chain manipulation, corporate consolidation, and the real drivers of food inflation', 'The four companies that control 80% of American meat processing', 'How farm subsidies benefit corporations, not farmers — and definitely not you'] },
  { id: 27, category: 'culture', title: 'The Opioid Epidemic Was a Business Plan', bullets: ['Purdue Pharma, the Sackler family, and the deliberate creation of addiction', 'How the FDA approved the crisis and the DOJ let them walk', 'The small towns that were destroyed — and the people fighting to rebuild them'] },
  { id: 28, category: 'media', title: 'Wikipedia Is Not Neutral', bullets: ['How a handful of anonymous editors control the world\'s encyclopedia', 'The political bias baked into "reliable sources" policies', 'Why you should never trust a single source for anything — including this show'] },
  { id: 29, category: 'personal', title: 'Being a Grandfather in a Crazy World', bullets: ['The joy and terror of watching your grandchildren grow up in this mess', 'What you teach vs. what the world teaches — and how to bridge the gap', 'Letters to the next generation: what matters when everything else fades'] },
  { id: 30, category: 'global', title: 'The Border Crisis Is by Design', bullets: ['Who benefits from illegal immigration — and it\'s not who you think', 'The cartel economy: human trafficking as a multi-billion dollar industry', 'What a real border solution looks like vs. the theater both parties perform'] },
  { id: 31, category: 'government', title: 'Eminent Domain: They Can Take Your House', bullets: ['The Supreme Court case that let the government seize private property for corporate profit', 'Real stories of Americans who lost their homes, farms, and businesses to "public use"', 'The legal framework that makes your property rights conditional'] },
  { id: 32, category: 'money', title: 'The Credit Score Racket', bullets: ['How three private companies control your financial destiny', 'The algorithm nobody audits and the errors that ruin lives', 'Why the credit system was designed to keep you borrowing, not building wealth'] },
  { id: 33, category: 'culture', title: 'Faith Under Fire: Religion in Modern America', bullets: ['The decline of church attendance and what filled the void', 'How politics hijacked faith — on both the left and the right', 'The case for spiritual grounding in a world that worships nothing'] },
  { id: 34, category: 'media', title: 'The Death of Local News', bullets: ['How hedge funds gutted newspapers and left communities blind', 'The connection between local news deserts and political corruption', 'What replaces journalism when the reporters are gone'] },
  { id: 35, category: 'personal', title: 'Dogs, Loyalty, and the Simple Life', bullets: ['What man\'s best friend teaches you about unconditional presence', 'The case for a slower life: fishing, dogs, and not checking your phone', 'Why the happiest people Bernie knows have the least complicated lives'] },
  { id: 36, category: 'global', title: 'NATO: Protecting Europe With Your Tax Dollars', bullets: ['How America funds 70% of NATO while Europe free-rides on your defense budget', 'The expansion question: why provoking Russia was always part of the plan', 'What a real America-first foreign policy actually looks like'] },
  { id: 37, category: 'government', title: 'The Patriot Act: Freedom Traded for Fear', bullets: ['How 9/11 gave the government the surveillance state it always wanted', 'Section 215, bulk collection, and the programs Snowden exposed', 'Why it was never about safety — and the proof is in what they didn\'t stop'] },
  { id: 38, category: 'money', title: 'Insurance Is America\'s Biggest Scam', bullets: ['Health insurance, car insurance, home insurance: you pay, they deny', 'The actuarial tables designed to maximize profit from your fear', 'Why the industry spent more on lobbying than any other sector in 2023'] },
  { id: 39, category: 'culture', title: 'The Trades: America\'s Forgotten Workforce', bullets: ['Plumbers, electricians, welders: the backbone nobody respects until the toilet breaks', 'The $1.4 trillion student debt crisis vs. the $0 debt of a licensed electrician making $90K', 'How to rebuild respect for the people who actually build things'] },
  { id: 40, category: 'media', title: 'Controlled Opposition: The Voices They Let You Hear', bullets: ['How the system creates "approved" dissenters who never threaten real power', 'The difference between performative outrage and actual resistance', 'How to tell if a commentator is challenging the system or reinforcing it'] },
  { id: 41, category: 'personal', title: 'Jersey Strong: Growing Up in the Garden State', bullets: ['The diners, the attitude, and the people who made Bernie who he is', 'Why New Jersey is the most underrated state in America — fight him', 'The old neighborhood: what happened to the places that shaped a generation'] },
  { id: 42, category: 'global', title: 'The World Economic Forum: Who Elected Them?', bullets: ['Klaus Schwab, the Great Reset, and the globalist vision for your life', 'How unelected billionaires set the agenda that your government follows', 'The "own nothing, be happy" future — and why you should be terrified'] },
  { id: 43, category: 'government', title: 'Lobbying: Legal Bribery in Washington', bullets: ['The $4 billion industry that writes the laws your representatives vote on', 'How lobbyists literally draft legislation and hand it to Congress to pass', 'The top 10 lobbying spenders and exactly what they bought'] },
  { id: 44, category: 'money', title: 'The Pension Crisis Nobody Talks About', bullets: ['State and municipal pensions that are $4 trillion underfunded', 'The public employees who will retire to broken promises', 'How politicians kicked the can for 30 years and who pays when it implodes'] },
  { id: 45, category: 'culture', title: 'Comedy Is the Last Free Speech', bullets: ['How stand-up became the only place you can tell the truth without a disclaimer', 'The comedians who got canceled for being early — and right', 'Why laughter is the most dangerous weapon against authoritarianism'] },
  { id: 46, category: 'media', title: 'Deepfakes and the End of "Seeing Is Believing"', bullets: ['The technology that can put any words in any mouth', 'What happens to democracy when video evidence becomes meaningless', 'How to verify reality in a world that can fabricate it'] },
  { id: 47, category: 'personal', title: 'The Fire Pit Philosophy', bullets: ['Why the best conversations happen around a fire with no agenda', 'The lost art of sitting still and thinking before you speak', '"Freedom lies in being bold" — the story behind the phrase that became a way of life'] },
  { id: 48, category: 'global', title: 'Africa: The Continent Everyone Exploits', bullets: ['How China, the EU, and the US compete to extract Africa\'s resources', 'The debt trap diplomacy that keeps nations dependent', 'The African leaders fighting back — and why Western media ignores them'] },
  { id: 49, category: 'government', title: 'The Two-Tiered Justice System', bullets: ['How the same crime gets different treatment based on who you are and who you know', 'Political prosecutions vs. political protections: the pattern is undeniable', 'What equal justice under law is supposed to mean — and why it doesn\'t'] },
  { id: 50, category: 'money', title: 'Social Security: The Promise They Can\'t Keep', bullets: ['The math doesn\'t work and hasn\'t for 20 years', 'How politicians raided the trust fund and left IOUs', 'What happens in 2033 when the fund runs dry — and who gets hurt first'] },
  { id: 51, category: 'culture', title: 'The Loneliness Epidemic', bullets: ['Why Americans are more connected than ever and more alone than ever', 'The health effects of isolation: worse than smoking 15 cigarettes a day', 'How to rebuild real community in a world designed to keep you scrolling'] },
  { id: 52, category: 'media', title: 'Elon, Twitter, and the Free Speech Experiment', bullets: ['What the Twitter Files revealed about government-tech censorship coordination', 'The promise and failure of X as a free speech platform', 'Can any billionaire-owned platform truly be free?'] },
  { id: 53, category: 'personal', title: 'What Football Taught Me About Life', bullets: ['Sunday in the stadium: what the game used to mean to a working-class family', 'The NFL\'s transformation from sport to corporate political theater', 'The 1985 Giants and why that era of football will never come back'] },
  { id: 54, category: 'global', title: 'The Ukraine Money Pit', bullets: ['$175 billion in aid: where did it actually go?', 'The defense contractors who are getting rich on Ukrainian blood', 'What a peace deal could look like — and who doesn\'t want one'] },
  { id: 55, category: 'government', title: 'Gerrymandering: How They Choose Their Voters', bullets: ['The art of drawing district lines to guarantee election outcomes', 'Both parties do it — but the result is the same: your vote might not matter', 'The technology that made gerrymandering a precision science'] },
  { id: 56, category: 'money', title: 'The Gig Economy Lie', bullets: ['How "be your own boss" became "work three jobs with no benefits"', 'Uber, DoorDash, and the erosion of the employer-employee relationship', 'What happened to the 40-hour week, the pension, and the gold watch'] },
  { id: 57, category: 'culture', title: 'Homeschooling: The Quiet Revolution', bullets: ['Why millions of parents pulled their kids out of the system', 'The data on homeschool outcomes vs. public school — it\'s not close', 'The movement that terrifies the education establishment'] },
  { id: 58, category: 'media', title: 'The Algorithm Doesn\'t Want You Informed — It Wants You Engaged', bullets: ['How recommendation engines radicalize moderates and isolate everyone', 'The internal documents that prove tech companies know the harm', 'What your feed would look like if it optimized for truth instead of time-on-screen'] },
  { id: 59, category: 'personal', title: 'Friendship After 60', bullets: ['Why your circle shrinks and why that might be the best thing that ever happened', 'The friends who stayed and what they have in common', 'How to be the kind of person people want to sit with at the fire pit'] },
  { id: 60, category: 'global', title: 'The Suez, Panama, and the Choke Points That Control Global Trade', bullets: ['The geography that determines who eats and who doesn\'t', 'How a single blocked canal can crash economies worldwide', 'The military strategy behind controlling waterways — and who\'s winning'] },
  { id: 61, category: 'government', title: 'The ATF, FBI, and the Alphabet Agencies', bullets: ['How federal agencies became politically weaponized institutions', 'Ruby Ridge, Waco, and the pattern of government overreach against citizens', 'The case for dramatic reform — or abolition — of agencies that answer to no one'] },
  { id: 62, category: 'money', title: 'Gold, Silver, and Real Money', bullets: ['Why precious metals have been money for 5,000 years and fiat currencies always fail', 'The case for holding physical assets in a digital world', 'How Nixon closing the gold window in 1971 changed everything'] },
  { id: 63, category: 'culture', title: 'The Second Amendment Is Non-Negotiable', bullets: ['The historical context they leave out of the gun debate', 'Why every disarmament in history preceded something worse', 'Responsible gun ownership: what it looks like and why it matters'] },
  { id: 64, category: 'media', title: 'Podcasting vs. The Machine', bullets: ['How a guy with a microphone can reach more people than a billion-dollar network', 'The democratization of media and why legacy institutions are panicking', 'What this means for the future of truth in America'] },
  { id: 65, category: 'personal', title: 'Building Something With Your Hands', bullets: ['The fire pit, the workshop, the projects that keep a man sane', 'Why creating physical things is therapy no app can replace', 'The satisfaction of looking at something and saying "I made that"'] },
  { id: 66, category: 'global', title: 'Israel, Palestine, and the War Nobody Understands', bullets: ['The history they don\'t teach: Balfour, 1948, and the origins of the conflict', 'How American foreign policy in the Middle East serves everyone but Americans', 'The human cost on both sides — and why acknowledging it isn\'t taking a side'] },
  { id: 67, category: 'government', title: 'Whistleblowers: Heroes or Traitors?', bullets: ['Snowden, Assange, Manning: the people who showed you the truth and paid for it', 'How the Espionage Act is used to silence dissent, not protect national security', 'Why a society that punishes truth-tellers is a society in decline'] },
  { id: 68, category: 'money', title: 'The Healthcare Racket', bullets: ['Why an MRI costs $400 in Japan and $4,000 in New Jersey', 'The hospital-insurance-pharma triangle that keeps prices insane', 'What other countries do differently — and why American politicians won\'t copy them'] },
  { id: 69, category: 'culture', title: 'The Fatherless Generation', bullets: ['40% of American children grow up without a father in the home', 'The cascading effects on crime, education, mental health, and poverty', 'What it takes to be present — and why it\'s the most important job a man will ever have'] },
  { id: 70, category: 'media', title: 'The Censorship Industrial Complex', bullets: ['How government, NGOs, and tech companies coordinate to suppress speech', 'The funding trails: taxpayer money financing censorship of taxpayers', 'The court cases and leaked documents that prove it\'s not a conspiracy theory'] },
  { id: 71, category: 'personal', title: 'The Music That Made Me', bullets: ['The songs, bands, and concerts that defined a generation', 'Why music used to mean something — and what happened to it', 'The playlist that tells Bernie\'s life story, decade by decade'] },
  { id: 72, category: 'global', title: 'The Cartels Run Mexico — And That\'s America\'s Problem', bullets: ['How drug cartels became the most powerful organizations in the Western Hemisphere', 'The fentanyl supply chain: from Chinese labs to Mexican cartels to American streets', 'Why no president has stopped it and what it would actually take'] },
  { id: 73, category: 'government', title: 'Term Limits: The Reform They\'ll Never Vote For', bullets: ['Why career politicians are the single biggest threat to representative democracy', 'The members of Congress who\'ve served 30, 40, even 50 years', 'How to force term limits through a convention of states'] },
  { id: 74, category: 'money', title: 'Small Business vs. Amazon: The David and Goliath Economy', bullets: ['How big tech killed Main Street and called it progress', 'The tax advantages, data monopolies, and regulatory capture that make competition impossible', 'What you can do: the buy-local movement that\'s actually working'] },
  { id: 75, category: 'culture', title: 'What Happened to Common Sense?', bullets: ['How expertise replaced wisdom and credentials replaced competence', 'The policies that defy basic logic and the people who defend them', 'Reclaiming the right to call something stupid when it\'s stupid'] },
  { id: 76, category: 'media', title: 'The YouTube Purge', bullets: ['How the biggest video platform systematically removed independent voices', 'The creators who lost everything for questioning approved narratives', 'The alternative platforms rising from the ashes — and whether they\'ll survive'] },
  { id: 77, category: 'personal', title: 'The Road Trip Episode', bullets: ['Bernie hits the road: diners, small towns, and conversations with strangers', 'What you learn about America when you get off the highway and into the heartland', 'The people the news never interviews and the stories they carry'] },
  { id: 78, category: 'global', title: 'Taiwan: The War That Could End the World', bullets: ['Why a 14,000-square-mile island is the most dangerous flashpoint on Earth', 'The semiconductor dependency: Taiwan makes 90% of the world\'s advanced chips', 'What a Chinese invasion would mean for your phone, your car, and your portfolio'] },
  { id: 79, category: 'government', title: 'The National Debt Clock Is a Bomb', bullets: ['$34 trillion and counting: what this number actually means for your family', 'Interest payments now exceed the defense budget — let that sink in', 'The point of no return: when debt service consumes the federal budget entirely'] },
  { id: 80, category: 'money', title: 'The Side Hustle Trap', bullets: ['How "hustle culture" normalized working yourself to death', 'The economic conditions that make one job not enough', 'The difference between building something and running on a hamster wheel'] },
  { id: 81, category: 'culture', title: 'Free Speech on Campus Is Dead', bullets: ['How universities went from bastions of debate to factories of conformity', 'The professors fired, students expelled, and speakers banned for wrongthink', 'What happens to a society that trains its next generation to fear ideas'] },
  { id: 82, category: 'media', title: 'The News Isn\'t New — It\'s a Script', bullets: ['The Sinclair Broadcast compilation: dozens of anchors reading the same words', 'How wire services create a single narrative distributed as "independent reporting"', 'The three questions that instantly reveal if a story is journalism or propaganda'] },
  { id: 83, category: 'personal', title: 'Cooking, Eating, and the Lost Family Table', bullets: ['Why the best conversations happened over meals nobody instagrammed', 'The Italian-American kitchen: what food means when it\'s made with love', 'A recipe segment: Bernie\'s signature dish and the story behind it'] },
  { id: 84, category: 'global', title: 'The Refugee Crisis Is a Weapon', bullets: ['How mass migration is being used to destabilize Western democracies', 'The NGOs facilitating the movement — and who funds them', 'The difference between compassion and national suicide'] },
  { id: 85, category: 'government', title: 'Qualified Immunity: The License to Abuse', bullets: ['How a legal doctrine lets government agents violate your rights without consequence', 'The Supreme Court cases that created a shield for misconduct', 'The bipartisan push to reform it — and the police unions blocking it'] },
  { id: 86, category: 'money', title: 'The Shrinkflation Scandal', bullets: ['Same price, less product: how companies steal from you in plain sight', 'The corporate doublespeak: "new packaging, same great taste"', 'A visual comparison of products then vs. now that will make your blood boil'] },
  { id: 87, category: 'culture', title: 'The American Dream: Updated or Deleted?', bullets: ['What the dream meant when Bernie\'s parents chased it vs. what it means now', 'The economic data: is upward mobility still real or just mythology?', 'How to build a life worth living even if the system is stacked against you'] },
  { id: 88, category: 'media', title: 'AI-Generated News and the Death of Trust', bullets: ['How artificial intelligence is being used to generate articles, images, and videos at scale', 'The publications already using AI to replace journalists — and not telling readers', 'What happens to democracy when you literally cannot tell what\'s real'] },
  { id: 89, category: 'personal', title: 'The People Who Shaped Me', bullets: ['Teachers, coaches, bosses, and strangers who changed the trajectory', 'The mentor who told Bernie the hardest truth he ever heard', 'Why the right words from the right person at the right time can save a life'] },
  { id: 90, category: 'global', title: 'Water Wars: The Coming Resource Crisis', bullets: ['Why fresh water will be more valuable than oil within 30 years', 'The regions already in crisis and the millions who will be displaced', 'How water privatization is turning a human right into a commodity'] },
  { id: 91, category: 'government', title: 'The Prison Industrial Complex', bullets: ['How America became the most incarcerated nation on Earth', 'Private prisons: the companies that profit from putting humans in cages', 'The school-to-prison pipeline and the communities it destroys'] },
  { id: 92, category: 'money', title: 'The Tip Economy Is Broken', bullets: ['How tipping went from a reward for great service to a subsidy for cheap employers', 'The guilt-trip screens, the 30% defaults, and the workers who still can\'t make rent', 'What a living wage would actually look like — and why restaurants won\'t pay it'] },
  { id: 93, category: 'culture', title: 'Patriotism Is Not a Dirty Word', bullets: ['The difference between loving your country and worshipping your government', 'How patriotism was hijacked by both jingoists and cynics', 'What healthy love of country looks like — critical, honest, and unshakeable'] },
  { id: 94, category: 'media', title: 'The Comment Section Is America\'s Town Hall', bullets: ['How online discourse — ugly as it is — is the closest thing we have to public debate', 'The platforms trying to shut down comments and why', 'The surprisingly wise things regular people say when they\'re not performing'] },
  { id: 95, category: 'personal', title: 'What I Got Wrong', bullets: ['Bernie\'s most honest episode: the opinions he held that turned out to be dead wrong', 'How changing your mind is a sign of strength, not weakness', 'The one thing he\'s still not sure about — and why he\'s okay with that'] },
  { id: 96, category: 'global', title: 'The Space Race 2.0: Who Owns the Stars?', bullets: ['SpaceX, Blue Origin, and the billionaire race to commercialize space', 'The legal vacuum: there are no property rights in space — yet', 'Why whoever controls orbital infrastructure controls the planet'] },
  { id: 97, category: 'government', title: 'Election Integrity: Trust but Verify', bullets: ['The legitimate concerns about election security that get dismissed as conspiracy', 'What other democracies do that America refuses to: voter ID, paper ballots, same-day results', 'How to have this conversation without being called an election denier or an election ignorer'] },
  { id: 98, category: 'money', title: 'The Inheritance Tax: Taxing Death Itself', bullets: ['How the government takes a cut of everything you built — even after you\'re gone', 'The family farms and small businesses destroyed by estate taxes', 'The argument for and against: wealth transfer vs. dynastic accumulation'] },
  { id: 99, category: 'culture', title: 'The Art of Disagreeing Without Destroying', bullets: ['How to argue like an adult in an age of children', 'The dinner table rules: passionate debate, mutual respect, and nobody leaves angry', 'Why the best relationships are forged in honest disagreement'] },
  { id: 100, category: 'personal', title: 'Season Finale — "What I Know for Sure"', bullets: ['Bernie\'s definitive list: the truths that survived every argument, every doubt, every year', 'A letter to America: what one man sees when he looks at this country with love and fury', 'The announcement: what\'s coming in Season 2, and a promise to keep being bold'] },
]

// ── Expandable Episode Card ────────────────────────────────
function EpisodeCard({ ep }: { ep: Episode }) {
  const [open, setOpen] = useState(false)
  const formatBadge = { solo: 'Solo', guest: 'Guest', 'call-in': 'Live Call-In' }
  const formatColor = { solo: 'bg-amber-500/20 text-amber-400', guest: 'bg-blue-500/20 text-blue-400', 'call-in': 'bg-emerald-500/20 text-emerald-400' }
  return (
    <div className="border border-neutral-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-colors bg-neutral-900/50">
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 flex items-start gap-4">
        <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-black text-lg">
          {ep.number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="text-white font-bold text-lg">{ep.title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${formatColor[ep.format]}`}>{formatBadge[ep.format]}</span>
          </div>
          <p className="text-neutral-400 text-sm leading-relaxed">{ep.hook}</p>
          <p className="text-neutral-500 text-xs mt-2">{ep.duration}</p>
        </div>
        <svg className={`w-5 h-5 text-neutral-500 flex-shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-neutral-800 pt-4">
          {ep.segments.map((seg, i) => (
            <div key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-500 font-semibold text-sm">{seg.name}</span>
                <span className="text-neutral-600 text-xs">({seg.minutes})</span>
              </div>
              <ul className="space-y-1.5 ml-4">
                {seg.bullets.map((b, j) => (
                  <li key={j} className="text-neutral-300 text-sm leading-relaxed before:content-['▸'] before:text-amber-500/60 before:mr-2">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Page Component ────────────────────────────────────
export default function BernieShowPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('bernie-auth') === '1')
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('government')
  const [expandedSuggestion, setExpandedSuggestion] = useState<number | null>(null)
  const [showAllEpisodes, setShowAllEpisodes] = useState(false)

  useEffect(() => {
    setMetaTags({
      title: 'The Bernie Rollins Show — Freedom Lies in Being Bold',
      description: 'Unfiltered. Unapologetic. Unstoppable. The podcast that says what everyone\'s thinking and nobody\'s saying.',
      url: 'https://veritasworldwide.com/bernie',
    })
    // noindex
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.name = 'robots'
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.content = 'noindex, nofollow'
    return () => {
      clearMetaTags()
      if (robotsMeta) robotsMeta.content = ''
    }
  }, [])

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  const filteredSuggestions = SUGGESTIONS.filter(s => s.category === activeCategory)

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image layer */}
        <div className="absolute inset-0">
          <img
            src="/images/bernie/bernie-beach.jpg"
            alt="Bernie Rollins"
            className="w-full h-full object-cover object-top"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>
        {/* Fallback gradient when no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 -z-10" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Show badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium tracking-wide uppercase">Now Streaming</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.9] mb-6">
            <span className="block text-white">THE BERNIE</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">ROLLINS SHOW</span>
          </h1>

          <p className="text-xl sm:text-2xl text-neutral-300 font-light italic mb-4">
            "Freedom Lies in Being Bold"
          </p>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Unfiltered. Unapologetic. Unstoppable. The podcast that says what everyone's thinking and nobody's saying. New episodes weekly.
          </p>

          {/* Platform buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a href="#episodes" className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25 text-sm tracking-wide uppercase">
              Listen Now
            </a>
            <a href="https://www.facebook.com/bernie.rollins.14/" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm tracking-wide uppercase flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Follow on Facebook
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex justify-center gap-8 sm:gap-12 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">100+</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wider">Episodes Planned</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">5</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wider">Ready to Record</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">0</div>
              <div className="text-neutral-500 text-xs uppercase tracking-wider">Filters</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-500"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
        </div>
      </section>

      {/* ═══════════ ABOUT THE HOST ═══════════ */}
      <section className="py-24 px-4 border-t border-neutral-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo side */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <img
                  src="/images/bernie/bernie-firepit.jpg"
                  alt="Bernie Rollins at the fire pit"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    el.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                    const placeholder = document.createElement('div')
                    placeholder.className = 'text-center p-8'
                    placeholder.innerHTML = '<div class="text-6xl mb-4">🔥</div><div class="text-neutral-500 text-sm">Photo coming soon</div>'
                    el.parentElement!.appendChild(placeholder)
                  }}
                />
              </div>
              {/* Quote overlay */}
              <div className="absolute -bottom-6 -right-4 sm:right-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-4 shadow-2xl shadow-amber-500/20 max-w-[280px]">
                <p className="text-white font-bold text-sm italic">"Freedom Lies in Being Bold"</p>
                <p className="text-amber-100 text-xs mt-1">— The fire pit where it all started</p>
              </div>
            </div>

            {/* Bio side */}
            <div>
              <h2 className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">Meet Your Host</h2>
              <h3 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">Bernie Rollins</h3>
              <div className="space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Steel company owner. Jersey native. Father. Grandfather. The kind of man who builds things with his hands and says what he thinks with his whole chest.
                </p>
                <p>
                  After decades of running a steel fabrication business, raising a family, and watching the country he loves get pulled apart by people who profit from division, Bernie decided to stop yelling at the TV and start a microphone.
                </p>
                <p>
                  The Bernie Rollins Show is what happens when a regular American with extraordinary opinions gets a platform. No teleprompter. No publicist. No sacred cows. Just one man, a mic, and the truth as he sees it.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="https://www.facebook.com/bernie.rollins.14/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-medium text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Follow Bernie on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SHOW FORMAT ═══════════ */}
      <section className="py-24 px-4 bg-neutral-950 border-t border-neutral-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">The Format</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white">Three Ways to Get Bold</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎙️', title: 'Solo Episodes', desc: 'Bernie goes deep on one topic. No guests, no distractions. Just research, receipts, and raw opinion. 55–70 minutes of one man vs. the machine.', badge: 'Weekly' },
              { icon: '🤝', title: 'Guest Episodes', desc: 'Long-form conversations with people who actually know what they\'re talking about — whistleblowers, veterans, entrepreneurs, and the occasional family member.', badge: 'Bi-Weekly' },
              { icon: '📞', title: 'Call-In Nights', desc: 'America gets the mic. Call in, speak your mind, and get a straight answer. No screeners, no delay, no mercy. Pure unscripted democracy.', badge: 'Monthly' },
            ].map((f, i) => (
              <div key={i} className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-amber-500/30 transition-colors group">
                <div className="text-4xl mb-4">{f.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <h4 className="text-xl font-bold text-white">{f.title}</h4>
                  <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full">{f.badge}</span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GIANTS TICKET INTERSTITIAL ═══════════ */}
      <section className="py-16 px-4 border-t border-neutral-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-48 h-auto rounded-lg overflow-hidden border border-neutral-700 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
              <img
                src="/images/bernie/bernie-giants-ticket.jpg"
                alt="1985 NY Giants ticket stub"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
              />
            </div>
          </div>
          <div>
            <p className="text-neutral-500 text-xs uppercase tracking-widest mb-2">From the Archives</p>
            <p className="text-xl sm:text-2xl text-white font-light italic leading-relaxed">
              "I've had that Giants ticket since November 10, 1985. Section 213, Row 10, Seat 17. Seventeen bucks to watch football in a stadium full of people who actually knew their neighbors. That's the America I'm fighting for."
            </p>
            <p className="text-amber-500 text-sm mt-3 font-medium">— Bernie Rollins, Episode 53: "What Football Taught Me About Life"</p>
          </div>
        </div>
      </section>

      {/* ═══════════ EPISODES ═══════════ */}
      <section id="episodes" className="py-24 px-4 border-t border-neutral-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">Season One</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-4">The First Five</h3>
            <p className="text-neutral-400 max-w-xl mx-auto">Fully produced episodes with segment breakdowns, talking points, and the bold takes that set the tone for everything that follows.</p>
          </div>
          <div className="space-y-4">
            {EPISODES.map(ep => <EpisodeCard key={ep.number} ep={ep} />)}
          </div>
        </div>
      </section>

      {/* ═══════════ 100 EPISODE IDEAS ═══════════ */}
      <section className="py-24 px-4 bg-neutral-950 border-t border-neutral-800/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm uppercase tracking-[0.2em] text-amber-500 font-semibold mb-3">The Roadmap</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-4">100 Episodes. Zero Filler.</h3>
            <p className="text-neutral-400 max-w-xl mx-auto">Every episode idea for the first two seasons — organized by theme. Each one researched, structured, and ready to record.</p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setExpandedSuggestion(null) }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-neutral-800/50 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Episode list */}
          <div className="space-y-2">
            {filteredSuggestions.map(s => (
              <div key={s.id} className="border border-neutral-800 rounded-lg overflow-hidden hover:border-neutral-700 transition-colors">
                <button
                  onClick={() => setExpandedSuggestion(expandedSuggestion === s.id ? null : s.id)}
                  className="w-full text-left px-5 py-4 flex items-center gap-4"
                >
                  <span className="text-amber-500/60 text-xs font-mono w-8 flex-shrink-0">#{String(s.id).padStart(3, '0')}</span>
                  <span className="text-white font-medium flex-1">{s.title}</span>
                  <svg className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform ${expandedSuggestion === s.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expandedSuggestion === s.id && (
                  <div className="px-5 pb-4 pt-0">
                    <ul className="space-y-1.5 ml-8">
                      {s.bullets.map((b, i) => (
                        <li key={i} className="text-neutral-400 text-sm before:content-['▸'] before:text-amber-500/40 before:mr-2">{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Total count */}
          <div className="text-center mt-10">
            <p className="text-neutral-500 text-sm">
              Showing {filteredSuggestions.length} episodes in <span className="text-amber-400">{CATEGORIES.find(c => c.key === activeCategory)?.label}</span> — {SUGGESTIONS.length} total across all categories
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════ CTA / SUBSCRIBE ═══════════ */}
      <section className="py-24 px-4 border-t border-neutral-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-600/5" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="text-6xl mb-6">🔥</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Bold Isn't a Volume Level.<br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">It's a Decision.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            New episodes drop weekly. Subscribe wherever you listen. Follow Bernie on Facebook for behind-the-scenes content, live updates, and the occasional rant that didn't make it to air.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://www.facebook.com/bernie.rollins.14/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-full hover:from-amber-400 hover:to-orange-500 transition-all shadow-lg shadow-amber-500/25 text-sm tracking-wide uppercase flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Follow on Facebook
            </a>
            <a href="#episodes" className="px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm tracking-wide uppercase">
              Browse All Episodes
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-12 px-4 border-t border-neutral-800/50 text-center">
        <p className="text-neutral-600 text-sm">
          &copy; {new Date().getFullYear()} The Bernie Rollins Show. All rights reserved.
        </p>
        <p className="text-neutral-700 text-xs mt-2">Freedom Lies in Being Bold.</p>
      </footer>

    </div>
  )
}
