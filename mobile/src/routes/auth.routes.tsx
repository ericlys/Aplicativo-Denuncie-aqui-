import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Entry from '../pages/EntryScreen';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () =>
<Auth.Navigator
  screenOptions={{
    headerShown: false,
    cardStyle: {backgroundColor: '#FFFF'}
  }}
  >
  <Auth.Screen name="Entry" component={Entry}/>
  <Auth.Screen name="SignIn" component={SignIn}/>
  <Auth.Screen name="SignUp" component={SignUp}/>
</Auth.Navigator> ;

export default AuthRoutes;
