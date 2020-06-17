import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../../hooks/Auth/useAuth';
import {AuthContext} from '../../constexts/AuthContext';
// Screens
import DrawerScreen from '../DrawerScreen/DrawerScreen';
import AuthStackScreen from '../AuthScreen';
import Splash from '../SplashScreen';

const RootStack = createStackNavigator();
const RootStackScreen = ({user}) => (
  <RootStack.Navigator headerMode="none">
    {user ? (
      <RootStack.Screen
        name="App"
        component={DrawerScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default function () {
  const {auth, state} = useAuth();

  if (state.loading) {
    return <Splash />;
  }
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStackScreen user={state.user} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
