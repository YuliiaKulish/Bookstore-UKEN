export enum SortOption {
  Newest = 'Newest',
  Cheaper = 'Cheaper',
  Expensive = 'More Expensive',
}

export enum Order {
  Ascending = 1,
  Descending = 2,
}

export const sortLabels: Record<SortOption, string> = {
  [SortOption.Newest]: 'Newest',
  [SortOption.Cheaper]: 'Cheaper',
  [SortOption.Expensive]: 'More expensive',
};
