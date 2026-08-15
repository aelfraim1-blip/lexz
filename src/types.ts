export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  location?: string;
  caption: string;
  vibeTag: string;
  rotation: number; // For scrapbook feel (-4 to 4 deg)
  sticker: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: 'Dates' | 'Travel' | 'Cozy' | 'Food' | 'Future';
  completed: boolean;
  notes?: string;
  emoji: string;
}

export interface LoveReason {
  id: number;
  reason: string;
  emoji: string;
  tag: string;
}
