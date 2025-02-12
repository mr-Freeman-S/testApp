import {createSlice} from '@reduxjs/toolkit';
import {PostTypeAdded} from '../../types/postsTypes';
import {RootState} from '../store';
import {fetchPosts} from '../actions/postsActions.ts';

type InitialStateType = {
  posts: PostTypeAdded[];
  favoritePosts: PostTypeAdded[];
  loading: boolean;
  error: string | null;
};

const initialState: InitialStateType = {
  posts: [],
  favoritePosts: [],
  loading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: 'app/posts',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const postId = action.payload;
      const postIndex = state.posts.findIndex(post => post.id === postId);

      if (postIndex !== -1) {
        const [post] = state.posts.splice(postIndex, 1);
        post.isFavorite = true;
        state.favoritePosts.unshift(post);
      }
    },
    removeFromFavorites: (state, action) => {
      const postId = action.payload;
      const favoriteIndex = state.favoritePosts.findIndex(
        post => post.id === postId,
      );

      if (favoriteIndex !== -1) {
        const [post] = state.favoritePosts.splice(favoriteIndex, 1);
        post.isFavorite = false;
        state.posts.push(post);
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке постов';
      });
  },
});

export const {addToFavorites, removeFromFavorites} = postsSlice.actions;

export const selectPostsData = (state: RootState) => state.posts;

export default postsSlice.reducer;
