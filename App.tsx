import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './src/screen';
import {persistor, store} from './src/store/store.ts';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
