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

/**
 * Rewrite first-paint shell metas for bots.
 * Shell defaults (index.html): Primary Sources title + primary-source description.
 */
function applyBotPageMeta(html, { title, description, url, type = 'website', image = null, imageType = null }) {
  let out = html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    // Title variants used as og/twitter content
    .replace(/content="The Record \| Primary Sources — Veritas Worldwide"/g, `content="${title}"`)
    .replace(/content="The Record \| Veritas Worldwide"/g, `content="${title}"`)
    // Description variants (old + current first-paint shells)
    .replace(
      /content="Primary-source documentary history of power, money, and institutions\. 32 archive parts, 500\+ citations, free public access\. Verify every claim yourself\."/g,
      `content="${description}"`,
    )
    .replace(
      /content="Primary-source documentary history of power, money, and institutions\. 32 archive parts, 500\+ citations, free public access\."/g,
      `content="${description}"`,
    )
    .replace(/content="Primary Sources\. Public Record\. Your Conclusions\."/g, `content="${description}"`)
    .replace(
      /content="A Documentary History of Power, Money, and the Institutions That Shaped the Modern World\."/g,
      `content="${description}"`,
    )
    .replace(
      /content="A documentary history of power, money, and the institutions that shaped the modern world\."/g,
      `content="${description}"`,
    )
    .replace(/content="https:\/\/veritasworldwide\.com"/g, `content="${url}"`)
    .replace(/content="website"/, `content="${type}"`)

  if (image) {
    out = out.replace(/content="https:\/\/veritasworldwide\.com\/og-image\.png"/g, `content="${image}"`)
  }
  if (imageType) {
    out = out.replace(/content="image\/png"/, `content="${imageType}"`)
  }
  return out
}

/**
 * Injects crawler-visible title/OG metas for known SPA routes.
 * Unknown paths must call next() so soft-404 (HTTP 404 + noindex) can run —
 * bots previously always received HTTP 200 homepage shells (Google soft-404 risk).
 *
 * @param {{ app: import('express').Express, rootDir: string, isKnownRoute?: (pathname: string) => boolean }} opts
 */
