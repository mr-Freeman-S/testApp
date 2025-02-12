import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PostsScreen} from './PostsScreen.tsx';
import {Screens} from '../enums.ts';
import {DetailsScreen} from './DetailsScreen.tsx';
import {RootStackParams} from '../types/ScreenTypes.ts';

const Stack = createNativeStackNavigator<RootStackParams>();

export const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.POSTS}>
      <Stack.Screen name={Screens.POSTS} component={PostsScreen} />
      <Stack.Screen name={Screens.DETAILS} component={DetailsScreen} />
    </Stack.Navigator>
  );
};
