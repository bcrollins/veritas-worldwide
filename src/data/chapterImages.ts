// Historical images from Wikimedia Commons (public domain / CC)
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
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/US_National_Archives_Building.jpg/1280px-US_National_Archives_Building.jpg',
      alt: "The National Archives Building in Washington, D.C., viewed from Pennsylvania Avenue — the repository of America's founding documents and declassified government records",
      caption: 'The National Archives Building, Washington, D.C. — where the primary source documents cited throughout this publication are preserved and publicly accessible.',
      credit: 'Photo: National Archives, Public Domain via Wikimedia Commons',
    },
  ],
  overview: [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Times_Square_Ball_from_above.jpg/1280px-Times_Square_Ball_from_above.jpg',
      alt: 'The United States Capitol Building — seat of the United States Congress and center of American legislative power',
      caption: 'The institutions that govern modern life — financial, political, pharmaceutical, and intelligence — form an interconnected architecture documented through primary sources.',
      credit: 'Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-1': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bank_of_England_-_The_Bank_-_geograph.org.uk_-_3756.jpg/800px-Bank_of_England_-_The_Bank_-_geograph.org.uk_-_3756.jpg',
      alt: 'Bank of England building',
      caption: 'The Bank of England, established in 1694 — the model for modern central banking.',
      credit: 'Wikimedia Commons / CC BY-SA 2.0',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Mayer_Amschel_Rothschild.jpg/440px-Mayer_Amschel_Rothschild.jpg',
      alt: 'Portrait of Mayer Amschel Rothschild',
      caption: 'Mayer Amschel Rothschild (1744–1812), founder of the Rothschild banking dynasty.',
      credit: 'Public Domain',
    },
  ],
  'chapter-2': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Andrew_jackson_head.jpg/440px-Andrew_jackson_head.jpg',
      alt: 'Portrait of President Andrew Jackson',
      caption: 'Andrew Jackson vetoed the recharter of the Second Bank of the United States in 1832.',
      credit: 'Public Domain — White House Historical Association',
    },
  ],
  'chapter-3': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Jekyll_Island_Club_-_Early_View.jpg/800px-Jekyll_Island_Club_-_Early_View.jpg',
      alt: 'Jekyll Island Club, early 1900s',
      caption: 'The Jekyll Island Club, where six men met in secret in 1910 to draft the Federal Reserve Act.',
      credit: 'Public Domain — Library of Congress',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Nelson_Aldrich.jpg/440px-Nelson_Aldrich.jpg',
      alt: 'Senator Nelson Aldrich',
      caption: 'Sen. Nelson Aldrich organized the Jekyll Island conference and championed the Aldrich Plan.',
      credit: 'Public Domain',
    },
  ],
  'chapter-4': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Paul_Warburg.jpg/440px-Paul_Warburg.jpg',
      alt: 'Paul Warburg',
      caption: 'Paul Warburg, German-born banker who was central to designing the Federal Reserve System.',
      credit: 'Public Domain',
    },
  ],
  'chapter-5': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Henry_ford_1919.jpg/440px-Henry_ford_1919.jpg',
      alt: 'Henry Ford, 1919',
      caption: 'Henry Ford in 1919 — industrialist, innovator, and publisher of The Dearborn Independent.',
      credit: 'Public Domain',
    },
  ],
  'chapter-6': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Balfour_declaration_unmarked.jpg/960px-Balfour_declaration_unmarked.jpg',
      alt: 'The Balfour Declaration of 1917 — the letter from British Foreign Secretary Arthur Balfour to Lord Rothschild pledging British support for a Jewish homeland in Palestine',
      caption: 'The Balfour Declaration, November 2, 1917 — a 67-word letter from British Foreign Secretary Arthur Balfour to Lord Walter Rothschild that would reshape the Middle East for the next century.',
      credit: 'British Government, Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-7': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Change_of_command_ceremony_of_the_Mossad%2C_1968._III.jpg/1280px-Change_of_command_ceremony_of_the_Mossad%2C_1968._III.jpg',
      alt: "Former headquarters of the Mossad, Israel's national intelligence agency",
      caption: 'The Mossad — HaMossad leModiʿin uleTafkidim Meyuḥadim (the Institute for Intelligence and Special Operations) — operates as one of the most effective intelligence agencies in the world.',
      credit: 'Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-8': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/440px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg',
      alt: 'President John F. Kennedy, official White House portrait',
      caption: 'President Kennedy confronted Israel over the Dimona nuclear reactor and sought to regulate AIPAC.',
      credit: 'Public Domain — White House',
    },
  ],
  'chapter-9': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Dealey_Plaza_2003.jpg/800px-Dealey_Plaza_2003.jpg',
      alt: 'Dealey Plaza, Dallas, Texas',
      caption: 'Dealey Plaza, Dallas — the site of President Kennedy\'s assassination on November 22, 1963.',
      credit: 'Wikimedia Commons / CC BY-SA 3.0',
    },
  ],
  'chapter-10': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Henry_Kissinger.jpg/440px-Henry_Kissinger.jpg',
      alt: 'Henry Kissinger',
      caption: 'Henry Kissinger negotiated the petrodollar agreement with Saudi Arabia in 1974.',
      credit: 'Public Domain — U.S. Government',
    },
  ],
  'chapter-11': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Harold_Pratt_House_north_staircase_jeh.jpg/1280px-Harold_Pratt_House_north_staircase_jeh.jpg',
      alt: 'The Harold Pratt House in New York City, headquarters of the Council on Foreign Relations',
      caption: 'The Harold Pratt House, 58 East 68th Street, New York — headquarters of the Council on Foreign Relations since 1945. CFR membership has included virtually every Secretary of State, Treasury, and Defense since its founding.',
      credit: 'Photo: Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-12': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg/800px-Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg',
      alt: 'Federal Reserve Building, Washington D.C.',
      caption: 'The Eccles Building — headquarters of the Federal Reserve Board of Governors in Washington, D.C.',
      credit: 'Public Domain',
    },
  ],
  'chapter-13': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Wall_Street_-_New_York_Stock_Exchange.jpg/800px-Wall_Street_-_New_York_Stock_Exchange.jpg',
      alt: 'New York Stock Exchange on Wall Street',
      caption: 'The New York Stock Exchange — epicenter of the 2008 financial crisis.',
      credit: 'Wikimedia Commons / CC BY 2.0',
    },
  ],
  'chapter-14': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/US_Capitol_west_side.JPG/1280px-US_Capitol_west_side.JPG',
      alt: 'The United States Capitol Building — where AIPAC-funded representatives shape American foreign policy',
      caption: 'The United States Capitol. In the 2024 election cycle, AIPAC directed $42.6 million to 489 congressional candidates across both parties — making it the most powerful foreign policy lobby in America.',
      credit: 'Photo: Architect of the Capitol, Public Domain',
    },
  ],
  'chapter-15': [
    {
      src: ISRAEL_DOSSIER_CHAPTER_15.heroImage,
      alt: ISRAEL_DOSSIER_CHAPTER_15.heroAlt,
      caption: ISRAEL_DOSSIER_CHAPTER_15.heroCaption,
      credit: ISRAEL_DOSSIER_CHAPTER_15.heroCredit,
    },
  ],
  'chapter-16': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/USS_Liberty_%28AGTR-5%29_underway_in_Chesapeake_Bay%2C_29_July_1967.jpg/800px-USS_Liberty_%28AGTR-5%29_underway_in_Chesapeake_Bay%2C_29_July_1967.jpg',
      alt: 'USS Liberty',
      caption: 'USS Liberty (AGTR-5) — attacked by Israeli forces on June 8, 1967, killing 34 American servicemen.',
      credit: 'Public Domain — U.S. Navy',
    },
  ],
  'chapter-17': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Robert_F._Kennedy_crop.jpg/440px-Robert_F._Kennedy_crop.jpg',
      alt: 'Robert F. Kennedy',
      caption: 'Sen. Robert F. Kennedy, assassinated June 5, 1968, while campaigning for president.',
      credit: 'Public Domain — U.S. Government',
    },
  ],
  'chapter-18': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Frank_Church.jpg/440px-Frank_Church.jpg',
      alt: 'Senator Frank Church',
      caption: 'Sen. Frank Church chaired the 1975 committee that exposed Operation Mockingbird and other CIA abuses.',
      credit: 'Public Domain — U.S. Senate',
    },
  ],
  'chapter-19': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Allen_Dulles%2C_CIA_photo_portrait.jpg/440px-Allen_Dulles%2C_CIA_photo_portrait.jpg',
      alt: 'Allen Dulles, CIA Director',
      caption: 'Allen Dulles served as CIA Director from 1953–1961 and oversaw the MKUltra program.',
      credit: 'Public Domain — CIA',
    },
  ],
  'chapter-20': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Rockefeller_Center_MAM.JPG/960px-Rockefeller_Center_MAM.JPG',
      alt: 'Rockefeller Center, New York City — symbol of the Rockefeller family\'s influence on American institutions',
      caption: 'Rockefeller Center, New York City. The Rockefeller Foundation\'s 1910 Flexner Report reshaped American medical education to favor pharmaceutical treatment — a system that generates $4.5 trillion annually.',
      credit: 'Photo: Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-21': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Typhoid_inoculation2.jpg/960px-Typhoid_inoculation2.jpg',
      alt: 'Doctor administering a typhoid inoculation at a rural school in Texas, 1943',
      caption: 'A physician administering a typhoid inoculation at a rural school in San Augustine County, Texas, 1943. The history of vaccination in America involves both genuine public health advances and documented corporate conflicts of interest.',
      credit: 'Photo: John Vachon, Farm Security Administration, Public Domain via Library of Congress',
    },
  ],
  'chapter-22': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/WTC_smoking_on_9-11.jpeg/576px-WTC_smoking_on_9-11.jpeg',
      alt: 'World Trade Center on September 11, 2001',
      caption: 'The World Trade Center towers after being struck on the morning of September 11, 2001.',
      credit: 'Public Domain — Michael Foran / CC BY 2.0',
    },
  ],
  'chapter-23': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Nixon_edited_transcripts.jpg/1280px-Nixon_edited_transcripts.jpg',
      alt: 'President Richard Nixon at a press briefing — architect of the War on Drugs',
      caption: 'President Nixon declared drug abuse "public enemy number one" in 1971. A former domestic policy advisor later admitted the War on Drugs was designed to target anti-war and Black communities.',
      credit: 'Photo: White House Photo Office, Public Domain via National Archives',
    },
  ],
  'chapter-24': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Deer_Island_Waste_Water_Treatment_Plant.jpg/1280px-Deer_Island_Waste_Water_Treatment_Plant.jpg',
      alt: 'Water treatment facility with flocculators and sedimentation basins — where fluoride is added to public water supplies',
      caption: 'A municipal water treatment facility. Since 1945, fluoride — an industrial byproduct — has been added to public water supplies across the United States, a practice that remains controversial among researchers.',
      credit: 'Photo: Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-25': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/800px-RMS_Titanic_3.jpg',
      alt: 'RMS Titanic',
      caption: 'RMS Titanic departing Southampton, April 10, 1912. Three prominent opponents of the Federal Reserve were aboard.',
      credit: 'Public Domain',
    },
  ],
  'chapter-26': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Owl_Shrine.jpg/960px-Owl_Shrine.jpg',
      alt: 'The Owl Shrine at Bohemian Grove, photographed in 1986',
      caption: 'The 40-foot owl shrine at Bohemian Grove, the private retreat in the redwoods of Northern California where American presidents, defense contractors, and media moguls gather each summer.',
      credit: 'Photo: Public Domain via Wikimedia Commons',
    },
  ],
  'chapter-27': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Edward_Snowden-2.jpg/440px-Edward_Snowden-2.jpg',
      alt: 'Edward Snowden',
      caption: 'Edward Snowden, former NSA contractor who exposed mass government surveillance in 2013.',
      credit: 'Wikimedia Commons / CC BY 3.0',
    },
  ],
  'chapter-28': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/NY_Southern_District_Courthouse.jpg/440px-NY_Southern_District_Courthouse.jpg',
      alt: 'Southern District of New York courthouse',
      caption: 'The U.S. District Court for the Southern District of New York, where Epstein cases were filed.',
      credit: 'Wikimedia Commons / CC BY-SA 4.0',
    },
  ],
  epilogue: [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/LOC_Main_Reading_Room_Highsmith.jpg/1280px-LOC_Main_Reading_Room_Highsmith.jpg',
      alt: 'The Main Reading Room of the Library of Congress in Washington, D.C.',
      caption: 'The Main Reading Room, Library of Congress. Every source cited in this publication is publicly accessible. The reader is encouraged to verify any claim independently.',
      credit: 'Photo: Carol M. Highsmith, Public Domain via Library of Congress',
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
