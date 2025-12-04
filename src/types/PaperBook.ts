import type { BookBase } from './BookBase';

export interface PaperBook extends BookBase {
  coverType: string | null;
  numberOfPages: number;
  format: string;
  illustrations: boolean;
}
