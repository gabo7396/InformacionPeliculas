import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { GradientProvider } from './src/context/GradientContext';

interface AppStateInterface {
  children: JSX.Element | JSX.Element[]
}

const AppState = ({children}: AppStateInterface) => {
  return (
    <GradientProvider>
      {children}
    </GradientProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation/>
      </AppState>
    </NavigationContainer>
  )
}

export default App;