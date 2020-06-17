/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntIcons from 'react-native-vector-icons/AntDesign';
import ProductScreen from '../ProductsScreen/ProductsScreen';

const Tab = createMaterialBottomTabNavigator();

// function HomeScreen() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function MapScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Maps!</Text>
    </View>
  );
}

function MaterialCommunityIconsWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24}}>
      <MaterialCommunityIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -4,
            top: -1,
            backgroundColor: '#ff2134',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function EvilIconsWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <EvilIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: 0,
            top: -1,
            backgroundColor: '#ff4700',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#252525', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function FeatherIconsWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 24, height: 24}}>
      <FeatherIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -4,
            top: -1,
            backgroundColor: '#ff2134',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function AntIconsWithBadge({name, badgeCount, color, size}) {
  return (
    <View style={{width: 22, height: 22, margin: 5}}>
      <AntIcons name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: 0,
            top: -1,
            backgroundColor: '#ff2134',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function CartIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <FeatherIconsWithBadge {...props} badgeCount={3} />;
}

function OrdersIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <MaterialCommunityIconsWithBadge {...props} badgeCount={0} />;
}

export default function () {
  return (
    <Tab.Navigator
      initialRouteName="Products"
      activeColor="#ff2134"
      inactiveColor="#A1A6AA"
      barStyle={{backgroundColor: '#212027'}}>
      <Tab.Screen
        name="Products"
        component={ProductScreen}
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({color}) => (
            <FeatherIcons name="compass" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Maps"
        component={MapScreen}
        options={{
          tabBarLabel: 'Ubicacion',
          tabBarIcon: ({color}) => (
            <FeatherIcons name="map-pin" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <FeatherIcons name="user" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Mis pedidos',
          tabBarIcon: ({color}) => (
            <OrdersIconWithBadge
              name="clipboard-text-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Cesta',
          tabBarIcon: ({color}) => (
            <CartIconWithBadge name="shopping-cart" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
