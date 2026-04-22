import fs from 'fs'
import path from 'path'

const BOT_UA = /googlebot|bingbot|yandexbot|baiduspider|duckduckbot|facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|redditbot|applebot|semrushbot|ahrefsbot|mj12bot/i
const SITE_URL = 'https://veritasworldwide.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

function getChapterMeta(slug) {
  const chapters = {
    foreword: { title: 'A Note on Methodology, Evidence Standards & How to Read This Book', desc: 'This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and ve' },
    overview: { title: 'The World Today', desc: 'How a convergence of financial, political, pharmaceutical, and intelligence systems created the architecture of modern control — and why most people never notic' },
    'chapter-1': { title: 'The Birth of Central Banking', desc: "From the Frankfurt ghetto to the Bank of England, from Napoleon's wars to the halls of the United States Congress, the story of how private banking dynasties ca" },
    'chapter-2': { title: 'The Bank War & The Presidents Who Fought Back', desc: 'Four American presidents took on the banking establishment. Three were assassinated. One survived an assassination attempt that should have killed him.' },
    'chapter-3': { title: 'Jekyll Island & the Creation of the Federal Reserve', desc: "In November 1910, six men representing a quarter of the world's wealth boarded a private rail car in New Jersey. Their destination: a private island off the c" },
    'chapter-4': { title: 'The Warburg Brothers & World War I', desc: "Two brothers from one of Europe's most powerful banking families found themselves on opposite sides of the Great War — one advising the Kaiser, the other shap" },
    'chapter-5': { title: 'Henry Ford, The International Jew & the Gold Standard', desc: 'The industrialist who built the American middle class also published the most controversial newspaper series in American history — and his warnings about the go' },
    'chapter-6': { title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', desc: 'The documented history of the political movement that would reshape the Middle East and redefine the relationship between religion, nationalism, and geopolitics' },
    'chapter-7': { title: 'Mossad: The Institute', desc: 'The intelligence agency that operates by its own rules — from covert assassinations to nuclear espionage, documented through declassified files and sworn testim' },
    'chapter-8': { title: 'JFK, Dimona & AIPAC', desc: "President Kennedy's documented confrontation with Israel's secret nuclear program and the lobby that would reshape American foreign policy." },
    'chapter-9': { title: 'JFK — Expanded Analysis', desc: 'A comprehensive examination of the evidence surrounding the assassination of President John F. Kennedy, including declassified documents released through 2025.' },
    'chapter-10': { title: 'The Petrodollar System', desc: 'How a secret agreement between Henry Kissinger and the Saudi royal family created the foundation of American economic hegemony — and why it is now unraveling.' },
    'chapter-11': { title: 'Shadow Institutions — Bilderberg, CFR, Trilateral Commission & the BIS', desc: "The private organizations where the world's most powerful people meet behind closed doors — documented through leaked attendee lists, founding charters, and t" },
    'chapter-12': { title: 'How the Federal Reserve Works', desc: 'A plain-English explainer on the institution that controls the American money supply, who owns it, and how it operates — stripped of jargon and presented with p' },
    'chapter-13': { title: 'The 2008 Financial Crisis', desc: "How Wall Street's reckless gambling crashed the global economy, how the government bailed out the banks with taxpayer money, and how no one went to prison." },
    'chapter-14': { title: 'AIPAC & Congressional Lobbying', desc: 'The most powerful foreign policy lobby in America — how it operates, who it funds, and what happens to those who oppose it.' },
    'chapter-15': { title: 'U.S. Foreign Aid to Israel', desc: 'A comprehensive accounting of American taxpayer money sent to Israel — totaling over $300 billion in inflation-adjusted terms — and the legal framework that ena' },
    'chapter-16': { title: 'The USS Liberty Incident', desc: 'On June 8, 1967, Israeli forces attacked an American intelligence ship in international waters, killing 34 U.S. servicemen. The official investigation was class' },
    'chapter-17': { title: 'The Assassination of Robert F. Kennedy', desc: "The evidence surrounding the murder of a presidential candidate who promised to reopen his brother's assassination investigation." },
    'chapter-18': { title: 'Operation Mockingbird & CIA Media Influence', desc: 'The documented CIA program to infiltrate and influence American media — from the Cold War to the present day.' },
    'chapter-19': { title: 'MKUltra & Government Mind Control Programs', desc: "The CIA's documented program of human experimentation — using drugs, torture, and psychological manipulation on unwitting American citizens." },
    'chapter-20': { title: 'Rockefeller Medicine & the Chronic Disease Machine', desc: 'How the Rockefeller Foundation reshaped American medicine to favor pharmaceutical treatment over prevention — and the financial incentives that keep the system ' },
    'chapter-21': { title: 'Vaccine History — From Polio to COVID-19', desc: 'A documented history of vaccine development, the regulatory framework that governs it, and the financial incentives that shape public health policy.' },
    'chapter-22': { title: 'September 11, 2001', desc: 'The event that changed the world — examined through the official record, the 9/11 Commission Report, and the questions that remain unanswered.' },
    'chapter-23': { title: 'The War on Drugs', desc: 'How a policy designed to criminalize dissent became the longest and most expensive domestic war in American history.' },
    'chapter-24': { title: 'Fluoride & Public Water', desc: 'The documented history of water fluoridation — from its industrial origins to its adoption as public health policy.' },
    'chapter-25': { title: 'The Titanic, the Federal Reserve & the Men Who Opposed It', desc: 'Three of the wealthiest men who opposed the creation of the Federal Reserve boarded the same ship in April 1912. None of them survived.' },
    'chapter-26': { title: 'Bohemian Grove & Elite Gatherings', desc: 'Inside the private retreat where American presidents, defense contractors, and media moguls gather each summer in the redwoods of Northern California.' },
    'chapter-27': { title: 'The Surveillance State — From ECHELON to Pegasus', desc: 'The documented history of government mass surveillance — from Cold War signals intelligence to the smartphone in your pocket.' },
    'chapter-28': { title: 'The Epstein Files', desc: "The intelligence-linked operation that compromised the world's most powerful people — documented through court filings, flight logs, and the testimony of surv" },
    epilogue: { title: 'A Note on Continued Research & Primary Source Access', desc: 'Where to find the original documents, how to verify the claims in this book, and how to continue the investigation.' },
  }

  return chapters[slug] || null
}

export function registerBotMetaInjection({ app, rootDir }) {
  app.use((req, res, next) => {
    const ua = req.headers['user-agent'] || ''
    if (!BOT_UA.test(ua)) return next()

    const htmlPath = path.join(rootDir, 'dist', 'index.html')
    let html = fs.readFileSync(htmlPath, 'utf-8')

    const staticPages = {
      '/methodology': { title: 'Methodology | Veritas Worldwide', desc: 'Our four-tier source hierarchy and three-tier evidence classification system explained.' },
      '/sources': { title: 'Sources | Veritas Worldwide', desc: 'Master bibliography and source library for The Record — 500+ primary source documents.' },
      '/search': { title: 'Search | Veritas Worldwide', desc: 'Search all 31 chapters of The Record by keyword, topic, or evidence classification.' },
      '/timeline': { title: 'Timeline | Veritas Worldwide', desc: 'An interactive chronological timeline of events documented in The Record, from 1694 to present.' },
      '/analytics': { title: 'Reader Analytics | Veritas Worldwide', desc: 'Public readership analytics for The Record.' },
      '/accessibility': { title: 'Accessibility | Veritas Worldwide', desc: 'Accessibility statement and WCAG 2.1 AA compliance information for Veritas Worldwide.' },
      '/privacy': { title: 'Privacy Policy | Veritas Worldwide', desc: 'How Veritas Worldwide handles reader data, analytics, and privacy. Minimal data collection, no advertising trackers.' },
      '/terms': { title: 'Terms of Use | Veritas Worldwide', desc: 'Terms of use for Veritas Worldwide. Free and open access under Creative Commons BY-NC-SA 4.0.' },
      '/israel-dossier': { title: 'The Israel Dossier | Veritas Worldwide', desc: 'A sourced dossier covering U.S.-Israel policy, humanitarian impact, military spending, and the public record surrounding the conflict.', type: 'article' },
      '/israel-dossier/briefing': { title: 'Israel Dossier Public Briefing | Veritas Worldwide', desc: 'A source-boundary briefing generated from the populated Israel dossier workbook rows, with visible confidence limits and open questions.', type: 'article' },
      '/membership': { title: 'Membership | Veritas Worldwide', desc: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.' },
      '/deep-state': { title: 'The Deep State — The Epstein Network | Veritas Worldwide', desc: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.' },
      '/forum': { title: 'Veritas Forum | Veritas Worldwide', desc: 'Community discussion forum for truth-seekers, researchers, and investigators. Discuss The Record, share evidence, and connect with fellow citizens demanding accountability.' },
      '/profiles': { title: 'Power Profiles | Veritas Worldwide', desc: 'Sourced profiles of 235+ politicians, billionaires, lobbyists, and power brokers. Every claim cited to FEC filings, congressional records, court documents, and verified journalism.' },
      '/content-pack': { title: 'Content Packs & Brand Kit | Veritas Worldwide', desc: 'Official brand assets and social media content packs for Veritas Worldwide. Free for press, social media, and advocacy.' },
      '/news': { title: 'News | Veritas Worldwide', desc: 'Latest news and updates from Veritas Worldwide.' },
      '/donate': { title: 'Support Our Research | Veritas Worldwide', desc: 'Fund independent, source-verified investigative journalism. No party. No agenda. Just the record. Every contribution keeps the archive online and free.' },
      '/read': { title: 'Read The Record | Veritas Worldwide', desc: 'Read all 31 chapters of The Record — a documentary history spanning 1694 to present. Primary sources. Public record. Your conclusions.' },
    }

    const staticMeta = staticPages[req.path]
    if (staticMeta) {
      const staticUrl = `${SITE_URL}${req.path}`
      const staticType = staticMeta.type || 'website'
      html = html
        .replace(/<title>.*?<\/title>/, `<title>${staticMeta.title}</title>`)
        .replace(/content="The Record \| Veritas Worldwide"/g, `content="${staticMeta.title}"`)
        .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="${staticMeta.desc}"`)
        .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="${staticMeta.desc}"`)
        .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${staticUrl}"`)
        .replace(/content="website"/, `content="${staticType}"`)
    }

    const chapterMatch = req.path.match(/^\/chapter\/(.+)$/)
    if (chapterMatch) {
      const meta = getChapterMeta(chapterMatch[1])
      if (meta) {
        const chapterUrl = `${SITE_URL}/chapter/${chapterMatch[1]}`
        const chapterSlug = chapterMatch[1]
        const pngPath = path.join(rootDir, 'dist', 'og', `${chapterSlug}.png`)
        const svgPath = path.join(rootDir, 'dist', 'og', `${chapterSlug}.svg`)
        let chapterOgImage = OG_IMAGE

        if (fs.existsSync(pngPath)) {
          chapterOgImage = `${SITE_URL}/og/${chapterSlug}.png`
        } else if (fs.existsSync(svgPath)) {
          chapterOgImage = `${SITE_URL}/og/${chapterSlug}.svg`
        }

        const imgType = chapterOgImage.endsWith('.png')
          ? 'image/png'
          : chapterOgImage.endsWith('.svg')
            ? 'image/svg+xml'
            : 'image/png'

        html = html
          .replace(/<title>.*?<\/title>/, `<title>${meta.title} | The Record — Veritas Worldwide</title>`)
          .replace(/content="The Record \| Veritas Worldwide"/g, `content="${meta.title} | The Record — Veritas Worldwide"`)
          .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="${meta.desc}"`)
          .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="${meta.desc}"`)
          .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${chapterUrl}"`)
          .replace(/content="website"/, 'content="article"')
          .replace(/content="https:\/\/veritasworldwide\.com\/og-image\.png"/g, `content="${chapterOgImage}"`)
          .replace(/content="image\/png"/, `content="${imgType}"`)
      }
    }

    const profileMatch = req.path.match(/^\/profile\/(.+)$/)
    if (profileMatch) {
      const slug = profileMatch[1]
      const name = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      const profileUrl = `${SITE_URL}/profile/${slug}`

      html = html
        .replace(/<title>.*?<\/title>/, `<title>${name} — Power Profile | Veritas Worldwide</title>`)
        .replace(/content="The Record \| Veritas Worldwide"/g, `content="${name} — Power Profile | Veritas Worldwide"`)
        .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes. Every claim cited to FEC filings, congressional records, and verified journalism."`)
        .replace(/content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g, `content="Sourced profile of ${name} — donations, policy actions, network connections, and quotes."`)
        .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${profileUrl}"`)
        .replace(/content="website"/, 'content="article"')
    }

    res.send(html)
  })
}
