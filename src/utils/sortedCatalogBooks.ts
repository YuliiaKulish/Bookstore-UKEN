import { Order, SortOption } from '../types/catalog';
import { GeneralBook } from '../types/GeneralBook';

function sortPrice(a: GeneralBook, b: GeneralBook, order: Order) {
  const priceA = a.priceDiscount ?? a.priceRegular;
  const priceB = b.priceDiscount ?? b.priceRegular;

  return order === Order.Ascending ? priceA - priceB : priceB - priceA;
}

export function sortedCatalogBooks(
  catalogBooks: GeneralBook[],
  sortBy: SortOption | null,
) {
  if (!sortBy) {
    return catalogBooks;
  }

  const visibleCatalogBooks = [...catalogBooks];

  visibleCatalogBooks.sort((a, b) => {
    switch (sortBy) {
      case SortOption.Newest:
        return b.publicationYear - a.publicationYear;
      case SortOption.Cheaper:
        return sortPrice(a, b, Order.Ascending);
      case SortOption.Expensive:
        return sortPrice(a, b, Order.Descending);
    }
  });

  return visibleCatalogBooks;
}
