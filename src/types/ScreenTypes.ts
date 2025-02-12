import {Screens} from '../enums.ts';
import {NavigationProp} from '@react-navigation/native';
import {PostTypeAdded} from './postsTypes.ts';

export type RootStackParams = {
  [Screens.POSTS]: undefined;
  [Screens.DETAILS]: {post: PostTypeAdded};
};
export type NavigationUseType = NavigationProp<RootStackParams>;
