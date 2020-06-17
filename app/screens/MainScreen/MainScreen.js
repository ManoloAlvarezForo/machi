import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStackNavigator from '../../navigators/AuthStackNavigator';
import {lightTheme} from '../../themes/light';
import {AuthContext} from '../../constexts/AuthContext';
// import {MainStackNavigator} from '../../navigators/MainStackNavigator';
import {useAuth} from '../../hooks/Auth/useAuth';
// import {UserContext} from '../../constexts/UserContext';
import SplashScreen from '../SplashScreen';
import {darkTheme} from '../../themes/dark';
import {ThemeContext} from '../../constexts/ThemeContext';
import {StatusBar} from 'react-native';
// import MainScreen from '../DrawerScreen/DrawerScreen';
import MainScreen from '../MaterialBottomTabNavigator/MaterialBottomTabNavigator';
// import {useDarkMode} from 'react-native-dark-mode';

const RootStack = createStackNavigator();

export default function () {
  const {auth, state} = useAuth();
  //   const isDarkMode = useDarkMode();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const switchTheme = React.useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  function renderScreens() {
    if (state.loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    return state.user ? (
      <RootStack.Screen name={'MainStack'} component={MainScreen} />
    ) : (
      <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
    );
  }

  return (
    <ThemeContext.Provider value={switchTheme}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AuthContext.Provider value={auth}>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}>
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
