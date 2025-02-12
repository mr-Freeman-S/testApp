import React, {useCallback, useEffect, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useAppDispatch, useAppNavigation, useAppSelector} from '../hooks.ts';
import {selectPostsData} from '../store/slices/postsSlice.ts';
import {fetchPosts} from '../store/actions/postsActions.ts';
import {PostCard} from '../components/PostCard.tsx';
import {Screens} from '../enums.ts';
import {PostTypeAdded} from '../types/postsTypes.ts';

export const PostsScreen = () => {
  const {posts, favoritePosts, loading, error} =
    useAppSelector(selectPostsData);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const combinedPosts = useMemo(
    () => favoritePosts.concat(posts),
    [favoritePosts, posts],
  );
  const handleClickCard = useCallback(
    (post: PostTypeAdded) => {
      navigation.navigate(Screens.DETAILS, {post});
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}: {item: PostTypeAdded}) => (
      <PostCard onPress={handleClickCard} post={item} />
    ),
    [handleClickCard],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({length: 150, offset: 150 * index, index}),
    [],
  );

  useEffect(() => {
    if (!posts.length) {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>error</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.containerFlat}
        data={combinedPosts}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        windowSize={5}
        keyExtractor={item => item.id.toString()}
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  containerFlat: {
    gap: 30,
  },
});
