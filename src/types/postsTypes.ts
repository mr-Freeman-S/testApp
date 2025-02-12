export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
export type PostTypeAdded = PostType & {
  imageUrlSmall: string;
  imageUrlBig: string;
  isFavorite: boolean;
};
