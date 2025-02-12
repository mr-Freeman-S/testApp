import React, {useMemo} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PostTypeAdded} from '../types/postsTypes.ts';

type Props = {
  post: PostTypeAdded;
  onPress: (post: PostTypeAdded) => void;
};

export const PostCard: React.FC<Props> = ({post, onPress}) => {
  const containerStyle = useMemo(() => {
    return [
      styles.container,
      {backgroundColor: post.isFavorite ? 'gold' : 'white'},
    ];
  }, [post.isFavorite]);

  return (
    <TouchableOpacity onPress={() => onPress(post)} style={containerStyle}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: post.imageUrlSmall}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    borderColor: 'purple',
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#666',
  },
  imageContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
});
