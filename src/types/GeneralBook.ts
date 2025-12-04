export interface GeneralBook {
  id: string;
  type: string;
  namespaceId: string;
  name: string;
  slug: string;
  priceRegular: number;
  priceDiscount: number | null;
  images: string[];
  langAvailable: string[];
  lang: string;
  author: string;
  publicationYear: number;
  publication: string;
  category: string[];
  description: string[];
  numberOfPages?: number;
  format?: string;
  illustrations?: boolean;
  coverType?: string | null;
  narrator?: string;
  listeningLength?: number;
}
