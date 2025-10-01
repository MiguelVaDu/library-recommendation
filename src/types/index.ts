export type Props = {
  locations: string[]; 
  genres: string[];  
  moods: string[];  
  years: number[]; 
  popularity: number; 
};

export type BookRaw = {
  title?: string;
  author?: string;   
  autor?: string;
  img?: string;   
};

export type Book = {
  title: string;
  author: string;
  img?: string;
};

export type RecommendationResponse = {
  results: BookRaw[];
};