export function registerBotMetaInjection({ app, rootDir, isKnownRoute }) {
  app.use((req, res, next) => {
    const ua = req.headers['user-agent'] || ''
    if (!BOT_UA.test(ua)) return next()

    // Defer unknown paths to soft-404 catch-all (crawlers must not get 200 soft shells).
    if (typeof isKnownRoute === 'function' && !isKnownRoute(req.path)) {
      return next()
    }

    const htmlPath = path.join(rootDir, 'dist', 'index.html')
    let html = fs.readFileSync(htmlPath, 'utf-8')

    // Keep bot-visible copy aligned with client setMetaTags (SERP CTR + consistency).
    const staticPages = {
      '/methodology': {
        title: 'Methodology & Evidence Standards | The Record — Veritas Worldwide',
        desc: 'How The Record classifies evidence: Verified, Circumstantial, and Disputed. Source hierarchy, editorial standards, and independent verification guidance.',
      },
      '/sources': {
        title: 'Sources | Veritas Worldwide',
        desc: 'Master bibliography and source library for The Record — 500+ primary documents organized for independent verification.',
      },
      '/search': {
        title: 'Search | Veritas Worldwide',
        desc: 'Search The Record by keyword, topic, or evidence classification. Archive-wide discovery across chapters, profiles, and news.',
      },
      '/timeline': {
        title: 'Interactive Timeline | Veritas Worldwide',
        desc: 'Chronological timeline of The Record — 32 archive parts of primary-source history from 1694 to present.',
      },
      '/analytics': {
        title: 'Reader Analytics | The Record — Veritas Worldwide',
        desc: 'Public readership analytics for The Record — lifetime readers, daily traffic, and geographic distribution as a transparency surface.',
      },
      '/accessibility': {
        title: 'Accessibility | Veritas Worldwide',
        desc: 'Accessibility statement for Veritas Worldwide — WCAG 2.1 AA commitment, inclusive design, and how to report barriers.',
      },
      '/privacy': {
        title: 'Privacy Policy | The Record — Veritas Worldwide',
        desc: 'How Veritas Worldwide collects, uses, and protects your information. Minimal analytics, no ads, no data sales.',
      },
      '/terms': {
        title: 'Terms of Use | The Record — Veritas Worldwide',
        desc: 'Terms of use for Veritas Worldwide. Free open access; content licensed under Creative Commons BY-NC-SA 4.0.',
      },
      '/about': {
        title: 'About | Veritas Worldwide',
        desc: 'What Veritas Worldwide publishes, how it verifies claims, what stays public, and how reader funding supports the work.',
      },
      '/israel-dossier': {
        title: 'The Israel Dossier | Veritas Worldwide',
        desc: 'Sourced U.S.–Israel policy dossier: military spending, humanitarian impact, legal record, and actors — CRS, UN, ICJ primary trails.',
        type: 'article',
      },
      '/israel-dossier/briefing': {
        title: 'Israel Dossier Public Briefing | Veritas Worldwide',
        desc: 'A source-boundary briefing from populated Israel dossier workbook rows, with confidence limits and open questions.',
        type: 'article',
      },
      '/membership': {
        title: 'Membership | Veritas Worldwide',
        desc: 'Fund independent investigative journalism. No party. No agenda. Just the record. Join as a Correspondent, Investigator, or Founding Circle member.',
      },
      '/deep-state': {
        title: 'The Deep State — The Epstein Network | Veritas Worldwide',
        desc: 'Interactive Epstein network dossier: court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.',
      },
      '/forum': {
        title: 'Community Forum Beta | Veritas Worldwide',
        desc: 'Local beta forum for discussing evidence, testing reader workflows, and drafting archive conversation features.',
      },
      '/profiles': {
        title: 'Power Profiles | Veritas Worldwide',
        desc: 'Browse comprehensive profiles of influential figures, politicians, financiers, lobbyists, intelligence actors, and other power brokers.',
      },
      '/content-pack': {
        title: 'Content Packs & Brand Kit | Veritas Worldwide',
        desc: 'Official brand assets, shareable social graphics, pre-written posts, and article cards. Free for press and advocacy with attribution.',
      },
      '/media-kit': {
        title: 'Media Kit | Veritas Worldwide',
        desc: 'Download Veritas Worldwide Press logos, social banners, letterhead, and brand guidelines. Primary sources. Public record. Your conclusions.',
      },
      '/news': {
        title: 'Current Events — Primary Source Journalism | Veritas Worldwide',
        desc: 'Daily investigative reporting on power, money, and institutions. Every claim sourced to primary documents. No anonymous sources. No spin.',
      },
      '/donate': {
        title: 'Support Our Research | Veritas Worldwide',
        desc: 'Fund independent, source-verified investigative journalism. No party. No agenda. Just the record. Every contribution keeps the archive online and free.',
      },
      '/read': {
        title: 'Read The Record | Veritas Worldwide',
        desc: 'Read The Record online in full. Every chapter, source list, and archive path is open to every reader — free primary-source documentary history.',
      },
      '/topics': {
        title: 'Research Topics | Veritas Worldwide',
        desc: 'Explore Veritas Worldwide topic hubs covering the Federal Reserve, AIPAC, surveillance, JFK, the Epstein network, Israel policy, and more.',
      },
      '/institute': {
        title: 'Veritas Institute Field Manual | Veritas Worldwide',
        desc: 'Veritas Institute pairs a printable field manual for ordinary emergencies with source-backed trade, repair, preparedness, food, and healthcare-support courses.',
      },
      '/bible': {
        title: 'The Bible: History & Factual Record | Veritas Worldwide',
        desc: "Primary-source examination of the Bible's historical claims — archaeology, manuscripts, and scholarly consensus. Every claim labeled by evidence tier.",
      },
    }

    const staticMeta = staticPages[req.path]
    if (staticMeta) {
      const staticUrl = `${SITE_URL}${req.path}`
      const staticType = staticMeta.type || 'website'
      html = applyBotPageMeta(html, {
        title: staticMeta.title,
        description: staticMeta.desc,
        url: staticUrl,
        type: staticType,
      })
    }

    const chapterMatch = req.path.match(/^\/chapter\/(.+)$/)
    if (chapterMatch) {
      const meta = getChapterMeta(chapterMatch[1])
      if (meta) {
        const chapterUrl = `${SITE_URL}/chapter/${chapterMatch[1]}`
        const chapterSlug = chapterMatch[1]
        const pngPath = path.join(rootDir, 'dist', 'og', `${chapterSlug}.png`)
        const svgPath = path.join(rootDir, 'dist', 'og', `${chapterSlug}.svg`)
        const localHeroCandidates = [
          path.join(rootDir, 'dist', 'chapters', 'heroes', `${chapterSlug}.jpg`),
          path.join(rootDir, 'public', 'chapters', 'heroes', `${chapterSlug}.jpg`),
        ]
        let chapterOgImage = OG_IMAGE

        const localHero = localHeroCandidates.find((p) => fs.existsSync(p))
        if (localHero) {
          chapterOgImage = `${SITE_URL}/chapters/heroes/${chapterSlug}.jpg`
        } else if (fs.existsSync(pngPath)) {
          chapterOgImage = `${SITE_URL}/og/${chapterSlug}.png`
        } else if (fs.existsSync(svgPath)) {
          chapterOgImage = `${SITE_URL}/og/${chapterSlug}.svg`
        }

        const imgType = /\.jpe?g($|\?)/i.test(chapterOgImage)
          ? 'image/jpeg'
          : /\.webp($|\?)/i.test(chapterOgImage)
            ? 'image/webp'
            : /\.svg($|\?)/i.test(chapterOgImage)
              ? 'image/svg+xml'
              : 'image/png'

        html = applyBotPageMeta(html, {
          title: `${meta.title} | The Record — Veritas Worldwide`,
          description: meta.desc,
          url: chapterUrl,
          type: 'article',
          image: chapterOgImage,
          imageType: imgType,
        })
      }
    }

    const profileMatch = req.path.match(/^\/profile\/(.+)$/)
    if (profileMatch) {
      const slug = profileMatch[1]
      const name = slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      const profileUrl = `${SITE_URL}/profile/${slug}`
      const profileDesc = `Sourced profile of ${name} — donations, policy actions, network connections, and quotes. Every claim cited to FEC filings, congressional records, and verified journalism.`

      // Prefer first-party /profiles/* portraits (jpg then svg); fall back to site OG.
      const portraitCandidates = [
        path.join(rootDir, 'dist', 'profiles', `${slug}.jpg`),
        path.join(rootDir, 'public', 'profiles', `${slug}.jpg`),
        path.join(rootDir, 'dist', 'profiles', `${slug}.svg`),
        path.join(rootDir, 'public', 'profiles', `${slug}.svg`),
      ]
      let profileImage = OG_IMAGE
      let profileImgType = 'image/png'
      for (const candidate of portraitCandidates) {
        if (fs.existsSync(candidate)) {
          const ext = path.extname(candidate).toLowerCase()
          profileImage = `${SITE_URL}/profiles/${slug}${ext}`
          profileImgType = ext === '.svg' ? 'image/svg+xml' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'
          break
        }
      }

      html = applyBotPageMeta(html, {
        title: `${name} — Power Profile | Veritas Worldwide`,
        description: profileDesc,
        url: profileUrl,
        type: 'profile',
        image: profileImage,
        imageType: profileImgType,
      })
      // Also set twitter:image explicitly (applyBotPageMeta covers og:image via og-image.png replace)
      html = html
        .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${profileImage}$2`)
        .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${profileImage}$2`)
        .replace(/(<meta property="og:image:type" content=")[^"]*(")/, `$1${profileImgType}$2`)
    }

    // Current-events articles — title/description/hero from exported meta.json
    const newsMatch = req.path.match(/^\/news\/([^/]+)$/)
    if (newsMatch) {
      const slug = newsMatch[1]
      const candidates = [
        path.join(rootDir, 'dist', 'news', 'meta.json'),
        path.join(rootDir, 'public', 'news', 'meta.json'),
      ]
      let newsMeta = null
      for (const candidate of candidates) {
        try {
          if (fs.existsSync(candidate)) {
            const all = JSON.parse(fs.readFileSync(candidate, 'utf8'))
            if (all && all[slug]) {
              newsMeta = all[slug]
              break
            }
          }
        } catch {
          // continue
        }
      }
      if (newsMeta) {
        const newsUrl = `${SITE_URL}/news/${slug}`
        let newsImage = newsMeta.image || OG_IMAGE
        if (newsImage.startsWith('/')) newsImage = `${SITE_URL}${newsImage}`
        const imgType = /\.jpe?g($|\?)/i.test(newsImage)
          ? 'image/jpeg'
          : /\.webp($|\?)/i.test(newsImage)
            ? 'image/webp'
            : /\.svg($|\?)/i.test(newsImage)
              ? 'image/svg+xml'
              : 'image/png'
        const safeTitle = String(newsMeta.title || slug).replace(/"/g, '&quot;')
        const safeDesc = String(newsMeta.desc || '').replace(/"/g, '&quot;')
        html = applyBotPageMeta(html, {
          title: safeTitle,
          description: safeDesc,
          url: newsUrl,
          type: 'article',
          image: newsImage,
          imageType: imgType,
        })
        html = html
          .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${newsUrl}$2`)
          .replace(/(<meta property="og:type" content=")[^"]*(")/, '$1article$2')
          .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${newsImage}$2`)
          .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${newsImage}$2`)
          .replace(/(<meta property="og:image:type" content=")[^"]*(")/, `$1${imgType}$2`)
          .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${newsUrl}$2`)
      }
    }

    res.send(html)
  })
}
