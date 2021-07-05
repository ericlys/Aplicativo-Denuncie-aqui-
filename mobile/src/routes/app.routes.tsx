import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateDenunciation from '../pages/CreateDenunciation';
import DenunciationCreated from '../pages/DenunciationCreated';
import ListDenunciation from '../pages/ListDenunciation';
import ShowDenunciation from '../pages/ShowDenunciation';


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

  <App.Screen name="ListDenunciation" component={ListDenunciation}/>
  <App.Screen name="ShowDenunciation" component={ShowDenunciation}/>

</App.Navigator> ;

export default AppRoutes;
