import { Extra } from './extra';
import { Lookingfor } from './lookingfor';

export class Podcast {
  id: string;
  title: string;
  publisher: string;
  image: string;
  thumbnail: string;
  listennotes_url: string;
  listen_score: string;
  listen_score_global_rank: string;
  total_episodes: number;
  audio_length_sec: number;
  update_frequency_hours: number;
  explicit_content: boolean;
  description: string;
  itunes_id: number;
  rss: string;
  latest_pub_date_ms: number;
  latest_episode_id: string;
  earliest_pub_date_ms: number;
  language: string;
  country: string;
  website?: string;
  extra: Extra;
  is_claimed: boolean;
  email: string;
  type: string;
  looking_for: Lookingfor;
  has_guest_interviews: boolean;
  has_sponsors: boolean;
  genre_ids: number[];
}
