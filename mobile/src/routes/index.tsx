import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SingnIn from '../pages/SingnIn';
import SingnUp from '../pages/SingnUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () =>
<Auth.Navigator
  screenOptions={{
    headerShown: false,
    cardStyle: {backgroundColor: '#312e38'}
  }}>
  <Auth.Screen name="SingnIn" component={SingnIn}/>
  <Auth.Screen name="SingnUp" component={SingnUp}/>
</Auth.Navigator> ;

export default AuthRoutes;
