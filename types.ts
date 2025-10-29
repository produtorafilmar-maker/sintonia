export type Page = 'WebtvNews' | 'Radio' | 'TV' | 'Contacts';

export interface NewsItem {
  title: string;
  link: string;
  description: string;
  imageUrl: string | null;
  pubDate: string;
  fullContent: string;
}

export interface ProgramItem {
  time: string;
  title: string;
  description: string;
}