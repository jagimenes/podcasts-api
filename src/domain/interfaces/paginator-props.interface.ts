import { Genre } from '../models/genre';
import { Podcast } from '../models/podcast';

export interface PaginatorProps {
  podcasts: Podcast[];
  genre: Genre;
  page: number;
  pageSize: number;
  listennotesUrl: string;
}
