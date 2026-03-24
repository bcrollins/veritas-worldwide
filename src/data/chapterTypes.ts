export interface Source {
  id: number;
  text: string;
  url?: string;
}

export interface EvidenceBox {
  tier: 'verified' | 'circumstantial' | 'disputed';
  label: string;
  text: string;
}

export interface Quote {
  text: string;
  attribution: string;
  note?: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface TimelineEvent {
  year: string;
  text: string;
}

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  creditUrl?: string;
  width?: 'full' | 'wide' | 'narrow';
}

export interface ContentBlock {
  type: 'dropcap' | 'text' | 'heading' | 'subheading' | 'quote' | 'evidence' | 'stats' | 'table' | 'timeline' | 'image' | 'diagram' | 'video';
  text?: string;
  quote?: Quote;
  evidence?: EvidenceBox;
  stats?: StatCard[];
  table?: TableData;
  timeline?: TimelineEvent[];
  image?: ImageData;
  diagramId?: string;
  video?: { youtubeId: string; title: string; caption?: string };
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  dateRange: string;
  author: string;
  publishDate: string;
  heroImage?: ImageData;
  content: ContentBlock[];
  sources: Source[];
  crossLinks: { label: string; chapterId: string }[];
  keywords: string[];
}
