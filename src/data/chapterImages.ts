// Historical images from Wikimedia Commons (public domain / CC)
// Each chapter gets 1-3 key images of people, events, or documents

export interface ChapterImage {
  src: string
  alt: string
  caption: string
  credit: string
}

export const chapterImages: Record<string, ChapterImage[]> = {
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
  'chapter-22': [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/WTC_smoking_on_9-11.jpeg/576px-WTC_smoking_on_9-11.jpeg',
      alt: 'World Trade Center on September 11, 2001',
      caption: 'The World Trade Center towers after being struck on the morning of September 11, 2001.',
      credit: 'Public Domain — Michael Foran / CC BY 2.0',
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
}

export function getChapterImages(chapterId: string): ChapterImage[] {
  return chapterImages[chapterId] || []
}
