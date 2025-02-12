import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PostTypeAdded} from '../types/postsTypes.ts';
import {useAppDispatch} from '../hooks.ts';
import {
  addToFavorites,
  removeFromFavorites,
} from '../store/slices/postsSlice.ts';

export const DetailsScreen = () => {
  const {post} = useRoute().params as {post: PostTypeAdded};
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = React.useState(post.isFavorite);

  const handleOnClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(post.id));
      setIsFavorite(false);
    } else {
      dispatch(addToFavorites(post.id));
      setIsFavorite(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Image
        source={{uri: post.imageUrlBig}}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={handleOnClick} style={styles.button}>
        <Text style={styles.buttonText}>
          {isFavorite ? 'Remove from' : 'Add to'} favorite
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  body: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
