import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store/store.ts';
import {useNavigation} from '@react-navigation/native';
import {NavigationUseType} from './types/ScreenTypes.ts';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppNavigation = () => useNavigation<NavigationUseType>();
