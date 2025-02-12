import {createAsyncThunk} from '@reduxjs/toolkit';
import {faker} from '@faker-js/faker';
import {PostType, PostTypeAdded} from '../../types/postsTypes.ts';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/';

export const fetchPosts = createAsyncThunk<PostTypeAdded[]>(
  'posts/fetchPosts',
  async () => {
    const response = await fetch(BASE_URL);
    const data: PostType[] = await response.json();

    return data.map(post => ({
      ...post,
      isFavorite: false,
      imageUrlSmall: faker.image.urlLoremFlickr({
        width: 32,
        height: 32,
        category: 'post',
      }),
      imageUrlBig: faker.image.urlLoremFlickr({
        width: 300,
        height: 300,
        category: 'post',
      }),
    }));
  },
);

export const fetchPostById = createAsyncThunk(
  'posts/fetchPostById',
  async id => {
    const response = await fetch(`${BASE_URL}${id}`);
    return response.json();
  },
);
