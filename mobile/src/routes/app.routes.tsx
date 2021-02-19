import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile.tsx';
import CreateDenunciation from '../pages/CreateDenunciation';
import DenunciationCreated from '../pages/DenunciationCreated';

const App = createStackNavigator();

const AppRoutes: React.FC = () =>
<App.Navigator
  screenOptions={{
    headerShown: false,
    cardStyle: {backgroundColor: '#FFFF'}
  }}
  >
  <App.Screen name="Dashboard" component={Dashboard}/>
  <App.Screen name="CreateDenunciation" component={CreateDenunciation}/>
  <App.Screen name="DenunciationCreated" component={DenunciationCreated}/>

  <App.Screen name="Profile" component={Profile}/>
</App.Navigator> ;

export default AppRoutes;
