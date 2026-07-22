// First-party editorial chapter imagery (Veritas Worldwide)
// Each chapter gets 1-3 key images of people, events, or documents
import { getPreferredImageSrc } from '../lib/imageSources'
import { ISRAEL_DOSSIER_CHAPTER_15 } from './israelDossierCanon'

export interface ChapterImage {
  src: string
  alt: string
  caption: string
  credit: string
}

const rawChapterImages: Record<string, ChapterImage[]> = {
  foreword: [
    {
      src: '/chapters/heroes/foreword.jpg',
      alt: "The National Archives Building in Washington, D.C., viewed from Pennsylvania Avenue — the repository of America's founding documents and declassified government records",
      caption: 'The National Archives Building, Washington, D.C. — where the primary source documents cited throughout this publication are preserved and publicly accessible.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  overview: [
    {
      src: '/chapters/heroes/overview.jpg',
      alt: 'The United States Capitol Building — seat of the United States Congress and center of American legislative power',
      caption: 'The institutions that govern modern life — financial, political, pharmaceutical, and intelligence — form an interconnected architecture documented through primary sources.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-1': [
    {
      src: '/chapters/heroes/chapter-1.jpg',
      alt: 'Bank of England building',
      caption: 'The Bank of England, established in 1694 — the model for modern central banking.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
    {
      src: '/chapters/heroes/chapter-1.jpg',
      alt: 'Portrait of Mayer Amschel Rothschild',
      caption: 'Mayer Amschel Rothschild (1744–1812), founder of the Rothschild banking dynasty.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-2': [
    {
      src: '/chapters/heroes/chapter-2.jpg',
      alt: 'Portrait of President Andrew Jackson',
      caption: 'Andrew Jackson vetoed the recharter of the Second Bank of the United States in 1832.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-3': [
    {
      src: '/chapters/heroes/chapter-3.jpg',
      alt: 'Jekyll Island Club, early 1900s',
      caption: 'The Jekyll Island Club, where six men met in secret in 1910 to draft the Federal Reserve Act.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
    {
      src: '/chapters/heroes/chapter-3.jpg',
      alt: 'Senator Nelson Aldrich',
      caption: 'Sen. Nelson Aldrich organized the Jekyll Island conference and championed the Aldrich Plan.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-4': [
    {
      src: '/chapters/heroes/chapter-4.jpg',
      alt: 'Paul Warburg',
      caption: 'Paul Warburg, German-born banker who was central to designing the Federal Reserve System.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-5': [
    {
      src: '/chapters/heroes/chapter-5.jpg',
      alt: 'Henry Ford, 1919',
      caption: 'Henry Ford in 1919 — industrialist, innovator, and publisher of The Dearborn Independent.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-6': [
    {
      src: '/chapters/heroes/chapter-6.jpg',
      alt: 'The Balfour Declaration of 1917 — the letter from British Foreign Secretary Arthur Balfour to Lord Rothschild pledging British support for a Jewish homeland in Palestine',
      caption: 'The Balfour Declaration, November 2, 1917 — a 67-word letter from British Foreign Secretary Arthur Balfour to Lord Walter Rothschild that would reshape the Middle East for the next century.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-7': [
    {
      src: '/chapters/heroes/chapter-7.jpg',
      alt: "Former headquarters of the Mossad, Israel's national intelligence agency",
      caption: 'The Mossad — HaMossad leModiʿin uleTafkidim Meyuḥadim (the Institute for Intelligence and Special Operations) — operates as one of the most effective intelligence agencies in the world.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-8': [
    {
      src: '/chapters/heroes/chapter-8.jpg',
      alt: 'President John F. Kennedy, official White House portrait',
      caption: 'President Kennedy confronted Israel over the Dimona nuclear reactor and sought to regulate AIPAC.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-9': [
    {
      src: '/chapters/heroes/chapter-9.jpg',
      alt: 'Dealey Plaza, Dallas, Texas',
      caption: 'Dealey Plaza, Dallas — the site of President Kennedy\'s assassination on November 22, 1963.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-10': [
    {
      src: '/chapters/heroes/chapter-10.jpg',
      alt: 'Henry Kissinger',
      caption: 'Henry Kissinger negotiated the petrodollar agreement with Saudi Arabia in 1974.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-11': [
    {
      src: '/chapters/heroes/chapter-11.jpg',
      alt: 'The Harold Pratt House in New York City, headquarters of the Council on Foreign Relations',
      caption: 'The Harold Pratt House, 58 East 68th Street, New York — headquarters of the Council on Foreign Relations since 1945. CFR membership has included virtually every Secretary of State, Treasury, and Defense since its founding.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-12': [
    {
      src: '/chapters/heroes/chapter-12.jpg',
      alt: 'Federal Reserve Building, Washington D.C.',
      caption: 'The Eccles Building — headquarters of the Federal Reserve Board of Governors in Washington, D.C.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-13': [
    {
      src: '/chapters/heroes/chapter-13.jpg',
      alt: 'New York Stock Exchange on Wall Street',
      caption: 'The New York Stock Exchange — epicenter of the 2008 financial crisis.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-14': [
    {
      src: '/chapters/heroes/chapter-14.jpg',
      alt: 'The United States Capitol Building — where AIPAC-funded representatives shape American foreign policy',
      caption: 'The United States Capitol. In the 2024 election cycle, AIPAC directed $42.6 million to 489 congressional candidates across both parties — making it the most powerful foreign policy lobby in America.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-15': [
    {
      src: '/chapters/heroes/chapter-15.jpg',
      alt: 'U.S. foreign aid and the Israel evidence record',
      caption: 'Primary-source accounting of U.S. aid obligations — continue in the interactive Israel Dossier.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-16': [
    {
      src: '/chapters/heroes/chapter-16.jpg',
      alt: 'USS Liberty',
      caption: 'USS Liberty (AGTR-5) — attacked by Israeli forces on June 8, 1967, killing 34 American servicemen.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-17': [
    {
      src: '/chapters/heroes/chapter-17.jpg',
      alt: 'Robert F. Kennedy',
      caption: 'Sen. Robert F. Kennedy, assassinated June 5, 1968, while campaigning for president.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-18': [
    {
      src: '/chapters/heroes/chapter-18.jpg',
      alt: 'Senator Frank Church',
      caption: 'Sen. Frank Church chaired the 1975 committee that exposed Operation Mockingbird and other CIA abuses.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-19': [
    {
      src: '/chapters/heroes/chapter-19.jpg',
      alt: 'Allen Dulles, CIA Director',
      caption: 'Allen Dulles served as CIA Director from 1953–1961 and oversaw the MKUltra program.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-20': [
    {
      src: '/chapters/heroes/chapter-20.jpg',
      alt: 'Rockefeller Center, New York City — symbol of the Rockefeller family\'s influence on American institutions',
      caption: 'Rockefeller Center, New York City. The Rockefeller Foundation\'s 1910 Flexner Report reshaped American medical education to favor pharmaceutical treatment — a system that generates $4.5 trillion annually.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-21': [
    {
      src: '/chapters/heroes/chapter-21.jpg',
      alt: 'Doctor administering a typhoid inoculation at a rural school in Texas, 1943',
      caption: 'A physician administering a typhoid inoculation at a rural school in San Augustine County, Texas, 1943. The history of vaccination in America involves both genuine public health advances and documented corporate conflicts of interest.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-22': [
    {
      src: '/chapters/heroes/chapter-22.jpg',
      alt: 'World Trade Center on September 11, 2001',
      caption: 'The World Trade Center towers after being struck on the morning of September 11, 2001.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-23': [
    {
      src: '/chapters/heroes/chapter-23.jpg',
      alt: 'President Richard Nixon at a press briefing — architect of the War on Drugs',
      caption: 'President Nixon declared drug abuse "public enemy number one" in 1971. A former domestic policy advisor later admitted the War on Drugs was designed to target anti-war and Black communities.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-24': [
    {
      src: '/chapters/heroes/chapter-24.jpg',
      alt: 'Water treatment facility with flocculators and sedimentation basins — where fluoride is added to public water supplies',
      caption: 'A municipal water treatment facility. Since 1945, fluoride — an industrial byproduct — has been added to public water supplies across the United States, a practice that remains controversial among researchers.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-25': [
    {
      src: '/chapters/heroes/chapter-25.jpg',
      alt: 'RMS Titanic',
      caption: 'RMS Titanic departing Southampton, April 10, 1912. Three prominent opponents of the Federal Reserve were aboard.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-26': [
    {
      src: '/chapters/heroes/chapter-26.jpg',
      alt: 'The Owl Shrine at Bohemian Grove, photographed in 1986',
      caption: 'The 40-foot owl shrine at Bohemian Grove, the private retreat in the redwoods of Northern California where American presidents, defense contractors, and media moguls gather each summer.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-27': [
    {
      src: '/chapters/heroes/chapter-27.jpg',
      alt: 'Edward Snowden',
      caption: 'Edward Snowden, former NSA contractor who exposed mass government surveillance in 2013.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  'chapter-28': [
    {
      src: '/chapters/heroes/chapter-28.jpg',
      alt: 'Southern District of New York courthouse',
      caption: 'The U.S. District Court for the Southern District of New York, where Epstein cases were filed.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
  epilogue: [
    {
      src: '/chapters/heroes/epilogue.jpg',
      alt: 'The Main Reading Room of the Library of Congress in Washington, D.C.',
      caption: 'The Main Reading Room, Library of Congress. Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.',
      credit: 'Editorial illustration · Veritas Worldwide',
    },
  ],
}

export const chapterImages: Record<string, ChapterImage[]> = Object.fromEntries(
  Object.entries(rawChapterImages).map(([chapterId, images]) => [
    chapterId,
    images.map((image) => ({
      ...image,
      src: getPreferredImageSrc(image.src) || image.src,
    })),
  ])
) as Record<string, ChapterImage[]>

export function getChapterImages(chapterId: string): ChapterImage[] {
  return chapterImages[chapterId] || []
}
