import type { BookBase } from './BookBase';

export interface AudioBook extends BookBase {
  narrator: string;
  listeningLength: number;
}
