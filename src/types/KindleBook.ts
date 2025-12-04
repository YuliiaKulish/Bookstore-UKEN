import type { BookBase } from './BookBase';

export interface KindleBook extends BookBase {
  numberOfPages: number;
  format: string;
  illustrations: boolean;
}
