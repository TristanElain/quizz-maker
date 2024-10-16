export type Category = {
  id: number;
  name: string;
};

export type CategoryApiResponse = {
  trivia_categories: Category[];
};
