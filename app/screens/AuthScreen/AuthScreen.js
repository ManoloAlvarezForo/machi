import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../LoginScreen';
import RegisterScreen from '../RegisterScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    mode="modal"
    screenOptions={{
      headerShown: false,
    }}>
    <AuthStack.Screen name={'LoginStack'}>
      {() => (
        <LoginStack.Navigator
          mode={'card'}
          screenOptions={{
            headerShown: false,
          }}>
          <LoginStack.Screen name={'LoginScreen'} component={LoginScreen} />
        </LoginStack.Navigator>
      )}
    </AuthStack.Screen>
    <AuthStack.Screen name="SignUp" component={RegisterScreen} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
